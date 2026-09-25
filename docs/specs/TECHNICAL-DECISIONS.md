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

## 2026-09-22 · KR-5 · M-KR-3 · Any mock in any kit, through a typed shared-variable contract

**Context:** Taylor wants each layout shown in all three kits. The mocks had been written against their own kit's meanings (`accent` was small red in A and B but amber in C; B's band and C's tags read variables only their kit defined).
**Options weighed:** A) Nine hand-built mocks. B) Per-mock fallbacks (`var(--x, …)`) guessing a value when a kit lacks one. C) A `MockVars` type every `ReviewKit` must satisfy (`--link`, `--surface-dark`, `--surface-dark-foreground`, `--font-quote`, `--tag-*`), with mocks allowed to read only shadcn roles plus those.
**Decision:** C. Each kit states its own value (A and B choose grey tags because they have none), the type system rejects a kit that omits one, and a mock written against the contract works in every kit. The kit is a URL segment so comments keep their combination.
**Consequences:** Adding a kit means filling seven more values. Mocks must not use `accent` or `primary` for small text; `--link` is the small-text accent. The production kit (`brand/production.ts`) is unaffected; the contract lives in `review/kits/types.ts` and is deleted with the review layer.
**Revisit trigger:** A fourth kit whose idea cannot be expressed in these seven variables.

## 2026-09-22 · KR-6 · M-KR-4 · Feedback answers travel as an ordered, self-describing list under a versioned `answers` key

**Context:** The feedback form grows from six fixed fields to about twenty structured questions (rankings, 0.0–7.0 sliders, choices) whose set changes per client. taylor-aucoin stores the submission as one jsonb `payload` and emails Taylor a summary; neither side may need the other's code to read an answer. The six existing fields must stay valid (M-CB-5's contract, REV-1's validator).
**Options weighed:** A) Named top-level fields per question (`kitColourRank`, …): a contract change and a taylor-aucoin deploy for every client's round. B) The ticket's example: `answers: { schema, ratings, rankings, choices, texts }` as records keyed by question id, plus a separate label map. C) `answers: { schema, items: ReviewAnswer[] }`, where each item carries its own `id`, `kind`, `section`, `label` and value (options as `{ id, label }`; a scale's two ends and the intake `baseline`), as a union discriminated on `kind`.
**Decision:** C. Postgres `jsonb` does not keep object key order (it sorts keys), so under B the stored row and anything rendered from it lose the question order, and each answer's label sits in a second structure the reader has to join. Under C the array keeps form order in the row, every item reads on its own, and the email is a loop with no lookups. Validation is per kind on both sides, the same union in both `lib/validators/review.ts`. Labels are snapshotted **on this site's server** from `review/feedback.ts` and the live registries, not taken from the browser: the browser sends `{ [questionId]: value }` and the action rejects unknown ids and unknown option ids. The six old fields keep their meaning: the three text boxes are still `flinch` / `fightFor` / `notes`, and the favourite combination fills `preferredKit` / `preferredLayout` / `preferredMock`, declared in data (`sets` on the option).
**Consequences:** No migration: `payload` is jsonb and the key is additive and optional (`answers` absent or null is a pre-KR-6 submission). The scale is fixed at 0.0–7.0, one decimal (the intake's scale), in the contract rather than per item. Intake baselines live in `review/feedback.ts` beside the questions, are attached by the server action, and never reach the browser. The next client's round changes `review/feedback.ts` and its `schema` string, and neither repo's code.
**Revisit trigger:** A question that none of rank, scale, choice or text can express (a multi-select, an image pick), or an admin surface in taylor-aucoin that wants to aggregate answers across rounds (it would then want the question sets registered there too).

## 2026-09-22 · KR-6 · M-KR-5 · The site names itself with a static `REVIEW_CLIENT`; `REVIEW_INGEST_KEY` is the shared sister-repo key (amends M-CB-5)

**Context:** M-CB-5 had the site hold "a per-round key" minted in taylor-aucoin. Taylor found that overcomplicated for repos he owns; taylor-aucoin now admits any holder of one shared key and files by the caller's stated identity (its M-REV-6).
**Options weighed:** A) Keep per-round keys. B) Identity in env vars. C) Identity hard-coded in `lib/review/client.ts` (`clientApp`, `engagementId`, `label`), sent as headers by `lib/review/backend.ts`; the key stays in env.
**Decision:** C, on Taylor's call. Which client this repo is does not vary by environment, so it is code; the key is a secret, so it stays in env. The engagement id is production's; taylor-aucoin links it only where it exists.
**Consequences:** M-CB-5's transport (server actions, key never in a browser) is unchanged; only what the key means changes. A new client repo edits `lib/review/client.ts` and sets the same key. The label is URI-encoded because headers are ASCII.
**Revisit trigger:** as M-REV-6.

