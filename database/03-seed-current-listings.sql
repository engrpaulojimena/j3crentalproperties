-- J3C Rental Properties - current confirmed listings
-- Run AFTER 01-fresh-schema.sql on a fresh account, or after 02-upgrade-existing-db.sql on the current database.
-- Safe to run again: each property is inserted only when its slug is not already present.

INSERT INTO properties (
  name, development_name, building_name, floor_label, location, full_address,
  monthly_rate, status, available_on, description, rent_includes, lease_term,
  map_url, unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
  amenities, is_featured, slug
)
SELECT
  '2 Bedroom Unit - 3rd Floor',
  'Fini Homes Condominium',
  '',
  '3rd Floor',
  'Marulas, Valenzuela City',
  '80 Ramon Delfin Street, Barangay Marulas, Valenzuela City, 1440 Metro Manila',
  18000,
  'Available Soon',
  '2026-10-25',
  'Fully furnished 2BR condo unit in a gated, quiet, and peaceful community.',
  'Condo dues included',
  'Minimum 1 year contract',
  'https://maps.app.goo.gl/brh4UNvehwBPC4qc9',
  '1',
  'Condominium',
  2,
  1,
  'Fully Furnished',
  'Window-type aircon in each room. Beddings are not available.',
  'Gated subdivision with 24-hour security, Aircon in each room (window type), Swimming pool, Clubhouse, Pay parking space for rent, Fully furnished, Near OLFU School and Hospital, 3–5 minutes from Monumento LRT',
  1,
  'fini-homes-unit-1'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE slug = 'fini-homes-unit-1');

INSERT INTO properties (
  name, development_name, building_name, floor_label, location, full_address,
  monthly_rate, status, available_on, description, rent_includes, lease_term,
  map_url, unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
  amenities, is_featured, slug
)
SELECT
  '2 Bedroom Unit - Janina Bldg.',
  'Chateau Valenzuela',
  'Janina Bldg.',
  '3rd Floor',
  'Lingunan, Valenzuela City',
  '16 P. Gregorio Street, Brgy. Lingunan, Valenzuela City, 1446 Metro Manila',
  10000,
  'Occupied',
  '2027-02-16',
  'Semi-furnished 2BR condominium unit in a secured, peaceful, and quiet community.',
  'Condo dues included',
  '1 Year Contract',
  '',
  '2',
  'Condominium',
  2,
  1,
  'Semi Furnished',
  'Own electric and water meter. Includes 1 window-type aircon.',
  'Roof Deck, Laundry Cage, Swimming Pool, Basketball Court, Playground, Club House, Parking Area For Rent, 24-hour security, Easy access from NLEX, Near Lingunan Barangay Hall 3S Center, Walking distance to schools, drugstore, market, convenience store and other establishments, One ride to Dalandanan and Paso de Blas (VGC Terminal)',
  0,
  'chateau-valenzuela-unit-2'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE slug = 'chateau-valenzuela-unit-2');

INSERT INTO properties (
  name, development_name, building_name, floor_label, location, full_address,
  monthly_rate, status, available_on, description, rent_includes, lease_term,
  map_url, unit_code, property_type, bedrooms, bathrooms, furnishing, utility_notes,
  amenities, is_featured, slug
)
SELECT
  '2 Bedroom Unit - Janina Bldg.',
  'Chateau Valenzuela',
  'Janina Bldg.',
  '5th Floor',
  'Lingunan, Valenzuela City',
  '16 P. Gregorio Street, Brgy. Lingunan, Valenzuela City, 1446 Metro Manila',
  9000,
  'Occupied',
  '2027-07-18',
  'Semi-furnished 2BR condominium unit in a secured, peaceful, and quiet community.',
  'Condo dues included',
  '1 Year Contract',
  '',
  '3',
  'Condominium',
  2,
  0,
  'Semi Furnished',
  '',
  'Roof Deck, Laundry Cage, Swimming Pool, Basketball Court, Playground, Club House, Parking Area For Rent, 24-hour security, Easy access from NLEX, Near Lingunan Barangay Hall 3S Center, Walking distance to schools, drugstore, market, convenience store and other establishments, One ride to Dalandanan and Paso de Blas (VGC Terminal), Suitable for families and work-from-home renters looking for a quiet city environment',
  0,
  'chateau-valenzuela-unit-3'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE slug = 'chateau-valenzuela-unit-3');

-- Janina Bldg. 3rd Floor photos supplied for Chateau Valenzuela Unit 2.
-- They point to bundled project files and remain replaceable from Admin later via Cloudinary.
INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/chateau-unit-2/bedroom-01', '/photos/unit-2/bedroom-01.jpg', 'Bedroom with study desk and window-type aircon', 1, 1
FROM properties p WHERE p.slug = 'chateau-valenzuela-unit-2'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-2/bedroom-01.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/chateau-unit-2/hallway-bedrooms', '/photos/unit-2/hallway-bedrooms.jpg', 'Interior hallway showing the two bedroom entrances', 2, 0
FROM properties p WHERE p.slug = 'chateau-valenzuela-unit-2'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-2/hallway-bedrooms.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/chateau-unit-2/kitchen-living', '/photos/unit-2/kitchen-living.jpg', 'Kitchen and built-in entertainment area', 3, 0
FROM properties p WHERE p.slug = 'chateau-valenzuela-unit-2'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-2/kitchen-living.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/chateau-unit-2/bathroom', '/photos/unit-2/bathroom.jpg', 'Bathroom', 4, 0
FROM properties p WHERE p.slug = 'chateau-valenzuela-unit-2'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-2/bathroom.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/chateau-unit-2/bedroom-02', '/photos/unit-2/bedroom-02.jpg', 'Second bedroom with window-type aircon', 5, 0
FROM properties p WHERE p.slug = 'chateau-valenzuela-unit-2'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-2/bedroom-02.jpg');

-- Existing Fini Homes photos are represented as editable image rows.
-- They currently point to files bundled in /public. Admin can remove these rows or replace them with Cloudinary uploads later.
INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/dining', '/photos/unit-1/dining.jpg', 'Dining area and kitchen', 1, 1
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/dining.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/living-02', '/photos/unit-1/living-room-02.jpg', 'Living room', 2, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/living-room-02.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/living-01', '/photos/unit-1/living-room-01.jpg', 'Living room and hallway', 3, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/living-room-01.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/kitchen', '/photos/unit-1/kitchen.jpg', 'Kitchen', 4, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/kitchen.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/bedroom-bunk', '/photos/unit-1/bedroom-bunk.jpg', 'Bedroom with bunk bed', 5, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/bedroom-bunk.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/bedroom-empty', '/photos/unit-1/bedroom-empty.jpg', 'Second bedroom', 6, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/bedroom-empty.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/bathroom', '/photos/unit-1/bathroom.jpg', 'Bathroom', 7, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/bathroom.jpg');

INSERT INTO property_images (property_id, image_key, image_url, alt_text, sort_order, is_cover)
SELECT p.id, 'local/fini-unit-1/shower', '/photos/unit-1/shower.jpg', 'Shower area', 8, 0
FROM properties p WHERE p.slug = 'fini-homes-unit-1'
AND NOT EXISTS (SELECT 1 FROM property_images i WHERE i.property_id = p.id AND i.image_url = '/photos/unit-1/shower.jpg');
