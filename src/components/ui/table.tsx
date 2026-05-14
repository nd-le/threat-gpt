import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";

type DivProps = HTMLAttributes<HTMLDivElement>;

export const TableScroll = ({ className, ...props }: DivProps) => (
  <div
    className={cn(
      "overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);

export const Table = ({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) => (
  <table
    className={cn("w-full min-w-[32rem] text-left text-xs", className)}
    {...props}
  />
);

export const THead = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn("bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400", className)}
    {...props}
  />
);

export const TBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn("divide-y divide-zinc-200 dark:divide-zinc-800", className)}
    {...props}
  />
);

export const Th = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("px-3 py-2 font-medium", className)} {...props} />
);

export const Tr = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("text-zinc-800 dark:text-zinc-200", className)} {...props} />
);

export const Td = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-3 py-2", className)} {...props} />
);
