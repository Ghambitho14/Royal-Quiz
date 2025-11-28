import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentSession, onAuthStateChange, logout } from '../../../backend/services/auth.js';
import { needsPassword } from '../../../backend/services/user.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userNeedsPassword, setUserNeedsPassword] = useState(false);

	useEffect(() => {
		// Verificar sesión existente al cargar
		getCurrentSession().then((result) => {
			if (result.success && result.session?.user) {
				const userData = {
					type: 'user',
					email: result.session.user.email,
					id: result.session.user.id,
					...result.session.user
				};

				// Verificar si es un usuario de Google que necesita establecer contraseña
				if (needsPassword(result.session.user)) {
					setUserNeedsPassword(true);
				}

				setUser(userData);
			}
			setLoading(false);
		});

		// Escuchar cambios en la autenticación (para OAuth callback)
		const { data: { subscription } } = onAuthStateChange(async (event, session) => {
			if (session?.user) {
				const userData = {
					type: 'user',
					email: session.user.email,
					id: session.user.id,
					...session.user
				};

				// Verificar si es un usuario de Google que necesita establecer contraseña
				if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
					if (needsPassword(session.user)) {
						setUserNeedsPassword(true);
						setUser(userData);
					} else {
						setUserNeedsPassword(false);
						setUser(userData);
					}
				} else {
					setUser(userData);
					setUserNeedsPassword(false);
				}
			} else {
				setUser(null);
				setUserNeedsPassword(false);
			}
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleLogout = async () => {
		await logout();
		setUser(null);
		setUserNeedsPassword(false);
	};

	const updateUser = (userData) => {
		setUser(userData);
	};

	const value = {
		user,
		loading,
		userNeedsPassword,
		isAuthenticated: !!user && user.type !== 'guest',
		isGuest: user?.type === 'guest',
		logout: handleLogout,
		updateUser
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe ser usado dentro de un AuthProvider');
	}
	return context;
};

