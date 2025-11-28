import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { InputField } from '../../../shared/components/ui/InputField';
import { setPasswordForGoogleUser } from '../../../../backend/services/user.js';
import { Modal } from '../../../shared/components/ui/Modal';
import { useAuth } from '../../../shared/context/AuthContext';
import '../../../styles/pages/SetPasswordPage.css';

const LockIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
);

export const SetPasswordPage = () => {
	const navigate = useNavigate();
	const { user, updateUser } = useAuth();

	// Si no hay usuario, redirigir al login
	if (!user) {
		navigate('/login');
		return null;
	}
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const validateForm = () => {
		const newErrors = {};

		if (!password.trim()) {
			newErrors.password = 'La contraseña es requerida';
		} else if (password.length < 6) {
			newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
		}

		if (!confirmPassword.trim()) {
			newErrors.confirmPassword = 'Por favor confirma tu contraseña';
		} else if (password !== confirmPassword) {
			newErrors.confirmPassword = 'Las contraseñas no coinciden';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		const result = await setPasswordForGoogleUser(password);

		if (!result.success) {
			setError(result.error || 'Error al establecer la contraseña');
			setLoading(false);
			return;
		}

		// Actualizar usuario en el contexto
		const updatedUser = {
			...user,
			user_metadata: { ...user.user_metadata, has_password: true }
		};
		updateUser(updatedUser);
		
		// Redirigir al perfil
		navigate('/profile');
		setLoading(false);
	};

	return (
		<Modal>
			<div className="set-password-page">
				<div className="set-password-page__header">
					<div className="set-password-page__icon">
						<LockIcon className="w-12 h-12" />
					</div>
					<h1 className="set-password-page__title">
						Establece tu Contraseña
					</h1>
					<p className="set-password-page__subtitle">
						Para poder acceder con tu correo y contraseña en el futuro, 
						por favor crea una contraseña para tu cuenta.
					</p>
					<p className="set-password-page__email">
						{user.email}
					</p>
				</div>

				{error && (
					<div className="set-password-page__error">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="set-password-page__form">
					<InputField
						label="Nueva Contraseña"
						type="password"
						placeholder="Mínimo 6 caracteres"
						icon={LockIcon}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={errors.password}
					/>

					<InputField
						label="Confirmar Contraseña"
						type="password"
						placeholder="Confirma tu contraseña"
						icon={LockIcon}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						error={errors.confirmPassword}
					/>

					<Button
						type="submit"
						variant="default"
						size="lg"
						className="set-password-page__submit-button"
						disabled={loading}
					>
						{loading ? 'Estableciendo contraseña...' : 'Establecer Contraseña'}
					</Button>
				</form>
			</div>
		</Modal>
	);
};

