/**
 * Utilidades y funciones auxiliares del backend
 */

/**
 * Formatear fecha
 */
export const formatDate = (date, locale = 'es-ES') => {
	if (!date) return 'No disponible';
	
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	
	return dateObj.toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

/**
 * Calcular días desde una fecha
 */
export const getDaysSince = (date) => {
	if (!date) return 0;
	
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	const diffTime = Math.abs(now - dateObj);
	
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Obtener iniciales de un nombre
 */
export const getInitials = (name) => {
	if (!name || name === 'Invitado') return 'I';
	
	const parts = name.split(' ');
	if (parts.length >= 2) {
		return (parts[0][0] + parts[1][0]).toUpperCase();
	}
	
	return name.substring(0, 2).toUpperCase();
};

/**
 * Validar email
 */
export const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Validar contraseña - Política de seguridad
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial (!@#$%^&*()_+-=[]{}|;:,.<>?)
 */
export const validatePassword = (password) => {
	// Si no hay contraseña, retornar error
	if (!password || password.trim() === '') {
		return {
			isValid: false,
			error: 'La contraseña es requerida',
			details: []
		};
	}

	const errors = [];
	const details = [];

	// Mínimo 8 caracteres
	if (password.length < 8) {
		errors.push('La contraseña debe tener al menos 8 caracteres');
		details.push('longitud');
	}

	// Al menos una mayúscula
	if (!/[A-Z]/.test(password)) {
		errors.push('Debe contener al menos una letra mayúscula');
		details.push('mayuscula');
	}

	// Al menos una minúscula
	if (!/[a-z]/.test(password)) {
		errors.push('Debe contener al menos una letra minúscula');
		details.push('minuscula');
	}

	// Al menos un número
	if (!/[0-9]/.test(password)) {
		errors.push('Debe contener al menos un número');
		details.push('numero');
	}

	// Al menos un carácter especial
	if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
		errors.push('Debe contener al menos un carácter especial (!@#$%^&*()_+-=[]{}|;:,.<>?)');
		details.push('especial');
	}

	// Si hay errores, retornar el primero (el más importante)
	if (errors.length > 0) {
		return {
			isValid: false,
			error: errors[0], // Mostrar solo el primer error para no abrumar al usuario
			allErrors: errors, // Guardar todos los errores por si se necesitan
			details
		};
	}

	// Si pasa todas las validaciones
	return {
		isValid: true,
		error: null,
		details: []
	};
};

/**
 * Validar contraseña (versión simple - para compatibilidad)
 * @deprecated Usar validatePassword en su lugar
 */
export const isValidPassword = (password) => {
	const validation = validatePassword(password);
	return validation.isValid;
};

/**
 * Manejar errores de forma consistente
 */
export const handleError = (error, defaultMessage = 'Ha ocurrido un error') => {
	if (error?.message) {
		return error.message;
	}
	
	if (typeof error === 'string') {
		return error;
	}
	
	return defaultMessage;
};

/**
 * Rate Limiting - Protección contra brute force
 * Configuración:
 * - MAX_ATTEMPTS: Número máximo de intentos fallidos permitidos (5)
 * - LOCKOUT_DURATION: Duración del bloqueo en milisegundos (15 minutos = 900000ms)
 */
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutos en milisegundos
const STORAGE_KEY_PREFIX = 'login_attempts_';

/**
 * Obtener datos de intentos de login para un email
 */
const getLoginAttempts = (email) => {
	if (!email) return null;
	
	const key = `${STORAGE_KEY_PREFIX}${email}`;
	const data = localStorage.getItem(key);
	
	if (!data) {
		return {
			attempts: 0,
			lockedUntil: null
		};
	}
	
	try {
		return JSON.parse(data);
	} catch {
		return {
			attempts: 0,
			lockedUntil: null
		};
	}
};

/**
 * Guardar datos de intentos de login para un email
 */
const setLoginAttempts = (email, data) => {
	if (!email) return;
	
	const key = `${STORAGE_KEY_PREFIX}${email}`;
	localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Verificar si un email está bloqueado por rate limiting
 * @param {string} email - Email del usuario
 * @returns {Object} - { isLocked: boolean, remainingTime: number (ms), attempts: number }
 */
export const checkRateLimit = (email) => {
	if (!email) {
		return {
			isLocked: false,
			remainingTime: 0,
			attempts: 0
		};
	}
	
	const data = getLoginAttempts(email);
	const now = Date.now();
	
	// Si hay un bloqueo activo
	if (data.lockedUntil && now < data.lockedUntil) {
		return {
			isLocked: true,
			remainingTime: data.lockedUntil - now,
			attempts: data.attempts
		};
	}
	
	// Si el bloqueo expiró, limpiar los datos
	if (data.lockedUntil && now >= data.lockedUntil) {
		setLoginAttempts(email, {
			attempts: 0,
			lockedUntil: null
		});
		return {
			isLocked: false,
			remainingTime: 0,
			attempts: 0
		};
	}
	
	return {
		isLocked: false,
		remainingTime: 0,
		attempts: data.attempts || 0
	};
};

/**
 * Registrar un intento de login fallido
 * @param {string} email - Email del usuario
 * @returns {Object} - { isLocked: boolean, remainingTime: number, attempts: number, message: string }
 */
export const recordFailedAttempt = (email) => {
	if (!email) {
		return {
			isLocked: false,
			remainingTime: 0,
			attempts: 0,
			message: null
		};
	}
	
	const data = getLoginAttempts(email);
	const newAttempts = (data.attempts || 0) + 1;
	const now = Date.now();
	
	// Si alcanzó el máximo de intentos, bloquear
	if (newAttempts >= MAX_ATTEMPTS) {
		const lockedUntil = now + LOCKOUT_DURATION;
		setLoginAttempts(email, {
			attempts: newAttempts,
			lockedUntil
		});
		
		const minutes = Math.ceil(LOCKOUT_DURATION / (60 * 1000));
		return {
			isLocked: true,
			remainingTime: LOCKOUT_DURATION,
			attempts: newAttempts,
			message: `Demasiados intentos fallidos. Tu cuenta está bloqueada por ${minutes} minutos.`
		};
	}
	
	// Incrementar intentos sin bloquear aún
	setLoginAttempts(email, {
		attempts: newAttempts,
		lockedUntil: null
	});
	
	const remainingAttempts = MAX_ATTEMPTS - newAttempts;
	return {
		isLocked: false,
		remainingTime: 0,
		attempts: newAttempts,
		message: remainingAttempts > 0 
			? `Credenciales incorrectas. Te quedan ${remainingAttempts} intento${remainingAttempts > 1 ? 's' : ''}.`
			: 'Credenciales incorrectas.'
	};
};

/**
 * Resetear intentos de login (cuando el login es exitoso)
 * @param {string} email - Email del usuario
 */
export const resetLoginAttempts = (email) => {
	if (!email) return;
	
	const key = `${STORAGE_KEY_PREFIX}${email}`;
	localStorage.removeItem(key);
};

/**
 * Formatear tiempo restante en un mensaje legible
 * @param {number} milliseconds - Tiempo en milisegundos
 * @returns {string} - Mensaje formateado
 */
export const formatRemainingTime = (milliseconds) => {
	if (milliseconds <= 0) return '';
	
	const minutes = Math.ceil(milliseconds / (60 * 1000));
	
	if (minutes < 1) {
		return 'menos de un minuto';
	}
	
	if (minutes === 1) {
		return '1 minuto';
	}
	
	return `${minutes} minutos`;
};

