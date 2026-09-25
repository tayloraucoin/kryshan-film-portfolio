import type { IsoDate } from "../lib/iso-date";
import type { VideoProvider } from "../lib/media/embed-url";
import type { WorkRole } from "../lib/routes";
import { FEATURED } from "./home";

/**
 * Every film, one entry each, from the intake inventory
 * (docs/client/kryshan-02-success-criteria.md §3.5). This file decides what
 * the public site shows: `isShowable`, `SHOWABLE_PROJECTS` and `workOrder()`
 * are defined here and nowhere else (D-SITE-8, D-SITE-6).
 *
 * To hide a film, set its `rights` to "held". That is the only way; the
 * build then leaves it off every page. A film is "public" only when it has
 * a working video, an approved poster (a line in content/posters.ts) and a
 * confirmed clearance. `content/validate.ts` stops the build, in words, if a
 * public film is missing any of them.
 *
 * Rules for an entry:
 * - Every value traces to 02 §3.5 (awards to §8.1). If the inventory does
 *   not say it, the optional field is left out, not guessed.
 * - `roleLabel` is his credit exactly as he wrote it; `roles` is the same
 *   credit as the three Work filters (Directing · Camera · Editing).
 * - `awards` is the short list: one award, two festivals (03 §9).
 * - Video ids only; embed URLs are built by `lib/media/embed-url.ts`.
 *
 * Imports are relative and never an image, so `next.config.ts` can read this
 * file for the redirects (spec §8).
 */

// Loglines: his intake words, cut mechanically in SITE-2. SITE-C refines every one (spec §6.3, §7).

export type ProjectRole = WorkRole;

/** Internal only; never rendered. "passion" shows as "Passion project"; "hire" shows the client's name. */
export type ProjectLane = "passion" | "hire";

/**
 * public: shown everywhere.
 * held: hidden until it's ready (no working video, no approved poster, or a
 *   clearance not yet confirmed). The only way to hide a film.
 * nda: never shown or named, anywhere, in any form (spec §11).
 */
export type ProjectRights = "public" | "held" | "nda";

export type ProjectEmbed =
  /** "youtube" | "vimeo"; ids only. */
  | { provider: VideoProvider; id: string }
  /** Watched on its real host; shown as "Watch on {host} ↗" (D-SITE-9). Never kryshanrandel.com. */
  | { provider: "linkout"; host: string; url: string };

/** Verbatim, ≤15 words; a quote without verifiedOn isn't in the file (spec §11). */
export type PressQuote = {
  quote: string;
  source: string;
  url?: string;
  verifiedOn: IsoDate;
};

export type Article = { outlet: string; title: string; url: string };

export type Project = {
  slug: string;
  title: string;
  year: number;
  roles: ReadonlyArray<ProjectRole>;
  roleLabel: string;
  lane: ProjectLane;
  /** Who it was made for, when that is a client or collaborator. */
  client?: string;
  kind: string;
  /** One sentence, his words: ≤25 words and ≤155 characters (also the meta description). */
  logline: string;
  /** 1–3 short paragraphs, ≤90 words, separated by a blank line. His words, cut. */
  story?: string;
  /** The short list: one award, two festivals. */
  awards?: ReadonlyArray<string>;
  awardsFull?: ReadonlyArray<string>;
  press?: ReadonlyArray<PressQuote>;
  articles?: ReadonlyArray<Article>;
  /** Required for a public film (content/validate.ts). */
  embed?: ProjectEmbed;
  /** Hand-entered, for VideoObject.uploadDate only. */
  videoPublished?: IsoDate;
  rights: ProjectRights;
};

/** A film the public site may show. `content/validate.ts` guarantees its `embed`. */
export type ShowableProject = Project & {
  rights: "public";
  embed: ProjectEmbed;
};

