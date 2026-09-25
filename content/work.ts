/**
 * Work's words (spec §6.2). Client components import this file, so it never
 * imports `lib/config` or anything that reads the environment.
 *
 * The optional strings are his words, cut, or new copy (SITE-C). While
 * one is empty the page renders nothing in its place (D-SITE-20): no
 * heading, no gap.
 */
export const WORK = {
  h1: "Work",
  /** Beside the h1: "{n} pieces", or "{m} of {n}" with the passion chip on (a role hides nothing). */
  count: {
    all: (n: number) => `${n} pieces`,
    filtered: (m: number, n: number) => `${m} of ${n}`,
  },
  /** The role links, which arrange, then the one chip, which filters (D-SITE-5, SITE-4a). */
  filters: {
    label: "Arrange and filter work",
    all: "Featured",
    directing: "Directing",
    camera: "Camera",
    editing: "Editing",
    passion: "Passion projects",
  },
  /**
   * "Arrange by" (SITE-4a, his Demo D feedback): the lead-in before the role
   * links, the divider's label between a role's films and the rest, and
   * what a screen reader hears after a change.
   */
  // Copy rows W-6, W-7, W-8 (docs/client/kryshan-09-copy-for-approval.md)
  arrange: {
    lead: "Arrange by",
    rest: "The rest",
    announce: (role?: string) => (role ? `${role} first` : "Featured order"),
  },
  cantShow: {
    heading: "What I can't show you",
    /**
     * His names line, cut (≤55 words). Aubrey Plaza waits on Q12 (SITE-C
     * ruling 6). Empty: the section doesn't render.
     */
    // Copy row W-1 (docs/client/kryshan-09-copy-for-approval.md)
    body: "I’ve directed Ted Danson, Mary Steenburgen and Peter Gallagher in Ted on Set, and Kevin Smith and Tom Green in the Rio Theatre PSAs. I am allowed to say I worked with them but not allowed to post the results of our work online.",
  },
  credits: {
    /** A Write string, 2–4 words, literal (SITE-4 ruling 8). */
    // Copy row W-2
    heading: "Behind the scenes",
    /**
     * ≤20 words: capacity (behind-the-scenes and EPK camera, IATSE 669) and
     * the released count, rendered from content/credits.ts. null: not rendered.
     */
    // Copy row W-3
    context: ((count: number) =>
      `Behind-the-scenes and EPK camera, as a member of IATSE 669, on ${count} released productions.`) as
      null | ((count: number) => string),
  },
  /** The hand-off sentence (≤12 words), for the camera hire. Empty: the address alone. */
  // Copy row W-4
  handOff: "For camera or editing on your production, email me.",
  /** The meta description (≤155 characters). Empty: the site's description. */
  // Copy row W-5
  description:
    "Directing, camera and editing by Kryshan Randel: dark comedy shorts, PSAs, music videos, trailers and EPKs, plus behind-the-scenes credits.",
} as const;
