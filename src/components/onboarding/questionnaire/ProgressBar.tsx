
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full mb-8">
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressBar;
