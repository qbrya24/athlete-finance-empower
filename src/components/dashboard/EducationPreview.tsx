import React from 'react';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const mockModules = [
  {
    id: 1,
    title: 'Budgeting Basics',
    description: 'Learn fundamental budgeting strategies',
    duration: '45 min',
    lessons_count: 6,
    progress: 25
  },
  {
    id: 2,
    title: 'Investment Fundamentals',
    description: 'Understand investment principles',
    duration: '60 min',
    lessons_count: 8,
    progress: 0
  },
  {
    id: 3,
    title: 'Debt Management',
    description: 'Strategies for managing debt effectively',
    duration: '30 min',
    lessons_count: 5,
    progress: 80
  }
];

const EducationPreview = () => {
  return (
    <FadeIn className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Continue Learning</h3>
        <button
          onClick={() => window.location.href = '/education'}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View All →
        </button>
      </div>
      
      <div className="space-y-3">
        {mockModules.map((module) => (
          <div key={module.id} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors cursor-pointer">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{module.title}</h4>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {module.duration}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {module.lessons_count} lessons
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="text-xs text-muted-foreground">{module.progress}%</div>
              <div className="w-12 h-1.5 bg-muted rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

export default EducationPreview;