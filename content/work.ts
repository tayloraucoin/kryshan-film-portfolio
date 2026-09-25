/**
 * Work's words (spec §6.2). Client components import this file, so it never
 * imports `lib/config` or anything that reads the environment.
 *
 * The optional strings are his words or new copy that SITE-C writes. While
 * one is empty the page renders nothing in its place (D-SITE-20): no
 * heading, no gap.
 */
export const WORK = {
  h1: "Work",
  /** Beside the h1: "{n} pieces" unfiltered, "{m} of {n}" when a filter is on. */
  count: {
    all: (n: number) => `${n} pieces`,
    filtered: (m: number, n: number) => `${m} of ${n}`,
  },
  /** The role links, then the one chip (D-SITE-5). */
  filters: {
    label: "Filter work",
    all: "All",
    directing: "Directing",
    camera: "Camera",
    editing: "Editing",
    passion: "Passion projects",
  },
  cantShow: {
    heading: "What I can't show you",
    /** His names line, cut (≤55 words); waiting on Q12. Empty: the section doesn't render. */
    body: "",
  },
  credits: {
    /** A Write string, 2–4 words, literal; SITE-C may replace it (SITE-4 ruling 8). */
    heading: "Behind the scenes",
    /**
     * ≤20 words: capacity (behind-the-scenes and EPK camera, IATSE 669) and
     * the released count, rendered from content/credits.ts. SITE-C writes it
     * as a function of the count. null: not rendered.
     */
    context: null as null | ((count: number) => string),
  },
  /** The hand-off sentence (≤12 words); SITE-C writes it. Empty: the address alone. */
  handOff: "",
  /** The meta description (≤155 characters); SITE-C writes it. Empty: the site's description. */
  description: "",
} as const;
