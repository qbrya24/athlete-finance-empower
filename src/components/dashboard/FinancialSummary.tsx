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
    <FadeIn className="bg-gradient-to-br from-gold-50 to-green-50 rounded-lg p-6 border border-gold-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-800 mb-1">Financial Summary</h3>
          <p className="text-sm text-green-600">Your financial snapshot</p>
        </div>
        <button
          onClick={() => window.location.href = '/financial-tools'}
          className="text-sm text-gold-600 hover:text-gold-700 transition-colors font-medium flex items-center gap-1 bg-white/60 px-3 py-2 rounded-lg border border-gold-200 hover:bg-white/80"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Net Worth */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-4 border border-green-400 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white">Net Worth</span>
                <p className="text-xs text-green-100">Total assets minus debts</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">
              ${mockFinancialData.netWorth.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Cash on Hand */}
        <div className="flex items-center justify-between py-4 border-b border-gold-200 bg-white/40 rounded-lg px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold-200 rounded-full flex items-center justify-center">
              <PiggyBank className="w-4 h-4 text-gold-700" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-800">Cash on Hand</span>
              <p className="text-xs text-green-600">Available funds</p>
            </div>
          </div>
          <span className="text-lg font-semibold text-green-700">
            ${mockFinancialData.cashOnHand.toLocaleString()}
          </span>
        </div>
        
        {/* Investments */}
        <div className="flex items-center justify-between py-4 border-b border-green-200 bg-white/40 rounded-lg px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-800">Total Investments</span>
              <p className="text-xs text-green-600">Portfolio value</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-700">
              ${mockFinancialData.totalInvestments.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{mockFinancialData.investmentChange}%
            </div>
          </div>
        </div>
        
        {/* Debt */}
        <div className="flex items-center justify-between py-4 bg-white/40 rounded-lg px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <span className="text-sm font-medium text-green-800">Total Debt</span>
              <p className="text-xs text-green-600">Outstanding balances</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-green-700">
              ${mockFinancialData.totalDebt.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
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