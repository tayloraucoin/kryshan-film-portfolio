/**
 * Site-wide copy: the words that recur on more than one page but are not the
 * site's identity. Identity (name, roles line, place line, email, socials)
 * lives in `SITE` in `lib/config.ts`, where metadata can read it without
 * importing upward (DEVIATIONS.md, CB-0).
 *
 * Every string is from docs/client/kryshan-03-copy-and-voice.md §8, which is
 * marked [draft]: final words are his.
 */

/**
 * Primary navigation labels, in order. Teaching is the fifth page on
 * 02 §14 Q7's assumption. Paths are added in `lib/routes.ts` when the pages
 * exist; until then the review mocks render these as inert links.
 */
export const NAV_LABELS = ["Work", "About", "Teaching", "Contact"] as const;

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
