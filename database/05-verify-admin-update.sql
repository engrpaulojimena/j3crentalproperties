-- Run after editing a unit from the admin page to verify the values saved in D1.
SELECT
  id,
  development_name,
  unit_code,
  building_name,
  floor_label,
  name,
  location,
  full_address,
  monthly_rate,
  status,
  available_on,
  property_type,
  bedrooms,
  bathrooms,
  furnishing,
  utility_notes,
  rent_includes,
  lease_term,
  map_url,
  updated_at
FROM properties
ORDER BY updated_at DESC, id DESC;
