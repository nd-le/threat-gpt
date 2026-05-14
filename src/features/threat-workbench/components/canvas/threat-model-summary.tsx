import {
  Heading,
  Text,
} from "@/components/ui";

type ThreatModelSummaryProps = Readonly<{
  summary: string;
}>;

export const ThreatModelSummary = ({ summary }: ThreatModelSummaryProps) => (
  <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
    <Heading as="h3" className="mb-2">
      Executive summary
    </Heading>
    <Text size="lg" className="max-w-4xl">
      {summary}
    </Text>
  </section>
);
