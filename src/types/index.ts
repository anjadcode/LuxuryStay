// Core entity types for the hotel booking system

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RoomType = 'single' | 'double' | 'suite' | 'deluxe';

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bookings: string[]; // booking IDs
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'guest' | 'admin';

export interface RoomFilters {
  type?: RoomType;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  availability?: boolean;
  amenities?: string[];
  searchTerm?: string;
}

export interface BookingFormData {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  guestInfo: GuestInfo;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  occupancyRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
