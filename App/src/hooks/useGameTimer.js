// ============================================
// HOOK: Temporizador del juego
// ============================================

import { useState, useEffect, useRef } from 'react';

export function useGameTimer(initialTime = 30, onTimeUp = null) {
	const [time, setTime] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const intervalRef = useRef(null);

	useEffect(() => {
		if (isRunning && !isPaused && time > 0) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime <= 1) {
						setIsRunning(false);
						if (onTimeUp) {
							onTimeUp();
						}
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isRunning, isPaused, time, onTimeUp]);

	const start = (customTime = null) => {
		if (customTime !== null) {
			setTime(customTime);
		}
		setIsRunning(true);
		setIsPaused(false);
	};

	const pause = () => {
		setIsPaused(true);
	};

	const resume = () => {
		setIsPaused(false);
	};

	const reset = (resetTime = initialTime) => {
		setTime(resetTime);
		setIsRunning(false);
		setIsPaused(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const stop = () => {
		setIsRunning(false);
		setIsPaused(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	return {
		time,
		isRunning,
		isPaused,
		start,
		pause,
		resume,
		reset,
		stop,
	};
}

