"use client";

import { useMemo, useState } from "react";

import {
  Field,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Screen,
  SplitMain,
  SplitView,
  TextLink,
  TopBar,
} from "@/components/ui";

import { DEFAULT_WORKBENCH_MODEL, WORKBENCH_OPENAI_MODELS } from "./config";
import { WorkbenchCanvasPane } from "./components/workbench-canvas-pane";
import { WorkbenchChatPane } from "./components/workbench-chat-pane";
import { useThreatWorkbenchChat } from "./hooks";
import { getLatestThreatDoc } from "./lib";

export const ThreatWorkbench = () => {
  const [model, setModel] = useState<string>(DEFAULT_WORKBENCH_MODEL);
  const [apiKey, setApiKey] = useState("");
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
  } = useThreatWorkbenchChat({ model, apiKey });

  const latestDoc = useMemo(() => getLatestThreatDoc(messages), [messages]);

  return (
    <Screen>
      <TopBar>
        <TextLink href="/">← Home</TextLink>
        <Heading as="h2">Threat workbench</Heading>
        <HStack gap={2} className="flex-wrap">
          <Field label="Model" className="w-auto shrink-0">
            <NativeSelect value={model} onChange={(e) => setModel(e.target.value)}>
              {WORKBENCH_OPENAI_MODELS.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="OpenAI key" className="min-w-[12rem] flex-1">
            <Input
              type="password"
              autoComplete="off"
              placeholder="sk-…"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="max-w-xs font-mono"
            />
          </Field>
        </HStack>
      </TopBar>

      <SplitView>
        <WorkbenchChatPane
          messages={messages}
          status={status}
          error={error}
          input={input}
          onInputChange={setInput}
          onStop={() => {
            stop().catch(() => {});
          }}
          onSubmit={() => {
            const text = input.trim();
            if (!text) {
              return;
            }
            sendMessage({ text }).catch(() => {});
            setInput("");
          }}
        />
        <SplitMain>
          <WorkbenchCanvasPane doc={latestDoc} />
        </SplitMain>
      </SplitView>
    </Screen>
  );
};
