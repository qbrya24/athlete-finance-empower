import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import ResultsScreen from '@/components/onboarding/ResultsScreen';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from '@/components/ui/use-toast';
import { Question, KnowledgeQuestion, AnswerOption } from './types';
import QuestionCard from './questionnaire/QuestionCard';
import AnswerOptions from './questionnaire/AnswerOptions';
import ProgressBar from './questionnaire/ProgressBar';

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
  },
  {
    id: 106,
    text: "What is a credit score primarily based on?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Your annual income", isCorrect: false },
      { id: "b", text: "Your education level", isCorrect: false },
      { id: "c", text: "Your payment history and debts", isCorrect: true },
      { id: "d", text: "Your employment status", isCorrect: false }
    ]
  },
  {
    id: 107,
    text: "What is compound interest?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Interest calculated only on the initial principal", isCorrect: false },
      { id: "b", text: "Interest calculated on both principal and accumulated interest", isCorrect: true },
      { id: "c", text: "Interest paid only at the end of a loan term", isCorrect: false },
      { id: "d", text: "Interest charged on late payments", isCorrect: false }
    ]
  },
  {
    id: 108,
    text: "What is diversification in investing?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Putting all your money in high-risk investments", isCorrect: false },
      { id: "b", text: "Investing in only one industry to maximize returns", isCorrect: false },
      { id: "c", text: "Spreading investments across different asset classes to reduce risk", isCorrect: true },
      { id: "d", text: "Changing your investment strategy every month", isCorrect: false }
    ]
  },
  {
    id: 109,
    text: "What is a budget deficit?",
    type: 'knowledge',
    options: [
      { id: "a", text: "When your expenses exceed your income", isCorrect: true },
      { id: "b", text: "When your income exceeds your expenses", isCorrect: false },
      { id: "c", text: "When you have no savings", isCorrect: false },
      { id: "d", text: "When your investments lose value", isCorrect: false }
    ]
  },
  {
    id: 110,
    text: "What is inflation?",
    type: 'knowledge',
    options: [
      { id: "a", text: "A decrease in the general price level of goods and services", isCorrect: false },
      { id: "b", text: "An increase in the general price level of goods and services", isCorrect: true },
      { id: "c", text: "The total value of a country's goods and services", isCorrect: false },
      { id: "d", text: "A government tax on imported goods", isCorrect: false }
    ]
  },
  {
    id: 111,
    text: "What is a stock dividend?",
    type: 'knowledge',
    options: [
      { id: "a", text: "The total value of stock you own", isCorrect: false },
      { id: "b", text: "A portion of a company's profit paid to shareholders", isCorrect: true },
      { id: "c", text: "The fee paid to buy or sell stocks", isCorrect: false },
      { id: "d", text: "A loan given to shareholders", isCorrect: false }
    ]
  },
  {
    id: 112,
    text: "What is a deductible in insurance?",
    type: 'knowledge',
    options: [
      { id: "a", text: "The monthly payment for insurance coverage", isCorrect: false },
      { id: "b", text: "The maximum amount an insurance company will pay", isCorrect: false },
      { id: "c", text: "The amount you must pay before insurance coverage begins", isCorrect: true },
      { id: "d", text: "A tax benefit for having insurance", isCorrect: false }
    ]
  },
  {
    id: 113,
    text: "What does 'being underwater' on a mortgage mean?",
    type: 'knowledge',
    options: [
      { id: "a", text: "Having a low interest rate", isCorrect: false },
      { id: "b", text: "Falling behind on monthly payments", isCorrect: false },
      { id: "c", text: "Owning a home near a body of water", isCorrect: false },
      { id: "d", text: "Owing more on your mortgage than your home is worth", isCorrect: true }
    ]
  },
  {
    id: 114,
    text: "What is a bear market?",
    type: 'knowledge',
    options: [
      { id: "a", text: "A market where stock prices are rising", isCorrect: false },
      { id: "b", text: "A market where stock prices are falling", isCorrect: true },
      { id: "c", text: "A market that specializes in selling agricultural products", isCorrect: false },
      { id: "d", text: "A market that specializes in luxury goods", isCorrect: false }
    ]
  },
  {
    id: 115,
    text: "What is the difference between a traditional IRA and a Roth IRA?",
    type: 'knowledge',
    options: [
      { id: "a", text: "There is no difference; they are two names for the same thing", isCorrect: false },
      { id: "b", text: "Traditional IRA contributions are taxed, Roth IRA withdrawals are taxed", isCorrect: false },
      { id: "c", text: "Traditional IRA contributions are tax-deductible now; Roth IRA withdrawals are tax-free later", isCorrect: true },
      { id: "d", text: "Only a Roth IRA can be used for retirement savings", isCorrect: false }
    ]
  }
];

