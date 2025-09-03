
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { PiggyBank } from 'lucide-react';

interface FinancialData {
  cash_on_hand: number;
  emergency_fund_current: number;
  emergency_fund_goal: number;
  investments_total: number;
  investments_change: number;
}

interface QuickStatsProps {
  financialData: FinancialData | undefined;
  isLoading: boolean;
}

const QuickStats: React.FC<QuickStatsProps> = ({ financialData, isLoading }) => {
  return (
    <FadeIn className="mb-3">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-3">
        <div>
          <span className="inline-block px-2 py-1 bg-cream text-green rounded-full text-xs font-medium mb-1">
            Dashboard
          </span>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">Welcome to Final Whistle Wealth</h1>
        </div>
        <button
          onClick={() => window.location.href = '/financial-tools'}
          className="flex items-center text-cream hover:text-cream/80 transition-colors text-sm"
        >
          <span className="mr-1">Financial Overview</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </button>
      </div>
      
    </FadeIn>
  );
};

export default QuickStats;
