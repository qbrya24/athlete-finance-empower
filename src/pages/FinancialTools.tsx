import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { Wallet, PiggyBank, BarChart2, Percent, DollarSign, ArrowDownCircle, ArrowUpCircle, Clock, Link, Calculator } from 'lucide-react';

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Wallet className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'calculator', label: 'Calculators', icon: <Calculator className="w-4 h-4" /> },
    { id: 'accounts', label: 'Link Accounts', icon: <Link className="w-4 h-4" /> },
  ];

  const toolCards = [
    {
      title: 'Budget Planner',
      description: 'Create and manage your monthly budget',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-green-50 text-green',
    },
    {
      title: 'Savings Calculator',
      description: 'Plan your savings goals with our calculator',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-gold-50 text-gold',
    },
    {
      title: 'Investment Tracker',
      description: 'Track your investment portfolio performance',
      icon: <BarChart2 className="w-6 h-6" />,
      color: 'bg-green-50 text-green',
    },
    {
      title: 'Interest Calculator',
      description: 'Calculate compound interest on your savings',
      icon: <Percent className="w-6 h-6" />,
      color: 'bg-gold-50 text-gold',
    },
    {
      title: 'NIL Income Tracker',
      description: 'Track your name, image, and likeness income',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-50 text-green',
    },
    {
      title: 'Can You Afford This?',
      description: 'Calculate if a purchase fits in your budget',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-gold-50 text-gold',
    },
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-50 text-green rounded-full text-xs font-medium mb-2">
                Financial Tools
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold">Financial Dashboard</h1>
              <p className="text-green/70 mt-2">Track, manage, and plan your finances</p>
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={100}>
          <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-full flex items-center whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-green text-white'
                    : 'bg-white border border-green/10 text-green/70 hover:bg-green-50'
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

        {/* Financial Overview */}
        {activeTab === 'overview' && (
          <>
            <FadeIn delay={200} className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5">
                <h2 className="text-xl font-semibold mb-6">Financial Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-green/60 mb-1">Cash on Hand</span>
                    <span className="text-2xl font-semibold">${financialData.overview.cashOnHand.toLocaleString()}</span>
                    <span className="text-xs text-green/60 mt-1">Available for spending</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-green/60 mb-1">Emergency Fund</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-semibold mr-2">${financialData.overview.emergencyFund.current.toLocaleString()}</span>
                      <span className="text-xs text-green/60">/ ${financialData.overview.emergencyFund.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                      <div 
                        className="h-full bg-green rounded-full" 
                        style={{ width: `${financialData.overview.emergencyFund.percentage}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-green/60 mb-1">Investments</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-semibold mr-2">${financialData.overview.investments.total.toLocaleString()}</span>
                      <span className="text-xs text-green-500">+{financialData.overview.investments.change}%</span>
                    </div>
                    <span className="text-xs text-green/60 mt-1">Diversified portfolio</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-green/60 mb-1">Net Worth</span>
                    <span className="text-2xl font-semibold">${financialData.overview.netWorth.toLocaleString()}</span>
                    <span className="text-xs text-green/60 mt-1">Total assets - liabilities</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <button className="text-sm text-green mt-2 md:mt-0 hover:text-green-600 transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {financialData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center mr-3
                          ${transaction.type === 'income' ? 'bg-green-50 text-green' : 'bg-red-50 text-red-500'}
                        `}>
                          {transaction.type === 'income' ? (
                            <ArrowDownCircle className="w-5 h-5" />
                          ) : (
                            <ArrowUpCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-green/60">{transaction.category}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`font-semibold ${transaction.type === 'income' ? 'text-green' : 'text-red-500'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-green/60 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            
            <div className="mb-8">
              <FadeIn delay={400}>
                <h2 className="text-xl font-semibold mb-6">Financial Tools</h2>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolCards.map((tool, index) => (
                  <FadeIn key={tool.title} delay={500 + index * 50}>
                    <button className="w-full bg-white p-6 rounded-xl shadow-sm border border-green/5 text-left transition-all duration-300 hover:shadow-md button-hover">
                      <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-4`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                      <p className="text-sm text-green/70">{tool.description}</p>
                    </button>
                  </FadeIn>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Other tabs would go here */}
        {activeTab !== 'overview' && (
          <FadeIn>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-green/5 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green mx-auto flex items-center justify-center mb-4">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Tools Coming Soon
              </h2>
              <p className="text-green/70 max-w-md mx-auto">
                We're working on building these tools to help you manage your finances more effectively. Check back soon!
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </AppLayout>
  );
};

export default FinancialTools;
