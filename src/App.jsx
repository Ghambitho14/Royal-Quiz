import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';

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
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">
					Bienvenido a Quiz Royal
				</h1>
				<p className="text-gray-600 mb-4">
					{user.type === 'guest' 
						? 'Estás en modo invitado (acceso limitado)'
						: `Hola, ${user.name || user.email}!`
					}
				</p>
				<button
					onClick={() => setUser(null)}
					className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
				>
					Cerrar Sesión
				</button>
			</div>
		</div>
	);
}

export default App;
