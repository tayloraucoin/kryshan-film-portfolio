import type { Metadata } from "next";
import Link from "next/link";
import { TitleCell } from "@/app/(site)/_components/title-cell";
import { PersonJsonLd } from "@/components/composed/site/person-json-ld";
import { SiteShell } from "@/components/composed/site/site-shell";
import { filmsFor } from "@/components/composed/work/film";
import { FilmGrid } from "@/components/composed/work/film-grid";
import { FEATURED, HOME_LINKS, HOME_META } from "@/content/home";
import { SHOWABLE_PROJECTS } from "@/content/projects";
import { createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

/** The share image is the site's social card (`SITE.ogImage`, O-SITE-11). */
export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: HOME_META.title,
    description: HOME_META.description,
    path: siteRoutes.home,
    absoluteTitle: true,
  });
}

/**
 * Home: Demo D, live (spec §6.1, handoff §6), with his Demo D feedback
 * applied (SITE-3a): his line in a two-column first square, the featured
 * films, then "All {n} pieces →". The three strands that once followed it
 * are gone (his round-3 notes: About says it). A tap opens a film in place; every tile is also a real link
 * to its page. Static: nothing here reads a request.
 */
export default function HomePage() {
  const featured = filmsFor(FEATURED);
  const firstFilmId = featured[0] ? `film-${featured[0].slug}` : "work";

  return (
    <SiteShell skipTo="work">
      <PersonJsonLd />
      <div className="flex flex-col gap-16 pt-3 pb-16 md:gap-20 md:pt-4">
        <FilmGrid
          id="work"
          leading={<TitleCell firstFilmId={firstFilmId} />}
          films={featured}
          preloadFirst
        />
        <p className="px-3 md:px-6">
          <Link
            href={siteRoutes.work()}
            className="inline-flex min-h-11 items-center gap-2 rounded-(--radius) font-heading text-[1.75rem] leading-none font-bold font-stretch-80% transition-colors hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {HOME_LINKS.allPieces(SHOWABLE_PROJECTS.length)}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
