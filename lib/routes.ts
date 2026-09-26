import type { Route } from "next";

/**
 * Every path in the site is built here. No route string is written inline
 * anywhere else; a path that exists in two places drifts in one of them.
 *
 * Paths only. Absolute URLs are composed in `lib/metadata.ts`, which is the
 * one place that knows the origin.
 */

/** The role vocabulary, in its fixed order (spec §4.4). `ProjectRole` aliases this. */
export const WORK_ROLES = ["directing", "camera", "editing"] as const;
export type WorkRole = (typeof WORK_ROLES)[number];

export const siteRoutes = {
  home: "/" as Route,
  /** Work, optionally filtered. Query order is fixed: `role`, then `passion=1`. */
  work: (filter?: { role?: WorkRole; passion?: boolean }): Route => {
    const query = [
      filter?.role ? `role=${filter.role}` : null,
      filter?.passion ? "passion=1" : null,
    ].filter(Boolean);
    return (query.length > 0 ? `/work?${query.join("&")}` : "/work") as Route;
  },
  project: (slug: string): Route => `/work/${slug}` as Route,
  about: "/about" as Route,
  teaching: "/teaching" as Route,
  contact: "/contact" as Route,
} as const;

/** Where an old WordPress URL lands. `next.config.ts` resolves it (SITE-5). */
export type LegacyTarget =
  | {
      page: "home" | "work" | "about" | "teaching" | "contact";
      role?: WorkRole;
    }
  /** The NEW slug. SITE-5 sends it to /work/<slug> if showable, else /work. */
  | { project: string };

export type LegacyPath = Readonly<{
  /** Path only, lowercase, exactly as the old site served it (trailing slash kept). */
  from: `/${string}`;
  to: LegacyTarget;
  /** Why it maps where it does; for audit, never rendered. */
  kind:
    | "page"
    | "project"
    | "project-not-kept"
    | "category"
    | "attachment"
    | "other";
}>;

/**
 * How `LEGACY_PATHS` was produced (O-SITE-9). `counts.sitemap` is every
 * `<loc>` in the sitemaps, `links` every distinct on-site link target the
 * HTML harvest found, `entries` the rows below.
 */
export const LEGACY_CRAWL: Readonly<{
  origin: "https://kryshanrandel.com";
  crawledOn: string;
  source: "live" | "wayback" | "known-slugs";
  counts: { sitemap: number; links: number; entries: number };
  excluded: ReadonlyArray<string>;
}> = {
  origin: "https://kryshanrandel.com",
  crawledOn: "2026-09-24",
  source: "live",
  counts: { sitemap: 84, links: 131, entries: 105 },
  excluded: [
    "/wp-admin/",
    "/wp-login.php",
    "/wp-json/",
    "/wp-includes/",
    "/wp-content/",
    "/xmlrpc.php",
    "/feed/",
    "*/feed/",
    "any path ending in a file extension",
    "mailto:",
    "tel:",
    "/?<query> (path / with only a query: already lands on Home)",
  ],
};

/**
 * Every URL the old WordPress site has, from a live crawl of
 * kryshanrandel.com on 2026-09-24 (robots.txt → the Yoast sitemap index and
 * its four children → every on-site link in the HTML, followed until nothing
 * new appeared). One row per old URL; SITE-5 turns rows into redirects.
 * The rules are docs/specs/03-site-build/SITE-1-foundation.md, "The old-URL
 * inventory": films are matched by page title (confirmed by the embedded
 * video), never by slug alone; an attachment page takes its parent's target;
 * a category takes its role filter where it has one; anything else lands on
 * Work. Held films map to their project; SITE-5 resolves a held slug to
 * /work until it is unheld.
 *
 * Rows whose path equals the new path (`/`, `/about/`) are recorded anyway
 * (D-SITE-25: one per crawled URL). SITE-5 must not emit a redirect whose
 * source and destination are the same path, or it loops.
 *
 * Sorted by `from`, so a re-crawl diffs cleanly.
 */
