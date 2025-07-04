
-- First, let's add comprehensive product data for Fortune Cakes
-- Insert sample products for each category

-- Cakes category products
INSERT INTO products (name, description, price, category_id, featured, customizable, available, image_url) 
SELECT 
  'Wedding Cake',
  'Elegant multi-tier wedding cakes customized for your special day. Available in various flavors including vanilla, chocolate, red velvet, and fruit cake.',
  25000,
  c.id,
  true,
  true,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'cakes'
UNION ALL
SELECT 
  'Birthday Cake',
  'Custom birthday cakes in various sizes and flavors. Perfect for celebrating special moments with beautiful decorations.',
  8000,
  c.id,
  true,
  true,
  true,
  'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'cakes'
UNION ALL
SELECT 
  'Engagement Cake',
  'Romantic engagement cakes designed to celebrate your love story. Customizable with your favorite flavors and decorations.',
  15000,
  c.id,
  false,
  true,
  true,
  'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'cakes'
UNION ALL
SELECT 
  'Chocolate Cake',
  'Rich and moist chocolate cake made with premium cocoa. Available in single or multi-layer options.',
  6000,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'cakes'
UNION ALL
SELECT 
  'Cupcakes (12 pieces)',
  'Delicious assorted cupcakes with various toppings. Perfect for parties and small gatherings.',
  4500,
  c.id,
  false,
  true,
  true,
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'cakes';

-- Pastries category products
INSERT INTO products (name, description, price, category_id, featured, customizable, available, image_url)
SELECT 
  'Meat Pie (6 pieces)',
  'Freshly baked meat pies with seasoned beef filling. A Nigerian favorite snack perfect for any time of day.',
  1800,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pastries'
UNION ALL
SELECT 
  'Fish Roll (6 pieces)',
  'Crispy fish rolls with well-seasoned fish filling. Light and delicious for snacking.',
  2000,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pastries'
UNION ALL
SELECT 
  'Egg Roll (6 pieces)',
  'Golden egg rolls with perfectly boiled eggs wrapped in seasoned dough and fried to perfection.',
  1500,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pastries'
UNION ALL
SELECT 
  'Samosa (10 pieces)',
  'Crispy triangular pastries filled with spiced vegetables or meat. A popular Nigerian snack.',
  2500,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pastries'
UNION ALL
SELECT 
  'Doughnut (6 pieces)',
  'Soft and fluffy doughnuts, lightly glazed and perfect for breakfast or as a sweet treat.',
  1200,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pastries';

-- Bread category products
INSERT INTO products (name, description, price, category_id, featured, customizable, available, image_url)
SELECT 
  'Agege Bread',
  'Authentic Nigerian Agege bread, soft and fluffy. Perfect for breakfast or sandwiches.',
  800,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'bread'
UNION ALL
SELECT 
  'Wheat Bread',
  'Healthy whole wheat bread packed with nutrients. Great for health-conscious customers.',
  1000,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'bread'
UNION ALL
SELECT 
  'Coconut Bread',
  'Sweet coconut-flavored bread with a tropical taste. A Nigerian specialty bread.',
  1200,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'bread';

-- Chin Chin category products
INSERT INTO products (name, description, price, category_id, featured, customizable, available, image_url)
SELECT 
  'Original Chin Chin (500g)',
  'Crunchy and sweet traditional Nigerian chin chin. Made with premium ingredients for the perfect taste.',
  1500,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'chinchin'
UNION ALL
SELECT 
  'Coconut Chin Chin (500g)',
  'Delicious chin chin with coconut flavor. Crispy and irresistible for coconut lovers.',
  1800,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'chinchin'
UNION ALL
SELECT 
  'Spicy Chin Chin (500g)',
  'Traditional chin chin with a spicy kick. Perfect for those who love a bit of heat in their snacks.',
  1800,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'chinchin';

