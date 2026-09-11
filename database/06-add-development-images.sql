-- J3C Rental Properties - add editable development/location gallery photos
-- Safe to run more than once.

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
