import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ScreenProps = HTMLAttributes<HTMLDivElement>;

/** Full-viewport column used for tool-style pages (workbench, future shells). */
export const Screen = ({ className, ...props }: ScreenProps) => (
  <div
    className={cn(
      "flex h-[100dvh] min-h-0 flex-col bg-zinc-50 dark:bg-black",
      className,
    )}
    {...props}
  />
);

type TopBarProps = HTMLAttributes<HTMLElement>;

/** Sticky-style header row for app chrome (title, links, controls). */
export const TopBar = ({ className, ...props }: TopBarProps) => (
  <header
    className={cn(
      "flex shrink-0 flex-wrap items-center gap-3 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950",
      className,
    )}
    {...props}
  />
);

type SplitViewProps = HTMLAttributes<HTMLDivElement>;

/** Primary / detail split: single column on small screens, two columns from `md`. */
export const SplitView = ({ className, ...props }: SplitViewProps) => (
  <div
    className={cn(
      "grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[minmax(280px,34%)_1fr]",
      className,
    )}
    {...props}
  />
);

type SplitMainProps = HTMLAttributes<HTMLElement>;

/** Right-hand pane in a split tool layout (scroll + surface). */
export const SplitMain = ({ className, ...props }: SplitMainProps) => (
  <main
    className={cn(
      "min-h-0 overflow-hidden bg-white dark:bg-zinc-950",
      className,
    )}
    {...props}
  />
);

type ContentAreaProps = HTMLAttributes<HTMLDivElement>;

/** Scrollable padded region for dense tool content (e.g. canvas body). */
export const ContentArea = ({ className, ...props }: ContentAreaProps) => (
  <div
    className={cn("h-full min-h-0 overflow-y-auto p-6", className)}
    {...props}
  />
);
