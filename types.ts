export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN_ENDED = 'OPEN_ENDED',
  CODE_FIX = 'CODE_FIX'
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  context?: string; // Additional context or code snippet
  options?: Option[]; // For multiple choice
  correctAnswerCriteria?: string; // For AI grading guidance
  validationRegex?: string; // For exact answer matching (Google Forms style)
  validationError?: string; // Error message if validation fails
}

export interface ContentBlock {
  type: 'text' | 'code' | 'image' | 'tip';
  content: string;
  title?: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface LearningModule {
  id: string;
  title: string;
  summary: string;
  icon: string; // Icon name to map in UI
  content: ContentBlock[];
  references: Reference[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  questions: Question[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
}

export interface MissionState {
  missionId: string;
  completed: boolean;
  score: number;
  answers: Record<string, string>; // questionId -> userAnswer
  aiFeedback: Record<string, string>; // questionId -> feedback
  failed?: boolean; // New state to track Game Over
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
