// Reusable Button component with variants - Updated with design system

import React from 'react';
import { COMPONENTS, COLORS } from '../../styles/designSystem';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Updated variant classes using design system colors
  const variantClasses = {
    primary: `bg-[${COMPONENTS.button.primary.background}] text-[${COMPONENTS.button.primary.text}] hover:bg-[${COMPONENTS.button.primary.hover}] focus:ring-[${COMPONENTS.button.primary.focus}] border-none`,
    secondary: `bg-[${COMPONENTS.button.secondary.background}] text-[${COMPONENTS.button.secondary.text}] hover:bg-[${COMPONENTS.button.secondary.hover}] focus:ring-gray-500 border-none`,
    outline: `border-[${COMPONENTS.button.outline.border}] text-[${COMPONENTS.button.outline.text}] bg-[${COMPONENTS.button.outline.background}] hover:bg-[${COMPONENTS.button.outline.hover}] hover:text-[${COMPONENTS.button.outline.hoverText}] focus:ring-[${COMPONENTS.button.outline.border}]`,
    ghost: `text-[${COLORS.text.secondary}] hover:bg-[${COLORS.neutral[100]}] focus:ring-[${COLORS.neutral[400]}] border border-[${COLORS.border}]`,
    danger: `bg-[${COLORS.accent.red[500]}] hover:bg-[${COLORS.accent.red[600]}] text-white focus:ring-[${COLORS.accent.red[500]}] border-none`,
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ].join(' ').trim();
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
