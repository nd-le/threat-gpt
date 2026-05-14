import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Text } from "./typography";

type EmptyStateProps = Readonly<{
  title: string;
  description: ReactNode;
  className?: string;
}>;

export const EmptyState = ({ title, description, className }: EmptyStateProps) => (
  <div
    className={cn(
      "flex h-full flex-col items-center justify-center gap-2 p-8 text-center",
      className,
    )}
  >
    <Text size="md" className="font-semibold text-zinc-900 dark:text-zinc-50">
      {title}
    </Text>
    <Text tone="muted" size="sm" className="max-w-sm">
      {description}
    </Text>
  </div>
);
