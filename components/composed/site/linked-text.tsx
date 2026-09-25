import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import type { NameLink } from "@/content/links";
import { CHROME } from "@/content/site";

/**
 * A link inside running text. The decision it carries: it keeps the text's
 * own colour and is marked by a quiet underline that turns to the link red
 * on hover, so a list of twenty names reads as a list, not a wall of red,
 * and the underline alone tells it apart (WCAG 1.4.1).
 */
export const INLINE_LINK =
  "rounded-(--radius) underline decoration-current/35 decoration-1 underline-offset-[0.2em] transition-colors hover:text-(--link) hover:decoration-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** An internal page (a film on About) rather than an address elsewhere. */
export type PageLink = Readonly<{ phrase: string; href: Route }>;

function escape(phrase: string) {
  return phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Makes a page's linker (content/links.ts). Call it once per page, then call
 * the returned function on each string in reading order: a name is linked
 * at its first mention on the page, or at every mention with `repeat` (for
 * lists such as the clients). Matching is exact, capitals included, and
 * whole-word, longest name first. A plain function, not a component, so the
 * order is the order of the calls. Server-safe; no client JavaScript.
 */
export function createLinker(
  links: ReadonlyArray<NameLink>,
  pages: ReadonlyArray<PageLink> = [],
) {
  const targets = new Map<string, { href: string; internal: boolean }>();
  for (const link of links) {
    targets.set(link.phrase, { href: link.href, internal: false });
  }
  for (const page of pages) {
    targets.set(page.phrase, { href: page.href, internal: true });
  }
  const phrases = [...targets.keys()].sort((a, b) => b.length - a.length);
  const pattern =
    phrases.length > 0
      ? new RegExp(
          `(?<![\\p{L}\\p{N}])(?:${phrases.map(escape).join("|")})(?![\\p{L}\\p{N}])`,
          "gu",
        )
      : null;
  const seen = new Set<string>();

  return function linkText(
    text: string,
    options: Readonly<{ repeat?: boolean }> = {},
  ): ReactNode {
    if (!pattern) return text;
    const nodes: ReactNode[] = [];
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      const phrase = match[0];
      const target = targets.get(phrase);
      if (!target || (seen.has(phrase) && !options.repeat)) continue;
      seen.add(phrase);
      const start = match.index;
      if (start > last) nodes.push(text.slice(last, start));
      nodes.push(
        target.internal ? (
          <Link
            key={`${start}-${phrase}`}
            href={target.href as Route}
            prefetch={false}
            className={INLINE_LINK}
          >
            {phrase}
          </Link>
        ) : (
          <a
            key={`${start}-${phrase}`}
            href={target.href}
            target="_blank"
            rel="noopener"
            className={INLINE_LINK}
          >
            {phrase}
            <span className="sr-only">{CHROME.newTab}</span>
          </a>
        ),
      );
      last = start + phrase.length;
    }
    if (last === 0) return text;
    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
  };
}
