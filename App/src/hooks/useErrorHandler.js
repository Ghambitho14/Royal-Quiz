// ============================================
// HOOK: Manejo de errores con auto-dismiss
// ============================================

import { useState, useEffect, useCallback } from 'react';

export function useErrorHandler(options = {}) {
	const { autoDismissTime = 5000, clearOnChange = true } = options;
	const [error, setError] = useState('');
	const [timeoutId, setTimeoutId] = useState(null);

	const showError = useCallback((message) => {
		// Clear any existing timeout
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		setError(message);

		// Auto-dismiss after specified time
		const id = setTimeout(() => {
			setError('');
			setTimeoutId(null);
		}, autoDismissTime);

		setTimeoutId(id);
	}, [autoDismissTime, timeoutId]);

	const clearError = useCallback(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			setTimeoutId(null);
		}
		setError('');
	}, [timeoutId]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [timeoutId]);

	return {
		error,
		showError,
		clearError,
	};
}

