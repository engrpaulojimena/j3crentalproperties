import { NextResponse } from 'next/server'
import { workerFetch, workerConfigured } from '../../../lib/workerApi'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!workerConfigured()) {
    return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  }
  try {
    return NextResponse.json(await workerFetch('/properties'))
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}

export async function POST(request) {
  if (!workerConfigured()) {
    return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
  }
  try {
    const body = await request.json()
    const data = await workerFetch('/properties', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
