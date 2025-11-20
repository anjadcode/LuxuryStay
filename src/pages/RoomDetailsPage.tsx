// Room Details Page - Ultra-compact luxury hotel best practices

import React, { useState, useEffect, useCallback, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { RoomService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import type { Room } from '../types';

// Ultra-optimized state interface
interface RoomDetailsState {
  room: Room | null;
  loading: boolean;
  error: string | null;
  selectedImageIndex: number;
  isFavorited: boolean;
  showPriceBreakdown: boolean;
}

// Memoized components for maximum performance
const ImageGallery = memo(({ images, selectedIndex, onSelect }: { 
  images: string[]; 
  selectedIndex: number; 
  onSelect: (index: number) => void; 
}) => (
  <div className="flex items-center space-x-2">
    {images.map((image, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`w-16 h-12 rounded overflow-hidden transition-all ${
          index === selectedIndex ? 'ring-2 ring-yellow-500 scale-110' : 'hover:scale-105'
        }`}
      >
        <img src={image} alt={`Room thumbnail ${index + 1}`} className="w-full h-full object-cover" />
      </button>
    ))}
  </div>
));

const FavoriteButton = memo(({ isFavorited, onToggle }: { 
  isFavorited: boolean; 
  onToggle: () => void; 
}) => (
  <button
    onClick={onToggle}
    className={`p-3 rounded-full transition-colors ${
      isFavorited ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
    }`}
    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  </button>
));

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<RoomDetailsState>({
    room: null,
    loading: true,
    error: null,
    selectedImageIndex: 0,
    isFavorited: false,
    showPriceBreakdown: false
  });

  // Enhanced room loading with better error handling and caching
  const loadRoom = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Check if room is cached in localStorage
      const cachedRoom = localStorage.getItem(`room_${id}`);
      const cacheTimestamp = localStorage.getItem(`room_${id}_timestamp`);
      
      if (cachedRoom && cacheTimestamp) {
        const timestamp = new Date(cacheTimestamp);
        const now = new Date();
        const cacheAge = (now.getTime() - timestamp.getTime()) / 1000 / 60; // minutes
        
        if (cacheAge < 10) { // Use cache if less than 10 minutes old
          const room = JSON.parse(cachedRoom);
          setState(prev => ({ ...prev, room, loading: false }));
          return;
        }
      }

      const response = await RoomService.getRoomById(id || '');
      if (response.success && response.data) {
        const roomData = response.data as Room;
        setState(prev => ({ ...prev, room: roomData, loading: false }));
        
        // Cache the room
        localStorage.setItem(`room_${id}`, JSON.stringify(roomData));
        localStorage.setItem(`room_${id}_timestamp`, new Date().toISOString());
      } else {
        setState(prev => ({ ...prev, error: 'Room not found or unavailable', room: null, loading: false }));
      }
    } catch (error) {
      console.error('Failed to load room:', error);
      setState(prev => ({ ...prev, error: 'Unable to load room details. Please try again.', loading: false }));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadRoom();
    }
  }, [id, loadRoom]);

  // Enhanced image selection
  const selectImage = useCallback((index: number) => {
    setState(prev => ({ ...prev, selectedImageIndex: index }));
  }, []);

  // Enhanced favorite toggle
  const toggleFavorite = useCallback(() => {
    setState(prev => ({ ...prev, isFavorited: !prev.isFavorited }));
  }, []);

  // Price breakdown toggle
  const togglePriceBreakdown = useCallback(() => {
    setState(prev => ({ ...prev, showPriceBreakdown: !prev.showPriceBreakdown }));
  }, []);

  // Ultra-efficient price calculator
  const calculateTotalPrice = useCallback(() => {
    if (!state.room) return 0;
    const basePrice = state.room.price;
    const serviceFee = Math.round(basePrice * 0.15);
    const cleaningFee = 25;
    const tax = Math.round((basePrice + serviceFee + cleaningFee) * 0.08);
    return basePrice + serviceFee + cleaningFee + tax;
  }, [state.room]);

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
  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl text-red-600">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Room Not Available</h1>
          <p className="text-gray-600">{state.error}</p>
          <Link to="/rooms">
            <Button variant="primary">Browse Other Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!state.room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🏨</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Room Unavailable</h1>
          <p className="text-gray-600">We're sorry, but this room is currently unavailable.</p>
          <Link to="/rooms">
            <Button variant="primary">Explore Other Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { room, selectedImageIndex, isFavorited, showPriceBreakdown } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ultra-compact hero section */}
      <section className="relative h-80 bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="absolute inset-0">
          <img
            src={room.images[selectedImageIndex]}
            alt={`${room.name}`}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  room.type === 'suite' ? 'bg-purple-500 text-white' :
                  room.type === 'deluxe' ? 'bg-yellow-500 text-gray-900' :
                  room.type === 'double' ? 'bg-green-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                </span>
                <span className="text-neutral-300 text-xs">Up to {room.capacity} guests</span>
              </div>
              <motion.h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {room.name}
              </motion.h1>
              <motion.p className="text-neutral-200 text-base max-w-xl line-clamp-2">
                {room.description}
              </motion.p>
            </div>
          </div>
              <div className="flex items-center space-x-2">
                <FavoriteButton isFavorited={isFavorited} onToggle={toggleFavorite} />
                <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-white text-sm font-medium">4.8/5</span>
                  </div>
                </div>
              </div>
        </div>
      </section>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images & details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <Card className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={room.images[selectedImageIndex]}
                  alt={`${room.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="p-4">
                <ImageGallery
                  images={room.images}
                  selectedIndex={selectedImageIndex}
                  onSelect={selectImage}
                />
              </div>
            </Card>

            {/* Room details */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <ul className="space-y-2 text-gray-600">
                    {room.amenities?.map((amenity) => (
                      <li key={amenity} className="flex items-center space-x-2">
                        <CheckIcon className="w-4 h-4 text-green-500" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Details</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Room Type:</dt>
                      <dd className="text-gray-900 font-medium capitalize">{room.type}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Capacity:</dt>
                      <dd className="text-gray-900 font-medium">{room.capacity} guests</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Description:</dt>
                      <dd className="text-gray-900 font-medium">{room.description}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>

            {/* Guest information */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Guest Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-700">Excellent rating based on guest feedback</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldIcon className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Verified and secure booking process</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LocationIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Prime location with easy access to attractions</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column - Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Price card */}
              <Card className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    ${room.price}
                    <span className="text-sm text-gray-500 ml-1">per night</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600">4.8/5 (127 guest reviews)</span>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="mb-4">
                  <button
                    onClick={togglePriceBreakdown}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showPriceBreakdown ? 'Hide price breakdown' : 'Show price breakdown'}
                  </button>
                  <AnimatePresence>
                    {showPriceBreakdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 space-y-2 text-sm"
                      >
                        <div className="flex justify-between text-gray-600">
                          <span>Base price:</span>
                          <span>${room.price}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Service fee (15%):</span>
                          <span>${Math.round(room.price * 0.15)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Cleaning fee:</span>
                          <span>$25</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax (8%):</span>
                          <span>${Math.round((room.price + room.price * 0.15 + 25) * 0.08)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${calculateTotalPrice()}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Trust indicators */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShieldIcon className="w-4 h-4 text-green-500" />
                    <span>Secure booking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCardIcon className="w-4 h-4 text-green-500" />
                    <span>Free cancellation up to 24h</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <StarIcon className="w-4 h-4 text-green-500" />
                    <span>Best price guarantee</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3 mt-6">
                  <Link to={`/booking/${room.id}`}>
                    <Button variant="primary" className="w-full">
                      Reserve Now
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <button
                    onClick={toggleFavorite}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      isFavorited
                        ? 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} />
                    <span>{isFavorited ? 'Remove from favorites' : 'Add to favorites'}</span>
                  </button>
                </div>
              </Card>

              {/* Additional info */}
              <Card className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <LocationIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">Prime location downtown</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">Check-in: 3:00 PM - Check-out: 11:00 AM</span>
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

// Icon components
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const LocationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default RoomDetailsPage;
