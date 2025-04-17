
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

const Education = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const fetchModulesAndProgress = async () => {
    try {
      // First fetch education modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('education_modules')
        .select('*')
        .order('order_index');

      if (modulesError) throw modulesError;
      
      // For each module, determine if it has videos or quizzes
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('education_lessons')
        .select('module_id, video_url, quiz(id)');
        
      if (lessonsError) throw lessonsError;
      
      // Process modules to add video and quiz indicators
      const processedModules = modulesData?.map(module => {
        const moduleId = module.id;
        const moduleLessons = lessonsData?.filter(lesson => lesson.module_id === moduleId) || [];
        
        const hasVideos = moduleLessons.some(lesson => lesson.video_url);
        const hasQuizzes = moduleLessons.some(lesson => lesson.quiz && lesson.quiz.length > 0);
        
        return {
          ...module,
          has_videos: hasVideos,
          has_quizzes: hasQuizzes
        };
      });
      
      setModules(processedModules || []);
      
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('user_education_progress')
          .select('module_id, progress')
          .eq('user_id', user.id);
  
        if (progressError) throw progressError;
        
        const progressMap: UserProgress = {};
        progressData?.forEach(item => {
          progressMap[item.module_id] = item.progress || 0;
        });
        setUserProgress(progressMap);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
      toast({
        title: "Error",
        description: "Failed to load education modules. Please try again later.",
        variant: "destructive"
      });
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

    setSelectedModuleId(moduleId);

    try {
      const { error } = await supabase
        .from('user_education_progress')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          progress: userProgress[moduleId] || 0,
          started_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="page-container">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-green/70">Loading modules...</div>
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
          />
        ) : (
          <>
            <FadeIn className="mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Education;
