import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';
import { GuestLogin } from './GuestLogin';
import { LoginToggle } from './LoginToggle';
import type { FieldErrors } from '../../hooks/useAuthValidation';

interface LoginCardProps {
  isSignUp: boolean;
  email: string;
  password: string;
  name: string;
  loading: boolean;
  isFlipping: boolean;
  flipDirection: 'front' | 'back';
  fieldErrors: FieldErrors;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggle: () => void;
  onGuestLogin: () => void;
  onForgotPassword: () => void;
}

export function LoginCard({
  isSignUp,
  email,
  password,
  name,
  loading,
  isFlipping,
  flipDirection,
  fieldErrors,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
  onToggle,
  onGuestLogin,
  onForgotPassword,
}: LoginCardProps) {
  return (
    <div className={`relative w-full max-w-md transition-all duration-500 ${isFlipping ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 card-enter">
        {/* Header */}
        <LoginHeader isSignUp={isSignUp} />

        {/* Form - errors are now shown below each field */}
        <LoginForm
          isSignUp={isSignUp}
          email={email}
          password={password}
          name={name}
          loading={loading}
          fieldErrors={fieldErrors}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onNameChange={onNameChange}
          onSubmit={onSubmit}
          onForgotPassword={onForgotPassword}
        />

        {/* Guest Login */}
        <GuestLogin onGuestLogin={onGuestLogin} loading={loading} />

        {/* Toggle */}
        <LoginToggle isSignUp={isSignUp} loading={loading} onToggle={onToggle} />
      </div>
    </div>
  );
}