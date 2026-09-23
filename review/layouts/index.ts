/**
 * The layouts the review round offers. Each is a markdown file beside this
 * index, rendered as-is by `/review/layouts/[layout]`; the file is the
 * deliverable (Batch 6's `kryshan-06-layout-X.md` shape), not a summary of it.
 *
 * `kitId` names the kit it pairs with, so the layout page can render inside
 * that kit's scope and the index can show the pairing.
 */
export type ReviewLayout = {
  id: string;
  letter: string;
  name: string;
  /** One line: the structural idea. */
  thesis: string;
  kitId: string;
  /** Filename inside `review/layouts/`. */
  file: string;
  placeholder?: boolean;
};

export const REVIEW_LAYOUTS: ReadonlyArray<ReviewLayout> = [
  {
    id: "kryshan-a",
    letter: "A",
    name: "The Marquee",
    thesis:
      "A director's site with no hero. A cell expands in place to play; the others move aside.",
    kitId: "kryshan-a",
    file: "kryshan-a.md",
  },
  {
    id: "kryshan-b",
    letter: "B",
    name: "The Study",
    thesis:
      "A persistent left rail carries him on every page. The work plays in a lightbox over the dimmed page.",
    kitId: "kryshan-b",
    file: "kryshan-b.md",
  },
  {
    id: "layout-c",
    letter: "C",
    name: "Placeholder C",
    thesis: "The structural idea of layout C, in one line.",
    kitId: "kit-c",
    file: "placeholder-c.md",
    placeholder: true,
  },
];

export function findReviewLayout(id: string): ReviewLayout | undefined {
  return REVIEW_LAYOUTS.find((layout) => layout.id === id);
}
