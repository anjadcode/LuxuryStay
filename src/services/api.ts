// Mock API service layer for hotel booking system

import type { 
  Room, 
  RoomFilters, 
  Booking, 
  BookingFormData, 
  BookingStatus, 
  User, 
  UserRole, 
  AuthCredentials, 
  ApiResponse, 
  DashboardStats 
} from '../types';

import { initialRooms, initialUsers, initialBookings } from './mockData';

// Simulate API delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory data storage
let roomsData = [...initialRooms];
let usersData = [...initialUsers];
let bookingsData = [...initialBookings];

// Local storage adapter for persistence
class LocalStorageAdapter {
  private static readonly KEYS = {
    ROOMS: 'hotel_rooms',
    USERS: 'hotel_users',
    BOOKINGS: 'hotel_bookings',
    CURRENT_USER: 'hotel_current_user'
  };

  static saveRooms(rooms: Room[]): void {
    try {
      localStorage.setItem(this.KEYS.ROOMS, JSON.stringify(rooms));
    } catch (error) {
      console.warn('Failed to save rooms to localStorage:', error);
    }
  }

  static loadRooms(): Room[] | null {
    try {
      const data = localStorage.getItem(this.KEYS.ROOMS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to load rooms from localStorage:', error);
      return null;
    }
  }

  static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.warn('Failed to save users to localStorage:', error);
    }
  }

  static loadUsers(): User[] | null {
    try {
      const data = localStorage.getItem(this.KEYS.USERS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to load users from localStorage:', error);
      return null;
    }
  }

  static saveBookings(bookings: Booking[]): void {
    try {
      localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (error) {
      console.warn('Failed to save bookings to localStorage:', error);
    }
  }

  static loadBookings(): Booking[] | null {
    try {
      const data = localStorage.getItem(this.KEYS.BOOKINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to load bookings from localStorage:', error);
      return null;
    }
  }

  static saveCurrentUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
      }
    } catch (error) {
      console.warn('Failed to save current user to localStorage:', error);
    }
  }

  static loadCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(this.KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to load current user from localStorage:', error);
      return null;
    }
  }

  static clearAll(): void {
    try {
      Object.values(this.KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

// Initialize data from localStorage if available
const initializeData = () => {
  const savedRooms = LocalStorageAdapter.loadRooms();
  const savedUsers = LocalStorageAdapter.loadUsers();
  const savedBookings = LocalStorageAdapter.loadBookings();

  if (savedRooms) roomsData = savedRooms;
  if (savedUsers) usersData = savedUsers;
  if (savedBookings) bookingsData = savedBookings;
};

// Initialize on first load
initializeData();

export const RoomService = {
  async getRooms(filters?: RoomFilters): Promise<ApiResponse<Room[]>> {
    await delay();
    
    let filteredRooms = [...roomsData];
    
    if (filters) {
      if (filters.type) {
        filteredRooms = filteredRooms.filter(room => room.type === filters.type);
      }
      
      if (filters.minPrice != null) {
        const minPrice = filters.minPrice;
        filteredRooms = filteredRooms.filter(room => room.price >= minPrice);
      }
      
      if (filters.maxPrice != null) {
        const maxPrice = filters.maxPrice;
        filteredRooms = filteredRooms.filter(room => room.price <= maxPrice);
      }
      
      if (filters.capacity != null) {
        const capacity = filters.capacity;
        filteredRooms = filteredRooms.filter(room => room.capacity >= capacity);
      }
      
      if (filters.availability !== undefined) {
        filteredRooms = filteredRooms.filter(room => room.availability === filters.availability);
      }
      
      if (filters.amenities && filters.amenities.length > 0) {
        filteredRooms = filteredRooms.filter(room => 
          filters.amenities!.every(amenity => room.amenities.includes(amenity))
        );
      }
      
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        filteredRooms = filteredRooms.filter(room =>
          room.name.toLowerCase().includes(searchTerm) ||
          room.description.toLowerCase().includes(searchTerm) ||
          room.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
        );
      }
    }
    
    return {
      success: true,
      data: filteredRooms.sort((a, b) => a.name.localeCompare(b.name))
    };
  },

  async getRoomById(id: string): Promise<ApiResponse<Room>> {
    await delay();
    
    const room = roomsData.find(room => room.id === id);
    
    if (!room) {
      return {
        success: false,
        error: 'Room not found',
        message: 'The requested room does not exist'
      };
    }
    
    return {
      success: true,
      data: room
    };
  },

  async createRoom(roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Room>> {
    await delay();
    
    const newRoom: Room = {
      ...roomData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    roomsData = [...roomsData, newRoom];
    LocalStorageAdapter.saveRooms(roomsData);
    
    return {
      success: true,
      data: newRoom,
      message: 'Room created successfully'
    };
  },

  async updateRoom(id: string, updates: Partial<Room>): Promise<ApiResponse<Room>> {
    await delay();
    
    const roomIndex = roomsData.findIndex(room => room.id === id);
    
    if (roomIndex === -1) {
      return {
        success: false,
        error: 'Room not found',
        message: 'The room you are trying to update does not exist'
      };
    }
    
    const updatedRoom = {
      ...roomsData[roomIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    roomsData = roomsData.map(room => 
      room.id === id ? updatedRoom : room
    );
    
    LocalStorageAdapter.saveRooms(roomsData);
    
    return {
      success: true,
      data: updatedRoom,
      message: 'Room updated successfully'
    };
  },

  async deleteRoom(id: string): Promise<ApiResponse<void>> {
    await delay();
    
    const roomIndex = roomsData.findIndex(room => room.id === id);
    
    if (roomIndex === -1) {
      return {
        success: false,
        error: 'Room not found',
        message: 'The room you are trying to delete does not exist'
      };
    }
    
    // Check if room has active bookings
    const activeBookings = bookingsData.filter(
      booking => booking.roomId === id && booking.status === 'confirmed'
    );
    
    if (activeBookings.length > 0) {
      return {
        success: false,
        error: 'Room has active bookings',
        message: 'Cannot delete room with active bookings'
      };
    }
    
    roomsData = roomsData.filter(room => room.id !== id);
    LocalStorageAdapter.saveRooms(roomsData);
    
    return {
      success: true,
      message: 'Room deleted successfully'
    };
  }
};

export const BookingService = {
  async getBookings(userId?: string): Promise<ApiResponse<Booking[]>> {
    await delay();
    
    let bookings = [...bookingsData];
    
    if (userId) {
      bookings = bookings.filter(booking => booking.userId === userId);
    }
    
    // Update totalPrice with actual room prices
    const bookingsWithPrices = bookings.map(booking => {
      const room = roomsData.find(r => r.id === booking.roomId);
      if (room) {
        const nights = Math.ceil((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return {
          ...booking,
          totalPrice: nights * room.price
        };
      }
      return booking;
    });
    
    return {
      success: true,
      data: bookingsWithPrices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    };
  },

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    await delay();
    
    const booking = bookingsData.find(booking => booking.id === id);
    
    if (!booking) {
      return {
        success: false,
        error: 'Booking not found',
        message: 'The requested booking does not exist'
      };
    }
    
    return {
      success: true,
      data: booking
    };
  },

  async createBooking(bookingData: BookingFormData): Promise<ApiResponse<Booking>> {
    await delay();
    
    // Check if room exists and is available
    const room = roomsData.find(r => r.id === bookingData.roomId);
    
    if (!room) {
      return {
        success: false,
        error: 'Room not found',
        message: 'The selected room does not exist'
      };
    }
    
    if (!room.availability) {
      return {
        success: false,
        error: 'Room not available',
        message: 'The selected room is not available for booking'
      };
    }
    
    // Check for conflicting bookings
    const conflictingBookings = bookingsData.filter(booking =>
      booking.roomId === bookingData.roomId &&
      booking.status === 'confirmed' &&
      this.datesOverlap(bookingData.checkIn, bookingData.checkOut, booking.checkIn, booking.checkOut)
    );
    
    if (conflictingBookings.length > 0) {
      return {
        success: false,
        error: 'Room already booked',
        message: 'The room is already booked for the selected dates'
      };
    }
    
    const nights = Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const newBooking: Booking = {
      id: generateId(),
      ...bookingData,
      status: 'pending',
      totalPrice: nights * room.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'demo-user' // This would normally come from the current authenticated user
    };
    
    bookingsData = [...bookingsData, newBooking];
    LocalStorageAdapter.saveBookings(bookingsData);
    
    return {
      success: true,
      data: newBooking,
      message: 'Booking created successfully'
    };
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<ApiResponse<Booking>> {
    await delay();
    
    const bookingIndex = bookingsData.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return {
        success: false,
        error: 'Booking not found',
        message: 'The booking you are trying to update does not exist'
      };
    }
    
    const updatedBooking = {
      ...bookingsData[bookingIndex],
      status,
      updatedAt: new Date()
    };
    
    bookingsData = bookingsData.map(booking =>
      booking.id === id ? updatedBooking : booking
    );
    
    LocalStorageAdapter.saveBookings(bookingsData);
    
    return {
      success: true,
      data: updatedBooking,
      message: 'Booking status updated successfully'
    };
  },

  async cancelBooking(id: string): Promise<ApiResponse<Booking>> {
    return this.updateBookingStatus(id, 'cancelled');
  },

  async confirmBooking(id: string): Promise<ApiResponse<Booking>> {
    return this.updateBookingStatus(id, 'confirmed');
  },

  datesOverlap(checkIn1: Date, checkOut1: Date, checkIn2: Date, checkOut2: Date): boolean {
    return (checkIn1 < checkOut2 && checkOut1 > checkIn2);
  }
};

export const UserService = {
  async getUsers(role?: UserRole): Promise<ApiResponse<User[]>> {
    await delay();
    
    let users = [...usersData];
    
    if (role) {
      users = users.filter(user => user.role === role);
    }
    
    return {
      success: true,
      data: users.sort((a, b) => a.name.localeCompare(b.name))
    };
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    await delay();
    
    const user = usersData.find(user => user.id === id);
    
    if (!user) {
      return {
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist'
      };
    }
    
    return {
      success: true,
      data: user
    };
  },

  async authenticate(credentials: AuthCredentials): Promise<ApiResponse<User>> {
    await delay();
    
    const user = usersData.find(u => u.email === credentials.email);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid credentials',
        message: 'The email or password is incorrect'
      };
    }
    
    // In a real app, we would verify the password hash
    // For mock purposes, we'll accept any password for demo users
    if (credentials.email === 'admin@hotel.com' || credentials.email === 'guest@example.com') {
      LocalStorageAdapter.saveCurrentUser(user);
      return {
        success: true,
        data: user,
        message: 'Authentication successful'
      };
    }
    
    // For other users, simulate random authentication
    if (Math.random() > 0.3) {
      LocalStorageAdapter.saveCurrentUser(user);
      return {
        success: true,
        data: user,
        message: 'Authentication successful'
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials',
      message: 'The email or password is incorrect'
    };
  },

  async logout(): Promise<ApiResponse<void>> {
    LocalStorageAdapter.saveCurrentUser(null);
    return {
      success: true,
      message: 'Logged out successfully'
    };
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    const user = LocalStorageAdapter.loadCurrentUser();
    return {
      success: true,
      data: user
    };
  }
};

export const DashboardService = {
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    await delay();
    
    const totalRooms = roomsData.length;
    const occupiedRooms = bookingsData.filter(
      booking => booking.status === 'confirmed'
    ).length;
    const availableRooms = roomsData.filter(room => room.availability).length;
    const totalBookings = bookingsData.length;
    const pendingBookings = bookingsData.filter(
      booking => booking.status === 'pending'
    ).length;
    const confirmedBookings = bookingsData.filter(
      booking => booking.status === 'confirmed'
    ).length;
    const totalRevenue = bookingsData
      .filter(booking => booking.status === 'confirmed')
      .reduce((sum, booking) => sum + booking.totalPrice, 0);
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
    
    return {
      success: true,
      data: {
        totalRooms,
        occupiedRooms,
        availableRooms,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
        occupancyRate
      }
    };
  }
};

// Helper function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
