import { useState, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';
import { AnimatedText } from '../ui/AnimatedText';
import { cn } from '../../lib/utils';

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
	const phrases = useMemo(() => ['¿Estás', 'listo?', '¿Te', 'atreves?', 'Muestra', 'lo', 'que', 'sabes'], []);

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
			<div className="flex flex-col items-center w-full">
				<Logo />
				
				<div className="w-full text-center mb-6 sm:mb-8">
					<AnimatedText
						phrases={phrases}
						className="mb-2 sm:mb-3"
					/>
					<p className="text-xs sm:text-sm font-medium text-gray-600">Bienvenido de vuelta</p>
				</div>

				<form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
				<InputField
					label="Correo electrónico"
					type="email"
					placeholder="tu@email.com"
					icon={EnvelopeIcon}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>

					<div>
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2 sm:mb-2.5">
							<Label htmlFor="password" className="text-xs sm:text-sm font-semibold text-gray-700">Contraseña</Label>
							<button
								type="button"
								onClick={() => {/* TODO: Implementar recuperación de contraseña */}}
								className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors text-left sm:text-right"
							>
								¿Olvidaste tu contraseña?
							</button>
						</div>
						<div className="relative">
							<LockIcon className="absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
							<Input
								id="password"
								type="password"
								placeholder="******"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={cn(
									"h-10 sm:h-11 pl-9 sm:pl-11 text-sm sm:text-base transition-all",
									errors.password 
										? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
										: "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
								)}
								aria-invalid={errors.password ? true : undefined}
							/>
						</div>
						{errors.password && (
							<p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{errors.password}</p>
						)}
					</div>

					<Button type="submit" variant="default" className="w-full mt-4 sm:mt-6 h-10 sm:h-11 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-shadow">
						Iniciar Sesión
					</Button>
				</form>

				<div className="w-full mt-6 sm:mt-8">
					<div className="relative mb-4 sm:mb-5">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200"></div>
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-white px-3 text-gray-500 font-medium">o continúa con</span>
						</div>
					</div>
					<Button
						variant="outline"
						onClick={onGuestMode}
						className="w-full h-10 sm:h-11 border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base"
					>
						<PersonIcon className="w-4 h-4" />
						Modo Invitado
					</Button>
					<p className="text-xs text-gray-500 mt-2 sm:mt-3 text-center font-medium">
						Los invitados tienen acceso limitado
					</p>
				</div>

				<div className="w-full text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
					<button
						type="button"
						onClick={onRegister}
						className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
					>
						¿No tienes cuenta? <span className="underline underline-offset-2">Regístrate</span>
					</button>
				</div>
			</div>
		</Modal>
	);
};

