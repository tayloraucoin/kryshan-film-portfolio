import type { Route } from "next";
import { siteRoutes } from "@/lib/routes";

/**
 * Site-wide copy: the words that recur on more than one page, and the links
 * he edits himself (nav, socials; D-SITE-28, CONVENTIONS §10a). Identity
 * (name, roles line, place line, email) lives in `SITE` in `lib/config.ts`,
 * where metadata can read it without importing upward (DEVIATIONS.md, CB-0).
 *
 * Client components import this file, so it never imports `lib/config` or
 * anything else that reads the environment.
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
  wordmarkName: (name: string) => `${name}, home`,
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

/** The film components' words (spec §4.3, §7.6; Locked). */
export const FILM_COPY = {
  /** A tile's accessible name. */
  tileName: (title: string, genreLine: string) => `${title}, ${genreLine}`,
  /** The one lane label; paid work shows its client instead (D-KRD-10). */
  passion: "Passion project",
  close: (title: string) => `Close ${title}`,
  copyLink: {
    idle: "Copy link",
    done: "Link copied",
    failed: "Couldn't copy. The link is selected.",
  },
  /** A link-out film's button; the ↗ is rendered separately, hidden from screen readers. */
  linkOut: (host: string) => `Watch on ${host}`,
  /** Share-image alt text. */
  ogAlt: (title: string) => `${title}, a still from the film`,
} as const;

/** Work's shared strings (spec §7.6; Locked). */
export const WORK_COPY = {
  status: {
    filtered: (m: number, n: number) => `Showing ${m} of ${n}`,
    all: (n: number) => `Showing all ${n}`,
  },
  /** `role` is the lowercase role; with no role, "No passion projects yet." */
  empty: (role?: string) =>
    role ? `No ${role} passion projects yet.` : "No passion projects yet.",
  showAll: "Show all",
  credits: {
    /** The jump link under Work's header; the ↓ is drawn by the page. */
    jump: "Behind-the-scenes credits",
    all: (n: number) => `All ${n} credits`,
    imdb: "Full credits on IMDb",
  },
} as const;

/** A film's detail page (spec §6.3, §7.6; Locked unless marked). */
export const DETAIL_COPY = {
  /** Back to Work; filters aren't restored. The arrow is drawn by the page. */
  back: "Work",
  previous: "Previous",
  next: "Next",
  facts: {
    awards: "Awards and selections",
    press: "Press",
    articles: "Articles",
  },
  /**
   * The hand-off sentence that ends every detail page (≤12 words, one line
   * for all films). Empty: the block isn't rendered (the email line under
   * the title already carries the address).
   */
  // Copy row D-0 (docs/client/kryshan-09-copy-for-approval.md)
  handOff: "If you want something like this, email me.",
} as const;

/** Contact (spec §6.6, §7.6). */
export const CONTACT = {
  /** The page's name, in the tab and the bar. */
  title: "Contact",
  /** Locked; flagged to him (O-SITE-16): "No waiting" promises how fast he replies. Alternative offered: "No agent and no form. Email me." */
  h1: "No agent, no form, no waiting.",
  /** The meta description (Locked, Cantor). */
  description:
    "Email Kryshan Randel directly. Director, camera operator, editor and film instructor. Vancouver, works anywhere.",
  /** One plain line for the teaching audience (≤12 words, no "also"). Empty: not rendered. */
  // Copy row C-1 (docs/client/kryshan-09-copy-for-approval.md)
  teachingLine: "For teaching and coaching, email the same address.",
  /** Copy: its label, the label after copying, and what the status says when it couldn't. */
  copy: {
    idle: "Copy",
    done: "Copied",
    failed: "Couldn't copy. The address is selected.",
  },
} as const;

export type Strand = {
  /** Stable id for anchors and review comments. */
  id: "directing" | "camera-editing" | "teaching";
  title: string;
  body: string;
};

/**
 * The three strands, cut to two lines each (03 §8, from his old home page).
 * The Directing and Camera and editing lines are spec §6.1's amended
 * defaults (D-SITE-27, [PROVISIONAL — his OK in the one message]); Teaching
 * drops the second school until he confirms it (O-SITE-5). Full stops, not
 * semicolons, between each strand's groups (SITE-C round 2): three
 * semicolon lists in a row read as a template.
 */
export const STRANDS: ReadonlyArray<Strand> = [
  {
    id: "directing",
    title: "Directing",
    body: "Dark comedies and horror shorts that won at Bloodshots and screened at Sitges and Fantasia. PSAs, music videos, web series and sizzle reels for clients.",
  },
  {
    id: "camera-editing",
    title: "Camera and editing",
    body: "IATSE 669. Behind-the-scenes and EPK camera for Sony Pictures and Entertainment Weekly. Docs and non-fiction, often as a one-person crew. Leo-nominated as an editor.",
  },
  {
    id: "teaching",
    title: "Teaching",
    body: "Directing, shooting and editing at LaSalle College. Film camps and one-on-one coaching.",
  },
];
