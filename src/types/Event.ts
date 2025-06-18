export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  available_spots: number;
  image_url: string;
  organizer: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface BookingDetails {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  ticketQuantity: number;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  attendee_name: string;
  attendee_email: string;
  attendee_phone: string;
  ticket_quantity: number;
  special_requests: string | null;
  total_amount: number;
  booking_status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
  event?: Event;
}

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}