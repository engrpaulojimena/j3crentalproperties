# J3C revision bundle

Included fixes from the latest review:

- Location photo uploads no longer stop on `Not found.` when an older Cloudflare Worker is still deployed. The admin first uses the dedicated location-gallery endpoint, then falls back to the existing property-image endpoint with a private marker. These fallback images are shown only in the public location gallery and are hidden from unit galleries.
- The hero footer no longer repeats `Direct rental inquiries`; the location line now includes Valenzuela, Taguig, Alabang, Manila, Quezon City, Tagaytay, and Pampanga.
- Location-card highlight amenities are de-duplicated case/spacing/punctuation-insensitively (for example `Clubhouse` and `Club House` are treated as the same amenity).
- Unit details now have a clear `Back to Available Units` control, kept visible on mobile while the detail view scrolls.

The newer Cloudflare Worker code with the dedicated `development_images` table is still included and remains the preferred storage when deployed.

## Contact links update
- Viber now uses the QR-derived link: `viber://add?number=639473068528`.
- Messenger now opens the provided Messenger conversation link in a new tab.
