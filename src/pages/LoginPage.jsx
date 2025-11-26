import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { loginWithPassword, registerWithOTP, loginWithGoogle } from '../../backend/services/auth.js';

export const LoginPage = ({ onAuthSuccess, onVerificationNeeded }) => {
	const [isRegistering, setIsRegistering] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async (credentials) => {
		setLoading(true);
		setError(null);
		
		const result = await loginWithPassword(credentials.email, credentials.password);

		if (!result.success) {
			setError(result.error);
			setLoading(false);
			return;
		}

		if (result.user) {
			onAuthSuccess({ 
				type: 'user', 
				email: result.user.email,
				id: result.user.id,
				...result.user
			});
		}
		
		setLoading(false);
	};

	const handleRegister = async (userData) => {
		setLoading(true);
		setError(null);
		
		const result = await registerWithOTP(userData.email, userData.name);

		if (!result.success) {
			setError(result.error);
			setLoading(false);
			return;
		}

		// Guardar los datos del usuario temporalmente para después de la verificación
		// Redirigir al lobby para ingresar el código
		onVerificationNeeded({
			email: userData.email,
			name: userData.name,
			password: userData.password
		});
		
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
		console.log('Guest mode activated');
		onAuthSuccess({ type: 'guest' });
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
				{error && (
					<div style={{
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
					}}>
						{error}
					</div>
				)}
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
			{error && (
				<div style={{
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
				}}>
					{error}
				</div>
			)}
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

