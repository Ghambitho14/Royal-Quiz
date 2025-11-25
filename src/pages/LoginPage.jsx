import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export const LoginPage = ({ onAuthSuccess }) => {
	const [isRegistering, setIsRegistering] = useState(false);

	const handleLogin = (credentials) => {
		console.log('Login attempt:', credentials);
		// TODO: Implementar lógica de autenticación real
		onAuthSuccess({ type: 'user', ...credentials });
	};

	const handleRegister = (userData) => {
		console.log('Register attempt:', userData);
		// TODO: Implementar lógica de registro real
		onAuthSuccess({ type: 'user', ...userData });
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
			<RegisterForm
				onRegister={handleRegister}
				onBackToLogin={handleBackToLogin}
			/>
		);
	}

	return (
		<LoginForm
			onLogin={handleLogin}
			onRegister={handleShowRegister}
			onGuestMode={handleGuestMode}
		/>
	);
};

