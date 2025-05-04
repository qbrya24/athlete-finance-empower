
import { KnowledgeQuestion } from '../types';

export const calculateProfile = (mindsetAnswers: Record<number, number>) => {
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

export const calculateFinancialLiteracyScore = (answers: Record<number, string>, knowledgeQuestions: KnowledgeQuestion[]) => {
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
