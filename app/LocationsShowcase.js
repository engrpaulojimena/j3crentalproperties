'use client'

import { useEffect, useMemo, useState } from 'react'
import LocationImageSlider from './LocationImageSlider'

const communityImages = {
  'Fini Homes Condominium': [
    { src: '/photos/fini-building.jpg', label: 'Fini Homes Exterior', alt: 'Fini Homes Condominium exterior' },
    { src: '/photos/fini-dining.jpg', label: 'Dining Area', alt: 'Fini Homes dining area' },
    { src: '/photos/fini-living-02.jpg', label: 'Living Area', alt: 'Fini Homes living area' },
    { src: '/photos/fini-kitchen.jpg', label: 'Kitchen', alt: 'Fini Homes kitchen area' },
    { src: '/photos/fini-bedroom.jpg', label: 'Bedroom', alt: 'Fini Homes bedroom' },
    { src: '/photos/fini-bathroom-01.jpg', label: 'Bathroom', alt: 'Fini Homes bathroom' },
  ],
  'Chateau Valenzuela': [
    { src: '/photos/chateau/main-gate.jpg', label: 'Main Gate', alt: 'Chateau Valenzuela main gate' },
    { src: '/photos/chateau/buildings.jpg', label: 'Buildings', alt: 'Chateau Valenzuela buildings' },
    { src: '/photos/chateau/clubhouse.jpg', label: 'Clubhouse', alt: 'Chateau Valenzuela clubhouse' },
    { src: '/photos/chateau/pool.jpg', label: 'Swimming Pool', alt: 'Chateau Valenzuela swimming pool' },
    { src: '/photos/chateau/basketball-court.jpg', label: 'Basketball Court', alt: 'Chateau Valenzuela basketball court' },
    { src: '/photos/chateau/park.jpg', label: 'Park & Landscaped Area', alt: 'Chateau Valenzuela pool and landscaped area' },
  ],
}

function parseAmenities(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch {}
  return String(value).split(',').map((item) => item.trim()).filter(Boolean)
}

const LOCATION_IMAGE_PREFIX = '[J3C_LOCATION]'

function amenityKey(value) {
  return String(value || '')
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function uniqueAmenities(items) {
  const seen = new Set()
  const output = []
  for (const item of items) {
    const clean = String(item || '').trim()
    const key = amenityKey(clean)
    if (!clean || !key || seen.has(key)) continue
    seen.add(key)
    output.push(clean)
  }
  return output
}

function isLegacyLocationImage(image) {
  return String(image?.alt_text || '').startsWith(LOCATION_IMAGE_PREFIX)
}

function cleanLocationAlt(image, fallback) {
  const alt = String(image?.alt_text || '').replace(LOCATION_IMAGE_PREFIX, '').trim()
  return alt || fallback
}

function slugify(value) {
  return String(value || 'location')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'location'
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function LocationsShowcase() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadLocations({ silent = false } = {}) {
    if (!silent) setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/properties', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not load property locations.')
      setProperties(Array.isArray(data.properties) ? data.properties : [])
    } catch (err) {
      setError(err.message || 'Could not load property locations.')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    loadLocations()
    const refreshOnFocus = () => loadLocations({ silent: true })
    window.addEventListener('focus', refreshOnFocus)
    return () => window.removeEventListener('focus', refreshOnFocus)
  }, [])

  const developments = useMemo(() => {
    const grouped = new Map()

    for (const property of properties) {
      const location = String(property.location || property.full_address || 'J3C Rental Location').trim()
      const developmentName = String(property.development_name || property.name || 'J3C Rental Property').trim()
      const key = `${location.toLowerCase()}::${developmentName.toLowerCase()}`

      if (!grouped.has(key)) {
        grouped.set(key, { location, name: developmentName, units: [] })
      }
      grouped.get(key).units.push(property)
    }

    return [...grouped.values()]
      .map((group) => {
        const { location, name, units } = group
        const address = units.find((unit) => unit.full_address)?.full_address || location
        const mapUrl = units.find((unit) => unit.map_url)?.map_url || ''
        const managedLocationImages = (units.find((unit) => Array.isArray(unit.development_images) && unit.development_images.length)?.development_images || [])
          .filter((image) => image?.image_url)
          .slice(0, 8)
          .map((image, index) => ({
            src: image.image_url,
            label: image.alt_text || `${name} location photo ${index + 1}`,
            alt: image.alt_text || `${name} location photo`,
          }))
        const legacyLocationImages = units
          .flatMap((unit) => unit.images || [])
          .filter((image) => image?.image_url && isLegacyLocationImage(image))
          .slice(0, 8)
          .map((image, index) => {
            const alt = cleanLocationAlt(image, `${name} location photo ${index + 1}`)
            return { src: image.image_url, label: alt, alt }
          })
        const unitImages = units
          .flatMap((unit) => unit.images || [])
          .filter((image) => image?.image_url && !isLegacyLocationImage(image))
          .slice(0, 6)
          .map((image, index) => ({
            src: image.image_url,
            label: image.alt_text || `${name} photo ${index + 1}`,
            alt: image.alt_text || `${name} property photo`,
          }))
        const managedImages = [...managedLocationImages, ...legacyLocationImages]
          .filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index)
          .slice(0, 8)
        const images = managedImages.length
          ? managedImages
          : unitImages.length
            ? unitImages
            : (communityImages[name] || [])
        const amenities = uniqueAmenities(units.flatMap((unit) => parseAmenities(unit.amenities))).slice(0, 4)

        return {
          location,
          name,
          address,
          mapUrl,
          units,
          images: images.length ? images : [{ src: '/hero-building.svg', label: name, alt: `${name} property illustration` }],
          amenities,
        }
      })
      .sort((a, b) => {
        const locationCompare = a.location.localeCompare(b.location)
        return locationCompare || a.name.localeCompare(b.name)
      })
  }, [properties])

  if (loading) {
    return (
      <div className="location-live-state" aria-live="polite">
        <span className="live-dot" /> Loading live property locations…
      </div>
    )
  }

  if (error) {
    return (
      <div className="location-live-state location-live-error">
        <strong>Live location data is temporarily unavailable.</strong>
        <button type="button" onClick={() => loadLocations()}>Try again</button>
      </div>
    )
  }

  if (!developments.length) {
    return <div className="location-live-state">No property locations are listed in the database yet.</div>
  }

  return (
    <div className="location-showcase-grid">
      {developments.map((development, index) => (
        <article
          className="location-property-card is-visible"
          data-reveal
          id={`location-${slugify(development.location)}-${slugify(development.name)}`}
          style={{ '--reveal-delay': `${Math.min(index, 5) * 80}ms` }}
          key={`${development.location}::${development.name}`}
        >
          <div className="location-property-media">
            <LocationImageSlider images={development.images} title={`${development.name} photos`} />
          </div>
          <div className="location-property-copy">
            <span>{development.location.toUpperCase()}</span>
            <h3>{development.name}</h3>
            <p>{development.address}</p>
            <div className="location-tags">
              <b>{development.units.length} {development.units.length === 1 ? 'J3C unit' : 'J3C units'}</b>
              {development.amenities.map((amenity) => <b key={amenity}>{amenity}</b>)}
            </div>
            {development.mapUrl ? (
              <a href={development.mapUrl} target="_blank" rel="noreferrer">Open location <Arrow /></a>
            ) : (
              <a href="#properties">View available units <Arrow /></a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
