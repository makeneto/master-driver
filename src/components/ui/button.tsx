import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--color-gold-soft)] to-[var(--color-gold)] text-[#141620] font-semibold shadow-[0_0_0_1px_rgba(245,185,66,0.25),0_8px_24px_-8px_rgba(245,185,66,0.55)] hover:brightness-110 active:scale-[0.98]",
        secondary:
          "glass text-[var(--color-text)] hover:border-[var(--color-hairline-strong)] hover:bg-[var(--color-overlay)]",
        ghost: "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-overlay)]",
        success: "bg-[var(--color-success)] text-[#062017] hover:brightness-110",
        danger: "bg-[var(--color-danger)] text-white hover:brightness-110",
        outline: "border border-[var(--color-hairline-strong)] text-[var(--color-text)] hover:bg-[var(--color-overlay)]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
