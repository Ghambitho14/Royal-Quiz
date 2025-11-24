import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { GuestLogin } from './GuestLogin';
import { LoginToggle } from './LoginToggle';

export function LoginCard({
	isSignUp,
	email,
	password,
	name,
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
	onForgotPassword,
}) {
	return (
		<div className={`relative w-full max-w-md transition-all duration-500 ${isFlipping ? 'scale-105 opacity-80' : 'scale-100 opacity-100'}`}>
			<div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 card-enter">
				{/* Header */}
				<LoginHeader isSignUp={isSignUp} />

				{/* Form - errors are now shown below each field */}
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

