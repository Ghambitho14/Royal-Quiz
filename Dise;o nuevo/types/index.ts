// ============================================
// TIPOS COMPARTIDOS - Quiz Royal
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  provider: 'email' | 'google' | 'guest';
  avatar?: string;
  isGuest?: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
  answers?: Answer[];
}

export interface Answer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type GameMode = 'casual' | 'ranked';

export type GameScreen = 'login' | 'lobby' | 'game' | 'results';

export interface GameState {
  currentScreen: GameScreen;
  user: User | null;
  players: Player[];
  gameMode: GameMode;
  currentQuestion: number;
  questions: Question[];
  timeRemaining: number;
}