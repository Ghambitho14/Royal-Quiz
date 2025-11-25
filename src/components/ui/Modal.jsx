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
				<Card className="border-0 shadow-2xl bg-white text-black p-10 gap-0 max-w-lg w-full">
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

