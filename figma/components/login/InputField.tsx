import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  onChange: (value: string) => void;
}

export function InputField({
  id,
  type,
  label,
  placeholder,
  value,
  error,
  disabled,
  icon,
  hint,
  onChange,
}: InputFieldProps) {
  const hasError = !!error;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`h-11 rounded-xl transition-all ${
            icon ? 'pl-10' : ''
          } ${
            hasError
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:border-blue-700 focus:ring-blue-700'
          }`}
        />
      </div>
      {error && (
        <div className="flex items-start gap-1.5 p-2 bg-red-50/90 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="size-3.5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 leading-relaxed">
            {error}
          </p>
        </div>
      )}
      {!error && hint && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}