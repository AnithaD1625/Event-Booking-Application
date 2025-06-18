import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowLeft, User, Tag, Star } from 'lucide-react';
import { Event } from '../types/Event';
import BookingForm from './BookingForm';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const availabilityColor = event.available_spots < 10 ? 'text-red-600' : 'text-green-600';

  if (showBookingForm) {
    return (
      <BookingForm
        event={event}
        onBack={() => setShowBookingForm(false)}
        onBookingComplete={() => {
          setShowBookingForm(false);
          onBack();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {event.category}
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ${event.price}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-800 mb-2">
                      <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-semibold">Date</span>
                    </div>
                    <p className="text-gray-700 ml-8">{formatDate(event.date)}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-800 mb-2">
                      <Clock className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-semibold">Time</span>
                    </div>
                    <p className="text-gray-700 ml-8">{formatTime(event.time)}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-800 mb-2">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-semibold">Location</span>
                    </div>
                    <p className="text-gray-700 ml-8">{event.location}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-800 mb-2">
                      <User className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-semibold">Organizer</span>
                    </div>
                    <p className="text-gray-700 ml-8">{event.organizer}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${event.price}
                    </div>
                    <p className="text-gray-600">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Capacity</span>
                      <span className="font-semibold text-gray-900">{event.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Spots</span>
                      <span className={`font-semibold ${availabilityColor}`}>
                        {event.available_spots}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((event.capacity - event.available_spots) / event.capacity) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBookingForm(true)}
                    disabled={event.available_spots === 0}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                      event.available_spots === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {event.available_spots === 0 ? 'Sold Out' : 'Book Now'}
                  </button>

                  <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;