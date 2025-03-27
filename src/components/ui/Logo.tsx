
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
    md: variant === 'full' ? 'h-12' : 'h-12 w-12',
    lg: variant === 'full' ? 'h-16' : 'h-16 w-16',
  };

  const logoPath = variant === 'full' 
    ? '/lovable-uploads/c5c426d4-54a4-40d9-903c-1f4270b9d926.png'
    : '/lovable-uploads/c4abadae-acd1-44ed-8069-9158271a5af6.png';

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
