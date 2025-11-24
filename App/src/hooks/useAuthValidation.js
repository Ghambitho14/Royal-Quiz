// ============================================
// HOOK: Validación de autenticación
// ============================================

import { useState } from 'react';
import { VALIDATION_MESSAGES, VALIDATION_RULES } from '../constants/validation';

export function useAuthValidation() {
	const [fieldErrors, setFieldErrors] = useState({
		name: null,
		email: null,
		password: null,
	});

	const validate = ({ email, password, name, isSignUp }) => {
		const errors = {
			name: null,
			email: null,
			password: null,
		};

		// Validate name for signup
		if (isSignUp) {
			if (!name?.trim()) {
				errors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
			} else if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
				errors.name = VALIDATION_MESSAGES.NAME_TOO_SHORT;
			}
		}

		// Validate email
		if (!email.trim()) {
			errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED;
		} else if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
			errors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
		}

		// Validate password
		if (!password.trim()) {
			errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
		} else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
			errors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
		}

		setFieldErrors(errors);
		const hasErrors = Object.values(errors).some(error => error !== null);
		return hasErrors ? errors : null;
	};

	const clearFieldError = (field) => {
		setFieldErrors(prev => ({
			...prev,
			[field]: null,
		}));
	};

	const clearAllErrors = () => {
		setFieldErrors({
			name: null,
			email: null,
			password: null,
		});
	};

	return {
		fieldErrors,
		validate,
		clearFieldError,
		clearAllErrors,
	};
}

