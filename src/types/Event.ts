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
  availableSpots: number;
  image: string;
  organizer: string;
  tags: string[];
}

export interface BookingDetails {
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  ticketQuantity: number;
  specialRequests?: string;
}
