import Link from "next/link";

import {
  Heading,
  Kbd,
  Text,
  VStack,
} from "@/components/ui";

export const HomePage = () => (
  <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
    <VStack gap={8} className="max-w-2xl text-center sm:text-left">
      <Text size="sm" className="font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        AI security review
      </Text>
      <Heading as="h1">
        Ship safer software with structured, reviewable AI findings.
      </Heading>
      <Text tone="muted" size="lg">
        This repository uses a feature-based layout under{" "}
        <Kbd>src/features</Kbd>. Add review workflows, scanners, and UI as
        self-contained features, then compose them from <Kbd>src/app</Kbd>.
      </Text>
      <p>
        <Link
          className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          href="/workbench"
        >
          Open threat workbench →
        </Link>
      </p>
    </VStack>
  </div>
);
