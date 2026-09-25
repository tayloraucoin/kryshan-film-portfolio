import { ChevronRight } from "lucide-react";
import type { Credit } from "@/content/credits";
import { cn } from "@/lib/cn";

/** How many credits show before "All {n} credits" (D-SITE-7). */
const VISIBLE = 18;

const COLUMNS = "columns-1 gap-x-8 md:columns-2 lg:columns-3";

/**
 * His released behind-the-scenes and EPK credits (spec §6.2, D-SITE-7):
 * Title (Year) · format · network, newest first, reading down each column.
 * The decision it carries: the rest are a native `<details>` away, not
 * behind a script. Chromium opens a closed `<details>` when find-in-page
 * matches inside it, and it works without JavaScript. Its summary names the
 * total and doesn't change when open. Server component.
 */
export function CreditsList({
  credits,
  summary,
  className,
}: Readonly<{
  credits: ReadonlyArray<Credit>;
  /** "All {n} credits". */
  summary: string;
  className?: string;
}>) {
  const first = credits.slice(0, VISIBLE);
  const rest = credits.slice(VISIBLE);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <CreditColumns credits={first} />
      {rest.length > 0 ? (
        <details className="group">
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-(--radius) text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] text-(--link) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <ChevronRight
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform group-open:rotate-90"
            />
            {summary}
          </summary>
          <CreditColumns credits={rest} className="pt-2" />
        </details>
      ) : null}
    </div>
  );
}

function CreditColumns({
  credits,
  className,
}: Readonly<{ credits: ReadonlyArray<Credit>; className?: string }>) {
  return (
    <ul className={cn(COLUMNS, className)}>
      {credits.map((credit) => (
        <li
          key={`${credit.title}-${credit.year}`}
          className="break-inside-avoid pb-2 leading-snug"
        >
          {credit.title} ({credit.year}){" "}
          <span className="text-muted-foreground">
            · {credit.format} · {credit.network}
          </span>
        </li>
      ))}
    </ul>
  );
}
