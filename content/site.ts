import type { Route } from "next";
import { SITE } from "@/lib/config";
import { siteRoutes } from "@/lib/routes";

/**
 * Site-wide copy: the words that recur on more than one page, and the links
 * he edits himself (nav, socials; D-SITE-28, CONVENTIONS §10a). Identity
 * (name, roles line, place line, email) lives in `SITE` in `lib/config.ts`,
 * where metadata can read it without importing upward (DEVIATIONS.md, CB-0).
 *
 * The chrome strings are the site UX spec's §7.6 (Locked). `STRANDS` is from
 * docs/client/kryshan-03-copy-and-voice.md §8, which is marked [draft]:
 * final words are his.
 */

/**
 * Primary navigation labels, in order. The review mocks (Demos A, B, D)
 * read these until the review layer is deleted (SITE-9); the live chrome
 * reads `NAV`.
 */
export const NAV_LABELS = ["Work", "About", "Teaching", "Contact"] as const;

/** The bar's four links, in order: a label and where it goes. */
export const NAV: ReadonlyArray<{
  id: "work" | "about" | "teaching" | "contact";
  label: (typeof NAV_LABELS)[number];
  href: Route;
}> = [
  { id: "work", label: "Work", href: siteRoutes.work() },
  { id: "about", label: "About", href: siteRoutes.about },
  { id: "teaching", label: "Teaching", href: siteRoutes.teaching },
  { id: "contact", label: "Contact", href: siteRoutes.contact },
];

/**
 * His profiles, in the order they appear in the footer. `secondary` ones sit
 * on a quieter second line (02 §14 Q11: assumed until he confirms). To add
 * or remove one, edit this list; nothing else needs to change.
 */
export const SOCIALS: ReadonlyArray<{
  label: string;
  href: string;
  secondary?: boolean;
}> = [
  { label: "IMDb", href: "https://www.imdb.com/name/nm1451064/" },
  { label: "Vimeo", href: "https://vimeo.com/kryshanrandel" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/kryshanrandelfilms",
  },
  { label: "LinkedIn", href: "https://linkedin.com/in/kryshanrandel" },
  {
    label: "Instagram",
    href: "https://instagram.com/kryshanrandel",
    secondary: true,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/kryshanrandel",
    secondary: true,
  },
];

/** The chrome's words (spec §7.6). */
export const CHROME = {
  skip: { work: "Skip to the work", content: "Skip to content" },
  /** The wordmark's accessible name; it links home and is never a heading. */
  wordmarkName: `${SITE.name}, home`,
  /** Landmark names. "More pages" is the phone row that scrolls away. */
  landmarks: { primary: "Primary", morePages: "More pages", social: "Social" },
  /** Hidden text after any link that opens a new tab. */
  newTab: ", opens in a new tab",
} as const;

/** The 404 (spec §6.7, Locked). */
export const NOT_FOUND = {
  h1: "That page doesn't exist. The work does.",
  link: "Go to the work →",
} as const;

export type Strand = {
  /** Stable id for anchors and review comments. */
  id: "directing" | "camera-editing" | "teaching";
  title: string;
  body: string;
};

/** The three strands, cut to two lines each (03 §8, from his old home page). */
export const STRANDS: ReadonlyArray<Strand> = [
  {
    id: "directing",
    title: "Directing",
    body: "Dark comedies and horror shorts that won at Bloodshots and screened at Sitges and Fantasia; PSAs, music videos, web series and sizzle reels for hire.",
  },
  {
    id: "camera-editing",
    title: "Camera and editing",
    body: "IATSE 669. Docs, behind-the-scenes, and non-fiction with a Canon C70, often as a one-person unit. Leo-nominated as an editor.",
  },
  {
    id: "teaching",
    title: "Teaching",
    body: "Directing, shooting and editing at Vancouver Film School and LaSalle College; film camps; one-on-one coaching.",
  },
];
