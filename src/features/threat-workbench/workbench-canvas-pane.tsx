import { ContentArea, VStack } from "@/components/ui";

import { ArchitectureFlow } from "./components/canvas/architecture-flow";
import { CanvasEmptyState } from "./components/canvas/canvas-empty-state";
import { CanvasErrorState } from "./components/canvas/canvas-error-state";
import { CanvasLoadingState } from "./components/canvas/canvas-loading-state";
import { InsightList } from "./components/canvas/insight-list";
import { RiskRegister } from "./components/canvas/risk-register";
import { ThreatModelSummary } from "./components/canvas/threat-model-summary";
import type { ThreatDocData } from "./types";

type WorkbenchCanvasPaneProps = Readonly<{
  doc: ThreatDocData | null;
}>;

export const WorkbenchCanvasPane = ({ doc }: WorkbenchCanvasPaneProps) => {
  if (!doc) {
    return <CanvasEmptyState />;
  }

  if (doc.status === "loading") {
    return <CanvasLoadingState />;
  }

  if (doc.status === "error") {
    return <CanvasErrorState error={doc.error} />;
  }

  const {
    assumptions = [],
    graph,
    mitigations = [],
    openQuestions = [],
    stride,
    summary,
  } = doc;
  return (
    <ContentArea className="bg-zinc-50 dark:bg-black">
      <VStack gap={8} className="mx-auto max-w-7xl">
        <ThreatModelSummary summary={summary} />
        <ArchitectureFlow edges={graph.edges} nodes={graph.nodes} />
        <RiskRegister mitigations={mitigations} stride={stride} />

        <section className="grid gap-4 lg:grid-cols-2">
          <InsightList title="Assumptions" items={assumptions} />
          <InsightList title="Open questions" items={openQuestions} />
        </section>
      </VStack>
    </ContentArea>
  );
};
