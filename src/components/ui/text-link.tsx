import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type TextLinkProps = ComponentProps<typeof Link>;

export const TextLink = ({ className, ...props }: TextLinkProps) => (
  <Link
    className={cn(
      "text-xs font-medium text-zinc-500 underline-offset-4 hover:text-zinc-800 hover:underline dark:hover:text-zinc-200",
      className,
    )}
    {...props}
  />
);
