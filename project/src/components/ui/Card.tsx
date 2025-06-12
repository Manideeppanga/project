import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hoverable = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${
        hoverable ? 'hover:shadow-md transition-shadow duration-200' : ''
      } ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}