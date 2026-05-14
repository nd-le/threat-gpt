import type { ThreatDocData, ThreatWorkbenchMessage } from "../types";

/** Latest reconciled threat canvas payload from the assistant turn, if any. */
export const getLatestThreatDoc = (
  messages: ThreatWorkbenchMessage[],
): ThreatDocData | null => {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role === "assistant") {
      for (let j = message.parts.length - 1; j >= 0; j -= 1) {
        const part = message.parts[j];
        if (part.type === "data-threatDoc" && part.id === "artifact") {
          return part.data;
        }
      }
    }
  }
  return null;
};
