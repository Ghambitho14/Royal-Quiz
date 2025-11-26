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
 * Validar contraseña
 */
export const isValidPassword = (password) => {
	return password && password.length >= 6;
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

