# J3C Rental Properties — Organized Listings + Editable Unit Data

This build keeps the public site elegant while making the rental-unit content manageable from the simple owner/admin dashboard.


### Client-provided website content

The public website now includes the finalized client-provided business profile and rental information:

- New About section with J3C history, services, experience highlights, current portfolio summary, and planned Pampanga expansion for 2027.
- Official FAQs covering inquiries/viewings, utilities, advance reservation, pets, and condo dues.
- Rental guidelines covering quiet hours, cleanliness, smoking, pets, occupancy, and scheduled inspections.
- Rental requirements covering valid IDs, tenant information sheet, proof of capacity to pay, and initial payment requirements.
- Standard payment terms: 1 month advance plus 2 months security deposit.
- Property-area overview for Manila, Valenzuela, Taguig, Alabang, and planned Pampanga locations.
- Official contact number and Gmail address added to the contact section, with the provided number linked to Viber and WhatsApp.

## Current structure

- Public website: Next.js
- Admin: `/adminlogin` -> `/admin`
- Database: Cloudflare D1 through the `j3c-rental-api` Worker
- Photos: Cloudinary for new admin uploads
- Shared community imagery: bundled website assets for the current mockup
- Hosting: Vercel-ready

## What changed in this build

### Public website

- Units are grouped by development/property instead of appearing as one mixed list.
- Fini Homes Condominium and Chateau Valenzuela are presented as separate rental locations.
- Chateau Valenzuela includes the supplied shared community/amenity photos once at the development level instead of repeating them on every unit.
- Current availability supports:
  - `Available`
  - `Available Soon`
  - `Occupied` with a future `available_on` date, so visitors can still inquire in advance.
- Added confirmed Unit 1, Unit 2, and Unit 3 data to the included seed scripts.
- Inquiry dropdown includes current and upcoming units.

### Admin dashboard

The dashboard stays intentionally simple. It still only provides the core management actions:

- Add unit
- Edit unit
- Delete unit
- Upload/remove unit photos
- Update availability

Extra fields were added only because they are needed by the real listings:

- Development / property
- Unit number
- Building
- Floor
- Unit name
- Location + full address
- Monthly rent
- Status + future availability date
- Bedrooms / bathrooms
- Furnishing
- Utilities / included fixtures
- Rent inclusions
- Lease term
- Description
- Highlights / amenities
- Google Maps link

No analytics, booking management, tenant records, or other expansion features were added.

## IMPORTANT: existing bundled photos vs Cloudinary

The current Fini Homes unit photos are still bundled in `/public/photos/unit-1` so the project works immediately. The D1 seed script creates `property_images` rows that point to those local files.

That means the owner can edit the unit from Admin, remove those image rows, and upload replacement photos to Cloudinary. Once replaced, the public site uses the Cloudinary photos. The old bundled files can remain unused or be removed from the project later.

Chateau Valenzuela community photos are shared development-level assets under `/public/photos/chateau`. The newly supplied Janina Bldg. 3rd Floor interior photos are stored separately under `/public/photos/unit-2` and seeded as editable image rows for Unit 2.

## Database setup

A `database` folder is included so the same setup can be recreated quickly on the future client-owned Cloudflare account.

### Fresh client-owned D1 account

Run in this order:

1. `database/01-fresh-schema.sql`
2. `database/03-seed-current-listings.sql`
3. `database/04-verify.sql`

### Current test D1 database

The existing database already has the earlier base fields. Run:

1. `database/02-upgrade-existing-db.sql`
2. `database/03-seed-current-listings.sql`
3. `database/04-verify.sql`

If one ALTER statement says `duplicate column name`, that field already exists; continue with the remaining statements.

After changing the schema, redeploy the updated Worker code from:

`cloudflare-worker/PASTE-IN-CLOUDFLARE-WORKER.js`

The D1 binding must still be named:

`DB`

and the Worker secret must still be named:

`J3C_API_SECRET`

## Local environment

Copy `.env.example` to `.env.local` and set the actual values:

```env
J3C_WORKER_API_URL=https://j3c-rental-api.YOUR-SUBDOMAIN.workers.dev
J3C_WORKER_API_SECRET=YOUR_PRIVATE_SECRET

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_UPLOAD_PRESET=j3c-properties
```

