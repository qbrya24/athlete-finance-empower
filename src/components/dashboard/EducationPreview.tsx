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
    <FadeIn className="bg-gradient-to-br from-cream-50 to-green-50 rounded-lg p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-green-800 mb-1">Continue Learning</h3>
          <p className="text-sm text-green-600">Pick up where you left off</p>
        </div>
        <button
          onClick={() => window.location.href = '/education'}
          className="text-sm text-gold-600 hover:text-gold-700 transition-colors font-medium flex items-center gap-1 bg-white/60 px-3 py-2 rounded-lg border border-gold-200 hover:bg-white/80"
        >
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockModules.map((module) => (
          <div key={module.id} className="group cursor-pointer">
            <div className="flex flex-col space-y-4 p-4 rounded-lg bg-white/70 hover:bg-white/90 transition-all duration-300 group-hover:shadow-lg border border-gold-200 group-hover:border-green-300">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-gold-200 rounded-full flex items-center justify-center group-hover:from-green-300 group-hover:to-gold-300 transition-all duration-300 shadow-sm">
                    <BookOpen className="w-6 h-6 text-green-700" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-green-800 truncate group-hover:text-green-700 transition-colors">
                    {module.title}
                  </h4>
                  <p className="text-sm text-green-600 mt-1 line-clamp-2">
                    {module.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-green-600">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {module.duration}
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {module.lessons_count} lessons
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-green-600 mb-1">{module.progress}% complete</div>
                  <div className="w-16 h-2 bg-green-100 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-gold-400 rounded-full transition-all duration-500"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
};

export default EducationPreview;