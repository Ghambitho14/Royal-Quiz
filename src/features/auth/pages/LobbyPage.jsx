import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { VerificationCode } from '../components/VerificationCode';
import { verifyOTP, registerWithOTP } from '../../../../backend/services/auth.js';
import { updateUserPassword, ensureEmailProvider, createUserProfile } from '../../../../backend/services/user.js';
import { useAuth } from '../../../shared/context/AuthContext';

export const LobbyPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { updateUser } = useAuth();
	
	// Obtener email de query params o localStorage
	const emailFromParams = searchParams.get('email');
	const [email, setEmail] = useState(emailFromParams || '');
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [resendCooldown, setResendCooldown] = useState(0); // Contador en segundos
	const cooldownIntervalRef = useRef(null);

	// Función helper para obtener y validar datos de localStorage con expiración
	const getPendingVerification = () => {
		const pending = localStorage.getItem('pendingVerification');
		if (!pending) return null;

		try {
			const data = JSON.parse(pending);
			const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutos en milisegundos
			const now = Date.now();

			// Si no tiene timestamp (datos antiguos), borrar y retornar null
			if (!data.timestamp) {
				localStorage.removeItem('pendingVerification');
				return null;
			}

			// Si han pasado más de 10 minutos, borrar y retornar null
			if (now - data.timestamp > EXPIRATION_TIME) {
				localStorage.removeItem('pendingVerification');
				return null;
			}

			return data;
		} catch (error) {
			// Si hay error al parsear, borrar y retornar null
			localStorage.removeItem('pendingVerification');
			return null;
		}
	};

	useEffect(() => {
		// Si no hay email en params, intentar obtenerlo de localStorage
		if (!email) {
			const data = getPendingVerification();
			if (data) {
				setEmail(data.email);
				setUserData(data);
			}
		} else if (!userData) {
			// Si hay email en params pero no userData, intentar obtenerlo de localStorage
			const data = getPendingVerification();
			if (data && data.email === email) {
				setUserData(data);
			}
		}
	}, [email, userData]);

	// Efecto para manejar el contador de cooldown
	useEffect(() => {
		if (resendCooldown > 0) {
			// Iniciar contador regresivo
			cooldownIntervalRef.current = setInterval(() => {
				setResendCooldown((prev) => {
					if (prev <= 1) {
						// Cuando llega a 0, limpiar el intervalo
						if (cooldownIntervalRef.current) {
							clearInterval(cooldownIntervalRef.current);
							cooldownIntervalRef.current = null;
						}
						return 0;
					}
					return prev - 1;
				});
			}, 1000); // Actualizar cada segundo
		} else {
			// Limpiar intervalo si el cooldown es 0
			if (cooldownIntervalRef.current) {
				clearInterval(cooldownIntervalRef.current);
				cooldownIntervalRef.current = null;
			}
		}

		// Limpiar intervalo al desmontar el componente
		return () => {
			if (cooldownIntervalRef.current) {
				clearInterval(cooldownIntervalRef.current);
			}
		};
	}, [resendCooldown]);

	const handleVerify = async (code) => {
		setLoading(true);
		setError(null);

		// Verificar que los datos no hayan expirado antes de continuar
		const pendingData = getPendingVerification();
		if (!pendingData) {
			setError('Los datos de verificación han expirado. Por favor, regístrate nuevamente.');
			setLoading(false);
			// Limpiar localStorage por si acaso
			localStorage.removeItem('pendingVerification');
			return;
		}

		const verifyResult = await verifyOTP(email, code);

		if (!verifyResult.success) {
			setError(verifyResult.error || 'Código inválido. Por favor, intenta de nuevo.');
			setLoading(false);
			return;
		}

		if (!verifyResult.user || !verifyResult.session) {
			setError('Error: No se pudo obtener la información del usuario después de la verificación.');
			setLoading(false);
			return;
		}

		// Esperar un momento para asegurar que la sesión esté completamente establecida
		// Esto es necesario porque después de verifyOTP, la sesión puede tardar un momento en propagarse
		await new Promise(resolve => setTimeout(resolve, 500));

		// Verificar el provider del usuario después de la verificación OTP
		// Esto ayuda a diagnosticar si el usuario se registró correctamente con OTP
		if (verifyResult.user) {
			const providerCheck = await ensureEmailProvider(verifyResult.user);
			
			// Si el usuario tiene provider Google pero se registró con OTP, mostrar advertencia
			if (!providerCheck.success && providerCheck.provider === 'google') {
				console.warn('⚠️ Advertencia: El usuario se registró con OTP pero tiene provider Google. Esto puede indicar que se usó OAuth de Google en lugar de OTP.');
				console.log('Identidades del usuario:', verifyResult.user.identities);
				console.log('app_metadata:', verifyResult.user.app_metadata);
			}
		}

		// Si hay contraseña, actualizarla después de verificar
		if (verifyResult.user && userData?.password) {
			const updateResult = await updateUserPassword(userData.password);

			if (!updateResult.success) {
				setError(updateResult.error || 'Error al establecer la contraseña');
				setLoading(false);
				return;
			}
		}

		// Crear o actualizar el perfil del usuario en la base de datos
		// Esperar un poco más para asegurar que la sesión esté completamente establecida
		await new Promise(resolve => setTimeout(resolve, 300));
		
		const profileResult = await createUserProfile(
			verifyResult.user.id,
			verifyResult.user.email,
			userData?.name
		);

		if (!profileResult.success) {
			// Si falla la creación del perfil, mostrar error descriptivo
			console.error('Error al crear perfil:', profileResult.error);
			
			// Obtener el mensaje de error
			const errorMessage = profileResult.error || 'Error al guardar el perfil del usuario en la base de datos.';
			
			// No continuar si es un error crítico (tabla no existe o permisos)
			if (errorMessage.includes('tabla') || 
			    errorMessage.includes('no existe') || 
			    errorMessage.includes('permisos') ||
			    errorMessage.includes('RLS') ||
			    errorMessage.includes('relation') ||
			    errorMessage.includes('does not exist') ||
			    errorMessage.includes('permission denied')) {
				setError(`Error de base de datos: ${errorMessage}`);
				setLoading(false);
				return;
			}
			
			// Para otros errores, mostrar advertencia pero permitir continuar
			console.warn('Advertencia: No se pudo crear el perfil, pero el usuario puede continuar:', errorMessage);
		}

		// Limpiar datos pendientes
		localStorage.removeItem('pendingVerification');
		
		const userDataResult = {
			type: 'user',
			email: verifyResult.user.email,
			id: verifyResult.user.id,
			name: userData?.name || (profileResult.success ? profileResult.user?.name : null),
			...verifyResult.user
		};
		
		updateUser(userDataResult);
		navigate('/profile');
		
		setLoading(false);
	};

	const handleResend = async () => {
		// Si hay un cooldown activo, no hacer nada
		if (resendCooldown > 0) {
			return;
		}

		setLoading(true);
		setError(null);
		setSuccessMessage(null);

		// Para reenvío, no necesitamos captcha (solo para el primer registro)
		const result = await registerWithOTP(email, userData?.name, null);

		if (!result.success) {
			setError(result.error || 'Error al reenviar el código');
			setSuccessMessage(null);
			setLoading(false);
		} else {
			// Mostrar mensaje de éxito
			setSuccessMessage('Código reenviado. Revisa tu correo electrónico.');
			setError(null);
			
			// Iniciar cooldown de 60 segundos
			setResendCooldown(60);
			
			// Limpiar el mensaje después de 5 segundos
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
			
			setLoading(false);
		}
	};

	if (!email) {
		return (
			<div className="app">
				<div className="app__content">
					<p>No se encontró información de verificación. Por favor, regístrate nuevamente.</p>
					<button onClick={() => navigate('/login')}>Volver al Login</button>
				</div>
			</div>
		);
	}

	return (
		<VerificationCode
			email={email}
			onVerify={handleVerify}
			onResend={handleResend}
			loading={loading}
			error={error}
			successMessage={successMessage}
			resendCooldown={resendCooldown}
		/>
	);
};

