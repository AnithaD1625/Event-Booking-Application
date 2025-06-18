/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `user_id` (uuid, foreign key to auth.users)
      - `attendee_name` (text)
      - `attendee_email` (text)
      - `attendee_phone` (text)
      - `ticket_quantity` (integer)
      - `special_requests` (text)
      - `total_amount` (numeric)
      - `booking_status` (enum: pending, confirmed, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for users to read their own bookings
    - Add policy for authenticated users to create bookings
    - Add policy for users to update their own bookings
*/

CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attendee_name text NOT NULL,
  attendee_email text NOT NULL,
  attendee_phone text NOT NULL,
  ticket_quantity integer NOT NULL DEFAULT 1,
  special_requests text,
  total_amount numeric NOT NULL DEFAULT 0,
  booking_status booking_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_event_id_idx ON bookings(event_id);