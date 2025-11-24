// ============================================
// COMPONENTE COMÚN: Loading Spinner
// ============================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'size-4 border-2',
    md: 'size-6 border-2',
    lg: 'size-8 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-white/30 border-t-white rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Cargando"
    />
  );
}
