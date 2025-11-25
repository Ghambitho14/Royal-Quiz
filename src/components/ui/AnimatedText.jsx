import { useState, useEffect, useRef } from 'react';
import '../../styles/components/AnimatedText.css';

export const AnimatedText = ({ phrases = [], className = '', style = {} }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
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
		}
	}, [phrases]);

	// Animar palabras una por una en bucle infinito
	useEffect(() => {
		const currentPhrases = phrasesRef.current;
		
		if (!currentPhrases || currentPhrases.length === 0) {
			return;
		}

		// Limpiar timer anterior si existe
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Esperar el tiempo de animación antes de pasar a la siguiente palabra
		timerRef.current = setTimeout(() => {
			setCurrentIndex(prev => {
				const phrases = phrasesRef.current;
				const nextIndex = (prev + 1) % phrases.length; // Reiniciar en 0 cuando llegue al final
				return nextIndex;
			});
		}, 800); // 800ms para que se vea la animación completa de cada palabra

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [currentIndex]);

	// Mostrar solo la palabra actual
	const currentPhrases = phrasesRef.current || phrases;
	const hasPhrases = currentPhrases && Array.isArray(currentPhrases) && currentPhrases.length > 0;
	const currentPhrase = hasPhrases ? currentPhrases[currentIndex] : null;

	return (
		<div className={className}>
			{currentPhrase ? (
				<div
					key={currentIndex}
					className="animated-text__phrase"
					style={{
						animation: 'phrase-fade 0.6s ease-out',
						...style,
					}}
				>
					{currentPhrase}
				</div>
			) : null}
		</div>
	);
};

