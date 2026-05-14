import { EmptyPanel } from "./empty-panel";
import { SectionHeader } from "./section-header";

type InsightListProps = Readonly<{
  title: string;
  items: string[];
}>;

export const InsightList = ({ title, items }: InsightListProps) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
    <SectionHeader
      title={title}
      description="Inputs to confirm during design review."
    />
    {items.length > 0 ? (
      <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <EmptyPanel>No entries yet.</EmptyPanel>
    )}
  </div>
);
