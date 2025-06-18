export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
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
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          category?: string;
          price?: number;
          capacity?: number;
          available_spots?: number;
          image_url?: string;
          organizer?: string;
          tags?: string[];
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
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
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          attendee_name: string;
          attendee_email: string;
          attendee_phone: string;
          ticket_quantity: number;
          special_requests?: string | null;
          total_amount: number;
          booking_status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          attendee_name?: string;
          attendee_email?: string;
          attendee_phone?: string;
          ticket_quantity?: number;
          special_requests?: string | null;
          total_amount?: number;
          booking_status?: 'pending' | 'confirmed' | 'cancelled';
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}