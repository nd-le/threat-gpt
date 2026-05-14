import {
  ContentArea,
  EdgeEndpoint,
  EdgeFlowList,
  EmptyState,
  Heading,
  HStack,
  Pill,
  Table,
  TableScroll,
  TBody,
  Td,
  Text,
  Th,
  THead,
  Tr,
  VStack,
  graphNodeTone,
} from "@/components/ui";

import type {
  StrideRow,
  ThreatDocData,
  ThreatGraphNode,
} from "../types";

type WorkbenchCanvasPaneProps = Readonly<{
  doc: ThreatDocData | null;
}>;

const STRIDE_META: Record<string, { label: string; focus: string }> = {
  S: { label: "Spoofing", focus: "Identity abuse" },
  T: { label: "Tampering", focus: "Integrity loss" },
  R: { label: "Repudiation", focus: "Weak accountability" },
  I: { label: "Information disclosure", focus: "Data exposure" },
  D: { label: "Denial of service", focus: "Availability loss" },
  E: { label: "Elevation of privilege", focus: "Privilege abuse" },
};

const STRIDE_ORDER = ["S", "T", "R", "I", "D", "E"] as const;

const HIGH_SIGNAL_STRIDE = new Set(["S", "I", "E"]);

const nodeLabel = (
  nodesById: Map<string, ThreatGraphNode>,
  id: string,
): string => nodesById.get(id)?.label ?? id;

const countByStride = (rows: StrideRow[]): Record<string, number> => (
  rows.reduce<Record<string, number>>((acc, row) => {
    const key = row.stride.toUpperCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {})
);

const highestConcentration = (counts: Record<string, number>): string => {
  const [topLetter] = STRIDE_ORDER.reduce<[string, number]>(
    (best, strideLetter) => {
      const count = counts[strideLetter] ?? 0;
      return count > best[1] ? [strideLetter, count] : best;
    },
    ["S", 0],
  );
  return STRIDE_META[topLetter]?.label ?? "Threats";
};

const riskTone = (row: StrideRow): string => {
  if (HIGH_SIGNAL_STRIDE.has(row.stride.toUpperCase())) {
    return "High";
  }
  return "Medium";
};

type SectionHeaderProps = Readonly<{
  title: string;
  description: string;
}>;

const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="mb-4">
    <Heading as="h3" className="mb-1">
      {title}
    </Heading>
    <Text tone="muted" size="sm">
      {description}
    </Text>
  </div>
);

type MetricCardProps = Readonly<{
  label: string;
  value: number;
}>;

const MetricCard = ({ label, value }: MetricCardProps) => (
  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
    <div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
      {value}
    </div>
    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
      {label}
    </div>
  </div>
);

type CoverageCardProps = Readonly<{
  letter: string;
  count: number;
}>;

const CoverageCard = ({ letter, count }: CoverageCardProps) => {
  const meta = STRIDE_META[letter] ?? { label: letter, focus: "Threat class" };
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <HStack gap={2} className="mb-3 justify-between">
        <span className="flex size-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-950">
          {letter}
        </span>
        <span className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          {count}
        </span>
      </HStack>
      <Heading as="h2" className="mb-1">
        {meta.label}
      </Heading>
      <Text tone="muted" size="sm">
        {meta.focus}
      </Text>
    </div>
  );
};

type EmptyPanelProps = Readonly<{
  children: string;
}>;

const EmptyPanel = ({ children }: EmptyPanelProps) => (
  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
    {children}
  </div>
);

type InsightListProps = Readonly<{
  title: string;
  items: string[];
}>;

const InsightList = ({ title, items }: InsightListProps) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
    <SectionHeader
      title={title}
      description="Review before treating this model as final."
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

