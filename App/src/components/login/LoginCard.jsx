// ============================================
// COMPONENTE LOGIN: Card contenedor principal
// ============================================

import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { GuestLogin } from './GuestLogin';
import { LoginToggle } from './LoginToggle';
import { LoginError } from './LoginError';

export function LoginCard({
	isSignUp,
	email,
	password,
	name,
	error,
	loading,
	isFlipping,
	flipDirection,
	fieldErrors,
	onEmailChange,
	onPasswordChange,
	onNameChange,
	onSubmit,
	onToggle,
	onGuestLogin,
	onErrorDismiss,
	onForgotPassword,
}) {
	return (
		<div className={`relative w-full max-w-md transition-all duration-500 ${isFlipping ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
			<div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 card-enter">
				{/* Header */}
				<LoginHeader
					isSignUp={isSignUp}
				/>

				{/* General Error Alert (for auth errors) - with reserved space */}
				<div style={{ minHeight: error ? 'auto' : '0' }}>
					<LoginError error={error} onDismiss={onErrorDismiss} />
				</div>

				{/* Form */}
				<LoginForm
					isSignUp={isSignUp}
					email={email}
					password={password}
					name={name}
					loading={loading}
					fieldErrors={fieldErrors}
					onEmailChange={onEmailChange}
					onPasswordChange={onPasswordChange}
					onNameChange={onNameChange}
					onSubmit={onSubmit}
					onForgotPassword={onForgotPassword}
				/>

				{/* Guest Login */}
				<GuestLogin onGuestLogin={onGuestLogin} loading={loading} />

				{/* Toggle */}
				<LoginToggle isSignUp={isSignUp} loading={loading} onToggle={onToggle} />
			</div>
		</div>
	);
}

