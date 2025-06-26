
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
      console.log('Fetching education modules...');
      
      // First fetch education modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('education_modules')
        .select('*')
        .order('order_index');

      if (modulesError) {
        console.error('Error fetching modules:', modulesError);
        throw modulesError;
      }
      
      console.log('Raw modules data:', modulesData);
      
      if (!modulesData || modulesData.length === 0) {
        console.log('No modules found in database');
        setModules([]);
        return;
      }
      
      // For each module, determine if it has videos or quizzes
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('education_lessons')
        .select('module_id, video_url');
        
      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
        throw lessonsError;
      }
      
      // Get lessons that have quizzes
      const { data: lessonsWithQuizzes, error: quizzesError } = await supabase
        .from('education_quizzes')
        .select('lesson_id');
        
      if (quizzesError) {
        console.error('Error fetching quizzes:', quizzesError);
        throw quizzesError;
      }
      
      // Create a set of lesson IDs that have quizzes for faster lookup
      const lessonIdsWithQuizzes = new Set(
        lessonsWithQuizzes?.map(item => item.lesson_id) || []
      );
      
      // Process modules to add video and quiz indicators
      const processedModules = modulesData.map(module => {
        const moduleId = module.id;
        const moduleLessons = lessonsData?.filter(lesson => lesson.module_id === moduleId) || [];
        
        const hasVideos = moduleLessons.some(lesson => lesson.video_url);
        
        // Check if any lessons in this module have quizzes
        const moduleWithQuizzes = lessonsData
          ?.filter(lesson => lesson.module_id === moduleId)
          .some(lesson => {
            const lessonId = (lesson as any).id; // Handle potential type issue
            return lessonIdsWithQuizzes.has(lessonId);
          });
        
        return {
          ...module,
          has_videos: hasVideos,
          has_quizzes: moduleWithQuizzes || false
        };
      });
      
      console.log('Processed modules:', processedModules);
      setModules(processedModules);
      
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('user_education_progress')
          .select('module_id, progress')
          .eq('user_id', user.id);
  
        if (progressError) {
          console.error('Error fetching progress:', progressError);
          throw progressError;
        }
        
        const progressMap: UserProgress = {};
        progressData?.forEach(item => {
          progressMap[item.module_id] = item.progress || 0;
        });
        console.log('User progress:', progressMap);
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
            <div className="text-lg text-green/70 animate-pulse">Loading modules...</div>
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
                </div>
              </div>
            </FadeIn>

            <ProgressSummaryCard
              totalModules={modules.length}
              completedModules={Object.values(userProgress).filter(p => p === 100).length}
            />

            {modules.length === 0 ? (
              <FadeIn className="text-center py-12">
                <div className="bg-white/90 backdrop-blur border-green-200 shadow-lg rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">No modules available yet</h3>
                  <p className="text-green-800">
                    Education modules are being prepared. Please check back soon!
                  </p>
                </div>
              </FadeIn>
            ) : (
              <ModulesGrid
                modules={modules}
                userProgress={userProgress}
                onStartModule={handleStartModule}
              />
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Education;
