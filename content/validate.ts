import { ABOUT } from "@/content/about";
import { CREDITS, type Credit } from "@/content/credits";
import { CAMERA_ROW, DIRECTING_ROW, FEATURED, HOME_H1 } from "@/content/home";
import type { Photo } from "@/content/photo";
import { POSTERS } from "@/content/posters";
import { PROJECTS, type Project } from "@/content/projects";
import { TESTIMONIALS } from "@/content/testimonials";
import { isIsoDate } from "@/lib/iso-date";
import { LEGACY_PATHS } from "@/lib/routes";

/**
 * The build's content check (spec §5, §11). `app/(site)/layout.tsx` imports
 * this file for its side effect, so any problem here stops `next build` and
 * shows in the dev overlay, listing every problem at once, numbered, in
 * words he can act on: which file, which entry, what to do.
 *
 * Each message is one template below, so the self-edit guide
 * (`docs/EDITING.md`, "When a change doesn't appear") can quote them word
 * for word. Pure functions return problems; only the last lines throw.
 */

/** Photo arrays to check. About and Teaching add theirs here (SITE-6, SITE-7). */
export const PHOTO_SETS: ReadonlyArray<{
  file: string;
  photos: ReadonlyArray<Photo>;
}> = [
  {
    file: "content/about.ts",
    photos: [...ABOUT.photos, ...(ABOUT.portrait ? [ABOUT.portrait] : [])],
  },
];

/** How many photos About's "On set" shows (spec §6.4). */
const ABOUT_PHOTO_LIMIT = 3;

/** How many press quotes About shows (spec §6.4). */
const ABOUT_PRESS_LIMIT = 4;

const HEADER = "The site can't be built until these are fixed:";

/** Testimonials each page may show (D-SITE-13). */
const QUOTE_LIMITS = { about: 3, teaching: 4 } as const;

/** Reel Youth in Whatì, by the words on the photo (M-SITE-3). */
const WHATI = /wh?at[iì]|reel youth/i;

/** "at-risk", however it's spaced. */
const AT_RISK = /at[-\s]?risk/i;

const HOME_LISTS = [
  ["FEATURED", FEATURED],
  ["DIRECTING_ROW", DIRECTING_ROW],
  ["CAMERA_ROW", CAMERA_ROW],
] as const;

// ---------------------------------------------------------------------------
// Messages (one per check; numbers match SITE-2's table)
// ---------------------------------------------------------------------------

