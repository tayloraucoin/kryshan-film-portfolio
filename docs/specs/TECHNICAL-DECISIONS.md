# Technical decisions (append-only)

One section per architectural choice with real alternatives. Never edit or delete prior entries. Fast-lane ADR: context · options · decision · consequences · revisit trigger. IDs `M-CB-n` are citable from tickets.

## 2026-09-22 · CB-0 · M-CB-1 · Next.js 16 defaults; single app, no monorepo

**Context:** taylor-aucoin is Next 15 with `middleware.ts`; Conscious Connections is Next 16 in a Turborepo monorepo. `create-next-app` defaults today give Next 16, Turbopack, `proxy.ts`, typed routes.
**Options weighed:** A) Match taylor-aucoin's Next 15. B) Take the defaults (Next 16). C) A monorepo of client sites sharing packages.
**Decision:** B. Single app per client, duplicated from this boilerplate. CC's own Rule 1 (placement follows the consumer) decides against C: each client site has one consumer and is handed over whole, in the client's name.
**Consequences:** Batch 7 prompts target Next 16 conventions (`proxy.ts`, `await params`, `PageProps<>` helpers). Shared improvements travel by copying, not by package bump; that is the price of clean handover.
**Revisit trigger:** Three or more live client sites needing the same fix at once.

## 2026-09-22 · CB-0 · M-CB-2 · shadcn with Base UI (the `base-nova` default), vendored

**Context:** shadcn's current default is Base UI rather than Radix. CC's `@cc/ui` is Radix-era shadcn.
**Options weighed:** A) `--base radix` to match CC. B) The default (Base UI).
**Decision:** B. Defaults were the brief, and the components are vendored into `components/primitives/` either way; their internals do not leak into the kit pipeline. The visible API differences (`render` prop instead of `asChild`) are noted in CONVENTIONS.md.
**Consequences:** Agents used to Radix-shadcn must read the generated file before composing. Adding components is `npx shadcn@latest add`.
**Revisit trigger:** A primitive the client sites need that Base UI lacks.

## 2026-09-22 · CB-0 · M-CB-3 · Kits are data compiled to shadcn variables at a scope

**Context:** Each client site has its own brand; the review round shows three at once; production must be "empty until set".
**Options weighed:** A) A `globals.css` per kit, swapped by build flag. B) A theme provider and class-based themes. C) A `BrandKit` object compiled to inline custom properties at a scope element (`<html>` for production, a wrapper for review).
**Decision:** C. No global CSS changes per kit, three kits on one page, `PRODUCTION_KIT: BrandKit | null` makes "unset" a type. Fonts ride along as `fontClassName`.
**Consequences:** Kit authors write hex, not utilities; components never reference a kit. Contrast is computable on the kit page. Inline custom properties on `<html>` are a few hundred bytes.
**Revisit trigger:** A client needing a runtime theme switch (then a provider on top of the same variables).

## 2026-09-22 · CB-0 · M-CB-4 · `@t3-oss/env-nextjs` + zod, no tier collapse

**Context:** taylor-aucoin has a hand-written env switch because it collapses staging/live credentials at build time. Client sites have no database and no tiers.
**Options weighed:** A) Copy taylor-aucoin's switch. B) t3-env with zod (CC's approach).
**Decision:** B. Validation at build, server variables unreachable from client bundles, one file.
**Consequences:** `next.config.ts` imports `lib/env.ts`; a bad variable fails the build. `SKIP_ENV_VALIDATION=true` for CI builds without secrets.
**Revisit trigger:** A client site that needs staging and production credentials for anything.

## 2026-09-22 · CB-1 · M-CB-5 · The review layer talks to tayloraucoin.com through server actions with a per-round key

