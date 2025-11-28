import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { VerificationCode } from '../components/VerificationCode';
import { verifyOTP, registerWithOTP } from '../../../../backend/services/auth.js';
import { updateUserPassword } from '../../../../backend/services/user.js';
import { useAuth } from '../../../shared/context/AuthContext';

export const LobbyPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { updateUser } = useAuth();
	
	// Obtener email de query params o localStorage
	const emailFromParams = searchParams.get('email');
	const [email, setEmail] = useState(emailFromParams || '');
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Si no hay email en params, intentar obtenerlo de localStorage
		if (!email) {
			const pending = localStorage.getItem('pendingVerification');
			if (pending) {
				const data = JSON.parse(pending);
				setEmail(data.email);
				setUserData(data);
			}
		} else if (!userData) {
			// Si hay email en params pero no userData, intentar obtenerlo de localStorage
			const pending = localStorage.getItem('pendingVerification');
			if (pending) {
				const data = JSON.parse(pending);
				if (data.email === email) {
					setUserData(data);
				}
			}
		}
	}, [email, userData]);

	const handleVerify = async (code) => {
		setLoading(true);
		setError(null);

		const verifyResult = await verifyOTP(email, code);

		if (!verifyResult.success) {
			setError(verifyResult.error || 'Código inválido. Por favor, intenta de nuevo.');
			setLoading(false);
			return;
		}

		// Si hay contraseña, actualizarla después de verificar
		if (verifyResult.user && userData?.password) {
			const updateResult = await updateUserPassword(userData.password);

			if (!updateResult.success) {
				setError(updateResult.error || 'Error al establecer la contraseña');
				setLoading(false);
				return;
			}
		}

		if (verifyResult.user) {
			// Limpiar datos pendientes
			localStorage.removeItem('pendingVerification');
			
			const userDataResult = {
				type: 'user',
				email: verifyResult.user.email,
				id: verifyResult.user.id,
				name: userData?.name,
				...verifyResult.user
			};
			
			updateUser(userDataResult);
			navigate('/profile');
		}
		
		setLoading(false);
	};

	const handleResend = async () => {
		setLoading(true);
		setError(null);

		const result = await registerWithOTP(email, userData?.name);

		if (!result.success) {
			setError(result.error || 'Error al reenviar el código');
		}
		
		setLoading(false);
	};

	if (!email) {
		return (
			<div className="app">
				<div className="app__content">
					<p>No se encontró información de verificación. Por favor, regístrate nuevamente.</p>
					<button onClick={() => navigate('/login')}>Volver al Login</button>
				</div>
			</div>
		);
	}

	return (
		<VerificationCode
			email={email}
			onVerify={handleVerify}
			onResend={handleResend}
			loading={loading}
			error={error}
		/>
	);
};

