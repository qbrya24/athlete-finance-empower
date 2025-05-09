
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import FinancialSummary from '@/components/financial-tools/FinancialSummary';
import RecentTransactions from '@/components/financial-tools/RecentTransactions';
import TabNavigation, { TabItem } from '@/components/financial-tools/TabNavigation';
import ToolCards from '@/components/financial-tools/ToolCards';
import AffordabilityCalculator from '@/components/financial-tools/affordability/AffordabilityCalculator';
import TaxHelp from '@/components/financial-tools/taxes/TaxHelp';
import RewardsProgram from '@/components/financial-tools/rewards/RewardsProgram';
import ComingSoonTab from '@/components/financial-tools/ComingSoonTab';
import { Wallet, PiggyBank, Receipt, BarChart2, Calculator, Calendar, Book, Home, ShoppingBag, Utensils, Car, Plane, HeartPulse, Smartphone, GraduationCap } from 'lucide-react';
import { SpendingCategory } from '@/components/financial-tools/SpendingCategoriesGraph';

type TransactionType = "expense" | "income";

interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface Tool {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tabId: string;
}

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample spending categories data
  const spendingCategories: SpendingCategory[] = [
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

  // Sample data for financial summary
  const financialData = {
    overview: {
      cashOnHand: 54750,
      emergencyFund: {
        current: 15000,
        goal: 25000,
        percentage: 60
      },
      investments: {
        total: 42000,
        change: 2.4
      },
      netWorth: 112500
    },
    spendingCategories: spendingCategories
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
      icon: <Calculator size={24} />,
      tabId: "affordability"
    },
    {
      id: 2,
      title: "Tax Help",
      description: "Understand your tax situation and optimize returns",
      icon: <Receipt size={24} />,
      tabId: "taxes"
    },
    {
      id: 3,
      title: "Rewards Program",
      description: "Earn rewards for smart financial decisions",
      icon: <PiggyBank size={24} />,
      tabId: "rewards"
    },
    {
      id: 4,
      title: "Budget Planner",
      description: "Create and manage your monthly budget",
      icon: <Wallet size={24} />,
      tabId: "budgetPlanner"
    },
    {
      id: 5,
      title: "Investment Tracker",
      description: "Monitor your investment portfolio",
      icon: <BarChart2 size={24} />,
      tabId: "investments"
    },
    {
      id: 6,
      title: "Retirement Calculator",
      description: "Plan for your retirement goals",
      icon: <Calendar size={24} />,
      tabId: "retirement"
    }
  ];
  
  // Tabs configuration
  const tabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: <BarChart2 size={16} /> },
    { id: "affordability", label: "Affordability", icon: <Calculator size={16} /> },
    { id: "taxes", label: "Taxes", icon: <Receipt size={16} /> },
    { id: "rewards", label: "Rewards", icon: <PiggyBank size={16} /> },
    { id: "budgetPlanner", label: "Budget", icon: <Wallet size={16} /> },
    { id: "investments", label: "Investments", icon: <BarChart2 size={16} /> },
    { id: "retirement", label: "Retirement", icon: <Calendar size={16} /> }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <AppLayout>
      <div className="page-container">
        <h1 className="text-2xl font-semibold mb-6 text-cream">Financial Tools</h1>
        
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} tabs={tabs} />
        
        <Tabs value={activeTab} className="w-full mt-4">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 space-y-6">
            <FinancialSummary financialData={financialData} />
            <RecentTransactions transactions={recentTransactions} />
            <ToolCards onCardClick={handleTabChange} cards={toolCards} />
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
              icon={<Wallet size={24} />}
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
              icon={<BarChart2 size={24} />}
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
              icon={<Calendar size={24} />}
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

// External variables referenced in the component
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

const toolCards: Tool[] = [
  {
    id: 1,
    title: "Can You Afford This?",
    description: "Calculate if a purchase fits your budget",
    icon: <Calculator size={24} />,
    tabId: "affordability"
  },
  {
    id: 2,
    title: "Tax Help",
    description: "Understand your tax situation and optimize returns",
    icon: <Receipt size={24} />,
    tabId: "taxes"
  },
  {
    id: 3,
    title: "Rewards Program",
    description: "Earn rewards for smart financial decisions",
    icon: <PiggyBank size={24} />,
    tabId: "rewards"
  },
  {
    id: 4,
    title: "Budget Planner",
    description: "Create and manage your monthly budget",
    icon: <Wallet size={24} />,
    tabId: "budgetPlanner"
  },
  {
    id: 5,
    title: "Investment Tracker",
    description: "Monitor your investment portfolio",
    icon: <BarChart2 size={24} />,
    tabId: "investments"
  },
  {
    id: 6,
    title: "Retirement Calculator",
    description: "Plan for your retirement goals",
    icon: <Calendar size={24} />,
    tabId: "retirement"
  }
];

export default FinancialTools;
