# J3C Inquiry Email Setup — Nodemailer + Gmail

The website inquiry form now posts to `/api/inquiry` and sends the message to `j3crentalproperties@gmail.com` through Gmail SMTP.

## 1. Install dependencies

After extracting/updating the project, run:

```bash
npm install
```

`nodemailer` is already listed in `package.json`.

## 2. Add these to `.env.local`

Keep the existing Worker and Cloudinary variables, then add:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=j3crentalproperties@gmail.com
SMTP_PASS=PASTE_GOOGLE_APP_PASSWORD_HERE
INQUIRY_TO=j3crentalproperties@gmail.com
```

For `SMTP_PASS`, paste the Google **App Password**, not the normal Gmail password. Spaces are accepted; the API removes them before authenticating.

Do not commit `.env.local` to Git. The project `.gitignore` already excludes it.

## 3. Production deployment

Add the same SMTP variables to the hosting provider's server-side Environment Variables / Secrets, then redeploy. A local `.env.local` file does not automatically configure the live website.

This endpoint requires a Node.js-compatible Next.js server runtime because Nodemailer uses SMTP. It is not intended to run inside the Cloudflare Worker.

## Email behavior

- Recipient: `INQUIRY_TO`
- Sender: `SMTP_USER`
- If the renter supplies an email address, it is set as `Reply-To`, so replying from Gmail goes directly to the renter.
- If no renter email is supplied, the inquiry still sends with their phone number.
