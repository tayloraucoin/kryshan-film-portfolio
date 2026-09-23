import type { VideoProvider } from "@/lib/media/embed-url";

/**
 * Every piece of work on the site, one entry each, from the intake inventory
 * (docs/client/kryshan-02-success-criteria.md §3.5). The Work grid, the home
 * grid and the project pages all read this file; he edits it through the
 * self-edit guide to add a piece, swap a poster or change a link.
 *
 * Rules for an entry:
 * - Every value traces to 02 §3.5 (awards to §8.1, rights to §10). If the
 *   inventory does not say it, the optional field is left out, not guessed.
 * - `roleLabel` is his credit exactly as he wrote it; `roles` is the same
 *   credit as the three Work filters (Directing · Camera · Editing).
 * - `awards` follows the house rule: name the award, at most two festivals,
 *   the rest lives on the project page (03 §9).
 * - Video ids only; embed URLs are built by `lib/media/embed-url.ts`.
 */

export type ProjectRole = "directing" | "camera" | "editing";

/** "passion" = made because he had to; "hire" = made for a client (02 §3.1). */
export type ProjectLane = "passion" | "hire";

export type ProjectEmbed =
  | { provider: VideoProvider; id: string }
  /** Not on YouTube or Vimeo yet; the card links to where it can be watched. */
  | { provider: "linkout"; url: string }
  /** No link supplied; the frame shows "Link pending". */
  | { provider: "none" };

export type ProjectPoster = {
  /** Path under `public/`. */
  src: string;
  /** The file's real pixel size; the frame is 16:9 whatever the file is. */
  width: number;
  height: number;
};

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
  /** One paragraph, his words. None supplied yet (see DEVIATIONS.md, KR-1). */
  story?: string;
  awards?: ReadonlyArray<string>;
  embed: ProjectEmbed;
  poster: ProjectPoster;
  /** `public` renders; `pending` renders on a stated assumption; `nda` never renders. */
  rights: "public" | "pending" | "nda";
  /** His top five, in his order. */
  featured?: 1 | 2 | 3 | 4 | 5;
  /** His "lead with this" flag. */
  lead?: true;
  /** The supplied frame must be replaced before launch (02 §14 Q27). */
  posterStatus?: "replace";
};

/** The old WordPress site, for pieces that cannot be embedded yet (02 §1.4). */
const OLD_SITE = "https://kryshanrandel.com";

