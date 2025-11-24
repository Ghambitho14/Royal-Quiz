// ============================================
// CUSTOM HOOK: Rotación de texto
// ============================================

import { useState, useEffect } from 'react';

export function useTextRotation({ texts, interval = 3000, enabled = true }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!enabled || texts.length <= 1) return;

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % texts.length);
		}, interval);

		return () => clearInterval(timer);
	}, [texts.length, interval, enabled]);

	return {
		currentText: texts[currentIndex],
		currentIndex,
	};
}

