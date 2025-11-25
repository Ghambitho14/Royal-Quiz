import * as React from "react";
import { cn } from "../../lib/utils";

export function Input({ className, type, ...props }) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-gray-400 selection:bg-blue-100 selection:text-blue-900 border-gray-300 flex w-full min-w-0 rounded-lg border bg-white text-gray-900 transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
				"focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-offset-0",
				"aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
				className,
			)}
			{...props}
		/>
	);
}

