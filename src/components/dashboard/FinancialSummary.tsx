import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PiggyBank } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const mockFinancialData = {
  cashOnHand: 15750,
  totalInvestments: 42300,
  investmentChange: 2.4,
  totalDebt: 8950,
  debtChange: -5.2,
  netWorth: 48100
};

const FinancialSummary = () => {
  return (
    <FadeIn className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Financial Summary</h3>
        <button
          onClick={() => window.location.href = '/financial-tools'}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View Details →
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Net Worth */}
        <div className="bg-primary/10 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Net Worth</span>
            </div>
            <span className="text-lg font-bold text-primary">
              ${mockFinancialData.netWorth.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Cash on Hand */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <PiggyBank className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Cash on Hand</span>
          </div>
          <span className="text-sm font-semibold text-foreground">
            ${mockFinancialData.cashOnHand.toLocaleString()}
          </span>
        </div>
        
        {/* Investments */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">Total Investments</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">
              ${mockFinancialData.totalInvestments.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{mockFinancialData.investmentChange}%
            </div>
          </div>
        </div>
        
        {/* Debt */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-red-500" />
            <span className="text-sm text-foreground">Total Debt</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-foreground">
              ${mockFinancialData.totalDebt.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingDown className="w-3 h-3 mr-1" />
              {mockFinancialData.debtChange}%
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default FinancialSummary;