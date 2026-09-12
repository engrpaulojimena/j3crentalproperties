# J3C revision bundle

Included fixes from the latest review:

- Location photo uploads no longer stop on `Not found.` when an older Cloudflare Worker is still deployed. The admin first uses the dedicated location-gallery endpoint, then falls back to the existing property-image endpoint with a private marker. These fallback images are shown only in the public location gallery and are hidden from unit galleries.
- The hero footer no longer repeats `Direct rental inquiries`; the location line now includes Valenzuela, Taguig, Alabang, Manila, Quezon City, Tagaytay, and Pampanga.
- Location-card highlight amenities are de-duplicated case/spacing/punctuation-insensitively (for example `Clubhouse` and `Club House` are treated as the same amenity).
- Unit details now have a clear `Back to Available Units` control, kept visible on mobile while the detail view scrolls.

The newer Cloudflare Worker code with the dedicated `development_images` table is still included and remains the preferred storage when deployed.

## Contact links update
- Viber button now uses Viber's browser-friendly Click-to-Chat URL: `https://viber.me/639473068528`, which is more reliable from a public website than the QR's `viber://add` deep link.
- Messenger now opens the provided Messenger conversation link in a new tab.

## Mobile unit-detail navigation fix
- Keeps the fixed site header/Menu accessible while a unit detail is open on phones.
- Moves the persistent **Back to Available Units** and close controls below the mobile header so they are no longer hidden behind it.
- Clicking **Menu → Available Units** (or any other in-page navigation link) now closes the open unit detail before navigating.
- Hash navigation also closes the unit detail as a fallback.

## Mobile navigation alignment
- Back and Close controls now sit in one aligned sticky toolbar above the unit gallery on mobile.
- The controls no longer float over the property photo or compete visually with the gallery arrows.

## Mobile unit detail layout polish
- Back and Close controls now sit in one aligned sticky toolbar above the gallery on phones.
- The thumbnail rail below the main image is protected from flex shrinking and keeps full-size horizontal thumbnails.
- The thumbnail row remains horizontally scrollable for units with many photos.

## Mobile unit detail middle-section fix
- Forced the mobile unit detail modal into normal block flow so the details panel cannot overlap the gallery.
- Moved the thumbnail rail onto the light content background with a divider for clearer separation.
- Kept thumbnails horizontally scrollable and preserved the sticky Back/Close toolbar.

## September 12 follow-up revisions
- Added `Vacant` as a supported unit status alongside Available, Available Soon, and Occupied in Admin and the Cloudflare Worker payload validation. Vacant units are treated as currently available on public unit details and inquiry selection.
- Replaced public references to `Nathaniel Alexander Torres` with `Chiqui Torres`, including the team card initials.
- Added `Bulacan` and `Batangas` to the hero location strip for future listings.


## Contact-link reliability fix
- Viber now uses the installed-app deep link `viber://chat/?number=%2B639473068528` instead of `viber.me`, avoiding the Viber Business Account requirement of the web Click-to-Chat URL.
- The Viber link opens in the current tab/user gesture (no `target=_blank`) so mobile browsers are less likely to block the app handoff.
- Messenger no longer uses the share-specific `/e2ee/t/` route; it now uses the standard Messenger thread route `https://www.messenger.com/t/1567965688161013/`.

## Nodemailer inquiry email setup
- Inquiry form now sends real submissions through `POST /api/inquiry` instead of showing a preview-only success message.
- Added Gmail SMTP/Nodemailer server route with validation, optional renter `Reply-To`, and a hidden honeypot field.
- Added server-side SMTP environment variable placeholders to `.env.example` and setup instructions in `NODEMAILER-SETUP.md`.
- Added `nodemailer` to `package.json` dependencies.
