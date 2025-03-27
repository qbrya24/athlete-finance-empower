
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Wallet, PiggyBank, BarChart2, Link, Calculator, Receipt, Award } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs?: TabItem[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <FadeIn delay={100}>
      <div className="flex overflow-x-auto touch-scroll pb-2 mb-6 gap-2">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 rounded-full flex items-center whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-cream text-green'
                : 'bg-green/80 border border-cream/10 text-cream/80 hover:bg-green-600'
              }
              transition-all duration-200
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </FadeIn>
  );
};

export default TabNavigation;
