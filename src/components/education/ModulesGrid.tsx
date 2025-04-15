
import React from 'react';
import ModuleCard from './ModuleCard';
import FadeIn from '@/components/animations/FadeIn';

type Module = {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons_count: number;
  order_index: number;
  learning_objectives: string[];
};

type ModulesGridProps = {
  modules: Module[];
  userProgress: Record<number, number>;
  onStartModule: (moduleId: number) => void;
};

const ModulesGrid = ({ modules, userProgress, onStartModule }: ModulesGridProps) => {
  return (
    <div className="mb-12">
      <FadeIn delay={200}>
        <h2 className="text-2xl font-semibold mb-6 text-green-900">Learning Modules</h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            progress={userProgress[module.id] || 0}
            onStartModule={onStartModule}
          />
        ))}
      </div>
    </div>
  );
};

export default ModulesGrid;