export const LEGACY_PATHS: ReadonlyArray<LegacyPath> = [
  { from: "/", to: { page: "home" }, kind: "page" },
  { from: "/about/", to: { page: "about" }, kind: "page" },
  {
    from: "/about/cameraman_leatherface/",
    to: { page: "about" },
    kind: "attachment",
  },
  {
    from: "/about/kryshan-directing-read-through/",
    to: { page: "about" },
    kind: "attachment",
  },
  {
    from: "/about/kryshan-randel-teaching/",
    to: { page: "about" },
    kind: "attachment",
  },
  { from: "/about/kryshan-ted/", to: { page: "about" }, kind: "attachment" },
  { from: "/about/mpiaa-bts-3/", to: { page: "about" }, kind: "attachment" },
  {
    from: "/about/mpiaa-psa-bts-1/",
    to: { page: "about" },
    kind: "attachment",
  },
  {
    from: "/about/mpiaa-psa-bts-2/",
    to: { page: "about" },
    kind: "attachment",
  },
  {
    from: "/about/screen-shot-2025-09-29-at-1-36-11-pm/",
    to: { page: "about" },
    kind: "attachment",
  },
  { from: "/author/nrmadmin/", to: { page: "work" }, kind: "other" },
  {
    from: "/averybcproduction/",
    to: { project: "a-very-bc-production" },
    kind: "project",
  },
  { from: "/cdn-cgi/l/email-protection", to: { page: "work" }, kind: "other" },
  { from: "/contact-me/", to: { page: "contact" }, kind: "page" },
  {
    from: "/contact-me/contactuspage/",
    to: { page: "contact" },
    kind: "attachment",
  },
  {
    from: "/contact-me/kryshan-directing/",
    to: { page: "contact" },
    kind: "attachment",
  },
  { from: "/contactclub/", to: { project: "contact-club" }, kind: "project" },
  {
    from: "/contactclub/contact-club-screenshot/",
    to: { project: "contact-club" },
    kind: "attachment",
  },
  { from: "/project/", to: { page: "work" }, kind: "page" },
  {
    from: "/project/a-dogs-way-home-epk/",
    to: { project: "a-dogs-way-home-epk" },
    kind: "project",
  },
  {
    from: "/project/a-dogs-way-home-epk/ashley-judd/",
    to: { project: "a-dogs-way-home-epk" },
    kind: "attachment",
  },
  {
    from: "/project/a-dogs-way-home-epk/imperative-education/",
    to: { project: "a-dogs-way-home-epk" },
    kind: "attachment",
  },
  {
    from: "/project/a-very-bc-production/",
    to: { project: "a-very-bc-production" },
    kind: "project",
  },
  { from: "/project/artless/", to: { project: "artless" }, kind: "project" },
  {
    from: "/project/artless/artless-header/",
    to: { project: "artless" },
    kind: "attachment",
  },
  {
    from: "/project/be-reel-green/",
    to: { project: "be-reel-green" },
    kind: "project",
  },
  {
    from: "/project/born-to-be/",
    to: { project: "born-to-be" },
    kind: "project",
  },
  {
    from: "/project/born-to-be/screen-shot-2025-09-29-at-1-47-10-pm/",
    to: { project: "born-to-be" },
    kind: "attachment",
  },
  {
    from: "/project/born-to-be/screen-shot-2025-09-29-at-2-01-37-pm/",
    to: { project: "born-to-be" },
    kind: "attachment",
  },
  {
    from: "/project/contact-club/",
    to: { project: "contact-club" },
    kind: "project",
  },
  { from: "/project/dare/", to: { project: "dare" }, kind: "project" },
  {
    from: "/project/dare/screen-shot-2025-10-01-at-3-59-13-pm/",
    to: { project: "dare" },
    kind: "attachment",
  },
  {
    from: "/project/dead-rising-watchtower/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project/dead-rising-watchtower/dead-rising-header/",
    to: { page: "work" },
    kind: "attachment",
  },
  {
    from: "/project/digital-days/",
    to: { project: "digital-days" },
    kind: "project",
  },
  {
    from: "/project/digital-days/digital-days-2/",
    to: { project: "digital-days" },
    kind: "attachment",
  },
  {
    from: "/project/directors-reel/",
    to: { project: "directors-reel" },
    kind: "project",
  },
  {
    from: "/project/directors-reel/directorsreel/",
    to: { project: "directors-reel" },
    kind: "attachment",
  },
  { from: "/project/glimpse/", to: { project: "glimpse" }, kind: "project" },
  {
    from: "/project/glimpse/glimpse-2/",
    to: { project: "glimpse" },
    kind: "attachment",
  },
  {
    from: "/project/glimpse/glimpse1/",
    to: { project: "glimpse" },
    kind: "attachment",
  },
  {
    from: "/project/glimpse/glimpse2/",
    to: { project: "glimpse" },
    kind: "attachment",
  },
  {
    from: "/project/home-is-where-the-art-is/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project/home-is-where-the-art-is/1080-place-holder-image/",
    to: { page: "work" },
    kind: "attachment",
  },
  {
    from: "/project/human-resources/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project/human-resources/humanresources/",
    to: { page: "work" },
    kind: "attachment",
  },
  {
    from: "/project/its-a-crazier-life/",
    to: { project: "its-a-crazier-life" },
    kind: "project",
  },
  { from: "/project/jack/", to: { project: "jack" }, kind: "project" },
  {
    from: "/project/just-up-the-block/",
    to: { project: "just-up-the-block" },
    kind: "project",
  },
  {
    from: "/project/just-up-the-block/screen-shot-2025-10-01-at-4-51-38-pm/",
    to: { project: "just-up-the-block" },
    kind: "attachment",
  },
  {
    from: "/project/just-watch-us/",
    to: { project: "just-watch-us" },
    kind: "project",
  },
  {
    from: "/project/just-watch-us/screen-shot-2020-07-27-at-10-17-41-pm/",
    to: { project: "just-watch-us" },
    kind: "attachment",
  },
  {
    from: "/project/lyons-heart/",
    to: { project: "lyons-heart" },
    kind: "project",
  },
  { from: "/project/page/2/", to: { page: "work" }, kind: "other" },
  { from: "/project/page/3/", to: { page: "work" }, kind: "other" },
  { from: "/project/page/4/", to: { page: "work" }, kind: "other" },
  { from: "/project/page/5/", to: { page: "work" }, kind: "other" },
  { from: "/project/page/6/", to: { page: "work" }, kind: "other" },
  {
    from: "/project/rain-hair-salon-the-chelsea/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project/rcfc-were-in-this-together/",
    to: { project: "rffc-were-in-this-together" },
    kind: "project",
  },
  {
    from: "/project/riverdale-epk/",
    to: { project: "riverdale-ew-bts" },
    kind: "project",
  },
  {
    from: "/project/riverdale-epk/riverdale/",
    to: { project: "riverdale-ew-bts" },
    kind: "attachment",
  },
  {
    from: "/project/shotlister/",
    to: { project: "shotlister" },
    kind: "project",
  },
  {
    from: "/project/simon-fraser-university-short-documentaries/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project/the-bully-solution/",
    to: { project: "the-bully-solution" },
    kind: "project",
  },
  {
    from: "/project/the-bully-solution/bully-header/",
    to: { project: "the-bully-solution" },
    kind: "attachment",
  },
  {
    from: "/project/the-wolf-of-west-georgia-street/",
    to: { project: "the-wolf-of-west-georgia-street" },
    kind: "project",
  },
  { from: "/project/twenty8s/", to: { project: "twenty8s" }, kind: "project" },
  {
    from: "/project/twenty8s/screen-shot-2019-04-25-at-3-17-31-pm/",
    to: { project: "twenty8s" },
    kind: "attachment",
  },
  { from: "/project/united-8s/", to: { project: "united8s" }, kind: "project" },
  { from: "/project/vandu/", to: { project: "vandu" }, kind: "project" },
  {
    from: "/project/vandu/vandu-screenshot/",
    to: { project: "vandu" },
    kind: "attachment",
  },
  {
    from: "/project/where-the-canoe-takes-us-the-story-of-pulling-together/",
    to: { page: "work" },
    kind: "project-not-kept",
  },
  {
    from: "/project_category/behind-the-scenes/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/behind-the-scenes/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/camera/",
    to: { page: "work", role: "camera" },
    kind: "category",
  },
  {
    from: "/project_category/camera/page/2/",
    to: { page: "work", role: "camera" },
    kind: "category",
  },
  {
    from: "/project_category/camera/page/3/",
    to: { page: "work", role: "camera" },
    kind: "category",
  },
  {
    from: "/project_category/corporate/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/directing/",
    to: { page: "work", role: "directing" },
    kind: "category",
  },
  {
    from: "/project_category/directing/page/2/",
    to: { page: "work", role: "directing" },
    kind: "category",
  },
  {
    from: "/project_category/directing/page/3/",
    to: { page: "work", role: "directing" },
    kind: "category",
  },
  {
    from: "/project_category/directing/page/4/",
    to: { page: "work", role: "directing" },
    kind: "category",
  },
  {
    from: "/project_category/editing/",
    to: { page: "work", role: "editing" },
    kind: "category",
  },
  {
    from: "/project_category/editing/page/2/",
    to: { page: "work", role: "editing" },
    kind: "category",
  },
  {
    from: "/project_category/editing/page/3/",
    to: { page: "work", role: "editing" },
    kind: "category",
  },
  {
    from: "/project_category/featured/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/fiction/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/fiction/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/non-fiction/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/non-fiction/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/non-fiction/page/3/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/non-profit/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/non-profit/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/promotional/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/promotional/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/promotional/page/3/",
    to: { page: "work" },
    kind: "category",
  },
  { from: "/project_category/psa/", to: { page: "work" }, kind: "category" },
  {
    from: "/project_category/short-film/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/short-film/page/2/",
    to: { page: "work" },
    kind: "category",
  },
  {
    from: "/project_category/writing/",
    to: { page: "work" },
    kind: "category",
  },
  { from: "/reel/", to: { page: "work" }, kind: "page" },
  { from: "/terminal-cinema-review/", to: { page: "work" }, kind: "other" },
  { from: "/test/homepage/", to: { page: "work" }, kind: "attachment" },
  {
    from: "/test/kryshan-directing-read-through-2/",
    to: { page: "work" },
    kind: "attachment",
  },
];

