import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/components/layout/AppLayout';
import FadeIn from '@/components/animations/FadeIn';
import { BookOpen, Check, Clock, ArrowRight, PlayCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Education = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const modules = [
    {
      id: 1,
      title: "Financial Fundamentals for Athletes",
      description: "Learn the basics of financial planning specific to an athlete's career and lifestyle.",
      lessons: 5,
      duration: "2 hours",
      completed: true,
      progress: 100,
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Building Your Financial Team",
      description: "Understand how to select and work with financial advisors, agents, and other professionals.",
      lessons: 4,
      duration: "1.5 hours",
      completed: false,
      progress: 75,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Investment Strategies for Athletes",
      description: "Explore investment options suitable for the unique income patterns of professional athletes.",
      lessons: 6,
      duration: "3 hours",
      completed: false,
      progress: 0,
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "NIL Income Management",
      description: "Navigate the complexities of name, image, and likeness deals and their financial implications.",
      lessons: 3,
      duration: "1.5 hours",
      completed: false,
      progress: 0,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop"
    }
  ];

  const featuredLessons = [
    {
      id: 1,
      title: "Budgeting on Irregular Income",
      duration: "15 min",
      module: "Financial Fundamentals"
    },
    {
      id: 2,
      title: "Tax Strategies for Athletes",
      duration: "20 min",
      module: "Financial Fundamentals"
    },
    {
      id: 3,
      title: "Evaluating Financial Advisors",
      duration: "18 min",
      module: "Building Your Financial Team"
    }
  ];

  useEffect(() => {
    async function fetchUserProgress() {
      try {
        if (!user) return;

        const { data, error } = await supabase
          .from('user_education_progress')
          .select('module_id, progress, completed')
          .eq('user_id', user.id);

        if (error) throw error;

        const progressMap: Record<number, number> = {};
        data.forEach(item => {
          progressMap[item.module_id] = item.progress;
        });
        setUserProgress(progressMap);
      } catch (error) {
        console.error('Error fetching progress:', error);
        toast({
          title: "Error",
          description: "Failed to load your progress. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserProgress();
  }, [user]);

  const handleStartModule = async (moduleId: number) => {
    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to track your progress.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('user_education_progress')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          progress: userProgress[moduleId] || 0,
          started_at: new Date().toISOString()
        });

      if (error) throw error;

      setUserProgress(prev => ({
        ...prev,
        [moduleId]: prev[moduleId] || 0
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <AppLayout>
      <div className="page-container">
        <FadeIn className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-green-50 text-green rounded-full text-xs font-medium mb-2">
                Education
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold">Learning Modules</h1>
              <p className="text-green/70 mt-2">Personalized financial education for your athletic journey</p>
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
            
            <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
              <div 
                className="h-full bg-green rounded-full" 
                style={{ 
                  width: `${(Object.values(userProgress).filter(p => p === 100).length / modules.length) * 100}%` 
                }} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {modules.map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    userProgress[i + 1] === 100 ? 'bg-green text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {userProgress[i + 1] === 100 ? <Check className="w-5 h-5" /> : i + 1}
                  </div>
                  <div className="text-sm">
                    <div className={`font-medium ${userProgress[i + 1] > 0 ? 'text-green' : 'text-gray-600'}`}>
                      Module {i + 1}
                    </div>
                    <div className="text-green/60">
                      {userProgress[i + 1] || 0}% complete
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
            {modules.map((module, index) => (
              <FadeIn key={module.id} delay={300 + index * 100} className="h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green/5 h-full flex flex-col">
                  <div className="relative h-48">
                    <img 
                      src={module.image} 
                      alt={module.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-white font-semibold text-xl">{module.title}</h3>
                    </div>
                    {module.completed && (
                      <div className="absolute top-4 right-4 bg-green text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Completed
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-green/70 mb-4">{module.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-green/70">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {module.lessons} lessons
                      </div>
                      <div className="flex items-center text-sm text-green/70">
                        <Clock className="w-4 h-4 mr-1" />
                        {module.duration}
                      </div>
                    </div>
                    
                    {userProgress[module.id] > 0 && userProgress[module.id] < 100 && (
                      <>
                        <div className="text-sm text-green/70 mb-2">{userProgress[module.id]}% completed</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-5">
                          <div 
                            className="h-full bg-green rounded-full"
                            style={{ width: `${userProgress[module.id]}%` }}
                          />
                        </div>
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
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        {/* Featured Lessons */}
        <FadeIn delay={700}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green/5">
            <h2 className="text-xl font-semibold mb-6">Featured Lessons</h2>
            
            <div className="space-y-4">
              {featuredLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-3">
                      <PlayCircle className="w-5 h-5 text-green" />
                    </div>
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-sm text-green/60">From: {lesson.module}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green/70 mr-3">{lesson.duration}</span>
                    <button className="p-2 rounded-full hover:bg-green-50 text-green transition-colors">
                      <PlayCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </AppLayout>
  );
};

export default Education;
