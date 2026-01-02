import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const spinnerVariants = {
  default: 'border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent',
  shield: 'border-t-shield-500 border-r-transparent border-b-transparent border-l-transparent',
  indigo: 'border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent',
  primary: 'border-t-primary border-r-transparent border-b-transparent border-l-transparent',
  gradient: 'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-indigo-600 before:animate-spin before:border-4 before:border-t-transparent before:content-[""]',
};

const sizeVariants = {
  sm: 'h-5 w-5 border-2',
  default: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4',
};

export const Spinner = ({ 
  className, 
  variant = 'default', 
  size = 'default',
  ...props 
}) => {
  return (
    <div
      className={cn(
        'relative inline-block animate-spin rounded-full',
        spinnerVariants[variant],
        sizeVariants[size],
        variant === 'gradient' ? 'border-0' : 'border-4',
        className
      )}
      {...props}
    />
  );
};

export const ShieldSpinner = ({ className, size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    default: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={cn('animate-spin', className)} {...props}>
      <Shield className={cn('text-shield-500', sizeClasses[size])} />
    </div>
  );
};

export const TechSpinner = ({ className, size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-[2px]',
    default: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={cn(
          'absolute rounded-full border-blue-600/30 animate-[spin_1.5s_linear_infinite]',
          sizeClasses[size],
          className
        )}
        {...props}
      />
      <div
        className={cn(
          'absolute rounded-full border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-[spin_1s_ease-in-out_infinite]',
          sizeClasses[size],
          className
        )}
        {...props}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          'rounded-full bg-blue-600',
          {
            'h-1.5 w-1.5': size === 'sm',
            'h-2 w-2': size === 'default',
            'h-3 w-3': size === 'lg',
            'h-4 w-4': size === 'xl',
          }
        )} />
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ children, loading, message = "Loading..." }) => {
  if (!loading) return children;
  
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <TechSpinner size="lg" />
        <p className="mt-4 font-medium text-gray-700 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
};

const LoadingSpinner = ({ 
  variant = 'tech',
  size = 'default',
  className,
  ...props
}) => {
  const spinners = {
    default: <Spinner size={size} className={className} {...props} />,
    shield: <ShieldSpinner size={size} className={className} {...props} />,
    tech: <TechSpinner size={size} className={className} {...props} />
  };
  
  return spinners[variant] || spinners.tech;
};

export default LoadingSpinner;
