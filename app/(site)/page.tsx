import type { Metadata } from "next";
import Link from "next/link";
import { TitleCell } from "@/app/(site)/_components/title-cell";
import { JsonLd } from "@/components/composed/site/json-ld";
import { SiteShell } from "@/components/composed/site/site-shell";
import { filmsFor } from "@/components/composed/work/film";
import { FilmGrid } from "@/components/composed/work/film-grid";
import { FilmRow } from "@/components/composed/work/film-row";
import {
  CAMERA_ROW,
  DIRECTING_ROW,
  FEATURED,
  HOME_LINKS,
  HOME_META,
} from "@/content/home";
import { posterFor } from "@/content/posters";
import { findShowableProject, SHOWABLE_PROJECTS } from "@/content/projects";
import { FILM_COPY, SOCIALS, STRANDS, type Strand } from "@/content/site";
import { SITE } from "@/lib/config";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";
import { personJsonLd } from "@/lib/structured-data";

/** The share image until his social card exists (O-SITE-11): Just Watch Us's poster. */
const OG_SLUG = "just-watch-us";

export function generateMetadata(): Metadata {
  const poster = posterFor(OG_SLUG);
  const title = findShowableProject(OG_SLUG)?.title ?? SITE.name;
  return createPageMetadata({
    title: HOME_META.title,
    description: HOME_META.description,
    path: siteRoutes.home,
    absoluteTitle: true,
    image: {
      url: poster.src,
      width: poster.width,
      height: poster.height,
      alt: FILM_COPY.ogAlt(title),
    },
  });
}

function strand(id: Strand["id"]): Strand {
  const found = STRANDS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown strand: ${id}`);
  return found;
}

/**
 * Home: Demo D, live (spec §6.1, handoff §6). His line in a two-column
 * first square, the featured films, the Directing row and the Camera and
 * editing row (each ending in a tile to that slice of Work), the Teaching
 * strand, and "All {n} pieces →". A tap opens a film in place; every tile
 * is also a real link to its page. Static: nothing here reads a request.
 */
export default function HomePage() {
  const featured = filmsFor(FEATURED);
  const directing = strand("directing");
  const camera = strand("camera-editing");
  const teaching = strand("teaching");
  const firstFilmId = featured[0] ? `film-${featured[0].slug}` : "work";

  return (
    <SiteShell skipTo="work">
      <JsonLd
        data={personJsonLd({
          name: SITE.name,
          jobTitle: SITE.tagline.replace(/\.$/, ""),
          url: absoluteUrl(siteRoutes.home),
          sameAs: SOCIALS.map((social) => social.href),
          locality: SITE.place.split(",")[0] ?? SITE.place,
        })}
      />
      <div className="flex flex-col gap-16 pt-3 pb-16 md:gap-20 md:pt-4">
        <FilmGrid
          id="work"
          leading={<TitleCell firstFilmId={firstFilmId} />}
          films={featured}
          email={SITE.email}
          preloadFirst
        />
        <FilmRow
          id="directing"
          title={directing.title}
          caption={directing.body}
          films={filmsFor(DIRECTING_ROW)}
          email={SITE.email}
          end={{
            label: HOME_LINKS.allDirecting,
            href: siteRoutes.work({ role: "directing" }),
          }}
        />
        <FilmRow
          id="camera-editing"
          title={camera.title}
          caption={camera.body}
          films={filmsFor(CAMERA_ROW)}
          email={SITE.email}
          end={{
            label: HOME_LINKS.allCamera,
            href: siteRoutes.work({ role: "camera" }),
          }}
        />
        <section
          aria-labelledby="strand-teaching"
          className="mx-3 flex flex-col gap-3 border-t border-border/40 pt-4 md:mx-6"
        >
          <h2
            id="strand-teaching"
            className="font-heading text-[1.75rem] leading-[1.15] font-semibold font-stretch-88%"
          >
            {teaching.title}
          </h2>
          <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
            {teaching.body}
          </p>
          <Link
            href={siteRoutes.teaching}
            className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-(--radius) text-sm font-semibold text-(--link) underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {HOME_LINKS.teaching}
            <span aria-hidden="true">→</span>
          </Link>
        </section>
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
