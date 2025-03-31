
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import SpendingCategoriesGraph, { SpendingCategory } from './SpendingCategoriesGraph';
import { Home, ShoppingBag, Utensils, Car, Plane, HeartPulse, Smartphone, GraduationCap } from 'lucide-react';

interface FinancialData {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  savingsGoal: number;
  investmentValue: number;
  investmentChange: number;
  creditScore: number;
  spendingCategories?: SpendingCategory[];
}

interface FinancialSummaryProps {
  data?: FinancialData;
  financialData?: {
    overview: {
      cashOnHand: number;
      emergencyFund: {
        current: number;
        goal: number;
        percentage: number;
      };
      investments: {
        total: number;
        change: number;
      };
      netWorth: number;
    };
    spendingCategories?: SpendingCategory[];
  };
}

// Default spending categories data
const defaultSpendingCategories: SpendingCategory[] = [
  {
    id: "housing",
    name: "Housing",
    icon: <Home size={20} className="text-cream" />,
    spent: 1850,
    budget: 2000,
    color: "bg-green-300/80"
  },
  {
    id: "food",
    name: "Food & Dining",
    icon: <Utensils size={20} className="text-cream" />,
    spent: 720,
    budget: 600,
    color: "bg-gold/80"
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: <ShoppingBag size={20} className="text-cream" />,
    spent: 430,
    budget: 400,
    color: "bg-blue-400/80"
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: <Car size={20} className="text-cream" />,
    spent: 340,
    budget: 350,
    color: "bg-purple-400/80"
  },
  {
    id: "health",
    name: "Healthcare",
    icon: <HeartPulse size={20} className="text-cream" />,
    spent: 190,
    budget: 250,
    color: "bg-pink-400/80"
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Smartphone size={20} className="text-cream" />,
    spent: 260,
    budget: 200,
    color: "bg-cyan-400/80"
  }
];

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ data, financialData }) => {
  // Use spending categories from props or default to the sample data
  const spendingCategories = 
    data?.spendingCategories || 
    financialData?.spendingCategories || 
    defaultSpendingCategories;

  if (financialData) {
    return (
      <FadeIn delay={200} className="mb-8">
        <div className="bg-green rounded-xl p-6 shadow-sm border border-cream/10 text-cream">
          <h2 className="text-xl font-semibold mb-6">Financial Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-sm text-cream/70 mb-1">Cash on Hand</span>
              <span className="text-2xl font-semibold">${financialData.overview.cashOnHand.toLocaleString()}</span>
              <span className="text-xs text-cream/70 mt-1">Available for spending</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-cream/70 mb-1">Emergency Fund</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold mr-2">${financialData.overview.emergencyFund.current.toLocaleString()}</span>
                <span className="text-xs text-cream/70">/ ${financialData.overview.emergencyFund.goal.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-cream/20 rounded-full mt-2">
                <div 
                  className="h-full bg-gold rounded-full" 
                  style={{ width: `${financialData.overview.emergencyFund.percentage}%` }} 
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-cream/70 mb-1">Investments</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-semibold mr-2">${financialData.overview.investments.total.toLocaleString()}</span>
                <span className="text-xs text-gold">+{financialData.overview.investments.change}%</span>
              </div>
              <span className="text-xs text-cream/70 mt-1">Diversified portfolio</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-cream/70 mb-1">Net Worth</span>
              <span className="text-2xl font-semibold">${financialData.overview.netWorth.toLocaleString()}</span>
              <span className="text-xs text-cream/70 mt-1">Total assets - liabilities</span>
            </div>
          </div>
          
          <SpendingCategoriesGraph categories={spendingCategories} />
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={200} className="mb-8">
      <div className="bg-green rounded-xl p-6 shadow-sm border border-cream/10 text-cream">
        <h2 className="text-xl font-semibold mb-6">Financial Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Balance</span>
            <span className="text-2xl font-semibold">${data?.balance.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Monthly Income</span>
            <span className="text-2xl font-semibold">${data?.income.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Monthly Expenses</span>
            <span className="text-2xl font-semibold">${data?.expenses.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Monthly Savings</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold mr-2">${data?.savings.toLocaleString()}</span>
              <span className="text-xs text-cream/70">/ ${data?.savingsGoal.toLocaleString()} goal</span>
            </div>
            <div className="w-full h-2 bg-cream/20 rounded-full mt-2">
              <div 
                className="h-full bg-gold rounded-full" 
                style={{ width: `${(data?.savings || 0) / (data?.savingsGoal || 1) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Investments</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold mr-2">${data?.investmentValue.toLocaleString()}</span>
              <span className={`text-xs ${data?.investmentChange >= 0 ? 'text-gold' : 'text-red-300'}`}>
                {data?.investmentChange >= 0 ? '+' : ''}{data?.investmentChange}%
              </span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-cream/70 mb-1">Credit Score</span>
            <span className="text-2xl font-semibold">{data?.creditScore}</span>
            <div className="w-full h-2 bg-cream/20 rounded-full mt-2">
              <div 
                className="h-full bg-gold rounded-full" 
                style={{ width: `${((data?.creditScore || 0) - 300) / 550 * 100}%` }} 
              />
            </div>
          </div>
        </div>
        
        <SpendingCategoriesGraph categories={spendingCategories} />
      </div>
    </FadeIn>
  );
};

export default FinancialSummary;