const MESSAGES = {
  duplicateSlug: (slug: string) =>
    `content/projects.ts: two films use the slug "${slug}". Each film needs its own slug, because it becomes the page address /work/${slug}. Rename one.`,
  noPoster: (p: Project) =>
    `content/posters.ts: "${p.title}" is public but has no poster. Add a line for "${p.slug}" to content/posters.ts, or set its rights to "held" in content/projects.ts until the poster is ready.`,
  unknownHomeSlug: (list: string, slug: string) =>
    `content/home.ts: ${list} names "${slug}", but there is no film with that slug in content/projects.ts. Check the spelling.`,
  notPublicHomeSlug: (list: string, p: Project) =>
    `content/home.ts: ${list} names "${p.title}", which isn't public (its rights are "${p.rights}"). Take it out of ${list}, or make it public in content/projects.ts.`,
  badDate: (file: string, entry: string, value: string, field: string) =>
    `${file}: "${entry}" has the date "${value}" in ${field}. Write dates as year-month-day, like 2026-03-02.`,
  noLogline: (p: Project) =>
    `content/projects.ts: "${p.title}" is public but has no logline. Write one sentence about the film in its logline, or set its rights to "held".`,
  aboutNotFull: (name: string) =>
    `content/testimonials.ts: the quote from ${name} is on the About page, which shows full names and roles only. Set its attribution to "full" (with their OK), or move it to the Teaching page.`,
  noPeople: (file: string, caption: string) =>
    `${file}: the photo "${caption}" doesn't say who is in it. Set people to "none-identifiable", "adults", or the minors form with its consent dates.`,
  minorsMissingConsent: (file: string, caption: string, missing: string) =>
    `${file}: the photo "${caption}" shows young people but is missing ${missing}. Add the date of the parent's or guardian's written OK and of the program's written OK, or remove the photo.`,
  whatiNoCommunity: (file: string, caption: string) =>
    `${file}: the photo "${caption}" is from Reel Youth in Whatì and needs communityConsent: the date the community gave its OK. Add it, or remove the photo.`,
  noVideo: (p: Project) =>
    `content/projects.ts: "${p.title}" is public but has no video. Add its YouTube or Vimeo id, or a link-out to where it's hosted, or set its rights to "held".`,
  badLinkout: (p: Project, url: string) =>
    `content/projects.ts: "${p.title}" links out to ${url}. A link-out must go to where the video really lives, over https, and never to kryshanrandel.com, which becomes this site.`,
  twiceOnHome: (title: string, a: string, b: string) =>
    `content/home.ts: "${title}" is in both ${a} and ${b}. A film appears once on the home page; take it out of one.`,
  redPhrase: (red: string, text: string) =>
    `content/home.ts: the red phrase "${red}" must appear word for word, once, in the headline "${text}". Change one to match the other.`,
  tooManyQuotes: (page: "about" | "teaching", n: number) =>
    page === "about"
      ? `content/testimonials.ts: the About page shows at most ${QUOTE_LIMITS.about} quotes, and ${n} are marked for it. Remove one, or move it to Teaching.`
      : `content/testimonials.ts: the Teaching page shows at most ${QUOTE_LIMITS.teaching} quotes, and ${n} are marked for it. Remove one.`,
  unknownLegacySlug: (from: string, slug: string) =>
    `lib/routes.ts: the old address ${from} points at "${slug}", but there's no film with that slug in content/projects.ts. Point it at the right slug.`,
  duplicateLegacy: (from: string) =>
    `lib/routes.ts: the old address ${from} is listed twice. Keep one.`,
  atRisk: (file: string, entry: string) =>
    `${file}: "${entry}" uses the words "at-risk". Nobody on this site is described that way; name the role or the program instead.`,
  creditMissing: (index: number, field: "title" | "network") =>
    `content/credits.ts: credit number ${index} has no ${field}. Fill it in, or delete the entry.`,
  creditYear: (c: Credit, latest: number) =>
    `content/credits.ts: "${c.title}" has the year ${c.year}. Write the year it came out, as four digits between 1990 and ${latest}.`,
  creditTwice: (c: Credit) =>
    `content/credits.ts: "${c.title}" (${c.year}) is listed twice. Delete one of them.`,
  tooManyAboutPhotos: (n: number) =>
    `content/about.ts: the About page shows at most ${ABOUT_PHOTO_LIMIT} photos under "On set", and ${n} are listed. Remove one.`,
  tooManyPressPicks: (n: number) =>
    `content/about.ts: the About page shows at most ${ABOUT_PRESS_LIMIT} press quotes, and ${n} are picked. Remove one from pressPicks.`,
  unresolvedPressPick: (slug: string, source: string, found: number) =>
    found === 0
      ? `content/about.ts: the press pick "${source}" for "${slug}" doesn't match a verified quote. Add the quote (with verifiedOn) to that film in content/projects.ts, check the spelling of the film and the source, or remove the pick.`
      : `content/about.ts: the press pick "${source}" for "${slug}" matches ${found} quotes on that film. Make each source name on that film unique, or remove the pick.`,
} as const;

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

function bySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Checks 1, 4 (press, videoPublished), 5, 10, 11. */
export function checkProjects(projects: ReadonlyArray<Project>): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  for (const p of projects) {
    if (seen.has(p.slug)) problems.push(MESSAGES.duplicateSlug(p.slug));
    seen.add(p.slug);

    for (const quote of p.press ?? []) {
      if (!isIsoDate(quote.verifiedOn)) {
        problems.push(
          MESSAGES.badDate(
            "content/projects.ts",
            p.title,
            quote.verifiedOn,
            "press verifiedOn",
          ),
        );
      }
    }
    if (p.videoPublished !== undefined && !isIsoDate(p.videoPublished)) {
      problems.push(
        MESSAGES.badDate(
          "content/projects.ts",
          p.title,
          p.videoPublished,
          "videoPublished",
        ),
      );
    }

    if (p.rights !== "public") continue;

    if (!p.logline?.trim()) problems.push(MESSAGES.noLogline(p));
    if (!p.embed) {
      problems.push(MESSAGES.noVideo(p));
    } else if (p.embed.provider === "linkout") {
      if (!isRealHostLink(p.embed.url)) {
        problems.push(MESSAGES.badLinkout(p, p.embed.url));
      }
    }
  }

  return problems;
}

/** https, and not on the old domain (D-SITE-9, handoff O-6). */
function isRealHostLink(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      !/(^|\.)kryshanrandel\.com$/i.test(parsed.hostname)
    );
  } catch {
    return false;
  }
}

/** Check 2. */
export function checkPosters(projects: ReadonlyArray<Project>): string[] {
  return projects
    .filter((p) => p.rights === "public" && !POSTERS[p.slug])
    .map((p) => MESSAGES.noPoster(p));
}

/** Checks 3a, 3b, 12, 13. */
export function checkHomeLists(): string[] {
  const problems: string[] = [];
  const firstList = new Map<string, string>();

  for (const [list, slugs] of HOME_LISTS) {
    for (const slug of slugs) {
      const project = bySlug(slug);
      if (!project) {
        problems.push(MESSAGES.unknownHomeSlug(list, slug));
        continue;
      }
      if (project.rights !== "public") {
        problems.push(MESSAGES.notPublicHomeSlug(list, project));
      }
      const earlier = firstList.get(slug);
      if (earlier) {
        problems.push(MESSAGES.twiceOnHome(project.title, earlier, list));
      } else {
        firstList.set(slug, list);
      }
    }
  }

  if (HOME_H1.text.split(HOME_H1.red).length !== 2) {
    problems.push(MESSAGES.redPhrase(HOME_H1.red, HOME_H1.text));
  }

  return problems;
}

/** Checks 4 (consent dates), 6, 14, 16 (role). */
export function checkTestimonials(): string[] {
  const problems: string[] = [];
  const file = "content/testimonials.ts";

  for (const t of TESTIMONIALS) {
    if (!isIsoDate(t.consent.date)) {
      problems.push(
        MESSAGES.badDate(file, t.name, t.consent.date, "consent date"),
      );
    }
    if (t.page === "about" && t.consent.attribution !== "full") {
      problems.push(MESSAGES.aboutNotFull(t.name));
    }
    if (AT_RISK.test(t.role)) problems.push(MESSAGES.atRisk(file, t.name));
  }

  for (const page of ["about", "teaching"] as const) {
    const n = TESTIMONIALS.filter((t) => t.page === page).length;
    if (n > QUOTE_LIMITS[page]) {
      problems.push(MESSAGES.tooManyQuotes(page, n));
    }
  }

  return problems;
}

