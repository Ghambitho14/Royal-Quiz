import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import "../../styles/components/Button.css";

export function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(
				"button",
				`button--${variant}`,
				`button--size-${size}`,
				className
			)}
			{...props}
		/>
	);
}
