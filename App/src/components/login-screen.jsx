import { useState } from 'react';
import { LoginBackground } from './login/LoginBackground';
import { LoginCard } from './login/LoginCard';
import { ForgotPasswordModal } from './login/ForgotPasswordModal';
import { useAuthValidation } from '../hooks/useAuthValidation';
import { useAuthSubmit } from '../hooks/useAuthSubmit';
import { useCardFlip } from '../hooks/useCardFlip';
import { useErrorHandler } from '../hooks/useErrorHandler';

export function LoginScreen({ onLogin, onGuestLogin }) {
	// Form state
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [showForgotPassword, setShowForgotPassword] = useState(false);

	// Custom hooks
	const { error, showError, clearError } = useErrorHandler({ autoDismissTime: 5000 });
	const { fieldErrors, validate, clearFieldError, clearAllErrors } = useAuthValidation();
	const { loading, handleAuth } = useAuthSubmit({ onLogin });
	const { isFlipping, flipDirection, triggerFlip } = useCardFlip();

	const handleSubmit = async (e) => {
		e.preventDefault();
		clearError();
		clearAllErrors();

		// Validate form
		const validationErrors = validate({ email, password, name, isSignUp });
		if (validationErrors) {
			return; // Field errors will be displayed under each input
		}

		// Submit authentication
		const authError = await handleAuth(isSignUp, email, password, name);
		if (authError) {
			showError(authError);
		}
	};

	const handleToggle = () => {
		triggerFlip(isSignUp, () => {
			setIsSignUp(!isSignUp);
			clearError();
			clearAllErrors();
		});
	};

	const handleEmailChange = (value) => {
		setEmail(value);
		if (fieldErrors.email) {
			clearFieldError('email');
		}
	};

	const handlePasswordChange = (value) => {
		setPassword(value);
		if (fieldErrors.password) {
			clearFieldError('password');
		}
	};

	const handleNameChange = (value) => {
		setName(value);
		if (fieldErrors.name) {
			clearFieldError('name');
		}
	};

	return (
		<div className="min-h-screen h-screen w-screen fixed inset-0 flex items-center justify-center px-4 py-8 overflow-hidden bg-gray-950">
			{/* Background with spotlights */}
			<LoginBackground />

			{/* Login card */}
			<LoginCard
				isSignUp={isSignUp}
				email={email}
				password={password}
				name={name}
				error={error}
				loading={loading}
				isFlipping={isFlipping}
				flipDirection={flipDirection}
				fieldErrors={fieldErrors}
				onEmailChange={handleEmailChange}
				onPasswordChange={handlePasswordChange}
				onNameChange={handleNameChange}
				onSubmit={handleSubmit}
				onToggle={handleToggle}
				onGuestLogin={onGuestLogin}
				onErrorDismiss={clearError}
				onForgotPassword={() => setShowForgotPassword(true)}
			/>

			{/* Forgot password modal */}
			<ForgotPasswordModal
				open={showForgotPassword}
				onClose={() => setShowForgotPassword(false)}
			/>
		</div>
	);
}

