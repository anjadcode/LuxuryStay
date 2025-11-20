// Rooms Page - Enhanced with clean white theme and HomePage best practices

import React, { useState, useEffect, useCallback, useMemo, Suspense, memo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { RoomService } from '../services/api';
import { Bed, Users, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Room, RoomFilters } from '../types';

// Enhanced interfaces following HomePage patterns
interface RoomTypeOption {
  value: string;
  label: string;
  icon: string;
  description: string;
}

interface EnhancedRoom extends Room {
  highlighted?: boolean;
}

// Lazy-loaded image component for performance (from HomePage)
const LazyImage = memo(({ src, alt, className, onLoad }: { 
  src: string; 
  alt: string; 
  className?: string; 
  onLoad?: () => void; 
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };
    img.onerror = () => {
      setIsLoading(false);
    };
  }, [src, onLoad]);

  return (
    <>
      {isLoading && (
        <div className="animate-pulse bg-gray-200 rounded-lg" />
      )}
      <img
        src={imageSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
      />
    </>
  );
});

// Enhanced loading skeleton component
const RoomCardSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-56 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded w-12"></div>
        <div className="h-6 bg-gray-200 rounded w-12"></div>
        <div className="h-6 bg-gray-200 rounded w-12"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
));

// Enhanced error boundary component with clean design
const ErrorBoundary = memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <section className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="max-w-md mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <Bed className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Button variant="primary" onClick={onRetry} className="bg-red-600 text-white hover:bg-red-700">
          Try Again
        </Button>
      </div>
    </div>
  </section>
));

