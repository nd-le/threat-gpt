/** OpenAI model ids users can pick in the workbench (keep list short and current). */
export const WORKBENCH_OPENAI_MODELS = [
  "gpt-5.5",
  "gpt-5",
  "gpt-4.1",
] as const;

export type WorkbenchOpenAiModelId = (typeof WORKBENCH_OPENAI_MODELS)[number];

export const DEFAULT_WORKBENCH_MODEL: WorkbenchOpenAiModelId = "gpt-5.5";
