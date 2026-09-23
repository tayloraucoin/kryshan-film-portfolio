import Link from "next/link";
import { cn } from "@/lib/cn";
import { reviewRoutes } from "@/lib/routes";
import { REVIEW_KITS } from "@/review/kits";

/**
 * Review chrome above a demo: which layout this is, and the three kits it
 * can be shown in. Plain links (the kit is in the path), so switching is a
 * page load and each combination has its own URL and its own comments.
 * Marked `data-review-chrome` so click-to-comment ignores it.
 */
export function KitSwitcher({
  mockId,
  layoutName,
  activeKitId,
  pairedKitId,
}: Readonly<{
  mockId: string;
  layoutName: string;
  activeKitId: string;
  pairedKitId: string;
}>) {
  return (
    <div
      data-review-chrome
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border bg-muted/60 px-4 py-2 text-sm sm:px-6"
    >
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">{layoutName}</span>
        <span className="max-sm:hidden"> · try it in each kit</span>
      </p>
      <nav aria-label="Kit">
        <ul className="flex flex-wrap items-center gap-1.5">
          {REVIEW_KITS.map((kit) => {
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
    </div>
  );
}
