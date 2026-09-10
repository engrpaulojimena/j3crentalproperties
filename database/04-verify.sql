-- Quick checks after migration / seed
SELECT id, development_name, unit_code, name, monthly_rate, status, available_on
FROM properties
ORDER BY development_name, id;

SELECT property_id, image_url, is_cover, sort_order
FROM property_images
ORDER BY property_id, is_cover DESC, sort_order, id;
