
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Wallet, PiggyBank, BarChart2, Percent, DollarSign, Calculator } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-green p-6 rounded-xl shadow-sm border border-cream/10 text-left transition-all duration-300 hover:shadow-md button-hover text-cream"
  >
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-cream/80">{description}</p>
  </button>
);

interface ToolCardsProps {
  onCardClick: (tab: string) => void;
  cards?: any[];
}

const ToolCards: React.FC<ToolCardsProps> = ({ onCardClick, cards }) => {
  const defaultToolCards = [
    {
      title: 'Budget Planner',
      description: 'Create and manage your monthly budget',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
      tab: 'budget'
    },
    {
      title: 'Savings Calculator',
      description: 'Plan your savings goals with our calculator',
      icon: <PiggyBank className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
      tab: 'goals'
    },
    {
      title: 'Investment Tracker',
      description: 'Track your investment portfolio performance',
      icon: <BarChart2 className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
      tab: 'overview'
    },
    {
      title: 'Interest Calculator',
      description: 'Calculate compound interest on your savings',
      icon: <Percent className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
      tab: 'goals'
    },
    {
      title: 'NIL Income Tracker',
      description: 'Track your name, image, and likeness income',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-cream/20 text-cream',
      tab: 'accounts'
    },
    {
      title: 'Can You Afford This?',
      description: 'Calculate if a purchase fits in your budget',
      icon: <Calculator className="w-6 h-6" />,
      color: 'bg-gold/30 text-gold',
      tab: 'calculator'
    },
  ];

  const toolCardsToRender = cards || defaultToolCards;

  return (
    <div className="mb-8">
      <FadeIn delay={400}>
        <h2 className="text-xl font-semibold mb-6">Financial Tools</h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolCardsToRender.map((tool, index) => (
          <FadeIn key={tool.title} delay={500 + index * 50}>
            <ToolCard
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              color={tool.color}
              onClick={() => onCardClick(tool.tab)}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ToolCards;
