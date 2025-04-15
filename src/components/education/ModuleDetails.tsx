
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Lesson = {
  id: number;
  title: string;
  description: string;
  duration: string;
  content: string;
  order_index: number;
};

type ModuleDetailsProps = {
  moduleId: number;
  progress: number;
};

const ModuleDetails = ({ moduleId, progress }: ModuleDetailsProps) => {
  const [module, setModule] = React.useState<any>(null);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const [moduleResponse, lessonsResponse] = await Promise.all([
          supabase
            .from('education_modules')
            .select('*')
            .eq('id', moduleId)
            .single(),
          supabase
            .from('education_lessons')
            .select('*')
            .eq('module_id', moduleId)
            .order('order_index')
        ]);

        if (moduleResponse.error) throw moduleResponse.error;
        if (lessonsResponse.error) throw lessonsResponse.error;

        setModule(moduleResponse.data);
        setLessons(lessonsResponse.data);
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
  }, [moduleId]);

  const renderLessonContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4 text-slate-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-slate-600">Loading module details...</div>
    </div>;
  }

  if (!module) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-slate-600">Module not found</div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/education')}
          className="gap-2 hover:bg-slate-50 text-slate-900 border-slate-200"
        >
          <ArrowLeft className="h-4 w-4 text-slate-800" />
          Back to Modules
        </Button>
        <div className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1.5 rounded-full">
          <Clock className="h-4 w-4 text-slate-800" />
          {module.duration}
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {module.title}
        </h1>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">{module.description}</p>
      </div>

      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold text-slate-900">Learning Objectives</h2>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-2">
            {module.learning_objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
                <span className="text-slate-700">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Course Content</h2>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <BookOpen className="h-4 w-4 text-slate-800" />
            <span className="text-sm text-slate-900">
              {lessons.length} lessons
            </span>
          </div>
        </div>

        <Progress
          value={progress}
          className="h-2 mb-8 bg-slate-200"
        />

        <Accordion type="single" collapsible className="space-y-4">
          {lessons.map((lesson) => (
            <AccordionItem 
              key={lesson.id} 
              value={`lesson-${lesson.id}`}
              className="border-slate-200 bg-white rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-start justify-between gap-4 w-full">
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-lg text-slate-900">{lesson.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-sm text-slate-900 flex items-center gap-2 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4 text-slate-800" />
                    {lesson.duration}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="prose max-w-none">
                  {renderLessonContent(lesson.content)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ModuleDetails;
