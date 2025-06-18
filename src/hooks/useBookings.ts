import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Booking, BookingDetails } from '../types/Event';
import { useAuth } from './useAuth';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          events (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedBookings: Booking[] = data.map(booking => ({
        id: booking.id,
        event_id: booking.event_id,
        user_id: booking.user_id,
        attendee_name: booking.attendee_name,
        attendee_email: booking.attendee_email,
        attendee_phone: booking.attendee_phone,
        ticket_quantity: booking.ticket_quantity,
        special_requests: booking.special_requests,
        total_amount: booking.total_amount,
        booking_status: booking.booking_status,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        event: booking.events ? {
          id: booking.events.id,
          title: booking.events.title,
          description: booking.events.description,
          date: booking.events.date,
          time: booking.events.time,
          location: booking.events.location,
          category: booking.events.category,
          price: booking.events.price,
          capacity: booking.events.capacity,
          available_spots: booking.events.available_spots,
          image_url: booking.events.image_url,
          organizer: booking.events.organizer,
          tags: booking.events.tags,
        } : undefined,
      }));

      setBookings(formattedBookings);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const createBooking = async (bookingDetails: BookingDetails, totalAmount: number) => {
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          event_id: bookingDetails.eventId,
          user_id: user.id,
          attendee_name: bookingDetails.attendeeName,
          attendee_email: bookingDetails.attendeeEmail,
          attendee_phone: bookingDetails.attendeePhone,
          ticket_quantity: bookingDetails.ticketQuantity,
          special_requests: bookingDetails.specialRequests || null,
          total_amount: totalAmount,
          booking_status: 'confirmed',
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchUserBookings(); // Refresh bookings list
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
      
      await fetchUserBookings(); // Refresh bookings list
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    cancelBooking,
    fetchUserBookings,
  };
};