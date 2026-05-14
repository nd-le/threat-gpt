"use client";

import { isTextUIPart } from "ai";
import type { Dispatch, SetStateAction } from "react";

import {
  AlertBanner,
  BubbleBody,
  Button,
  Heading,
  HStack,
  MessageBubble,
  Panel,
  PanelFooter,
  PanelHeader,
  Text,
  Textarea,
  VStack,
} from "@/components/ui";

import type { ThreatWorkbenchMessage } from "../types";

type WorkbenchChatPaneProps = Readonly<{
  messages: ThreatWorkbenchMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  error: Error | undefined;
  input: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onStop: () => void;
}>;

function roleLabel(role: ThreatWorkbenchMessage["role"]) {
  return role === "user" ? "You" : "Assistant";
}

export const WorkbenchChatPane = ({
  messages,
  status,
  error,
  input,
  onInputChange,
  onSubmit,
  onStop,
}: WorkbenchChatPaneProps) => {
  const busy = status === "submitted" || status === "streaming";

  return (
    <Panel variant="rail">
      <PanelHeader>
        <Heading as="h2">Session</Heading>
        <Text tone="muted" size="sm" className="mt-1">
          Describe the system; ask for threats when ready.
        </Text>
      </PanelHeader>

      <VStack gap={3} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role === "user" ? "user" : "assistant"}
            label={roleLabel(message.role)}
          >
            {message.parts.filter(isTextUIPart).map((part, i) => (
              <BubbleBody key={`${message.id}-text-${i}`}>
                {part.text}
              </BubbleBody>
            ))}
          </MessageBubble>
        ))}
      </VStack>

      {error ? <AlertBanner>{error.message}</AlertBanner> : null}

      <PanelFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!busy) {
              onSubmit();
            }
          }}
        >
          <Textarea
            className="mb-2"
            placeholder="e.g. B2B SaaS with OAuth2, Postgres, Stripe webhooks…"
            value={input}
            disabled={busy}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <HStack gap={2}>
            <Button type="submit" disabled={busy || !input.trim()}>
              {busy ? "Thinking…" : "Send"}
            </Button>
            {busy ? (
              <Button type="button" variant="outline" onClick={onStop}>
                Stop
              </Button>
            ) : null}
          </HStack>
        </form>
      </PanelFooter>
    </Panel>
  );
};
