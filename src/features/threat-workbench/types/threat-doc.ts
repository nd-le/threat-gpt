import { z } from "zod";

export const threatGraphNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: z.enum(["actor", "system", "store", "boundary"]),
});

export const threatGraphEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
});

export const strideRowSchema = z.object({
  id: z.string(),
  stride: z.string(),
  threat: z.string(),
  note: z.string().optional(),
});

export const threatArtifactSchema = z.object({
  summary: z.string(),
  graph: z.object({
    nodes: z.array(threatGraphNodeSchema),
    edges: z.array(threatGraphEdgeSchema),
  }),
  stride: z.array(strideRowSchema),
});

export type ThreatGraphNode = z.infer<typeof threatGraphNodeSchema>;
export type ThreatGraphEdge = z.infer<typeof threatGraphEdgeSchema>;
export type StrideRow = z.infer<typeof strideRowSchema>;
export type ThreatArtifact = z.infer<typeof threatArtifactSchema>;

export type ThreatDocData =
  | { status: "loading" }
  | { status: "error"; error: string }
  | ({ status: "ready" } & ThreatArtifact);
