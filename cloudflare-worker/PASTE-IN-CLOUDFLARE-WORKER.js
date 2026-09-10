function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

function unauthorized() {
  return json({ error: 'Unauthorized' }, 401)
}

async function readJson(request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}

function propertyPayload(input = {}) {
  return {
    name: String(input.name || '').trim(),
    development_name: String(input.development_name || '').trim(),
    building_name: String(input.building_name || '').trim(),
    floor_label: String(input.floor_label || '').trim(),
    location: String(input.location || '').trim(),
    full_address: String(input.full_address || '').trim(),
    monthly_rate: Number(input.monthly_rate ?? input.rate ?? 0),
    status: ['Available', 'Available Soon', 'Occupied'].includes(input.status) ? input.status : 'Available',
    available_on: input.available_on ? String(input.available_on).trim() : null,
    description: String(input.description || '').trim(),
    rent_includes: String(input.rent_includes || '').trim(),
    lease_term: String(input.lease_term || '').trim(),
    map_url: String(input.map_url || '').trim(),
    unit_code: String(input.unit_code || '').trim(),
    property_type: String(input.property_type || 'Condominium').trim(),
    bedrooms: Number(input.bedrooms || 0),
    bathrooms: Number(input.bathrooms || 0),
    furnishing: String(input.furnishing || '').trim(),
    utility_notes: String(input.utility_notes || '').trim(),
    amenities: typeof input.amenities === 'string' ? input.amenities : JSON.stringify(input.amenities || []),
    is_featured: input.is_featured ? 1 : 0,
    slug: String(input.slug || '').trim(),
  }
}

async function getImagesByProperty(env, propertyId) {
  const { results = [] } = await env.DB.prepare(
    `SELECT id, property_id, image_key, image_url, alt_text, sort_order, is_cover, created_at
     FROM property_images
     WHERE property_id = ?
     ORDER BY is_cover DESC, sort_order ASC, id ASC`
  ).bind(propertyId).all()
  return results
}

async function listProperties(env) {
  const { results = [] } = await env.DB.prepare(
    `SELECT id, name, development_name, building_name, floor_label, location, full_address,
            monthly_rate, status, available_on, description, rent_includes, lease_term, map_url,
            unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
            amenities, is_featured, slug, created_at, updated_at
     FROM properties
     ORDER BY id DESC`
  ).all()

  const { results: images = [] } = await env.DB.prepare(
    `SELECT id, property_id, image_key, image_url, alt_text, sort_order, is_cover, created_at
     FROM property_images
     ORDER BY is_cover DESC, sort_order ASC, id ASC`
  ).all()

  const grouped = new Map()
  for (const image of images) {
    if (!grouped.has(image.property_id)) grouped.set(image.property_id, [])
    grouped.get(image.property_id).push(image)
  }

  return results.map((property) => ({
    ...property,
    images: grouped.get(property.id) || [],
  }))
}

async function getProperty(env, id) {
  const property = await env.DB.prepare(
    `SELECT id, name, development_name, building_name, floor_label, location, full_address,
            monthly_rate, status, available_on, description, rent_includes, lease_term, map_url,
            unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
            amenities, is_featured, slug, created_at, updated_at
     FROM properties WHERE id = ?`
  ).bind(id).first()

  if (!property) return null
  return { ...property, images: await getImagesByProperty(env, id) }
}

