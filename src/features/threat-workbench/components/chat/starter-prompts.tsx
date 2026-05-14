"use client";

import type { Dispatch, SetStateAction } from "react";

import { Button, HStack } from "@/components/ui";

import { STARTER_PROMPTS } from "../../config/prompts";

type StarterPromptsProps = Readonly<{
  disabled: boolean;
  onInputChange: Dispatch<SetStateAction<string>>;
}>;

export const StarterPrompts = ({
  disabled,
  onInputChange,
}: StarterPromptsProps) => (
  <HStack gap={2} wrap className="mt-3 items-start">
    {STARTER_PROMPTS.map((prompt) => (
      <Button
        key={prompt}
        type="button"
        variant="outline"
        className="justify-start whitespace-normal text-left"
        onClick={() => onInputChange(prompt)}
        disabled={disabled}
      >
        {prompt}
      </Button>
    ))}
  </HStack>
);
