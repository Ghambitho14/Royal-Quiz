// ============================================
// COMPONENTE LOGIN: Header con logo y texto animado
// ============================================

import { QuizRoyalLogo } from '../quiz-royal-logo';
import { useTextRotation } from '../../hooks/useTextRotation';
import { CHALLENGE_PHRASES, ANIMATION_TIMINGS } from '../../constants';

export function LoginHeader({ isSignUp }) {
	const { currentText, currentIndex } = useTextRotation({
		texts: CHALLENGE_PHRASES,
		interval: ANIMATION_TIMINGS.PHRASE_ROTATION,
		enabled: !isSignUp,
	});

	return (
		<>
			{/* Logo */}
			<div className="flex items-center justify-center mb-6 w-full">
				<QuizRoyalLogo size="large" />
			</div>

			{/* Clean title */}
			<div className="text-center mb-8">
				<h2
					key={currentIndex}
					className="text-4xl tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-900 via-gray-800 to-gray-900"
					style={{
						animation: 'phrase-fade 0.6s ease-out',
						fontWeight: '600',
						letterSpacing: '-0.02em',
						overflow: 'visible',
						lineHeight: '1.3',
						minHeight: '3.25rem', // Fixed height to prevent layout shift
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{isSignUp ? 'Crear Cuenta' : currentText}
				</h2>
				<p className="text-gray-500 mt-2 text-sm">
					{isSignUp ? 'Únete a la comunidad royal' : 'Bienvenido de vuelta'}
				</p>
			</div>
		</>
	);
}

