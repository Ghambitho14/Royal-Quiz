// ============================================
// CONSTANTES - Quiz Royal
// ============================================

// Colores de avatares
export const AVATAR_COLORS = [
	'bg-red-500',
	'bg-blue-500',
	'bg-green-500',
	'bg-yellow-500',
	'bg-purple-500',
	'bg-pink-500',
	'bg-indigo-500',
	'bg-teal-500',
];

// Frases retadoras del login
export const CHALLENGE_PHRASES = [
	'Bienvenido',
	'¿Estás listo?',
	'¿Crees saber la respuesta?',
	'¿Te atreves?',
	'¿Aceptas el desafío?',
	'Demuestra lo que sabes',
];

// Configuración del juego
export const GAME_CONFIG = {
	MAX_PLAYERS: 8,
	QUESTIONS_PER_GAME: 10,
	TIME_PER_QUESTION: 30, // segundos
	POINTS_CORRECT: 100,
	POINTS_BONUS_SPEED: 50, // Bonus por responder rápido
	MIN_PASSWORD_LENGTH: 6,
};

// Tiempo de animaciones
export const ANIMATION_TIMINGS = {
	PHRASE_ROTATION: 3000, // ms
	CONFETTI_DURATION: 3000,
	TRANSITION_DELAY: 500,
};

// Categorías de preguntas
export const QUESTION_CATEGORIES = [
	{ id: 'general', name: 'Cultura General', icon: '🌍' },
	{ id: 'science', name: 'Ciencia', icon: '🔬' },
	{ id: 'history', name: 'Historia', icon: '📜' },
	{ id: 'sports', name: 'Deportes', icon: '⚽' },
	{ id: 'entertainment', name: 'Entretenimiento', icon: '🎬' },
	{ id: 'geography', name: 'Geografía', icon: '🗺️' },
];

// URLs de Supabase
export const getSupabaseUrl = (projectId) => ({
	AUTH_SIGNUP: `https://${projectId}.supabase.co/functions/v1/make-server-17cbebac/auth/signup`,
	BASE_URL: `https://${projectId}.supabase.co/functions/v1/make-server-17cbebac`,
});

// Re-export validation constants
export { VALIDATION_MESSAGES, VALIDATION_RULES } from './validation';

