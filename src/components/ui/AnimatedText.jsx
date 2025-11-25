import { useState, useEffect, useRef } from 'react';
import '../../styles/components/AnimatedText.css';

export const AnimatedText = ({ phrases = [], className = '' }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const phrasesRef = useRef(phrases);
	const previousPhrasesStringRef = useRef(null);
	const timerRef = useRef(null);

	// Inicializar phrasesRef inmediatamente
	if (phrasesRef.current !== phrases) {
		phrasesRef.current = phrases;
	}

	// Reset cuando cambian las phrases (solo en el montaje inicial o si realmente cambiaron)
	useEffect(() => {
		const currentPhrasesString = JSON.stringify(phrases);
		
		// Solo resetear si es la primera vez o si las phrases realmente cambiaron
		if (previousPhrasesStringRef.current === null || currentPhrasesString !== previousPhrasesStringRef.current) {
			// Limpiar timer anterior
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			
			phrasesRef.current = phrases;
			previousPhrasesStringRef.current = currentPhrasesString;
			setCurrentIndex(0);
			setIsComplete(false);
		}
	}, [phrases]);

	// Animar palabras una por una
	useEffect(() => {
		if (isComplete) {
			return;
		}

		const currentPhrases = phrasesRef.current;
		
		if (!currentPhrases || currentPhrases.length === 0) {
			setIsComplete(true);
			return;
		}

		if (currentIndex >= currentPhrases.length) {
			setIsComplete(true);
			return;
		}

		// Limpiar timer anterior si existe
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Esperar el tiempo de animación antes de pasar a la siguiente palabra
		timerRef.current = setTimeout(() => {
			setCurrentIndex(prev => {
				const nextIndex = prev + 1;
				const phrases = phrasesRef.current;
				if (nextIndex >= phrases.length) {
					setIsComplete(true);
				}
				return nextIndex;
			});
		}, 800); // 800ms para que se vea la animación completa de cada palabra

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [currentIndex, isComplete]);

	// Mostrar solo la palabra actual
	const currentPhrases = phrasesRef.current;
	const currentPhrase = currentPhrases && currentPhrases.length > 0 && currentIndex < currentPhrases.length
		? currentPhrases[currentIndex]
		: '';

	return (
		<div className={`animated-text ${className}`}>
			{currentPhrase && (
				<div className="animated-text__phrase animated-text__phrase--current">
					{currentPhrase}
					{!isComplete && (
						<span className="animated-text__cursor">|</span>
					)}
				</div>
			)}
		</div>
	);
};

