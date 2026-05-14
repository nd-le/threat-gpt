import { isTextUIPart } from "ai";

import type { ThreatWorkbenchMessage } from "../types";

const ARTIFACT_MARKER = "THREAT_ARTIFACT_JSON";

const stripArtifactText = (text: string): string => {
  const markerIdx = text.lastIndexOf(ARTIFACT_MARKER);
  if (markerIdx === -1) {
    return text;
  }

  const beforeMarker = text.slice(0, markerIdx).trimEnd();
  return beforeMarker
    .replace(/\n?```(?:json)?\s*[\s\S]*?```\s*$/i, "")
    .trimEnd();
};

export const getVisibleMessageText = (
  message: ThreatWorkbenchMessage,
): string => (
  message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .map((text) => (message.role === "assistant" ? stripArtifactText(text) : text))
    .join("\n\n")
    .trim()
);
