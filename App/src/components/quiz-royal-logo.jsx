// ============================================
// COMPONENTE: Logo animado de Quiz Royal
// ============================================

export function QuizRoyalLogo({ className = "", size = "large" }) {
	const dimensions = {
		small: { width: 180, height: 60 },
		medium: { width: 240, height: 80 },
		large: { width: 300, height: 100 }
	};

	const { width, height } = dimensions[size];

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 300 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="drop-shadow-2xl"
				style={{ display: 'block', margin: '0 auto' }}
			>
				{/* Definitions for gradients and effects */}
				<defs>
					{/* Gold gradient for crown */}
					<linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: '#FCD34D', stopOpacity: 1 }} />
						<stop offset="50%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
					</linearGradient>

					{/* Blue gradient for text */}
					<linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
						<stop offset="50%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: '#1E3A8A', stopOpacity: 1 }} />
					</linearGradient>

					{/* Shine effect */}
					<linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 0 }} />
						<stop offset="50%" style={{ stopColor: 'rgba(255,255,255,0.8)', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 0 }} />
						<animateTransform
							attributeName="gradientTransform"
							type="translate"
							from="-1 0"
							to="1 0"
							dur="3s"
							repeatCount="indefinite"
						/>
					</linearGradient>

					{/* Glow filter */}
					<filter id="glow">
						<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
						<feMerge>
							<feMergeNode in="coloredBlur"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>

					{/* Shadow filter */}
					<filter id="shadow">
						<feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
					</filter>
				</defs>

				{/* Decorative background circle with pulse */}
				<circle cx="65" cy="35" r="30" fill="url(#goldGradient)" opacity="0.15">
					<animate
						attributeName="r"
						values="30;33;30"
						dur="2s"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="opacity"
						values="0.15;0.25;0.15"
						dur="2s"
						repeatCount="indefinite"
					/>
				</circle>

				{/* Custom Crown Icon - More detailed and elegant */}
				<g transform="translate(40, 15)" filter="url(#glow)">
					{/* Crown base */}
					<path
						d="M 10 35 L 15 35 L 15 38 L 35 38 L 35 35 L 40 35 L 38 25 L 25 30 L 12 25 Z"
						fill="url(#goldGradient)"
						stroke="#B45309"
						strokeWidth="0.5"
					/>
					
					{/* Crown points */}
					<path
						d="M 12 25 L 10 10 L 15 18 L 25 12 L 35 18 L 40 10 L 38 25"
						fill="url(#goldGradient)"
						stroke="#B45309"
						strokeWidth="0.5"
					/>

					{/* Jewels on crown */}
					<circle cx="12" cy="28" r="2" fill="#DC2626">
						<animate
							attributeName="opacity"
							values="0.6;1;0.6"
							dur="1.5s"
							repeatCount="indefinite"
						/>
					</circle>
					<circle cx="25" cy="28" r="2.5" fill="#3B82F6">
						<animate
							attributeName="opacity"
							values="0.6;1;0.6"
							dur="1.5s"
							begin="0.5s"
							repeatCount="indefinite"
						/>
					</circle>
					<circle cx="38" cy="28" r="2" fill="#10B981">
						<animate
							attributeName="opacity"
							values="0.6;1;0.6"
							dur="1.5s"
							begin="1s"
							repeatCount="indefinite"
						/>
					</circle>

					{/* Center jewel - larger */}
					<circle cx="25" cy="18" r="3" fill="#FBBF24">
						<animate
							attributeName="r"
							values="3;3.5;3"
							dur="1s"
							repeatCount="indefinite"
						/>
					</circle>

					{/* Shine effect on crown */}
					<rect x="10" y="10" width="30" height="28" fill="url(#shineGradient)" opacity="0.6"/>
				</g>

				{/* "QUIZ" text - Bold and modern */}
				<g filter="url(#shadow)">
					<text
						x="95"
						y="42"
						fontFamily="Arial, sans-serif"
						fontSize="32"
						fontWeight="900"
						fill="url(#blueGradient)"
						letterSpacing="1"
					>
						QUIZ
					</text>
					
					{/* Question mark decoration */}
					<text
						x="180"
						y="35"
						fontFamily="Arial, sans-serif"
						fontSize="20"
						fontWeight="900"
						fill="#F59E0B"
					>
						?
						<animate
							attributeName="opacity"
							values="0.5;1;0.5"
							dur="2s"
							repeatCount="indefinite"
						/>
					</text>
				</g>

				{/* "ROYAL" text - Elegant serif-style */}
				<g filter="url(#shadow)">
					<text
						x="95"
						y="68"
						fontFamily="Georgia, serif"
						fontSize="24"
						fontWeight="700"
						fill="url(#goldGradient)"
						letterSpacing="3"
						fontStyle="italic"
					>
						ROYAL
					</text>

					{/* Underline decoration */}
					<line
						x1="95"
						y1="73"
						x2="195"
						y2="73"
						stroke="url(#goldGradient)"
						strokeWidth="2"
						strokeLinecap="round"
					>
						<animate
							attributeName="x2"
							values="95;195;95"
							dur="3s"
							repeatCount="indefinite"
						/>
					</line>
				</g>

				{/* Decorative stars */}
				<g fill="#FCD34D" opacity="0.8">
					<polygon points="200,15 202,20 207,20 203,23 205,28 200,25 195,28 197,23 193,20 198,20">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 200 21"
							to="360 200 21"
							dur="10s"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="opacity"
							values="0.4;1;0.4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</polygon>
					
					<polygon points="215,55 216.5,58 220,58 217.5,60 218.5,63.5 215,61.5 211.5,63.5 212.5,60 210,58 213.5,58">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 215 59"
							to="-360 215 59"
							dur="12s"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="opacity"
							values="0.3;0.9;0.3"
							dur="2.5s"
							repeatCount="indefinite"
						/>
					</polygon>
				</g>

				{/* Tagline - optional */}
				<text
					x="150"
					y="85"
					fontFamily="Arial, sans-serif"
					fontSize="8"
					fontWeight="400"
					fill="#6B7280"
					letterSpacing="1"
					textAnchor="middle"
				>
					DEMUESTRA TU CONOCIMIENTO
				</text>
			</svg>
		</div>
	);
}

