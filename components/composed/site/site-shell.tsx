import type { ReactNode } from "react";
import { SiteFooter } from "@/components/composed/site/site-footer";
import { SiteHeader, type NavId } from "@/components/composed/site/site-header";
import { SkipLink } from "@/components/composed/site/skip-link";

/**
 * Every public page renders its chrome through this (M-SITE-1): skip link,
 * bar, `<main id="main">`, footer. The decision it carries: the chrome is
 * per page, not in `app/(site)/layout.tsx`, because the bar's
 * `aria-current` and the skip link's words depend on the page, a layout
 * can't see which page it wraps, and reading the path would put a client
 * component on every page (spec §10).
 *
 * `main` takes `tabIndex={-1}` so the skip link moves focus into it, not
 * just the scroll position. A page that passes `skipTo="work"` must render
 * `id="work"` (also focusable) on the element that holds its first tile.
 *
 * Server component.
 */
export function SiteShell({
  current,
  currentKind = "page",
  skipTo = "content",
  children,
}: Readonly<{
  /** The nav item for this page. Omit on Home and the 404. */
  current?: NavId;
  /** "page" on that page itself; "true" on a page inside its section (detail pages → Work). */
  currentKind?: "page" | "true";
  /** "work" on Home and Work (the page must render id="work"); default "content". */
  skipTo?: "work" | "content";
  children: ReactNode;
}>) {
  return (
    <>
      <SkipLink to={skipTo} />
      <SiteHeader current={current} currentKind={currentKind} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
