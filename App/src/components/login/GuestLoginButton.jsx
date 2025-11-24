// ============================================
// COMPONENTE LOGIN: Botón para jugar como invitado
// ============================================

import { Button } from '../ui/button';
import { UserCircle } from 'lucide-react';

export function GuestLoginButton({ onGuestLogin, disabled }) {
	return (
		<div>
			<Button
				onClick={onGuestLogin}
				disabled={disabled}
				variant="outline"
				className="w-full h-12 hover:bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
			>
				<UserCircle className="size-5 mr-2 text-gray-600" />
				Continuar como Invitado
			</Button>

			<p className="mt-4 text-center text-xs text-gray-500">
				Acceso limitado • Sin progreso guardado
			</p>
		</div>
	);
}
