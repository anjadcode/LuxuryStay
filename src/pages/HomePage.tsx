// Home Page - Enhanced with luxury dark theme, best practices, performance optimizations, and framer-motion animations

import React, { useState, useEffect, useCallback, Suspense, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { RoomService } from '../services/api';
import { Hotel, Star, Shield, Users as UsersIcon, Clock, DollarSign, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Room } from '../types';

// Enhanced interface for testimonials with better accessibility
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

// Enhanced interface for local attractions with icons
interface Attraction {
  id: number;
  name: string;
  distance: string; 
  type: string;
  image: string;
  description: string;
  icon: string;
}

// Enhanced interface for special offers with proper typing
interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  popular?: boolean;
  ctaText?: string;
}

// Lazy-loaded components for performance optimization
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
const RoomSkeleton = memo(() => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded mb-4"></div>
    <div className="flex justify-between mb-4">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
      <div className="h-3 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded"></div>
  </div>
));

// Enhanced testimonial card with proper ARIA labels and semantic HTML
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <article className="bg-white rounded-lg shadow-lg p-6 h-full" role="article" aria-label="Guest testimonial">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          {testimonial.avatar ? (
            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-blue-600 font-semibold">{testimonial.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <div className="flex items-center" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
            {renderStars(testimonial.rating)}
            <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
          </div>
        </div>
      </div>
      <blockquote className="text-gray-600 italic mb-4">
        <p>"{testimonial.comment}"</p>
      </blockquote>
      <p className="text-sm text-gray-400" aria-label="Testimonial date">
        {testimonial.date}
      </p>
    </article>
  );
});

// Enhanced attraction card with icons and accessibility
const AttractionCard = memo(({ attraction }: { attraction: Attraction }) => (
  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <LazyImage
      src={attraction.image}
      alt={attraction.name}
      className="w-full h-32 object-cover"
    />
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-1">{attraction.name}</h3>
      <div className="flex items-center text-sm text-blue-600 mb-2">
        <span className="mr-1">{attraction.icon}</span>
        <span>{attraction.type}</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
      <p className="text-xs text-gray-500 flex items-center">
        <MapPin className="w-3 h-3 mr-1" />
        {attraction.distance}
      </p>
    </div>
  </article>
));



// Enhanced error boundary component
const ErrorBoundary = memo(({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <section className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center px-4">
    <div className="max-w-md mx-auto text-center">
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-red-300 mb-6">{error}</p>
        <Button variant="primary" onClick={onRetry} className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
          Try Again
        </Button>
      </div>
    </div>
  </section>
));

// Enhanced testimonial carousel component
const TestimonialCarousel = memo(({ testimonials, currentTestimonial, onNavigation }: {
  testimonials: Testimonial[];
  currentTestimonial: number;
  onNavigation: (direction: 'prev' | 'next') => void;
}) => {
  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    setTimeout(() => {
      onNavigation(direction);
    }, 300);
  }, [onNavigation]);

  return (
    <motion.section 
      className="relative max-w-4xl mx-auto" 
      aria-labelledby="testimonials-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Enhanced testimonial card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <TestimonialCard testimonial={testimonials[currentTestimonial]} />
      </motion.div>
      
      {/* Navigation buttons */}
      <div className="flex gap-4 mt-8 justify-center">
        <button
          onClick={() => handleNavigation('prev')}
          className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
          title="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
          title="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(index === currentTestimonial ? 'prev' : index > currentTestimonial ? 'next' : 'prev')}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            role="tab"
            aria-selected={index === currentTestimonial}
            aria-label={`Go to testimonial ${index + 1}`}
            tabIndex={index === currentTestimonial ? 0 : -1}
          />
        ))}
      </div>
    </motion.section>
  );
});

// Enhanced feature component with proper icons and animations
const FeatureCard = memo(({ icon, title, description, color, index }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  index: number;
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
  };

  return (
    <motion.div 
      className="text-center group hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className={`w-16 h-16 ${colorClasses[color]} rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
      </motion.div>
      <motion.h3 
        className="text-xl font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
});

