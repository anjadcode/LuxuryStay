// Main Layout component for the hotel booking app

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