## 2026-09-24 · KR-8 · M-KR-6 · Demo D opens a film on the line below its tile (the jawbone), placed by walking the grid's live columns

**Context:** Layout A grew a tapped cell to 2 × 2 inside the grid (M-KR-1). Demo D needs one grammar for the grid and for KR-9's horizontal rows (D-KRD-6). In a scroller a cell can't grow, and a full-width cell in a CSS grid either leaves holes or, with `grid-auto-flow: dense`, pulls later tiles ahead of it, so visual order stops matching DOM order and focus order.
**Options weighed:** A) A's 2×2 growth in the grid and a separate panel under rows (two grammars). B) The tapped cell spans the full width, with `dense` backfill. C) The tile stays; a full-width panel item (`col-span-full`) is inserted after the last tile on the tapped tile's visual line, which is found by walking the items' spans in DOM order against the grid's computed column count (read on mount and on resize). With one column, the panel replaces the tile.
**Decision:** C. Nothing reorders, DOM order stays visual order, and the same panel component is reused under a row in KR-9. One open film per page lives in a module-level store read through `useSyncExternalStore` (no provider), so the grid and rows share it. The motion is still a same-document view transition (M-KR-1): tiles and the panel carry `view-transition-name`s; a same-line swap runs at 150 ms (`data-demo-vt`).
**Consequences:** The grid's column count must come from CSS, not a JS breakpoint table, so it can never disagree with what the browser draws. The panel's position depends on the title cell's two-column span; a portrait making it 2 × 2 (handoff §6.3) would change the line arithmetic. The layer is review-only and ports to `components/composed/work/` in the real build (handoff Appendix D).
**Revisit trigger:** A grid with items of mixed row spans, where line membership can't be computed from column spans alone.

## 2026-09-24 · SITE-1 · M-SITE-1 · The public chrome renders per page through a server `SiteShell`, not in `app/(site)/layout.tsx`

**Context:** The bar marks the current page with `aria-current` (`"page"`, or `"true"` on detail pages for Work) and the skip link's words differ by page ("Skip to the work" on Home and Work, "Skip to content" elsewhere; spec §4.2). A layout in the App Router cannot see which page it wraps. Spec §10 allows no JavaScript on the public site beyond the film leaves, the filter leaf and the copy buttons. `app/not-found.tsx` sits outside `(site)` and needs the same chrome.
**Options weighed:** A) Chrome in `app/(site)/layout.tsx`, with a client leaf reading `usePathname()` for `aria-current`: a client component on every page, against spec §10, and the skip-link text still can't vary without it. B) One layout per section (`(site)/work/layout.tsx`, …) passing the current item: works for `aria-current`, but Home and Work share the skip text, the 404 still needs its own copy, and five layouts hold one fact each. C) A server `SiteShell` (`components/composed/site/site-shell.tsx`) that renders skip link → bar → `<main id="main">` → footer, taking `current`, `currentKind` and `skipTo`; every page (and the 404) wraps its content in it; the route-group layout returns `children`.
**Decision:** C. Zero client JavaScript for the chrome, the page states its own current item where the fact lives, and the 404 reuses the same component. `main` carries `tabIndex={-1}` so the skip link moves focus, not just scroll; a page that passes `skipTo="work"` must render a focusable `id="work"` on the element holding its first tile.
**Consequences:** Each page ticket adds one wrapper line. A page that forgets the wrapper renders without chrome, which is obvious on the first look. CONVENTIONS §2's `(site)/` line is corrected to match. `app/(site)/layout.tsx` stays as the home of SITE-2's validation import.
**Revisit trigger:** Next gaining a server-side way for a layout to know its active segment without making the page dynamic, or a page whose chrome genuinely differs (then a prop, not a fork).

## 2026-09-24 · SITE-1 · M-SITE-2 · A kit scope always declares its ground (`dark` or `light`), and `dark:` stops at a `light` scope

