
import React from 'react';
import { Question, KnowledgeQuestion, AnswerOption } from '../types';

interface AnswerOptionsProps {
  question: Question | KnowledgeQuestion;
  answerOptions: AnswerOption[];
  currentAnswer?: number | string;
  onAnswer: (value: number | string) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ 
  question, 
  answerOptions, 
  currentAnswer,
  onAnswer 
}) => {
  if ('options' in question) {
    return (
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className={`
              w-full p-4 flex items-center rounded-lg border text-left
              transition-all duration-200 hover:bg-green-50
              ${currentAnswer === option.id 
                ? 'bg-green-50 border-green text-green' 
                : 'bg-white border-gray-200 text-gray-700'}
            `}
          >
            <div className={`
              w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
              ${currentAnswer === option.id 
                ? 'border-green' 
                : 'border-gray-300'}
            `}>
              {currentAnswer === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-green" />
              )}
            </div>
            {option.text}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {answerOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onAnswer(option.value)}
          className={`
            w-full p-4 flex items-center rounded-lg border text-left
            transition-all duration-200 hover:bg-green-50
            ${currentAnswer === option.value 
              ? 'bg-green-50 border-green text-green' 
              : 'bg-white border-gray-200 text-gray-700'}
          `}
        >
          <div className={`
            w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
            ${currentAnswer === option.value 
              ? 'border-green' 
              : 'border-gray-300'}
          `}>
            {currentAnswer === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-green" />
            )}
          </div>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
