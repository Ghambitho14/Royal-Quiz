import * as React from "react";
import { cn } from "../../../lib/utils";
import "../../../styles/components/Login/Input.css";

export function Input({ className, type, ...props }) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn("input", className)}
			{...props}
		/>
	);
}

