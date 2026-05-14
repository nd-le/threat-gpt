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

import type { ThreatDocData } from "../types";

type WorkbenchCanvasPaneProps = Readonly<{
  doc: ThreatDocData | null;
}>;

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

  const { summary, graph, stride } = doc;

  return (
    <ContentArea>
      <VStack gap={8} className="mb-0">
        <section>
          <Heading as="h3" className="mb-2">
            Summary
          </Heading>
          <Text size="sm">{summary}</Text>
        </section>

        <section>
          <Heading as="h3" className="mb-3">
            Data flow
          </Heading>
          <HStack gap={2} wrap>
            {graph.nodes.map((node) => (
              <Pill key={node.id} tone={graphNodeTone(node.kind)} caption={node.kind}>
                {node.label}
              </Pill>
            ))}
          </HStack>
          <EdgeFlowList>
            {graph.edges.map((edge) => (
              <li key={edge.id}>
                <EdgeEndpoint>{edge.source}</EdgeEndpoint>
                {" → "}
                <EdgeEndpoint>{edge.target}</EdgeEndpoint>
                {edge.label ? (
                  <span className="text-zinc-500"> — {edge.label}</span>
                ) : null}
              </li>
            ))}
          </EdgeFlowList>
        </section>

        <section>
          <Heading as="h3" className="mb-3">
            STRIDE
          </Heading>
          <TableScroll>
            <Table>
              <THead>
                <Tr>
                  <Th>#</Th>
                  <Th>Letter</Th>
                  <Th>Threat</Th>
                  <Th>Note</Th>
                </Tr>
              </THead>
              <TBody>
                {stride.map((row) => (
                  <Tr key={row.id}>
                    <Td className="font-mono text-zinc-500">{row.id}</Td>
                    <Td className="font-semibold">{row.stride}</Td>
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
      </VStack>
    </ContentArea>
  );
};
