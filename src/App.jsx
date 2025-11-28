import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import './styles/pages/App.css';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
