import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { LobbyPage } from '../features/auth/pages/LobbyPage';
import { ProfilePage } from '../features/profile/pages/ProfilePage';
import { SetPasswordPage } from '../features/auth/pages/SetPasswordPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Función auxiliar para decidir a dónde enviar al usuario en la ruta raíz ("/")
const getHomeRedirectElement = (user, userNeedsPassword) => {
	// Usuario autenticado que todavía debe crear contraseña (Google sin password)
	if (user && userNeedsPassword) {
		return <Navigate to="/set-password" replace />;
	}

	// Cualquier usuario autenticado (incluye invitados)
	if (user) {
		return <Navigate to="/profile" replace />;
	}

	// Usuario no autenticado
	return <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
	const { user, loading, userNeedsPassword } = useAuth();

	if (loading) {
		return (
			<div className="app">
				<div className="app__content">
					<p>Cargando...</p>
				</div>
			</div>
		);
	}

	return (
		<Routes>
			{/* Ruta raíz - decide a dónde ir según el estado de autenticación */}
			<Route path="/" element={getHomeRedirectElement(user, userNeedsPassword)} />

			{/* Rutas públicas */}
			<Route
				path="/login"
				element={
					<PublicRoute>
						<LoginPage />
					</PublicRoute>
				}
			/>

			<Route
				path="/verify"
				element={
					<PublicRoute>
						<LobbyPage />
					</PublicRoute>
				}
			/>

			{/* Ruta para establecer contraseña (solo usuarios Google sin contraseña) */}
			<Route
				path="/set-password"
				element={
					user && userNeedsPassword ? (
						<SetPasswordPage />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>

			{/* Rutas protegidas */}
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>

			{/* Ruta 404 - cualquier ruta no definida */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

