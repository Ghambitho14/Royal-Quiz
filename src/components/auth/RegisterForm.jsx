import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';

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

const UserIcon = () => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
	</svg>
);

export const RegisterForm = ({ onRegister, onBackToLogin }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		
		if (!formData.name.trim()) {
			newErrors.name = 'El nombre es requerido';
		}
		
		if (!formData.email.trim()) {
			newErrors.email = 'El correo electrónico es requerido';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'El correo electrónico no es válido';
		}
		
		if (!formData.password.trim()) {
			newErrors.password = 'La contraseña es requerida';
		} else if (formData.password.length < 6) {
			newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
		}
		
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Las contraseñas no coinciden';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (field) => (e) => {
		setFormData(prev => ({
			...prev,
			[field]: e.target.value,
		}));
		setErrors(prev => ({
			...prev,
			[field]: '',
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onRegister(formData);
		}
	};

	return (
		<Modal>
			<Logo />
			
			<div className="mb-6">
				<h2 className="text-3xl font-bold text-gray-800 mb-1">Crear Cuenta</h2>
				<p className="text-gray-500">Únete a Quiz Royal</p>
			</div>

			<form onSubmit={handleSubmit} className="mb-4">
				<InputField
					label="Nombre completo"
					type="text"
					placeholder="Tu nombre"
					icon={UserIcon}
					value={formData.name}
					onChange={handleChange('name')}
					error={errors.name}
				/>

				<InputField
					label="Correo electrónico"
					type="email"
					placeholder="tu@email.com"
					icon={EnvelopeIcon}
					value={formData.email}
					onChange={handleChange('email')}
					error={errors.email}
				/>

				<InputField
					label="Contraseña"
					type="password"
					placeholder="******"
					icon={LockIcon}
					value={formData.password}
					onChange={handleChange('password')}
					error={errors.password}
				/>

				<InputField
					label="Confirmar contraseña"
					type="password"
					placeholder="******"
					icon={LockIcon}
					value={formData.confirmPassword}
					onChange={handleChange('confirmPassword')}
					error={errors.confirmPassword}
				/>

				<Button type="submit" variant="primary">
					Registrarse
				</Button>
			</form>

			<div className="text-center">
				<button
					type="button"
					onClick={onBackToLogin}
					className="text-sm text-primary-blue hover:underline"
				>
					¿Ya tienes cuenta? Inicia sesión
				</button>
			</div>
		</Modal>
	);
};

