export const Modal = ({ children, className = '' }) => {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-gray-900 to-amber-900 relative overflow-hidden">
			{/* Background blur effect */}
			<div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
			
			{/* Glowing effects */}
			<div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
			
			{/* Modal content */}
			<div className={`
				relative z-10 bg-white rounded-2xl shadow-2xl
				w-full max-w-md p-8
				${className}
			`}>
				{children}
			</div>
			
			{/* Help icon */}
			<div className="absolute bottom-4 right-4 z-10">
				<button className="w-8 h-8 rounded-full bg-gray-800/50 text-white flex items-center justify-center hover:bg-gray-800/70 transition-colors">
					<span className="text-sm">?</span>
				</button>
			</div>
		</div>
	);
};