// Enhanced room card component with clean, professional styling
const RoomCard = memo(({ room }: { room: EnhancedRoom }) => (
  <Link to={`/rooms/${room.id}`} className="group">
    <Card hover className="h-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
      <div className="mb-4 overflow-hidden rounded-lg">
        <LazyImage 
          src={room.images[0]} 
          alt={room.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Room header with type badge - clean styling */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex-1">
          {room.name}
        </h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
          {room.type}
        </span>
      </div>
      
      {/* Description - clean text styling */}
      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
        {room.description}
      </p>
      
      {/* Pricing and capacity - clean professional colors */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-gray-700">
          <span className="text-2xl font-bold text-gray-900">
            ${room.price}
          </span>
          <span className="text-sm ml-2 text-gray-500">/night</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-1" />
          <span>{room.capacity} guests</span>
        </div>
      </div>
      
      {/* Enhanced amenities with clean colors */}
      <div className="flex flex-wrap gap-2 mb-6">
        {room.amenities.slice(0, 3).map((amenity) => (
          <span 
            key={amenity}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
          >
            {amenity}
          </span>
        ))}
        {room.amenities.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
            +{room.amenities.length - 3} more
          </span>
        )}
      </div>
      
      {/* Footer actions with clean professional styling */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          room.availability 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {room.availability ? 'Available' : 'Fully Booked'}
        </span>
        <Button 
          variant="primary" 
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
        >
          View Details
        </Button>
      </div>
    </Card>
  </Link>
));

// Enhanced pagination component with clean styling
const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  const handlePrevious = useCallback(() => {
    onPageChange(Math.max(1, currentPage - 1));
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`${
              currentPage === page 
                ? 'bg-blue-600 text-white border border-blue-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
});

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<EnhancedRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RoomFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'rating'>('name');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 9;

  // Enhanced room type options with clean icons
  const roomTypes: RoomTypeOption[] = [
    { value: 'single', label: 'Single Room', icon: '🏨', description: 'Perfect for solo travelers' },
    { value: 'double', label: 'Double Room', icon: '🛏️', description: 'Ideal for couples' },
    { value: 'suite', label: 'Suite', icon: '⭐', description: 'Spacious luxury suites' },
    { value: 'deluxe', label: 'Deluxe Room', icon: '👑', description: 'Premium accommodations' },
  ];

  // Enhanced loading with performance optimization and caching
  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check for cached data first
      const cacheKey = `rooms-${JSON.stringify(filters)}-${searchTerm}-${sortBy}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);
      
      if (cachedData && cacheTimestamp) {
        const timestamp = new Date(cacheTimestamp);
        const now = new Date();
        const cacheAge = (now.getTime() - timestamp.getTime()) / 1000 / 60; // minutes
        
        if (cacheAge < 3) { // Use cache if less than 3 minutes old
          const data = JSON.parse(cachedData);
          setRooms(data);
          setLoading(false);
          return;
        }
      }

      const response = await RoomService.getRooms(filters);
      if (response.success && response.data) {
        const enhancedRooms = response.data.map(room => ({ ...room, highlighted: false }));
        setRooms(enhancedRooms);
        
        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(enhancedRooms));
        localStorage.setItem(`${cacheKey}-timestamp`, new Date().toISOString());
      } else {
        setError(response.error || 'Failed to load rooms');
      }
    } catch (error) {
      setError('Unable to load rooms. Please check your connection and try again.');
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm, sortBy]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  // Enhanced room filtering with debounced search (following HomePage patterns)
  const filteredRooms = useMemo(() => {
    if (!searchTerm) return rooms;
    
    const searchLower = searchTerm.toLowerCase();
    return rooms.filter(room => 
      room.name.toLowerCase().includes(searchLower) ||
      room.description.toLowerCase().includes(searchLower) ||
      room.amenities.some(amenity => amenity.toLowerCase().includes(searchLower))
    );
  }, [rooms, searchTerm]);

  // Enhanced sorting options
  const sortedRooms = useMemo(() => {
    const sorted = [...filteredRooms];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filteredRooms, sortBy]);

  // Pagination logic (enhanced)
  const totalPages = Math.ceil(sortedRooms.length / roomsPerPage);
  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    return sortedRooms.slice(startIndex, startIndex + roomsPerPage);
  }, [sortedRooms, currentPage, roomsPerPage]);

  // Enhanced filter management (following HomePage patterns)
  const handleFilterChange = useCallback((newFilter: Partial<RoomFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
    // Clear cache
    const cacheKeyPattern = /^rooms-/;
    Object.keys(localStorage).forEach(key => {
      if (cacheKeyPattern.test(key)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // Enhanced Hero Section matching ContactPage design with dark gradient and image
  const HeroSection = memo(() => (
    <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <LazyImage
          className="object-cover w-full h-full opacity-30"
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
          alt="Luxury hotel interior with elegant furnishings"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-50 mb-4">
            Our Luxury Rooms
          </h1>
          <p className="text-xl text-neutral-200 max-w-2xl mx-auto mb-8">
            Discover our collection of comfortable rooms and suites, each designed for your ultimate comfort
          </p>
          
          {/* Enhanced search and filter section with clean styling */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto mb-8">
            {/* Search input with clean styling */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search rooms by name or amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                aria-label="Search rooms"
              />
            </div>

            {/* Enhanced sort dropdown with clean styling */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'name')}
                className="pl-10 pr-8 py-3 bg-white border border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-md"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          {/* Enhanced hero statistics - following ContactPage pattern */}
          <div className="flex justify-center space-x-4">
            <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-yellow-300">
              {rooms.length} Available Rooms
            </span>
            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-green-400">
              Best Price Guarantee
            </span>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-500">
              Secure Booking
            </span>
          </div>
        </div>
      </div>
    </section>
  ));

  // Enhanced loading state with clean white theme and hero image
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto">
          <section 
            className="relative py-12 bg-gradient-to-r from-blue-50/90 via-white/90 to-blue-50/90 sm:py-16 lg:py-20"
            aria-label="Rooms hero section"
          >
            <div className="absolute inset-0 overflow-hidden">
              <LazyImage
                className="object-cover w-full h-full opacity-20"
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
                alt="Luxury hotel interior"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/70 via-white/70 to-blue-50/70"></div>
            </div>
            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Loading Rooms...</h2>
              </div>
            </div>
          </section>
          <div className="text-center text-gray-600 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <RoomCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced error state with clean design
  if (error) {
    return (
      <ErrorBoundary error={error} onRetry={loadRooms} />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto">

        {/* Enhanced Room Type Filter with sophisticated styling */}
        <section className="mb-16" aria-label="Room type filters">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Find Your Perfect Room
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of luxury accommodations, each designed with your comfort in mind
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            {roomTypes.map((type, index) => (
              <div
                key={type.value}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Button
                  variant={filters.type === type.value ? 'primary' : 'ghost'}
                  size="lg"
                  onClick={() => handleFilterChange({ type: filters.type === type.value ? undefined : type.value as RoomFilters['type'] })}
                  className={`flex flex-col items-center space-y-2 transition-all min-w-[140px] px-6 py-4 rounded-xl ${
                    filters.type === type.value 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 border-2 border-blue-500' 
                      : 'bg-white text-gray-700 hover:from-gray-50 hover:to-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                    {type.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm mb-1">{type.label}</div>
                    <div className="text-xs opacity-75">{type.description}</div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
          
          {Object.keys(filters).length > 0 && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border-2 border-blue-200 rounded-full px-6 py-3">
                <span className="text-blue-600 font-medium">
                  {Object.keys(filters).length} filter{Object.keys(filters).length !== 1 ? 's' : ''} active
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* Enhanced results summary with clean styling */}
        {sortedRooms.length > 0 && (
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">
              Showing {paginatedRooms.length} of {sortedRooms.length} rooms
              {searchTerm && ` matching "${searchTerm}"`}
              {filters.type && ` (${roomTypes.find(t => t.value === filters.type)?.label})`}
            </p>
          </div>
        )}

        {/* Enhanced room grid with Suspense and clean styling */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        }>
          {paginatedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
              <div className="max-w-md mx-auto">
                <Bed className="w-20 h-20 text-gray-400 mx-auto mb-6 opacity-60" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No Rooms Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? `No rooms match "${searchTerm}"` : 'No rooms found matching your criteria.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {searchTerm && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setSearchTerm('')}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Clear Search
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={clearAllFilters}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Show All Rooms
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Suspense>

        {/* Enhanced pagination component with clean styling */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />

        {/* Enhanced empty state with clean design */}
        {!loading && !error && rooms.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
            <div className="max-w-md mx-auto">
              <Bed className="w-20 h-20 text-gray-400 mx-auto mb-6 opacity-60" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Rooms Available
              </h3>
              <p className="text-gray-600 mb-6">
                It looks like all our rooms are currently booked. Please check back later or contact our reservations team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={loadRooms}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Check Again
                </Button>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RoomsPage);
