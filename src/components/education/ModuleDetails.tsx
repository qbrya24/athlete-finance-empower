
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
    return <div className="text-center py-12">Loading module details...</div>;
  }

  if (!module) {
    return <div className="text-center py-12">Module not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/education')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </Button>
        <div className="flex items-center gap-2 text-sm text-green/70">
          <Clock className="h-4 w-4" />
          {module.duration}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{module.title}</h1>
        <p className="text-green/70 mt-2">{module.description}</p>
      </div>

      <Card className="bg-cream/5">
        <CardHeader>
          <h2 className="text-lg font-semibold">Learning Objectives</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {module.learning_objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green shrink-0 mt-0.5" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Course Content</h2>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-green" />
            <span className="text-sm text-green/70">
              {lessons.length} lessons
            </span>
          </div>
        </div>

        <Progress
          value={progress}
          className="w-full h-2 bg-gray-100 rounded-full mb-6"
        />

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-green/70 mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-sm text-green/70 flex items-center gap-2 whitespace-nowrap">
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
