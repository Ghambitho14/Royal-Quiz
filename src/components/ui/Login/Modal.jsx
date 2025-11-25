import { Card } from './Card';
import { cn } from '../../../lib/utils';
import '../../../styles/components/Login/Modal.css';

export const Modal = ({ children, className = '' }) => {
	return (
		<div className="modal">
			<div className="modal__backdrop"></div>
			<div className="modal__glow--top"></div>
			<div className="modal__glow--bottom"></div>
			<div className={cn("modal__content", className)}>
				<Card className="modal__card">
					{children}
				</Card>
			</div>
		</div>
	);
};

