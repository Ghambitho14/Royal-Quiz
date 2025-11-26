import { useState } from 'react';
import { VerificationCode } from '../components/auth/VerificationCode';
import { verifyOTP, registerWithOTP } from '../../backend/services/auth.js';
import { updateUserPassword } from '../../backend/services/user.js';

export const LobbyPage = ({ email, userData, onVerificationSuccess, onBack }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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
			onVerificationSuccess({
				type: 'user',
				email: verifyResult.user.email,
				id: verifyResult.user.id,
				name: userData?.name,
				...verifyResult.user
			});
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

