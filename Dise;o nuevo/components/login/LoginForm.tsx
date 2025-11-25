import { Button } from '../ui/button';
import { InputField } from './InputField';
import { Mail, Lock, User } from 'lucide-react';
import type { FieldErrors } from '../../hooks/useAuthValidation';

interface LoginFormProps {
  isSignUp: boolean;
  email: string;
  password: string;
  name: string;
  loading: boolean;
  fieldErrors: FieldErrors;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword?: () => void;
}

export function LoginForm({
  isSignUp,
  email,
  password,
  name,
  loading,
  fieldErrors,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {isSignUp && (
        <InputField
          id="name"
          type="text"
          label="Nombre completo"
          placeholder="Juan Pérez"
          value={name}
          error={fieldErrors.name}
          disabled={loading}
          icon={<User className="size-4" />}
          onChange={onNameChange}
        />
      )}

      <InputField
        id="email"
        type="email"
        label="Correo electrónico"
        placeholder="tu@email.com"
        value={email}
        error={fieldErrors.email}
        disabled={loading}
        icon={<Mail className="size-4" />}
        onChange={onEmailChange}
      />

      <InputField
        id="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        error={fieldErrors.password}
        disabled={loading}
        icon={<Lock className="size-4" />}
        onChange={onPasswordChange}
      />

      {!isSignUp && onForgotPassword && (
        <div className="flex justify-end -mt-2">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            disabled={loading}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 h-12 text-base rounded-xl shadow-lg shadow-blue-800/30 hover:shadow-xl hover:shadow-blue-800/40 transition-all"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Procesando...
          </span>
        ) : isSignUp ? (
          'Crear Cuenta'
        ) : (
          'Iniciar Sesión'
        )}
      </Button>
    </form>
  );
}