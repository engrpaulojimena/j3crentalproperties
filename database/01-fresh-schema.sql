-- J3C Rental Properties - fresh Cloudflare D1 schema
-- Run this on a NEW D1 database.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  development_name TEXT,
  building_name TEXT,
  floor_label TEXT,
  location TEXT NOT NULL,
  full_address TEXT,
  monthly_rate REAL NOT NULL,
  status TEXT DEFAULT 'Available',
  available_on TEXT,
  description TEXT,
  rent_includes TEXT,
  lease_term TEXT,
  map_url TEXT,
  unit_code TEXT,
  property_type TEXT DEFAULT 'Condominium',
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  furnishing TEXT,
  utility_notes TEXT,
  amenities TEXT,
  is_featured INTEGER DEFAULT 0,
  slug TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS property_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  image_key TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_cover INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_property_images_property_id
ON property_images(property_id);

CREATE INDEX IF NOT EXISTS idx_properties_development
ON properties(development_name);

CREATE INDEX IF NOT EXISTS idx_properties_status
ON properties(status, available_on);
