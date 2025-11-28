import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

/**
 * Componente para rutas públicas que redirigen si ya estás autenticado
 */
export const PublicRoute = ({ children }) => {
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

	// Si necesita establecer contraseña, redirigir a esa página
	if (user && userNeedsPassword) {
		return <Navigate to="/set-password" replace />;
	}

	// Si ya está autenticado (pero no es invitado), redirigir al perfil
	// Los invitados pueden acceder a rutas públicas si quieren cambiar de modo
	if (user && user.type !== 'guest') {
		return <Navigate to="/profile" replace />;
	}

	return children;
};

