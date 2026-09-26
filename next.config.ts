import type { NextConfig } from "next";
import { PROJECTS, SHOWABLE_PROJECTS } from "./content/projects";
import "./lib/env";
import { LEGACY_PATHS, siteRoutes, type LegacyPath } from "./lib/routes";

/**
 * `import "./lib/env"` runs the zod validation at build time, so a missing or
 * malformed variable fails `next build` instead of a page at runtime.
 *
 * Everything imported here is by relative path: `next.config.ts` is loaded
 * before the `@/` alias exists, so `content/projects.ts` and `lib/routes.ts`
 * keep their runtime imports relative (SITE-1, SITE-2).
 */

type Redirect = { source: string; destination: string; permanent: true };

const PAGE_PATHS = {
  home: siteRoutes.home,
  about: siteRoutes.about,
  teaching: siteRoutes.teaching,
  contact: siteRoutes.contact,
} as const;

/** Where an old row lands today. A held film's old URL goes to Work until it's public (D-SITE-8). */
function destinationFor(row: LegacyPath): string | { unknownSlug: string } {
  if ("project" in row.to) {
    const slug = row.to.project;
    if (SHOWABLE_PROJECTS.some((project) => project.slug === slug)) {
      return siteRoutes.project(slug);
    }
    if (PROJECTS.some((project) => project.slug === slug)) {
      return siteRoutes.work();
    }
    return { unknownSlug: slug };
  }
  if (row.to.page === "work") {
    return siteRoutes.work(row.to.role ? { role: row.to.role } : undefined);
  }
  return PAGE_PATHS[row.to.page];
}

/**
 * Next strips a trailing slash itself first (a 308 that runs before custom
 * redirects), so a source is stored without one: `/project/jack/` takes one
 * hop to `/project/jack` and one to `/work/jack`.
 */
function normalizeSource(from: string): string {
  return from !== "/" && from.endsWith("/") ? from.slice(0, -1) : from;
}

/** Redirect sources are path-to-regexp patterns; a crawled path is literal. */
function escapeSource(path: string): string {
  return path.replace(/[(){}:*+?]/g, (character) => `\\${character}`);
}

const pathOf = (url: string) => url.split("?")[0] ?? url;

/**
 * The old WordPress URLs as redirects (D-SITE-25), one per `LEGACY_PATHS`
 * row, built from data: a showable film's old page goes to its detail page,
 * a held one to Work, a page to its page. A row whose source is already its
 * destination (`/`, `/about/`) is dropped; Next's own slash hop covers it.
 * Refuses bad data in words he can act on, failing the build.
 */
function buildLegacyRedirects(): Redirect[] {
  const problems: string[] = [];
  const live = new Set<string>([
    siteRoutes.home,
    siteRoutes.work(),
    siteRoutes.about,
    siteRoutes.teaching,
    siteRoutes.contact,
    ...SHOWABLE_PROJECTS.map((project) => siteRoutes.project(project.slug)),
  ]);
  const bySource = new Map<string, { from: string; destination: string }>();

  for (const row of LEGACY_PATHS) {
    const destination = destinationFor(row);
    if (typeof destination !== "string") {
      problems.push(
        `lib/routes.ts: the old address ${row.from} points at the film "${destination.unknownSlug}", which isn't in content/projects.ts. Use the film's current slug.`,
      );
      continue;
    }
    const source = normalizeSource(row.from);
    if (source === destination) continue;
    if (live.has(source)) {
      problems.push(
        `lib/routes.ts: the old address ${row.from} is the live page ${source}, but it points at ${destination}. A redirect there would hide the page. Point it at ${source}, or delete the row.`,
      );
    }
    const earlier = bySource.get(source);
    if (earlier && earlier.destination !== destination) {
      problems.push(
        `lib/routes.ts: the old addresses ${earlier.from} and ${row.from} are the same address but point at different pages (${earlier.destination} and ${destination}). Keep one.`,
      );
      continue;
    }
    bySource.set(source, { from: row.from, destination });
  }

  for (const [, entry] of bySource) {
    const next = bySource.get(pathOf(entry.destination));
    if (next) {
      problems.push(
        `lib/routes.ts: the old address ${entry.from} goes to ${entry.destination}, which is itself an old address (${next.from}) that goes to ${next.destination}. Point ${entry.from} straight at ${next.destination}.`,
      );
    }
  }

  if (problems.length > 0) {
    throw new Error(
      [
        "The site can't be built until these are fixed:",
        ...problems.map((problem, index) => `${index + 1}. ${problem}`),
      ].join("\n"),
    );
  }

  return [...bySource].map(([source, { destination }]) => ({
    source: escapeSource(source),
    destination,
    permanent: true,
  }));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  /**
   * Overridable build directory, so an agent's `dev:agent` / `build:agent`
   * process never rewrites the `.next` a human's `yarn dev` is serving from.
   * Unset everywhere else, so Vercel and a plain `yarn dev` use `.next`.
   */
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  images: {
    formats: ["image/avif", "image/webp"],
    // Add a remote host here only when a client's images genuinely live off
    // the repo (docs/PERFORMANCE.md §4). The default is `public/`.
    remotePatterns: [],
  },

  /** Every old WordPress URL, 308 to where it lives now (SITE-5, D-SITE-25). */
  async redirects() {
    return buildLegacyRedirects();
  },

  /**
   * The review layer reads layout markdown from disk at request time. Nothing
   * imports those files, so Vercel's tracer cannot see them; naming them here
   * is what ships them with the function.
   */
  outputFileTracingIncludes: {
    "/review/layouts/[layout]": ["./review/layouts/**/*.md"],
  },
};

export default nextConfig;