// Enhanced special offer card with better accessibility, UX, and animations
const SpecialOfferCard = memo(({ offer, index }: { offer: SpecialOffer; index: number }) => {
  const offerRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Apply animation effects after component mounts
    if (offerRef.current) {
      const element = offerRef.current;
      // Add CSS animation for scale effect
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = 'scale(1)';
      
      // Animate popularity badge
      if (offer.popular) {
        const badge = element.querySelector('.popular-badge') as HTMLElement;
        if (badge) {
          badge.style.animation = 'popIn 0.4s ease-out';
          badge.style.animationDelay = `${index * 0.1 + 0.3}s`;
        }
      }
    }
  }, [index, offer.popular]);

  return (
    <div 
      ref={offerRef}
      className={`relative bg-white border ${offer.popular ? 'border-yellow-500 shadow-lg' : 'border-gray-300'} rounded-lg p-6 hover:scale-105 transition-transform duration-300 group`}
    >
      {offer.popular && (
        <div 
          className="popular-badge absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold"
        >
          Popular
        </div>
      )}
      <div className="mb-4">
        <h3 
          className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors hover:text-yellow-600"
        >
          {offer.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {offer.description}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-gray-900 hover:scale-110 transition-transform">
          Save {offer.discount}
        </span>
        <Link to="/booking" aria-label={`Book ${offer.title}`}>
          <Button variant="primary" size="sm" className="bg-black text-white hover:bg-gray-800 border-black">
            {offer.ctaText || 'Book Now'}
          </Button>
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Valid until {offer.validUntil}
      </p>
    </div>
  );
});

// Enhanced newsletter component with live validation and animations
const NewsletterSubscription = memo(() => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  return (
    <motion.section 
      className="py-12 bg-gray-100" 
      aria-label="Newsletter subscription"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Stay Updated with Exclusive Offers
          </motion.h3>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter and get special deals, travel tips, and hotel news delivered to your inbox.
          </motion.p>
          
          {success && (
            <motion.div 
              className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Thank you for subscribing! You'll receive updates soon.
            </motion.div>
          )}

          <motion.form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                aria-label="Email address for newsletter"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'email-error' : undefined}
                required
              />
              {error && (
                <motion.p 
                  id="email-error" 
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.05 }} whileTap={{ scale: isSubmitting ? 1 : 0.95 }}>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </motion.div>
          </motion.form>
          <motion.p 
            className="text-xs text-gray-500 mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
});

