import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-xs font-medium transition-opacity disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
        outline:
          "border border-zinc-300 text-zinc-800 dark:border-zinc-600 dark:text-zinc-200",
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-2.5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "sm" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className, variant, size, type = "button", ...props
  }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
