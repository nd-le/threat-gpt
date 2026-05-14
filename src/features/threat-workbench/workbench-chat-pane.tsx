"use client";

import type { Dispatch, SetStateAction } from "react";

import {
  AlertBanner,
  Heading,
  Panel,
  PanelFooter,
  PanelHeader,
  Text,
} from "@/components/ui";

import { ChatComposer } from "./components/chat/chat-composer";
import { ChatMessageList } from "./components/chat/chat-message-list";
import { StarterPrompts } from "./components/chat/starter-prompts";
import type { ThreatWorkbenchMessage } from "./types";

type WorkbenchChatPaneProps = Readonly<{
  messages: ThreatWorkbenchMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
  error: Error | undefined;
  input: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onStop: () => void;
}>;

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
        <StarterPrompts disabled={busy} onInputChange={onInputChange} />
      </PanelHeader>

      <ChatMessageList messages={messages} />

      {error ? <AlertBanner>{error.message}</AlertBanner> : null}

      <PanelFooter>
        <ChatComposer
          busy={busy}
          input={input}
          onInputChange={onInputChange}
          onStop={onStop}
          onSubmit={onSubmit}
        />
      </PanelFooter>
    </Panel>
  );
};
