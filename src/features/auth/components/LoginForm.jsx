import { useState, useMemo, useRef } from 'react';
import { Modal } from '../../../shared/components/ui/Modal';
import { Logo } from '../../../shared/components/ui/Logo';
import { InputField } from '../../../shared/components/ui/InputField';
import { Button } from '../../../shared/components/ui/Button';
import { Label } from '../../../shared/components/ui/Label';
import { Input } from '../../../shared/components/ui/Input';
import { AnimatedText } from '../../../shared/components/ui/AnimatedText';
import { cn } from '../../../lib/utils';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import '../../../styles/components/Login/LoginForm.css';

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

const GoogleIcon = ({ className = '' }) => (
	<svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
		<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
		<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
		<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
	</svg>
);

export const LoginForm = ({ onLogin, onRegister, onGuestMode, onGoogleLogin, loading = false }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [captchaToken, setCaptchaToken] = useState(null);
	const captchaRef = useRef(null);
	
	// Obtener el site key de hCaptcha desde las variables de entorno
	// Si no está configurado, usar una clave de prueba (10000000-ffff-ffff-ffff-000000000001)
	const hcaptchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';
	
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

	const handleCaptchaVerify = (token) => {
		setCaptchaToken(token);
		setErrors(prev => {
			const newErrors = { ...prev };
			delete newErrors.captcha;
			return newErrors;
		});
	};

	const handleCaptchaError = (error) => {
		console.error('Error de captcha:', error);
		setCaptchaToken(null);
		setErrors(prev => ({
			...prev,
			captcha: 'Error en la verificación de seguridad. Por favor, intenta de nuevo.'
		}));
	};

	const handleCaptchaExpire = () => {
		setCaptchaToken(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Validar captcha si está habilitado
		if (!captchaToken && hcaptchaSiteKey && hcaptchaSiteKey !== '10000000-ffff-ffff-ffff-000000000001') {
			setErrors(prev => ({
				...prev,
				captcha: 'Por favor, completa la verificación de seguridad'
			}));
			return;
		}
		
		if (validateForm()) {
			onLogin({ 
				email, 
				password,
				captchaToken: captchaToken || undefined
			});
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

					{/* Componente de Captcha */}
					<div className="login-form__captcha-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
						<HCaptcha
							sitekey={hcaptchaSiteKey}
							onVerify={handleCaptchaVerify}
							onError={handleCaptchaError}
							onExpire={handleCaptchaExpire}
							ref={captchaRef}
						/>
						{errors.captcha && (
							<p className="login-form__error" style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
								{errors.captcha}
							</p>
						)}
					</div>

					<Button 
						type="submit" 
						variant="default" 
						size="lg" 
						className="login-form__submit-button"
						disabled={loading}
					>
						{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
						onClick={onGoogleLogin}
						className="login-form__google-button"
						disabled={loading}
					>
						<GoogleIcon className="w-4 h-4" />
						Continuar con Google
					</Button>
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