/**
 * The client review layer. Everything under `/review` except `access` sits
 * behind the code gate in `proxy.ts`; the prefix is what the proxy matches.
 */
const REVIEW_PREFIX = "/review" as const;

export const reviewRoutes = {
  prefix: REVIEW_PREFIX,
  index: REVIEW_PREFIX as Route,
  access: (next?: string): Route =>
    (next && next.startsWith(REVIEW_PREFIX)
      ? `${REVIEW_PREFIX}/access?next=${encodeURIComponent(next)}`
      : `${REVIEW_PREFIX}/access`) as Route,
  kit: (id: string): Route => `${REVIEW_PREFIX}/kits/${id}` as Route,
  layout: (id: string): Route => `${REVIEW_PREFIX}/layouts/${id}` as Route,
  /**
   * A demo home page. With `kitId`, the same layout in any kit; the kit is a
   * path segment (not a query) because comments are keyed by path.
   */
  mock: (id: string, kitId?: string): Route =>
    (kitId
      ? `${REVIEW_PREFIX}/mocks/${id}/${kitId}`
      : `${REVIEW_PREFIX}/mocks/${id}`) as Route,
  brand: `${REVIEW_PREFIX}/brand` as Route,
  feedback: `${REVIEW_PREFIX}/feedback` as Route,
} as const;

/** True for any path the review gate protects. */
export function isGatedReviewPath(pathname: string): boolean {
  if (pathname === reviewRoutes.access()) return false;
  if (pathname.startsWith(`${REVIEW_PREFIX}/access`)) return false;
  return pathname === REVIEW_PREFIX || pathname.startsWith(`${REVIEW_PREFIX}/`);
}

/** True for anything under the review prefix, gate included. */
export function isReviewPath(pathname: string): boolean {
  return pathname === REVIEW_PREFIX || pathname.startsWith(`${REVIEW_PREFIX}/`);
}