**Context:** Comments and the feedback form must reach Taylor's backend. taylor-aucoin had no inbound endpoint; one was built to the contract in `docs/REVIEW-BACKEND-CONTRACT.md`.
**Options weighed:** A) Browser → backend directly, with CORS and a public token. B) Browser → this site's server action → backend, with a secret key in the site's env. C) Store comments in this site (would need a database).
**Decision:** B. No key in a browser, no CORS, no database here. Ids are minted in the browser so failed sends retry idempotently; unsent comments wait in `localStorage`.
**Consequences:** One more hop; the site must be deployed for the backend to see anything. A leaked key is rotated by minting a new round.
**Revisit trigger:** A second consumer of the same comments (an admin UI in this repo) or a need for live collaboration.

## 2026-09-22 · CB-1 · M-CB-6 · The gate is a signed cookie behind a shared code, checked in `proxy.ts`

**Context:** The round must be private but the client has no account anywhere.
**Options weighed:** A) HTTP basic auth. B) A shared code exchanged for an HMAC-signed, path-scoped cookie; `proxy.ts` verifies on every request. C) Vercel password protection (paid, per project).
**Decision:** B. Works on any host, one env code, one place to audit, `noindex` stamped by the same file.
**Consequences:** Not authentication: anyone with the code and the link is the client. Rotating the code or the secret logs everyone out.
**Revisit trigger:** A client asking for named reviewers.

## 2026-09-22 · CB-1 · M-CB-7 · Layout deliverables render as markdown from disk

**Context:** Batch 6 layouts are markdown; Batch 7 asks how markdown is rendered.
**Options weighed:** A) Convert each to TSX by hand. B) `react-markdown` + `remark-gfm` over the file read at request time, traced by `outputFileTracingIncludes`.
**Decision:** B. The deliverable is the page; nothing is retyped.
**Consequences:** The review tree is dynamic anyway, so the disk read costs nothing it was not already paying. Typography styles come from `@tailwindcss/typography` inside the kit's scope.
**Revisit trigger:** Layouts arriving as something other than markdown.

## 2026-09-22 · KR-1 · M-KR-1 · Expand-in-place is a same-document view transition

**Context:** Layout A's one deliberate moment: a grid cell grows to 2 × 2 from where it was tapped, the others reflow, 220 ms, instant under reduced motion. B and C have the same shape (a lightbox, an expanding row).
**Options weighed:** A) Hand-rolled FLIP (measure every cell, invert, play) in the leaf. B) A motion library (Framer Motion `layout`). C) `document.startViewTransition` around a `flushSync` state change, one `view-transition-name` per cell.
**Decision:** C. The browser measures and animates the reflow; the leaf holds one `openSlug` and nothing else. No dependency, no JS on the page before interaction beyond the leaf itself. Where the API is missing or `prefers-reduced-motion: reduce` is set, the same state change happens instantly with the same layout.
**Consequences:** The duration is set with a `::view-transition-group(*)` rule rendered by the leaf, so it applies page-wide while the grid is mounted. Browsers without same-document view transitions get no animation, which the layout already specifies as the reduced-motion state.
**Revisit trigger:** A layout needing motion the browser's cross-fade-and-morph cannot express (a shared element changing shape mid-flight), or a production target browser without support where the motion is judged essential.

## 2026-09-22 · KR-1 · M-KR-2 · The review gate has an explicit off switch, failing closed

**Context:** Local development and agent browser walks were blocked at the code gate; agents do not type access codes.
**Options weighed:** A) Skip the gate when `NODE_ENV=development`. B) A dev-only signed cookie minted by a script. C) An explicit `REVIEW_GATE=on|off` variable, default `on`.
**Decision:** C. A is invisible and would also open `yarn start:agent` walks unpredictably; B is a second credential path to audit. C is one line in `proxy.ts`, validated by zod (anything but `off` is rejected at build), and the review index prints a warning while it is off.
**Consequences:** A deployed round must not carry `REVIEW_GATE=off`; KR-4's checklist should confirm it. `noindex` is stamped either way.
**Revisit trigger:** A round deployed with the gate off by mistake (then refuse `off` when `VERCEL_ENV=production`).
