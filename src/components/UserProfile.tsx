import React, { useState } from 'react';
import { User, Calendar, Clock, MapPin, CreditCard, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import toast from 'react-hot-toast';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { bookings, loading, cancelBooking } = useBookings();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      onClose();
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const { error } = await cancelBooking(bookingId);
      if (error) {
        toast.error('Failed to cancel booking');
      } else {
        toast.success('Booking cancelled successfully');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex">
          <div className="w-64 bg-gray-50 p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 inline mr-3" />
                Profile Info
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5 inline mr-3" />
                My Bookings
              </button>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{user.user_metadata?.full_name || 'Not provided'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <p className="text-gray-900">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">My Bookings</h3>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading bookings...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No bookings yet</p>
                    <p className="text-sm text-gray-500">Start exploring events to make your first booking!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {booking.event?.title}
                            </h4>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              booking.booking_status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.booking_status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                            </span>
                          </div>
                          {booking.booking_status === 'confirmed' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{booking.event ? formatDate(booking.event.date) : 'N/A'}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{booking.event ? formatTime(booking.event.time) : 'N/A'}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.event?.location || 'N/A'}</span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            <span>${booking.total_amount} ({booking.ticket_quantity} tickets)</span>
                          </div>
                        </div>

                        {booking.special_requests && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Special Requests:</strong> {booking.special_requests}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;