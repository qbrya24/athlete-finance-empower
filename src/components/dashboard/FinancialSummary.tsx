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
    <FadeIn className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground mb-1">Financial Summary</h3>
          <p className="text-sm text-muted-foreground">Your financial snapshot</p>
        </div>
        <button
          onClick={() => window.location.href = '/financial-tools'}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Net Worth */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-medium text-card-foreground">Net Worth</span>
                <p className="text-xs text-muted-foreground">Total assets minus debts</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary">
              ${mockFinancialData.netWorth.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Cash on Hand */}
        <div className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
              <PiggyBank className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <span className="text-sm font-medium text-card-foreground">Cash on Hand</span>
              <p className="text-xs text-muted-foreground">Available funds</p>
            </div>
          </div>
          <span className="text-lg font-semibold text-card-foreground">
            ${mockFinancialData.cashOnHand.toLocaleString()}
          </span>
        </div>
        
        {/* Investments */}
        <div className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-200/50 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-card-foreground">Total Investments</span>
              <p className="text-xs text-muted-foreground">Portfolio value</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-card-foreground">
              ${mockFinancialData.totalInvestments.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{mockFinancialData.investmentChange}%
            </div>
          </div>
        </div>
        
        {/* Debt */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100/50 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-card-foreground">Total Debt</span>
              <p className="text-xs text-muted-foreground">Outstanding balances</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-card-foreground">
              ${mockFinancialData.totalDebt.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
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