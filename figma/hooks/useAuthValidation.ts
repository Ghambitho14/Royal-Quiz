import { useState } from 'react';
import { VALIDATION_MESSAGES, VALIDATION_RULES } from '../constants/validation';

interface ValidationData {
  email: string;
  password: string;
  name: string;
  isSignUp: boolean;
}

export interface FieldErrors {
  email?: string;
  password?: string;
  name?: string;
}

export function useAuthValidation() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return VALIDATION_MESSAGES.EMAIL_REQUIRED;
    }
    
    if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
      return VALIDATION_MESSAGES.EMAIL_INVALID;
    }
    
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }
    
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      return VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
    }
    
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return VALIDATION_MESSAGES.NAME_REQUIRED;
    }
    
    if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
      return VALIDATION_MESSAGES.NAME_TOO_SHORT;
    }
    
    return undefined;
  };

  const validate = (data: ValidationData): FieldErrors | null => {
    const errors: FieldErrors = {};

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

  const setFieldError = (field: keyof FieldErrors, error: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const clearFieldError = (field: keyof FieldErrors) => {
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