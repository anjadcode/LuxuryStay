// Admin Layout component for the hotel booking app - Updated with luxury dark theme

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800">
      <AdminHeader onMenuToggle={toggleSidebar} />
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleSidebar} />
            <div className="absolute left-0 top-0 h-full w-64 bg-neutral-800 border-r border-neutral-700 shadow-xl">
              <AdminSidebar onMenuClose={toggleSidebar} />
            </div>
          </div>
        )}
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64">
          <AdminSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)] bg-neutral-900 border-l border-neutral-700 shadow-lg">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
