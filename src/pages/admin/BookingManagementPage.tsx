// Booking Management Page - Updated with luxury dark theme

import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { BookingService } from '../../services/api';
import type { Booking } from '../../types';

const BookingManagementPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await BookingService.getBookings();
        if (response.success && response.data) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="p-6 bg-neutral-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Booking Management</h1>
        <Button variant="primary" size="md" className="bg-yellow-500 text-neutral-900 hover:bg-yellow-400 transition-colors">
          New Booking
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        <Card className="bg-neutral-800 border-neutral-600 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-600">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Guest</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Room</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Check-in</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Check-out</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-neutral-600 hover:bg-neutral-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-100">Guest {booking.guests}</div>
                      <div className="text-sm text-neutral-400">{booking.userId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-200">Room {booking.roomId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-400">{booking.checkIn.toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-400">{booking.checkOut.toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        booking.status === 'confirmed'
                          ? 'bg-green-800 text-green-200 border-green-600'
                          : booking.status === 'pending'
                          ? 'bg-yellow-800 text-yellow-200 border-yellow-600'
                          : 'bg-red-800 text-red-200 border-red-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-yellow-400">${booking.totalPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors">
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookingManagementPage;
