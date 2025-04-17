
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Quiz = {
  id: number;
  question: string;
  options: string[];
  correct_option: number;
  explanation: string;
};

type LessonQuizProps = {
  quiz: Quiz[];
  lessonId: number;
  isCompleted: boolean;
  onComplete: (score: number) => void;
};

const LessonQuiz = ({ quiz, lessonId, isCompleted, onComplete }: LessonQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(isCompleted);
  
  const currentQuestion = quiz[currentQuestionIndex];
  
  const handleAnswerSelect = (optionIndex: number) => {
    if (showResults || quizCompleted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResults(false);
    } else {
      // Calculate score
      const correctAnswers = Object.entries(selectedAnswers).filter(
        ([questionIndex, selectedOption]) => {
          const correctOption = quiz[parseInt(questionIndex)].correct_option;
          return selectedOption === correctOption;
        }
      ).length;
      
      const score = Math.round((correctAnswers / quiz.length) * 100);
      
      // Mark as completed
      setQuizCompleted(true);
      onComplete(score);
    }
  };
  
  const handleCheckAnswer = () => {
    setShowResults(true);
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };
  
  const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
  const selectedOption = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correct_option;
  
  // Calculate results if completed
  const calculateResults = () => {
    const totalQuestions = quiz.length;
    const correctAnswers = Object.entries(selectedAnswers).filter(
      ([questionIndex, selectedOption]) => {
        const correctOption = quiz[parseInt(questionIndex)].correct_option;
        return selectedOption === correctOption;
      }
    ).length;
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    return {
      score,
      correctAnswers,
      totalQuestions
    };
  };
  
  if (quizCompleted) {
    const results = calculateResults();
    
    return (
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="mb-4">
              <div className="text-3xl font-bold text-slate-900 mb-1">{results.score}%</div>
              <p className="text-slate-600">
                You got {results.correctAnswers} out of {results.totalQuestions} questions correct
              </p>
            </div>
            
            <div className="flex justify-center space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={handleRestartQuiz}
                className="bg-white"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Quiz: Question {currentQuestionIndex + 1} of {quiz.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all",
                  selectedOption === index && !showResults && "border-green-400 bg-green-50",
                  showResults && index === currentQuestion.correct_option && "border-green-500 bg-green-50",
                  showResults && selectedOption === index && index !== currentQuestion.correct_option && "border-red-500 bg-red-50",
                  !showResults && selectedOption !== index && "border-slate-200 hover:border-slate-300 hover:bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResults && (
                    <span>
                      {index === currentQuestion.correct_option ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : selectedOption === index ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showResults && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Explanation</h4>
                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          {showResults ? (
            <Button
              onClick={handleNextQuestion}
              disabled={!isAnswerSelected}
              className="bg-green-600 hover:bg-green-700"
            >
              {currentQuestionIndex < quiz.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          ) : (
            <Button
              onClick={handleCheckAnswer}
              disabled={!isAnswerSelected}
              className="bg-green-600 hover:bg-green-700"
            >
              Check Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonQuiz;
