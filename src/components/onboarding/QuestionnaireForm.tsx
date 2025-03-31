
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

type QuestionType = 'mindset' | 'knowledge';

type Question = {
  id: number;
  text: string;
  type: QuestionType;
};

type AnswerOption = {
  value: number;
  label: string;
};

type KnowledgeQuestion = {
  id: number;
  text: string;
  type: QuestionType;
  options: { id: string; text: string; isCorrect: boolean }[];
};

const mindsetQuestions: Question[] = [
  {
    id: 1,
    text: "When I receive money unexpectedly (like a bonus or gift), my first instinct is to save it rather than spend it on something enjoyable.",
    type: 'mindset'
  },
  {
    id: 2,
    text: "I often feel anxious or overwhelmed when I need to make financial decisions, even simple ones like paying bills.",
    type: 'mindset'
  },
  {
    id: 3,
    text: "I believe that having significant wealth might corrupt me or make me a worse person.",
    type: 'mindset'
  },
  {
    id: 4,
    text: "I frequently make impulse purchases without considering my budget or financial obligations.",
    type: 'mindset'
  },
  {
    id: 5,
    text: "I take pride in accumulating wealth and believe that having substantial savings gives me security and control.",
    type: 'mindset'
  },
  {
    id: 6,
    text: "I find myself postponing or avoiding dealing with financial paperwork and bills until they become urgent.",
    type: 'mindset'
  },
  {
    id: 7,
    text: "When others ask me to contribute to shared expenses, I often feel resentful, even if the request is reasonable.",
    type: 'mindset'
  },
  {
    id: 8,
    text: "I sometimes feel guilty about having more money than others and may downplay my financial success.",
    type: 'mindset'
  },
  {
    id: 9,
    text: "I prefer keeping my money in savings rather than spending it on experiences or items that might bring joy to myself or others.",
    type: 'mindset'
  },
  {
    id: 10,
    text: "I tend to prioritize immediate wants over long-term financial responsibilities.",
    type: 'mindset'
  },
  {
    id: 11,
    text: "I often procrastinate on financial tasks because they make me feel inadequate or confused.",
    type: 'mindset'
  },
  {
    id: 12,
    text: "I believe money should be continuously invested or saved rather than spent on non-essential items.",
    type: 'mindset'
  },
  {
    id: 13,
    text: "I feel uncomfortable accepting financial help or support from others, even when it's appropriate or necessary.",
    type: 'mindset'
  },
  {
    id: 14,
    text: "I frequently avoid checking my bank account or financial statements because they cause me anxiety.",
    type: 'mindset'
  },
  {
    id: 15,
    text: "I find it difficult to spend money on myself, even for basic necessities or well-deserved treats.",
    type: 'mindset'
  }
];

const knowledgeQuestions: KnowledgeQuestion[] = [
  {
    id: 101,
    text: "What is a CPA?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Certified Public Accountant", isCorrect: true },
      { id: "b", text: "Corporate Payment Account", isCorrect: false },
      { id: "c", text: "Consumer Protection Agency", isCorrect: false },
      { id: "d", text: "Cost Per Acquisition", isCorrect: false }
    ]
  },
  {
    id: 102,
    text: "Which of the following is considered a liquid asset?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Real estate property", isCorrect: false },
      { id: "b", text: "Cash in a savings account", isCorrect: true },
      { id: "c", text: "Collectible memorabilia", isCorrect: false },
      { id: "d", text: "Five-year certificate of deposit with early withdrawal penalty", isCorrect: false }
    ]
  },
  {
    id: 103,
    text: "What is the primary purpose of a 401(k) plan?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Short-term savings for emergencies", isCorrect: false },
      { id: "b", text: "Education funding", isCorrect: false },
      { id: "c", text: "Retirement savings", isCorrect: true },
      { id: "d", text: "Tax-free health expenses", isCorrect: false }
    ]
  },
  {
    id: 104,
    text: "What does ROI stand for in investing?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Risk Of Investment", isCorrect: false },
      { id: "b", text: "Return On Investment", isCorrect: true },
      { id: "c", text: "Rate Of Inflation", isCorrect: false },
      { id: "d", text: "Regulation Of Income", isCorrect: false }
    ]
  },
  {
    id: 105,
    text: "What type of insurance would typically cover damage to your home from a flood?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Health insurance", isCorrect: false },
      { id: "b", text: "Standard homeowner's insurance", isCorrect: false },
      { id: "c", text: "Flood insurance", isCorrect: true },
      { id: "d", text: "Life insurance", isCorrect: false }
    ]
  }
];

