
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import FinancialSummary from '@/components/financial-tools/FinancialSummary';
import RecentTransactions from '@/components/financial-tools/RecentTransactions';
import TabNavigation from '@/components/financial-tools/TabNavigation';
import ToolCards from '@/components/financial-tools/ToolCards';
import AffordabilityCalculator from '@/components/financial-tools/affordability/AffordabilityCalculator';
import TaxHelp from '@/components/financial-tools/taxes/TaxHelp';
import RewardsProgram from '@/components/financial-tools/rewards/RewardsProgram';
import ComingSoonTab from '@/components/financial-tools/ComingSoonTab';

type TransactionType = "expense" | "income";

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
}

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for financial summary
  const financialData = {
    balance: 54750,
    income: 12000,
    expenses: 3250,
    savings: 8750,
    savingsGoal: 15000,
    investmentValue: 42000,
    investmentChange: 2.4,
    creditScore: 780,
  };

  // Sample data for recent transactions
  const recentTransactions: Transaction[] = [
    {
      id: 1,
      type: "expense",
      amount: 320,
      category: "Housing",
      date: "2023-06-10",
      description: "Rent payment"
    },
    {
      id: 2,
      type: "expense",
      amount: 145.50,
      category: "Utilities",
      date: "2023-06-08",
      description: "Electricity bill"
    },
    {
      id: 3,
      type: "income",
      amount: 4200,
      category: "Salary",
      date: "2023-06-01",
      description: "Monthly salary"
    },
    {
      id: 4,
      type: "expense",
      amount: 65.75,
      category: "Groceries",
      date: "2023-05-28",
      description: "Weekly groceries"
    },
    {
      id: 5,
      type: "expense",
      amount: 120,
      category: "Entertainment",
      date: "2023-05-26",
      description: "Concert tickets"
    }
  ];

  // Financial tool cards data
  const toolCards = [
    {
      id: 1,
      title: "Can You Afford This?",
      description: "Calculate if a purchase fits your budget",
      icon: "calculator",
      tabId: "affordability"
    },
    {
      id: 2,
      title: "Tax Help",
      description: "Understand your tax situation and optimize returns",
      icon: "receipt",
      tabId: "taxes"
    },
    {
      id: 3,
      title: "Rewards Program",
      description: "Earn rewards for smart financial decisions",
      icon: "trophy",
      tabId: "rewards"
    },
    {
      id: 4,
      title: "Budget Planner",
      description: "Create and manage your monthly budget",
      icon: "piggyBank",
      tabId: "budgetPlanner"
    },
    {
      id: 5,
      title: "Investment Tracker",
      description: "Monitor your investment portfolio",
      icon: "lineChart",
      tabId: "investments"
    },
    {
      id: 6,
      title: "Retirement Calculator",
      description: "Plan for your retirement goals",
      icon: "calendar",
      tabId: "retirement"
    }
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="text-2xl font-semibold mb-6 text-cream">Financial Tools</h1>
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <Tabs value={activeTab} className="w-full mt-4">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 space-y-6">
            <FinancialSummary data={financialData} />
            <RecentTransactions transactions={recentTransactions} />
            <ToolCards cards={toolCards} setActiveTab={setActiveTab} />
          </TabsContent>

          {/* Affordability Calculator Tab */}
          <TabsContent value="affordability" className="mt-0">
            <AffordabilityCalculator />
          </TabsContent>

          {/* Tax Help Tab */}
          <TabsContent value="taxes" className="mt-0">
            <TaxHelp />
          </TabsContent>

          {/* Rewards Program Tab */}
          <TabsContent value="rewards" className="mt-0">
            <RewardsProgram />
          </TabsContent>

          {/* Budget Planner Tab (Coming Soon) */}
          <TabsContent value="budgetPlanner" className="mt-0">
            <ComingSoonTab 
              title="Budget Planner" 
              description="Create and track your monthly budget, set spending limits by category, and receive alerts when you're approaching your limits." 
              comingSoonDate="July 2023" 
              features={[
                "Visual breakdown of spending by category",
                "Custom budget templates based on income",
                "Bill payment reminders",
                "Expense trend analysis"
              ]}
            />
          </TabsContent>

          {/* Investments Tab (Coming Soon) */}
          <TabsContent value="investments" className="mt-0">
            <ComingSoonTab 
              title="Investment Tracker" 
              description="Monitor your investment portfolio, track performance, and receive personalized investment recommendations." 
              comingSoonDate="August 2023" 
              features={[
                "Real-time portfolio valuation",
                "Performance comparison to market indices",
                "Diversification analysis",
                "Risk assessment tools"
              ]}
            />
          </TabsContent>

          {/* Retirement Tab (Coming Soon) */}
          <TabsContent value="retirement" className="mt-0">
            <ComingSoonTab 
              title="Retirement Calculator" 
              description="Plan for your retirement by estimating your future needs, setting goals, and tracking your progress." 
              comingSoonDate="September 2023" 
              features={[
                "Retirement age estimator",
                "Social security benefit calculator",
                "Required savings projections",
                "Inflation impact analysis"
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default FinancialTools;
