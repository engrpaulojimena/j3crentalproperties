import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value, max = 2000) {
  return String(value ?? '').trim().slice(0, max)
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function smtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = String(process.env.SMTP_SECURE ?? 'true').toLowerCase() !== 'false'
  const user = clean(process.env.SMTP_USER, 320)
  const pass = clean(process.env.SMTP_PASS, 256).replace(/\s+/g, '')
  const to = clean(process.env.INQUIRY_TO || user, 320)

  if (!user || !pass || !to) return null
  return { host, port, secure, user, pass, to }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Hidden honeypot. Bots that fill this are acknowledged but not emailed.
    if (clean(body.website, 200)) {
      return Response.json({ ok: true })
    }

    const name = clean(body.name, 120)
    const phone = clean(body.phone, 80)
    const email = clean(body.email, 320)
    const property = clean(body.property, 300)
    const message = clean(body.message, 4000)

    if (!name || !phone || !message) {
      return Response.json(
        { error: 'Please complete your name, contact number, and inquiry.' },
        { status: 400 }
      )
    }

    if (email && !EMAIL_RE.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const smtp = smtpConfig()
    if (!smtp) {
      console.error('Inquiry email is not configured. Missing SMTP_USER, SMTP_PASS, or INQUIRY_TO.')
      return Response.json(
        { error: 'Email sending is not configured yet. Please contact J3C directly.' },
        { status: 503 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    })

    const safeName = escapeHtml(name)
    const safePhone = escapeHtml(phone)
    const safeEmail = escapeHtml(email || 'Not provided')
    const safeProperty = escapeHtml(property || 'Not specified')
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')
    const subjectProperty = (property || 'General Inquiry').replace(/[\r\n]+/g, ' ')

    await transporter.sendMail({
      from: `J3C Rental Website <${smtp.user}>`,
      to: smtp.to,
      ...(email ? { replyTo: email } : {}),
      subject: `New Rental Inquiry - ${subjectProperty}`.slice(0, 180),
      text: [
        'New inquiry from the J3C Rental Properties website',
        '',
        `Name: ${name}`,
        `Contact number: ${phone}`,
        `Email: ${email || 'Not provided'}`,
        `Property of interest: ${property || 'Not specified'}`,
        '',
        'Inquiry:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#10203a;max-width:680px;margin:auto">
          <h2 style="margin-bottom:4px">New Rental Inquiry</h2>
          <p style="margin-top:0;color:#5d6878">Submitted through j3crentalproperties.com</p>
          <table style="border-collapse:collapse;width:100%;margin:20px 0">
            <tr><td style="padding:8px 0;font-weight:700;width:180px">Name</td><td>${safeName}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Contact number</td><td>${safePhone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Email</td><td>${safeEmail}</td></tr>
            <tr><td style="padding:8px 0;font-weight:700">Property</td><td>${safeProperty}</td></tr>
          </table>
          <div style="background:#f7f3ea;border-radius:12px;padding:18px 20px">
            <strong>Inquiry</strong>
            <p style="margin-bottom:0">${safeMessage}</p>
          </div>
          ${email ? '<p style="color:#5d6878;font-size:13px">Reply to this email to respond directly to the renter.</p>' : ''}
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Inquiry email failed:', error)
    return Response.json(
      { error: 'We could not send your inquiry right now. Please try again or use the contact options below.' },
      { status: 500 }
    )
  }
}
