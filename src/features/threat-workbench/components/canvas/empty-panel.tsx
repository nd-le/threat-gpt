type EmptyPanelProps = Readonly<{
  children: string;
}>;

export const EmptyPanel = ({ children }: EmptyPanelProps) => (
  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
    {children}
  </div>
);
