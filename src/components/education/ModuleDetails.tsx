
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';

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

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-green/70">Loading module details...</div>
    </div>;
  }

  if (!module) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-lg text-green/70">Module not found</div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/education')}
          className="gap-2 hover:bg-green/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </Button>
        <div className="flex items-center gap-2 text-sm text-green/70 bg-green/5 px-3 py-1.5 rounded-full">
          <Clock className="h-4 w-4" />
          {module.duration}
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green to-green/70 bg-clip-text text-transparent">
          {module.title}
        </h1>
        <p className="text-green/70 mt-3 max-w-2xl mx-auto">{module.description}</p>
      </div>

      <Card className="bg-cream/5 border-green/10 shadow-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Learning Objectives</h2>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-2">
            {module.learning_objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-3 bg-green/5 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green shrink-0 mt-0.5" />
                <span className="text-green/90">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Course Content</h2>
          <div className="flex items-center gap-2 bg-green/5 px-3 py-1.5 rounded-full">
            <BookOpen className="h-4 w-4 text-green" />
            <span className="text-sm text-green/70">
              {lessons.length} lessons
            </span>
          </div>
        </div>

        <Progress
          value={progress}
          className="h-2 mb-8"
        />

        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.01] border-green/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{lesson.title}</h3>
                    <p className="text-sm text-green/70 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-sm text-green/70 flex items-center gap-2 whitespace-nowrap bg-green/5 px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    {lesson.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
