// ============================================
// COMPONENTE COMÚN: Avatar de Jugador
// ============================================

import { Avatar, AvatarFallback } from '../ui/avatar';
import { getPlayerInitials } from '../../utils/gameHelpers';

interface PlayerAvatarProps {
  name: string;
  avatarColor: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PlayerAvatar({ name, avatarColor, size = 'md', className = '' }: PlayerAvatarProps) {
  const sizeClasses = {
    sm: 'size-8 text-xs',
    md: 'size-10 text-sm',
    lg: 'size-12 text-base',
    xl: 'size-16 text-lg',
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarFallback className={`${avatarColor} text-white`}>
        {getPlayerInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
