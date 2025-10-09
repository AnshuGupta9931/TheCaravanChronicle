import * as React from "react";
import { cn } from "./utils.jsx"; // utility for className merging

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";

    const variants = {
      default:
        "bg-circus-red hover:bg-circus-gold text-white font-semibold",
      outline:
        "border border-gray-300 hover:bg-gray-100 text-gray-800",
      ghost:
        "bg-transparent hover:bg-gray-100 text-gray-800",
    };

    const sizes = {
      default: "px-4 py-2 rounded-lg text-sm",
      lg: "px-5 py-3 rounded-xl text-base",
      sm: "px-3 py-1.5 rounded-md text-xs",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-circus-gold",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
