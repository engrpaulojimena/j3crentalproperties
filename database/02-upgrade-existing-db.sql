-- J3C Rental Properties - upgrade the CURRENT test D1 database
-- Run each ALTER TABLE statement ONCE in the D1 Console.
-- If Cloudflare says "duplicate column name", that specific column already exists; continue to the next statement.

ALTER TABLE properties ADD COLUMN full_address TEXT;
ALTER TABLE properties ADD COLUMN available_on TEXT;
ALTER TABLE properties ADD COLUMN rent_includes TEXT;
ALTER TABLE properties ADD COLUMN lease_term TEXT;
ALTER TABLE properties ADD COLUMN map_url TEXT;
ALTER TABLE properties ADD COLUMN development_name TEXT;
ALTER TABLE properties ADD COLUMN building_name TEXT;
ALTER TABLE properties ADD COLUMN floor_label TEXT;
ALTER TABLE properties ADD COLUMN furnishing TEXT;
ALTER TABLE properties ADD COLUMN utility_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_properties_development
ON properties(development_name);

CREATE INDEX IF NOT EXISTS idx_properties_status
ON properties(status, available_on);

-- Location/development gallery photos used by the public Locations section.


CREATE TABLE IF NOT EXISTS development_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  development_name TEXT NOT NULL,
  image_key TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_cover INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_development_images_name
ON development_images(development_name);
