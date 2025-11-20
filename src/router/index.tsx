// React Router configuration for the hotel booking app

import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from '../components/ProtectedRoute';

// Layout components
const Layout = lazy(() => import('../components/Layout/Layout'));
const AdminLayout = lazy(() => import('../components/Layout/AdminLayout'));

// Page components
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomsPage = lazy(() => import('../pages/RoomsPage'));
const RoomDetailsPage = lazy(() => import('../pages/RoomDetailsPage'));
const BookingPage = lazy(() => import('../pages/BookingPage'));
const BookingConfirmationPage = lazy(() => import('../pages/BookingConfirmationPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const RoomManagementPage = lazy(() => import('../pages/admin/RoomManagementPage'));
const BookingManagementPage = lazy(() => import('../pages/admin/BookingManagementPage'));
const UserManagementPage = lazy(() => import('../pages/admin/UserManagementPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'rooms',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RoomsPage />
          </Suspense>
        ),
      },
      {
        path: 'rooms/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RoomDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'booking/:roomId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'booking-confirmation/:bookingId',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <BookingConfirmationPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute requireAdmin={true}>
          <AdminLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'rooms',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <RoomManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'bookings',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <BookingManagementPage />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserManagementPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

export default router;
