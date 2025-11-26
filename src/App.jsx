import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { LobbyPage } from './pages/LobbyPage';
import { ProfilePage } from './pages/ProfilePage';
import { SetPasswordPage } from './pages/SetPasswordPage';
import { supabase } from './lib/supabase';
import { getCurrentSession, onAuthStateChange, logout } from '../backend/services/auth.js';
import { needsPassword } from '../backend/services/user.js';
import './styles/pages/App.css';

function App() {
	const [user, setUser] = useState(null);
	const [verificationEmail, setVerificationEmail] = useState(null);
	const [needsPassword, setNeedsPassword] = useState(false);
	const [loading, setLoading] = useState(true);

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
					setNeedsPassword(true);
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
						setNeedsPassword(true);
						setUser(userData);
					} else {
						setNeedsPassword(false);
						setUser(userData);
					}
				} else {
					setUser(userData);
					setNeedsPassword(false);
				}
			} else {
				setUser(null);
				setNeedsPassword(false);
			}
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleAuthSuccess = (authData) => {
		setUser(authData);
		setVerificationEmail(null);
		console.log('Usuario autenticado:', authData);
	};

	const handleVerificationNeeded = (verificationData) => {
		setVerificationEmail(verificationData);
	};

	const handleVerificationSuccess = (authData) => {
		setUser(authData);
		setVerificationEmail(null);
		console.log('Usuario verificado:', authData);
	};

	const handlePasswordSet = (authData) => {
		setUser(authData);
		setNeedsPassword(false);
		console.log('Contraseña establecida:', authData);
	};

	const handleBackToLogin = () => {
		setVerificationEmail(null);
	};

	const handleLogout = async () => {
		await logout();
		setUser(null);
		setVerificationEmail(null);
		setNeedsPassword(false);
	};

	if (loading) {
		return (
			<div className="app">
				<div className="app__content">
					<p>Cargando...</p>
				</div>
			</div>
		);
	}

	// Si necesita establecer contraseña (usuario de Google nuevo)
	if (user && needsPassword) {
		return (
			<SetPasswordPage
				user={user}
				onPasswordSet={handlePasswordSet}
			/>
		);
	}

	// Si necesita verificación, mostrar el lobby
	if (verificationEmail) {
		const email = typeof verificationEmail === 'string' ? verificationEmail : verificationEmail.email;
		return (
			<LobbyPage
				email={email}
				userData={typeof verificationEmail === 'object' ? verificationEmail : null}
				onVerificationSuccess={handleVerificationSuccess}
				onBack={handleBackToLogin}
			/>
		);
	}

	// Si no hay usuario, mostrar login
	if (!user) {
		return (
			<LoginPage
				onAuthSuccess={handleAuthSuccess}
				onVerificationNeeded={handleVerificationNeeded}
			/>
		);
	}

	return (
		<ProfilePage 
			user={user} 
			onLogout={handleLogout}
		/>
	);
}

export default App;
