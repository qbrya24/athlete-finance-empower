import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, Check, Clock, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import ModuleDetails from '@/components/education/ModuleDetails';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const fetchModulesAndProgress = async () => {
    try {
      const { data: modulesData, error: modulesError } = await supabase
        .from('education_modules')
        .select('*')
        .order('order_index');

      if (modulesError) throw modulesError;
      setModules(modulesData || []);
      
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
                  <span className="inline-block px-3 py-1 bg-green/10 text-green rounded-full text-xs font-medium mb-2">
                    Education
                  </span>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-green to-green/70 bg-clip-text text-transparent">
                    Final Whistle Wealth
                  </h1>
                  <p className="text-green/70 mt-2 text-lg">
                    Personalized financial education for athletes
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100} className="mb-10">
              <Card className="bg-white/50 backdrop-blur border-green/10 shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Your Learning Progress</h2>
                  <div className="text-green/70 flex items-center gap-2 bg-green/5 px-3 py-1.5 rounded-full">
                    <BookOpen className="w-4 h-4 text-green" />
                    <span>
                      {Object.values(userProgress).filter(p => p === 100).length} of {modules.length} modules completed
                    </span>
                  </div>
                </div>
                
                <Progress 
                  value={(Object.values(userProgress).filter(p => p === 100).length / Math.max(1, modules.length)) * 100} 
                  className="h-2 mb-6" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 transition-colors ${
                        userProgress[module.id] === 100 
                          ? 'bg-green text-white' 
                          : 'bg-green/10 text-green'
                      }`}>
                        {userProgress[module.id] === 100 ? <Check className="w-5 h-5" /> : module.order_index}
                      </div>
                      <div>
                        <div className={`font-medium ${userProgress[module.id] > 0 ? 'text-green' : 'text-green/90'}`}>
                          {module.title}
                        </div>
                        <div className="text-sm text-green/70">
                          {userProgress[module.id] || 0}% complete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            <div className="mb-12">
              <FadeIn delay={200}>
                <h2 className="text-2xl font-semibold mb-6">Learning Modules</h2>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module) => (
                  <FadeIn key={module.id} delay={300 + module.order_index * 100}>
                    <Card className="bg-white/50 backdrop-blur border-green/10 shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                      <div className="p-6 flex flex-col h-full">
                        <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
                        <p className="text-green/70 mb-6">{module.description}</p>
                        
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center text-sm text-green/70 bg-green/5 px-3 py-1.5 rounded-full">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {module.lessons_count} lessons
                          </div>
                          <div className="flex items-center text-sm text-green/70 bg-green/5 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4 mr-1" />
                            {module.duration}
                          </div>
                        </div>
                        
                        {userProgress[module.id] > 0 && (
                          <>
                            <div className="text-sm text-green/70 mb-2">
                              {userProgress[module.id]}% completed
                            </div>
                            <Progress 
                              value={userProgress[module.id]} 
                              className="h-2 mb-6" 
                            />
                          </>
                        )}
                        
                        <div className="mt-auto">
                          <button
                            onClick={() => handleStartModule(module.id)}
                            className={`
                              w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300
                              ${userProgress[module.id] > 0 && userProgress[module.id] < 100
                                ? 'bg-green text-white hover:bg-green/90' 
                                : userProgress[module.id] === 100 
                                  ? 'border border-green/20 text-green hover:bg-green/5'
                                  : 'bg-green text-white hover:bg-green/90'
                              }
                            `}
                          >
                            {userProgress[module.id] > 0 && userProgress[module.id] < 100 ? (
                              <>Continue Learning<ArrowRight className="w-4 h-4" /></>
                            ) : userProgress[module.id] === 100 ? (
                              <>Review Module<ArrowRight className="w-4 h-4" /></>
                            ) : (
                              <>Start Learning<ArrowRight className="w-4 h-4" /></>
                            )}
                          </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-green/10">
                          <h4 className="text-sm font-semibold mb-3">Learning Objectives:</h4>
                          <ul className="space-y-2">
                            {module.learning_objectives.map((objective, index) => (
                              <li key={index} className="flex items-start text-sm text-green/70">
                                <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green/70" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Education;
