/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `time` (time)
      - `location` (text)
      - `category` (text)
      - `price` (numeric)
      - `capacity` (integer)
      - `available_spots` (integer)
      - `image_url` (text)
      - `organizer` (text)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policy for public read access
    - Add policy for authenticated users to create events
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  capacity integer NOT NULL DEFAULT 0,
  available_spots integer NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  organizer text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);