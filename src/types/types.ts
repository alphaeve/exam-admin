// types.ts
export interface Question {
    _id?: string;
    branchId: string;
    testId: string;
    questionText: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }