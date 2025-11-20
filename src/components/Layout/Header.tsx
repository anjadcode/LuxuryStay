// Enhanced Header component for the hotel booking app with modern hotel web best practices

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface QuickSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
  location: string;
}

interface SpecialOffer {
  id: number;
  title: string;
  discount: string;
  description: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [quickSearch, setQuickSearch] = useState<QuickSearch>({
    checkIn: '',
    checkOut: '',
    guests: 2,
    location: ''
  });
  
  const cartCount = 3; // Mock cart count for booking indicator
  
  // Mock special offers data with improved readability
  const specialOffers: SpecialOffer[] = [
    {
      id: 1,
      title: "Weekend Special",
      discount: "20%",
      description: "Save 20% on weekend stays"
    },
    {
      id: 2,
      title: "Early Bird",
      discount: "15%",
      description: "Book 30+ days in advance"
    },
    {
      id: 3,
      title: "Romance Package",
      discount: "25%",
      description: "Couples getaway special"
    }
  ];
  
  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search rooms with quick filters
  const handleQuickSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.checkIn && quickSearch.checkOut) {
      navigate('/rooms', { 
        state: { 
          searchParams: quickSearch,
          timestamp: Date.now()
        } 
      });
      setShowQuickSearch(false);
    }
  }, [quickSearch, navigate]);

  // Handle cart click - redirect to booking mode
  const handleCartClick = useCallback(() => {
    navigate('/rooms?mode=booking');
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  // Helper function to format the top offer banner
  const getTopOfferBanner = (): string => {
    const topOffer = specialOffers[0];
    return topOffer ? `⭐ ${topOffer.title}: ${topOffer.discount} OFF - ${topOffer.description}` : '⭐ No offers available';
  };

  return (
    <>
      <header 
        className={`
          ${isScrolled 
            ? 'fixed top-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700 shadow-lg z-50 animate-slideDown' 
            : 'relative bg-neutral-900 border-b border-neutral-800 z-50'
          }
          transition-all duration-300
        `}
      >
        {/* Top Notification Bar - Hotel Special Offers - Luxury Gold */}
        <div className="bg-yellow-500 text-gray-900 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm font-medium">
              <span className="text-white">{getTopOfferBanner()}</span>
            </div>
            <button 
              onClick={() => setShowOffers(!showOffers)}
              className="text-xs font-semibold hover:text-primary-300 transition-colors"
              aria-label="View all special offers"
            >
              View Offers
            </button>
          </div>
        </div>

        {/* Special Offers Dropdown */}
        {showOffers && (
          <div className="absolute top-12 left-0 right-0 bg-white shadow-xl border-b z-40 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specialOffers.map(offer => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{offer.title}</h4>
                      <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                        {offer.discount} OFF
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                    <Link
                      to="/rooms"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Book Now →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo and Tagline */}
            <div className="flex items-center space-x-8">
              {/* Enhanced Logo with sophisticated hotel icon */}
              <Link to="/" className="flex items-center space-x-2 group" aria-label="LuxuryStay Hotel - Home">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg transition-all duration-200 shadow-md">
                  <HotelIcon className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">LuxuryStay</span>
                  <p className="text-xs text-gray-400 mt-1">5-Star Luxury Experience</p>
                </div>
              </Link>

              {/* Quick Search Bar */}
              <div className="hidden lg:block">
                <button
                  onClick={() => setShowQuickSearch(!showQuickSearch)}
                  className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm">Quick Search</span>
                </button>

                {/* Quick Search Dropdown */}
                {showQuickSearch && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-6 w-96 z-50 animate-fadeIn">
                    <h3 className="font-bold text-gray-900 mb-4">Find Your Perfect Stay</h3>
                    <form onSubmit={handleQuickSearch} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Check In</label>
                          <input
                            type="date"
                            value={quickSearch.checkIn}
                            onChange={(e) => setQuickSearch(prev => ({ ...prev, checkIn: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Check Out</label>
                          <input
                            type="date"
                            value={quickSearch.checkOut}
                            onChange={(e) => setQuickSearch(prev => ({ ...prev, checkOut: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                          <select
                            value={quickSearch.guests}
                            onChange={(e) => setQuickSearch(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          >
                            {[1,2,3,4,5,6].map(num => (
                              <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                          <select
                            value={quickSearch.location}
                            onChange={(e) => setQuickSearch(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          >
                            <option value="">Any Location</option>
                            <option value="downtown">Downtown</option>
                            <option value="beach">Beach Front</option>
                            <option value="mountain">Mountain View</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-black transition-colors"
                      >
                        Search Rooms
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Smart Navigation Links - Differentiated User Intent */}
            <div className="hidden lg:flex lg:space-x-6">
              {/* Rooms - Browse/Explore Intent */}
              <Link 
                to="/rooms?mode=browse" 
                className={`text-sm font-medium text-gray-300 hover:text-white transition-colors relative group ${
                  isActive('/rooms') && location.search.includes('mode=browse') ? 'text-white' : ''
                }`}>
                Explore Rooms
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {isActive('/rooms') && location.search.includes('mode=browse') && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500"></div>}
              </Link>
              
              {/* Book Now - Direct Action Intent */}
              <Link 
                to="/rooms?mode=booking" 
                className={`text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors relative group ${
                  isActive('/rooms') && (location.search.includes('mode=booking') || quickSearch.checkIn) ? 'text-yellow-400' : ''
                } border border-yellow-500/30 hover:border-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-500/10`}>
                Book Now ⚡
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {isActive('/rooms') && (location.search.includes('mode=booking') || quickSearch.checkIn) && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500"></div>}
              </Link>
              
              <Link 
                to="/about" 
                className={`text-sm font-medium text-gray-300 hover:text-white transition-colors relative group ${
                  isActive('/about') ? 'text-white' : ''
                }`}>
                About
                {isActive('/about') && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500"></div>}
              </Link>
              
              <Link 
                to="/contact" 
                className={`text-sm font-medium text-gray-300 hover:text-white transition-colors relative group ${
                  isActive('/contact') ? 'text-white' : ''
                }`}>
                Contact
                {isActive('/contact') && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-500"></div>}
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Guest Services */}
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">24/7</span>
                </div>
                <div className="text-xs">
                  <span className="text-gray-400">Guest Services</span>
                  <span className="text-white font-semibold"> +1 (555) 123-4567</span>
                </div>
              </div>

              {/* Cart with Booking Indicator */}
              <button
                onClick={handleCartClick}
                className="relative p-2 -m-2 text-white hover:text-gray-200 transition-colors group"
                aria-label="View bookings"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-yellow-500 rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className={`text-sm font-medium text-gray-300 hover:text-white transition-colors ${
                    isActive('/login') ? 'text-white' : ''
                  }`}>
                  Login
                </Link>
                <span className="text-gray-500">•</span>
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium text-gray-300 hover:text-white transition-colors ${
                    isActive('/admin') ? 'text-white' : ''
                  }`}>
                  Admin
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                type="button" 
                className="p-2 -m-2 text-white hover:text-gray-200 transition-colors lg:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="space-y-6">
                {/* Quick Search Mobile */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Quick Search</h4>
                  <form onSubmit={handleQuickSearch} className="space-y-3">
                    <input
                      type="date"
                      placeholder="Check-in Date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                    <input
                      type="date"
                      placeholder="Check-out Date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-semibold"
                    >
                      Find Rooms
                    </button>
                  </form>
                </div>

                {/* Smart Mobile Navigation - Differentiated User Intent */}
                <nav className="flex flex-col space-y-4">
                  {[
                    { path: '/', label: 'Home', icon: '🏠', mode: '' },
                    { path: '/rooms', label: 'View Rooms', icon: '🏨', mode: 'browse' },
                    { path: '/rooms', label: 'Book Now', icon: '⚡', mode: 'booking' },
                    { path: '/about', label: 'About Us', icon: '⭐', mode: '' },
                    { path: '/contact', label: 'Contact', icon: '📍', mode: '' },
                    { path: '/login', label: 'My Account', icon: '👤', mode: '' },
                    { path: '/admin', label: 'Admin', icon: '⚙️', mode: '' }
                  ].map(link => (
                    <Link
                      key={`${link.path}-${link.mode}`}
                      to={`${link.path}${link.mode ? `?mode=${link.mode}` : ''}`}
                      className={`flex items-center space-x-3 text-base font-medium ${
                        link.mode === 'booking' 
                          ? 'text-yellow-400 border border-yellow-500/30 hover:border-yellow-500 px-4 py-2 rounded-lg' 
                          : isActive(link.path) 
                            ? 'text-yellow-400 bg-gray-700 rounded-lg' 
                            : 'text-gray-300 hover:text-white'
                      } transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                      {link.mode === 'booking' && <span className="ml-auto text-xs animate-pulse">⚡</span>}
                      {isActive(link.path) && !link.mode && <span className="ml-auto text-xs">✓</span>}
                    </Link>
                  ))}
                </nav>

                {/* Guest Services Mobile */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="text-center mb-4">
                    <h4 className="text-white font-semibold mb-2">Guest Services</h4>
                    <p className="text-xs text-gray-400">Available 24/7</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-lg font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                  
                  {/* Special Offers Banner Mobile */}
                  <div className="bg-yellow-500 text-gray-900 rounded-lg p-3 mb-4">
                    <div className="text-sm font-semibold mb-1">🏆 Special Offers</div>
                    <div className="text-xs">
                      Weekend Getaway: 20% OFF • Book 30+ days early for extra savings
                    </div>
                  </div>

                  {/* Call to Action */}
                  <Link
                    to="/rooms"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors text-center"
                  >
                    Book Your Stay Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Header Spacer */}
      {isScrolled && <div className="h-20"></div>}
    </>
  );
};

export default Header;

// Enhanced Hotel Icon component for consistent branding
const HotelIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// Add custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;
document.head.appendChild(style);
