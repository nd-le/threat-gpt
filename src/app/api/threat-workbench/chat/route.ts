import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
} from "ai";

import {
  DEFAULT_WORKBENCH_MODEL,
  THREAT_WORKBENCH_SYSTEM,
} from "@/features/threat-workbench/config";
import { parseThreatArtifact } from "@/features/threat-workbench/lib";
import type { ThreatWorkbenchMessage } from "@/features/threat-workbench/types";

export const maxDuration = 120;

type ChatRequestBody = {
  messages: ThreatWorkbenchMessage[];
  model?: string;
  apiKey?: string;
  id: string;
  trigger?: string;
  messageId?: string;
};

export const POST = async (req: Request) => {
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { messages, model, apiKey } = body;
  if (!Array.isArray(messages)) {
    return Response.json({ error: "Expected messages array." }, { status: 400 });
  }

  const resolvedKey = apiKey?.trim() || process.env.OPENAI_API_KEY;
  if (!resolvedKey) {
    return Response.json(
      {
        error:
          "Missing OpenAI key: paste a key in the workbench or set OPENAI_API_KEY for server-side use.",
      },
      { status: 401 },
    );
  }

  const openai = createOpenAI({ apiKey: resolvedKey });
  const modelId = model?.trim() || DEFAULT_WORKBENCH_MODEL;

  const stream = createUIMessageStream<ThreatWorkbenchMessage>({
    execute: async ({ writer }) => {
      writer.write({
        type: "data-threatDoc",
        id: "artifact",
        data: { status: "loading" },
      });

      const result = streamText({
        model: openai(modelId),
        system: THREAT_WORKBENCH_SYSTEM,
        messages: await convertToModelMessages(messages, {
          convertDataPart: () => undefined,
        }),
      });

      writer.merge(result.toUIMessageStream());
      await result.consumeStream();

      const text = await result.text;
      const artifact = parseThreatArtifact(text);
      writer.write({
        type: "data-threatDoc",
        id: "artifact",
        data:
          artifact ?? {
            status: "error",
            error:
              "No THREAT_ARTIFACT_JSON block in this reply. Continue the conversation, then ask for an updated threat view when ready.",
          },
      });
    },
  });

  return createUIMessageStreamResponse({ stream });
};
