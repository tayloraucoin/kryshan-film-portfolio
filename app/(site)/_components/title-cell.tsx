import type { Route } from "next";
import Link from "next/link";
import { HOME_H1, HOME_LINKS } from "@/content/home";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/config";
import { siteRoutes } from "@/lib/routes";

/** The Label step: Archivo 600, 11 px, width 88, tracking 18%, uppercase. */
const LABEL =
  "text-[0.6875rem] leading-none font-semibold font-stretch-88% tracking-[0.18em] uppercase";

/** Where each word of the headline goes. */
const WORD_LINKS: Record<(typeof HOME_H1)[number]["to"], Route> = {
  directing: siteRoutes.work({ role: "directing" }),
  camera: siteRoutes.work({ role: "camera" }),
  editing: siteRoutes.work({ role: "editing" }),
  teaching: siteRoutes.teaching,
  about: siteRoutes.about,
};

/**
 * Home's first cell (D-KRD-3, D-KRD-5; handoff §6.3): him, in his voice,
 * never his name. The page's only h1 is his five words, each a link to
 * that part of the site (his round-3 notes), then the place line and, on
 * phones, "Watch ↓" to the first film. No portrait and no empty frame
 * until he supplies one (D-SITE-16).
 */
export function TitleCell({ firstFilmId }: Readonly<{ firstFilmId: string }>) {
  return (
    <div className="flex h-full flex-col justify-end gap-3 pt-6 pb-4 md:py-6 xl:py-2">
      <h1 className="font-heading text-[2rem] leading-[1.02] font-bold font-stretch-80% md:text-[clamp(2rem,2.6vw,2.5rem)] xl:text-[2.5rem]">
        {HOME_H1.map(({ word, to }, index) => (
          <span key={word}>
            {index > 0 ? " " : null}
            <Link
              href={WORD_LINKS[to]}
              className="rounded-(--radius) underline decoration-current/35 decoration-2 underline-offset-[0.12em] transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {word}
            </Link>
            .
          </span>
        ))}
      </h1>
      <p className="max-w-[48ch] text-base leading-[1.4] text-muted-foreground md:text-xl">
        {SITE.place}
      </p>
      <a
        href={`#${firstFilmId}`}
        className={cn(
          LABEL,
          "inline-flex min-h-11 items-center gap-1.5 self-start text-(--link) md:hidden",
        )}
      >
        {HOME_LINKS.watch}
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
