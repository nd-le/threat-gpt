import type { ReactNode } from "react";
import { siteMetadata } from "@/lib/site-metadata";
import { rootFontClassName } from "./fonts";
import { Providers } from "./providers";
import "./globals.css";

export const metadata = siteMetadata;

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className={`${rootFontClassName} h-full antialiased`}>
    <body className="flex min-h-full flex-col">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
