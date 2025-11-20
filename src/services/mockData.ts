// Mock data factory and initial data setup

import type { Room, RoomType, Booking, User, UserRole } from '../types';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to create dates
const createDate = (daysFromNow = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Room amenities
const AMENITIES = [
  'WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Desk', 'Safe', 'Hair Dryer', 
  'Coffee Maker', 'Balcony', 'City View', 'Ocean View', 'Kitchenette', 
  'Sofa', 'Bathtub', 'Shower', 'Iron', 'Telephone', 'Room Service'
];

// Room images (using placeholder images)
const ROOM_IMAGES = {
  single: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
  ],
  double: [
    'https://images.unsplash.com/photo-1582719478250-c87cae5fd583?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
  ],
  suite: [
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
  ],
  deluxe: [
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542314831-068cd1dbb5ee?w=800&h=600&fit=crop',
  ]
};

// Room descriptions
const ROOM_DESCRIPTIONS = {
  single: 'Cozy single room perfect for solo travelers. Features a comfortable single bed, modern bathroom, and essential amenities for a pleasant stay.',
  double: 'Spacious double room ideal for couples. Includes a queen-size bed, private bathroom, and all necessary amenities for your comfort.',
  suite: 'Luxurious suite with separate living area. Perfect for extended stays, featuring premium amenities and extra space to relax and work.',
  deluxe: 'Premium deluxe room with stunning views. Experience luxury with top-tier amenities, premium bedding, and exceptional comfort.'
};

// Room names
const ROOM_NAMES = {
  single: ['Sunrise Single', 'Garden View Single', 'City Single', 'Comfort Single'],
  double: ['Ocean View Double', 'Mountain View Double', 'Premium Double', 'Executive Double'],
  suite: ['Presidential Suite', 'Penthouse Suite', 'Executive Suite', 'Luxury Suite'],
  deluxe: ['Royal Deluxe', 'Premium Deluxe', 'Executive Deluxe', 'Ocean Deluxe']
};

// Mock data factory functions
export const MockDataFactory = {
  createRoom(type: RoomType, overrides?: Partial<Room>): Room {
    const roomNumber = Math.floor(Math.random() * 900) + 100;
    const basePrice = {
      single: { min: 80, max: 150 },
      double: { min: 120, max: 220 },
      suite: { min: 300, max: 600 },
      deluxe: { min: 250, max: 450 }
    };

    const price = Math.floor(Math.random() * (basePrice[type].max - basePrice[type].min + 1)) + basePrice[type].min;
    const capacity = type === 'single' ? 1 : type === 'double' ? 2 : Math.floor(Math.random() * 2) + 2;
    
    const amenityCount = type === 'single' ? 3 : type === 'double' ? 5 : type === 'suite' ? 8 : 6;
    const amenitySlots = type === 'single' ? 5 : type === 'double' ? 7 : type === 'suite' ? 12 : 10;

    return {
      id: generateId(),
      name: `${ROOM_NAMES[type][Math.floor(Math.random() * ROOM_NAMES[type].length)]} ${roomNumber}`,
      type,
      price,
      capacity,
      amenities: this.generateAmenities(amenityCount, amenitySlots),
      images: ROOM_IMAGES[type],
      description: ROOM_DESCRIPTIONS[type],
      availability: Math.random() > 0.3,
      createdAt: createDate(-Math.floor(Math.random() * 365)),
      updatedAt: createDate(-Math.floor(Math.random() * 30)),
      ...overrides
    };
  },

  generateAmenities(count: number, slots: number): string[] {
    const shuffled = [...AMENITIES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.floor(Math.random() * (slots - count + 1)) + count);
    return selected.sort();
  },

  createBooking(roomId: string, userId: string, overrides?: Partial<Booking>): Booking {
    const checkIn = createDate(Math.floor(Math.random() * 30) + 1);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 7) + 1);
    
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const guests = Math.floor(Math.random() * 3) + 1;

    return {
      id: generateId(),
      roomId,
      userId,
      checkIn,
      checkOut,
      guests,
      totalPrice: nights * 150, // Base price, will be updated with actual room price
      status: Math.random() > 0.7 ? 'confirmed' : Math.random() > 0.5 ? 'pending' : 'cancelled',
      createdAt: createDate(-Math.floor(Math.random() * 90)),
      updatedAt: new Date(),
      ...overrides
    };
  },

  createUser(role: UserRole = 'guest', overrides?: Partial<User>): User {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      id: generateId(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      name: `${firstName} ${lastName}`,
      role,
      bookings: [],
      createdAt: createDate(-Math.floor(Math.random() * 365)),
      updatedAt: new Date(),
      ...overrides
    };
  }
};

// Initial mock data
export const initialRooms: Room[] = [
  MockDataFactory.createRoom('single'),
  MockDataFactory.createRoom('single'),
  MockDataFactory.createRoom('double'),
  MockDataFactory.createRoom('double'),
  MockDataFactory.createRoom('suite'),
  MockDataFactory.createRoom('suite'),
  MockDataFactory.createRoom('deluxe'),
  MockDataFactory.createRoom('deluxe'),
];

export const initialUsers: User[] = [
  MockDataFactory.createUser('admin', {
    email: 'admin@hotel.com',
    name: 'Hotel Administrator'
  }),
  MockDataFactory.createUser('guest', {
    email: 'guest@example.com',
    name: 'Guest User'
  }),
  ...Array.from({ length: 5 }, () => MockDataFactory.createUser())
];

export const initialBookings: Booking[] = [
  MockDataFactory.createBooking(initialRooms[0].id, initialUsers[1].id, {
    totalPrice: initialRooms[0].price * 3,
    status: 'confirmed'
  }),
  MockDataFactory.createBooking(initialRooms[2].id, initialUsers[2].id, {
    totalPrice: initialRooms[2].price * 2,
    status: 'pending'
  }),
  MockDataFactory.createBooking(initialRooms[4].id, initialUsers[3].id, {
    totalPrice: initialRooms[4].price * 5,
    status: 'confirmed'
  }),
];

// Update users with booking references
initialUsers[1].bookings = [initialBookings[0].id];
initialUsers[2].bookings = [initialBookings[1].id];
initialUsers[3].bookings = [initialBookings[2].id];
