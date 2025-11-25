import { useState, useEffect } from 'react';

export const AnimatedText = ({ phrases, className = '' }) => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [displayedText, setDisplayedText] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (isComplete || currentWordIndex >= phrases.length) {
			setIsComplete(true);
			return;
		}

		const timer = setTimeout(() => {
			const wordToAdd = currentWordIndex === 0 
				? phrases[currentWordIndex] 
				: ' ' + phrases[currentWordIndex];
			setDisplayedText(prev => prev + wordToAdd);
			setCurrentWordIndex(prev => prev + 1);
		}, 300); // Velocidad de aparición de cada palabra

		return () => clearTimeout(timer);
	}, [currentWordIndex, phrases, isComplete]);

	return (
		<h2 className={`${className} min-h-12`}>
			{displayedText}
			{!isComplete && (
				<span className="animate-pulse ml-1">|</span>
			)}
		</h2>
	);
};