const allQuestions = [...knowledgeQuestions, ...mindsetQuestions];

const answerOptions: AnswerOption[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" }
];

const calculateProfile = (mindsetAnswers: Record<number, number>) => {
  const saverQuestions = [1, 5, 9, 12, 15];
  const saverScore = saverQuestions.reduce((sum, qId) => 
    sum + (mindsetAnswers[qId] || 0), 0) / saverQuestions.length;
  
  const spenderQuestions = [4, 7, 10];
  const spenderScore = spenderQuestions.reduce((sum, qId) => 
    sum + (mindsetAnswers[qId] || 0), 0) / spenderQuestions.length;
  
  const investorQuestions = [2, 6, 11, 14];
  const investorScore = investorQuestions.reduce((sum, qId) => 
    sum + (mindsetAnswers[qId] || 0), 0) / investorQuestions.length;
  
  const scores = [
    { type: 'Saver', score: saverScore },
    { type: 'Spender', score: spenderScore },
    { type: 'Investor', score: investorScore }
  ];
  
  scores.sort((a, b) => b.score - a.score);
  
  return {
    primaryProfile: scores[0].type,
    secondaryProfile: scores[1].type,
    profiles: scores
  };
};

const calculateFinancialLiteracyScore = (answers: Record<number, string>) => {
  let correctAnswers = 0;
  
  knowledgeQuestions.forEach(question => {
    const userAnswer = answers[question.id];
    if (userAnswer) {
      const correctOption = question.options.find(option => option.isCorrect);
      if (correctOption && userAnswer === correctOption.id) {
        correctAnswers++;
      }
    }
  });
  
  const totalQuestions = knowledgeQuestions.length;
  const percentageScore = Math.round((correctAnswers / totalQuestions) * 100);
  
  return {
    correct: correctAnswers,
    total: totalQuestions,
    percentage: percentageScore
  };
};

const QuestionnaireForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mindsetAnswers, setMindsetAnswers] = useState<Record<number, number>>({});
  const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    literacyScore: {
      correct: number;
      total: number;
      percentage: number;
    };
    profile: {
      primaryProfile: string;
      secondaryProfile: string;
      profiles: {
        type: string;
        score: number;
      }[];
    };
  } | null>(null);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const isKnowledgeQuestion = currentQuestion?.type === 'knowledge';
  
  const saveResponse = async (questionId: number, response: string | number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save responses.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('questionnaire_responses')
        .insert({
          user_id: user.id,
          question_id: questionId,
          response: response.toString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving response:', error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMindsetAnswer = async (value: number) => {
    const newAnswers = { ...mindsetAnswers, [currentQuestion.id]: value };
    setMindsetAnswers(newAnswers);
    
    await saveResponse(currentQuestion.id, value);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };
  
  const handleKnowledgeAnswer = async (optionId: string) => {
    const newAnswers = { ...knowledgeAnswers, [currentQuestion.id]: optionId };
    setKnowledgeAnswers(newAnswers);
    
    await saveResponse(currentQuestion.id, optionId);
    
    if (currentQuestionIndex < totalQuestions - 1) {
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
    
    const literacyScore = calculateFinancialLiteracyScore(knowledgeAnswers);
    const profile = calculateProfile(mindsetAnswers);
    
    setResults({
      literacyScore,
      profile
    });
    
    localStorage.setItem('mindsetQuestionnaire', JSON.stringify(mindsetAnswers));
    localStorage.setItem('knowledgeQuestionnaire', JSON.stringify(knowledgeAnswers));
    localStorage.setItem('financialLiteracyScore', JSON.stringify(literacyScore));
    localStorage.setItem('financialProfile', JSON.stringify(profile));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResults(true);
    }, 1000);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };
  
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = isKnowledgeQuestion 
    ? knowledgeAnswers[currentQuestion.id] !== undefined 
    : mindsetAnswers[currentQuestion.id] !== undefined;
  
  const hasAnsweredAll = Object.keys(mindsetAnswers).length + Object.keys(knowledgeAnswers).length === totalQuestions;
  
  if (showResults && results) {
    return <ResultsScreen results={results} onFinish={handleFinish} />;
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar progress={progress} />
      
      <QuestionCard
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
      
      <AnswerOptions
        question={currentQuestion}
        answerOptions={answerOptions}
        currentAnswer={isKnowledgeQuestion ? knowledgeAnswers[currentQuestion.id] : mindsetAnswers[currentQuestion.id]}
        onAnswer={(value) => {
          if (isKnowledgeQuestion) {
            handleKnowledgeAnswer(value as string);
          } else {
            handleMindsetAnswer(value as number);
          }
        }}
      />
      
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
