import { supabase } from '../config/supabase.js';

/**
 * Servicio de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación
 */

/**
 * Iniciar sesión con email y contraseña
 */
export const loginWithPassword = async (email, password) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			user: data.user,
			session: data.session
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al iniciar sesión'
		};
	}
};

/**
 * Registrar nuevo usuario con OTP
 */
export const registerWithOTP = async (email, name) => {
	try {
		const { data, error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				data: {
					name
				},
				shouldCreateUser: true
			}
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			message: 'Código de verificación enviado'
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al registrar usuario'
		};
	}
};

/**
 * Verificar código OTP
 */
export const verifyOTP = async (email, token) => {
	try {
		const { data, error } = await supabase.auth.verifyOtp({
			token,
			type: 'email',
			email
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			user: data.user,
			session: data.session
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Código inválido'
		};
	}
};

/**
 * Iniciar sesión con Google OAuth
 */
export const loginWithGoogle = async (redirectTo) => {
	try {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: redirectTo || window.location.origin,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			url: data.url
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al autenticar con Google'
		};
	}
};

/**
 * Cerrar sesión
 */
export const logout = async () => {
	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw error;
		}

		return {
			success: true
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al cerrar sesión'
		};
	}
};

/**
 * Obtener sesión actual
 */
export const getCurrentSession = async () => {
	try {
		const { data: { session }, error } = await supabase.auth.getSession();

		if (error) {
			throw error;
		}

		return {
			success: true,
			session
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al obtener sesión'
		};
	}
};

/**
 * Escuchar cambios en el estado de autenticación
 */
export const onAuthStateChange = (callback) => {
	return supabase.auth.onAuthStateChange(callback);
};

