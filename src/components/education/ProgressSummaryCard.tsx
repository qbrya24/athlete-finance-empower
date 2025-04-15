
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

type ProgressSummaryCardProps = {
  totalModules: number;
  completedModules: number;
};

const ProgressSummaryCard = ({ totalModules, completedModules }: ProgressSummaryCardProps) => {
  return (
    <FadeIn delay={100} className="mb-10">
      <Card className="bg-white/90 backdrop-blur border-green-200 shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-green-900">Your Learning Progress</h2>
          <div className="text-green-900 flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
            <BookOpen className="w-4 h-4 text-green-800" />
            <span>
              {completedModules} of {totalModules} modules completed
            </span>
          </div>
        </div>
        
        <Progress 
          value={(completedModules / Math.max(1, totalModules)) * 100} 
          className="h-2 mb-6 bg-green-200" 
        />
      </Card>
    </FadeIn>
  );
};

export default ProgressSummaryCard;
