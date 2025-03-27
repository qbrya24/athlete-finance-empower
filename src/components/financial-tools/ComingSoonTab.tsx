
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { LucideIcon } from 'lucide-react';

interface ComingSoonTabProps {
  title: string;
  icon: React.ReactNode;
}

const ComingSoonTab: React.FC<ComingSoonTabProps> = ({ title, icon }) => {
  return (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream text-center">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {title} Tools Coming Soon
        </h2>
        <p className="text-cream/80 max-w-md mx-auto">
          We're working on building these tools to help you manage your finances more effectively. Check back soon!
        </p>
      </div>
    </FadeIn>
  );
};

export default ComingSoonTab;
