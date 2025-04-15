
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, Check, Clock, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

type Module = {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons_count: number;
  order_index: number;
  learning_objectives: string[];
};

type UserProgress = Record<number, number>;

const Education = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [loading, setLoading] = useState(true);

  const fetchModulesAndProgress = async () => {
    try {
      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('education_modules')
        .select('*')
        .order('order_index');

      if (modulesError) throw modulesError;
      setModules(modulesData || []);
      
      // Only fetch user progress if user is logged in
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
          <div className="text-center py-12">Loading modules...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-50 text-green rounded-full text-xs font-medium mb-2">
                Education
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold">Final Whistle Wealth</h1>
              <p className="text-green/70 mt-2">Personalized financial education for athletes</p>
            </div>
          </div>
        </FadeIn>

        {/* Learning Progress */}
        <FadeIn delay={100} className="mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold">Your Learning Progress</h2>
              <div className="text-green/70 flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>
                  {Object.values(userProgress).filter(p => p === 100).length} of {modules.length} modules completed
                </span>
              </div>
            </div>
            
            <Progress 
              value={(Object.values(userProgress).filter(p => p === 100).length / Math.max(1, modules.length)) * 100} 
              className="w-full h-2 bg-gray-100 rounded-full mb-4" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {modules.map((module) => (
                <div key={module.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    userProgress[module.id] === 100 ? 'bg-green text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {userProgress[module.id] === 100 ? <Check className="w-5 h-5" /> : module.order_index}
                  </div>
                  <div className="text-sm">
                    <div className={`font-medium ${userProgress[module.id] > 0 ? 'text-green' : 'text-gray-600'}`}>
                      {module.title}
                    </div>
                    <div className="text-green/60">
                      {userProgress[module.id] || 0}% complete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Learning Modules */}
        <div className="mb-12">
          <FadeIn delay={200}>
            <h2 className="text-xl font-semibold mb-6">Learning Modules</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <FadeIn key={module.id} delay={300 + module.order_index * 100} className="h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5 h-full flex flex-col">
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
                    <p className="text-green/70 mb-4">{module.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-green/70">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {module.lessons_count} lessons
                      </div>
                      <div className="flex items-center text-sm text-green/70">
                        <Clock className="w-4 h-4 mr-1" />
                        {module.duration}
                      </div>
                    </div>
                    
                    {userProgress[module.id] > 0 && (
                      <>
                        <div className="text-sm text-green/70 mb-2">{userProgress[module.id]}% completed</div>
                        <Progress 
                          value={userProgress[module.id]} 
                          className="w-full h-2 bg-gray-100 rounded-full mb-5" 
                        />
                      </>
                    )}
                    
                    <div className="mt-auto">
                      <button
                        onClick={() => handleStartModule(module.id)}
                        className={`
                          w-full py-3 rounded-lg flex items-center justify-center
                          ${userProgress[module.id] > 0 && userProgress[module.id] < 100
                            ? 'bg-green text-white' 
                            : userProgress[module.id] === 100 
                              ? 'border border-green/20 text-green hover:bg-green-50'
                              : 'bg-green text-white'
                          }
                          transition-all duration-300 button-hover
                        `}
                      >
                        {userProgress[module.id] > 0 && userProgress[module.id] < 100 ? (
                          <>Continue Learning</>
                        ) : userProgress[module.id] === 100 ? (
                          <>Review Module</>
                        ) : (
                          <>Start Learning</>
                        )}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>

                    {/* Learning Objectives */}
                    <div className="mt-4 border-t pt-3">
                      <h4 className="text-sm font-semibold mb-2">Learning Objectives:</h4>
                      <ul className="text-xs text-green/70 space-y-1">
                        {module.learning_objectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-3 h-3 mr-2 mt-1 text-green" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Education;
