import { useState, useEffect } from 'react';
import { LoginBackground } from './login/LoginBackground';
import { LoginCard } from './login/LoginCard';
import { ForgotPasswordModal } from './login/ForgotPasswordModal';
import { useAuthValidation } from '../hooks/useAuthValidation';
import { useAuthSubmit } from '../hooks/useAuthSubmit';
import { useCardFlip } from '../hooks/useCardFlip';
import type { User } from '../types';
import type { FieldErrors } from '../hooks/useAuthValidation';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onGuestLogin: () => void;
}

export function LoginScreen({ onLogin, onGuestLogin }: LoginScreenProps) {
  // Form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Custom hooks
  const { fieldErrors, validate, setFieldError, clearFieldError, clearAllErrors } = useAuthValidation();
  const { loading, handleAuth } = useAuthSubmit({ onLogin });
  const { isFlipping, flipDirection, triggerFlip } = useCardFlip();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAllErrors();

    // Validate all fields (including format and length)
    const validationErrors = validate({ email, password, name, isSignUp });
    if (validationErrors) {
      return; // Field errors will be displayed under each input
    }

    // Submit authentication
    const result = await handleAuth(isSignUp, email, password, name);
    if (!result.success && result.fieldErrors) {
      // Display auth errors below respective fields
      Object.entries(result.fieldErrors).forEach(([field, errorMsg]) => {
        setFieldError(field as keyof FieldErrors, errorMsg);
      });
    }
  };

  const handleToggle = () => {
    triggerFlip(isSignUp, () => {
      setIsSignUp(!isSignUp);
      clearAllErrors();
    });
  };

  // Generic handler for field changes (DRY principle)
  const createFieldChangeHandler = (
    setter: (value: string) => void,
    field: keyof FieldErrors
  ) => (value: string) => {
    setter(value);
    if (fieldErrors[field]) {
      clearFieldError(field);
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen fixed inset-0 flex items-center justify-center px-4 py-8 overflow-hidden bg-gray-950">
      {/* Background with spotlights */}
      <LoginBackground />

      {/* Login card */}
      <LoginCard
        isSignUp={isSignUp}
        email={email}
        password={password}
        name={name}
        loading={loading}
        isFlipping={isFlipping}
        flipDirection={flipDirection}
        fieldErrors={fieldErrors}
        onEmailChange={createFieldChangeHandler(setEmail, 'email')}
        onPasswordChange={createFieldChangeHandler(setPassword, 'password')}
        onNameChange={createFieldChangeHandler(setName, 'name')}
        onSubmit={handleSubmit}
        onToggle={handleToggle}
        onGuestLogin={onGuestLogin}
        onForgotPassword={() => setShowForgotPassword(true)}
      />

      {/* Forgot password modal */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}