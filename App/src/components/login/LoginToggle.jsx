export function LoginToggle({ isSignUp, loading, onToggle }) {
	return (
		<div className="mt-5 text-center">
			<button
				onClick={onToggle}
				disabled={loading}
				className="text-sm text-blue-700 hover:text-blue-800 hover:underline transition-colors font-medium"
			>
				{isSignUp
					? '¿Ya tienes cuenta? Inicia sesión'
					: '¿No tienes cuenta? Regístrate'}
			</button>
		</div>
	);
}

