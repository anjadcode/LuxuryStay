# System Patterns – Hotel Web App

## Architecture Overview

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Layer                         │
│  ┌─────────────┐ ┌──────────────┐ ┌────────────────────┐   │
│  │   Pages     │ │  Components  │ │      Hooks        │   │
│  │             │ │              │ │                   │   │
│  │ • Home      │ │ • RoomCard   │ │ • useRooms        │   │
│  │ • Rooms     │ │ • BookingForm│ │ • useBookings     │   │
│  │ • Booking   │ │ • AdminPanel │ │ • useAuth         │   │
│  │ • Admin     │ │ • UserMenu   │ │ • useLocalStorage │   │
│  └─────┬───────┘ └──────┬───────┘ └────────┬──────────┘   │
│        │               │                   │               │
│  ┌─────▼───────┐ ┌──────▼───────┐ ┌────────▼──────────┐   │
│  │   Services  │ │     Types    │ │     Utils         │   │
│  │             │ │              │ │                   │   │
│  │ • MockAPI   │ │ • Room       │ │ • Formatters     │   │
│  │ • Storage   │ │ • Booking    │ │ • Validators     │   │
│  │ • Auth      │ │ • User       │ │ • Constants       │   │
│  └─────┬───────┘ └──────────────┘ └─────────────────┬───┘ │
│        │                                             │     │
│  ┌─────▼─────────────────────────────────────────────▼───┐ │
│  │              Mock Data Layer (JSON/Local)              │ │
│  │  • Rooms Data                                          │ │
│  │  • Bookings Data                                       │ │
│  │  • Users Data                                          │ │
│  │  • Settings Data                                       │ │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Component Hierarchy
```
App
├── RouterProvider
│   ├── Public Routes (Layout)
│   │   ├── Header/Navigation
│   │   ├── Main Content (Suspense + Lazy Loading)
│   │   └── Footer
│   ├── Admin Routes (AdminLayout)
│   │   ├── AdminHeader
│   │   ├── AdminSidebar
│   │   └── Admin Content
│   └── Protected Routes
├── Auth Context
└── Error Boundaries
```

### Component Patterns Implemented

#### 1. Container/Presentational Pattern
- **Container Components**: Handle logic, data fetching, state management
  - `HomePage.tsx` - Complex state management and data fetching
  - `RoomsPage.tsx` - Filter and search logic
  - `BookingPage.tsx` - Form handling and validation
- **Presentational Components**: Pure UI components, receive props
  - `Button.tsx` - Reusable button with variants
  - `Card.tsx` - Flexible card container
  - `Input.tsx` - Form input with validation

#### 2. Compound Component Pattern
- **Layout Components**: Consistent structure across pages
  ```tsx
  <Layout>
    <Header />
    <main>{children}</main>
    <Footer />
  </Layout>
  ```

#### 3. Render Props Pattern
- **WithLoading Component**: Handles loading states consistently
  ```tsx
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
  ```

#### 4. Higher-Order Components
- **ProtectedRoute**: Handles authentication logic
  ```tsx
  <ProtectedRoute requireAdmin={true}>
    <AdminComponent />
  </ProtectedRoute>
  ```

## State Management Patterns

### 1. Local State (useState)
- **Form State**: Booking forms, search filters
- **UI State**: Modal visibility, dropdown states
- **Component-Specific**: Pagination, sorting preferences

### 2. Context API (Global State)
```typescript
// Authentication Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
```

### 3. Custom Hooks for State Logic
```typescript
// useLocalStorage Hook
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    // Implementation with state update and localStorage sync
  };
  
  return [storedValue, setValue];
};
```

## Routing Patterns

### 1. Route-Based Code Splitting
```typescript
// Lazy loading for optimal performance
const HomePage = lazy(() => import('../pages/HomePage'));
const AdminDashboard = lazy(() => import('../pages/admin/DashboardPage'));

// Router configuration with Suspense
{
  path: '/',
  element: <Suspense fallback={<LoadingSpinner />}><Layout /></Suspense>,
  children: [
    {
      index: true,
      element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense>
    }
  ]
}
```

### 2. Protected Routes Pattern
```typescript
// Authentication-based route protection
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;
  
  return children;
};
```

## Data Flow Patterns

### 1. Unidirectional Data Flow
- **Parent → Child**: Props passing for data
- **Child → Parent**: Callback functions for events
- **Global State**: Context API for shared state

### 2. Service Layer Pattern
```typescript
// Mock service implementation
class RoomService {
  async getRooms(filters: RoomFilters): Promise<ApiResponse<Room[]>> {
    try {
      // Simulate API delay
      await this.delay(200);
      
      // Get data from localStorage or mock data
      const rooms = this.getMockRooms();
      
      // Apply filters
      const filteredRooms = this.applyFilters(rooms, filters);
      
      return {
        success: true,
        data: filteredRooms
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}
```

### 3. LocalStorage Data Persistence
```typescript
// Data storage adapter pattern
class LocalStorageAdapter<T> {
  constructor(private key: string, private defaultValue: T) {}
  
  get(): T {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : this.defaultValue;
    } catch (error) {
      return this.defaultValue;
    }
  }
  
  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}
```

## Mock Data Patterns

