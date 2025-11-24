import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserCircle } from 'lucide-react';

export function GuestLogin({ loading, onGuestLogin }) {
	return (
		<>
			<div className="relative my-7">
				<Separator className="bg-gray-200" />
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-500 font-medium">
					o continúa con
				</span>
			</div>

			<Button
				onClick={onGuestLogin}
				disabled={loading}
				variant="outline"
				className="w-full h-12 text-base hover:bg-gray-50 rounded-xl border-gray-300 transition-all shadow-sm hover:shadow"
			>
				<UserCircle className="size-5 mr-2 text-gray-600" />
				Modo Invitado
			</Button>

			<div className="mt-5 text-center">
				<p className="text-xs text-gray-500">
					Los invitados tienen acceso limitado
				</p>
			</div>
		</>
	);
}

