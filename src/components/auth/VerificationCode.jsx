import { useState } from 'react';
import { Modal } from '../ui/Login/Modal';
import { Logo } from '../ui/Login/Logo';
import { InputField } from '../ui/Login/InputField';
import { Button } from '../ui/Login/Button';
import '../../styles/components/Login/VerificationCode.css';

const KeyIcon = ({ className = '' }) => (
	<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
	</svg>
);

export const VerificationCode = ({ email, onVerify, onResend, loading = false, error = null }) => {
	const [code, setCode] = useState('');
	const [localError, setLocalError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleChange = (e) => {
		// Permitir hasta 8 dígitos (algunos códigos OTP pueden tener más de 6)
		const value = e.target.value.replace(/\D/g, '').slice(0, 8);
		setCode(value);
		setLocalError('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!code.trim()) {
			setLocalError('El código es requerido');
			return;
		}

		if (code.length < 6) {
			setLocalError('El código debe tener al menos 6 dígitos');
			return;
		}

		onVerify(code);
	};

	return (
		<Modal>
			<div className="verification-code">
				<Logo size="large" className="mb-2" />
				
				<div className="verification-code__header">
					<h2 className="verification-code__title">Verifica tu correo</h2>
					<p className="verification-code__subtitle">
						Hemos enviado un código de verificación a
					</p>
					<p className="verification-code__email">{email}</p>
				</div>

				{successMessage && (
					<div className="verification-code__success">
						{successMessage}
					</div>
				)}
				{(error || localError) && (
					<div className="verification-code__error">
						{error || localError}
					</div>
				)}

				<form onSubmit={handleSubmit} className="verification-code__form">
					<InputField
						label="Código de verificación"
						type="text"
						placeholder="00000000"
						icon={KeyIcon}
						value={code}
						onChange={handleChange}
						error={localError}
						maxLength={8}
						autoComplete="off"
					/>

					<Button 
						type="submit" 
						variant="default" 
						size="lg" 
						className="verification-code__submit-button"
						disabled={loading || code.length < 6}
					>
						{loading ? 'Verificando...' : 'Verificar código'}
					</Button>
				</form>

				<div className="verification-code__resend">
					<p className="verification-code__resend-text">
						¿No recibiste el código?
					</p>
					<button
						type="button"
						onClick={() => {
							setSuccessMessage('');
							setError(null);
							onResend();
							setSuccessMessage('Código reenviado. Revisa tu correo.');
							setTimeout(() => setSuccessMessage(''), 5000);
						}}
						className="verification-code__resend-button"
						disabled={loading}
					>
						Reenviar código
					</button>
				</div>
			</div>
		</Modal>
	);
};

