
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

type Question = {
  id: number;
  text: string;
};

type AnswerOption = {
  value: number;
  label: string;
};

const questions: Question[] = [
  {
    id: 1,
    text: "When I receive money unexpectedly (like a bonus or gift), my first instinct is to save it rather than spend it on something enjoyable."
  },
  {
    id: 2,
    text: "I often feel anxious or overwhelmed when I need to make financial decisions, even simple ones like paying bills."
  },
  {
    id: 3,
    text: "I believe that having significant wealth might corrupt me or make me a worse person."
  },
  {
    id: 4,
    text: "I frequently make impulse purchases without considering my budget or financial obligations."
  },
  {
    id: 5,
    text: "I take pride in accumulating wealth and believe that having substantial savings gives me security and control."
  },
  {
    id: 6,
    text: "I find myself postponing or avoiding dealing with financial paperwork and bills until they become urgent."
  },
  {
    id: 7,
    text: "When others ask me to contribute to shared expenses, I often feel resentful, even if the request is reasonable."
  },
  {
    id: 8,
    text: "I sometimes feel guilty about having more money than others and may downplay my financial success."
  },
  {
    id: 9,
    text: "I prefer keeping my money in savings rather than spending it on experiences or items that might bring joy to myself or others."
  },
  {
    id: 10,
    text: "I tend to prioritize immediate wants over long-term financial responsibilities."
  },
  {
    id: 11,
    text: "I often procrastinate on financial tasks because they make me feel inadequate or confused."
  },
  {
    id: 12,
    text: "I believe money should be continuously invested or saved rather than spent on non-essential items."
  },
  {
    id: 13,
    text: "I feel uncomfortable accepting financial help or support from others, even when it's appropriate or necessary."
  },
  {
    id: 14,
    text: "I frequently avoid checking my bank account or financial statements because they cause me anxiety."
  },
  {
    id: 15,
    text: "I find it difficult to spend money on myself, even for basic necessities or well-deserved treats."
  }
];

const answerOptions: AnswerOption[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" }
];

const QuestionnaireForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Slight delay before moving to next question for a smooth transition
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save answers to localStorage for now
      localStorage.setItem('questionnaire', JSON.stringify(answers));
      
      // Navigate to dashboard
      navigate('/dashboard');
    }, 1500);
  };
  
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  const hasAnsweredAll = Object.keys(answers).length === totalQuestions;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
        <div 
          className="h-full bg-green rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-sm text-green/70 mb-2">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      
      {/* Question */}
      <FadeIn key={currentQuestion.id} className="mb-8">
        <h3 className="text-xl md:text-2xl font-medium mb-8">
          {currentQuestion.text}
        </h3>
        
        {/* Answer options */}
        <div className="space-y-3">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`
                w-full p-4 flex items-center rounded-lg border text-left
                transition-all duration-200 hover:bg-green-50
                ${answers[currentQuestion.id] === option.value 
                  ? 'bg-green-50 border-green text-green' 
                  : 'bg-white border-gray-200 text-gray-700'}
              `}
            >
              <div className={`
                w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                ${answers[currentQuestion.id] === option.value 
                  ? 'border-green' 
                  : 'border-gray-300'}
              `}>
                {answers[currentQuestion.id] === option.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green" />
                )}
              </div>
              {option.label}
            </button>
          ))}
        </div>
      </FadeIn>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={handlePrevious}
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
            onClick={handleSubmit}
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
            onClick={handleNext}
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
    </div>
  );
};

export default QuestionnaireForm;
