export const HomePage = () => (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="flex max-w-2xl flex-col gap-8 text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          AI security review
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50">
          Ship safer software with structured, reviewable AI findings.
        </h1>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          This repository uses a feature-based layout under{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            src/features
          </code>
          . Add review workflows, scanners, and UI as self-contained features,
          then compose them from{" "}
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            src/app
          </code>
          .
        </p>
      </main>
    </div>
);
