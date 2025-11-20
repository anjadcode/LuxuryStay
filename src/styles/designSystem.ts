// Design System - Centralized styling configuration for hotel website
// Ensures consistent colors, spacing, and styling across all components

export const designSystem = {
  // Color Palette - Luxury Hotel Theme
  colors: {
    // Primary Brand Colors (Elegant Black/Gold Theme)
    primary: {
      50: '#fefcf3',  // Lightest cream
      100: '#fdf6e3', // Light cream
      200: '#fbecc7', // Cream
      300: '#f8dfa3', // Warm cream
      400: '#f4cd7a', // Soft gold
      500: '#eab308', // Primary gold (matches yellow-500)
      600: '#ca8a04', // Rich gold
      700: '#a16207', // Deep gold
      800: '#854d0e', // Dark gold
      900: '#713f12', // Darkest gold
    },
    
    // Neutral Colors (Sophisticated Grays)
    neutral: {
      50: '#fafafa',   // Off-white
      100: '#f5f5f5',  // Light gray
      200: '#e5e5e5',  // Soft gray
      300: '#d4d4d4',  // Medium light gray
      400: '#a3a3a3',  // Medium gray
      500: '#737373',  // Base gray
      600: '#525252',  // Dark gray
      700: '#404040',  // Charcoal
      800: '#262626',  // Deep charcoal
      900: '#171717',  // Near black
    },
    
    // Accent Colors (Complementary)
    accent: {
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6', // Primary blue
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      }
    },
    
    // Semantic Colors
    background: '#fafafa',       // Light background
    surface: '#ffffff',         // Card/Container background
    text: {
      primary: '#171717',       // Main text
      secondary: '#525252',     // Secondary text
      muted: '#737373',         // Muted text
      inverse: '#ffffff',       // Text on dark backgrounds
    },
    border: '#e5e5e5',          // Default borders
    shadow: 'rgba(0, 0, 0, 0.1)', // Shadow color
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      display: ['Lexend', 'ui-sans-serif', 'system-ui'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem',
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  
  // Transitions
  transition: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    timing: {
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
  },
  
  // Z-Index Scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  
  // Component-specific styles
  components: {
    // Hero Section
    hero: {
      background: 'bg-gradient-to-r from-gray-900 to-gray-800', // Consistent dark gradient
      text: '#ffffff',
      accent: '#eab308', // Gold accent
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Navigation
    nav: {
      background: '#171717',  // Dark navigation
      text: '#ffffff',
      hover: '#eab308',      // Gold hover
      active: '#eab308',
    },
    
    // Buttons
    button: {
      primary: {
        background: '#eab308',    // Gold background
        text: '#171717',         // Dark text
        hover: '#ca8a04',        // Darker gold
        focus: '#a16207',        // Focus state
      },
      secondary: {
        background: '#171717',    // Dark background
        text: '#ffffff',         // White text
        hover: '#404040',        // Lighter dark
        focus: '#525252',        // Focus state
      },
      outline: {
        border: '#eab308',       // Gold border
        text: '#eab308',         // Gold text
        background: 'transparent',
        hover: '#eab308',        // Gold background on hover
        hoverText: '#171717',    // Dark text on hover
      },
    },
    
    // Cards
    card: {
      background: '#ffffff',
      border: '#e5e5e5',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hover: {
        shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        scale: 'scale(1.02)',
      },
    },
    
    // Form Elements
    input: {
      border: '#e5e5e5',
      focus: '#eab308',
      error: '#ef4444',
      background: '#ffffff',
    },
    
    // Footer
    footer: {
      background: '#171717',
      text: '#ffffff',
      muted: '#737373',
      border: '#404040',
    },
  },
  
  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Accessibility
  accessibility: {
    focusRing: '0 0 0 2px #eab308',
    contrast: {
      minRatio: 4.5, // WCAG AA standard
      largeTextRatio: 3, // WCAG AA standard for large text
    },
  },
};

// Utility functions for consistent styling
export const getColor = (colorName: string, shade: string | number = 'default'): string => {
  const colorMap: Record<string, any> = {
    primary: designSystem.colors.primary,
    neutral: designSystem.colors.neutral,
    accent: designSystem.colors.accent,
  };
  
  const colorGroup = colorMap[colorName];
  if (!colorGroup) return designSystem.colors.text.primary;
  
  if (shade === 'default') {
    return colorGroup[500] || designSystem.colors.text.primary;
  }
  
  return colorGroup[shade] || designSystem.colors.text.primary;
};

export const getComponentStyle = (component: string, element: string, state?: string): string => {
  const componentStyles = designSystem.components as Record<string, any>;
  const componentStyle = componentStyles[component];
  if (!componentStyle) return '';
  
  const elementStyles = componentStyle[element];
  if (!elementStyles) return '';
  
  if (state && elementStyles[state]) {
    return elementStyles[state];
  }
  
  return elementStyles;
};

// Export individual color constants for easy import
export const COLORS = {
  primary: designSystem.colors.primary,
  neutral: designSystem.colors.neutral,
  accent: designSystem.colors.accent,
  background: designSystem.colors.background,
  surface: designSystem.colors.surface,
  text: designSystem.colors.text,
  border: designSystem.colors.border,
};

// Export component styles
export const COMPONENTS = designSystem.components;

export default designSystem;
