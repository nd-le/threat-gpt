import { threatArtifactSchema, type ThreatDocData } from "../types";

const MARKER = "THREAT_ARTIFACT_JSON";

/** Strip optional ``` / ```json fence so models can still wrap the object. */
const stripLeadingCodeFence = (s: string): string => {
  let t = s.trimStart();
  if (!t.startsWith("```")) {
    return t;
  }
  const firstNl = t.indexOf("\n");
  t = firstNl === -1 ? "" : t.slice(firstNl + 1);
  const close = t.indexOf("```");
  if (close !== -1) {
    t = t.slice(0, close);
  }
  return t.trim();
};

/** Inner text of the last ```lang ... ``` (or ``` ... ```) block in `text`. */
const extractLastMarkdownFenceInner = (text: string): string | null => {
  const re = /```[a-zA-Z0-9_-]*\s*([\s\S]*?)```/g;
  let m: RegExpExecArray | null = re.exec(text);
  let last: string | null = null;
  while (m !== null) {
    last = (m[1] ?? "").trim();
    m = re.exec(text);
  }
  return last && last.length > 0 ? last : null;
};

/**
 * First complete top-level `{ ... }` in `input`, respecting strings so nested
 * braces in prose do not end the object early. Used when models append text
 * after the JSON (which makes `JSON.parse(wholeTail)` fail).
 */
const extractFirstJsonObject = (input: string): string | null => {
  const start = input.indexOf("{");
  if (start === -1) {
    return null;
  }
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < input.length; i += 1) {
    const c = input[i]!;
    if (inString) {
      if (escape) {
        escape = false;
      } else if (c === "\\") {
        escape = true;
      } else if (c === '"') {
        inString = false;
      }
    } else if (c === '"') {
      inString = true;
    } else if (c === "{") {
      depth += 1;
    } else if (c === "}") {
      depth -= 1;
      if (depth === 0) {
        return input.slice(start, i + 1);
      }
    }
  }
  return null;
};

const toJsonCandidate = (chunk: string | null | undefined): string | null => {
  let t = (chunk ?? "").trim();
  if (!t) {
    return null;
  }
  t = stripLeadingCodeFence(t);
  const balanced = extractFirstJsonObject(t);
  if (balanced) {
    return balanced;
  }
  return t.startsWith("{") ? t : null;
};

/** Collect unique JSON object strings to try (order = preference). */
const collectArtifactJsonCandidates = (assistantText: string): string[] => {
  const idx = assistantText.lastIndexOf(MARKER);
  if (idx === -1) {
    return [];
  }

  const before = assistantText.slice(0, idx);
  const after = assistantText.slice(idx + MARKER.length);

  const out: string[] = [];
  const seen = new Set<string>();
  const push = (chunk: string | null | undefined) => {
    const jsonStr = toJsonCandidate(chunk);
    if (!jsonStr || seen.has(jsonStr)) {
      return;
    }
    seen.add(jsonStr);
    out.push(jsonStr);
  };

  // 1) Canonical: marker then JSON (optionally fenced), optionally trailing prose.
  push(after);

  // 2) Models often put ```json ... ``` then the marker on the next line.
  push(extractLastMarkdownFenceInner(before));

  const positions: number[] = [];
  let pos = before.lastIndexOf("{");
  while (pos !== -1) {
    positions.push(pos);
    pos = before.lastIndexOf("{", pos - 1);
  }
  positions.forEach((p) => {
    push(before.slice(p));
  });

  return out;
};

export const parseThreatArtifact = (assistantText: string): ThreatDocData | null => {
  if (!assistantText.includes(MARKER)) {
    return null;
  }

  const candidates = collectArtifactJsonCandidates(assistantText);
  let lastSchemaError: ThreatDocData | null = null;
  let ready: ThreatDocData | null = null;

  candidates.forEach((jsonStr) => {
    if (ready) {
      return;
    }
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonStr);
    } catch {
      return;
    }
    const parsed = threatArtifactSchema.safeParse(parsedJson);
    if (parsed.success) {
      ready = { status: "ready", ...parsed.data };
      return;
    }
    lastSchemaError = {
      status: "error",
      error: "Artifact JSON did not match the expected schema.",
    };
  });

  if (ready) {
    return ready;
  }

  return (
    lastSchemaError ?? {
      status: "error",
      error: "Artifact JSON could not be parsed.",
    }
  );
};
