import { NextResponse } from 'next/server'
import { workerFetch, workerConfigured } from '../../../../../lib/workerApi'

export async function POST(request, { params }) {
  if (!workerConfigured()) return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  try {
    const { id } = await params
    const body = await request.json()
    const data = await workerFetch(`/properties/${id}/images`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
