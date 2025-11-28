import '../../../styles/components/Login/Logo.css';

export const Logo = ({ className = "", size = "large" }) => {
	const dimensions = {
		small: { width: 180, height: 60 },
		medium: { width: 240, height: 80 },
		large: { width: 300, height: 100 }
	};

	const { width, height } = dimensions[size];

	return (
		<div className={`logo ${className}`}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 300 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="logo__svg"
				style={{ display: 'block', margin: '0 auto' }}
			>
				<defs>
					<linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: 'var(--color-amber-300)', stopOpacity: 1 }} />
						<stop offset="50%" style={{ stopColor: 'var(--color-amber-500)', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: 'var(--color-amber-600)', stopOpacity: 1 }} />
					</linearGradient>
					<linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style={{ stopColor: 'var(--color-blue-700)', stopOpacity: 1 }} />
						<stop offset="50%" style={{ stopColor: 'var(--color-blue-800)', stopOpacity: 1 }} />
						<stop offset="100%" style={{ stopColor: 'var(--color-blue-900)', stopOpacity: 1 }} />
					</linearGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
						<feMerge>
							<feMergeNode in="coloredBlur"/>
							<feMergeNode in="SourceGraphic"/>
						</feMerge>
					</filter>
					<filter id="shadow">
						<feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
					</filter>
				</defs>

				<circle cx="65" cy="35" r="30" fill="url(#goldGradient)" opacity="0.15" />

				<g transform="translate(40, 15)" filter="url(#glow)">
					<path
						d="M 10 35 L 15 35 L 15 38 L 35 38 L 35 35 L 40 35 L 38 25 L 25 30 L 12 25 Z"
						fill="url(#goldGradient)"
						stroke="var(--color-amber-700)"
						strokeWidth="0.5"
					/>
					<path
						d="M 12 25 L 10 10 L 15 18 L 25 12 L 35 18 L 40 10 L 38 25"
						fill="url(#goldGradient)"
						stroke="var(--color-amber-700)"
						strokeWidth="0.5"
					/>
					<circle cx="12" cy="28" r="2" fill="var(--color-red-600)" />
					<circle cx="25" cy="28" r="2.5" fill="var(--color-primary-blue)" />
					<circle cx="38" cy="28" r="2" fill="var(--color-emerald-500)" />
					<circle cx="25" cy="18" r="3" fill="var(--color-amber-400)" />
				</g>

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
					<text
						x="180"
						y="35"
						fontFamily="Arial, sans-serif"
						fontSize="20"
						fontWeight="900"
						fill="var(--color-amber-500)"
					>
						?
					</text>
				</g>

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
					<line
						x1="95"
						y1="73"
						x2="195"
						y2="73"
						stroke="url(#goldGradient)"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</g>

				<text
					x="150"
					y="85"
					fontFamily="Arial, sans-serif"
					fontSize="8"
					fontWeight="400"
					fill="var(--color-gray-500)"
					letterSpacing="1"
					textAnchor="middle"
				>
					DEMUESTRA TU CONOCIMIENTO
				</text>
			</svg>
		</div>
	);
};

