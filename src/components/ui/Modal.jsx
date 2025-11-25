import { Card } from './Card';
import { cn } from '../../lib/utils';
import '../../styles/components/Modal.css';

export const Modal = ({ children, className = '' }) => {
	return (
		<div className="modal">
			{/* Background blur effect */}
			<div className="modal__backdrop"></div>
			
			{/* Glowing effects */}
			<div className="modal__glow--top"></div>
			<div className="modal__glow--bottom"></div>
			
			{/* Modal content */}
			<div className={cn("modal__content", className)}>
				<Card className="modal__card">
					{children}
				</Card>
			</div>
			
			{/* Help icon */}
			<div className="modal__help">
				<button className="modal__help-button" type="button" aria-label="Ayuda">
					<span className="modal__help-text">?</span>
				</button>
			</div>
		</div>
	);
};