export const WorkbenchCanvasPane = ({ doc }: WorkbenchCanvasPaneProps) => {
  if (!doc) {
    return (
      <EmptyState
        title="Canvas"
        description="Send a message in the chat. When the model includes a structured artifact, the diagram and STRIDE table appear here."
      />
    );
  }

  if (doc.status === "loading") {
    return (
      <EmptyState
        title="Building view…"
        description="Streaming assistant reply and artifact."
      />
    );
  }

  if (doc.status === "error") {
    return (
      <VStack
        gap={3}
        className="h-full items-center justify-center p-8 text-center"
      >
        <Text tone="danger" size="md" className="font-semibold">
          Canvas could not update
        </Text>
        <Text tone="muted" size="sm" className="max-w-md">
          {doc.error}
        </Text>
      </VStack>
    );
  }

  const {
    assumptions = [],
    graph,
    mitigations = [],
    openQuestions = [],
    stride,
    summary,
  } = doc;
  const nodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const strideCounts = countByStride(stride);
  const concentration = highestConcentration(strideCounts);

  return (
    <ContentArea className="bg-zinc-50 dark:bg-black">
      <VStack gap={8} className="mx-auto max-w-7xl">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <HStack gap={4} className="items-start justify-between">
            <div>
              <Heading as="h3" className="mb-2">
                Threat model
              </Heading>
              <Text size="lg" className="max-w-4xl">
                {summary}
              </Text>
            </div>
            <Pill tone="default" caption="Primary risk area" className="shrink-0">
              {concentration}
            </Pill>
          </HStack>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="System elements" value={graph.nodes.length} />
            <MetricCard label="Trust flows" value={graph.edges.length} />
            <MetricCard label="STRIDE risks" value={stride.length} />
            <MetricCard label="Mitigations" value={mitigations.length} />
          </div>
        </section>

        <section>
          <SectionHeader
            title="STRIDE coverage"
            description="Distribution across the six STRIDE categories."
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {STRIDE_ORDER.map((letter) => (
              <CoverageCard
                key={letter}
                letter={letter}
                count={strideCounts[letter] ?? 0}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <SectionHeader
              title="System map"
              description="Assets, boundaries, and services in scope."
            />
            <HStack gap={2} wrap className="items-stretch">
              {graph.nodes.map((node) => (
                <Pill
                  key={node.id}
                  tone={graphNodeTone(node.kind)}
                  caption={node.kind}
                  className="min-w-36"
                >
                  {node.label}
                </Pill>
              ))}
            </HStack>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <SectionHeader
              title="Data flow"
              description="Security-relevant movement between components."
            />
            <EdgeFlowList className="mt-0">
              {graph.edges.map((edge) => (
                <li key={edge.id}>
                  <EdgeEndpoint>{nodeLabel(nodesById, edge.source)}</EdgeEndpoint>
                  {" -> "}
                  <EdgeEndpoint>{nodeLabel(nodesById, edge.target)}</EdgeEndpoint>
                  {edge.label ? (
                    <span className="text-zinc-500"> - {edge.label}</span>
                  ) : null}
                </li>
              ))}
            </EdgeFlowList>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <SectionHeader
            title="Risk register"
            description="Prioritized abuse cases to drive review and engineering work."
          />
          <TableScroll>
            <Table>
              <THead>
                <Tr>
                  <Th>#</Th>
                  <Th>Category</Th>
                  <Th>Risk</Th>
                  <Th>Threat</Th>
                  <Th>Note</Th>
                </Tr>
              </THead>
              <TBody>
                {stride.map((row) => (
                  <Tr key={row.id}>
                    <Td className="font-mono text-zinc-500">{row.id}</Td>
                    <Td>
                      <Pill tone="default" caption={row.stride} className="inline-block py-1">
                        {STRIDE_META[row.stride]?.label ?? row.stride}
                      </Pill>
                    </Td>
                    <Td className="font-semibold">{riskTone(row)}</Td>
                    <Td>{row.threat}</Td>
                    <Td className="text-zinc-600 dark:text-zinc-400">
                      {row.note ?? "—"}
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </TableScroll>
        </section>

        <section>
          <SectionHeader
            title="Mitigation plan"
            description="Concrete controls and owners inferred from the model."
          />
          {mitigations.length > 0 ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {mitigations.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <HStack gap={2} className="mb-3 justify-between">
                    <Pill tone="default" caption="Priority">
                      {item.priority ?? "P1"}
                    </Pill>
                    {item.threatId ? (
                      <span className="text-xs text-zinc-500">
                        Linked to {item.threatId}
                      </span>
                    ) : null}
                  </HStack>
                  <Heading as="h2" className="mb-2 text-base">
                    {item.title}
                  </Heading>
                  <Text>{item.action}</Text>
                  {item.owner ? (
                    <Text tone="muted" className="mt-3 text-xs">
                      Owner: {item.owner}
                    </Text>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyPanel>
              Ask for an updated threat model with recommended mitigations.
            </EmptyPanel>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <InsightList title="Assumptions" items={assumptions} />
          <InsightList title="Open questions" items={openQuestions} />
        </section>
      </VStack>
    </ContentArea>
  );
};
