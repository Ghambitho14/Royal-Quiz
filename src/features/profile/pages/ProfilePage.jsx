import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { updateUserName, updateUserPassword, hasGoogleLinked } from '../../../../backend/services/user.js';
import { linkGoogleAccount } from '../../../../backend/services/auth.js';
import { validatePassword } from '../../../../backend/utils/helpers.js';
import { useAuth } from '../../../shared/context/AuthContext';
import '../../../styles/pages/ProfilePage.css';

// Iconos SVG
const TrophyIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
	</svg>
);

const StarIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
	</svg>
);

const MedalIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
	</svg>
);

const SettingsIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
	</svg>
);

const LockIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
);

const UserIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
	</svg>
);

const XIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
	</svg>
);

const LogoutIcon = ({ className = '' }) => (
	<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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

export const ProfilePage = () => {
	const navigate = useNavigate();
	const { user, logout, updateUser } = useAuth();

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};
	const [showOptions, setShowOptions] = useState(false);
	const [showChangeName, setShowChangeName] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [editedName, setEditedName] = useState('');
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [linkingGoogle, setLinkingGoogle] = useState(false);

	// Datos del usuario (mock por ahora, se pueden obtener de la BD)
	const userLevel = user?.user_metadata?.level || 1;
	const userRanking = user?.user_metadata?.ranking || '#---';
	const userPoints = user?.user_metadata?.points || 0;
	const achievements = user?.user_metadata?.achievements || [];

	// Logros disponibles (mock)
	const availableAchievements = [
		{ id: 1, name: 'Primer Quiz', icon: '🎯', unlocked: achievements.includes(1) || false },
		{ id: 2, name: '10 Quizzes', icon: '🏆', unlocked: achievements.includes(2) || false },
		{ id: 3, name: 'Perfecto', icon: '⭐', unlocked: achievements.includes(3) || false },
		{ id: 4, name: 'Racha de 5', icon: '🔥', unlocked: achievements.includes(4) || false },
		{ id: 5, name: 'Maestro', icon: '👑', unlocked: achievements.includes(5) || false },
		{ id: 6, name: 'Velocista', icon: '⚡', unlocked: achievements.includes(6) || false }
	];

	const getUserDisplayName = () => {
		if (user?.type === 'guest') {
			return 'Invitado';
		}
		return user?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuario';
	};

	const getUserEmail = () => {
		if (user?.type === 'guest') {
			return 'Modo invitado (acceso limitado)';
		}
		return user?.email || 'No disponible';
	};

	const getInitials = () => {
		const name = getUserDisplayName();
		if (name === 'Invitado') return 'I';
		const parts = name.split(' ');
		if (parts.length >= 2) {
			return (parts[0][0] + parts[1][0]).toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	const handleOpenOptions = () => {
		setShowOptions(true);
		setError('');
		setSuccess('');
	};

	const handleCloseOptions = () => {
		setShowOptions(false);
		setShowChangeName(false);
		setShowChangePassword(false);
		setEditedName('');
		setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
		setError('');
		setSuccess('');
		setLinkingGoogle(false);
	};

	const handleChangeName = () => {
		setShowChangeName(true);
		setEditedName(getUserDisplayName());
		setError('');
		setSuccess('');
	};

	const handleSaveName = async () => {
		if (user?.type === 'guest') {
			setError('Los invitados no pueden cambiar su nombre');
			return;
		}

		const trimmedName = editedName.trim();
		if (!trimmedName) {
			setError('El nombre no puede estar vacío');
			return;
		}

		if (trimmedName.length > 15) {
			setError('El nombre no puede exceder 15 caracteres');
			return;
		}

		const result = await updateUserName(editedName.trim());

		if (!result.success) {
			setError(result.error || 'Error al actualizar el nombre');
		} else {
			user.user_metadata = { ...user.user_metadata, name: editedName.trim() };
			setSuccess('Nombre actualizado correctamente');
			setTimeout(() => {
				setShowChangeName(false);
				setSuccess('');
			}, 1500);
		}
	};

	const handleChangePassword = () => {
		setShowChangePassword(true);
		setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
		setError('');
		setSuccess('');
		setLoading(false);
	};

	const handleSavePassword = async () => {
		if (user?.type === 'guest') {
			setError('Los invitados no pueden cambiar su contraseña');
			return;
		}

		// Prevenir múltiples clics
		if (loading) {
			return;
		}

		setLoading(true);
		setError('');
		setSuccess('');

		// Validar que se ingrese la contraseña actual
		if (!passwordData.currentPassword) {
			setError('Debes ingresar tu contraseña actual');
			setLoading(false);
			return;
		}

		// Validar nueva contraseña con política de seguridad
		const passwordValidation = validatePassword(passwordData.newPassword);
		if (!passwordValidation.isValid) {
			setError(passwordValidation.error);
			setLoading(false);
			return;
		}

		// Validar que la nueva contraseña sea diferente a la actual
		if (passwordData.currentPassword === passwordData.newPassword) {
			setError('La nueva contraseña debe ser diferente a la actual');
			setLoading(false);
			return;
		}

		// Validar confirmación
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			setError('Las contraseñas no coinciden');
			setLoading(false);
			return;
		}

		try {
			// Actualizar contraseña (el servicio validará la contraseña actual)
			const userEmail = user.email;
			if (!userEmail) {
				setError('No se pudo obtener el email del usuario');
				setLoading(false);
				return;
			}

			const result = await updateUserPassword(
				passwordData.newPassword,
				passwordData.currentPassword,
				userEmail
			);

			if (!result.success) {
				setError(result.error || 'Error al actualizar la contraseña');
				setLoading(false);
			} else {
				setSuccess('Contraseña actualizada correctamente');
				setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
				
				// Actualizar el contexto con el usuario actualizado
				if (result.user) {
					const updatedUserData = {
						...user,
						...result.user,
						user_metadata: {
							...user.user_metadata,
							...result.user.user_metadata,
							has_password: true
						}
					};
					updateUser(updatedUserData);
				}
				
				setTimeout(() => {
					setShowChangePassword(false);
					setSuccess('');
					setLoading(false);
				}, 1500);
			}
		} catch (err) {
			console.error('Error al actualizar contraseña:', err);
			setError('Error inesperado al actualizar la contraseña');
			setLoading(false);
		}
	};

	const handleLinkGoogle = async () => {
		if (user?.type === 'guest') {
			setError('Los invitados no pueden vincular su cuenta con Google');
			return;
		}

		// Verificar si ya tiene Google vinculado
		if (hasGoogleLinked(user)) {
			setError('Tu cuenta ya está vinculada con Google');
			return;
		}

		// Prevenir múltiples clics
		if (linkingGoogle) {
			return;
		}

		setLinkingGoogle(true);
		setError('');
		setSuccess('');

		try {
			const result = await linkGoogleAccount(window.location.origin);

			if (!result.success) {
				setError(result.error || 'Error al vincular cuenta con Google');
				setLinkingGoogle(false);
			} else {
				// Si hay URL, redirigir a Google para autenticación
				if (result.url) {
					window.location.href = result.url;
				} else {
					setSuccess('Cuenta vinculada con Google correctamente');
					setLinkingGoogle(false);
					
					// Recargar la sesión para obtener las identidades actualizadas
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				}
			}
		} catch (err) {
			console.error('Error al vincular cuenta con Google:', err);
			setError('Error inesperado al vincular la cuenta');
			setLinkingGoogle(false);
		}
	};

	if (!user) {
		return null;
	}

	return (
		<div className="profile-page">
			<div className="profile-page__container">
				{/* Header Principal */}
				<div className="profile-page__header">
					<div className="profile-page__header-content">
						{/* Avatar */}
						<div className="profile-page__avatar-wrapper">
							<div className="profile-page__avatar">
								{user.user_metadata?.avatar_url || user.avatar_url ? (
									<img 
										src={user.user_metadata?.avatar_url || user.avatar_url} 
										alt={getUserDisplayName()}
										className="profile-page__avatar-image"
									/>
								) : (
									<div className="profile-page__avatar-initials">
										{getInitials()}
									</div>
								)}
							</div>
						</div>

						{/* Información Principal */}
						<div className="profile-page__main-info">
							<h1 className="profile-page__name">{getUserDisplayName()}</h1>
							
							<div className="profile-page__stats-row">
								<div className="profile-page__stat-badge">
									<StarIcon className="w-5 h-5" />
									<span className="profile-page__stat-label">Nivel</span>
									<span className="profile-page__stat-value">{userLevel}</span>
								</div>
								<div className="profile-page__stat-badge">
									<TrophyIcon className="w-5 h-5" />
									<span className="profile-page__stat-label">Ranking</span>
									<span className="profile-page__stat-value">{userRanking}</span>
								</div>
							</div>

							<p className="profile-page__email">{getUserEmail()}</p>
						</div>

						{/* Botón de Opciones */}
						<button
							onClick={handleOpenOptions}
							className="profile-page__options-button"
							title="Opciones"
						>
							<SettingsIcon className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Logros Desbloqueados */}
				<div className="profile-page__section">
					<h2 className="profile-page__section-title">
						<MedalIcon className="w-5 h-5" />
						Logros Desbloqueados
					</h2>
					<div className="profile-page__achievements">
						{availableAchievements.map((achievement) => (
							<div
								key={achievement.id}
								className={`profile-page__achievement ${achievement.unlocked ? 'profile-page__achievement--unlocked' : 'profile-page__achievement--locked'}`}
								title={achievement.name}
							>
								<div className="profile-page__achievement-icon">
									{achievement.unlocked ? achievement.icon : '🔒'}
								</div>
								<p className="profile-page__achievement-name">{achievement.name}</p>
							</div>
						))}
					</div>
				</div>

				{/* Botón Cerrar Sesión */}
				<div className="profile-page__actions">
					<Button
						onClick={handleLogout}
						variant="outline"
						size="lg"
						className="profile-page__logout-button"
					>
						<LogoutIcon className="w-4 h-4" />
						Cerrar Sesión
					</Button>
				</div>
			</div>

			{/* Modal de Opciones */}
			{showOptions && (
				<div className="profile-page__modal-overlay" onClick={handleCloseOptions}>
					<div className="profile-page__modal" onClick={(e) => e.stopPropagation()}>
						<div className="profile-page__modal-header">
							<h2 className="profile-page__modal-title">Opciones</h2>
							<button
								onClick={handleCloseOptions}
								className="profile-page__modal-close"
							>
								<XIcon className="w-5 h-5" />
							</button>
						</div>

						<div className="profile-page__modal-content">
							{!showChangeName && !showChangePassword && (
								<>
									{error && <div className="profile-page__message profile-page__message--error">{error}</div>}
									{success && <div className="profile-page__message profile-page__message--success">{success}</div>}
									<div className="profile-page__options-list">
									<div className="profile-page__option-item">
										<div className="profile-page__option-info">
											<UserIcon className="w-5 h-5" />
											<div>
												<p className="profile-page__option-label">Nombre de Usuario</p>
												<p className="profile-page__option-value">{getUserDisplayName()}</p>
											</div>
										</div>
										<Button
											onClick={handleChangeName}
											variant="outline"
											size="sm"
										>
											Cambiar
										</Button>
									</div>

									<div className="profile-page__option-item">
										<div className="profile-page__option-info">
											<LockIcon className="w-5 h-5" />
											<div>
												<p className="profile-page__option-label">Contraseña</p>
												<p className="profile-page__option-value">••••••••</p>
											</div>
										</div>
										<Button
											onClick={handleChangePassword}
											variant="outline"
											size="sm"
										>
											Cambiar
										</Button>
									</div>

									<div className="profile-page__option-item profile-page__option-item--readonly">
										<div className="profile-page__option-info">
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
											<div>
												<p className="profile-page__option-label">Correo Electrónico</p>
												<p className="profile-page__option-value">{getUserEmail()}</p>
											</div>
										</div>
										<span className="profile-page__readonly-badge">Solo lectura</span>
									</div>

									<div className="profile-page__option-item">
										<div className="profile-page__option-info">
											<GoogleIcon className="w-5 h-5" />
											<div>
												<p className="profile-page__option-label">Cuenta de Google</p>
												<p className="profile-page__option-value">
													{hasGoogleLinked(user) ? 'Vinculada' : 'No vinculada'}
												</p>
											</div>
										</div>
										{hasGoogleLinked(user) ? (
											<span className="profile-page__readonly-badge">Vinculada</span>
										) : (
											<Button
												onClick={handleLinkGoogle}
												variant="outline"
												size="sm"
												disabled={linkingGoogle}
											>
												{linkingGoogle ? 'Vinculando...' : 'Vincular'}
											</Button>
										)}
									</div>
								</div>
								</>
							)}

							{/* Formulario Cambiar Nombre */}
							{showChangeName && (
								<div className="profile-page__form">
									<h3 className="profile-page__form-title">Cambiar Nombre de Usuario</h3>
									{error && <div className="profile-page__message profile-page__message--error">{error}</div>}
									{success && <div className="profile-page__message profile-page__message--success">{success}</div>}
									<div className="profile-page__form-field">
										<label className="profile-page__form-label">Nuevo Nombre</label>
										<input
											type="text"
											value={editedName}
											onChange={(e) => setEditedName(e.target.value)}
											className="profile-page__form-input"
											placeholder="Ingresa tu nuevo nombre (máx. 15 caracteres)"
											maxLength={15}
											autoFocus
										/>
									</div>
									<div className="profile-page__form-actions">
										<Button
											onClick={handleSaveName}
											variant="default"
											size="lg"
											className="profile-page__form-button"
										>
											Guardar
										</Button>
										<Button
											onClick={() => {
												setShowChangeName(false);
												setError('');
												setSuccess('');
											}}
											variant="outline"
											size="lg"
											className="profile-page__form-button"
										>
											Cancelar
										</Button>
									</div>
								</div>
							)}

							{/* Formulario Cambiar Contraseña */}
							{showChangePassword && (
								<div className="profile-page__form">
									<h3 className="profile-page__form-title">Cambiar Contraseña</h3>
									{error && <div className="profile-page__message profile-page__message--error">{error}</div>}
									{success && <div className="profile-page__message profile-page__message--success">{success}</div>}
									<div className="profile-page__form-field">
										<label className="profile-page__form-label">Contraseña Actual</label>
										<input
											type="password"
											value={passwordData.currentPassword}
											onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
											className="profile-page__form-input"
											placeholder="Ingresa tu contraseña actual"
											autoFocus
										/>
									</div>
									<div className="profile-page__form-field">
										<label className="profile-page__form-label">Nueva Contraseña</label>
										<input
											type="password"
											value={passwordData.newPassword}
											onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
											className="profile-page__form-input"
											placeholder="Mín. 8 caracteres, mayúscula, minúscula, número y símbolo"
										/>
									</div>
									<div className="profile-page__form-field">
										<label className="profile-page__form-label">Confirmar Contraseña</label>
										<input
											type="password"
											value={passwordData.confirmPassword}
											onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
											className="profile-page__form-input"
											placeholder="Confirma tu nueva contraseña"
										/>
									</div>
									<div className="profile-page__form-actions">
										<Button
											onClick={handleSavePassword}
											variant="default"
											size="lg"
											className="profile-page__form-button"
											disabled={loading}
										>
											{loading ? 'Guardando...' : 'Guardar'}
										</Button>
										<Button
											onClick={() => {
												setShowChangePassword(false);
												setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
												setError('');
												setSuccess('');
											}}
											variant="outline"
											size="lg"
											className="profile-page__form-button"
										>
											Cancelar
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

