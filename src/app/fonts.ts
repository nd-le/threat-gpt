import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** CSS variable classes for the document root; keep font config out of `layout.tsx`. */
export const rootFontClassName = `${geistSans.variable} ${geistMono.variable}`;
