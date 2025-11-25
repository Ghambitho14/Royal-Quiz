import { Input } from './Input';
import { Label } from './Label';
import { cn } from '../../lib/utils';
import '../../styles/components/InputField.css';

export const InputField = ({ label, type = 'text', placeholder, icon: Icon, value, onChange, error }) => {
	const hasError = !!error;

	return (
		<div className="input-field">
			{label && (
				<Label htmlFor={label} className="input-field__label">
					{label}
				</Label>
			)}
			<div className="input-field__wrapper">
				{Icon && (
					<div className="input-field__icon">
						<Icon className="size-4" />
					</div>
				)}
				<Input
					id={label}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={cn(
						"input-field__input",
						Icon && "input-field__input--with-icon",
						hasError
							? "input-field__input--error"
							: "input-field__input--normal"
					)}
					aria-invalid={hasError ? true : undefined}
				/>
			</div>
			{error && (
				<div className="input-field__error-message">
					<svg className="input-field__error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p className="input-field__error-text">
						{error}
					</p>
				</div>
			)}
		</div>
	);
};