### 1. Factory Pattern for Test Data
```typescript
// Sophisticated mock data generation
export const MockDataFactory = {
  createRoom(type: RoomType, overrides?: Partial<Room>): Room {
    const roomNumber = Math.floor(Math.random() * 900) + 100;
    const basePrice = this.getPriceRange(type);
    
    return {
      id: generateId(),
      name: `${this.getRoomName(type)} ${roomNumber}`,
      type,
      price: this.generatePrice(basePrice),
      capacity: this.generateCapacity(type),
      amenities: this.generateAmenities(type),
      images: ROOM_IMAGES[type],
      description: ROOM_DESCRIPTIONS[type],
      availability: Math.random() > 0.3,
      createdAt: this.createDate(-Math.floor(Math.random() * 365)),
      updatedAt: this.createDate(-Math.floor(Math.random() * 30)),
      ...overrides
    };
  }
};
```

### 2. Realistic Data Simulation
```typescript
// Authentic hotel data simulation
const initialRooms: Room[] = [
  MockDataFactory.createRoom('single'),
  MockDataFactory.createRoom('double'),
  MockDataFactory.createRoom('suite'),
  MockDataFactory.createRoom('deluxe'),
  // ... more realistic room data
];

const initialUsers: User[] = [
  MockDataFactory.createUser('admin', {
    email: 'admin@hotel.com',
    name: 'Hotel Administrator'
  }),
  MockDataFactory.createUser('guest', {
    email: 'guest@example.com',
    name: 'Guest User'
  }),
  // ... more user accounts
];
```

## Performance Patterns

### 1. React.memo for Component Optimization
```typescript
// Memoized components for performance
const RoomCard = React.memo(({ room, onBook }: Props) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.room.id === nextProps.room.id && 
         prevProps.onBook === nextProps.onBook;
});

// Custom comparison function
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.testimonial.id === nextProps.testimonial.id;
});
```

### 2. useMemo for Expensive Computations
```typescript
// Optimized filtering and sorting
const availableRooms = useMemo(() => {
  return rooms.filter(room => 
    room.availability && 
    room.price <= maxPrice &&
    room.capacity >= guestCount
  );
}, [rooms, maxPrice, guestCount]);

// Expensive data transformation
const formattedBookings = useMemo(() => {
  return bookings.map(booking => ({
    ...booking,
    formattedDate: formatDate(booking.checkIn),
    totalNights: calculateNights(booking.checkIn, booking.checkOut)
  }));
}, [bookings]);
```

### 3. Lazy Loading Strategy
```typescript
// Route-based code splitting
const AdminDashboard = lazy(() => import('./pages/admin/DashboardPage'));
const RoomManagement = lazy(() => import('./pages/admin/RoomManagementPage'));

// Component-based lazy loading
const RoomGallery = lazy(() => import('./components/RoomGallery'));
const TestimonialCarousel = lazy(() => import('./components/TestimonialCarousel'));
```

### 4. Image Optimization
```typescript
// Lazy image loading with fallback
const LazyImage = memo(({ src, alt, className, onLoad }: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };
    img.onerror = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <>
      {isLoading && <div className="animate-pulse bg-gray-200" />}
      <img
        src={imageSrc || 'data:image/svg+xml;base64,...'}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        decoding="async"
      />
    </>
  );
});
```

## Error Handling Patterns

### 1. Error Boundary Implementation
```typescript
// Component-level error handling
const ErrorBoundary = memo(({ error, onRetry }: ErrorBoundaryProps) => (
  <section className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
    <div className="max-w-md mx-auto text-center">
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-red-300 mb-6">{error}</p>
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </div>
  </section>
));
```

### 2. Result Pattern for Async Operations
```typescript
// Type-safe error handling
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

async function fetchRooms(filters: RoomFilters): Promise<Result<Room[]>> {
  try {
    const rooms = await roomService.getRooms(filters);
    return { success: true, data: rooms };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to fetch rooms. Please try again.' 
    };
  }
}
```

## Security Patterns

### 1. Input Sanitization
```typescript
// XSS protection for user inputs
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Form validation with sanitization
const validateAndSanitize = (formData: BookingFormData) => {
  return {
    ...formData,
    guestInfo: {
      ...formData.guestInfo,
      firstName: sanitizeInput(formData.guestInfo.firstName),
      lastName: sanitizeInput(formData.guestInfo.lastName),
      specialRequests: sanitizeInput(formData.guestInfo.specialRequests || '')
    }
  };
};
```

### 2. Authentication Pattern
```typescript
// Mock authentication service
class AuthService {
  private currentUser: User | null = null;
  
  async login(credentials: AuthCredentials): Promise<ApiResponse<User>> {
    try {
      // Mock authentication logic
      const user = this.mockAuthenticate(credentials);
      
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, data: user };
      }
      
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Authentication failed' 
      };
    }
  }
  
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
```

## Accessibility Patterns

### 1. Semantic HTML and ARIA
```typescript
// Accessible component structure
const TestimonialCard = ({ testimonial }: Props) => (
  <article className="bg-white rounded-lg shadow-lg p-6 h-full" 
           role="article" 
           aria-label="Guest testimonial">
    <blockquote className="text-gray-600 italic mb-4">
      <p>"{testimonial.comment}"</p>
    </blockquote>
    <p className="text-sm text-gray-400" aria-label="Testimonial date">
      {testimonial.date}
    </p>
  </article>
);
```

### 2. Keyboard Navigation
```typescript
// Accessible form with keyboard support
const NewsletterForm = () => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <input
        type="email"
        placeholder="Enter your email"
        aria-label="Email address for newsletter"
        aria-required="true"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <p id="email-error" role="alert" className="text-red-500">
          {error}
        </p>
      )}
      <Button type="submit" aria-label="Subscribe to newsletter">
        Subscribe
      </Button>
    </form>
  );
};
```

This comprehensive pattern documentation reflects the actual implementation used in the hotel web application, showcasing modern React development practices and production-ready architecture patterns.