-- Pies category products
INSERT INTO products (name, description, price, category_id, featured, customizable, available, image_url)
SELECT 
  'Puff Puff (12 pieces)',
  'Traditional Nigerian puff puff - soft, round, and slightly sweet. Perfect for any occasion.',
  1000,
  c.id,
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pies'
UNION ALL
SELECT 
  'Cake Parfait',
  'Layered cake parfait with cream and fruits. A delightful dessert in a cup.',
  2500,
  c.id,
  false,
  true,
  true,
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pies'
UNION ALL
SELECT 
  'Fruit Parfait',
  'Fresh fruit parfait with yogurt and granola. Healthy and delicious dessert option.',
  2000,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pies'
UNION ALL
SELECT 
  'Small Chops Tray (50 pieces)',
  'Assorted small chops including meat pie, fish roll, samosa, and spring rolls. Perfect for events.',
  8500,
  c.id,
  true,
  true,
  true,
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pies'
UNION ALL
SELECT 
  'Roasted Peanuts (250g)',
  'Freshly roasted groundnuts seasoned to perfection. A healthy and crunchy snack.',
  800,
  c.id,
  false,
  false,
  true,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format'
FROM categories c WHERE c.slug = 'pies';

-- Add product options for customizable products
INSERT INTO product_options (name, product_id)
SELECT 'Size', p.id FROM products p WHERE p.customizable = true AND p.name LIKE '%Cake%'
UNION ALL
SELECT 'Flavor', p.id FROM products p WHERE p.customizable = true AND p.name LIKE '%Cake%'
UNION ALL
SELECT 'Decoration', p.id FROM products p WHERE p.customizable = true AND p.name LIKE '%Cake%'
UNION ALL
SELECT 'Quantity', p.id FROM products p WHERE p.customizable = true AND p.name LIKE '%Tray%';

-- Add product option choices
INSERT INTO product_option_choices (name, option_id, price_adjustment)
SELECT 'Small (6 inches)', po.id, 0 FROM product_options po WHERE po.name = 'Size'
UNION ALL
SELECT 'Medium (8 inches)', po.id, 5000 FROM product_options po WHERE po.name = 'Size'
UNION ALL
SELECT 'Large (10 inches)', po.id, 10000 FROM product_options po WHERE po.name = 'Size'
UNION ALL
SELECT 'Extra Large (12 inches)', po.id, 15000 FROM product_options po WHERE po.name = 'Size'
UNION ALL
SELECT 'Vanilla', po.id, 0 FROM product_options po WHERE po.name = 'Flavor'
UNION ALL
SELECT 'Chocolate', po.id, 0 FROM product_options po WHERE po.name = 'Flavor'
UNION ALL
SELECT 'Red Velvet', po.id, 2000 FROM product_options po WHERE po.name = 'Flavor'
UNION ALL
SELECT 'Fruit Cake', po.id, 1500 FROM product_options po WHERE po.name = 'Flavor'
UNION ALL
SELECT 'Carrot Cake', po.id, 1500 FROM product_options po WHERE po.name = 'Flavor'
UNION ALL
SELECT 'Basic Decoration', po.id, 0 FROM product_options po WHERE po.name = 'Decoration'
UNION ALL
SELECT 'Premium Decoration', po.id, 3000 FROM product_options po WHERE po.name = 'Decoration'
UNION ALL
SELECT 'Luxury Decoration', po.id, 5000 FROM product_options po WHERE po.name = 'Decoration'
UNION ALL
SELECT '50 pieces', po.id, 0 FROM product_options po WHERE po.name = 'Quantity'
UNION ALL
SELECT '100 pieces', po.id, 8000 FROM product_options po WHERE po.name = 'Quantity'
UNION ALL
SELECT '150 pieces', po.id, 15000 FROM product_options po WHERE po.name = 'Quantity'
UNION ALL
SELECT '200 pieces', po.id, 22000 FROM product_options po WHERE po.name = 'Quantity';
