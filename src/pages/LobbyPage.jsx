import { useState } from 'react';
import { VerificationCode } from '../components/auth/VerificationCode';
import { supabase } from '../lib/supabase';

export const LobbyPage = ({ email, userData, onVerificationSuccess, onBack }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleVerify = async (code) => {
		setLoading(true);
		setError(null);

		try {
			// Verificar el código OTP
			const { data, error: verifyError } = await supabase.auth.verifyOtp({
				token: code,
				type: 'email',
				email: email
			});

			if (verifyError) {
				setError(verifyError.message || 'Código inválido. Por favor, intenta de nuevo.');
				setLoading(false);
				return;
			}

			// Si hay contraseña, actualizarla después de verificar
			if (data.user && userData?.password) {
				const { error: updateError } = await supabase.auth.updateUser({
					password: userData.password,
					data: {
						name: userData.name
					}
				});

				if (updateError) {
					setError(updateError.message || 'Error al establecer la contraseña');
					setLoading(false);
					return;
				}
			}

			if (data.user) {
				onVerificationSuccess({
					type: 'user',
					email: data.user.email,
					id: data.user.id,
					name: userData?.name,
					...data.user
				});
			}
		} catch (err) {
			setError(err.message || 'Error al verificar el código');
			setLoading(false);
		}
	};

	const handleResend = async () => {
		setLoading(true);
		setError(null);

		try {
			// Reenviar código OTP (no Magic Link)
			const { error: resendError } = await supabase.auth.signInWithOtp({
				email: email,
				options: {
					data: {
						name: userData?.name,
					},
					shouldCreateUser: true
					// No especificar emailRedirectTo para que envíe código OTP
				}
			});

			if (resendError) {
				setError(resendError.message || 'Error al reenviar el código');
			}
		} catch (err) {
			setError(err.message || 'Error al reenviar el código');
		} finally {
			setLoading(false);
		}
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

