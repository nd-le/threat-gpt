"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type MermaidDiagramProps = Readonly<{
  chart: string;
}>;

export const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const container = ref.current;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            fontFamily: "inherit",
            primaryColor: "#f8fafc",
            primaryBorderColor: "#94a3b8",
            primaryTextColor: "#111827",
            lineColor: "#64748b",
            secondaryColor: "#ecfeff",
            tertiaryColor: "#f5f3ff",
          },
        });

        const { svg } = await mermaid.render(`threat-workbench-${id}`, chart);
        if (!cancelled && container) {
          container.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Diagram could not render.");
        }
      }
    };

    render().catch(() => {});

    return () => {
      cancelled = true;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
        Mermaid diagram could not render: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="min-h-72 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none"
    />
  );
};
