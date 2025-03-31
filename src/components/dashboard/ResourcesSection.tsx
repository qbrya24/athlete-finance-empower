
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';
import { Calculator, Receipt, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResourcesSection = () => {
  const navigate = useNavigate();
  
  const resources = [
    {
      title: 'Can You Afford This?',
      description: 'Calculate if a purchase fits in your budget',
      icon: <Calculator className="w-5 h-5" />,
      path: '/financial-tools?tab=calculator',
    },
    {
      title: 'Total Taxes (Tax Help)',
      description: 'Calculate your tax obligations and find resources',
      icon: <Receipt className="w-5 h-5" />,
      path: '/financial-tools?tab=taxes',
    },
    {
      title: 'Rewards Program',
      description: 'Earn rewards for completing financial goals',
      icon: <Award className="w-5 h-5" />,
      path: '/financial-tools?tab=rewards',
    },
  ];

  return (
    <div>
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 md:mb-6">Resources</h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <FadeIn key={resource.title} delay={100 + index * 50}>
            <button
              onClick={() => navigate(resource.path)}
              className={cn(
                "w-full bg-green p-4 md:p-5 rounded-xl shadow-md border border-green/80",
                "text-left transition-all duration-300 hover:shadow-lg button-hover text-cream"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-cream/30 text-cream flex items-center justify-center mb-3">
                {resource.icon}
              </div>
              <h3 className="text-base font-semibold mb-1">{resource.title}</h3>
              <p className="text-xs text-cream/90">{resource.description}</p>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
