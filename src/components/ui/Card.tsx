// Reusable Card component

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const baseClasses = `rounded-xl transition-all duration-200 ${
    border ? 'border' : ''
  } ${shadowClasses[shadow]} ${
    hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
  } ${paddingClasses[padding]} ${className}`;

  if (onClick) {
    return (
      <button
        className={baseClasses}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};

// Card Header component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

// Card Title component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '', 
  as = 'h3' 
}) => {
  const Component = as;
  return (
    <Component className={`text-xl font-semibold text-secondary-900 mb-2 ${className}`}>
      {children}
    </Component>
  );
};

// Card Content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

// Card Footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-secondary-200 ${className}`}>{children}</div>
);

export default Card;
