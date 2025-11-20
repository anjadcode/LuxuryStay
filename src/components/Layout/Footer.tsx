// Footer component for the hotel booking app - Enhanced with sophisticated outline icons

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

// Enhanced SVG Icon components for consistent design
const HotelIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);


const TimeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4m1-6h.01M13 12h.01M17 12h.01" />
  </svg>
);

const PhoneIconOutlined = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const EmailIconOutlined = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-50" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <HotelIcon className="w-8 h-8 md:w-10 md:h-10 text-neutral-300 hover:text-white transition-colors duration-200" aria-hidden="true" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">HotelWebApp</h2>
                <p className="text-xs md:text-sm text-gray-400">Luxury Hotels</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
              Your premier destination for luxury accommodation. Experience comfort, 
              elegance, and exceptional service at our world-class hotel.
            </p>
            
            {/* Social Links - Better accessibility */}
            <div className="flex space-x-3" role="navigation" aria-label="Social media links">
              <a 
                href="mailto:info@hotelwebapp.com" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email us"
                title="Email HotelWebApp"
              >
                <EmailIcon className="w-5 h-5 text-neutral-300 hover:text-white transition-colors duration-200" />
              </a>
              <a 
                href="tel:+15551234567" 
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Call us"
                title="Call HotelWebApp"
              >
                <PhoneIcon className="w-5 h-5 text-neutral-300 hover:text-white transition-colors duration-200" />
              </a>
              <a 
                href="https://twitter.com/hotelwebapp" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Follow us on Twitter"
                title="Follow HotelWebApp on Twitter"
              >
                <svg className="w-5 h-5 text-neutral-300 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Better organization */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-100">
              Quick Links
            </h3>
            <nav className="space-y-2" role="navigation" aria-label="Footer navigation">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base py-1 focus:outline-none focus:text-white flex items-center"
                onClick={scrollToTop}
              >
                <HomeIcon className="w-4 h-4 mr-2 text-neutral-400 hover:text-white transition-colors duration-200" />
                Home
              </Link>
              <Link 
                to="/rooms" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base py-1 focus:outline-none focus:text-white flex items-center"
              >
                <HotelIcon className="w-4 h-4 mr-2 text-neutral-400 hover:text-white transition-colors duration-200" />
                Browse Rooms
              </Link>
              <Link 
                to="/booking" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base py-1 focus:outline-none focus:text-white flex items-center"
              >
                <TimeIcon className="w-4 h-4 mr-2 text-neutral-400 hover:text-white transition-colors duration-200" />
                Book Now
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base py-1 focus:outline-none focus:text-white flex items-center"
              >
                <span className="w-4 h-4 mr-2 text-neutral-400 hover:text-white transition-colors duration-200">ℹ️</span>
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact Info - More accessible */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-100">
              Contact Us
            </h3>
            <address className="space-y-3 text-gray-300 not-italic">
              <p className="flex items-start space-x-3 text-sm md:text-base">
                <PhoneIconOutlined className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                <span className="leading-relaxed">
                  123 Hotel Street<br />
                  City Center, NY 10001<br />
                  United States
                </span>
              </p>
              <p className="flex items-center space-x-3 text-sm md:text-base">
                <PhoneIcon className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <p className="flex items-center space-x-3 text-sm md:text-base">
                <EmailIconOutlined className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                <a 
                  href="mailto:info@hotelwebapp.com" 
                  className="hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                >
                  info@hotelwebapp.com
                </a>
              </p>
              <p className="flex items-center space-x-3 text-sm md:text-base">
                <TimeIcon className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                <span>24/7 Customer Service</span>
              </p>
            </address>
          </div>

          {/* Newsletter - Enhanced with feedback */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-100">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
              Get exclusive offers, travel tips, and hotel news delivered to your inbox.
            </p>
            
            {subscribed ? (
              <div className="bg-green-900 border border-green-700 rounded-lg p-3 mb-4">
                <p className="text-green-300 text-sm font-medium">
                  ✅ Successfully subscribed! Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  aria-label="Email address for newsletter subscription"
                />
                <Button 
                  variant="primary" 
                  size="sm" 
                  type="submit"
                  className="w-full md:w-auto"
                  fullWidth={false}
                >
                  Subscribe to Newsletter
                </Button>
              </form>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Bottom Bar - Enhanced accessibility */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm md:text-base">
              © 2025 HotelWebApp. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Made with <HeartIcon className="w-4 h-4 inline-block mx-1 text-red-400" /> for travelers worldwide
            </p>
          </div>
          
          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center sm:justify-end space-x-6" role="navigation" aria-label="Legal links">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base focus:outline-none focus:text-white"
              title="View our privacy policy"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base focus:outline-none focus:text-white"
              title="Read our terms of service"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base focus:outline-none focus:text-white flex items-center"
              title="Scroll to top of page"
              aria-label="Back to top"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
