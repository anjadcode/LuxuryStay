// Booking Page - Ultra-compact luxury hotel best practices

import React, { useState, useEffect, useCallback, memo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { RoomService, BookingService } from '../services/api';
import { motion } from 'framer-motion';
import type { Room, BookingFormData } from '../types';

// Ultra-optimized state interface
interface BookingState {
  room: Room | null;
  loading: boolean;
  error: string | null;
  formData: BookingFormData;
  submitting: boolean;
  validationErrors: Record<string, string>;
}

// Memoized price calculator
const PriceCalculator = memo(({ price, nights }: { price: number; nights: number }) => {
  const basePrice = price * nights;
  const serviceFee = Math.round(basePrice * 0.15);
  const cleaningFee = 25 * nights;
  const tax = Math.round((basePrice + serviceFee + cleaningFee) * 0.08);
  const total = basePrice + serviceFee + cleaningFee + tax;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>Room ({nights} nights):</span>
        <span>${basePrice}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Service fee (15%):</span>
        <span>${serviceFee}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Cleaning fee:</span>
        <span>${cleaningFee}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Tax (8%):</span>
        <span>${tax}</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-semibold">
        <span>Total:</span>
        <span className="text-green-600">${total}</span>
      </div>
    </div>
  );
});

const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const [state, setState] = useState<BookingState>({
    room: null,
    loading: true,
    error: null,
    formData: {
      roomId: roomId || '',
      checkIn: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Day after tomorrow
      guests: 1,
      guestInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
      }
    },
    submitting: false,
    validationErrors: {}
  });

  // Enhanced room loading
  const loadRoom = useCallback(async () => {
    if (!roomId) {
      setState(prev => ({ ...prev, error: 'Invalid room ID', loading: false }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await RoomService.getRoomById(roomId);
      if (response.success && response.data) {
        setState(prev => ({ 
          ...prev, 
          room: response.data as Room, 
          loading: false 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Room not available for booking', 
          loading: false 
        }));
      }
    } catch (error) {
      console.error('Failed to load room:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Unable to load room details', 
        loading: false 
      }));
    }
  }, [roomId]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);

  // Ultra-efficient form validation
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    const { guestInfo, checkIn, checkOut, guests } = state.formData;

    if (!guestInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!guestInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!guestInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!guestInfo.phone.trim()) errors.phone = 'Phone number is required';

    if (!checkIn) errors.checkIn = 'Check-in date is required';
    if (!checkOut) errors.checkOut = 'Check-out date is required';
    if (checkIn && checkOut && checkIn >= checkOut) {
      errors.checkOut = 'Check-out must be after check-in';
    }
    if (guests < 1) errors.guests = 'Number of guests must be at least 1';

    setState(prev => ({ ...prev, validationErrors: errors }));
    return Object.keys(errors).length === 0;
  }, [state.formData]);

  // Form field handler
  const handleInputChange = useCallback((field: string, value: string | number | Date) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  }, []);

  // Guest info handler
  const handleGuestInfoChange = useCallback((field: string, value: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        guestInfo: {
          ...prev.formData.guestInfo,
          [field]: value
        }
      }
    }));
  }, []);

  // Calculate nights
  const calculateNights = useCallback(() => {
    const { checkIn, checkOut } = state.formData;
    if (!checkIn || !checkOut) return 1;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [state.formData.checkIn, state.formData.checkOut]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setState(prev => ({ ...prev, submitting: true }));
    
    try {
      const response = await BookingService.createBooking(state.formData);
      if (response.success && response.data) {
        navigate(`/booking-confirmation/${response.data.id}`);
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.error || 'Failed to create booking',
          submitting: false 
        }));
      }
    } catch (error) {
      console.error('Booking failed:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Unable to complete booking. Please try again.',
        submitting: false 
      }));
    }
  }, [state.formData, validateForm, navigate]);

  // Loading state
  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error || !state.room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl text-red-600">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Unavailable</h1>
          <p className="text-gray-600">{state.error || 'Room not available for booking'}</p>
          <Link to="/rooms">
            <Button variant="primary">Browse Other Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { room, formData, validationErrors, submitting } = state;
  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Luxury hero section */}
      <section className="relative h-64 bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3 max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-3xl lg:text-4xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Complete Your Reservation
            </motion.h1>
            <motion.p 
              className="text-neutral-200 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              You're just steps away from your perfect stay at {room.name}
            </motion.p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-white text-sm">{room.type} • {room.capacity} guests</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-yellow-400 text-sm">⭐ 4.8/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main booking content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking form section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="p-8">
                {/* Progress indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">1</div>
                      <span className="text-sm font-medium text-primary-600">Details</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">2</div>
                      <span className="text-sm text-gray-600">Confirm</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Guest Information */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Guest Information</h3>
                        <p className="text-gray-600 text-sm">Tell us about yourself</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="First Name *"
                        placeholder="John"
                        value={formData.guestInfo.firstName}
                        onChange={(e) => handleGuestInfoChange('firstName', e.target.value)}
                        error={validationErrors.firstName}
                        required
                      />
                      <Input
                        label="Last Name *"
                        placeholder="Doe"
                        value={formData.guestInfo.lastName}
                        onChange={(e) => handleGuestInfoChange('lastName', e.target.value)}
                        error={validationErrors.lastName}
                        required
                      />
                      <Input
                        label="Email *"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.guestInfo.email}
                        onChange={(e) => handleGuestInfoChange('email', e.target.value)}
                        error={validationErrors.email}
                        required
                      />
                      <Input
                        label="Phone *"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.guestInfo.phone}
                        onChange={(e) => handleGuestInfoChange('phone', e.target.value)}
                        error={validationErrors.phone}
                        required
                      />
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Stay Details</h3>
                        <p className="text-gray-600 text-sm">When would you like to stay?</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        label="Check-in Date *"
                        type="date"
                        value={formData.checkIn.toISOString().split('T')[0]}
                        onChange={(e) => handleInputChange('checkIn', new Date(e.target.value))}
                        error={validationErrors.checkIn}
                        min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        required
                      />
                      <Input
                        label="Check-out Date *"
                        type="date"
                        value={formData.checkOut.toISOString().split('T')[0]}
                        onChange={(e) => handleInputChange('checkOut', new Date(e.target.value))}
                        error={validationErrors.checkOut}
                        min={formData.checkIn.toISOString().split('T')[0]}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Guests *</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                          className="block w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        >
                          {Array.from({ length: Math.min(room.capacity, 6) }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                          ))}
                        </select>
                        {validationErrors.guests && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.guests}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      placeholder="Any special requests or preferences?"
                      value={formData.guestInfo.specialRequests}
                      onChange={(e) => handleGuestInfoChange('specialRequests', e.target.value)}
                      rows={3}
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll do our best to accommodate your requests
                    </p>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          {/* Booking summary sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Room summary */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{room.type} Room</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{formData.checkIn.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{formData.checkOut.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-medium">{nights} night{nights > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-medium">{formData.guests} guest{formData.guests > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Price breakdown */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Price Breakdown</h4>
                <PriceCalculator price={room.price} nights={nights} />
                
                {/* Trust indicators */}
                <div className="border-t pt-4 space-y-3 mt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <ShieldIcon className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <StarIcon className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Best price guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ClockIcon className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Free cancellation up to 24h</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-6 space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Complete Reservation'
                    )}
                  </Button>
                  <Link to="/rooms">
                    <Button variant="outline" fullWidth>
                      Browse Other Rooms
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Contact info */}
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <ShieldIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Your information is secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Instant confirmation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LocationIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">24/7 support available</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon components (reuse from RoomDetailsPage)
const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default BookingPage;
