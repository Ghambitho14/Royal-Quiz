import { Input } from './Input';
import { Label } from './Label';
import { cn } from '../../lib/utils';
import '../../styles/components/InputField.css';

export const InputField = ({ label, type = 'text', placeholder, icon: Icon, value, onChange, error }) => {
	return (
		<div className="input-field">
			{label && (
				<Label htmlFor={label} className="input-field__label">
					{label}
				</Label>
			)}
			<div className="input-field__container">
				{Icon && (
					<div className="input-field__icon-container">
						<Icon className="input-field__icon" />
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
						error ? "input-field__input--error" : "input-field__input--normal"
					)}
					aria-invalid={error ? true : undefined}
				/>
			</div>
			{error && (
				<p className="input-field__error">{error}</p>
			)}
		</div>
	);
};

