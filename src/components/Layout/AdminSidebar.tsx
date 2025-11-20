// Admin Sidebar component - Enhanced with luxury dark theme and best practices

import React, { useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { handleLogout } from '../../utils/auth';

// SVG Icon components for better performance and styling
const DashboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const RoomIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BookingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h2a2 2 0 012 2v4m-6 8h10M8 7v10a2 2 0 002 2h2a2 2 0 002-2V7H8z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

// Enhanced interface with better type safety
interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface AdminSidebarProps {
  onMenuClose?: () => void;
  className?: string;
  'aria-label'?: string;
}

// Memoized menu items for performance
const useMenuItems = (): MenuItem[] => {
  return useMemo(() => [
    { path: '', label: 'Dashboard', icon: DashboardIcon, description: 'Overview and analytics' },
    { path: '/rooms', label: 'Room Management', icon: RoomIcon, description: 'Manage hotel rooms' },
    { path: '/bookings', label: 'Bookings', icon: BookingIcon, description: 'Reservation management' },
    { path: '/users', label: 'Users', icon: UsersIcon, description: 'User account management' },
  ], []);
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  onMenuClose, 
  className = '',
  'aria-label': ariaLabel = 'Admin navigation menu'
}) => {
  const location = useLocation();
  const menuItems = useMenuItems();
  
  // Memoized active state checker
  const isActive = useCallback((path: string): boolean => {
    return location.pathname === `/admin${path}`;
  }, [location.pathname]);

  const handleLinkClick = useCallback(() => {
    onMenuClose?.();
  }, [onMenuClose]);

  // Dynamic styling based on design system - using readable Tailwind classes
  const getButtonClasses = (isActive: boolean): string => {
    if (isActive) {
      return 'justify-start bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-sm font-semibold';
    }
    return 'justify-start text-neutral-200 hover:text-white hover:bg-neutral-800';
  };

  return (
    <aside 
      className={`w-64 bg-neutral-900/80 backdrop-blur-sm border-r border-neutral-700 min-h-screen shadow-lg ${className}`}
      aria-label={ariaLabel}
      role="navigation"
    >
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">
            Admin Menu
          </h2>
          <div className="text-sm text-neutral-400">
            Hotel Management System
          </div>
        </div>
        
        <nav className="space-y-2" aria-label="Main admin navigation">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={`/admin${item.path}`} 
              onClick={handleLinkClick}
              aria-label={item.label}
              title={item.description}
              className="block"
            >
              <Button
                variant={isActive(item.path) ? 'primary' : 'ghost'}
                size="sm"
                fullWidth
                className={`transition-all duration-200 ${getButtonClasses(isActive(item.path))} rounded-lg`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {isActive(item.path) && (
                  <div className="w-1 h-4 bg-yellow-400 rounded-full ml-2" />
                )}
              </Button>
            </Link>
          ))}
        </nav>
        
        {/* Logout section at bottom */}
        <div className="mt-8 pt-6 border-t border-neutral-700">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            className="justify-start text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg"
            onClick={handleLogout}
          >
            <svg className="mr-3 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

// Add display name for debugging
AdminSidebar.displayName = 'AdminSidebar';

export default React.memo(AdminSidebar);
