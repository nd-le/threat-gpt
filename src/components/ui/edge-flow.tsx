import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type EdgeFlowListProps = HTMLAttributes<HTMLUListElement>;

/** List of directed edges with monospace endpoints (graphs, data flow). */
export const EdgeFlowList = ({ className, ...props }: EdgeFlowListProps) => (
  <ul
    className={cn(
      "mt-4 space-y-1 text-xs text-zinc-700 dark:text-zinc-300",
      className,
    )}
    {...props}
  />
);

type EdgeEndpointProps = HTMLAttributes<HTMLSpanElement>;

export const EdgeEndpoint = ({ className, ...props }: EdgeEndpointProps) => (
  <span className={cn("font-mono text-zinc-500", className)} {...props} />
);
