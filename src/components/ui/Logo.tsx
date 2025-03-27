
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '',
  size = 'md',
  variant = 'full'
}) => {
  const sizeClasses = {
    sm: variant === 'full' ? 'text-lg font-bold' : 'text-lg font-bold',
    md: variant === 'full' ? 'text-xl md:text-2xl font-bold' : 'text-xl font-bold',
    lg: variant === 'full' ? 'text-2xl md:text-3xl font-bold' : 'text-2xl font-bold',
  };

  return (
    <div className={cn('flex items-center transition-all', className)}>
      {variant === 'full' ? (
        <span className={cn('text-green', sizeClasses[size])}>
          Final Whistle Wealth
        </span>
      ) : (
        <span className={cn('text-green', sizeClasses[size])}>
          FWW
        </span>
      )}
    </div>
  );
};

export default Logo;
