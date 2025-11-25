import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import "../../../styles/components/Login/Button.css";

export function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "button";

	const variantClasses = {
		default: "button--default",
		destructive: "button--destructive",
		outline: "button--outline",
		secondary: "button--secondary",
		ghost: "button--ghost",
		link: "button--link"
	};

	const sizeClasses = {
		default: "button--size-default",
		sm: "button--size-sm",
		lg: "button--size-lg",
		icon: "button--size-icon"
	};

	return (
		<Comp
			data-slot="button"
			className={cn(
				"button",
				variantClasses[variant],
				sizeClasses[size],
				className
			)}
			{...props}
		/>
	);
}
