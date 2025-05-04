
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import CategoryCard from '@/components/dashboard/CategoryCard';
import ResourcesSection from '@/components/dashboard/ResourcesSection';
import FadeIn from '@/components/animations/FadeIn';
import FinancialProfileWidget from '@/components/dashboard/FinancialProfileWidget';
import { BookOpen, BarChart3, Newspaper, TrendingUp, PiggyBank, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FinancialData {
  cash_on_hand: number;
  emergency_fund_current: number;
  emergency_fund_goal: number;
  investments_total: number;
  investments_change: number;
  net_worth: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: financialData, isLoading, error } = useQuery({
    queryKey: ['userFinancialData'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_financial_data')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Unable to fetch financial data",
        variant: "destructive"
      });
    }
  }, [error, toast]);
  
  const categories = [
    {
      title: 'Educational Content',
      description: 'Learn financial concepts tailored for athletes',
      icon: <BookOpen className="w-5 h-5" />,
      path: '/education',
    },
    {
      title: 'Financial Tools',
      description: 'Track and plan your financial journey',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/financial-tools',
    },
    {
      title: 'News & Updates',
      description: 'Stay informed with athlete-specific financial news',
      icon: <Newspaper className="w-5 h-5" />,
      path: '/news',
    },
    {
      title: 'NIL Income',
      description: 'Manage your name, image, and likeness income',
      icon: <TrendingUp className="w-5 h-5" />,
      path: '/financial-tools',
    },
  ];
  
  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-cream text-green rounded-full text-xs font-medium mb-2">
                Dashboard
              </span>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">Welcome to Final Whistle Wealth</h1>
            </div>
            <button
              onClick={() => navigate('/financial-tools')}
              className="flex items-center text-cream hover:text-cream/80 transition-colors"
            >
              <span className="mr-1">Financial Overview</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 md:mb-6">
            <div className="bg-green p-3 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Emergency Fund</div>
              <div className="flex items-baseline">
                <span className="text-lg md:text-xl font-semibold mr-2">
                  ${financialData?.emergency_fund_current?.toLocaleString() || '0'}
                </span>
                <span className="text-xs text-cream/70">
                  / ${financialData?.emergency_fund_goal?.toLocaleString() || '5,000'} goal
                </span>
              </div>
              <div className="w-full h-2 bg-cream/20 rounded-full mt-2">
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
            
            <div className="bg-green p-3 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Investments</div>
              <div className="flex items-baseline">
                <span className="text-lg md:text-xl font-semibold mr-2">
                  ${financialData?.investments_total?.toLocaleString() || '0'}
                </span>
                <span className={`text-xs ${(financialData?.investments_change || 0) >= 0 ? 'text-gold' : 'text-red-300'}`}>
                  {(financialData?.investments_change || 0) >= 0 ? '+' : ''}
                  {financialData?.investments_change?.toLocaleString() || '0'}%
                </span>
              </div>
              <div className="flex items-center mt-1">
                <PiggyBank className="w-4 h-4 text-cream mr-1" />
                <span className="text-xs text-cream/70">Diversified Portfolio</span>
              </div>
            </div>
            
            <div className="bg-green p-3 rounded-xl shadow-sm border border-cream/10 text-cream">
              <div className="text-xs uppercase tracking-wider text-cream/70 mb-1">Cash Available</div>
              <div className="flex items-baseline">
                <span className="text-lg md:text-xl font-semibold">
                  ${financialData?.cash_on_hand?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-cream/70">Last updated today</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Financial Profile Widget */}
        <div className="mb-6">
          <FinancialProfileWidget />
        </div>
        
        {/* Main categories */}
        <div className="mb-6 md:mb-8">
          <FadeIn>
            <h2 className="text-lg font-semibold mb-3 md:mb-4">Get Started</h2>
          </FadeIn>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                icon={category.icon}
                path={category.path}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Resources section */}
        <div className="mb-6 md:mb-8">
          <ResourcesSection />
        </div>
        
        {/* Recent activity */}
        <FadeIn delay={300}>
          <div className="bg-green rounded-xl p-4 md:p-5 shadow-sm border border-cream/10 text-cream">
            <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-cream/10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-cream" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Completed Module 1</div>
                    <div className="text-xs text-cream/70">Financial Basics</div>
                  </div>
                </div>
                <div className="text-xs text-cream/70">2 days ago</div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-cream/10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gold/30 flex items-center justify-center mr-3">
                    <BarChart3 className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Updated Budget</div>
                    <div className="text-xs text-cream/70">Added new expense categories</div>
                  </div>
                </div>
                <div className="text-xs text-cream/70">1 week ago</div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center mr-3">
                    <Newspaper className="w-4 h-4 text-cream" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">New NIL Regulations</div>
                    <div className="text-xs text-cream/70">Important updates for athletes</div>
                  </div>
                </div>
                <div className="text-xs text-cream/70">1 week ago</div>
              </div>
            </div>
            
            <button
              className="w-full mt-3 py-2 text-center text-cream border border-cream/20 rounded-lg hover:bg-cream/10 transition-colors text-sm"
            >
              View All Activity
            </button>
          </div>
        </FadeIn>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
