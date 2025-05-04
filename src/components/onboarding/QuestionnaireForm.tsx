
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import ResultsScreen from '@/components/onboarding/ResultsScreen';
import QuestionCard from './questionnaire/QuestionCard';
import AnswerOptions from './questionnaire/AnswerOptions';
import ProgressBar from './questionnaire/ProgressBar';
import NavigationButtons from './questionnaire/NavigationButtons';
import { allQuestions, answerOptions, knowledgeQuestions } from './data/questionsData';
import { calculateFinancialLiteracyScore, calculateProfile } from './utils/scoreCalculations';

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
    
    const literacyScore = calculateFinancialLiteracyScore(knowledgeAnswers, knowledgeQuestions);
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
      
      <NavigationButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        hasAnsweredCurrent={hasAnsweredCurrent}
        isLastQuestion={isLastQuestion}
        hasAnsweredAll={hasAnsweredAll}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default QuestionnaireForm;
