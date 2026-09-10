import 'server-only'
import crypto from 'node:crypto'

export function cloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_UPLOAD_PRESET
  )
}

export function signCloudinaryParams(params) {
  const secret = process.env.CLOUDINARY_API_SECRET
  const serialized = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return crypto.createHash('sha1').update(`${serialized}${secret}`).digest('hex')
}

export async function destroyCloudinaryImage(publicId) {
  if (!cloudinaryConfigured() || !publicId) return { skipped: true }

  const timestamp = Math.floor(Date.now() / 1000)
  const params = { public_id: publicId, timestamp }
  const signature = signCloudinaryParams(params)
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: process.env.CLOUDINARY_API_KEY,
    signature,
  })

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    { method: 'POST', body }
  )

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error?.message || 'Cloudinary delete failed.')
  return data
}