export const PROJECTS: ReadonlyArray<Project> = [
  {
    slug: "just-watch-us",
    title: "Just Watch Us",
    year: 2019,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "hire",
    client: "DGC BC",
    kind: "PSA",
    logline:
      "90-second PSA promoting BC directors to be hired by Hollywood studio executives and showrunners.",
    embed: { provider: "youtube", id: "CQUSAB2euBk" },
    rights: "public",
  },
  {
    slug: "a-very-bc-production",
    title: "A Very B.C. Production",
    year: 2021,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "hire",
    client: "MPIAA, IATSE 669/891, DGC BC, Creative BC",
    kind: "PSA",
    logline:
      "PSA celebrating the BC film and television’s industry’s big return to work during the Covid-19 pandemic.",
    embed: { provider: "youtube", id: "zsXt4ykR6EY" },
    rights: "public",
  },
  {
    slug: "directors-reel",
    title: "Directors Reel",
    year: 2023,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "hire",
    kind: "Demo reel",
    logline:
      "Some of the directing highlights from various music videos, web series, short films, PSAs and other projects.",
    embed: { provider: "youtube", id: "UyVrm210Fc8" },
    // Held: its replacement frame isn't approved (O-SITE-13, 02 §14 Q27), so
    // spec §6.1's fallback is in force. To unhold: add its approved frame to
    // content/posters.ts, set rights to "public", and put it back at
    // FEATURED position 2 and Born To Be back in DIRECTING_ROW
    // (content/home.ts).
    rights: "held",
  },
  {
    slug: "artless",
    title: "Artless",
    year: 2009,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "passion",
    client: "Wrecking Ball Society",
    kind: "PSA",
    logline:
      "PSA shot in one day created to raise awareness of the BC government’s proposed arts funding cuts.",
    embed: { provider: "youtube", id: "3DSlctLvQG4" },
    rights: "public",
  },
  {
    slug: "jack",
    title: "Jack",
    year: 2009,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "passion",
    kind: "Short",
    logline:
      "A weekend getaway turns into a horrific nightmare when two couples engage in a perverse pumpkin slaughter.",
    awards: [
      "Grand Jury Prize and Best Death, Bloodshots Film Festival",
      "Screened at Fantasia and Sitges",
    ],
    embed: { provider: "vimeo", id: "23552792" },
    rights: "public",
  },
  {
    slug: "glimpse",
    title: "Glimpse",
    year: 2007,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "passion",
    kind: "Short",
    logline:
      "Following a devastating breakup, Mary acquires the ability to see the future of her relationships with every man she encounters.",
    awards: [
      "A&E Short Filmmakers Award, NSI Online Film Festival (2008)",
      "Premiered at VIFF 2007",
    ],
    embed: { provider: "youtube", id: "-MoaRA-QC8E" },
    // Held: its frame isn't approved (O-SITE-13); today's file is 720 × 480
    // and near black. To unhold: an approved frame in content/posters.ts,
    // then rights "public".
    rights: "held",
  },
  {
    slug: "born-to-be",
    title: "Born To Be",
    year: 2023,
    roles: ["directing", "camera", "editing"],
    roleLabel: "Director / Camera / Co-editor",
    lane: "hire",
    client: "Myk Gordon",
    kind: "Music video",
    logline: "Music video for first single from new album.",
    embed: { provider: "youtube", id: "BdDTZcIymG0" },
    rights: "public",
  },
  {
    slug: "the-bully-solution",
    title: "The Bully Solution",
    year: 2005,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "passion",
    kind: "Short",
    logline:
      "Shy eight-year-old Timmy has been picked on his whole life, until school groundskeeper Jack Raddick gives Timmy some tools to deal with bullies.",
    // Award list disagrees between sources (02 §13 #6); festivals only until Q18.
    awards: ["Screened at Fantastic Fest and Fantasia"],
    // Held: no approved (non-gory) frame (O-SITE-13), and no Dailymotion URL
    // yet (O-SITE-7). Banned from YouTube and Vimeo, so it will link out:
    // embed: { provider: "linkout", host: "Dailymotion", url: "https://…" }.
    // The old-site link-out is gone: that address becomes this site
    // (D-SITE-9, handoff O-6).
    rights: "held",
  },
  {
    slug: "dare",
    title: "Dare",
    year: 2025,
    roles: ["directing", "camera", "editing"],
    roleLabel: "Co-director / Camera / Co-editor",
    lane: "hire",
    client: "Myk Gordon",
    kind: "Music video",
    logline: "Music video from “Born To Be” album.",
    embed: { provider: "youtube", id: "KNP-9hOFCR0" },
    rights: "public",
  },
  {
    slug: "just-up-the-block",
    title: "Just Up The Block",
    year: 2025,
    roles: ["directing", "camera", "editing"],
    roleLabel: "Director / Camera / Editor",
    lane: "hire",
    client: "Courtenay Cohousing",
    kind: "PSA",
    logline:
      "PSA for Courtenay Cohousing, a multigenerational community in the Comox Valley.",
    embed: { provider: "youtube", id: "czL8jlkT2jc" },
    rights: "public",
  },
  {
    slug: "riverdale-ew-bts",
    title: "Riverdale EW BTS",
    year: 2017,
    roles: ["camera"],
    roleLabel: "Camera Operator",
    lane: "hire",
    client: "Entertainment Weekly",
    kind: "EPK",
    logline:
      "A day of b-roll shooting for Riverdale’s Entertainment Weekly cover story photo session.",
    embed: { provider: "youtube", id: "92ZF6lgw4us" },
    rights: "public",
  },
  {
    slug: "twenty8s",
    title: "Twenty8s",
    year: 2019,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "hire",
    client: "Crazy8s",
    kind: "Promo",
    logline:
      "Twenty year anniversary video of Vancouver’s short film related event Crazy8s.",
    embed: { provider: "youtube", id: "CBbDVwxeTaM" },
    rights: "public",
  },
  {
    slug: "united8s",
    title: "United8s",
    year: 2017,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "hire",
    client: "Crazy8s",
    kind: "EPK / opening film",
    logline: "Opening Film for the 2017 Crazy8s Gala.",
    embed: { provider: "youtube", id: "AsjwQgkOCUo" },
    rights: "public",
  },
  {
    slug: "a-dogs-way-home-epk",
    title: "A Dog’s Way Home EPK",
    year: 2019,
    roles: ["camera"],
    roleLabel: "Camera Operator",
    lane: "hire",
    client: "Sony Pictures",
    kind: "EPK",
    logline:
      "Camera operator for a behind the scenes interview with star Ashley Judd.",
    embed: { provider: "youtube", id: "6ijBBPwVdGY" },
    rights: "public",
  },
  {
    slug: "shotlister",
    title: "Shotlister",
    year: 2018,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "hire",
    client: "Shotlister / Zach Lipovsky",
    kind: "Instagram ads",
    logline: "Series of ads for the filmmaker app.",
    // Held: no video. The spots aren't on his YouTube yet (O-SITE-7), and the
    // old-site link-out is gone (D-SITE-9, handoff O-6). To unhold: a YouTube
    // id, or a link-out to where the spots really live, then rights "public".
    rights: "held",
  },
  {
    slug: "contact-club",
    title: "Contact Club",
    year: 2020,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "passion",
    kind: "Short",
    logline:
      "In a world where human contact is illegal, a secret encounter between a touch-starved client and a contact provider becomes more dangerous.",
    awards: [
      "Best Actor (Riaan Smit), Vancouver Quarantine Performance Project",
      "Nominated for Best Film and Best Writing",
    ],
    embed: { provider: "youtube", id: "EMlAIDezFMs" },
    rights: "public",
  },
  {
    slug: "the-wolf-of-west-georgia-street",
    title: "The Wolf of West Georgia Street",
    year: 2014,
    roles: ["directing", "editing"],
    roleLabel: "Director / Co-editor",
    lane: "passion",
    kind: "Fake trailer",
    logline: "Fake movie trailer created for a fortieth birthday party.",
    embed: { provider: "youtube", id: "X272pj_iu7Y" },
    // A private person's birthday gift: shown on Q13's default, "shown"
    // (O-SITE-8). If he says no, set rights to "held".
    rights: "public",
  },
  {
    slug: "its-a-crazier-life",
    title: "It’s A Crazier Life",
    year: 2014,
    roles: ["directing"],
    roleLabel: "Director",
    lane: "passion",
    client: "Crazy8s",
    kind: "Promo / satire",
    logline: "Opening film for the Crazy8s gala event.",
    embed: { provider: "vimeo", id: "88313657" },
    rights: "public",
  },
  {
    slug: "lyons-heart",
    title: "Lyons Heart",
    year: 2016,
    roles: ["directing", "camera", "editing"],
    roleLabel: "Director / Camera / Editor",
    lane: "passion",
    client: "Jennifer Lyons",
    kind: "Artist portrait",
    logline: "A portrait of local visual artist Jennifer Lyons.",
    embed: { provider: "vimeo", id: "155338101" },
    rights: "public",
  },
  {
    slug: "vandu",
    title: "VANDU",
    year: 2019,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "VANDU",
    kind: "PSA",
    logline:
      "PSA for VANDU, an organization dedicated to improving the lives of drug users, their families, and our communities.",
    // Held: no link (O-SITE-7). When one arrives, check its frame shows no
    // identifiable participant (spec §6.3) before setting rights "public".
    rights: "held",
  },
  {
    slug: "digital-days",
    title: "Digital Days",
    year: 2017,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "IATSE 669/891, DGC BC",
    kind: "Promo",
    logline:
      "A video summary of the day-long conference and trade show put on by IATSE 669, IATSE 891 and DGC BC.",
    embed: { provider: "youtube", id: "NSTO9qq6SG8" },
    rights: "public",
  },
  {
    slug: "be-reel-green",
    title: "Be Reel Green",
    year: 2018,
    roles: ["directing", "camera"],
    roleLabel: "Director / Camera",
    lane: "hire",
    client: "Creative BC / Reel Green",
    kind: "Promo",
    logline:
      "The first in a series of videos I shot and directed for Creative BC, with the goal of reducing the BC film industry’s impact on climate change.",
    awards: ["Screened at VIFF 2018"],
    embed: { provider: "youtube", id: "tHqDJ6Gcbr0" },
    rights: "public",
  },
  {
    slug: "rffc-were-in-this-together",
    title: "RFFC: We’re In This Together",
    year: 2015,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "Richmond Mental Health Consumer and Friends Society",
    kind: "Promo",
    logline:
      "Profile of Richmond’s mental health community engagement organization.",
    embed: { provider: "vimeo", id: "166846735" },
    rights: "public",
  },
  {
    slug: "5rhythms",
    title: "5Rhythms",
    year: 2025,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "Bettina Rothe",
    kind: "Promo",
    logline:
      "Promotional video for a dance practice I’ve been a part of since 2013.",
    embed: { provider: "youtube", id: "arSy1rmGMGU" },
    rights: "public",
  },
  {
    slug: "tradeswoman-exhibit",
    title: "Tradeswoman Exhibit",
    year: 2025,
    roles: ["editing", "camera"],
    roleLabel: "Editor / Camera",
    lane: "hire",
    client: "Carly Steiman",
    kind: "Promo",
    logline:
      "An exhibit featuring portraits of several close friends and colleagues.",
    embed: { provider: "youtube", id: "BG0OpaU9rJo" },
    rights: "public",
  },
  {
    slug: "tuts-2025-season-teaser",
    title: "TUTS 2025 Season Teaser",
    year: 2025,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "Theatre Under The Stars",
    kind: "Teaser",
    logline:
      "I had an hour with the casts of Legally Blonde and Charlie and The Chocolate Factory between photo shoots.",
    embed: { provider: "youtube", id: "HRwxGEJdris" },
    rights: "public",
  },
  {
    slug: "tuts-2026-trailer",
    title: "TUTS 2026 Trailer",
    year: 2026,
    roles: ["camera", "editing"],
    roleLabel: "Camera / Editor",
    lane: "hire",
    client: "Theatre Under The Stars",
    kind: "Trailer",
    logline:
      "Filmed the premieres of both The Little Mermaid and Sister Act, then cut them into trailers for their summer seasons.",
    embed: { provider: "youtube", id: "5Z6rq32MKyc" },
    rights: "public",
  },
];

