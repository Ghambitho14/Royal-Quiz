import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import { AnimatedText } from '../ui/AnimatedText';

const EnvelopeIcon = () => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
	</svg>
);

const LockIcon = () => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
);

const PersonIcon = () => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
	</svg>
);

export const LoginForm = ({ onLogin, onRegister, onGuestMode }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

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
			<Logo />
			
			<div className="mb-6">
				<AnimatedText
					phrases={['¿Estás', 'listo?', '¿Te', 'atreves?', 'Muestra', 'lo', 'que', 'sabes']}
					className="text-2xl font-bold text-gray-800 mb-2"
				/>
				<p className="text-gray-500 text-sm">Bienvenido de vuelta</p>
			</div>

			<form onSubmit={handleSubmit} className="mb-4">
				<InputField
					label="Correo electrónico"
					type="email"
					placeholder="tu@email.com"
					icon={EnvelopeIcon}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={errors.email}
				/>

				<div className="mb-4">
					<div className="flex items-center justify-between mb-2">
						<label className="block text-sm font-medium text-gray-700">
							Contraseña
						</label>
						<button
							type="button"
							onClick={() => {/* TODO: Implementar recuperación de contraseña */}}
							className="text-sm text-primary-blue hover:underline"
						>
							¿Olvidaste tu contraseña?
						</button>
					</div>
					<div className="relative">
						<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
							<LockIcon className="w-5 h-5" />
						</div>
						<input
							type="password"
							placeholder="******"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`
								w-full px-4 py-3 pl-10 rounded-lg border border-gray-300
								bg-gray-50 focus:bg-white focus:outline-none focus:ring-2
								focus:ring-primary-blue focus:border-transparent
								transition-all duration-200
								${errors.password ? 'border-red-500 focus:ring-red-500' : ''}
							`}
						/>
					</div>
					{errors.password && (
						<p className="mt-1 text-sm text-red-500">{errors.password}</p>
					)}
				</div>

				<Button type="submit" variant="primary">
					Iniciar Sesión
				</Button>
			</form>

			<div className="text-center mb-4">
				<div className="relative mb-3">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-white px-2 text-gray-500">o continúa con</span>
					</div>
				</div>
				<Button
					variant="secondary"
					onClick={onGuestMode}
					icon={PersonIcon}
				>
					Modo Invitado
				</Button>
				<p className="text-xs text-gray-500 mt-2">
					Los invitados tienen acceso limitado
				</p>
			</div>

			<div className="text-center">
				<button
					type="button"
					onClick={onRegister}
					className="text-sm text-primary-blue hover:underline"
				>
					¿No tienes cuenta? Regístrate
				</button>
			</div>
		</Modal>
	);
};