// Main HomePage component with comprehensive improvements and animations
const HomePage: React.FC = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Enhanced data structure with better categorization
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely stunning hotel with exceptional service. The room was beautiful and the staff went above and beyond to make our stay memorable.",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Perfect location in the heart of the city. The amenities were top-notch and the breakfast was incredible. Will definitely return!",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 4,
      comment: "Great value for money. The spa services were amazing and the room had everything we needed. Highly recommend for business travelers.",
      date: "3 weeks ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
  ];

  const localAttractions: Attraction[] = [
    {
      id: 1,
      name: "City Museum",
      distance: "0.5 km",
      type: "Culture",
      image: "https://images.unsplash.com/photo-1566139884669-0f6a0a981e6b?w=300&h=200&fit=crop",
      description: "World-class art and historical exhibits",
      icon: "🎨"
    },
    {
      id: 2,
      name: "Central Park",
      distance: "0.3 km",
      type: "Nature",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
      description: "Beautiful green space for relaxation",
      icon: "🌳"
    },
    {
      id: 3,
      name: "Shopping District",
      distance: "0.2 km",
      type: "Shopping",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      description: "Premium brands and local boutiques",
      icon: "🛍️"
    },
    {
      id: 4,
      name: "Gourmet Restaurants",
      distance: "0.1 km",
      type: "Dining",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
      description: "Michelin-starred dining experiences",
      icon: "🍽️"
    }
  ];

  const specialOffers: SpecialOffer[] = [
    {
      id: 1,
      title: "Weekend Getaway",
      description: "Enjoy 20% off on weekend stays with complimentary breakfast",
      discount: "20%",
      validUntil: "Dec 31, 2024",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      popular: true,
      ctaText: "Book Weekend"
    },
    {
      id: 2,
      title: "Romance Package",
      description: "Special couples package with spa credits and champagne",
      discount: "15%",
      validUntil: "Feb 14, 2025",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      ctaText: "Book Romance"
    },
    {
      id: 3,
      title: "Business Traveler",
      description: "Corporate rates with late checkout and meeting room access",
      discount: "25%",
      validUntil: "Mar 31, 2025",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      ctaText: "Book Business"
    }
  ];

  // Enhanced room loading with better error handling and caching
  const loadFeaturedRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if rooms are cached in localStorage
      const cachedRooms = localStorage.getItem('featuredRooms');
      const cacheTimestamp = localStorage.getItem('featuredRoomsTimestamp');
      
      if (cachedRooms && cacheTimestamp) {
        const timestamp = new Date(cacheTimestamp);
        const now = new Date();
        const cacheAge = (now.getTime() - timestamp.getTime()) / 1000 / 60; // minutes
        
        if (cacheAge < 5) { // Use cache if less than 5 minutes old
          const rooms = JSON.parse(cachedRooms);
          if (rooms.length > 0) {
            setFeaturedRooms(rooms);
            setLoading(false);
            return;
          }
        }
      }

      const response = await RoomService.getRooms({ availability: true });
      if (response.success && response.data) {
        const rooms = response.data.slice(0, 3);
        setFeaturedRooms(rooms);
        
        // Cache the rooms
        localStorage.setItem('featuredRooms', JSON.stringify(rooms));
        localStorage.setItem('featuredRoomsTimestamp', new Date().toISOString());
      } else {
        setError('Failed to load featured rooms. Please try again.');
      }
    } catch (error) {
      setError('Unable to load featured rooms. Please check your connection and try again.');
      console.error('Failed to load featured rooms:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeaturedRooms();
  }, [loadFeaturedRooms]);

  // Enhanced testimonial navigation with automatic play/pause
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying]);

  const handleTestimonialNavigation = useCallback((direction: 'prev' | 'next') => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    if (direction === 'prev') {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
    
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with luxury dark theme and framer-motion animations */}
      <motion.section 
        className="relative py-12 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44"
        role="banner"
        aria-label="Luxury hotel hero section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 hidden lg:block">
          <LazyImage
            className="object-cover object-right-bottom w-full h-full opacity-20"
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop"
            alt="Luxury hotel interior with elegant furnishings and modern design"
          />
          {/* Enhanced dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Experience Luxury Like Never Before
            </motion.h1>
            <motion.p 
              className="mt-8 text-base font-normal leading-7 text-neutral-200 lg:max-w-md xl:pr-0 lg:pr-16 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to LuxuryStay, where every moment is crafted to perfection. From elegant rooms 
              to world-class amenities, discover a sanctuary of comfort and sophistication that 
              redefines luxury hospitality.
            </motion.p>

            {/* Enhanced trust indicators with proper icons */}
            <div className="flex flex-wrap items-center gap-4 mt-6 mb-8">
              <motion.div 
                className="flex items-center text-yellow-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Star className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium text-white">4.9/5 Guest Rating</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-green-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Shield className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium text-white">Best Price Guarantee</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-blue-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <UsersIcon className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium text-white">Secure Booking</span>
              </motion.div>
            </div>

            {/* Enhanced CTA buttons with better accessibility and animations */}
            <motion.div 
              className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="/rooms"
                className="inline-flex items-center justify-center px-4 py-3 text-base font-bold leading-7 text-gray-900 transition-all duration-200 bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded-md sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-yellow-400 transform hover:scale-105 shadow-lg"
                role="button"
                aria-label="Browse available luxury rooms"
              >
                Browse Luxury Rooms
              </Link>

              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-4 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 rounded-md sm:px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white transform hover:scale-105"
                role="button"
                aria-label="Book your stay now"
              >
                Book Your Stay
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-8 lg:hidden relative">
          <LazyImage
            className="object-cover w-full h-64 opacity-20"
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
            alt="Luxury hotel interior with elegant furnishings and modern design"
          />
          {/* Enhanced dark overlay for mobile */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </motion.section>

      {/* Enhanced Featured Rooms Section with Suspense, animations, and better loading */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50" 
        aria-labelledby="featured-rooms"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              id="featured-rooms" 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Featured Rooms
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Handpicked selection of our most popular rooms. Each room is designed 
              to provide you with the ultimate comfort and luxury experience.
            </motion.p>
          </motion.div>

          <Suspense fallback={<RoomSkeleton />}>
            {error ? (
              <ErrorBoundary error={error} onRetry={loadFeaturedRooms} />
            ) : (
              <>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[1, 2, 3].map((i) => (
                      <RoomSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {featuredRooms.map((room, index) => (
                      <motion.div
                        key={room.id}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                        }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <Link to={`/rooms/${room.id}`} className="group">
                          <Card hover className="h-full transition-all duration-300 group-hover:shadow-xl">
                            <motion.div 
                              className="aspect-w-16 aspect-h-12 mb-3 md:mb-4 overflow-hidden rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <LazyImage
                                src={room.images[0]}
                                alt={`${room.name} - ${room.description}`}
                                className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </motion.div>
                            <motion.h3 
                              className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                              viewport={{ once: true }}
                            >
                              {room.name}
                            </motion.h3>
                            <motion.p 
                              className="text-gray-600 mb-2 md:mb-4 line-clamp-2 text-sm md:text-base"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                              viewport={{ once: true }}
                            >
                              {room.description}
                            </motion.p>
                            <motion.div 
                              className="flex justify-between items-center mb-3 md:mb-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                            >
                              <motion.div 
                                className="flex items-center text-gray-500"
                                whileHover={{ scale: 1.02 }}
                              >
                                <span className="text-base md:text-lg font-semibold text-gray-900">
                                  ${room.price}
                                </span>
                                <span className="text-xs md:text-sm ml-1">/night</span>
                              </motion.div>
                              <motion.div 
                                className="flex items-center text-xs md:text-sm text-gray-500"
                                whileHover={{ scale: 1.02 }}
                              >
                                <UsersIcon className="w-4 h-4 mr-1" />
                                <span>Up to {room.capacity} guests</span>
                              </motion.div>
                            </motion.div>
                            <motion.div 
                              className="flex flex-wrap gap-1 mb-3 md:mb-4"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                              viewport={{ once: true }}
                            >
                              {room.amenities.slice(0, 3).map((amenity) => (
                                <motion.span
                                  key={amenity}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {amenity}
                                </motion.span>
                              ))}
                              {room.amenities.length > 3 && (
                                <motion.span 
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.6 }}
                                  viewport={{ once: true }}
                                >
                                  +{room.amenities.length - 3} more
                                </motion.span>
                              )}
                            </motion.div>
                            <motion.div 
                              className="flex justify-between items-center"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                              viewport={{ once: true }}
                            >
                              <motion.span 
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  room.availability
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                                whileHover={{ scale: 1.05 }}
                              >
                                {room.availability ? 'Available' : 'Booked'}
                              </motion.span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs md:text-sm group-hover:bg-gray-900 group-hover:text-white transition-colors hover:scale-105"
                              >
                                View Details →
                              </Button>
                            </motion.div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </Suspense>

          <motion.div 
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/rooms">
                <Button variant="primary" size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all">
                  View All Rooms
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Testimonials Section with better UX and animations */}
      <motion.section 
        className="py-16 md:py-24 bg-white" 
        aria-labelledby="testimonials-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              id="testimonials-heading" 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              What Our Guests Say
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Don't just take our word for it. Here's what our valued guests have to say about their experience.
            </motion.p>
          </motion.div>

          <TestimonialCarousel 
            testimonials={testimonials} 
            currentTestimonial={currentTestimonial} 
            onNavigation={handleTestimonialNavigation}
          />
        </motion.div>
      </motion.section>

      {/* Enhanced Local Attractions Section */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50" 
        aria-labelledby="attractions-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              id="attractions-heading" 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Explore the Neighborhood
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover amazing attractions and activities just steps away from our hotel.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {localAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <AttractionCard attraction={attraction} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/location">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                View Location Details
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Features Section with proper icons and animations */}
      <motion.section 
        className="py-16 md:py-24 bg-white" 
        aria-labelledby="features-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              id="features-heading" 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Why Choose Our Hotel
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We pride ourselves on providing exceptional service and unforgettable experiences 
              for all our guests.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<Hotel className="w-8 h-8" />}
              title="Luxury Rooms"
              description="Premium accommodations with modern amenities"
              color="blue"
              index={0}
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Prime Location"
              description="Located in the heart of the city"
              color="green"
              index={1}
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="24/7 Service"
              description="Round-the-clock customer support"
              color="purple"
              index={2}
            />
            <FeatureCard
              icon={<DollarSign className="w-8 h-8" />}
              title="Best Rates"
              description="Competitive pricing with great value"
              color="yellow"
              index={3}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Special Offers Section with animations */}
      <motion.section 
        className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200" 
        aria-labelledby="offers-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              id="offers-heading" 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Special Offers
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Exclusive deals and packages to make your stay even more memorable.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {specialOffers.map((offer, index) => (
              <SpecialOfferCard 
                key={offer.id} 
                offer={offer}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Final Call-to-Action with animations */}
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800" 
        aria-label="Book your stay"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to Book Your Stay?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't wait! Book your perfect room today and enjoy a memorable stay 
            at our luxurious hotel.
          </motion.p>
          
          {/* Enhanced urgency indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <span className="text-sm font-medium text-yellow-400">🏃‍♂️ Limited rooms available</span>
            </motion.div>
            <motion.div 
              className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                scale: [1, 1.05, 1],
                transition: { duration: 2.5, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <span className="text-sm font-medium text-green-400">🔥 Booked in the last hour</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/rooms">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 border-yellow-500 transition-all"
                >
                  Browse Available Rooms
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/booking">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-neutral-400 text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all"
                >
                  Book Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Newsletter Subscription with animations */}
      <NewsletterSubscription />
    </div>
  );
};

export default React.memo(HomePage);
