// ============================================
// COMPONENTE COMÚN: Avatar de Jugador
// ============================================

import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { getPlayerInitials } from '../utils/gameHelpers';

export function PlayerAvatar({ name, avatarColor, size = 'md', className = '' }) {
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

