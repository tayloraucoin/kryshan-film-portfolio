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
 * The Directors Reel is held (its replacement frame isn't approved), and
 * Jack leads in its place (position 2; his round-3 notes took Contact Club
 * off Home). To bring the reel back once the frame is approved: put
 * "directors-reel" at position 2 here.
 */
export const FEATURED: ReadonlyArray<string> = [
  "just-watch-us",
  "jack",
  "5rhythms",
  "the-wolf-of-west-georgia-street",
  "just-up-the-block",
];

/**
 * Personal projects' order on Work (his round-3 notes): Jack leads (it is
 * pinned by FEATURED), then Glimpse, The Bully Solution, Contact Club, and
 * Lyons Heart last. `workOrder()` reorders only the personal projects among
 * themselves; every other film keeps its place.
 */
export const PERSONAL_ORDER: ReadonlyArray<string> = [
  "jack",
  "glimpse",
  "the-bully-solution",
  "contact-club",
  "lyons-heart",
];

/**
 * Home's h1 and its one red phrase (Locked, §6.1). `red` must appear in
 * `text` word for word, once; the title cell colours that part.
 */
export const HOME_H1 = {
  text: "I direct, shoot and edit stories that are hard to look away from.",
  red: "hard to look away from.",
} as const;

/**
 * The line under the h1: five words, each a link (his round-3 notes). `to`
 * names the page it opens; the title cell turns it into a route.
 */
export const HOME_ROLES = [
  { word: "Director", to: "directing" },
  { word: "Camera", to: "camera" },
  { word: "Editor", to: "editing" },
  { word: "Teacher", to: "teaching" },
  { word: "Storyteller", to: "about" },
] as const;

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
  /** "Pieces", not "films" or "projects"; the count is the number of public films. */
  allPieces: (n: number) => `All ${n} pieces`,
} as const;
