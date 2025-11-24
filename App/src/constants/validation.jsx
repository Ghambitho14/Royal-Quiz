// Validation constants and error messages
export const VALIDATION_MESSAGES = {
	// Empty field errors
	NAME_REQUIRED: 'Ingresa tu nombre',
	EMAIL_REQUIRED: 'Ingresa tu email',
	PASSWORD_REQUIRED: 'Ingresa tu contraseña',
	
	// Format errors
	EMAIL_INVALID: 'El email no es válido. Verifica el formato.',
	PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres.',
	NAME_TOO_SHORT: 'Nombre muy corto',
	
	// Auth errors
	INVALID_CREDENTIALS: 'Credenciales incorrectas. Verifica tu email y contraseña.',
	SIGNUP_AUTO_LOGIN_ERROR: 'Error al iniciar sesión después del registro',
	UNEXPECTED_ERROR: 'Error inesperado. Intenta de nuevo.',
};

export const VALIDATION_RULES = {
	PASSWORD_MIN_LENGTH: 6,
	NAME_MIN_LENGTH: 2,
	EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

