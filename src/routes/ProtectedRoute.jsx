import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

/**
 * Componente para proteger rutas que requieren autenticación
 */
export const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="app">
				<div className="app__content">
					<p>Cargando...</p>
				</div>
			</div>
		);
	}

	// Si no hay usuario, redirigir a login
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Los invitados pueden acceder pero con funcionalidades limitadas
	// (esto se maneja en los componentes individuales)
	return children;
};