/** The one test for "may the public site show this film?" (spec §5, D-SITE-8). */
export function isShowable(project: Project): project is ShowableProject {
  return project.rights === "public";
}

/** Every film the public site shows, in `PROJECTS` order. The count is its length. */
export const SHOWABLE_PROJECTS: ReadonlyArray<ShowableProject> =
  PROJECTS.filter(isShowable);

export function findShowableProject(slug: string): ShowableProject | undefined {
  return SHOWABLE_PROJECTS.find((project) => project.slug === slug);
}

/**
 * The one order (D-SITE-6): `FEATURED` in its order, then every other
 * showable film newest first, ties by title. Work uses it inside every
 * filter; detail pages use it for previous and next.
 */
export function workOrder(): ReadonlyArray<ShowableProject> {
  const pinned = FEATURED.map((slug) => findShowableProject(slug)).filter(
    (project): project is ShowableProject => project !== undefined,
  );
  const rest = SHOWABLE_PROJECTS.filter(
    (project) => !FEATURED.includes(project.slug),
  ).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "en-CA"));
  return [...pinned, ...rest];
}

/**
 * The genre line: "Short · 2009 · Director". Kind first because a producer
 * hires by kind (music video, PSA, trailer); the client, when there is one,
 * is shown as the tile's label instead (demo-d-ux-handoff-v1.md D-KRD-9).
 */
export function projectMetaLine(project: Project): string {
  return [project.kind, project.year, project.roleLabel].join(" · ");
}

/**
 * Any film by slug, held ones included. For the review layer only, which
 * still shows held films as he reviewed them; public code uses
 * `findShowableProject`. SITE-9 deletes this if nothing else imports it.
 */
export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
