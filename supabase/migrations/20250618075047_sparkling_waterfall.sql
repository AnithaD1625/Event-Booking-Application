/*
  # Seed sample events

  1. Sample Data
    - Insert sample events for demonstration
    - Various categories and price ranges
    - Different dates and locations
*/

INSERT INTO events (
  title,
  description,
  date,
  time,
  location,
  category,
  price,
  capacity,
  available_spots,
  image_url,
  organizer,
  tags
) VALUES
(
  'Tech Innovation Summit 2025',
  'Join industry leaders and innovators for a day of cutting-edge technology discussions, workshops, and networking opportunities. Discover the latest trends in AI, blockchain, and sustainable tech.',
  '2025-02-15',
  '09:00',
  'San Francisco Convention Center',
  'Technology',
  299,
  500,
  87,
  'https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=800',
  'TechForward Events',
  ARRAY['AI', 'Blockchain', 'Innovation', 'Networking']
),
(
  'Culinary Arts Masterclass',
  'Learn from world-renowned chefs in this intensive hands-on cooking experience. Master advanced techniques, explore global cuisines, and create unforgettable dishes.',
  '2025-02-20',
  '14:00',
  'Culinary Institute Downtown',
  'Food & Drink',
  189,
  24,
  3,
  'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Gourmet Academy',
  ARRAY['Cooking', 'Masterclass', 'Gourmet', 'Hands-on']
),
(
  'Sustainable Living Workshop',
  'Discover practical ways to reduce your environmental impact and live more sustainably. Learn about zero-waste living, renewable energy, and eco-friendly lifestyle choices.',
  '2025-02-25',
  '10:00',
  'Green Community Center',
  'Environment',
  75,
  60,
  22,
  'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800',
  'EcoLife Foundation',
  ARRAY['Sustainability', 'Zero Waste', 'Environment', 'Workshop']
),
(
  'Digital Marketing Bootcamp',
  'Intensive 3-day bootcamp covering all aspects of modern digital marketing including SEO, social media, content marketing, and analytics. Perfect for professionals and entrepreneurs.',
  '2025-03-01',
  '09:00',
  'Business Innovation Hub',
  'Business',
  450,
  40,
  15,
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Digital Growth Agency',
  ARRAY['Marketing', 'SEO', 'Social Media', 'Analytics']
),
(
  'Jazz Under the Stars',
  'An enchanting evening of smooth jazz featuring renowned musicians performing classic and contemporary pieces under the open sky. Wine and gourmet appetizers included.',
  '2025-03-05',
  '19:30',
  'Riverside Amphitheater',
  'Music',
  85,
  200,
  45,
  'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
  'City Arts Council',
  ARRAY['Jazz', 'Live Music', 'Outdoor', 'Wine']
),
(
  'Mindfulness & Meditation Retreat',
  'Escape the hustle and bustle in this transformative weekend retreat focused on mindfulness practices, guided meditation, and personal wellness. All levels welcome.',
  '2025-03-10',
  '08:00',
  'Mountain View Wellness Center',
  'Wellness',
  225,
  30,
  8,
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Zen Wellness Institute',
  ARRAY['Meditation', 'Mindfulness', 'Wellness', 'Retreat']
);