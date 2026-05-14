"use client";

import type { Dispatch, SetStateAction } from "react";

import {
  Button,
  HStack,
  Textarea,
} from "@/components/ui";

type ChatComposerProps = Readonly<{
  busy: boolean;
  input: string;
  onInputChange: Dispatch<SetStateAction<string>>;
  onStop: () => void;
  onSubmit: () => void;
}>;

export const ChatComposer = ({
  busy,
  input,
  onInputChange,
  onStop,
  onSubmit,
}: ChatComposerProps) => (
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
      placeholder="e.g. B2B SaaS with OAuth2, Postgres, Stripe webhooks..."
      value={input}
      disabled={busy}
      onChange={(e) => onInputChange(e.target.value)}
    />
    <HStack gap={2}>
      <Button type="submit" disabled={busy || !input.trim()}>
        {busy ? "Thinking..." : "Send"}
      </Button>
      {busy ? (
        <Button type="button" variant="outline" onClick={onStop}>
          Stop
        </Button>
      ) : null}
    </HStack>
  </form>
);
