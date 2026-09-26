import { ClippingDialog } from "@/components/composed/press/clipping-dialog";
import {
  inQuotes,
  pressCitation,
  type ResolvedPressQuote,
} from "@/content/press";
import { CHROME, PRESS_COPY } from "@/content/site";
import { cn } from "@/lib/cn";

const FOCUS =
  "rounded-(--radius) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * One press quote and where it ran, on About and a film's page (spec §6.3,
 * §6.4). The decisions it carries: the quote is the only italic on the
 * site (spec §4.1); the source line says who said it and when ("The
 * Province, 2002"), because a quote from 2002 must not pass for this
 * year's; the source links to the article when it's online, and offers the
 * printed clipping when there's one on file. Server component; only the
 * clipping's button is a client leaf.
 */
export function PressQuote({
  item,
  size = "body",
  showFilm = false,
  className,
}: Readonly<{
  item: ResolvedPressQuote;
  /** "lead" on About's 2 × 2; "body" beside a film's story. */
  size?: "lead" | "body";
  /** Name the film after the source ("…, on Jack"): on About, where the quote is away from its film. */
  showFilm?: boolean;
  className?: string;
}>) {
  const { source } = item;
  const citation = pressCitation(item);

  return (
    <figure className={cn("flex max-w-[68ch] flex-col gap-1", className)}>
      <blockquote
        className={cn(
          "font-(family-name:--font-quote) italic",
          size === "lead" && "text-lg",
        )}
      >
        {inQuotes(item.quote)}
      </blockquote>
      <figcaption className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
        <span>
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noopener"
              className={cn(
                "text-(--link) underline-offset-4 hover:underline",
                FOCUS,
              )}
            >
              {citation}
              <span className="sr-only">{CHROME.newTab}</span>
            </a>
          ) : (
            citation
          )}
          {showFilm && item.film ? PRESS_COPY.onFilm(item.film) : null}
        </span>
        <ClippingDialog source={source} />
      </figcaption>
    </figure>
  );
}
