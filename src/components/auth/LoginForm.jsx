import { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { AnimatedText } from '../ui/AnimatedText';
import { cn } from '../../lib/utils';
import '../../styles/components/LoginForm.css';

const EnvelopeIcon = ({ className = '' }) => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
	</svg>
);

const LockIcon = ({ className = '' }) => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
);

const PersonIcon = ({ className = '' }) => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
	</svg>
);

export const LoginForm = ({ onLogin, onRegister, onGuestMode }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	
	// Memorizar el array de phrases para evitar recrearlo en cada render
	const phrases = useMemo(() => ['¿Estás listo?', '¿Te atreves?', 'Muestra lo que sabes']);

	const validateForm = () => {
		const newErrors = {};
		
		if (!email.trim()) {
			newErrors.email = 'El correo electrónico es requerido';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'El correo electrónico no es válido';
		}
		
		if (!password.trim()) {
			newErrors.password = 'La contraseña es requerida';
		} else if (password.length < 6) {
			newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onLogin({ email, password });
		}
	};

	return (
		<Modal>
			<div className="login-form">
				<Logo size="large" className="mb-2" />
				
				<div className="login-form__header">
					<AnimatedText
						phrases={phrases}
						className="login-form__title"
						style={{
							fontWeight: '200',
							letterSpacing: '-0.02em',
							lineHeight: '2.0',
							minHeight: '3.5rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							overflow: 'visible',
						}}
					/>
					<p className="login-form__subtitle">Bienvenido de vuelta</p>
				</div>

				<form onSubmit={handleSubmit} className="login-form__form" noValidate>
					<InputField
						label="Correo electrónico"
						type="email"
						placeholder="tu@email.com"
						icon={EnvelopeIcon}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={errors.email}
					/>

					<div className="login-form__password-field">
						<Label htmlFor="password" className="login-form__password-label">Contraseña</Label>
						<div className="login-form__password-wrapper">
							<div className="login-form__password-icon">
								<LockIcon className="size-4" />
							</div>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={cn(
									"login-form__password-input",
									errors.password 
										? "login-form__password-input--error"
										: "login-form__password-input--normal"
								)}
								aria-invalid={errors.password ? true : undefined}
							/>
						</div>
						<button
							type="button"
							onClick={() => {/* TODO: Implementar recuperación de contraseña */}}
							className="login-form__forgot-password"
						>
							¿Olvidaste tu contraseña?
						</button>
						{errors.password && (
							<div className="login-form__error-message">
								<svg className="login-form__error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="login-form__error-text">
									{errors.password}
								</p>
							</div>
						)}
					</div>

					<Button type="submit" variant="default" size="lg" className="login-form__submit-button">
						Iniciar Sesión
					</Button>
				</form>

				<div className="login-form__divider-wrapper">
					<div className="login-form__divider">
						<div className="login-form__divider-line">
							<div className="login-form__divider-line-inner"></div>
						</div>
						<div className="login-form__divider-text">
							<span className="login-form__divider-text-inner">o continúa con</span>
						</div>
					</div>
					<Button
						variant="outline"
						onClick={onGuestMode}
						className="login-form__guest-button"
					>
						<PersonIcon className="w-4 h-4" />
						Modo Invitado
					</Button>
					<p className="login-form__guest-note">
						Los invitados tienen acceso limitado
					</p>
				</div>

				<div className="login-form__register-wrapper">
					<button
						type="button"
						onClick={onRegister}
						className="login-form__register-button"
					>
						¿No tienes cuenta? <span className="login-form__register-link">Regístrate</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

