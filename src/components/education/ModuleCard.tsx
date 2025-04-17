
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, ArrowRight, CheckCircle, Video, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

type ModuleCardProps = {
  module: {
    id: number;
    title: string;
    description: string;
    duration: string;
    lessons_count: number;
    learning_objectives: string[];
    order_index: number;
    has_videos?: boolean;
    has_quizzes?: boolean;
  };
  progress: number;
  onStartModule: (moduleId: number) => void;
};

const ModuleCard = ({ module, progress, onStartModule }: ModuleCardProps) => {
  return (
    <FadeIn delay={300 + module.order_index * 100}>
      <Card className="bg-white/90 backdrop-blur border-green-200 shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-3 text-green-900">{module.title}</h3>
          <p className="text-green-800 mb-6">{module.description}</p>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="flex items-center text-sm text-green-900 bg-green-100 px-3 py-1.5 rounded-full">
              <BookOpen className="w-4 h-4 mr-1 text-green-800" />
              {module.lessons_count} lessons
            </div>
            <div className="flex items-center text-sm text-green-900 bg-green-100 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 mr-1 text-green-800" />
              {module.duration}
            </div>
            {module.has_videos && (
              <div className="flex items-center text-sm text-green-900 bg-green-100 px-3 py-1.5 rounded-full">
                <Video className="w-4 h-4 mr-1 text-green-800" />
                Videos
              </div>
            )}
            {module.has_quizzes && (
              <div className="flex items-center text-sm text-green-900 bg-green-100 px-3 py-1.5 rounded-full">
                <HelpCircle className="w-4 h-4 mr-1 text-green-800" />
                Quizzes
              </div>
            )}
          </div>
          
          {progress > 0 && (
            <>
              <div className="text-sm text-green-800 mb-2">
                {progress}% completed
              </div>
              <Progress 
                value={progress} 
                className="h-2 mb-6 bg-green-200" 
              />
            </>
          )}
          
          <div className="mt-auto">
            <button
              onClick={() => onStartModule(module.id)}
              className={`
                w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300
                ${progress > 0 && progress < 100
                  ? 'bg-green-700 text-white hover:bg-green-800' 
                  : progress === 100 
                    ? 'border border-green-700 text-green-900 hover:bg-green-50'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }
              `}
            >
              {progress > 0 && progress < 100 ? (
                <>Continue Learning<ArrowRight className="w-4 h-4" /></>
              ) : progress === 100 ? (
                <>Review Module<ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Start Learning<ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-green-200">
            <h4 className="text-sm font-semibold mb-3 text-green-900">Learning Objectives:</h4>
            <ul className="space-y-2">
              {module.learning_objectives.map((objective, index) => (
                <li key={index} className="flex items-start text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-700" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
};

export default ModuleCard;
