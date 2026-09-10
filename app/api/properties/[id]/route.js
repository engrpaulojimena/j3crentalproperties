import { NextResponse } from 'next/server'
import { workerFetch, workerConfigured } from '../../../../lib/workerApi'
import { destroyCloudinaryImage } from '../../../../lib/cloudinary'

export const dynamic = 'force-dynamic'

export async function PUT(request, { params }) {
  if (!workerConfigured()) return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  try {
    const { id } = await params
    const body = await request.json()
    return NextResponse.json(await workerFetch(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export async function DELETE(_request, { params }) {
  if (!workerConfigured()) return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  try {
    const { id } = await params
    const current = await workerFetch(`/properties/${id}`)
    for (const image of current.property?.images || []) {
      try { await destroyCloudinaryImage(image.image_key) } catch (error) { console.error(error) }
    }
    return NextResponse.json(await workerFetch(`/properties/${id}`, { method: 'DELETE' }))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
