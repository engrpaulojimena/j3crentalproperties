import { NextResponse } from 'next/server'
import { cloudinaryConfigured, signCloudinaryParams } from '../../../../lib/cloudinary'

export async function POST() {
  if (!cloudinaryConfigured()) {
    return NextResponse.json({ error: 'cloudinary_not_configured' }, { status: 503 })
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
  const params = { timestamp, upload_preset: uploadPreset }

  return NextResponse.json({
    timestamp,
    signature: signCloudinaryParams(params),
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset,
  })
}
