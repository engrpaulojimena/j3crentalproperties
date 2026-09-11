import { NextResponse } from 'next/server'
import { workerFetch, workerConfigured } from '../../../../lib/workerApi'
import { destroyCloudinaryImage } from '../../../../lib/cloudinary'

export async function DELETE(_request, { params }) {
  if (!workerConfigured()) return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  try {
    const { id } = await params
    const data = await workerFetch(`/development-images/${id}`, { method: 'DELETE' })
    if (data.image?.image_key) await destroyCloudinaryImage(data.image.image_key)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
