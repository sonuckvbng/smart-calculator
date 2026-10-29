export type MathCategory = 'ADDITION' | 'SUBTRACTION' | 'MULTIPLICATION' | 'DIVISION';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export interface Question { sessionId: string; questionId: string; prompt: string; answer: number; category: string; }
export interface StartSessionRequest { category: MathCategory; difficulty: Difficulty; totalQuestions: number; }
export interface SessionStartResponse { sessionId: string; currentQuestion: Question; totalQuestions: number; }
export interface SubmitAnswerRequest { sessionId: string; questionId: string; answer: number; }
export interface AnswerResponse { correct: boolean; correctAnswer: number; score: number; answered: number; totalQuestions: number; nextQuestion: Question | null; finished: boolean; }
