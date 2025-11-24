/**
 * Creates a User object from Supabase auth data
 */
export function createUserFromAuthData(
	authUser,
	fallbackName
) {
	const email = authUser.email || '';
	const name = 
		authUser.user_metadata?.name || 
		fallbackName || 
		email.split('@')[0] || 
		'Usuario';

	return {
		id: authUser.id,
		email,
		name,
		provider: 'email',
	};
}

/**
 * Maps server error messages to specific field errors
 */
export function mapErrorToField(errorMsg) {
	const lowerError = errorMsg.toLowerCase();
	
	if (lowerError.includes('email') || lowerError.includes('correo')) {
		return 'email';
	}
	
	if (lowerError.includes('password') || lowerError.includes('contraseña')) {
		return 'password';
	}
	
	// Default to email for unknown errors
	return 'email';
}

