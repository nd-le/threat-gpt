import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const panelVariants = cva(
  "border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
  {
    variants: {
      variant: {
        default: "",
        /** Left column in a split layout: full height, only a right divider. */
        rail:
          "flex h-full min-h-0 flex-col rounded-none border-0 border-r border-zinc-200 dark:border-zinc-800",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type PanelProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof panelVariants>;

export const Panel = ({ className, variant, ...props }: PanelProps) => (
  <div className={cn(panelVariants({ variant }), className)} {...props} />
);

type PanelSectionProps = HTMLAttributes<HTMLDivElement>;

export const PanelHeader = ({ className, ...props }: PanelSectionProps) => (
  <div
    className={cn(
      "shrink-0 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);

export const PanelFooter = ({ className, ...props }: PanelSectionProps) => (
  <div
    className={cn(
      "shrink-0 border-t border-zinc-200 p-3 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);
