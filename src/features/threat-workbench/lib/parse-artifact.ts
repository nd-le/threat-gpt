import { threatArtifactSchema, type ThreatDocData } from "../types";

const MARKER = "THREAT_ARTIFACT_JSON";

export const parseThreatArtifact = (assistantText: string): ThreatDocData | null => {
  const idx = assistantText.lastIndexOf(MARKER);
  if (idx === -1) {
    return null;
  }

  const raw = assistantText.slice(idx + MARKER.length).trim();
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return { status: "error", error: "Artifact JSON could not be parsed." };
  }

  const parsed = threatArtifactSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return {
      status: "error",
      error: "Artifact JSON did not match the expected schema.",
    };
  }

  return { status: "ready", ...parsed.data };
};
