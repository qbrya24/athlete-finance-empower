
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import CategoryCard from '@/components/dashboard/CategoryCard';
import ResourcesSection from '@/components/dashboard/ResourcesSection';
import FadeIn from '@/components/animations/FadeIn';
import FinancialProfileWidget from '@/components/dashboard/FinancialProfileWidget';
import QuickStats from '@/components/dashboard/QuickStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { BookOpen, BarChart3, Newspaper, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
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
        {/* QuickStats component */}
        <QuickStats financialData={financialData} isLoading={isLoading} />

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
        <RecentActivity />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