// Combine all questions
const allQuestions = [...mindsetQuestions, ...knowledgeQuestions];

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
  const [mindsetAnswers, setMindsetAnswers] = useState<Record<number, number>>({});
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const isKnowledgeQuestion = currentQuestion.type === 'knowledge';
  
  const handleMindsetAnswer = (value: number) => {
    const newAnswers = { ...mindsetAnswers, [currentQuestion.id]: value };
    setMindsetAnswers(newAnswers);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      // Slight delay before moving to next question for a smooth transition
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };
  
  const handleKnowledgeAnswer = (optionId: string) => {
    const newAnswers = { ...knowledgeAnswers, [currentQuestion.id]: optionId };
    setKnowledgeAnswers(newAnswers);
    
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
      localStorage.setItem('mindsetQuestionnaire', JSON.stringify(mindsetAnswers));
      localStorage.setItem('knowledgeQuestionnaire', JSON.stringify(knowledgeAnswers));
      
      // Navigate to dashboard
      navigate('/dashboard');
    }, 1500);
  };
  
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = isKnowledgeQuestion 
    ? knowledgeAnswers[currentQuestion.id] !== undefined 
    : mindsetAnswers[currentQuestion.id] !== undefined;
  
  const hasAnsweredAll = Object.keys(mindsetAnswers).length + Object.keys(knowledgeAnswers).length === totalQuestions;
  
  // Render multiple choice options for knowledge questions
  const renderKnowledgeOptions = () => {
    const current = currentQuestion as KnowledgeQuestion;
    return (
      <div className="space-y-3">
        {current.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleKnowledgeAnswer(option.id)}
            className={`
              w-full p-4 flex items-center rounded-lg border text-left
              transition-all duration-200 hover:bg-green-50
              ${knowledgeAnswers[current.id] === option.id 
                ? 'bg-green-50 border-green text-green' 
                : 'bg-white border-gray-200 text-gray-700'}
            `}
          >
            <div className={`
              w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
              ${knowledgeAnswers[current.id] === option.id 
                ? 'border-green' 
                : 'border-gray-300'}
            `}>
              {knowledgeAnswers[current.id] === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-green" />
              )}
            </div>
            {option.id}. {option.text}
          </button>
        ))}
      </div>
    );
  };
  
  // Render mindset answer options (scale 1-5)
  const renderMindsetOptions = () => {
    return (
      <div className="space-y-3">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleMindsetAnswer(option.value)}
            className={`
              w-full p-4 flex items-center rounded-lg border text-left
              transition-all duration-200 hover:bg-green-50
              ${mindsetAnswers[currentQuestion.id] === option.value 
                ? 'bg-green-50 border-green text-green' 
                : 'bg-white border-gray-200 text-gray-700'}
            `}
          >
            <div className={`
              w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
              ${mindsetAnswers[currentQuestion.id] === option.value 
                ? 'border-green' 
                : 'border-gray-300'}
            `}>
              {mindsetAnswers[currentQuestion.id] === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-green" />
              )}
            </div>
            {option.label}
          </button>
        ))}
      </div>
    );
  };
  
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
        
        {/* Answer options - different for knowledge vs mindset questions */}
        {isKnowledgeQuestion ? renderKnowledgeOptions() : renderMindsetOptions()}
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
