import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { Wallet, PiggyBank, BarChart2, Percent, DollarSign, ArrowDownCircle, ArrowUpCircle, Clock, Link, Calculator, Receipt, Award } from 'lucide-react';

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Wallet className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'calculator', label: 'Afford This?', icon: <Calculator className="w-4 h-4" /> },
    { id: 'taxes', label: 'Tax Help', icon: <Receipt className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Award className="w-4 h-4" /> },
    { id: 'accounts', label: 'Link Accounts', icon: <Link className="w-4 h-4" /> },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/financial-tools?tab=${tabId}`);
  };

  const toolCards = [
    {
      title: 'Budget Planner',
      description: 'Create and manage your monthly budget',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
    },
    {
      title: 'Savings Calculator',
      description: 'Plan your savings goals with our calculator',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
    },
    {
      title: 'Investment Tracker',
      description: 'Track your investment portfolio performance',
      icon: <BarChart2 className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
    },
    {
      title: 'Interest Calculator',
      description: 'Calculate compound interest on your savings',
      icon: <Percent className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
    },
    {
      title: 'NIL Income Tracker',
      description: 'Track your name, image, and likeness income',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
    },
    {
      title: 'Can You Afford This?',
      description: 'Calculate if a purchase fits in your budget',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
    },
  ];

  // Content for the "Can You Afford This?" tab
  const renderAffordabilityCalculator = () => (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Can You Afford This?</h2>
        
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Purchase Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Monthly Income</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Monthly Expenses</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-cream/60" />
              </div>
              <input 
                type="number" 
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-cream/10 border border-cream/20 text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <button className="w-full py-3 bg-gold text-cream font-medium rounded-md hover:bg-gold-400 transition-colors">
            Calculate Affordability
          </button>
          
          <div className="mt-6 p-4 border border-cream/20 rounded-lg bg-cream/10">
            <p className="text-center text-sm">Enter your financial details above to see if you can afford this purchase</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );

  // Content for the "Tax Help" tab
  const renderTaxHelp = () => (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Tax Help Center</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-cream/10 rounded-lg p-6 border border-cream/20">
            <h3 className="text-lg font-medium mb-3">Income Tax Calculator</h3>
            <p className="text-sm text-cream/80 mb-4">Estimate your tax liability based on your income sources</p>
            <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
              Calculate Now
            </button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-6 border border-cream/20">
            <h3 className="text-lg font-medium mb-3">NIL Tax Guidelines</h3>
            <p className="text-sm text-cream/80 mb-4">Learn about tax implications for your Name, Image, and Likeness income</p>
            <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
              Read Guide
            </button>
          </div>
        </div>
        
        <div className="bg-cream/10 rounded-lg p-6 border border-cream/20 mb-6">
          <h3 className="text-lg font-medium mb-3">Schedule a Tax Consultation</h3>
          <p className="text-sm text-cream/80 mb-4">Speak with a tax professional who specializes in athlete finances</p>
          <button className="px-4 py-2 bg-gold text-cream rounded-md text-sm hover:bg-gold-400 transition-colors">
            Book Appointment
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-cream/80 mb-2">Have a tax question?</p>
          <button className="px-6 py-2 border border-cream/20 rounded-full text-sm hover:bg-cream/10 transition-colors">
            Ask Our Tax Experts
          </button>
        </div>
      </div>
    </FadeIn>
  );

  // Content for the "Rewards" tab
  const renderRewards = () => (
    <FadeIn>
      <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream">
        <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Rewards Program</h2>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Points</span>
            <span className="text-xl font-bold">750</span>
          </div>
          <div className="w-full h-3 bg-cream/10 rounded-full">
            <div className="h-full bg-gold rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-cream/70 mt-2 text-right">250 points until next reward tier</p>
        </div>
        
        <h3 className="text-lg font-medium mb-4">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Complete Education Modules</h4>
              <p className="text-sm text-cream/70">100 points per module</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <PiggyBank className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Reach Savings Goals</h4>
              <p className="text-sm text-cream/70">150 points per goal achieved</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <BarChart2 className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Use Financial Tools</h4>
              <p className="text-sm text-cream/70">50 points per week of active use</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gold/30 flex items-center justify-center mr-3 mt-1">
              <Newspaper className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Read Financial News</h4>
              <p className="text-sm text-cream/70">25 points per article</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Gift Card</h4>
            <p className="text-xs text-cream/70 mb-2">1,000 points</p>
            <button className="w-full py-1 bg-gold/80 text-cream rounded text-sm">Redeem</button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Financial Consultation</h4>
            <p className="text-xs text-cream/70 mb-2">2,500 points</p>
            <button className="w-full py-1 bg-cream/30 text-cream/60 rounded text-sm" disabled>Locked</button>
          </div>
          
          <div className="bg-cream/10 rounded-lg p-4 border border-cream/20 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gold" />
            </div>
            <h4 className="font-medium mb-1">Premium Tools</h4>
            <p className="text-xs text-cream/70 mb-2">5,000 points</p>
            <button className="w-full py-1 bg-cream/30 text-cream/60 rounded text-sm" disabled>Locked</button>
          </div>
        </div>
      </div>
    </FadeIn>
  );

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
        <FadeIn delay={100}>
          <div className="flex overflow-x-auto touch-scroll pb-2 mb-6 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  px-4 py-2 rounded-full flex items-center whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-cream text-green'
                    : 'bg-green/80 border border-cream/10 text-cream/80 hover:bg-green-600'
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            <FadeIn delay={200} className="mb-8">
              <div className="bg-green rounded-xl p-6 shadow-sm border border-cream/10 text-cream">
                <h2 className="text-xl font-semibold mb-6">Financial Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              </div>
            </FadeIn>
            
            <FadeIn delay={300} className="mb-8">
              <div className="bg-green rounded-xl p-6 shadow-sm border border-cream/10 text-cream">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <button className="text-sm text-cream/80 mt-2 md:mt-0 hover:text-cream transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {financialData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-cream/10 last:border-0">
                      <div className="flex items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center mr-3
                          ${transaction.type === 'income' ? 'bg-cream/20 text-cream' : 'bg-red-500/20 text-red-400'}
                        `}>
                          {transaction.type === 'income' ? (
                            <ArrowDownCircle className="w-5 h-5" />
                          ) : (
                            <ArrowUpCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-cream/70">{transaction.category}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`font-semibold ${transaction.type === 'income' ? 'text-cream' : 'text-red-300'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-cream/70 flex items-center">
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
                    <button 
                      onClick={() => {
                        if (tool.title === 'Can You Afford This?') {
                          handleTabChange('calculator');
                        }
                      }}
                      className="w-full bg-green p-6 rounded-xl shadow-sm border border-cream/10 text-left transition-all duration-300 hover:shadow-md button-hover text-cream"
                    >
                      <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-4`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                      <p className="text-sm text-cream/80">{tool.description}</p>
                    </button>
                  </FadeIn>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Resource Tab Contents */}
        {activeTab === 'calculator' && renderAffordabilityCalculator()}
        {activeTab === 'taxes' && renderTaxHelp()}
        {activeTab === 'rewards' && renderRewards()}
        
        {/* Other tabs would go here */}
        {['budget', 'goals', 'accounts'].includes(activeTab) && (
          <FadeIn>
            <div className="bg-green rounded-xl p-8 shadow-sm border border-cream/10 text-cream text-center">
              <div className="w-16 h-16 rounded-full bg-cream/20 text-cream mx-auto flex items-center justify-center mb-4">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Tools Coming Soon
              </h2>
              <p className="text-cream/80 max-w-md mx-auto">
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
