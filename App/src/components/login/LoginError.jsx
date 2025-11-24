// ============================================
// COMPONENTE LOGIN: Error con animación
// ============================================

import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, X } from 'lucide-react';

export function LoginError({ error, onDismiss }) {
	const [isVisible, setIsVisible] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (error) {
			// Show the alert
			setShouldRender(true);
			// Trigger animation after render
			setTimeout(() => setIsVisible(true), 10);
		} else {
			// Hide with animation
			setIsVisible(false);
			// Remove from DOM after animation
			setTimeout(() => setShouldRender(false), 300);
		}
	}, [error]);

	const handleDismiss = () => {
		setIsVisible(false);
		setTimeout(() => {
			setShouldRender(false);
			if (onDismiss) onDismiss();
		}, 300);
	};

	if (!shouldRender) return null;

	return (
		<Alert 
			className={`mb-4 bg-gradient-to-r from-red-50 to-red-50/80 border-red-300/50 rounded-xl shadow-sm backdrop-blur-sm transition-all duration-300 ${
				isVisible 
					? 'opacity-100 translate-y-0' 
					: 'opacity-0 -translate-y-2'
			}`}
		>
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0 mt-0.5">
					<AlertCircle className="size-4 text-red-600" />
				</div>
				<AlertDescription className="text-red-900 text-sm leading-relaxed flex-1">
					{error}
				</AlertDescription>
				{onDismiss && (
					<button
						onClick={handleDismiss}
						className="flex-shrink-0 text-red-600 hover:text-red-800 transition-colors p-0.5 hover:bg-red-100 rounded"
					>
						<X className="size-4" />
					</button>
				)}
			</div>
		</Alert>
	);
}

