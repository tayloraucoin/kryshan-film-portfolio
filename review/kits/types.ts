import type { BrandKit } from "@/brand/types";

/**
 * A kit as the review round presents it: the brand kit plus the words the
 * reviewer compares it by. Everything the kit page renders comes from here,
 * so three kits are rendered by one template and compared like with like.
 */
export type ReviewKit = BrandKit & {
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
};
