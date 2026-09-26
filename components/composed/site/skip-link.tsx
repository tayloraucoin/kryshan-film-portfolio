import { CHROME } from "@/content/site";

/**
 * First focusable element on every page (spec §4.2). Invisible until
 * focused, then fixed top-left above the bar. The decision it carries: two
 * forms. Home and Work skip "to the work" (`#work`, which those pages must
 * render on the element holding their first tile); every other page skips
 * "to content" (`#main`).
 */
export function SkipLink({
  to = "content",
}: Readonly<{ to?: "work" | "content" }>) {
  return (
    <a
      href={to === "work" ? "#work" : "#main"}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-background focus:px-3 focus:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
    >
      {CHROME.skip[to]}
    </a>
  );
}