Never use `NEXT_PUBLIC_` for the Worker secret or Cloudinary API secret.

After editing `.env.local`, fully restart Next.js:

```bash
npm run dev
```

## Connection test

Open:

`http://localhost:3000/api/backend-status`

Expected result after the Worker is correctly deployed:

```json
{"ok":true,"configured":true,"health":{"ok":true,"service":"j3c-d1-api"}}
```

Then verify D1 directly with:

```sql
SELECT * FROM properties ORDER BY id DESC;
```

## Current listing data included

### Unit 1 — Fini Homes Condominium

- 2 Bedroom Unit - 3rd Floor
- Marulas, Valenzuela City
- PHP 18,000/month
- Condo dues included
- Fully furnished
- Minimum 1-year contract
- Available October 25, 2026
- Google Maps link included
- Existing unit photos represented as editable D1 image rows

### Unit 2 — Chateau Valenzuela

- Janina Bldg., 3rd Floor
- 2 Bedroom Unit
- Lingunan, Valenzuela City
- PHP 10,000/month
- Condo dues included
- Semi furnished
- Own electric and water meter
- 1 window-type aircon
- 1-year contract
- Occupied; available February 16, 2027
- Chateau shared amenities/community photos displayed at the development level

### Unit 3 — Chateau Valenzuela

- Janina Bldg., 5th Floor
- 2 Bedroom Unit
- Lingunan, Valenzuela City
- PHP 9,000/month
- Condo dues included
- Semi furnished
- 1-year contract
- Occupied; available July 18, 2027
- Uses the shared Chateau community photos until dedicated Unit 3 interior photos are supplied

## Temporary admin preview credentials

- URL: `/adminlogin`
- Email: `admin@j3crentalproperties.com`
- Password: `J3C@Admin2026`

This is still a temporary development login and must be replaced with real authentication before production.

## Photo association note

The five photos received together with the label **“Janina Bldg - Unit 3rd Floor Photos”** are currently assigned to **Unit 2 / Janina Bldg. 3rd Floor**. The newly supplied **Unit 3 / Janina Bldg. 5th Floor** details are included in D1 seed data, but no dedicated Unit 3 interior photos are assigned yet. If those five photos were intended for Unit 3 instead, only the image rows/files need to be reassigned.

## Public listing visibility update
The public Available Rentals browser now shows all units returned by D1, including occupied units. Availability status and future available dates remain visible on each card so the client can later decide whether occupied listings should stay public or be hidden.

## Listing layout update
The public rental section uses the classic normal listing-card layout again. All unit cards now keep a consistent size on desktop (two-column grid), including developments with only one listed unit. Full unit details remain available through the detail modal.

## Admin property/location lookup
The admin form now suggests values already used by existing units for both **Development / property** and **Location**. The owner can still type a brand-new value. Before saving, case, punctuation, and spacing variations that match an existing value are normalized back to the existing spelling so the public property grouping stays consistent.

## 2026-09-11 admin fixes
- Admin sidebar is now fixed to the full viewport height on desktop and no longer ends halfway down long property lists.
- Edit Unit now sends and reloads all visible property fields reliably.
- Worker PUT merges with the existing D1 record before updating so fields that are not exposed in the form (such as slug / featured state) are not accidentally erased.
- Development / property is required to keep public property grouping consistent.
- The updated Worker health response reports version `2026-09-11-admin-save-v2`.

IMPORTANT: Redeploy `cloudflare-worker/PASTE-IN-CLOUDFLARE-WORKER.js` to the Cloudflare Worker after updating the Next.js project. Frontend-only deployment will not fix D1 update persistence if an older Worker is still deployed.

## Property detail modal layout fix
The public property modal now uses a balanced desktop layout: the gallery fills the left panel without leaving a large empty navy area, while the property details scroll independently on the right. On tablet/mobile the modal stacks and uses a single natural scroll. Long unit titles also scale down and wrap more cleanly.

## Homepage hero slider + browser icon
- Homepage hero background now rotates through six enhanced property/community images automatically every 3 seconds.
- The transition is a smooth cross-fade with a subtle zoom; there are intentionally no slider arrows, dots, or controls.
- Hero images are optimized WebP files under `public/photos/hero/`.
- Browser favicon is `public/favicon.svg` and is registered through Next.js metadata in `app/layout.js`.
