import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { loginWithPassword, registerWithOTP, loginWithGoogle } from '../../../../backend/services/auth.js';
import { checkRateLimit, recordFailedAttempt, resetLoginAttempts, formatRemainingTime } from '../../../../backend/utils/helpers.js';
import { useAuth } from '../../../shared/context/AuthContext';

// Componente simple para mostrar un mensaje de error flotante
const ErrorToast = ({ message }) => {
	if (!message) return null;

	return (
		<div
			style={{
				position: 'fixed',
				top: '20px',
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundColor: '#ef4444',
				color: 'white',
				padding: '12px 24px',
				borderRadius: '8px',
				zIndex: 1000,
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
			}}
		>
			{message}
		</div>
	);
};

export const LoginPage = () => {
	const navigate = useNavigate();
	const { updateUser } = useAuth();
	const [isRegistering, setIsRegistering] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [rateLimitInfo, setRateLimitInfo] = useState(null);

	const handleLogin = async (credentials) => {
		setLoading(true);
		setError(null);
		setRateLimitInfo(null);
		
		const email = credentials.email?.toLowerCase().trim();
		
		// Verificar si el email está bloqueado antes de intentar login
		const rateLimitCheck = checkRateLimit(email);
		
		if (rateLimitCheck.isLocked) {
			const remainingTime = formatRemainingTime(rateLimitCheck.remainingTime);
			setError(`Tu cuenta está temporalmente bloqueada. Intenta de nuevo en ${remainingTime}.`);
			setRateLimitInfo(rateLimitCheck);
			setLoading(false);
			return;
		}
		
		const result = await loginWithPassword(credentials.email, credentials.password, credentials.captchaToken);

		if (!result.success) {
			// Registrar intento fallido
			const attemptResult = recordFailedAttempt(email);
			
			// Si ahora está bloqueado después de este intento
			if (attemptResult.isLocked) {
				const remainingTime = formatRemainingTime(attemptResult.remainingTime);
				setError(attemptResult.message || `Demasiados intentos fallidos. Tu cuenta está bloqueada por ${remainingTime}.`);
				setRateLimitInfo(attemptResult);
			} else {
				// Mostrar mensaje con intentos restantes
				setError(attemptResult.message || result.error);
				setRateLimitInfo(attemptResult);
			}
			
			setLoading(false);
			return;
		}

		// Si el login fue exitoso, resetear intentos fallidos
		if (result.user) {
			resetLoginAttempts(email);
			setRateLimitInfo(null);
			
			const userData = {
				type: 'user',
				email: result.user.email,
				id: result.user.id,
				...result.user
			};
			updateUser(userData);
			navigate('/profile');
		}
		
		setLoading(false);
	};

	const handleRegister = async (userData) => {
		setLoading(true);
		setError(null);
		
		const result = await registerWithOTP(userData.email, userData.name, userData.captchaToken);

		if (!result.success) {
			setError(result.error);
			setLoading(false);
			return;
		}

		// Guardar los datos del usuario temporalmente en localStorage para después de la verificación
		// Incluir timestamp para expiración automática después de 10 minutos
		localStorage.setItem('pendingVerification', JSON.stringify({
			email: userData.email,
			name: userData.name,
			password: userData.password,
			timestamp: Date.now() // Timestamp para verificar expiración
		}));
		
		// Redirigir al lobby para ingresar el código
		navigate('/verify');
		
		setLoading(false);
	};

	const handleGoogleAuth = async () => {
		setLoading(true);
		setError(null);
		
		const result = await loginWithGoogle(window.location.origin);

		if (!result.success) {
			setError(result.error);
			setLoading(false);
			return;
		}

		// Si no hay error, Supabase redirigirá automáticamente a Google
		// El callback será manejado por App.jsx con onAuthStateChange
	};

	const handleGuestMode = () => {
		updateUser({ type: 'guest' });
		navigate('/profile');
	};

	const handleBackToLogin = () => {
		setIsRegistering(false);
	};

	const handleShowRegister = () => {
		setIsRegistering(true);
	};

	if (isRegistering) {
		return (
			<>
				<ErrorToast message={error} />
				<RegisterForm
					onRegister={handleRegister}
					onBackToLogin={handleBackToLogin}
					onGoogleRegister={handleGoogleAuth}
					loading={loading}
				/>
			</>
		);
	}

	return (
		<>
			<ErrorToast message={error} />
			<LoginForm
				onLogin={handleLogin}
				onRegister={handleShowRegister}
				onGuestMode={handleGuestMode}
				onGoogleLogin={handleGoogleAuth}
				loading={loading}
			/>
		</>
	);
};

