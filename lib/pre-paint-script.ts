/**
 * Runs before first paint (an inline `<script>` first in
 * `app/(site)/layout.tsx`). It marks `<html data-js>` so CSS can show
 * JavaScript-only controls (`[data-needs-js]`, the Copy buttons) at first
 * paint with no layout shift, and hide them when there is no JavaScript.
 * SITE-4 extends it for Work's filters.
 *
 * Kept as a string: it is inlined, never bundled.
 */
export const PRE_PAINT_SCRIPT = `document.documentElement.setAttribute("data-js","");`;

/**
 * The same mark, set from a client leaf on mount. Covers the one path where
 * the inline script doesn't run: a client-side navigation into the public
 * site from outside it (the 404, or `/review`). Idempotent.
 */
export function markJsReady(): void {
  document.documentElement.setAttribute("data-js", "");
}
