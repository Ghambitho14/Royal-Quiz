import '../../styles/components/Logo.css';

const StarIcon = ({ className = '' }) => (
	<svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z" />
	</svg>
);

const QuestionMarkIcon = ({ className = '' }) => (
	<svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
	</svg>
);

export const Logo = () => {
	return (
		<div className="logo">
			<div className="logo__container">
				{/* Circle with crown on the left */}
				<div className="logo__icon-container">
					<div className="logo__circle">
						<svg
							className="logo__crown"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* Crown base */}
							<path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3v-1h16v1z" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
							{/* Red gem in center */}
							<circle cx="12" cy="8" r="2.5" fill="#DC2626" />
							{/* Green gems on sides */}
							<circle cx="7" cy="10" r="1.5" fill="#10B981" />
							<circle cx="17" cy="10" r="1.5" fill="#10B981" />
						</svg>
					</div>
				</div>
				
				{/* Text on the right */}
				<div className="logo__text-container">
					{/* QUIZ text */}
					<div className="logo__quiz-container">
						<span className="logo__quiz-letter">Q</span>
						<span className="logo__quiz-letter">U</span>
						<span className="logo__quiz-letter logo__quiz-letter--with-icon">
							I
							<StarIcon className="logo__quiz-icon" />
						</span>
						<span className="logo__quiz-letter logo__quiz-letter--with-icon">
							Z
							<QuestionMarkIcon className="logo__quiz-icon" />
						</span>
					</div>
					
					{/* ROYAL text */}
					<div className="logo__royal-container">
						<span className="logo__royal-text">ROYAL</span>
						<StarIcon className="logo__royal-star" />
					</div>
				</div>
			</div>
			
			{/* Tagline */}
			<p className="logo__tagline">DEMUESTRA TU CONOCIMIENTO</p>
		</div>
	);
};