**Context:** The production kit is dark and applied on `<html>` (`class="dark"`). Until SITE-9 deletes the review layer, review kits B (light) render inside it through `KitScope`. Tailwind's `dark` variant was `&:is(.dark *)`, so every `dark:` style inside a light kit scope switched on under the dark root: `FrameRibbon`'s amber 300 on kit B's cream is the known case (KR-5), and shadcn primitives carry many more.
**Options weighed:** A) Leave `<html>` unbranded until SITE-9 and put the production kit on a wrapper inside `(site)`: the review layer stays correct, but the root background, `color-scheme` and the 404 (outside `(site)`) would need a second application of the kit. B) Strip `dark` from `<html>` and rely on colour tokens only: shadcn's `dark:` variants (inputs, buttons) would then render their light forms on ink. C) `kitClassName()` emits `light` for a light kit (as it emits `dark` for dark), and the variant becomes `&:is(.dark *):not(.light, .light *)`, so the nearest declared ground wins.
**Decision:** C. One line in each of two files, no change to any component or mock, and nested scopes behave as nested scopes. Verified: kit B's ribbon is amber 800 under the dark root; Demos A and D render identically to before at 1440 and 390 (per-element computed colour, font, border and box).
**Consequences:** A light scope nested inside a dark scope inside a light scope would need the rule extended; nothing does that. After SITE-9 only the production kit remains, and the `light` class is simply never emitted by it.
**Revisit trigger:** A second production surface with its own ground (a light band inside the dark site), which would make this the site's real theming mechanism rather than a review-era guard.

## 2026-09-24 · SITE-2 · M-SITE-3 · One flat `Project` type; "public" is the only visibility test; `POSTERS` is the approval; the build refuses bad content in his words

(The ticket routed this as "M-SITE-2"; SITE-1 had already used that ID for nested kit grounds, so it is M-SITE-3.)

**Context:** The live site needs one answer to "may this film be shown?" (D-SITE-8), one poster source (spec §4.5), and consent rules that hold even when he edits the files himself after handover (CONVENTIONS §10a). The old model had `rights: "pending"`, `posterStatus: "replace"`, `featured`/`lead` flags and an old-site link-out, each a second place where visibility or approval could be decided.
**Options weighed:** A) A union discriminated on `rights` (`PublicProject` requires `embed` and a poster; `HeldProject` doesn't): the type proves completeness, but he edits by copying an entry, and a union's type error is unreadable to him. B) One flat `Project` with `embed?`; `isShowable` a type predicate to `ShowableProject` that tests `rights === "public"` only; `content/validate.ts` checks, in plain words, that every public film has a video, a logline and a `POSTERS` line, and throws once with every problem numbered. C) As B, but `isShowable` also tests for a video and a poster: a broken film would vanish silently, which is D-SITE-8's exact failure.
**Decision:** B, with the ticket's five calls. (1) One flat type, `embed` required for public films by `validate.ts`. (2) A `POSTERS` line _is_ the approval of that frame; there is no separate flag. (3) `logline` is required on every entry. (4) `IsoDate`/`isIsoDate` in `lib/iso-date.ts`, `Photo` in `content/photo.ts` with `src` a static import. (5) The Reel Youth (Whatì) check matches `/wh?at[iì]|reel youth/i` in the caption or alt; it applies to the minors form, the only form that carries `communityConsent`. Plus: `content/projects.ts` and `content/home.ts` import only by relative path and never an image, so `next.config.ts` can read them (verified: a probe import printed 22). `validate.ts` also collects checks beyond spec §5 that protect binding rules nothing else enforces (video, link-out host, one tile per film, the red phrase, quote counts, `LEGACY_PATHS` targets, "at-risk").
**Consequences:** A missing video or poster on a public film fails the build with a sentence naming the file, the film and the fix; he never sees a TypeScript union error for a content mistake. `ShowableProject.embed` is guaranteed by validation, not by the type, so code outside `SHOWABLE_PROJECTS` must not assume it. The messages are one template each, so `docs/EDITING.md` (SITE-10) can quote them word for word. Photo arrays join validation through `PHOTO_SETS`, which SITE-6 and SITE-7 append to.
**Revisit trigger:** A second kind of visibility (for example, "shown on Work but never on Home"), which would need a second field and would reopen D-SITE-8; or a Whatì photo of adults that needs community consent (the type would need `communityConsent` outside the minors form).

## 2026-09-24 · SITE-3 · M-SITE-4 · The film components take a server-built `Film` view model, never a `Project`

