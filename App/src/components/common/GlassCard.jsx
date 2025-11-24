// ============================================
// COMPONENTE COMÚN: Card con efecto glassmorphism
// ============================================

import { Card } from '../ui/card';

export function GlassCard({ children, className = '', variant = 'default' }) {
	const variantClasses = {
		default: 'bg-white/95 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border-white/20',
		subtle: 'bg-white/80 backdrop-blur-xl shadow-lg border-white/10',
		strong: 'bg-white/98 backdrop-blur-3xl shadow-2xl border-white/30',
	};

	return (
		<Card className={`${variantClasses[variant]} border rounded-3xl ${className}`}>
			{children}
		</Card>
	);
}
