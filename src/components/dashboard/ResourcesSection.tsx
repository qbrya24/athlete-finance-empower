
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';
import { Calculator, Receipt, Award } from 'lucide-react';

const ResourcesSection = () => {
  const navigate = useNavigate();
  
  const resources = [
    {
      title: 'Can You Afford This?',
      description: 'Calculate if a purchase fits in your budget',
      icon: <Calculator className="w-6 h-6" />,
      path: '/financial-tools?tab=calculator',
    },
    {
      title: 'Total Taxes (Tax Help)',
      description: 'Calculate your tax obligations and find resources',
      icon: <Receipt className="w-6 h-6" />,
      path: '/financial-tools?tab=taxes',
    },
    {
      title: 'Rewards Program',
      description: 'Earn rewards for completing financial goals',
      icon: <Award className="w-6 h-6" />,
      path: '/financial-tools?tab=rewards',
    },
  ];

  return (
    <div>
      <FadeIn>
        <h2 className="text-xl font-semibold mb-6">Resources</h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <FadeIn key={resource.title} delay={100 + index * 50}>
            <button
              onClick={() => navigate(resource.path)}
              className="w-full bg-green p-6 rounded-xl shadow-md border border-green/80 text-left transition-all duration-300 hover:shadow-lg button-hover text-cream"
            >
              <div className="w-12 h-12 rounded-full bg-cream/20 text-cream flex items-center justify-center mb-4">
                {resource.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-cream/80">{resource.description}</p>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
