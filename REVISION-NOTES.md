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