function poster(slug: string, width = 1600, height = 900): ProjectPoster {
  return { src: `/media/posters/${slug}.jpg`, width, height };
}

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
    embed: { provider: "youtube", id: "CQUSAB2euBk" },
    poster: poster("just-watch-us", 1600, 700),
    rights: "public",
    featured: 1,
    lead: true,
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
    embed: { provider: "youtube", id: "zsXt4ykR6EY" },
    poster: poster("a-very-bc-production"),
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
    embed: { provider: "youtube", id: "UyVrm210Fc8" },
    poster: poster("directors-reel"),
    rights: "public",
    lead: true,
    posterStatus: "replace",
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
    embed: { provider: "youtube", id: "3DSlctLvQG4" },
    poster: poster("artless"),
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
    awards: [
      "Grand Jury Prize and Best Death, Bloodshots Film Festival",
      "Screened at Fantasia and Sitges",
    ],
    embed: { provider: "vimeo", id: "23552792" },
    poster: poster("jack"),
    rights: "public",
    featured: 2,
    lead: true,
  },
  {
    slug: "glimpse",
    title: "Glimpse",
    year: 2007,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "passion",
    kind: "Short",
    awards: [
      "A&E Short Filmmakers Award, NSI Online Film Festival (2008)",
      "Premiered at VIFF 2007",
    ],
    embed: { provider: "youtube", id: "-MoaRA-QC8E" },
    poster: poster("glimpse", 720, 480),
    rights: "public",
    posterStatus: "replace",
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
    embed: { provider: "youtube", id: "BdDTZcIymG0" },
    poster: poster("born-to-be", 1600, 694),
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
    // Award list disagrees between sources (02 §13 #6); festivals only until Q18.
    awards: ["Screened at Fantastic Fest and Fantasia"],
    // Banned from YouTube and Vimeo; link out until the Dailymotion call (02 §14 Q9).
    embed: {
      provider: "linkout",
      url: `${OLD_SITE}/project/the-bully-solution/`,
    },
    poster: poster("the-bully-solution", 720, 480),
    rights: "public",
    posterStatus: "replace",
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
    embed: { provider: "youtube", id: "KNP-9hOFCR0" },
    poster: poster("dare", 1600, 733),
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
    embed: { provider: "youtube", id: "czL8jlkT2jc" },
    poster: poster("just-up-the-block", 1600, 631),
    rights: "public",
    featured: 5,
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
    embed: { provider: "youtube", id: "92ZF6lgw4us" },
    poster: poster("riverdale-ew-bts", 1600, 686),
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
    embed: { provider: "youtube", id: "CBbDVwxeTaM" },
    poster: poster("twenty8s", 1600, 889),
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
    embed: { provider: "youtube", id: "AsjwQgkOCUo" },
    poster: poster("united8s"),
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
    embed: { provider: "youtube", id: "6ijBBPwVdGY" },
    poster: poster("a-dogs-way-home-epk"),
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
    // Individual Instagram links unknown (02 §14 Q10); the old page holds them.
    embed: { provider: "linkout", url: `${OLD_SITE}/project/shotlister/` },
    poster: poster("shotlister"),
    rights: "public",
  },
  {
    slug: "contact-club",
    title: "Contact Club",
    year: 2020,
    roles: ["directing"],
    roleLabel: "Director / Co-writer",
    lane: "passion",
    kind: "Short",
    awards: [
      "Best Actor (Riaan Smit), Vancouver Quarantine Performance Project",
      "Nominated for Best Film and Best Writing",
    ],
    embed: { provider: "youtube", id: "EMlAIDezFMs" },
    poster: poster("contact-club"),
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
    embed: { provider: "youtube", id: "X272pj_iu7Y" },
    poster: poster("the-wolf-of-west-georgia-street"),
    // A private person at a private party: shown on 02 §14 Q13's assumption.
    rights: "pending",
    featured: 4,
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
    embed: { provider: "vimeo", id: "88313657" },
    poster: poster("its-a-crazier-life"),
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
    embed: { provider: "vimeo", id: "155338101" },
    poster: poster("lyons-heart"),
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
    // No link supplied (02 §14 Q10).
    embed: { provider: "none" },
    poster: poster("vandu"),
    rights: "public",
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
    embed: { provider: "youtube", id: "NSTO9qq6SG8" },
    poster: poster("digital-days"),
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
    awards: ["Screened at VIFF 2018"],
    embed: { provider: "youtube", id: "tHqDJ6Gcbr0" },
    poster: poster("be-reel-green"),
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
    embed: { provider: "vimeo", id: "166846735" },
    poster: poster("rffc-were-in-this-together"),
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
    embed: { provider: "youtube", id: "arSy1rmGMGU" },
    poster: poster("5rhythms"),
    rights: "public",
    featured: 3,
    lead: true,
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
    embed: { provider: "youtube", id: "BG0OpaU9rJo" },
    poster: poster("tradeswoman-exhibit", 1600, 857),
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
    embed: { provider: "youtube", id: "HRwxGEJdris" },
    poster: poster("tuts-2025-season-teaser", 1600, 891),
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
    embed: { provider: "youtube", id: "5Z6rq32MKyc" },
    poster: poster("tuts-2026-trailer", 1600, 847),
    rights: "public",
  },
];

/** Pieces that may appear anywhere on the site: NDA'd work never does. */
export const SHOWABLE_PROJECTS: ReadonlyArray<Project> = PROJECTS.filter(
  (project) => project.rights !== "nda",
);

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
