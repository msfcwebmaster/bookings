import { cn } from "../lib/utils";

export const StripeBar = ({
  className,
  animated = false,
  variant = "bw",
}: {
  className?: string;
  animated?: boolean;
  variant?: "bw" | "green";
}) => (
  <div
    aria-hidden="true"
    className={cn(
      "h-2 w-full",
      variant === "green" ? "stripes-green" : "stripes",
      animated && "animate-stripe-slide",
      className,
    )}
  />
);

export const StripeDivider = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cn("flex h-3 w-full", className)}>
    <div className="flex-1 stripes-green opacity-90" />
  </div>
);
