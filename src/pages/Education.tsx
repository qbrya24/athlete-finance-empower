
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { toast } from '@/components/ui/use-toast';
import ModuleDetails from '@/components/education/ModuleDetails';
import ProgressSummaryCard from '@/components/education/ProgressSummaryCard';
import ModulesGrid from '@/components/education/ModulesGrid';

type Module = {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons_count: number;
  order_index: number;
  learning_objectives: string[];
  has_videos?: boolean;
  has_quizzes?: boolean;
};

type UserProgress = Record<number, number>;

// Fallback data in case database is not accessible
const fallbackModules: Module[] = [
  {
    id: 1,
    title: 'Budgeting Basics',
    description: 'Learn the fundamentals of personal budgeting and money management to take control of your finances.',
    duration: '2-3 hours',
    lessons_count: 4,
    order_index: 1,
    learning_objectives: [
      'Create and maintain a personal budget',
      'Track income and expenses effectively',
      'Identify areas for cost reduction',
      'Build healthy spending habits'
    ]
  },
  {
    id: 2,
    title: 'Investment Fundamentals',
    description: 'Discover the basics of investing and how to build wealth through smart investment strategies.',
    duration: '3-4 hours',
    lessons_count: 5,
    order_index: 2,
    learning_objectives: [
      'Understand different types of investments',
      'Learn about risk and return relationships',
      'Create a diversified investment portfolio',
      'Make informed investment decisions'
    ]
  },
  {
    id: 3,
    title: 'Debt Management',
    description: 'Master strategies for managing and eliminating debt to achieve financial freedom.',
    duration: '2-3 hours',
    lessons_count: 4,
    order_index: 3,
    learning_objectives: [
      'Understand different types of debt',
      'Learn debt payoff strategies',
      'Improve credit score and creditworthiness',
      'Avoid common debt traps'
    ]
  },
  {
    id: 4,
    title: 'Retirement Planning',
    description: 'Plan for a secure financial future with comprehensive retirement planning strategies.',
    duration: '3-4 hours',
    lessons_count: 5,
    order_index: 4,
    learning_objectives: [
      'Calculate retirement savings needs',
      'Understand retirement account options',
      'Maximize employer benefits and matches',
      'Create a retirement investment strategy'
    ]
  },
  {
    id: 5,
    title: 'Tax Optimization',
    description: 'Learn how to minimize your tax burden through legal tax planning strategies.',
    duration: '2-3 hours',
    lessons_count: 4,
    order_index: 5,
    learning_objectives: [
      'Understand basic tax concepts',
      'Learn about tax deductions and credits',
      'Plan tax-efficient investment strategies',
      'Organize records for tax preparation'
    ]
  },
  {
    id: 6,
    title: 'Emergency Planning',
    description: 'Build financial resilience with proper emergency planning and risk management.',
    duration: '2 hours',
    lessons_count: 3,
    order_index: 6,
    learning_objectives: [
      'Build an emergency fund',
      'Understand insurance needs',
      'Create a financial contingency plan',
      'Protect against financial risks'
    ]
  }
];

const Education = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  const fetchModulesAndProgress = async () => {
    try {
      console.log('Fetching education modules...');
      
      // First, check if Supabase is connected
      const { data: testData, error: testError } = await supabase
        .from('education_modules')
        .select('count')
        .limit(1);

      if (testError) {
        console.warn('Database connection issue, using fallback data:', testError);
        setModules(fallbackModules);
        setUsingFallbackData(true);
        setLoading(false);
        return;
      }

      // Fetch education modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('education_modules')
        .select('*')
        .order('order_index');

      if (modulesError) {
        console.warn('Error fetching modules, using fallback data:', modulesError);
        setModules(fallbackModules);
        setUsingFallbackData(true);
        setLoading(false);
        return;
      }
      
      console.log('Modules data:', modulesData);
      
      if (!modulesData || modulesData.length === 0) {
        console.log('No modules found in database, using fallback data');
        setModules(fallbackModules);
        setUsingFallbackData(true);
        setLoading(false);
        return;
      }
      
      // Process modules to add additional metadata
      const processedModules = modulesData.map(module => ({
        ...module,
        has_videos: false,
        has_quizzes: false
      }));
      
      console.log('Setting modules:', processedModules);
      setModules(processedModules);
      setUsingFallbackData(false);
      
      // Fetch user progress if logged in
      if (user) {
        console.log('Fetching user progress for user:', user.id);
        const { data: progressData, error: progressError } = await supabase
          .from('user_education_progress')
          .select('module_id, progress')
          .eq('user_id', user.id);

        if (progressError) {
          console.error('Error fetching progress:', progressError);
        } else {
          const progressMap: UserProgress = {};
          progressData?.forEach(item => {
            progressMap[item.module_id] = item.progress || 0;
          });
          console.log('User progress:', progressMap);
          setUserProgress(progressMap);
        }
      }
    } catch (error) {
      console.error('Error in fetchModulesAndProgress:', error);
      console.log('Using fallback data due to error');
      setModules(fallbackModules);
      setUsingFallbackData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulesAndProgress();
  }, [user]);

  const handleStartModule = async (moduleId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to track your progress.",
        variant: "destructive"
      });
      return;
    }

    if (usingFallbackData) {
      toast({
        title: "Demo Mode",
        description: "Connect to database to save your progress.",
      });
    }

    setSelectedModuleId(moduleId);

    try {
      if (!usingFallbackData) {
        const { error } = await supabase
          .from('user_education_progress')
          .upsert({
            user_id: user.id,
            module_id: moduleId,
            progress: userProgress[moduleId] || 0,
            started_at: new Date().toISOString()
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="page-container">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-green/70 animate-pulse">Loading education modules...</div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="page-container">
        {selectedModuleId ? (
          <ModuleDetails
            moduleId={selectedModuleId}
            progress={userProgress[selectedModuleId] || 0}
            onBack={() => setSelectedModuleId(null)}
          />
        ) : (
          <div className="max-w-5xl mx-auto w-full">
            <FadeIn className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-900 rounded-full text-xs font-medium mb-2">
                    Education
                  </span>
                  <h1 className="text-4xl font-bold text-green-900">
                    Final Whistle Wealth
                  </h1>
                  <p className="text-green-800 mt-2 text-lg">
                    Personalized financial education for athletes
                  </p>
                  {usingFallbackData && (
                    <p className="text-amber-600 mt-2 text-sm">
                      Currently running in demo mode. Connect to database to save progress.
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>

            <ProgressSummaryCard
              totalModules={modules.length}
              completedModules={Object.values(userProgress).filter(p => p === 100).length}
            />

            <ModulesGrid
              modules={modules}
              userProgress={userProgress}
              onStartModule={handleStartModule}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Education;
