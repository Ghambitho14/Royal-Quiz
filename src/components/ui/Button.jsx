export const Button = ({ children, variant = 'primary', onClick, type = 'button', disabled, className = '', icon: Icon }) => {
	const baseStyles = 'w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2';
	
	const variants = {
		primary: 'bg-gradient-to-b from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 active:from-blue-800 active:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md',
		secondary: 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 active:bg-gray-50 shadow-sm',
	};
	
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variants[variant]} ${className}`}
		>
			{Icon && <Icon className="w-5 h-5" />}
			{children}
		</button>
	);
};

