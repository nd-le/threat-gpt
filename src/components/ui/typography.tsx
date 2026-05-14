import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export const Heading = ({
  as: Tag = "h2",
  className,
  ...props
}: HeadingProps) => (
  <Tag
    className={cn(
      "font-semibold text-zinc-900 dark:text-zinc-50",
      Tag === "h1" && "text-4xl leading-tight",
      Tag === "h2" && "text-sm",
      Tag === "h3" && "text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400",
      className,
    )}
    {...props}
  />
);

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "default" | "muted" | "danger";
  size?: "sm" | "md" | "lg";
};

export const Text = ({
  tone = "default",
  size = "sm",
  className,
  ...props
}: TextProps) => (
  <p
    className={cn(
      "leading-relaxed",
      size === "sm" && "text-sm",
      size === "md" && "text-base",
      size === "lg" && "text-lg leading-8",
      tone === "default" && "text-zinc-800 dark:text-zinc-200",
      tone === "muted" && "text-zinc-500 dark:text-zinc-400",
      tone === "danger" && "text-red-700 dark:text-red-300",
      className,
    )}
    {...props}
  />
);

export const Kbd = ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      "rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800",
      className,
    )}
    {...props}
  />
);
