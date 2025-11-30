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
		// Validar longitud máxima del nombre (15 caracteres)
		const trimmedName = name?.trim();
		if (!trimmedName) {
			return {
				success: false,
				error: 'El nombre es requerido'
			};
		}

		if (trimmedName.length > 15) {
			return {
				success: false,
				error: 'El nombre no puede exceder 15 caracteres'
			};
		}

		const { data, error } = await supabase.auth.updateUser({
			data: { name: trimmedName }
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
 * @param {string} newPassword - Nueva contraseña
 * @param {string} [currentPassword] - Contraseña actual (opcional, requerida solo para cambiar contraseña existente)
 * @param {string} [userEmail] - Email del usuario (requerido si se proporciona currentPassword)
 * 
 * Si currentPassword no se proporciona, asume que es un usuario nuevo estableciendo su primera contraseña
 */
export const updateUserPassword = async (newPassword, currentPassword = null, userEmail = null) => {
	try {
		// Si se proporciona contraseña actual, validarla primero
		if (currentPassword && userEmail) {
			const { error: loginError } = await supabase.auth.signInWithPassword({
				email: userEmail,
				password: currentPassword
			});

			if (loginError) {
				return {
					success: false,
					error: 'La contraseña actual es incorrecta'
				};
			}
		}

		// Actualizar la contraseña
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
	
	// Verificar el provider real del usuario
	// Supabase puede tener múltiples identidades (providers) para un mismo usuario
	const identities = user.identities || [];
	const hasGoogleIdentity = identities.some(identity => identity.provider === 'google');
	const hasEmailIdentity = identities.some(identity => identity.provider === 'email');
	
	// Si tiene identidad de email y no de Google, es Email
	if (hasEmailIdentity && !hasGoogleIdentity) {
		return 'Email';
	}
	
	// Si tiene identidad de Google, es Google
	if (hasGoogleIdentity) {
		return 'Google';
	}
	
	// Fallback al método anterior
	if (user.app_metadata?.provider === 'google') return 'Google';
	return 'Email';
};

/**
 * Verificar y corregir el provider del usuario después de verificación OTP
 * Esto asegura que usuarios registrados con OTP tengan el provider correcto
 */
export const ensureEmailProvider = async (user) => {
	if (!user) return { success: false, error: 'Usuario no válido' };
	
	try {
		// Verificar las identidades del usuario
		const identities = user.identities || [];
		const hasEmailIdentity = identities.some(identity => identity.provider === 'email');
		const hasGoogleIdentity = identities.some(identity => identity.provider === 'google');
		
		// Si el usuario tiene identidad de email, está correcto
		if (hasEmailIdentity) {
			return { success: true, provider: 'email' };
		}
		
		// Si solo tiene identidad de Google pero se registró con OTP, hay un problema
		if (hasGoogleIdentity && !hasEmailIdentity) {
			console.warn('Usuario tiene provider Google pero debería ser Email. Esto puede indicar que se usó OAuth en lugar de OTP.');
			return { success: false, provider: 'google', error: 'Usuario registrado con Google OAuth, no con OTP' };
		}
		
		return { success: true, provider: 'email' };
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al verificar el provider'
		};
	}
};

/**
 * Verificar si el usuario tiene Google vinculado
 */
export const hasGoogleLinked = (user) => {
	if (!user) return false;
	
	const identities = user.identities || [];
	return identities.some(identity => identity.provider === 'google');
};

/**
 * Crear perfil de usuario en la base de datos
 * Se llama después de que el usuario verifica su email con OTP
 */
export const createUserProfile = async (userId, email, name) => {
	try {
		// Validar longitud máxima del nombre si se proporciona (15 caracteres)
		let validatedName = name?.trim() || null;
		if (validatedName && validatedName.length > 15) {
			// Si el nombre excede el límite, truncarlo a 15 caracteres
			validatedName = validatedName.substring(0, 15);
		}

		// Verificar que la sesión esté activa antes de intentar crear el perfil
		const { data: { session }, error: sessionError } = await supabase.auth.getSession();
		
		if (sessionError || !session) {
			console.error('Error al obtener sesión:', sessionError);
			return {
				success: false,
				error: 'No hay una sesión activa. Por favor, verifica tu email nuevamente.'
			};
		}

		// Verificar que el userId coincida con el usuario autenticado
		if (session.user.id !== userId) {
			console.error('El userId no coincide con el usuario autenticado:', {
				sessionUserId: session.user.id,
				providedUserId: userId
			});
			return {
				success: false,
				error: 'Error de autenticación: El usuario no coincide con la sesión activa.'
			};
		}

		// Verificar si el perfil ya existe
		const { data: existingProfile, error: checkError } = await supabase
			.from('users')
			.select('id')
			.eq('id', userId)
			.single();

		// Si el error es que la tabla no existe, retornar error descriptivo
		if (checkError && (checkError.code === 'PGRST116' || checkError.message.includes('relation') || checkError.message.includes('does not exist'))) {
			return {
				success: false,
				error: 'La tabla de usuarios no existe. Por favor, crea la tabla "users" en tu base de datos de Supabase. Consulta ESTRUCTURA_TABLA_USERS.md para más información.'
			};
		}

		// Si el perfil ya existe, actualizarlo en lugar de crear uno nuevo
		if (existingProfile && !checkError) {
			const { data, error } = await supabase
				.from('users')
				.update({
					email,
					name: validatedName,
					updated_at: new Date().toISOString()
				})
				.eq('id', userId)
				.select()
				.single();

			if (error) {
				// Si hay un error de permisos RLS, dar un mensaje más claro
				if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('RLS')) {
					return {
						success: false,
						error: 'Error de permisos. Verifica que las políticas RLS estén configuradas correctamente en la tabla "users".'
					};
				}
				throw error;
			}

			return {
				success: true,
				user: data,
				message: 'Perfil actualizado correctamente'
			};
		}

		// Crear nuevo perfil
		const { data, error } = await supabase
			.from('users')
			.insert({
				id: userId,
				email,
				name: validatedName,
				level: 1,
				points: 0,
				ranking: '#---',
				achievements: [],
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) {
			console.error('Error al crear perfil:', {
				code: error.code,
				message: error.message,
				details: error.details,
				hint: error.hint,
				userId: userId
			});

			// Si el error es que la tabla no existe
			if (error.code === 'PGRST116' || 
			    error.message?.includes('relation') || 
			    error.message?.includes('does not exist') ||
			    error.message?.includes('no such table')) {
				return {
					success: false,
					error: 'La tabla "users" no existe en tu base de datos. Por favor, crea la tabla ejecutando el SQL del archivo ESTRUCTURA_TABLA_USERS.md en el SQL Editor de Supabase.'
				};
			}
			
			// Si hay un error de permisos RLS, dar un mensaje más claro
			if (error.code === '42501' || 
			    error.message?.includes('permission denied') || 
			    error.message?.includes('RLS') ||
			    error.message?.includes('new row violates row-level security') ||
			    error.message?.includes('row-level security policy')) {
				return {
					success: false,
					error: `Error de permisos RLS: Las políticas de seguridad no permiten crear el perfil. Verifica que la política "Users can insert own profile" esté configurada correctamente en la tabla "users" y que el usuario esté autenticado. Código: ${error.code || 'N/A'}`
				};
			}
			
			// Si el error es de foreign key constraint
			if (error.code === '23503' || error.message?.includes('foreign key constraint')) {
				return {
					success: false,
					error: 'Error: El usuario no existe en auth.users. Asegúrate de que el usuario esté completamente autenticado antes de crear el perfil.'
				};
			}
			
			// Otros errores de base de datos
			return {
				success: false,
				error: `Error al crear perfil en la base de datos: ${error.message || 'Error desconocido'} (Código: ${error.code || 'N/A'})`
			};
		}

		return {
			success: true,
			user: data,
			message: 'Perfil creado correctamente'
		};
	} catch (error) {
		// Manejar errores generales
		if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
			return {
				success: false,
				error: 'La tabla de usuarios no existe. Por favor, crea la tabla "users" en tu base de datos de Supabase. Consulta ESTRUCTURA_TABLA_USERS.md para más información.'
			};
		}

		if (error.code === '42501' || error.message.includes('permission denied') || error.message.includes('RLS')) {
			return {
				success: false,
				error: 'Error de permisos. Verifica que las políticas RLS estén configuradas correctamente en la tabla "users".'
			};
		}

		return {
			success: false,
			error: error.message || 'Error al crear el perfil del usuario'
		};
	}
};

