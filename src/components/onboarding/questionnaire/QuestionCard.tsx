
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Question, KnowledgeQuestion } from '../types';

interface QuestionCardProps {
  question: Question | KnowledgeQuestion;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentIndex, totalQuestions }) => {
  return (
    <FadeIn key={question.id}>
      <div className="text-sm text-green/70 mb-2">
        Question {currentIndex + 1} of {totalQuestions}
      </div>
      
      <h3 className="text-xl md:text-2xl font-medium mb-8">
        {question.text}
      </h3>
    </FadeIn>
  );
};

export default QuestionCard;
