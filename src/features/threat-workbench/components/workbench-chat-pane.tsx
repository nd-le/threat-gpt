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

const ARTIFACT_MARKER = "THREAT_ARTIFACT_JSON";

type WorkbenchChatPaneProps = Readonly<{
  messages: ThreatWorkbenchMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  error: Error | undefined;
  input: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onStop: () => void;
}>;

const STARTER_PROMPTS = [
  "Threat model this design and infer missing details from the architecture.",
  "Identify trust boundaries, sensitive data stores, and top STRIDE risks.",
  "Generate prioritized mitigations and open security questions.",
] as const;

function roleLabel(role: ThreatWorkbenchMessage["role"]) {
  return role === "user" ? "You" : "Assistant";
}

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

const visibleMessageText = (message: ThreatWorkbenchMessage): string => (
  message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .map((text) => (message.role === "assistant" ? stripArtifactText(text) : text))
    .join("\n\n")
    .trim()
);

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
          Paste a design doc, architecture sketch, or workflow. The assistant
          will infer a first-pass STRIDE model when enough detail is present.
        </Text>
        <HStack gap={2} wrap className="mt-3 items-start">
          {STARTER_PROMPTS.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              variant="outline"
              className="justify-start whitespace-normal text-left"
              onClick={() => onInputChange(prompt)}
              disabled={busy}
            >
              {prompt}
            </Button>
          ))}
        </HStack>
      </PanelHeader>

      <VStack gap={3} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {messages.map((message) => {
          const text = visibleMessageText(message);
          if (!text) {
            return null;
          }

          return (
            <MessageBubble
              key={message.id}
              role={message.role === "user" ? "user" : "assistant"}
              label={roleLabel(message.role)}
            >
              <BubbleBody>{text}</BubbleBody>
            </MessageBubble>
          );
        })}
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
