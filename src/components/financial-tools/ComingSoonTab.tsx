
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Book } from 'lucide-react';

interface ComingSoonTabProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  comingSoonDate?: string;
  features?: string[];
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ 
  title, 
  icon = <Book size={24} />,
  description,
  comingSoonDate,
  features
}) => {
  return (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream text-center">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {title} Tools Coming Soon
        </h2>
        {description && (
          <p className="text-cream/80 max-w-md mx-auto mb-4">
            {description}
          </p>
        )}
        
        {comingSoonDate && (
          <div className="text-gold font-medium mt-4 mb-6">
            Expected launch: {comingSoonDate}
          </div>
        )}
        
        {features && features.length > 0 && (
          <div className="mt-6 text-left max-w-md mx-auto">
            <h3 className="text-center font-medium mb-4">Planned Features:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                  <span className="text-cream/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default ComingSoonTab;
