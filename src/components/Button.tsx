import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "sm";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses =
      variant === "outline"
        ? "border border-line bg-background text-foreground hover:bg-surface"
        : "bg-foreground text-background hover:bg-foreground/90";
    const sizeClasses = size === "sm" ? "h-9 rounded-md px-3" : "h-10 px-4 py-2";

    return <button ref={ref} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
