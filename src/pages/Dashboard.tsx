
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import QuickStats from '@/components/dashboard/QuickStats';
import EducationPreview from '@/components/dashboard/EducationPreview';
import BudgetPieChart from '@/components/dashboard/BudgetPieChart';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
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
  
  
  return (
    <AppLayout>
      <div className="page-container">
        {/* Header with QuickStats */}
        <QuickStats financialData={financialData} isLoading={isLoading} />

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div className="space-y-6">
            <EducationPreview />
            <BudgetPieChart />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <FinancialSummary />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
