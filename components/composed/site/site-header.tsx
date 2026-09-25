import Link from "next/link";
import { CHROME, NAV } from "@/content/site";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import { siteRoutes } from "@/lib/routes";

export type NavId = (typeof NAV)[number]["id"];

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/** A visible ring for keyboard focus, in the kit's `ring` (red 300). */
const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Each nav item is at least 44 px tall through padding. */
const NAV_ITEM = cn(
  LABEL,
  "inline-flex min-h-11 items-center text-foreground transition-colors hover:text-(--link)",
  FOCUS,
);

/**
 * The current page: a 2 px `--link` underline; the text keeps its colour.
 * Joined to `NAV_ITEM` without `cn()`: its merge reads
 * `decoration-(color:--link)` and `decoration-2` as one group and drops the
 * colour.
 */
const CURRENT =
  "underline decoration-(color:--link) decoration-2 underline-offset-[6px]";

/**
 * The bar (spec §4.2, D-KRD-3, D-KRD-4): his name once, and the four pages.
 * A decision carried here: the phone split is CSS, not script. Below 768
 * the sticky line holds the wordmark and Contact (the link that converts),
 * and Work · About · Teaching sit in a row beneath it that scrolls away; at
 * ≥768 it is one 56 px line. Each link exists once in the accessibility tree
 * at any width. The hairline appears after 8 px of scroll through a CSS
 * scroll timeline (`app/globals.css`, "Site chrome"), so the bar needs no
 * JavaScript. Its height is `--bar-h`, which the focus offset also reads.
 *
 * Server component. The page says which item is current, through
 * `SiteShell`; a layout can't know (M-SITE-1).
 */
export function SiteHeader({
  current,
  currentKind = "page",
}: Readonly<{
  current?: NavId;
  currentKind?: "page" | "true";
}>) {
  const pages = NAV.filter((item) => item.id !== "contact");

  function navLink(item: (typeof NAV)[number]) {
    const isCurrent = item.id === current;
    return (
      <Link
        href={item.href}
        aria-current={isCurrent ? currentKind : undefined}
        className={isCurrent ? `${NAV_ITEM} ${CURRENT}` : NAV_ITEM}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <>
      <header
        data-site-bar
        data-review-id="site-header"
        className="sticky top-0 z-30 flex h-(--bar-h) items-center justify-between gap-4 bg-background px-3 md:px-6"
        style={{ viewTransitionName: "site-bar" }}
      >
        <Link
          href={siteRoutes.home}
          aria-label={CHROME.wordmarkName}
          className={cn(
            "inline-flex min-h-11 items-center font-heading text-xl leading-none font-extrabold font-stretch-72% tracking-[0.01em] text-primary uppercase",
            FOCUS,
          )}
        >
          {SITE.name}
        </Link>
        <nav aria-label={CHROME.landmarks.primary}>
          <ul className="flex items-center gap-x-5">
            {NAV.map((item) => (
              <li
                key={item.id}
                className={item.id === "contact" ? undefined : "max-md:hidden"}
              >
                {navLink(item)}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <nav
        aria-label={CHROME.landmarks.morePages}
        className="border-b border-border/40 px-3 md:hidden"
      >
        <ul className="flex gap-x-5">
          {pages.map((item) => (
            <li key={item.id}>{navLink(item)}</li>
          ))}
        </ul>
      </nav>
    </>
  );
}