/** Checks 4 (photo consent dates), 7, 8, 9, 16 (caption, alt). */
export function checkPhotos(
  file: string,
  photos: ReadonlyArray<Photo>,
): string[] {
  const problems: string[] = [];

  for (const photo of photos) {
    const { caption } = photo;
    // Typed as required; this catches an entry forced past the type.
    const people = photo.people as Photo["people"] | undefined;

    if (AT_RISK.test(caption) || AT_RISK.test(photo.alt)) {
      problems.push(MESSAGES.atRisk(file, caption));
    }

    if (people === undefined) {
      problems.push(MESSAGES.noPeople(file, caption));
      continue;
    }
    if (typeof people === "string") continue;

    const missing = (["guardianConsent", "programConsent"] as const).filter(
      (field) => !people[field],
    );
    if (missing.length > 0) {
      problems.push(
        MESSAGES.minorsMissingConsent(file, caption, missing.join(" and ")),
      );
    }
    for (const field of [
      "guardianConsent",
      "programConsent",
      "communityConsent",
    ] as const) {
      const value = people[field];
      if (value !== undefined && !isIsoDate(value)) {
        problems.push(MESSAGES.badDate(file, caption, value, field));
      }
    }
    if (
      (WHATI.test(caption) || WHATI.test(photo.alt)) &&
      !people.communityConsent
    ) {
      problems.push(MESSAGES.whatiNoCommunity(file, caption));
    }
  }

  return problems;
}

/** About (SITE-6): photo and press-pick limits; each pick is one verified quote on a film that isn't NDA. */
export function checkAbout(): string[] {
  const problems: string[] = [];
  if (ABOUT.photos.length > ABOUT_PHOTO_LIMIT) {
    problems.push(MESSAGES.tooManyAboutPhotos(ABOUT.photos.length));
  }
  if (ABOUT.pressPicks.length > ABOUT_PRESS_LIMIT) {
    problems.push(MESSAGES.tooManyPressPicks(ABOUT.pressPicks.length));
  }
  for (const pick of ABOUT.pressPicks) {
    const project = bySlug(pick.slug);
    const found =
      project && project.rights !== "nda"
        ? (project.press ?? []).filter((quote) => quote.source === pick.source)
            .length
        : 0;
    if (found !== 1) {
      problems.push(
        MESSAGES.unresolvedPressPick(pick.slug, pick.source, found),
      );
    }
  }
  return problems;
}

/** Credits (SITE-4): a title and a network, a sensible year, no duplicates. */
export function checkCredits(credits: ReadonlyArray<Credit>): string[] {
  const problems: string[] = [];
  const latest = new Date().getFullYear() + 1;
  const seen = new Set<string>();

  credits.forEach((credit, index) => {
    if (!credit.title.trim()) {
      problems.push(MESSAGES.creditMissing(index + 1, "title"));
      return;
    }
    if (!credit.network.trim()) {
      problems.push(MESSAGES.creditMissing(index + 1, "network"));
    }
    if (
      !Number.isInteger(credit.year) ||
      credit.year < 1990 ||
      credit.year > latest
    ) {
      problems.push(MESSAGES.creditYear(credit, latest));
    }
    const key = `${credit.title.trim().toLowerCase()}|${credit.year}`;
    if (seen.has(key)) problems.push(MESSAGES.creditTwice(credit));
    seen.add(key);
  });

  return problems;
}

/** Checks 15a, 15b. */
export function checkLegacyPaths(): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  for (const row of LEGACY_PATHS) {
    if (seen.has(row.from)) problems.push(MESSAGES.duplicateLegacy(row.from));
    seen.add(row.from);
    if ("project" in row.to && !bySlug(row.to.project)) {
      problems.push(MESSAGES.unknownLegacySlug(row.from, row.to.project));
    }
  }

  return problems;
}

// ---------------------------------------------------------------------------
// Run at import
// ---------------------------------------------------------------------------

const problems = [
  ...checkProjects(PROJECTS),
  ...checkPosters(PROJECTS),
  ...checkHomeLists(),
  ...checkTestimonials(),
  ...PHOTO_SETS.flatMap(({ file, photos }) => checkPhotos(file, photos)),
  ...checkLegacyPaths(),
  ...checkCredits(CREDITS),
  ...checkAbout(),
];

if (problems.length > 0) {
  const report = [
    HEADER,
    ...problems.map((problem, index) => `${index + 1}. ${problem}`),
  ].join("\n");
  console.error(report);
  throw new Error(report);
}
