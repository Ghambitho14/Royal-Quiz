export const Logo = () => {
	return (
		<div className="flex flex-col items-center mb-8">
			{/* Circle with crown */}
			<div className="relative mb-4">
				{/* Light gold circle background */}
				<div className="w-20 h-20 rounded-full bg-linear-to-br from-yellow-200 to-yellow-300 flex items-center justify-center shadow-md">
					{/* Crown with blue gem */}
					<svg
						className="w-12 h-12 text-yellow-600"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						{/* Crown base */}
						<path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3v-1h16v1z" />
						{/* Blue gem in center */}
						<circle cx="12" cy="8" r="2" fill="#3B82F6" />
					</svg>
				</div>
			</div>
			
			{/* QUIZ text with question mark and stars */}
			<div className="flex items-center justify-center mb-1">
				<span className="text-4xl font-bold text-primary-blue">Q</span>
				<span className="text-4xl font-bold text-primary-blue">U</span>
				<span className="text-4xl font-bold text-primary-blue">?</span>
				<span className="text-4xl font-bold text-primary-blue">Z</span>
				{/* Two golden stars */}
				<svg className="w-5 h-5 text-gold ml-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z" />
				</svg>
				<svg className="w-5 h-5 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z" />
				</svg>
			</div>
			
			{/* ROYAL text with star */}
			<div className="flex items-center justify-center mb-2">
				<span className="text-2xl font-bold text-gold">ROYAL</span>
				<svg className="w-4 h-4 text-gold ml-2" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2L12 17.6l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z" />
				</svg>
			</div>
			
			{/* Tagline */}
			<p className="text-sm text-gray-500">DEMUESTRA TU CONOCIMIENTO</p>
		</div>
	);
};

