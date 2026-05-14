import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "rounded border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100",
        className,
      )}
      {...props}
    />
  ),
);

NativeSelect.displayName = "NativeSelect";
