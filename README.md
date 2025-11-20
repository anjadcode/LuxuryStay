# 🏨 Hotel Booking Web Application

A modern, responsive hotel booking platform built with React 19, TypeScript, and Vite. This production-ready application features a complete guest booking system and comprehensive admin dashboard with mock data simulation.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## 🌟 Features

### Guest Features
- **🏨 Room Browsing**: Search and filter rooms by type, price, capacity, and amenities
- **📅 Booking System**: Multi-step booking process with form validation
- **🖼️ Room Gallery**: High-quality images with lazy loading
- **🔒 User Authentication**: Secure login/logout with session management
- **📋 Booking History**: View and manage personal reservations
- **📱 Responsive Design**: Mobile-first approach with cross-device compatibility

### Admin Features
- **📊 Dashboard**: Analytics overview with occupancy rates and revenue metrics
- **🏠 Room Management**: Full CRUD operations for room inventory
- **📝 Booking Management**: Approve, cancel, and modify reservations
- **👥 User Management**: View and manage guest accounts
- **📈 Statistics**: Real-time booking and revenue tracking

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React features with hooks and concurrent mode
- **TypeScript 5.9.3** - Type-safe JavaScript with strict mode
- **Vite 7.1.7** - Lightning-fast build tool and development server
- **TailwindCSS 4.1.16** - Utility-first CSS framework with custom design system
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icon set
- **React Router 7.9.5** - Declarative routing for React applications

### Architecture
- **Component-Based**: Reusable, maintainable UI components
- **Lazy Loading**: Route and component-based code splitting
- **Error Boundaries**: Comprehensive error handling and recovery
- **Performance Optimized**: Memoization, code splitting, and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes

## 🚀 Performance Metrics

```
✅ Build Time: 8.04 seconds
✅ Bundle Size: 93.94 kB gzipped
✅ CSS Bundle: 10.82 kB gzipped
✅ Total Modules: 2109 transformed
✅ Development Server: Hot reload on http://localhost:5174
```

## 📦 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd hotelwebapp

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🏗️ Project Structure

```
hotelwebapp/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Layout/     # Layout components (Header, Footer, etc.)
│   │   └── ui/         # Base UI components (Button, Input, Card)
│   ├── pages/          # Route-specific page components
│   │   ├── admin/      # Admin dashboard pages
│   │   └── *.tsx       # Public pages
│   ├── services/       # API and data services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── router/         # Routing configuration
├── public/             # Static assets
└── memory-bank/        # Project documentation (ignored in .gitignore)
```

## 🔧 Mock Data System

The application uses a sophisticated mock data system that simulates real backend functionality:

- **Realistic Room Data**: 8 sample rooms with images, amenities, and pricing
- **User Accounts**: 7 sample users including admin and guest accounts
- **Booking Simulation**: 3 sample reservations with different statuses
- **Persistent Storage**: localStorage integration for data persistence
- **API Simulation**: Realistic delays and error handling

## 🎨 Design System

- **Luxury Dark Theme**: Sophisticated color palette with gold accents
- **Responsive Breakpoints**: Mobile, tablet, and desktop optimized
- **Loading States**: Skeleton screens and smooth transitions
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: Full keyboard navigation and screen reader support

## 📈 Future Enhancements

The application architecture supports easy integration with:
- **Real Backend APIs**: Replace mock services with REST/GraphQL endpoints
- **Payment Processing**: Stripe, PayPal, or other payment gateways
- **Authentication Services**: Auth0, Firebase Auth, or custom solutions
- **Database Integration**: PostgreSQL, MongoDB, or other databases
- **Cloud Deployment**: AWS, Azure, Google Cloud, or other platforms

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Modern React patterns and best practices
- Vite for exceptional development experience
- TailwindCSS for utility-first styling approach
- Framer Motion for smooth animations
- Lucide React for beautiful icons

---

<p align="center">
  Built with ❤️ using modern web technologies
</p>
