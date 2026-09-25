import { siteRoutes, WORK_ROLES } from "./routes";

/**
 * Runs before first paint (an inline `<script>` first in
 * `app/(site)/layout.tsx`, which persists across client navigations, so the
 * script is only ever parsed with a document). It:
 * - marks `<html data-js>`, so CSS can show JavaScript-only controls
 *   (`[data-needs-js]`) at first paint with no layout shift, and hide them
 *   without JavaScript;
 * - on Work, sets `data-work-role` and `data-work-passion` on `<html>` from
 *   the query, so a filtered URL paints filtered (SITE-4, M-SITE-5). Unknown
 *   values are ignored, with the rules of `parseWorkFilter`.
 *
 * Kept as a string built from constants: it is inlined, never bundled.
 */
export const PRE_PAINT_SCRIPT = [
  "(function(){",
  "var d=document.documentElement;",
  'd.setAttribute("data-js","");',
  `if(location.pathname!==${JSON.stringify(siteRoutes.work())})return;`,
  'var q=new URLSearchParams(location.search),r=q.get("role");',
  `if(${JSON.stringify(WORK_ROLES)}.indexOf(r)>-1)d.setAttribute("data-work-role",r);`,
  'if(q.get("passion")==="1")d.setAttribute("data-work-passion","");',
  "})();",
].join("");

/**
 * The `data-js` mark, set from a client leaf on mount. Covers the one path
 * where the inline script doesn't run: a client-side navigation into the
 * public site from outside it (the 404, or `/review`). Idempotent.
 */
export function markJsReady(): void {
  document.documentElement.setAttribute("data-js", "");
}
