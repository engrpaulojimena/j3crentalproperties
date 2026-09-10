import 'server-only'

export function workerConfigured() {
  return Boolean(process.env.J3C_WORKER_API_URL && process.env.J3C_WORKER_API_SECRET)
}

export async function workerFetch(path, options = {}) {
  if (!workerConfigured()) {
    const error = new Error('Cloudflare Worker API is not configured. Check J3C_WORKER_API_URL and J3C_WORKER_API_SECRET, then restart Next.js.')
    error.code = 'BACKEND_NOT_CONFIGURED'
    error.status = 503
    throw error
  }

  const base = process.env.J3C_WORKER_API_URL.replace(/\/$/, '')
  let response
  try {
    response = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        'content-type': 'application/json',
        'x-j3c-api-key': process.env.J3C_WORKER_API_SECRET,
        ...(options.headers || {}),
      },
      cache: 'no-store',
    })
  } catch (cause) {
    const error = new Error('Could not reach the Cloudflare Worker. Check the Worker URL and deployment.')
    error.status = 502
    error.cause = cause
    throw error
  }

  const contentType = response.headers.get('content-type') || ''
  const raw = await response.text()
  let data = {}
  if (contentType.includes('application/json')) {
    try { data = raw ? JSON.parse(raw) : {} } catch { data = {} }
  } else {
    const error = new Error(
      response.ok
        ? 'Cloudflare Worker is reachable, but the CRUD API code is not deployed yet. Open the Worker, click Edit code, paste cloudflare-worker/src/index.js, then Deploy.'
        : `Cloudflare Worker returned an unexpected response (${response.status}).`
    )
    error.status = response.ok ? 502 : response.status
    throw error
  }

  if (!response.ok) {
    const error = new Error(data.error || `Worker request failed (${response.status}).`)
    error.status = response.status
    throw error
  }

  return data
}
