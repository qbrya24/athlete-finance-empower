
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
    sm: variant === 'full' ? 'h-8' : 'h-8 w-8',
    md: variant === 'full' ? 'h-10 md:h-12' : 'h-10 w-10 md:h-12 md:w-12',
    lg: variant === 'full' ? 'h-14 md:h-16' : 'h-14 w-14 md:h-16 md:w-16',
  };

  // Use the uploaded images or existing logo paths
  const logoPath = variant === 'full' 
    ? '/lovable-uploads/3f2816f4-47e1-4f64-8996-ba5b244837c4.png'
    : '/lovable-uploads/358fd915-e2c6-42fa-a819-a78319174f63.png';

  return (
    <div className={cn('flex items-center transition-all', className)}>
      <img 
        src={logoPath} 
        alt="Final Whistle Wealth" 
        className={cn('object-contain', sizeClasses[size])}
      />
    </div>
  );
};

export default Logo;
