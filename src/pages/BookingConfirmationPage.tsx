// Booking Confirmation Page - Ultra-compact luxury hotel best practices

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BookingService, RoomService } from '../services/api';
import { motion } from 'framer-motion';
import type { Booking, Room } from '../types';

// Ultra-optimized confirmation state
interface ConfirmationState {
  booking: Booking | null;
  room: Room | null;
  loading: boolean;
  error: string | null;
  showUpsell: boolean;
}

// Celebration confetti effect
const ConfettiEffect = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            backgroundColor: colors[i % colors.length],
            borderRadius: '50%',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Upsell card component
const UpsellCard = ({ title, description, price }: { title: string; description: string; price: string }) => (
  <motion.div
    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-purple-900">{title}</h4>
        <p className="text-sm text-purple-700">{description}</p>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold text-purple-900">{price}</span>
        <span className="text-xs text-purple-600 ml-1">per night</span>
      </div>
    </div>
  </motion.div>
);

const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  
  const [state, setState] = useState<ConfirmationState>({
    booking: null,
    room: null,
    loading: true,
    error: null,
    showUpsell: false
  });

  // Ultra-efficient data loading
  const loadBookingData = useCallback(async () => {
    if (!bookingId) {
      setState(prev => ({ ...prev, error: 'Invalid booking ID', loading: false }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Load booking details
      const bookingResponse = await BookingService.getBookingById(bookingId);
      if (!bookingResponse.success || !bookingResponse.data) {
        setState(prev => ({ 
          ...prev, 
          error: bookingResponse.error || 'Booking not found', 
          loading: false 
        }));
        return;
      }

      const booking = bookingResponse.data;
      
      // Load room details
      const roomResponse = await RoomService.getRoomById(booking.roomId);
      if (!roomResponse.success || !roomResponse.data) {
        setState(prev => ({ 
          ...prev, 
          error: 'Room details not available', 
          loading: false 
        }));
        return;
      }

      setState(prev => ({ 
        ...prev, 
        booking, 
        room: roomResponse.data || null,
        showUpsell: Math.random() > 0.5, // Randomly show upsell
        loading: false 
      }));
    } catch (error) {
      console.error('Failed to load booking data:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Unable to load booking details', 
        loading: false 
      }));
    }
  }, [bookingId]);

  useEffect(() => {
    loadBookingData();
  }, [loadBookingData]);

  // Calculate nights
  const nights = useMemo(() => {
    if (!state.booking) return 1;
    const diff = state.booking.checkOut.getTime() - state.booking.checkIn.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [state.booking]);

  // Generate confirmation number
  const confirmationNumber = useMemo(() => {
    if (!state.booking) return 'BK-00000';
    return `BK-${state.booking.id.toUpperCase()}`;
  }, [state.booking]);

  // Loading state
  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading your confirmation...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error || !state.booking || !state.room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-red-50 rounded-full">
            <span className="text-5xl text-red-500">❌</span>
          </div>
          <motion.h1 
            className="text-2xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Booking Not Found
          </motion.h1>
          <p className="text-gray-600 mb-8">We couldn't find your booking details. This could mean the booking ID is incorrect or the booking has expired.</p>
          <div className="space-y-3">
            <Link to="/" className="w-full">
              <Button variant="primary" fullWidth>
                Return Home
              </Button>
            </Link>
            <Link to="/rooms" className="w-full">
              <Button variant="outline" fullWidth>
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { booking, room, showUpsell } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100">
      <ConfettiEffect />
      
      {/* Luxury hero section */}
      <section className="relative py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-white/20 rounded-full">
              <span className="text-6xl text-white animate-pulse">✨</span>
            </div>
            
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Reservation Confirmed!
            </motion.h1>
            
            <motion.p 
              className="text-white/90 text-lg max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              We're excited to welcome you to {room.name}. Your perfect stay is just around the corner!
            </motion.p>
            
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span className="text-white text-sm">Confirmation: </span>
              <span className="text-white font-bold">{confirmationNumber}</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '2px',
                  height: '2px',
                  backgroundColor: 'white',
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary confirmation info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <div className="p-8 space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Booking is Set!</h2>
                    <p className="text-gray-600">Here are your booking details:</p>
                  </div>

                  {/* Room Preview */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{room.name}</h3>
                      <p className="text-gray-600 capitalize">{room.type} Room</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600">4.8/5 rating</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">${booking.totalPrice}</span>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2 text-primary-600" />
                          Stay Dates
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in:</span>
                            <span className="font-medium">{booking.checkIn.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out:</span>
                            <span className="font-medium">{booking.checkOut.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Nights:</span>
                            <span className="font-semibold text-green-600">{nights} nights</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <UserIcon className="w-4 h-4 mr-2 text-primary-600" />
                          Guest Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests:</span>
                            <span className="font-medium">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <CreditCardIcon className="w-4 h-4 mr-2 text-primary-600" />
                          Price Breakdown
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Room ({nights} nights):</span>
                            <span className="font-medium">${booking.totalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Booking ID:</span>
                            <span className="font-mono text-xs">{confirmationNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <ShieldIcon className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-900">Protected Booking</span>
                        </div>
                        <p className="text-sm text-emerald-700">
                          Your booking is confirmed and protected. Free cancellation available up to 24 hours before check-in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <EmailIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Check Your Email</h4>
                      <p className="text-sm text-blue-700">We've sent detailed confirmation to your registered email address</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CalendarIcon className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">Prepare for Your Stay</h4>
                      <p className="text-sm text-green-700">Check-in starts at 3:00 PM • Check-out by 11:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <MapIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900">Visit Us</h4>
                      <p className="text-sm text-purple-700">123 Luxury Avenue, Downtown • 24/7 Concierge Available</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-center text-sm text-gray-600 mb-4">Need help with your booking?</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Contact Support
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Modify Booking
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Conversion-focused sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Share & Celebrate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Excitement</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors">
                    <FacebookIcon className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-blue-900">Share on Facebook</span>
                      <p className="text-xs text-blue-700">Let friends know about your trip</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg border border-pink-200 cursor-pointer hover:bg-pink-100 transition-colors">
                    <InstagramIcon className="w-5 h-5 text-pink-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-pink-900">Share on Instagram</span>
                      <p className="text-xs text-pink-700">Post about your upcoming stay</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors">
                    <ShareIcon className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-green-900">Copy Link</span>
                      <p className="text-xs text-green-700">Share booking confirmation</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    <strong>🏆 Exclusive:</strong> Share your booking and get 10% off your next stay!
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Add-ons & Upsell */}
            {showUpsell && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Enhance Your Stay</h3>
                  
                  <div className="space-y-3">
                    <UpsellCard 
                      title="Breakfast Package" 
                      description="Gourmet breakfast for 2 daily" 
                      price="+$25" 
                    />
                    <UpsellCard 
                      title="Spa Access" 
                      description="Unlimited spa & wellness" 
                      price="+$45" 
                    />
                    <UpsellCard 
                      title="Late Checkout" 
                      description="Stay until 2:00 PM" 
                      price="+$15" 
                    />
                  </div>

                  <Button variant="secondary" fullWidth className="mt-4">
                    Add Enhancement
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Refer a Friend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Refer & Earn</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <GiftIcon className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Get $50 Credit</p>
                        <p className="text-sm text-green-700">For each friend who books using your code</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Referral Code</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={`REFER-${bookingId?.slice(0, 6).toUpperCase()}`}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-l text-sm"
                      />
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-r text-sm hover:bg-gray-700 transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Rate Your Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rate Your Experience</h3>
                
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600">How smooth was your booking experience?</p>
                  
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        className="w-8 h-8 text-yellow-400 hover:scale-110 transition-transform"
                        onClick={() => {/* Rate logic */}}
                      >
                        <StarIcon className="w-full h-full" />
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500">Your feedback helps us improve</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/" className="w-full">
              <Button variant="outline" fullWidth>
                Return Home
              </Button>
            </Link>
            <Link to="/rooms" className="w-full">
              <Button variant="outline" fullWidth>
                Browse More Rooms
              </Button>
            </Link>
            <button className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon components
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.667.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.667-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 20a2 2 0 01-2-2v-6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2M5 20v-2a2 2 0 012-2h10a2 2 0 012 2v2" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default BookingConfirmationPage;
