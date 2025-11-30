import { supabase } from '../config/supabase.js';

/**
 * Servicio de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación
 */

/**
 * Validar email con longitud máxima personalizada
 * - Parte local (antes de @): máximo 24 caracteres
 * - Parte dominio (después de @): máximo 15 caracteres
 */
const validateEmailLength = (email) => {
	if (!email || typeof email !== 'string') {
		return {
			isValid: false,
			error: 'El email es requerido'
		};
	}

	// Validar formato básico y longitud de partes
	const parts = email.split('@');
	if (parts.length !== 2) {
		return {
			isValid: false,
			error: 'El formato del email no es válido'
		};
	}

	const [localPart, domainPart] = parts;

	// Validar parte local (antes de @) - máximo 24 caracteres
	if (localPart.length > 24) {
		return {
			isValid: false,
			error: 'La parte local del email (antes de @) no puede exceder 24 caracteres'
		};
	}

	// Validar parte dominio (después de @) - máximo 15 caracteres
	if (domainPart.length > 15) {
		return {
			isValid: false,
			error: 'La parte del dominio del email (después de @) no puede exceder 15 caracteres'
		};
	}

	return {
		isValid: true,
		error: null
	};
};

/**
 * Iniciar sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @param {string} [captchaToken] - Token de captcha (opcional, requerido si está habilitado en Supabase)
 */
export const loginWithPassword = async (email, password, captchaToken = null) => {
	try {
		// Normalizar y validar email
		const normalizedEmail = email?.toLowerCase().trim();
		
		const emailValidation = validateEmailLength(normalizedEmail);
		if (!emailValidation.isValid) {
			return {
				success: false,
				error: emailValidation.error
			};
		}

		// Preparar opciones para signInWithPassword
		const options = {};
		
		// Si hay un token de captcha, agregarlo a las opciones
		if (captchaToken) {
			options.captchaToken = captchaToken;
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: normalizedEmail,
			password,
			options: Object.keys(options).length > 0 ? options : undefined
		});

		if (error) {
			// Si el error es de captcha, dar un mensaje más claro
			if (error.message?.includes('captcha') || error.message?.includes('CAPTCHA')) {
				return {
					success: false,
					error: 'Error de verificación de seguridad. Por favor, completa el captcha e intenta de nuevo.'
				};
			}
			throw error;
		}

		return {
			success: true,
			user: data.user,
			session: data.session
		};
	} catch (error) {
		// Si el error es de captcha, dar un mensaje más claro
		if (error.message?.includes('captcha') || error.message?.includes('CAPTCHA')) {
			return {
				success: false,
				error: 'Error de verificación de seguridad. Por favor, completa el captcha e intenta de nuevo.'
			};
		}
		
		return {
			success: false,
			error: error.message || 'Error al iniciar sesión'
		};
	}
};

/**
 * Registrar nuevo usuario con OTP
 * @param {string} email - Email del usuario
 * @param {string} name - Nombre del usuario
 * @param {string} [captchaToken] - Token de captcha (opcional, requerido si está habilitado en Supabase)
 * 
 * NOTA: Para que esto funcione correctamente con códigos OTP en lugar de enlaces de confirmación,
 * necesitas configurar Supabase:
 * 1. Ve a Authentication > Email Templates
 * 2. Edita la plantilla "Magic Link" para incluir el código: {{ .Token }}
 * 3. O deshabilita "Confirm email" en Authentication > Settings
 */
