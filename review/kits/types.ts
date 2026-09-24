import type { BrandKit } from "@/brand/types";

/**
 * The custom properties every review kit defines, so that any demo home
 * page can render in any kit (the kit switcher on `/review/mocks/…`). A
 * mock may read these and the shadcn roles, nothing else. Each kit decides
 * the value; a kit that has no such idea supplies its nearest neutral (kits
 * A and B have no coloured role tags, so their tags are the secondary grey).
 */
export type MockVars = {
  /** Text-size accent for links, small labels and hovers (AA at body size). */
  "--link": string;
  /** A dark band for frames to sit on, and the text colour on it. */
  "--surface-dark": string;
  "--surface-dark-foreground": string;
  /** The face for press quotes. */
  "--font-quote": string;
  /** Role-tag colours: Directing, Camera, Editing. */
  "--tag-directing": string;
  "--tag-camera": string;
  "--tag-editing": string;
};

/**
 * A kit as the review round presents it: the brand kit plus the words the
 * reviewer compares it by. Everything the kit page renders comes from here,
 * so three kits are rendered by one template and compared like with like.
 */
export type ReviewKit = Omit<BrandKit, "extraVars"> & {
  /** The shared mock variables plus anything kit-specific. */
  extraVars: MockVars & Record<`--${string}`, string>;
  /** "A", "B", "C" — the letter the client will use in conversation. */
  letter: string;
  /** One line: which pillar leads and what that costs. */
  tagline: string;
  /** A paragraph: the argument for this kit. */
  thesis: string;
  /** The same demo strings in every kit, so type is compared fairly. */
  voice: {
    h1: string;
    support: string;
    work: string;
    about: string;
    contact: string;
  };
  /** The kit's "never" list. */
  never: ReadonlyArray<string>;
  /** True for the boilerplate's own placeholders. Renders a ribbon; must be false before a client sees it. */
  placeholder?: boolean;
  /**
   * Which review round the kit belongs to. Absent means 1 (the round the
   * client answered); 2 is a revision built after it (Demo D). Rounds never
   * mix in the kit switcher or the feedback form (D-KRD-17).
   */
  round?: ReviewRound;
};

/** A review round. 1 = the first round; 2 = revisions after it. */
export type ReviewRound = 1 | 2;

/** The round of any registry entry; absent means the first round. */
export function roundOf(entry: { round?: ReviewRound }): ReviewRound {
  return entry.round ?? 1;
}
