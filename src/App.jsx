import { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { LobbyPage } from './pages/LobbyPage';
import { supabase } from './lib/supabase';
import './styles/pages/App.css';

function App() {
	const [user, setUser] = useState(null);
	const [verificationEmail, setVerificationEmail] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Verificar sesión existente al cargar
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session?.user) {
				setUser({
					type: 'user',
					email: session.user.email,
					id: session.user.id,
					...session.user
				});
			}
			setLoading(false);
		});

		// Escuchar cambios en la autenticación (para OAuth callback)
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				setUser({
					type: 'user',
					email: session.user.email,
					id: session.user.id,
					...session.user
				});
			} else {
				setUser(null);
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

	const handleBackToLogin = () => {
		setVerificationEmail(null);
	};

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setVerificationEmail(null);
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
		<div className="app">
			<div className="app__content">
				<h1 className="app__title">
					Bienvenido a Quiz Royal
				</h1>
				<p className="app__message">
					{user.type === 'guest' 
						? 'Estás en modo invitado (acceso limitado)'
						: `Hola, ${user.name || user.email}!`
					}
				</p>
				<button
					onClick={handleLogout}
					className="app__logout-button"
				>
					Cerrar Sesión
				</button>
			</div>
		</div>
	);
}

export default App;