export default {
  async fetch(request, env) {
    const apiKey = request.headers.get('x-j3c-api-key')
    if (!env.J3C_API_SECRET || apiKey !== env.J3C_API_SECRET) return unauthorized()

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, '') || '/'
    const method = request.method.toUpperCase()

    try {
      if (path === '/health' && method === 'GET') {
        return json({ ok: true, service: 'j3c-d1-api' })
      }

      if (path === '/properties' && method === 'GET') {
        return json({ properties: await listProperties(env) })
      }

      if (path === '/properties' && method === 'POST') {
        const input = await readJson(request)
        const data = propertyPayload(input)
        if (!data.name || !data.location || !data.monthly_rate) {
          return json({ error: 'Name, location, and monthly rate are required.' }, 400)
        }

        const result = await env.DB.prepare(
          `INSERT INTO properties
            (name, development_name, building_name, floor_label, location, full_address,
             monthly_rate, status, available_on, description, rent_includes, lease_term, map_url,
             unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
             amenities, is_featured, slug, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        ).bind(
          data.name, data.development_name, data.building_name, data.floor_label, data.location, data.full_address,
          data.monthly_rate, data.status, data.available_on, data.description, data.rent_includes,
          data.lease_term, data.map_url, data.unit_code, data.property_type, data.bedrooms,
          data.bathrooms, data.furnishing, data.utility_notes, data.amenities, data.is_featured, data.slug
        ).run()

        const id = result.meta?.last_row_id
        return json({ property: await getProperty(env, id) }, 201)
      }

      const propertyMatch = path.match(/^\/properties\/(\d+)$/)
      if (propertyMatch) {
        const id = Number(propertyMatch[1])

        if (method === 'GET') {
          const property = await getProperty(env, id)
          return property ? json({ property }) : json({ error: 'Property not found.' }, 404)
        }

        if (method === 'PUT') {
          const input = await readJson(request)
          const data = propertyPayload(input)
          if (!data.name || !data.location || !data.monthly_rate) {
            return json({ error: 'Name, location, and monthly rate are required.' }, 400)
          }

          const result = await env.DB.prepare(
            `UPDATE properties SET
               name = ?, development_name = ?, building_name = ?, floor_label = ?, location = ?, full_address = ?,
               monthly_rate = ?, status = ?, available_on = ?, description = ?, rent_includes = ?,
               lease_term = ?, map_url = ?, unit_code = ?, property_type = ?, bedrooms = ?, bathrooms = ?,
               furnishing = ?, utility_notes = ?, amenities = ?, is_featured = ?, slug = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`
          ).bind(
            data.name, data.development_name, data.building_name, data.floor_label, data.location, data.full_address,
            data.monthly_rate, data.status, data.available_on, data.description, data.rent_includes,
            data.lease_term, data.map_url, data.unit_code, data.property_type, data.bedrooms,
            data.bathrooms, data.furnishing, data.utility_notes, data.amenities,
            data.is_featured, data.slug, id
          ).run()

          if (!result.meta?.changes) return json({ error: 'Property not found.' }, 404)
          return json({ property: await getProperty(env, id) })
        }

        if (method === 'DELETE') {
          const existing = await getProperty(env, id)
          if (!existing) return json({ error: 'Property not found.' }, 404)
          await env.DB.prepare('DELETE FROM properties WHERE id = ?').bind(id).run()
          return json({ deleted: true, property: existing })
        }
      }

      const imagesMatch = path.match(/^\/properties\/(\d+)\/images$/)
      if (imagesMatch && method === 'POST') {
        const propertyId = Number(imagesMatch[1])
        const property = await getProperty(env, propertyId)
        if (!property) return json({ error: 'Property not found.' }, 404)

        const input = await readJson(request)
        if (!input?.image_key || !input?.image_url) {
          return json({ error: 'image_key and image_url are required.' }, 400)
        }

        const isCover = input.is_cover ? 1 : 0
        if (isCover) {
          await env.DB.prepare('UPDATE property_images SET is_cover = 0 WHERE property_id = ?')
            .bind(propertyId).run()
        }

        const result = await env.DB.prepare(
          `INSERT INTO property_images
             (property_id, image_key, image_url, alt_text, sort_order, is_cover, created_at)
           VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
        ).bind(
          propertyId,
          String(input.image_key),
          String(input.image_url),
          String(input.alt_text || ''),
          Number(input.sort_order || 0),
          isCover
        ).run()

        const image = await env.DB.prepare(
          `SELECT id, property_id, image_key, image_url, alt_text, sort_order, is_cover, created_at
           FROM property_images WHERE id = ?`
        ).bind(result.meta?.last_row_id).first()

        return json({ image }, 201)
      }

      const imageMatch = path.match(/^\/images\/(\d+)$/)
      if (imageMatch && method === 'DELETE') {
        const id = Number(imageMatch[1])
        const image = await env.DB.prepare(
          `SELECT id, property_id, image_key, image_url, alt_text, sort_order, is_cover, created_at
           FROM property_images WHERE id = ?`
        ).bind(id).first()

        if (!image) return json({ error: 'Image not found.' }, 404)
        await env.DB.prepare('DELETE FROM property_images WHERE id = ?').bind(id).run()
        return json({ deleted: true, image })
      }

      return json({ error: 'Not found.' }, 404)
    } catch (error) {
      console.error(error)
      return json({ error: 'Database request failed.' }, 500)
    }
  },
}
