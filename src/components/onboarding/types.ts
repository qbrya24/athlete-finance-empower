
export type QuestionType = 'mindset' | 'knowledge';

export type Question = {
  id: number;
  text: string;
  type: QuestionType;
};

export type AnswerOption = {
  value: number;
  label: string;
};

export type KnowledgeQuestion = {
  id: number;
  text: string;
  type: QuestionType;
  options: { id: string; text: string; isCorrect: boolean }[];
};
