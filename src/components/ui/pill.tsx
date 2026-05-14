import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const pillVariants = cva(
  "rounded-lg border px-3 py-2 text-xs font-medium",
  {
    variants: {
      tone: {
        actor:
          "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950",
        system:
          "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950",
        store:
          "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-950",
        boundary:
          "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950",
        default:
          "border-zinc-300 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type PillProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof pillVariants> & {
    /** Small uppercase line above children (e.g. node kind). */
    caption?: ReactNode;
  };

export const Pill = ({
  tone,
  caption,
  className,
  children,
  ...props
}: PillProps) => (
  <div className={cn(pillVariants({ tone }), className)} {...props}>
    {caption != null && caption !== "" ? (
      <span className="block text-[10px] uppercase opacity-70">{caption}</span>
    ) : null}
    {children}
  </div>
);

export const graphNodeTone = (
  kind: string,
): NonNullable<VariantProps<typeof pillVariants>["tone"]> => {
  if (
    kind === "actor"
    || kind === "system"
    || kind === "store"
    || kind === "boundary"
  ) {
    return kind;
  }
  return "default";
};
