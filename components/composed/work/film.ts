import "server-only";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import { posterFor } from "@/content/posters";
import {
  findShowableProject,
  projectMetaLine,
  type ProjectEmbed,
  type ProjectRole,
  type ShowableProject,
} from "@/content/projects";
import { absoluteUrl } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";

/**
 * What the film components render, built on the server (M-SITE-4). The
 * decision it carries: client leaves never see a `Project`. The share URL
 * needs the site's origin, which lives beside the server-only contact
 * address in `lib/config`, so it is computed here and arrives as data
 * (spec §4.3). The slim shape also keeps stories, full awards and press out
 * of the page payload, which makes "the panel carries no story" (D-SITE-22)
 * a type fact. Client leaves import `Film` with `import type` only.
 */
export type Film = Readonly<{
  slug: string;
  title: string;
  /** Kind · Year · Role (`projectMetaLine`). */
  genreLine: string;
  /** Shown as "Passion project"; otherwise `client`, if any, labels the tile. */
  passion: boolean;
  client?: string;
  logline: string;
  /** The short list; `[]` when there are none. */
  awards: ReadonlyArray<string>;
  embed: ProjectEmbed;
  roles: ReadonlyArray<ProjectRole>;
  poster: StaticImageData;
  href: Route;
  /** Absolute, for Copy link. */
  shareUrl: string;
}>;

export function toFilm(project: ShowableProject): Film {
  const href = siteRoutes.project(project.slug);
  return {
    slug: project.slug,
    title: project.title,
    genreLine: projectMetaLine(project),
    passion: project.lane === "passion",
    ...(project.client ? { client: project.client } : {}),
    logline: project.logline,
    awards: project.awards ?? [],
    embed: project.embed,
    roles: project.roles,
    poster: posterFor(project.slug),
    href,
    shareUrl: absoluteUrl(href),
  };
}

/** Films for a list of slugs, in order. Held or unknown slugs are skipped (validation already refuses them). */
export function filmsFor(slugs: ReadonlyArray<string>): Film[] {
  return slugs
    .map((slug) => findShowableProject(slug))
    .filter((project): project is ShowableProject => project !== undefined)
    .map(toFilm);
}
