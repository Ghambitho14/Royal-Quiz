// ============================================
// CONSTANTES: Configuraciones centralizadas
// ============================================

/**
 * Colores para avatares de jugadores
 */
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

/**
 * Configuración del juego
 */
export const GAME_CONFIG = {
	TIME_PER_QUESTION: 30, // segundos
	QUESTIONS_PER_GAME: 10,
	POINTS_CORRECT: 100,
	POINTS_BONUS_SPEED: 50,
	MIN_PLAYERS: 1,
	MAX_PLAYERS: 8,
	MIN_PASSWORD_LENGTH: 6,
};

/**
 * Mensajes de error
 */
export const ERROR_MESSAGES = {
	AUTH_FAILED: 'Error en la autenticación',
	SIGNUP_FAILED: 'Error al crear la cuenta',
	SIGNIN_FAILED: 'Error al iniciar sesión',
	INVALID_EMAIL: 'Email inválido',
	WEAK_PASSWORD: 'La contraseña debe tener al menos 6 caracteres',
	NETWORK_ERROR: 'Error de conexión. Por favor, intenta de nuevo',
	UNKNOWN_ERROR: 'Ha ocurrido un error inesperado',
};

/**
 * Frases retadoras para el login
 */
export const CHALLENGE_PHRASES = [
	'Bienvenido',
	'¿Estás listo?',
	'¿Crees saber la respuesta?',
	'¿Te atreves?',
	'¿Aceptas el desafío?',
	'Demuestra lo que sabes',
];

/**
 * Tiempos de animación
 */
export const ANIMATION_TIMINGS = {
	PHRASE_ROTATION: 3000,
	CARD_FLIP: 600,
	ERROR_DISMISS: 5000,
};

