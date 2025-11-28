import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../../lib/utils";
import "../../../styles/components/Login/Label.css";

export function Label({ className, ...props }) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn("label", className)}
			{...props}
		/>
	);
}

