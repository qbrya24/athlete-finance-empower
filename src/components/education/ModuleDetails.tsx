
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowLeft, CheckCircle, Clock, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LessonQuiz from './LessonQuiz';
import FadeIn from '@/components/animations/FadeIn';

type Quiz = {
  id: number;
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
};

type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  content: string;
  order_index: number;
  video_url?: string | null;
  quizzes?: Quiz[];
};

type LessonProgress = {
  lesson_id: number;
  completed: boolean;
};

type ModuleDetailsProps = {
  moduleId: number;
  progress: number;
  onBack?: () => void;
};

const ModuleDetails = ({ moduleId, progress, onBack }: ModuleDetailsProps) => {
  const [module, setModule] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        // Fetch module details
        const { data: moduleData, error: moduleError } = await supabase
          .from('education_modules')
          .select('*')
          .eq('id', moduleId)
          .single();

        if (moduleError) throw moduleError;
        if (!moduleData) throw new Error("Module not found");
        
        setModule(moduleData);
        
        // Fetch lessons for this module
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('education_lessons')
          .select('*')
          .eq('module_id', moduleId)
          .order('order_index');
          
        if (lessonsError) throw lessonsError;
        if (!lessonsData) throw new Error("No lessons found");
        
        // Create a map to store quizzes for each lesson
        const lessonQuizzes: Record<number, Quiz[]> = {};
        
        // Fetch quizzes for these lessons
        const lessonIds = lessonsData.map(lesson => lesson.id);
        if (lessonIds.length > 0) {
          const { data: quizzesData, error: quizzesError } = await supabase
            .from('education_quizzes')
            .select('*')
            .in('lesson_id', lessonIds);
            
          if (quizzesError) throw quizzesError;
          
          // Group quizzes by lesson_id
          if (quizzesData) {
            quizzesData.forEach(quiz => {
              // Convert JSONB options to string array if needed
              const options = Array.isArray(quiz.options) 
                ? quiz.options.map(opt => String(opt)) 
                : [];
              
              const parsedQuiz: Quiz = {
                id: quiz.id,
                question: quiz.question,
                options: options,
                correct_option: quiz.correct_option,
                explanation: quiz.explanation || ""
              };
              
              if (!lessonQuizzes[quiz.lesson_id]) {
                lessonQuizzes[quiz.lesson_id] = [];
              }
              lessonQuizzes[quiz.lesson_id].push(parsedQuiz);
            });
          }
        }
        
        // Combine lessons with their quizzes
        const enhancedLessons = lessonsData.map(lesson => ({
          ...lesson,
          quizzes: lessonQuizzes[lesson.id] || []
        }));
        
        setLessons(enhancedLessons);
        
        // If this is first visit, open the first lesson
        if (enhancedLessons.length > 0) {
          setActiveLesson(enhancedLessons[0].id);
        }
        
        // Fetch user progress for these lessons if user is logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_lesson_progress')
            .select('lesson_id, completed')
            .eq('user_id', user.id)
            .in('lesson_id', lessonIds);
            
          if (!progressError && progressData) {
            const completedMap: Record<number, boolean> = {};
            progressData.forEach((item: LessonProgress) => {
              completedMap[item.lesson_id] = item.completed;
            });
            setCompletedLessons(completedMap);
          }
        }
      } catch (error) {
        console.error('Error fetching module details:', error);
        toast({
          title: "Error",
          description: "Failed to load module details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [moduleId, user]);

  const handleLessonQuizComplete = async (lessonId: number, score: number) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          score: score,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
      
      // Update local state
      setCompletedLessons(prev => ({
        ...prev,
        [lessonId]: true
      }));
      
      // Calculate new module progress
      const totalLessons = lessons.length;
      const completedCount = Object.values({
        ...completedLessons, 
        [lessonId]: true
      }).filter(Boolean).length;
      const newProgress = Math.round((completedCount / totalLessons) * 100);
      
      // Update module progress
      await supabase
        .from('user_education_progress')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          progress: newProgress,
          updated_at: new Date().toISOString()
        });
        
      toast({
        title: "Lesson Completed!",
        description: "Your progress has been saved.",
      });
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const renderVideoPlayer = (videoUrl: string) => {
    // Extract video ID from YouTube URL
    const getYouTubeID = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const videoId = getYouTubeID(videoUrl);
    
    if (!videoId) {
      return (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
          Invalid YouTube URL format
        </div>
      );
    }
    
    return (
      <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow-md">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
    );
  };

  // Function to render lesson content
  const renderLessonContent = (content: string) => {
    // This is a simple implementation - could be enhanced with markdown parsing
    return <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-green-600 animate-pulse">Loading module details...</div>
    </div>;
  }

  if (!module) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-slate-600">Module not found</div>
    </div>;
  }

  return (
    <div className="content-section space-y-8 pb-12">
      <FadeIn>
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="outline"
            onClick={onBack || (() => navigate('/education'))}
            className="gap-2 hover:bg-green-50 text-green-800 border-green-100"
          >
            <ArrowLeft className="h-4 w-4 text-green-700" />
            Back to Modules
          </Button>
          <div className="flex items-center gap-2 text-sm text-green-900 bg-green-50 px-3 py-1.5 rounded-full">
            <Clock className="h-4 w-4 text-green-700" />
            {module.duration}
          </div>
        </div>

        <div className="text-center my-6">
          <h1 className="text-3xl font-bold text-green-900 mb-4">
            {module.title}
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {module.description}
          </p>
        </div>

        <Card className="bg-white border-green-100 shadow-md">
          <CardHeader className="bg-green-50 border-b border-green-100 rounded-t-xl">
            <h2 className="text-xl font-semibold text-green-900">Learning Objectives</h2>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="grid gap-4 md:grid-cols-2">
              {module.learning_objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-3 bg-green-50/50 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={200}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-green-900">Course Content</h2>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
              <BookOpen className="h-4 w-4 text-green-700" />
              <span className="text-sm text-green-900">
                {lessons.length} lessons
              </span>
            </div>
          </div>

          <Progress
            value={progress}
            className="h-2 mb-8 bg-green-100"
          />

          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={activeLesson ? `lesson-${activeLesson}` : undefined}
            onValueChange={(value) => setActiveLesson(value ? parseInt(value.replace('lesson-', '')) : null)}
          >
            {lessons.map((lesson) => (
              <AccordionItem 
                key={lesson.id} 
                value={`lesson-${lesson.id}`}
                className="border border-green-100 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-start justify-between gap-4 w-full">
                    <div className="flex-1 text-left">
                      <div className="flex items-center">
                        <h3 className="font-medium text-lg text-green-900 group-hover:text-green-700">
                          {lesson.title}
                        </h3>
                        {completedLessons[lesson.id] && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        {lesson.video_url && (
                          <div className="flex items-center text-sm text-slate-500">
                            <Video className="h-3.5 w-3.5 mr-1 text-green-600" />
                            <span>Video lesson</span>
                          </div>
                        )}
                        {lesson.quizzes && lesson.quizzes.length > 0 && (
                          <div className="flex items-center text-sm text-slate-500">
                            <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-600" />
                            <span>Quiz</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-slate-900 flex items-center gap-2 whitespace-nowrap bg-green-50 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-green-700" />
                      {lesson.duration}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="bg-green-50/30 p-6 rounded-lg mb-6">
                    {lesson.video_url && renderVideoPlayer(lesson.video_url)}
                    
                    <div className="lesson-content">
                      {renderLessonContent(lesson.content)}
                    </div>
                  </div>
                  
                  {lesson.quizzes && lesson.quizzes.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-green-100">
                      <LessonQuiz 
                        quiz={lesson.quizzes} 
                        lessonId={lesson.id} 
                        isCompleted={!!completedLessons[lesson.id]}
                        onComplete={(score) => handleLessonQuizComplete(lesson.id, score)}
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeIn>
    </div>
  );
};

export default ModuleDetails;
