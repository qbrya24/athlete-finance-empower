
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  hasAnsweredCurrent: boolean;
  isLastQuestion: boolean;
  hasAnsweredAll: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  hasAnsweredCurrent,
  isLastQuestion,
  hasAnsweredAll,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit
}) => {
  return (
    <div className="flex justify-between mt-10">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className={`
          flex items-center px-4 py-2 rounded-lg
          ${currentQuestionIndex === 0 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-green hover:bg-green-50'}
        `}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Previous
      </button>
      
      {isLastQuestion && hasAnsweredAll ? (
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`
            flex items-center px-6 py-2 rounded-lg bg-green text-white
            ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-green-600 button-hover'}
          `}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Submitting</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              Complete
              <CheckCircle className="w-5 h-5 ml-1" />
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!hasAnsweredCurrent || currentQuestionIndex === totalQuestions - 1}
          className={`
            flex items-center px-4 py-2 rounded-lg
            ${!hasAnsweredCurrent || currentQuestionIndex === totalQuestions - 1
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-green hover:bg-green-50'}
          `}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
