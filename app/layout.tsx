import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { activeKit } from "@/brand/active";
import { kitClassName, kitVars } from "@/brand/kit-vars";
import { cn } from "@/lib/cn";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata();

/**
 * The root layout does three things and no more: loads the stylesheet, applies
 * the active brand kit to `<html>`, and renders children. Site chrome lives in
 * `app/(site)/layout.tsx` so the review layer can carry its own.
 *
 * `next/font` loaders belong to the kit that uses them (`brand/production.ts`
 * supplies `fontClassName`); this file never names a typeface.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  const kit = activeKit();

  return (
    <html
      lang="en"
      data-kit={kit.id}
      className={cn("h-full", kitClassName(kit))}
      style={kitVars(kit) as CSSProperties}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
