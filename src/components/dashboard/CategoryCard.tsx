
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  index: number;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  path,
  index,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <FadeIn 
      delay={100 * index} 
      className="h-full"
    >
      <button
        onClick={() => navigate(path)}
        className={cn(
          "w-full h-full p-3 rounded-lg transition-all duration-300",
          "bg-white shadow-sm hover:shadow-md",
          "border border-green/5 hover:border-green/10",
          "flex flex-col items-center text-center",
          "button-hover",
          className
        )}
      >
        <div className="mb-2 p-2 rounded-full bg-green-50 text-green flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs text-green/70">{description}</p>
      </button>
    </FadeIn>
  );
};

export default CategoryCard;
