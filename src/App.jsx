import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import './styles/pages/App.css';

function App() {
	const [user, setUser] = useState(null);

	const handleAuthSuccess = (authData) => {
		setUser(authData);
		console.log('Usuario autenticado:', authData);
	};

	if (!user) {
		return <LoginPage onAuthSuccess={handleAuthSuccess} />;
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
					onClick={() => setUser(null)}
					className="app__logout-button"
				>
					Cerrar Sesión
				</button>
			</div>
		</div>
	);
}

export default App;
