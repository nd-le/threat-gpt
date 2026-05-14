import { Text } from "@/components/ui";

import type { ThreatGraphEdge, ThreatGraphNode } from "../../types";

import { MermaidDiagram } from "./mermaid-diagram";
import { SectionHeader } from "./section-header";

type ArchitectureFlowProps = Readonly<{
  edges: ThreatGraphEdge[];
  nodes: ThreatGraphNode[];
}>;

const mermaidId = (raw: string, index: number) => (
  `n${index}_${raw.replace(/[^a-zA-Z0-9_]/g, "_")}`
);

const mermaidText = (raw: string) => (
  raw
    .replace(/"/g, "'")
    .replace(/[<>]/g, "")
    .trim()
);

const mermaidEdgeLabel = (raw: string | undefined) => (
  mermaidText(raw ?? "flow").replace(/\|/g, "/")
);

const nodeStatement = (id: string, node: ThreatGraphNode) => {
  const label = mermaidText(node.label);
  if (node.kind === "actor") {
    return `${id}(["${label}"])`;
  }
  if (node.kind === "boundary") {
    return `${id}{{"${label}"}}`;
  }
  if (node.kind === "store") {
    return `${id}[("${label}")]`;
  }
  return `${id}["${label}"]`;
};

const buildMermaidChart = (nodes: ThreatGraphNode[], edges: ThreatGraphEdge[]) => {
  const idsByNode = new Map(nodes.map((node, index) => [
    node.id,
    mermaidId(node.id, index),
  ]));

  return [
    "flowchart LR",
    ...nodes.map((node) => nodeStatement(idsByNode.get(node.id)!, node)),
    ...edges.flatMap((edge) => {
      const source = idsByNode.get(edge.source);
      const target = idsByNode.get(edge.target);
      if (!source || !target) {
        return [];
      }
      return `${source} -->|${mermaidEdgeLabel(edge.label)}| ${target}`;
    }),
    "classDef actor fill:#fffbeb,stroke:#f59e0b,color:#111827;",
    "classDef boundary fill:#ecfdf5,stroke:#10b981,color:#111827,stroke-dasharray: 4 3;",
    "classDef system fill:#ecfeff,stroke:#06b6d4,color:#111827;",
    "classDef store fill:#f5f3ff,stroke:#8b5cf6,color:#111827;",
    ...nodes.map((node) => `class ${idsByNode.get(node.id)!} ${node.kind};`),
  ].join("\n");
};

export const ArchitectureFlow = ({ edges, nodes }: ArchitectureFlowProps) => {
  const chart = buildMermaidChart(nodes, edges);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <SectionHeader
        title="Data-flow diagram"
        description="System components, trust boundaries, data stores, and security-relevant flows."
      />

      <MermaidDiagram chart={chart} />

      <Text tone="muted" size="sm" className="mt-3">
        Mermaid source is generated from the structured graph so reviewers can
        inspect the same architecture in a familiar diagram format.
      </Text>
    </section>
  );
};
