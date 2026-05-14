import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type FieldProps = Readonly<{
  label: string;
  children: ReactNode;
  className?: string;
}>;

export const Field = ({ label, children, className }: FieldProps) => (
  <label
    className={cn(
      "flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400",
      className,
    )}
  >
    <span className="shrink-0">{label}</span>
    <span className="min-w-0 flex-1">{children}</span>
  </label>
);