**Context:** Home, Work (SITE-4) and the detail pages (SITE-5) share one tile, one panel and one player. Those leaves are client components. Copy link needs an absolute URL, and the origin lives in `lib/config` beside `CONTACT_EMAIL`, a server-only variable (t3-env throws if a client bundle reads it). `Project` also carries stories, full awards, press and articles that the panel must never show (D-SITE-22).
**Options weighed:** A) Pass `Project` to the leaves and compute URLs on the client from `window.location`: the share URL would be whatever host served the page (a preview URL, localhost), not the canonical; and every story would ride in the page payload. B) Pass `Project` plus a `shareUrl` prop per tile: two sources for one film, and the story still ships. C) `components/composed/work/film.ts` (`server-only`) builds `Film` (`slug`, `title`, `genreLine`, `passion`, `client?`, `logline`, `awards`, `embed`, `roles`, `poster`, `href`, `shareUrl`) from a `ShowableProject` on the server; client leaves import the type only.
**Decision:** C. `toFilm` takes a `ShowableProject` (not `Project`, as the ticket sketched), so `embed` is the non-optional `ProjectEmbed` that SITE-2's validation guarantees, and `filmsFor(slugs)` skips held or unknown slugs. The poster comes from `posterFor` (SITE-2's only source).
**Consequences:** No server value can reach a client bundle through a film prop, and "no story in the panel" is a type fact. The RSC payload per tile is small. A new field a leaf needs (SITE-5's story, for instance) is read on the server by the page, not added to `Film`, unless two consumers need it.
**Revisit trigger:** A client-side view that needs full project data (a search over stories, say), which would need a second, explicit shape rather than widening this one.

## 2026-09-24 · SITE-4 · M-SITE-5 · Work's filter lives on `<html>`, set before first paint by the `(site)` layout's pre-paint script, and everything it changes on screen is CSS

**Context:** `/work` is one static document holding every tile (PERFORMANCE §2). A filtered URL (`/work?role=camera&passion=1`, from Home's end tiles or a pasted link) must paint filtered from the first frame, with the count, the current link and the chip already right (Vesper B2, D-SITE-4). Spec §6.2 put the attributes on the grid wrapper, set by a script before the grid.
**Options weighed:** A) Read `searchParams` on the server: the page becomes dynamic, against PERFORMANCE §2. B) `useSearchParams` in a client leaf: it bails the grid out of the static HTML to the nearest Suspense boundary. C) A `<script>` rendered by the Work page, before the grid, setting attributes on the grid wrapper: the parser hasn't reached the wrapper when it runs, and a script rendered by a page is created on the client (and never runs) when `/work` is reached by a client-side navigation. D) Attributes on `<html>`, set by the `(site)` layout's inline script (SITE-3's `PRE_PAINT_SCRIPT`, which persists across client navigations and is only ever parsed with a document), read by static unlayered CSS; the filter leaf re-reads the URL in a layout effect (before paint) for client-side arrivals and takes the attributes off on unmount.
**Decision:** D. The tiles, the count (eight server-rendered variants), the empty line, the current role link and the chip's on-look are all selected from `html[data-work-role]` / `html[data-work-passion]`; React owns the state, the URL (`history.replaceState`, written inside the transition's update so state and URL never disagree for a render), the ARIA and the status. `<html>` already carries `suppressHydrationWarning`. The script's role list and path come from `lib/routes.ts` via `lib/work-filter.ts`.
**Consequences:** A cold filtered load measured CLS 0 with no hydration warning; client-side arrivals (the bar's Work link on a filtered URL, Back into `/work?role=camera`) are corrected before paint. Two attributes live on `<html>` while Work is mounted and are removed on leave. The before-paint CSS is a fixed set of selectors in `app/globals.css`, generated from the same eight combinations as `workFilterKey`; adding a role means adding it to `WORK_ROLES` and to those selectors.
**Revisit trigger:** A second page with a before-paint filter (generalise the attributes), or a filter too large for enumerated selectors.

## 2026-09-24 · SITE-5 · M-SITE-6 · Old URLs redirect from data in `next.config.ts`, sources stored without the trailing slash, and the builder refuses bad data

**Context:** The old WordPress site served every page with a trailing slash (`/project/jack/`). Next 16 runs its own trailing-slash redirect (`/:path+/` → `/:path+`, 308, before custom redirects), so a custom source written with the slash never matches. D-SITE-25 wants at most two hops, the last a 308, built from `LEGACY_PATHS` and `SHOWABLE_PROJECTS` so a held film's old URL moves to its page when it's unheld, with no code change.
**Options weighed:** A) `trailingSlash: true` site-wide, keeping the sources as crawled: every new URL (and every canonical) would change shape, and `/about/` → `/about` would still need care. B) Middleware (`proxy.ts`) doing the lookup at request time: dynamic work on every request for a static site, and `proxy.ts` is deleted at launch. C) `redirects()` in `next.config.ts`, sources normalized to no trailing slash, identity rows (`/`, `/about/`) dropped, destinations resolved through `SHOWABLE_PROJECTS` (held → `/work`), and the whole set validated: an unknown slug, a source that is a live route pointing elsewhere, a chain, a conflicting duplicate each fail the build with a message naming `lib/routes.ts`, the row and the fix.
**Decision:** C. Next's slash hop plus one custom 308 is exactly the two-hop budget. All 105 rows verified with `curl -sIL` (maximum 2 hops, every one a 308, every row landing where its data says). A row that shadows a live page still takes part in the chain check, so a chain through it is reported too.
**Consequences:** Rows whose destination is a page not built yet (`/about`, `/contact` until SITE-6 and SITE-8) land on the site's 404 in the meantime. Host-level redirects (http → https, www → apex) stay with Vercel's domain settings (SITE-10). A re-crawl before cutover only edits `LEGACY_PATHS`.
**Revisit trigger:** A crawled path Next's matcher can't express literally (the builder escapes path-to-regexp's special characters today), or a query-string legacy URL (SITE-1 recorded none; it would need `has`).

## 2026-09-24 · SITE-6 · M-SITE-7 · About's press quotes are picks that resolve to a film's verified quote, not copies

**Context:** Spec §6.4 puts up to four press quotes on About; spec §6.3 puts each film's press on its detail page. A quote has to be verified (`verifiedOn`, §11) before it appears anywhere, and he edits these files himself after handover.
**Options weighed:** A) Copy the chosen quotes into `content/about.ts`: two homes for one quote, and a correction on one page silently misses the other. B) A flag on `PressQuote` ("show on About"): puts About's layout decision inside the film data. C) `pressPicks: { slug; source }[]` in `content/about.ts`, resolved at render to the one quote with that source on that film, and validated at build (at most four; each resolves to exactly one quote on a film that isn't NDA).
**Decision:** C. One home per quote, and verification carries over automatically; a pick that stops resolving (a quote removed, a source renamed) fails the build in words rather than vanishing. A held film's quote may still appear on About, since it is about him; an NDA'd film's never does.
**Consequences:** Picks ship empty until SITE-C verifies press. Two quotes on one film from the same source need distinct source names to be pickable.
**Revisit trigger:** A press quote that isn't about a film (a profile of him), which would need a home of its own.

