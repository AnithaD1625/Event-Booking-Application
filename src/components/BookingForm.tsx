import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MessageSquare, CreditCard, Check } from 'lucide-react';
import { Event, BookingDetails } from '../types/Event';

interface BookingFormProps {
  event: Event;
  onBack: () => void;
  onBookingComplete: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ event, onBack, onBookingComplete }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    eventId: event.id,
    attendeeName: '',
    attendeeEmail: '',
    attendeePhone: '',
    ticketQuantity: 1,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bookingDetails.attendeeName.trim()) {
      newErrors.attendeeName = 'Name is required';
    }

    if (!bookingDetails.attendeeEmail.trim()) {
      newErrors.attendeeEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.attendeeEmail)) {
      newErrors.attendeeEmail = 'Please enter a valid email';
    }

    if (!bookingDetails.attendeePhone.trim()) {
      newErrors.attendeePhone = 'Phone number is required';
    }

    if (bookingDetails.ticketQuantity < 1) {
      newErrors.ticketQuantity = 'At least 1 ticket is required';
    }

    if (bookingDetails.ticketQuantity > event.availableSpots) {
      newErrors.ticketQuantity = `Only ${event.availableSpots} spots available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onBookingComplete();
  };

  const handleInputChange = (field: keyof BookingDetails, value: string | number) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const totalPrice = bookingDetails.ticketQuantity * event.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Event Details
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-blue-100">{event.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Attendee Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={bookingDetails.attendeeName}
                      onChange={(e) => handleInputChange('attendeeName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.attendeeName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.attendeeName && (
                      <p className="text-red-500 text-sm mt-1">{errors.attendeeName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={bookingDetails.attendeeEmail}
                      onChange={(e) => handleInputChange('attendeeEmail', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.attendeeEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.attendeeEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.attendeeEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingDetails.attendeePhone}
                      onChange={(e) => handleInputChange('attendeePhone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.attendeePhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.attendeePhone && (
                      <p className="text-red-500 text-sm mt-1">{errors.attendeePhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Tickets
                    </label>
                    <select
                      value={bookingDetails.ticketQuantity}
                      onChange={(e) => handleInputChange('ticketQuantity', parseInt(e.target.value))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.ticketQuantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {Array.from({ length: Math.min(event.availableSpots, 10) }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Ticket' : 'Tickets'}
                        </option>
                      ))}
                    </select>
                    {errors.ticketQuantity && (
                      <p className="text-red-500 text-sm mt-1">{errors.ticketQuantity}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingDetails.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Any special requests or dietary requirements?"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event</span>
                      <span className="font-medium text-gray-900 text-right">{event.title}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="font-medium text-gray-900">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-900 text-right">{event.location}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets</span>
                      <span className="font-medium text-gray-900">{bookingDetails.ticketQuantity}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per ticket</span>
                      <span className="font-medium text-gray-900">${event.price}</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-900">Secure Payment</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Your payment information is encrypted and secure. You'll receive a confirmation email immediately after booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Check className="h-5 w-5 mr-2" />
                    Complete Booking - ${totalPrice}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
