import type { ReactNode } from "react";

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

/**
 * Client providers (theme, query client, etc.) go here — add `"use client"` when needed.
 * Until then this stays a server component pass-through so the root layout stays simple.
 */
export const Providers = ({ children }: ProvidersProps) => children;
