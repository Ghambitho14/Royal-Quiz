import { useState } from 'react';
import { VALIDATION_MESSAGES, VALIDATION_RULES } from '../constants/validation';

export function useAuthValidation() {
	const [fieldErrors, setFieldErrors] = useState({});

	const validateEmail = (email) => {
		if (!email.trim()) {
			return VALIDATION_MESSAGES.EMAIL_REQUIRED;
		}
		
		if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
			return VALIDATION_MESSAGES.EMAIL_INVALID;
		}
		
		return undefined;
	};

	const validatePassword = (password) => {
		if (!password) {
			return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
		}
		
		if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
			return VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
		}
		
		return undefined;
	};

	const validateName = (name) => {
		if (!name.trim()) {
			return VALIDATION_MESSAGES.NAME_REQUIRED;
		}
		
		if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
			return VALIDATION_MESSAGES.NAME_TOO_SHORT;
		}
		
		return undefined;
	};

	const validate = (data) => {
		const errors = {};

		// Validate email
		const emailError = validateEmail(data.email);
		if (emailError) errors.email = emailError;

		// Validate password
		const passwordError = validatePassword(data.password);
		if (passwordError) errors.password = passwordError;

		// Validate name (only for sign up)
		if (data.isSignUp) {
			const nameError = validateName(data.name);
			if (nameError) errors.name = nameError;
		}

		// Update field errors state
		setFieldErrors(errors);

		// Return null if no errors, otherwise return errors
		return Object.keys(errors).length > 0 ? errors : null;
	};

	const setFieldError = (field, error) => {
		setFieldErrors((prev) => ({
			...prev,
			[field]: error,
		}));
	};

	const clearFieldError = (field) => {
		setFieldErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[field];
			return newErrors;
		});
	};

	const clearAllErrors = () => {
		setFieldErrors({});
	};

	return {
		fieldErrors,
		validate,
		setFieldError,
		clearFieldError,
		clearAllErrors,
	};
}

