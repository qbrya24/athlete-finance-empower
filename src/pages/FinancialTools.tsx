
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { Wallet, PiggyBank, BarChart2, Link, Calculator, Receipt, Award } from 'lucide-react';

import TabNavigation, { TabItem } from '@/components/financial-tools/TabNavigation';
import FinancialSummary from '@/components/financial-tools/FinancialSummary';
import RecentTransactions from '@/components/financial-tools/RecentTransactions';
import ToolCards from '@/components/financial-tools/ToolCards';
import AffordabilityCalculator from '@/components/financial-tools/affordability/AffordabilityCalculator';
import TaxHelp from '@/components/financial-tools/taxes/TaxHelp';
import RewardsProgram from '@/components/financial-tools/rewards/RewardsProgram';
import ComingSoonTab from '@/components/financial-tools/ComingSoonTab';

const FinancialTools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if we have a tab parameter in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const financialData = {
    overview: {
      cashOnHand: 3200,
      emergencyFund: {
        current: 5000,
        goal: 15000,
        percentage: 33,
      },
      investments: {
        total: 12500,
        change: 5.2,
      },
      netWorth: 20700,
    },
    recentTransactions: [
      {
        id: 1,
        type: 'expense',
        amount: 125.00,
        category: 'Dining',
        date: '2023-06-10',
        description: 'Restaurant dinner',
      },
      {
        id: 2,
        type: 'income',
        amount: 1500.00,
        category: 'NIL Deal',
        date: '2023-06-08',
        description: 'Social media promotion',
      },
      {
        id: 3,
        type: 'expense',
        amount: 75.50,
        category: 'Transportation',
        date: '2023-06-05',
        description: 'Uber rides',
      },
      {
        id: 4,
        type: 'expense',
        amount: 200.00,
        category: 'Entertainment',
        date: '2023-06-03',
        description: 'Concert tickets',
      },
      {
        id: 5,
        type: 'income',
        amount: 750.00,
        category: 'Stipend',
        date: '2023-06-01',
        description: 'Monthly athletic stipend',
      },
    ],
  };

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Wallet className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'calculator', label: 'Afford This?', icon: <Calculator className="w-4 h-4" /> },
    { id: 'taxes', label: 'Tax Help', icon: <Receipt className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Award className="w-4 h-4" /> },
    { id: 'accounts', label: 'Link Accounts', icon: <Link className="w-4 h-4" /> },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/financial-tools?tab=${tabId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <FinancialSummary financialData={financialData} />
            <RecentTransactions transactions={financialData.recentTransactions} />
            <ToolCards onCardClick={handleTabChange} />
          </>
        );
      case 'calculator':
        return <AffordabilityCalculator />;
      case 'taxes':
        return <TaxHelp />;
      case 'rewards':
        return <RewardsProgram />;
      case 'budget':
      case 'goals':
      case 'accounts':
        const tab = tabs.find(t => t.id === activeTab);
        return tab ? <ComingSoonTab title={tab.label} icon={tab.icon} /> : null;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-cream text-green rounded-full text-xs font-medium mb-2">
                Financial Tools
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold">Financial Dashboard</h1>
              <p className="text-cream/80 mt-2">Track, manage, and plan your finances</p>
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </AppLayout>
  );
};

export default FinancialTools;
