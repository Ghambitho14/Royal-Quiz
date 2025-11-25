import { Input } from './Input';
import { Label } from './Label';
import { cn } from '../../lib/utils';

export const InputField = ({ label, type = 'text', placeholder, icon: Icon, value, onChange, error }) => {
	return (
		<div className="mb-4 sm:mb-5">
			{label && (
				<Label htmlFor={label} className="mb-2 sm:mb-2.5 text-xs sm:text-sm font-semibold text-gray-700">
					{label}
				</Label>
			)}
			<div className="relative">
				{Icon && (
					<div className="absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
						<Icon className="w-4 h-4 sm:w-5 sm:h-5" />
					</div>
				)}
				<Input
					id={label}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className={cn(
						"h-10 sm:h-11 text-sm sm:text-base transition-all",
						Icon && "pl-9 sm:pl-11",
						error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
						!error && "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
					)}
					aria-invalid={error ? true : undefined}
				/>
			</div>
			{error && (
				<p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 font-medium">{error}</p>
			)}
		</div>
	);
};

