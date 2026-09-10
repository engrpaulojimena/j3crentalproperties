import { NextResponse } from 'next/server'
import { workerConfigured, workerFetch } from '../../../lib/workerApi'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!workerConfigured()) {
    return NextResponse.json({
      ok: false,
      configured: false,
      message: 'Worker environment variables are missing. Set them in .env.local and restart npm run dev.',
    }, { status: 503 })
  }

  try {
    const health = await workerFetch('/health')
    return NextResponse.json({ ok: Boolean(health?.ok), configured: true, health })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      configured: true,
      message: error.message,
    }, { status: error.status || 500 })
  }
}
