/**
 * Rendered over anything still marked `placeholder: true`. It is the one
 * piece of the review layer that must never reach a client: when Batch 7's
 * kits, layouts and mocks are in, every registry entry drops the flag and
 * this component renders nothing anywhere.
 */
export function PlaceholderRibbon({ placeholder }: { placeholder?: boolean }) {
  if (!placeholder) return null;
  return (
    <p
      data-review-chrome
      className="border-b border-amber-500/40 bg-amber-500/15 px-4 py-2 text-center text-xs font-medium text-amber-700 dark:text-amber-300"
    >
      Placeholder. Nothing here is a design decision; docs/REVIEW-LAYER.md §5
      says what replaces it.
    </p>
  );
}
