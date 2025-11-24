import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { InputField } from './InputField';
import { Mail, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../utils/supabase/client';

export function ForgotPasswordModal({ open, onClose }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		
		if (!email) {
			setError('Por favor, ingresa tu correo electrónico');
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError('Por favor, ingresa un correo electrónico válido');
			return;
		}

		setLoading(true);

		try {
			const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			});

			if (resetError) throw resetError;

			setSuccess(true);
		} catch (err) {
			setError('Error al enviar el correo de recuperación. Por favor, intenta de nuevo.');
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setEmail('');
		setError('');
		setSuccess(false);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-white/50">
				<DialogHeader>
					<DialogTitle className="text-2xl bg-linear-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
						Recuperar Contraseña
					</DialogTitle>
					<DialogDescription className="text-gray-600">
						{success 
							? 'Te hemos enviado un correo con instrucciones para recuperar tu contraseña.'
							: 'Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.'
						}
					</DialogDescription>
				</DialogHeader>

				{success ? (
					<div className="flex flex-col items-center gap-4 py-6">
						<div className="size-16 rounded-full bg-green-50 flex items-center justify-center">
							<CheckCircle2 className="size-8 text-green-600" />
						</div>
						<p className="text-sm text-gray-600 text-center">
							Revisa tu bandeja de entrada y sigue las instrucciones del correo.
						</p>
						<Button
							onClick={handleClose}
							className="w-full bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950"
						>
							Cerrar
						</Button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<InputField
							id="reset-email"
							type="email"
							label="Correo electrónico"
							placeholder="tu@email.com"
							value={email}
							error={error}
							disabled={loading}
							icon={<Mail className="size-4" />}
							onChange={setEmail}
						/>

						<div className="flex gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={handleClose}
								disabled={loading}
								className="flex-1"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								disabled={loading}
								className="flex-1 bg-linear-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950"
							>
								{loading ? (
									<span className="flex items-center gap-2">
										<div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Enviando...
									</span>
								) : (
									'Enviar'
								)}
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}

