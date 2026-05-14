"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { useMemo } from "react";

import type { ThreatWorkbenchMessage } from "../types";

type UseThreatWorkbenchChatParams = Readonly<{
  model: string;
  apiKey: string;
}>;

export const useThreatWorkbenchChat = ({
  model,
  apiKey,
}: UseThreatWorkbenchChatParams) => {
  const transport = useMemo(
    () => new DefaultChatTransport<ThreatWorkbenchMessage>({
      api: "/api/threat-workbench/chat",
      prepareSendMessagesRequest: ({
        id,
        body,
        messages,
        trigger,
        messageId,
      }) => ({
        body: {
          ...(body ?? {}),
          id,
          messages,
          trigger,
          messageId,
          model,
          apiKey,
        },
      }),
    }),
    [apiKey, model],
  );

  return useChat<ThreatWorkbenchMessage>({ transport });
};
