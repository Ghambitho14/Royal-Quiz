import { supabase } from '../config/supabase.js';

/**
 * Servicio de Usuario
 * Maneja todas las operaciones relacionadas con usuarios
 */

/**
 * Actualizar nombre de usuario
 */
export const updateUserName = async (name) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			data: { name }
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			user: data.user
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al actualizar el nombre'
		};
	}
};

/**
 * Actualizar contraseña
 */
export const updateUserPassword = async (newPassword) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword,
			data: {
				has_password: true
			}
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			user: data.user
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al actualizar la contraseña'
		};
	}
};

/**
 * Establecer contraseña para usuario de Google
 */
export const setPasswordForGoogleUser = async (password) => {
	try {
		const { data, error } = await supabase.auth.updateUser({
			password,
			data: {
				has_password: true
			}
		});

		if (error) {
			throw error;
		}

		return {
			success: true,
			user: data.user
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al establecer la contraseña'
		};
	}
};

/**
 * Obtener información del usuario actual
 */
export const getCurrentUser = async () => {
	try {
		const { data: { user }, error } = await supabase.auth.getUser();

		if (error) {
			throw error;
		}

		return {
			success: true,
			user
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al obtener usuario'
		};
	}
};

/**
 * Verificar si el usuario necesita establecer contraseña
 */
export const needsPassword = (user) => {
	if (!user) return false;
	
	const isGoogleUser = user.app_metadata?.provider === 'google';
	const hasPassword = user.user_metadata?.has_password === true;
	
	return isGoogleUser && !hasPassword;
};

/**
 * Obtener tipo de cuenta del usuario
 */
export const getAccountType = (user) => {
	if (!user) return 'guest';
	if (user.type === 'guest') return 'Invitado';
	if (user.app_metadata?.provider === 'google') return 'Google';
	return 'Email';
};