export const registerWithOTP = async (email, name, captchaToken = null) => {
	try {
		// Normalizar y validar email
		const normalizedEmail = email?.toLowerCase().trim();
		
		const emailValidation = validateEmailLength(normalizedEmail);
		if (!emailValidation.isValid) {
			return {
				success: false,
				error: emailValidation.error
			};
		}

		// Preparar opciones con captcha si está disponible
		const options = {
			data: {
				name: name || null
			},
			shouldCreateUser: true
		};

		// Si hay un token de captcha, agregarlo a las opciones
		if (captchaToken) {
			options.captchaToken = captchaToken;
		}

		// Usar signInWithOtp - esto debería enviar un código OTP
		// NOTA: Si Supabase está enviando un enlace de confirmación en lugar de OTP,
		// necesitas configurar la plantilla de email en Supabase Dashboard
		const { data, error } = await supabase.auth.signInWithOtp({
			email: normalizedEmail,
			options
		});

		if (error) {
			// Si el error es de captcha, dar un mensaje más claro
			if (error.message?.includes('captcha') || error.message?.includes('CAPTCHA')) {
				return {
					success: false,
					error: 'Error de verificación de seguridad. Por favor, completa el captcha e intenta de nuevo.'
				};
			}
			
			return {
				success: false,
				error: error.message || 'Error al registrar usuario'
			};
		}

		return {
			success: true,
			message: 'Código de verificación enviado'
		};
	} catch (error) {
		// Si el error es de captcha, dar un mensaje más claro
		if (error.message?.includes('captcha') || error.message?.includes('CAPTCHA')) {
			return {
				success: false,
				error: 'Error de verificación de seguridad. Por favor, completa el captcha e intenta de nuevo.'
			};
		}
		
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
		// Normalizar y validar email
		const normalizedEmail = email?.toLowerCase().trim();
		
		const emailValidation = validateEmailLength(normalizedEmail);
		if (!emailValidation.isValid) {
			return {
				success: false,
				error: emailValidation.error
			};
		}

		const { data, error } = await supabase.auth.verifyOtp({
			token,
			type: 'email',
			email: normalizedEmail
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
 * Vincular cuenta de Google a un usuario existente
 * Si el usuario ya está autenticado, Supabase vinculará automáticamente la cuenta de Google
 * si el email coincide con el email del usuario actual
 */
export const linkGoogleAccount = async (redirectTo) => {
	try {
		// Verificar que el usuario esté autenticado
		const { data: { session }, error: sessionError } = await supabase.auth.getSession();
		
		if (sessionError || !session) {
			return {
				success: false,
				error: 'Debes estar autenticado para vincular tu cuenta con Google'
			};
		}

		// Obtener el email del usuario actual
		const currentEmail = session.user.email;
		
		if (!currentEmail) {
			return {
				success: false,
				error: 'No se pudo obtener el email del usuario'
			};
		}

		// Iniciar OAuth con Google
		// Si el email de Google coincide con el email del usuario actual,
		// Supabase vinculará automáticamente la cuenta
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
			url: data.url,
			message: 'Serás redirigido a Google para vincular tu cuenta. Asegúrate de usar el mismo email que tu cuenta actual.'
		};
	} catch (error) {
		// Manejar errores específicos de OAuth
		if (error.message?.includes('redirect_uri_mismatch') || error.message?.includes('redirect_uri')) {
			return {
				success: false,
				error: 'Error de configuración de OAuth: El URI de redirección no está registrado en Google Cloud Console. Por favor, consulta CONFIGURACION_GOOGLE_OAUTH_VINCULAR.md para más información.'
			};
		}
		
		return {
			success: false,
			error: error.message || 'Error al vincular cuenta con Google'
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
 * Validar contraseña actual del usuario
 * Intenta hacer login con la contraseña para verificar que es correcta
 */
export const validateCurrentPassword = async (email, password) => {
	try {
		// Normalizar y validar email
		const normalizedEmail = email?.toLowerCase().trim();
		
		const emailValidation = validateEmailLength(normalizedEmail);
		if (!emailValidation.isValid) {
			return {
				success: false,
				error: emailValidation.error
			};
		}

		const { error } = await supabase.auth.signInWithPassword({
			email: normalizedEmail,
			password
		});

		if (error) {
			return {
				success: false,
				error: error.message || 'Contraseña incorrecta'
			};
		}

		return {
			success: true
		};
	} catch (error) {
		return {
			success: false,
			error: error.message || 'Error al validar la contraseña'
		};
	}
};

/**
 * Escuchar cambios en el estado de autenticación
 */
export const onAuthStateChange = (callback) => {
	return supabase.auth.onAuthStateChange(callback);
};

