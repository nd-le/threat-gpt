import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type AlertBannerProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: "danger";
};

export const AlertBanner = ({
  variant = "danger",
  className,
  ...props
}: AlertBannerProps) => (
  <p
    className={cn(
      "shrink-0 border-t px-3 py-2 text-xs",
      variant === "danger"
        ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        : undefined,
      className,
    )}
    {...props}
  />
);
