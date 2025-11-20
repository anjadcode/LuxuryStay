
// Enhanced 404 Not Found Page - Luxury Hotel Experience
// Implements best practices for error pages with hotel branding and user assistance

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Home, Search, Compass, Phone, Mail, MapPin, Clock, Star } from 'lucide-react';
import { COLORS } from '../styles/designSystem';

interface Suggestion {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const handleGoBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  // Smart suggestions based on the attempted URL
  const getSmartSuggestions = (): Suggestion[] => {
    const pathname = location.pathname.toLowerCase();
    
    const suggestions: Suggestion[] = [
      {
        title: "Browse Our Rooms",
        description: "Discover luxury accommodations",
        path: "/rooms",
        icon: <Home className="w-5 h-5" />
      },
      {
        title: "Special Offers",
        description: "Current deals and packages",
        path: "/offers",
        icon: <Star className="w-5 h-5" />
      },
      {
        title: "Contact Us",
        description: "Get personalized assistance",
        path: "/contact",
        icon: <Phone className="w-5 h-5" />
      }
    ];

    // Smart routing based on URL patterns
    if (pathname.includes('room') || pathname.includes('accommodation')) {
      suggestions.unshift({
        title: "View All Rooms",
        description: "Explore our room collection",
        path: "/rooms",
        icon: <Search className="w-5 h-5" />
      });
    }

    if (pathname.includes('book') || pathname.includes('reservation')) {
      suggestions.unshift({
        title: "Make a Reservation",
        description: "Book your stay easily",
        path: "/booking",
        icon: <Compass className="w-5 h-5" />
      });
    }

    if (pathname.includes('location') || pathname.includes('direction')) {
      suggestions.unshift({
        title: "Our Location",
        description: "Find us easily",
        path: "/location",
        icon: <MapPin className="w-5 h-5" />
      });
    }

    return suggestions;
  };

  // Emergency contact information
  const emergencyContacts = [
    {
      type: "Phone",
      value: "+1 (555) 123-4567",
      icon: <Phone className="w-4 h-4" />,
      available: "24/7"
    },
    {
      type: "Email", 
      value: "reservations@luxurystay.com",
      icon: <Mail className="w-4 h-4" />,
      available: "Within 2 hours"
    }
  ];

  // Animated background with subtle luxury pattern
  const LuxuryBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90"></div>
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.primary[500]}20 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, ${COLORS.accent.blue[500]}15 0%, transparent 50%)`,
           }}>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5"
           style={{
             backgroundImage: `linear-gradient(45deg, ${COLORS.neutral[800]} 25%, transparent 25%),
                              linear-gradient(-45deg, ${COLORS.neutral[800]} 25%, transparent 25%)`,
             backgroundSize: '60px 60px',
           }}>
      </div>
    </div>
  );

  // Apply CSS animations via useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slide-down {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }
      
      .animate-fade-in-delay {
        animation: fade-in 0.8s ease-out 0.2s both;
      }
      
      .animate-fade-in-delay-2 {
        animation: fade-in 0.8s ease-out 0.4s both;
      }
      
      .animate-slide-down {
        animation: slide-down 0.6s ease-out;
      }
      
      .animate-slide-up {
        animation: slide-up 0.6s ease-out 0.1s both;
      }
      
      @media (max-width: 640px) {
        .text-6xl { font-size: 4rem; }
        .text-2xl { font-size: 1.5rem; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Page Not Found - LuxuryStay Hotel</title>
      <meta name="description" content="The page you're looking for doesn't exist. Let us help you find your way back to luxury accommodations." />
      <meta property="og:title" content="Page Not Found - LuxuryStay Hotel" />
      <meta property="og:description" content="Sorry, we couldn't find the page you're looking for. Explore our luxury rooms and amenities." />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "LuxuryStay Hotel",
          "url": "https://luxurystay.com",
          "telephone": "+1-555-123-4567",
          "email": "reservations@luxurystay.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Luxury Avenue",
            "addressLocality": "Downtown",
            "addressRegion": "CA",
            "postalCode": "90210",
            "addressCountry": "US"
          }
        })}
      </script>

      {/* Main Content */}
      <main className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-hidden">
        <LuxuryBackground />
        
        {/* Error Tracking for Analytics */}
        <div className="sr-only" role="status" aria-live="polite">
          404 error encountered at {location.pathname}
        </div>

        <div className="relative max-w-4xl w-full">
          {/* Hero Section with Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center bg-gradient-to-br from-yellow-400/10 to-blue-400/10 rounded-full border border-white/20">
                <span className="text-7xl bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent animate-bounce">
                  🏨
                </span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-white to-blue-400 bg-clip-text text-transparent mb-4 animate-slide-down">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4 animate-fade-in-delay">
              Lost in Luxury?
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
              We couldn't find the page you're looking for, but don't worry - we'll help you find your way back to 
              exceptional experiences and unforgettable stays.
            </p>
          </div>

          {/* Smart Navigation Section */}
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl mb-8 animate-slide-up">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Let us guide you back
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {getSmartSuggestions().map((suggestion, index) => (
                  <Link
                    key={index}
                    to={suggestion.path}
                    className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 group"
                    onClick={() => setIsLoading(true)}
                  >
                    <div className="text-yellow-500 mb-3 group-hover:scale-110 transition-transform">
                      {suggestion.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 text-center">{suggestion.description}</p>
                  </Link>
                ))}
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={handleGoHome}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {isLoading ? 'Redirecting...' : 'Go to Homepage'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  disabled={isLoading}
                  className="border-gray-300 text-gray-700 hover:border-gray-400"
                >
                  ← Go Back
                </Button>
              </div>
            </div>
          </Card>

          {/* Help Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-fade-in">
            {/* Quick Links */}
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Compass className="w-5 h-5 mr-2 text-blue-500" />
                  Quick Navigation
                </h3>
                <nav className="space-y-3">
                  <Link to="/rooms" className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors group">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Browse Rooms
                  </Link>
                  <Link to="/about" className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors group">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    About Our Hotel
                  </Link>
                  <Link to="/contact" className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors group">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Contact Information
                  </Link>
                  <Link to="/booking" className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors group">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Make a Reservation
                  </Link>
                </nav>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-500" />
                  Need Immediate Help?
                </h3>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="text-gray-600 mr-3">
                          {contact.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contact.type}</p>
                          <p className="text-sm text-gray-600">{contact.value}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {contact.available}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Professional Footer Message */}
          <div className="text-center text-gray-400 animate-fade-in">
            <p className="text-sm mb-2">
              Error Code: 404 | Timestamp: {currentTime.toLocaleString()}
            </p>
            <p className="text-xs">
              If you continue to experience issues, please contact our support team. 
              We're here to help 24/7 at reservations@luxurystay.com
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default React.memo(NotFoundPage);
