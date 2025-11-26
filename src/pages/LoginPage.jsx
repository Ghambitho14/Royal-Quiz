import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { supabase } from '../lib/supabase';

export const LoginPage = ({ onAuthSuccess, onVerificationNeeded }) => {
	const [isRegistering, setIsRegistering] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async (credentials) => {
		setLoading(true);
		setError(null);
		
		try {
			const { data, error: authError } = await supabase.auth.signInWithPassword({
				email: credentials.email,
				password: credentials.password,
			});

			if (authError) {
				setError(authError.message);
				return;
			}

			if (data.user) {
				onAuthSuccess({ 
					type: 'user', 
					email: data.user.email,
					id: data.user.id,
					...data.user
				});
			}
		} catch (err) {
			setError(err.message || 'Error al iniciar sesión');
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (userData) => {
		setLoading(true);
		setError(null);
		
		try {
			// Enviar código OTP para verificación (no Magic Link)
			// IMPORTANTE: No especificar emailRedirectTo para que envíe código OTP
			const { data: otpData, error: otpError } = await supabase.auth.signInWithOtp({
				email: userData.email,
				options: {
					data: {
						name: userData.name,
					},
					shouldCreateUser: true
					// No incluir emailRedirectTo para forzar envío de código OTP
				}
			});

			if (otpError) {
				setError(otpError.message);
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
		} catch (err) {
			setError(err.message || 'Error al registrar usuario');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		setLoading(true);
		setError(null);
		
		try {
			const { data, error: authError } = await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: `${window.location.origin}`,
					queryParams: {
						access_type: 'offline',
						prompt: 'consent',
					}
				}
			});

			if (authError) {
				setError(authError.message);
				setLoading(false);
				return;
			}

			// Si no hay error, Supabase redirigirá automáticamente a Google
			// El callback será manejado por App.jsx con onAuthStateChange
		} catch (err) {
			setError(err.message || 'Error al autenticar con Google');
			setLoading(false);
		}
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

