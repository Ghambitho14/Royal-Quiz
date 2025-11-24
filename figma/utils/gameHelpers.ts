// ============================================
// UTILIDADES: Helpers del juego
// ============================================

import { Player, Question } from '../types';
import { GAME_CONFIG } from '../constants';

/**
 * Calcula el puntaje basado en si la respuesta es correcta y el tiempo restante
 */
export function calculateScore(isCorrect: boolean, timeRemaining: number): number {
  if (!isCorrect) return 0;
  
  const baseScore = GAME_CONFIG.POINTS_CORRECT;
  const timeBonus = Math.floor((timeRemaining / GAME_CONFIG.TIME_PER_QUESTION) * GAME_CONFIG.POINTS_BONUS_SPEED);
  
  return baseScore + timeBonus;
}

/**
 * Ordena jugadores por puntaje de mayor a menor
 */
export function sortPlayersByScore(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.score - a.score);
}

/**
 * Obtiene las iniciales del nombre de un jugador
 */
export function getPlayerInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Genera preguntas de ejemplo (esto se reemplazará con datos reales)
 */
export function generateSampleQuestions(count: number = GAME_CONFIG.QUESTIONS_PER_GAME): Question[] {
  const sampleQuestions: Question[] = [
    {
      id: 1,
      question: '¿Cuál es la capital de Francia?',
      options: ['Londres', 'París', 'Roma', 'Madrid'],
      correctAnswer: 'París',
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 2,
      question: '¿En qué año llegó el hombre a la Luna?',
      options: ['1967', '1969', '1971', '1973'],
      correctAnswer: '1969',
      category: 'history',
      difficulty: 'medium',
    },
    {
      id: 3,
      question: '¿Cuál es el planeta más grande del sistema solar?',
      options: ['Tierra', 'Marte', 'Júpiter', 'Saturno'],
      correctAnswer: 'Júpiter',
      category: 'science',
      difficulty: 'easy',
    },
    {
      id: 4,
      question: '¿Quién escribió "Cien años de soledad"?',
      options: ['Pablo Neruda', 'Gabriel García Márquez', 'Jorge Luis Borges', 'Octavio Paz'],
      correctAnswer: 'Gabriel García Márquez',
      category: 'general',
      difficulty: 'medium',
    },
    {
      id: 5,
      question: '¿Cuál es el océano más grande?',
      options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
      correctAnswer: 'Pacífico',
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 6,
      question: '¿Cuántos elementos tiene la tabla periódica?',
      options: ['98', '108', '118', '128'],
      correctAnswer: '118',
      category: 'science',
      difficulty: 'hard',
    },
    {
      id: 7,
      question: '¿En qué año comenzó la Segunda Guerra Mundial?',
      options: ['1937', '1939', '1941', '1943'],
      correctAnswer: '1939',
      category: 'history',
      difficulty: 'medium',
    },
    {
      id: 8,
      question: '¿Quién pintó "La noche estrellada"?',
      options: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Leonardo da Vinci'],
      correctAnswer: 'Vincent van Gogh',
      category: 'entertainment',
      difficulty: 'medium',
    },
    {
      id: 9,
      question: '¿Cuál es el metal más abundante en la corteza terrestre?',
      options: ['Hierro', 'Cobre', 'Aluminio', 'Oro'],
      correctAnswer: 'Aluminio',
      category: 'science',
      difficulty: 'hard',
    },
    {
      id: 10,
      question: '¿En qué continente se encuentra Egipto?',
      options: ['Asia', 'África', 'Europa', 'Medio Oriente'],
      correctAnswer: 'África',
      category: 'geography',
      difficulty: 'easy',
    },
  ];

  return sampleQuestions.slice(0, count);
}

/**
 * Mezcla un array de forma aleatoria (Fisher-Yates shuffle)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Valida si un email es válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea el tiempo en MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
