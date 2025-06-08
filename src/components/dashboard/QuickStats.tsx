
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
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
        <div className="bg-green p-2.5 rounded-lg shadow-sm border border-cream/10 text-cream">
          <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Emergency Fund</div>
          <div className="flex items-baseline">
            <span className="text-base md:text-lg font-semibold mr-2">
              ${financialData?.emergency_fund_current?.toLocaleString() || '0'}
            </span>
            <span className="text-xs text-cream/70">
              / ${financialData?.emergency_fund_goal?.toLocaleString() || '5,000'} goal
            </span>
          </div>
          <div className="w-full h-1.5 bg-cream/20 rounded-full mt-1.5">
            <div 
              className="h-full bg-gold rounded-full" 
              style={{ 
                width: `${
                  financialData 
                    ? (financialData.emergency_fund_current / financialData.emergency_fund_goal) * 100 
                    : 0
                }%` 
              }} 
            />
          </div>
        </div>
        
        <div className="bg-green p-2.5 rounded-lg shadow-sm border border-cream/10 text-cream">
          <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Investments</div>
          <div className="flex items-baseline">
            <span className="text-base md:text-lg font-semibold mr-2">
              ${financialData?.investments_total?.toLocaleString() || '0'}
            </span>
            <span className={`text-xs ${(financialData?.investments_change || 0) >= 0 ? 'text-gold' : 'text-red-300'}`}>
              {(financialData?.investments_change || 0) >= 0 ? '+' : ''}
              {financialData?.investments_change?.toLocaleString() || '0'}%
            </span>
          </div>
          <div className="flex items-center mt-1">
            <PiggyBank className="w-3 h-3 text-cream mr-1" />
            <span className="text-xs text-cream/70">Diversified Portfolio</span>
          </div>
        </div>
        
        <div className="bg-green p-2.5 rounded-lg shadow-sm border border-cream/10 text-cream">
          <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Cash Available</div>
          <div className="flex items-baseline">
            <span className="text-base md:text-lg font-semibold">
              ${financialData?.cash_on_hand?.toLocaleString() || '0'}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs text-cream/70">Last updated today</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default QuickStats;
