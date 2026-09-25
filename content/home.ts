/**
 * Home's lists and headline (spec §6.1, D-KRD-5, D-KRD-13). The only place
 * that decides which films Home shows and in what order. Every slug must be
 * a public film in content/projects.ts; the build says so if one isn't.
 *
 * Imports: none, and never an image, so `next.config.ts` can read
 * content/projects.ts (which imports this) for the redirects (spec §8).
 */

/**
 * The featured grid, in order: his top five and his "lead with this" flags.
 *
 * The Directors Reel fallback is in force (spec §6.1): its replacement frame
 * isn't approved, so it is held, Contact Club takes its place (position 2)
 * and Born To Be leads the Directing row. To undo it once the frame is
 * approved: put "directors-reel" back at position 2 here, move
 * "contact-club" to the front of DIRECTING_ROW and "born-to-be" second.
 *
 * Portrait rule: with a current portrait, the title cell becomes 2 × 2 at
 * ≥1280 and this list grows to eight (Contact Club, Born To Be), per §6.1.
 */
export const FEATURED: ReadonlyArray<string> = [
  "just-watch-us",
  "contact-club",
  "jack",
  "5rhythms",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
];

/**
 * The two rows (handoff §6.6). The rules that produced them govern edits:
 * nothing already featured; each film in one row only, by its first role;
 * no poster awaiting replacement, no baked-in title card, no link-out, no
 * held film; at most eight; passion and paid work mixed for range.
 */
export const DIRECTING_ROW: ReadonlyArray<string> = [
  "born-to-be",
  "a-very-bc-production",
  "dare",
  "its-a-crazier-life",
  "be-reel-green",
  "artless",
  "united8s",
];

export const CAMERA_ROW: ReadonlyArray<string> = [
  "riverdale-ew-bts",
  "a-dogs-way-home-epk",
  "tuts-2026-trailer",
  "tuts-2025-season-teaser",
  "tradeswoman-exhibit",
  "digital-days",
  "rffc-were-in-this-together",
];

/**
 * Home's h1 and its one red phrase (Locked, §6.1). `red` must appear in
 * `text` word for word, once; the title cell colours that part.
 */
export const HOME_H1 = {
  text: "I direct, shoot and edit stories that are hard to look away from.",
  red: "hard to look away from.",
} as const;

/** Home's title and description (spec §6.1). The title is absolute: no " — Kryshan Randel" suffix. */
export const HOME_META = {
  title: "Kryshan Randel — Director, camera operator, editor",
  description:
    "Director, camera operator and editor in Vancouver. Dark comedies that won at Bloodshots, PSAs for the Directors Guild of Canada, IATSE 669 camera.",
} as const;

/** Home's link labels (Locked). The arrows are drawn by the page, hidden from screen readers. */
export const HOME_LINKS = {
  /** Phones only: jumps to the first film. */
  watch: "Watch",
  allDirecting: "All directing",
  allCamera: "All camera work",
  teaching: "Teaching",
  /** "Pieces", not "films" or "projects"; the count is the number of public films. */
  allPieces: (n: number) => `All ${n} pieces`,
} as const;