## 2026-09-25 · SITE-4a · M-SITE-8 · Work's arrangement paints from CSS `order` until hydration, then becomes DOM order

**Context:** His Demo D note asked for roles to _rearrange_ the work rather than divide it. The arranged order must be right at first paint on a cold load of `/work?role=camera` (the SITE-4 no-flash bar, M-SITE-5), on a static page that never reads the query on the server. Once the page is interactive, the visual order must equal DOM order: WCAG 1.3.2 and 2.4.3 require it, and the open-film panel's line walk (M-KR-6) depends on it.
**Options weighed:**

- A) CSS `order` alone. It's right at first paint, but focus, screen readers and the panel follow a different order from the one on screen.
- B) Reorder in React only. The server HTML is in `workOrder()`, so a cold arranged load paints in the wrong order, then jumps.
- C) Server-render all four orders. That means four copies of 22 tiles, duplicate ids and heavier HTML.
- D) A hand-over: CSS `order` for the pre-hydration moment, then React renders the arranged DOM and switches CSS off.

**Decision:** D.

- The pre-paint script already sets `html[data-work-role]`. Unlayered rules give that role's tiles `order: -2` and the "The rest" divider `order: -1`. The divider is rendered in the server HTML with Tailwind's `hidden` class, which an unlayered rule outranks. It isn't the `hidden` attribute, because Tailwind's `[hidden]` rule is `!important` inside a layer and would win.
- A layout effect in `WorkGrid` sets `html[data-work-arranged]` once the rendered role equals the one `<html>` asks for. That switches the `order` rules off before the browser paints.
- **Verified:** the static HTML rendered with scripts disabled gives the same visual order as the settled DOM, for all three roles at 1440, 768 and 390.

**Consequences:**

- A third attribute lives on `<html>` while Work is mounted, removed on unmount with the others.
- After hydration, arranging is ordinary React state with the site's one view transition, so the tiles move.
- `FilmGrid` gained an optional full-width `divider` that counts as its own line for panel placement.

**Revisit trigger:** Arranging on Home too (his Q-A2), which would widen the pre-paint script and these rules to `/`. Or an arrangement that isn't a two-group split (a weighted sort), which `order` values can't express without per-tile data.
