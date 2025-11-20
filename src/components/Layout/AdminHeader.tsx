// Admin Header component - Enhanced with luxury dark theme and best practices

import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { handleLogout } from '../../utils/auth';

// SVG Icon components for consistent styling
const HotelIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// Enhanced interface with better type safety
interface AdminHeaderProps {
  onMenuToggle?: () => void;
  className?: string;
  'aria-label'?: string;
  userName?: string;
  userRole?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onMenuToggle, 
  className = '',
  'aria-label': ariaLabel = 'Admin header navigation',
  userName = 'Admin User',
  userRole = 'Administrator'
}) => {
  // Memoized event handlers
  const handleMenuToggle = useCallback(() => {
    onMenuToggle?.();
  }, [onMenuToggle]);

  const handleLogoutClick = useCallback(() => {
    handleLogout();
  }, []);

  return (
    <header 
      className={`bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 shadow-lg sticky top-0 z-50 ${className}`}
      aria-label={ariaLabel}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Left section - Logo and navigation */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
              aria-controls="admin-sidebar"
            >
              <MenuIcon className="w-6 h-6 text-neutral-300" />
            </button>
            
            {/* Logo and branding */}
            <Link 
              to="/admin" 
              className="text-xl font-bold text-white group focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-lg p-1"
              aria-label="Go to admin dashboard"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg transition-all duration-200 shadow-md">
                  <HotelIcon className="w-6 h-6 text-gray-900" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-white font-semibold text-lg">Admin Dashboard</span>
                  <p className="text-xs text-neutral-400 mt-0.5">Hotel Management System</p>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Right section - User info and actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User info */}
            <div className="hidden lg:flex items-center space-x-3 text-right">
              <div>
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-neutral-400">{userRole}</p>
              </div>
              <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-neutral-300">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <Link 
              to="/" 
              className="hidden sm:block"
              aria-label="Back to main site"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-200"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to Site
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogoutClick}
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-yellow-500 transition-all duration-200"
              aria-label="Logout from admin panel"
            >
              <LogoutIcon className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Add display name for debugging
AdminHeader.displayName = 'AdminHeader';

export default React.memo(AdminHeader);
