// ============================================
// CUSTOM HOOK: Temporizador del juego
// ============================================

import { useState, useEffect, useCallback } from 'react';

export function useGameTimer({ initialTime, onTimeUp, autoStart = false }) {
	const [timeRemaining, setTimeRemaining] = useState(initialTime);
	const [isActive, setIsActive] = useState(autoStart);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		let interval = null;

		if (isActive && !isPaused && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((time) => {
					if (time <= 1) {
						setIsActive(false);
						if (onTimeUp) onTimeUp();
						return 0;
					}
					return time - 1;
				});
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, isPaused, timeRemaining, onTimeUp]);

	const start = useCallback(() => {
		setIsActive(true);
		setIsPaused(false);
	}, []);

	const pause = useCallback(() => {
		setIsPaused(true);
	}, []);

	const resume = useCallback(() => {
		setIsPaused(false);
	}, []);

	const reset = useCallback((newTime) => {
		setTimeRemaining(newTime ?? initialTime);
		setIsActive(false);
		setIsPaused(false);
	}, [initialTime]);

	const stop = useCallback(() => {
		setIsActive(false);
		setIsPaused(false);
	}, []);

	return {
		timeRemaining,
		isActive,
		isPaused,
		start,
		pause,
		resume,
		reset,
		stop,
	};
}

