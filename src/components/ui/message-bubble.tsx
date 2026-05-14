import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const bubbleVariants = cva(
  "flex flex-col gap-1 rounded-lg px-3 py-2 text-sm",
  {
    variants: {
      role: {
        user: "ml-4 bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900",
        assistant:
          "mr-4 bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
      },
    },
    defaultVariants: { role: "assistant" },
  },
);

type BubbleLabelProps = HTMLAttributes<HTMLSpanElement>;

export const BubbleLabel = ({ className, ...props }: BubbleLabelProps) => (
  <span
    className={cn(
      "text-[10px] font-medium uppercase tracking-wide opacity-70",
      className,
    )}
    {...props}
  />
);

type BubbleBodyProps = HTMLAttributes<HTMLParagraphElement>;

export const BubbleBody = ({ className, ...props }: BubbleBodyProps) => (
  <p className={cn("whitespace-pre-wrap leading-relaxed", className)} {...props} />
);

type MessageBubbleProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bubbleVariants> & {
    label: string;
  };

export const MessageBubble = ({
  role,
  label,
  className,
  children,
  ...props
}: MessageBubbleProps) => (
  <article className={cn(bubbleVariants({ role }), className)} {...props}>
    <BubbleLabel>{label}</BubbleLabel>
    {children}
  </article>
);
