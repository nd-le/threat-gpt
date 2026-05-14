import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const gapClass = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  8: "gap-8",
} as const;

type Gap = keyof typeof gapClass;

type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Gap;
  /** When set, items wrap to the next row (toolbar / chip rows). */
  wrap?: boolean;
};

export const VStack = ({ gap = 4, className, ...props }: StackProps) => (
  <div className={cn("flex flex-col", gapClass[gap], className)} {...props} />
);

export const HStack = ({
  gap = 2,
  wrap = false,
  className,
  ...props
}: StackProps) => (
  <div
    className={cn(
      "flex flex-row items-center",
      wrap && "flex-wrap",
      gapClass[gap],
      className,
    )}
    {...props}
  />
);
