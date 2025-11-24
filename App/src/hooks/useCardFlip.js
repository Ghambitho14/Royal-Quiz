// ============================================
// HOOK: Animación de flip de tarjeta
// ============================================

import { useState } from 'react';

const FLIP_HALF_DURATION = 300;
const FLIP_FULL_DURATION = 600;

export function useCardFlip() {
	const [isFlipping, setIsFlipping] = useState(false);
	const [flipDirection, setFlipDirection] = useState('front');

	const triggerFlip = (currentMode, onSwitch) => {
		setIsFlipping(true);
		setFlipDirection(currentMode ? 'front' : 'back');

		// Switch content at the middle of the animation
		setTimeout(() => {
			onSwitch();
		}, FLIP_HALF_DURATION);

		// Reset animation state after completion
		setTimeout(() => {
			setIsFlipping(false);
		}, FLIP_FULL_DURATION);
	};

	return {
		isFlipping,
		flipDirection,
		triggerFlip,
	};
}

