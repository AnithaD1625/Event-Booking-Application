import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Event } from '../types/Event';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      const formattedEvents: Event[] = data.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        price: event.price,
        capacity: event.capacity,
        available_spots: event.available_spots,
        image_url: event.image_url,
        organizer: event.organizer,
        tags: event.tags,
        created_at: event.created_at,
        updated_at: event.updated_at,
      }));

      setEvents(formattedEvents);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          category: eventData.category,
          price: eventData.price,
          capacity: eventData.capacity,
          available_spots: eventData.available_spots,
          image_url: eventData.image_url,
          organizer: eventData.organizer,
          tags: eventData.tags,
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchEvents(); // Refresh events list
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateEventSpots = async (eventId: string, spotsToReduce: number) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) throw new Error('Event not found');

      const newAvailableSpots = event.available_spots - spotsToReduce;
      
      const { error } = await supabase
        .from('events')
        .update({ available_spots: newAvailableSpots })
        .eq('id', eventId);

      if (error) throw error;
      
      await fetchEvents(); // Refresh events list
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEventSpots,
  };
};