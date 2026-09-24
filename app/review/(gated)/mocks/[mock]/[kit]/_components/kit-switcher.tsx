import type { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { reviewRoutes } from "@/lib/routes";
import type { ReviewKit } from "@/review/kits/types";

/**
 * Review chrome above a demo: which layout this is, the kits of its round
 * it can be shown in, and its before/after partner (D-KRD-17, 18). Plain
 * links (the kit is in the path), so switching is a page load and each
 * combination has its own URL and its own comments. With one kit in the
 * round there is nothing to switch, so no kit buttons render. Marked
 * `data-review-chrome` so click-to-comment ignores it.
 */
export function KitSwitcher({
  mockId,
  layoutName,
  activeKitId,
  pairedKitId,
  kits,
  compare,
}: Readonly<{
  mockId: string;
  layoutName: string;
  activeKitId: string;
  pairedKitId: string;
  kits: ReadonlyArray<ReviewKit>;
  compare?: { href: Route; label: string };
}>) {
  const switchable = kits.length > 1;

  return (
    <div
      data-review-chrome
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border bg-muted/60 px-4 py-2 text-sm sm:px-6"
    >
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">{layoutName}</span>
        {switchable ? (
          <span className="max-sm:hidden"> · try it in each kit</span>
        ) : null}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {compare ? (
          <Link
            href={compare.href}
            className="font-medium underline underline-offset-4"
          >
            {compare.label} →
          </Link>
        ) : null}
        {switchable ? (
          <nav aria-label="Kit">
            <ul className="flex flex-wrap items-center gap-1.5">
              {kits.map((kit) => {
                const active = kit.id === activeKitId;
                return (
                  <li key={kit.id}>
                    <Link
                      href={reviewRoutes.mock(mockId, kit.id)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 transition-colors",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background hover:bg-muted",
                      )}
                    >
                      Kit {kit.letter}
                      {kit.id === pairedKitId ? (
                        <span
                          className={cn(
                            "text-xs",
                            active ? "opacity-80" : "text-muted-foreground",
                          )}
                        >
                          (designed for)
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
