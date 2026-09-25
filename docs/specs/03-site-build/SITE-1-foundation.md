# SITE-1 — Foundation: the production kit, the live chrome (bar, footer, skip link, 404), routes, the lint walls, and the old-URL inventory

**Epic:** SITE — Kryshan Randel's live site · **Step 1 (Demo D goes live)** · Size: M
**Slice type:** Contract and chrome plumbing. No page bodies. It risks four quiet failures:
- a lint wall that looks added but has silently dropped the existing upward-import wall
- an old-URL inventory that is incomplete or guessed, so old links die at cutover
- the dark production ground leaking into the light review kits, which must keep rendering until SITE-9
- chrome that needs client JavaScript on every page

**Vigil:** a redirect-data surface. Review the inventory, not the code:
- open three random rows of `LEGACY_PATHS` against the live old site and confirm each old page is the film or page its target names
- confirm every sitemap URL has exactly one row, or appears in the exclusion list
- state which crawl source was used: `live`, `wayback` or `known-slugs`

**Status:** Complete (2026-09-24)

> **Mason — placement review (two calls made here, routed to you).**
> 1. **The chrome is rendered per page through a server `SiteShell`, not by `app/(site)/layout.tsx`.**
>    - A layout can't know which page it wraps, so it can't set `aria-current` or the per-page skip-link text without a client component on every page.
>    - Spec §10 allows no such JavaScript.
>    - The recommended design is below. It is logged as **M-SITE-1**; counter-propose there.
> 2. **Nested kit scopes win over the root's ground.**
>    - `kitClassName()` emits `light` for a light kit.
>    - The `dark` custom variant excludes `.light` subtrees.
>    - Without this, setting a dark `PRODUCTION_KIT` turns on every `dark:` variant inside kits B and C.
>
> Both are `[PROVISIONAL — Mason]`, reversible within this ticket.

---

## Outcome

After this slice, the site wears Kryshan's kit. Every public page has the real chrome:
- the solid sticky bar from Demo D: his name once; Work · About · Teaching · Contact; on phones, name and Contact stay while the other three scroll away
- a footer with his email, "Vancouver, works anywhere." and his socials
- a skip link that comes first on every page
- a 404 that sends a lost visitor to the work

Every path the site will have is built in `lib/routes.ts`. That includes `LEGACY_PATHS`: every URL the old WordPress site has, crawled from `kryshanrandel.com` and recorded as data, with where each one should land.

Lint makes it impossible for public code to import the review layer. The review layer (Demos A–D) still renders as it did.

The nav links to pages that don't exist yet; they return the site's 404 until their tickets land. No page body is built here (SITE-3 to SITE-8), no redirect is wired (SITE-5), and no content model changes (SITE-2).

## Why / intent

**Rulings this ticket builds:**
- **D-SITE-2:** the production kit is Kit D, copied into `brand/kits/kryshan.ts`, so nothing in `review/` survives the deletion in SITE-9. BRANDING §4 steps 1–2 (step 3 is SITE-9).
- **Spec §4.2, D-KRD-3, D-KRD-4:** the bar, footer, skip link and 404, as Demo D built them (handoff §6.2), with live links. `--review-bar-h` and `--demo-bar-h` are gone; `--bar-h` replaces them.
- **D-SITE-19:** the lint walls.
  - They must exist before anything is copied out of `review/` (SITE-3).
  - Otherwise a public import from `review/` slips in unnoticed (build order, "SITE-1 precedes SITE-2").
- **D-SITE-24:** `NEXT_PUBLIC_SITE_URL` falls back to `https://kryshanrandel.com`, so a missing variable never points canonicals at localhost.
- **D-SITE-25 and O-SITE-9:** redirects are explicit, one per crawled URL, built from data. This slice produces the data; SITE-5 wires it.
  - The crawl is in the build order's **launch-blocking set**.
  - It must happen while the old site is still up, before DNS cutover.
- **D-SITE-28:** socials move from `lib/config.ts` to `content/site.ts` (CONVENTIONS §10a: he edits `content/`).
- **Spec §9:** `lang="en-CA"`; `scroll-padding-top` from `--bar-h` (WCAG 2.4.11); targets ≥44 px.
- **Spec §10:** PERFORMANCE §4 says `preload`, not `priority`. In Next 16, `priority` is deprecated (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`).

**What this slice is NOT (binding):**
- No page body.
- No redirect in `next.config.ts`.
- No `content/projects.ts` change.
- No new client component.
- No edit to `STRANDS` (SITE-3 amends the captions).
- It does not delete anything from the review layer.

**Ground truth, consumed and never rebuilt:**
- `brand/kit-vars.ts` and `components/composed/brand/kit-scope.tsx`
- `lib/metadata.ts` (`absoluteUrl`, `createPageMetadata`)
- Kit A's values in `review/kits/kryshan-a.ts` (read, never imported)
- Demo D's bar and footer in `review/mocks/home-d.tsx`: `Bar`, `Footer`, `PAGE_CSS`. Read them and rewrite them; never import them.

### Rulings this slice makes (labelled, logged)

1. **Chrome through a per-page `SiteShell`** `[PROVISIONAL — Mason]`. Logged as **M-SITE-1** in TECHNICAL-DECISIONS, and as a CONVENTIONS §2 line correction (below).
   - `components/composed/site/site-shell.tsx` (server) renders the skip link, the bar, `<main id="main">` and the footer.
   - Every public page, and `app/not-found.tsx`, wraps its content in it.
   - `app/(site)/layout.tsx` stops rendering chrome and returns `children` (SITE-2 adds its validation import there).
   - Why: `aria-current` and the skip-link text vary by page. A layout can't see the page, and `usePathname()` would put a client component on every page, against spec §10.
   - Cost of being wrong: each page ticket adds one wrapper line. Reverting is mechanical.
2. **The skip link has two forms.**
   - `skipTo="content"` (default): "Skip to content" → `#main`.
   - `skipTo="work"`: "Skip to the work" → `#work`. A page that passes it **must** render `id="work"` on the element that holds its first tile (SITE-3 Home, SITE-4 Work).
3. **Phone nav row label.** Below 768 there are two nav landmarks:
   - the sticky line, "Primary"
   - the row that scrolls away, **"More pages"**
   - "More pages" is Demo D's built label (KR-8). It is not in spec §7.6's table; it's added to `content/site.ts` and logged as an addition to §7.6.
4. **Nested kit scopes win** `[PROVISIONAL — Mason]`. Logged.
   - `kitClassName()` in `brand/kit-vars.ts` returns `"light"` for `ground: "light"` (as it returns `"dark"` for dark).
   - `app/globals.css` changes `@custom-variant dark (&:is(.dark *));` to `@custom-variant dark (&:is(.dark *):not(.light, .light *));`
   - Without this, `<html class="dark">` switches on every `dark:` variant inside kit B's and kit C's `KitScope`. `FrameRibbon`'s amber 300 on cream is the known case (DEVIATIONS, KR-5).
5. **The production kit's `extraVars` are exactly `--link` (red 300) and `--font-quote`.**
   - `--font-quote` is a second, italic Archivo loader (`style: "italic"`, `axes: ["wdth"]`, `preload: false`), used as `font-(family-name:--font-quote) italic`.
   - Spec §4.1: italic is for press quotes only (SITE-5, SITE-6), so no page's first screen should pay for it.
   - Dropped: `--surface-dark`, `--surface-dark-foreground` and the three `--tag-*`. They are the review mocks' contract (M-KR-3), and D-KRD-19 forbids role colours.
   - Also dropped: `tagline`, which is review-only like `letter`. The scope sheet's drop list omits it, but it isn't a `BrandKit` field, so keeping it fails type-checking. Logged.
6. **Nav lives in `content/site.ts` as `NAV`** (label, href from `siteRoutes`, id). `SITE.nav` is removed from `lib/config.ts`.
   - Spec §5 puts nav labels in `content/site.ts`, and a label with no path is half a fact.
   - `NAV_LABELS` stays until SITE-9, because Demos A, B and D read it.
7. **`WORK_ROLES` in `lib/routes.ts` is the one home of the role vocabulary** (`"directing" | "camera" | "editing"`).
   - `siteRoutes.work({ role })` needs it, and `lib/` may not import `content/`.
   - SITE-2 aliases `ProjectRole` to it.
8. **`lib/routes.ts` stays importable from `next.config.ts` by relative path.** No `@/` specifier, and no import other than `import type { Route } from "next"`. SITE-5 builds redirects from it.
9. **The old-URL crawl's method, fallbacks and mapping rules** are fixed in "The old-URL inventory" below.
   - A category URL lands on the matching role filter.
   - An attachment page inherits its parent's target.
   - Anything unmatched lands on `/work`, mirroring the 404's one job (spec §3).
   - `[PROVISIONAL — Taylor]`, logged. The cost of a wrong mapping is one data row.
10. **`docs/specs/README.md`'s non-negotiable** "the first poster `priority`" is corrected to `preload` along with PERFORMANCE §4. It's the same stale fact in a second place. Logged.
11. **The walls also block the relative form** (`**/review/*`), not only D-SITE-19's three aliases. A relative import is exactly how a review file slips into public code unnoticed. It's the same wall, closing the obvious gap. Logged.

## Behaviour & states

### Production kit (`brand/kits/kryshan.ts`, `brand/production.ts`)

- `export const KRYSHAN_KIT: BrandKit` is Kit D as a plain `BrandKit`:
  - `id: "kryshan"`, `name: "Kryshan Randel (Kit D)"`, `ground: "dark"`, `radius: "2px"`
  - `colors`, `ramps`, `typeScale` and `fonts` equal to Kit A's values (Kit D spreads them), **written as literals in this file**. The `INK`, `BONE`, `RED` and `NEUTRAL` constants are copied, not imported.
  - `roles`: Kit A's seven plus Kit D's "Passion label"
  - `extraVars` per ruling 5
  - `fontClassName`: both loaders' `variable`s, joined
- The roman loader matches Kit A's: `Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" })`, declared at module scope in this file.
- The font slot `note`s say where italic comes from. The body note stops saying "not loaded".
- `brand/production.ts`: `PRODUCTION_KIT = KRYSHAN_KIT` (imported from `@/brand/kits/kryshan`). Never from `review/`.
- `app/layout.tsx`: `<html lang="en-CA">`. Nothing else changes; the kit already flows through `activeKit()`.

### Environment

- `lib/env.ts`: `NEXT_PUBLIC_SITE_URL` default → `"https://kryshanrandel.com"`. The trailing-slash transform stays.
- `.env.example`: the comment above `NEXT_PUBLIC_SITE_URL` says it's optional and names the fallback (D-SITE-24).

### Routes (`lib/routes.ts`)

```ts
export const WORK_ROLES = ["directing", "camera", "editing"] as const;
export type WorkRole = (typeof WORK_ROLES)[number];

export const siteRoutes = {
  home: "/" as Route,
  work: (filter?: { role?: WorkRole; passion?: boolean }): Route => …, // query order: role, then passion=1
  project: (slug: string): Route => `/work/${slug}` as Route,
  about: "/about" as Route,
  teaching: "/teaching" as Route,
  contact: "/contact" as Route,
} as const;
```

| Call | Returns |
|---|---|
| `siteRoutes.work()` | `/work` |
| `siteRoutes.work({ role: "camera" })` | `/work?role=camera` |
| `siteRoutes.work({ passion: true })` | `/work?passion=1` |
| `siteRoutes.work({ role: "directing", passion: true })` | `/work?role=directing&passion=1` |
| `siteRoutes.work({ passion: false })` | `/work` |
| `siteRoutes.project("jack")` | `/work/jack` |

`reviewRoutes`, `isGatedReviewPath` and `isReviewPath` are untouched (SITE-9 deletes them).

### The old-URL inventory (`LEGACY_PATHS`, O-SITE-9)

**The data shape (in `lib/routes.ts`):**

```ts
/** Where an old WordPress URL lands. `next.config.ts` resolves it (SITE-5). */
export type LegacyTarget =
  | { page: "home" | "work" | "about" | "teaching" | "contact"; role?: WorkRole }
  /** The NEW slug. SITE-5 sends it to /work/<slug> if showable, else /work. */
  | { project: string };

export type LegacyPath = Readonly<{
  /** Path only, lowercase, exactly as the old site served it (trailing slash kept). */
  from: `/${string}`;
  to: LegacyTarget;
  /** Why it maps where it does; for audit, never rendered. */
  kind: "page" | "project" | "project-not-kept" | "category" | "attachment" | "other";
}>;

export const LEGACY_CRAWL: Readonly<{
  origin: "https://kryshanrandel.com";
  crawledOn: string;                 // YYYY-MM-DD
  source: "live" | "wayback" | "known-slugs";
  counts: { sitemap: number; links: number; entries: number };
  excluded: ReadonlyArray<string>;   // the exclusion patterns actually applied
}>;

export const LEGACY_PATHS: ReadonlyArray<LegacyPath>;
```

- Sort `LEGACY_PATHS` by `from`, so a re-crawl diffs cleanly.
- A comment above it says the data came from a crawl and gives the date. It names the rules (link to this ticket) and says "one row per old URL; SITE-5 turns rows into redirects".

**The crawl (the builder runs it with `curl` from the session, while the old site is still up):**

1. `curl -sSL https://kryshanrandel.com/robots.txt` and read every `Sitemap:` line.
2. Fetch each sitemap. Where it is an index, fetch every child sitemap. Collect every `<loc>`.
3. Fetch the HTML of `/` and of every page and project URL from step 2. Collect every `<a href>` that is:
   - root-relative, or
   - on `kryshanrandel.com` or `www.kryshanrandel.com`, over http or https.

   Fetch any new HTML page found this way too. Repeat until nothing new appears. Stop at 500 fetches; if you hit the cap, say so.
4. **Normalize:**
   - keep the path only, lowercased, with the trailing slash as served
   - drop fragments
   - drop query strings
   - a URL whose path is `/` with only a query (`/?attachment_id=…`, `/?p=…`) gets **no row**, because it already lands on Home; count these in the closing note
5. **Exclude**, and list the patterns in `LEGACY_CRAWL.excluded`:
   - `/wp-admin/`, `/wp-login.php`, `/wp-json/`, `/wp-includes/`, `/wp-content/` (media files), `/xmlrpc.php`
   - `/feed/` and `*/feed/`
   - any path ending in a file extension (`.jpg`, `.png`, `.pdf`, …)
   - `mailto:` and `tel:`
6. Map each remaining path by the table below, **one row per path**.

**Mapping rules** (ruling 9):

| Old path | `to` | `kind` |
|---|---|---|
| `/` | `{ page: "home" }` | page |
| `/reel/`, `/project/` | `{ page: "work" }` | page |
| `/about/` | `{ page: "about" }` | page |
| `/contact-me/` | `{ page: "contact" }` | page |
| `/project/<old>/`, where the old page is one of the 27 films (match by the page's **title** against 02 §3.5, not by slug alone) | `{ project: "<new slug>" }` | project |
| A standalone page for one of the 27 (at authoring: `/averybcproduction/`, `/contactclub/`) | `{ project: "<new slug>" }` | project |
| `/project/<old>/` for a film **not** among the 27 | `{ page: "work" }` | project-not-kept |
| `/project_category/directing/` · `/camera/` · `/editing/` | `{ page: "work", role: "directing" \| "camera" \| "editing" }` | category |
| Any other `/project_category/<x>/` | `{ page: "work" }` | category |
| An attachment page `<parent path>/<name>/` | The parent's `to` | attachment |
| Anything else | `{ page: "work" }` | other |

- **Held films are mapped to their project.** SITE-5 resolves a held slug to `/work` today, and to its detail page once it's unheld, with no data change. Held today: `directors-reel`, `glimpse`, `the-bully-solution`, `shotlister`, `vandu` (see SITE-2).
- Rows whose normalized path equals the new path (`/` and `/about/`) are **recorded anyway**, per D-SITE-25's "one per crawled URL". SITE-5 must not emit a redirect whose source and destination are the same path, or it loops. Say so in the data's comment.

**Failure states (named):**

- **The live site doesn't answer** (DNS failure, timeout after two retries 60 s apart, or 5xx on robots and on every sitemap):
  1. Try the Wayback Machine's CDX index:

     ```
     curl -sS "https://web.archive.org/cdx/search/cdx?url=kryshanrandel.com/*&output=txt&fl=original&collapse=urlkey&filter=statuscode:200"
     ```

     Apply the same normalization, exclusions and mapping, with `source: "wayback"`. A path that can't be matched to a title because the page is gone gets the rule by URL alone (`kind` as the table says). List those in the closing note.
  2. If Wayback also fails, fall back to the **known slugs** from `docs/client/kryshan-02-success-criteria.md` §1.4, with `source: "known-slugs"`:
     - `/reel/`, `/about/`, `/contact-me/`
     - `/project/just-watch-us/`, `/project/directors-reel/`, `/project/jack/`, `/project/united-8s/` (→ `united8s`), `/project/the-bully-solution/`, `/project/shotlister/`
  3. `crawledOn` still records the date of the attempt.
- **On any source other than `live`:**
  - the closing note says **`[NEEDS VALUE AT BUILD]` — the old-URL crawl is incomplete**
  - a DEVIATIONS line is written
  - the launch gate stays open. SITE-10 must crawl live before cutover, and the build order's launch-blocking item isn't closed by this ticket.
  - Never invent a path that no source returned.
- **A page title doesn't match any of the 27 films, but the slug looks close:** map it by title only. If the title is ambiguous, use `{ page: "work" }` with `kind: "other"` and list it in the closing note for Taylor. Never guess a film.
- **A redirect chain on the old site** (WordPress 301s one old path to another): record both paths. Each gets its own row.

### Chrome (spec §4.2)

**`SiteShell`** (`components/composed/site/site-shell.tsx`, server). It renders `SkipLink` → `SiteHeader` → `<main id="main" className="flex-1">` → `SiteFooter`.

```ts
type SiteShellProps = Readonly<{
  /** The nav item for this page. Omit on Home and the 404. */
  current?: "work" | "about" | "teaching" | "contact";
  /** "page" on that page itself; "true" on a page inside its section (detail pages → Work). */
  currentKind?: "page" | "true";
  /** "work" on Home and Work (the page must render id="work"); default "content". */
  skipTo?: "work" | "content";
  children: ReactNode;
}>;
```

**Bar** (`site-header.tsx`, server). Ported from Demo D's `Bar`:
- **Position:**
  - `position: sticky; top: 0`, height `var(--bar-h)`, solid `bg-background`, `z-30`
  - `style={{ viewTransitionName: "site-bar" }}`, so a tile animating in SITE-3's transition never paints over it (handoff §6.2)
- **Hairline:**
  - A 1 px bottom border, transparent at rest.
  - It becomes `color-mix(in oklab, var(--border) 40%, transparent)` once the page has scrolled 8 px (`animation-timeline: scroll(root)`, range 0–8 px).
  - Where `animation-timeline` isn't supported, it shows all the time. No JS.
- **Wordmark:**
  - `SITE.name`, `next/link` to `siteRoutes.home`, accessible name "Kryshan Randel, home" (§7.6)
  - Archivo 800, width 72, uppercase, 20 px, tracking +1%, `text-primary`. Never a heading.
- **Nav items** (from `NAV`):
  - Label style (11 px, 600, width 88, tracking 18%, uppercase), `foreground`; hover `text-(--link)`
  - focus-visible ring
  - at least 44 px tall
- **Current item:**
  - `aria-current="page"`, or `"true"` when `currentKind="true"`
  - a 2 px `--link` underline, with its colour unchanged
- **≥768:** one 56 px line. Wordmark left; Work · About · Teaching · Contact right, in `<nav aria-label="Primary">`. Gutter 24 px.
- **<768:**
  - A 44 px sticky line: the wordmark, then **Contact only**. Work, About and Teaching carry `max-md:hidden` inside the same Primary nav.
  - Then a **non-sticky** `<nav aria-label="More pages">` row beneath it: Work · About · Teaching, `md:hidden`, `border-b border-border/40`, gutter 12 px. It scrolls away.
  - Each link exists once in the accessibility tree at any width.

**Page CSS** (in `app/globals.css`, one commented "Site chrome" block, no hex):
- `:root { --bar-h: 44px }`, and `56px` at `min-width: 768px`
- `html { scroll-padding-top: calc(var(--bar-h) + 1rem) }` (§9)
- the bar's hairline keyframes and `@supports` pair
- the `dark` variant change (ruling 4)

**Footer** (`site-footer.tsx`, server). Ported from Demo D's `Footer`:
- `SITE.email` as a `mailto:`, alone, `foreground`, body size, hover `--link`
- `SITE.place` ("Vancouver, works anywhere."), `muted-foreground`
- `<nav aria-label="Social">`:
  - first line: IMDb · Vimeo · YouTube · LinkedIn
  - second, quieter line (`text-xs`): Instagram · Facebook
- Each social link has `target="_blank"`, `rel="me noopener"`, `muted-foreground`, hover `--link`, and a visually hidden ", opens in a new tab" (§7.6)
- `border-t border-border/40`
- No copyright line. No X/Twitter.

**Skip link** (`skip-link.tsx`, server):
- first focusable element
- visually hidden until focused, then `bg-background text-foreground`, ring, fixed top-left, above the bar
- text and target per ruling 2, strings from `content/site.ts`

**404** (`app/not-found.tsx`):
- `<SiteShell>` with no `current`
- H1 "That page doesn't exist. The work does." (Locked, §6.7). H1 step per §4.1: 32 px below 768, `clamp(2rem,2.6vw,2.5rem)` to 1279, 40 px at ≥1280. No red phrase.
- Then "Go to the work →" → `siteRoutes.work()`.
- The page's only h1. The HTTP status is 404.

**Placeholder Home** (`app/(site)/page.tsx`): wrap the existing placeholder in `<SiteShell>`. Nothing else changes (SITE-3 replaces it).

**States (exhaustive):**
- **Bar:** at rest (no hairline) · scrolled ≥8 px (hairline) · no scroll-timeline support (hairline always) · below 768 (split: sticky line plus row) · ≥768 (one line)
- **Nav item:** default · hover · focus-visible · current (`page` or `true`)
- **Skip link:** hidden · focused (visible)
- **Footer:** one state
- **404:** one state
- **No JS:** everything above works. Nothing in this slice needs JS.

**Failure / edge states:**
- **Archivo fails to load:** the kit's stack falls back to `ui-sans-serif, system-ui, sans-serif`. The layout doesn't depend on the face's metrics beyond the fixed bar height.
- **A page passes `skipTo="work"` without rendering `id="work"`:** the skip link is dead. SITE-3 and SITE-4 each carry the criterion. Here, only the prop contract exists.
- **A nav link to a page that doesn't exist yet:** Next's 404 with the chrome. This is expected until SITE-4, SITE-6, SITE-7 and SITE-8.

## Non-negotiables (this slice)

- **Nothing public imports the review layer**, by alias or by relative path, and lint proves it.
- **The existing upward-import walls still fire** after the new walls are added.
- **No client component is added.** The chrome, shell, skip link and 404 are server components.
- **No hex outside `brand/`.** Kit values are literals in `brand/kits/kryshan.ts` only. `globals.css` gains no colour.
- **Every path comes from `lib/routes.ts`**, and `lib/routes.ts` has no `@/` import.
- **No old URL is invented.** Every `LEGACY_PATHS` row traces to a crawl source named in `LEGACY_CRAWL.source`.
- **Demos A–D render as they did.** The only allowed differences are the `/review` chrome taking the production kit's colours, and nothing else inside a mock.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/site.ts` gains:
  - `NAV: ReadonlyArray<{ id: "work" | "about" | "teaching" | "contact"; label: string; href: Route }>`. Labels come from `NAV_LABELS`; hrefs from `siteRoutes`.
  - `SOCIALS: ReadonlyArray<{ label: string; href: string; secondary?: boolean }>`, moved verbatim from `SITE.social`, in the same order.
  - `CHROME`: the §7.6 strings this slice renders:
    - skip "Skip to the work" / "Skip to content"
    - wordmark name (`${SITE.name}, home`)
    - landmarks "Primary" · "More pages" · "Social"
    - new-tab hint ", opens in a new tab"
  - `NOT_FOUND`: `{ h1: "That page doesn't exist. The work does.", link: "Go to the work →" }`
- `NAV_LABELS` and `STRANDS` are unchanged.
- `lib/config.ts`: `SITE.nav` and `SITE.social` are removed; nothing else changes.

**Placement** (Mason's call, build order scope sheet; the shell and the dark variant are routed to Mason above):
- **Brand:**
  - `brand/kits/kryshan.ts` (new)
  - `brand/production.ts`
  - `brand/kit-vars.ts` (`kitClassName`)
- **Lib:** `lib/env.ts`, `lib/routes.ts`, `lib/config.ts`
- **Content:** `content/site.ts`
- **Components:**
  - `components/composed/site/site-shell.tsx` (new)
  - `site-header.tsx`, `site-footer.tsx`, `skip-link.tsx`
- **App:**
  - `app/layout.tsx` (`lang`)
  - `app/(site)/layout.tsx` (children only)
  - `app/(site)/page.tsx` (wrapped)
  - `app/not-found.tsx`
  - `app/globals.css`
- **Config:** `eslint.config.mjs`, `.env.example`
- **Review** (`SITE.social` → `SOCIALS`, the smallest change, each logged): `review/mocks/home-a.tsx`, `home-b.tsx`, `home-c.tsx`, `home-d.tsx`
- **Docs:**
  - `docs/PERFORMANCE.md` §4
  - `docs/specs/README.md` (non-negotiables line)
  - `docs/CONVENTIONS.md` §2: the `(site)/` line becomes "The public site. Each page renders its chrome through `SiteShell`." Logged per CONVENTIONS' own "fix one of them the same day".
  - `docs/specs/TECHNICAL-DECISIONS.md` (M-SITE-1)

**Lint walls** (`eslint.config.mjs`, D-SITE-19):
- **New blocks:**
  - `app/(site)/**` and `app/*.{ts,tsx}` may not import `@/review/*`, `@/lib/review/*`, `@/app/review/*`, or `**/review/*` (the relative form, ruling 11).
  - The message: "The public site never imports the review layer (D-SITE-19). Copy what you need into components/composed/."
- **The trap:**
  - In flat config, a second `no-restricted-imports` block for the same files **replaces** the first block's options; it doesn't add to them.
  - For `components/**`, `content/**` and `brand/**`, **merge** the new patterns into the existing `forbid(...)` call for that glob. Keep each pattern's own message: "Upward import" for layers, D-SITE-19's for review.
  - Never append a second block for those globs.
- `review/**` and `lib/**` are unchanged.

**Validators:** none (SITE-2 creates `content/validate.ts`).

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

- **Skip link:** first in tab order on every page, visible on focus, with the text from ruling 2. Activating it moves focus into `main` (or `#work`).
- **Wordmark:** a link named "Kryshan Randel, home". Never a heading. Red 500 at 20 px weight 800 counts as large text (3.4:1 passes AA large, spec §4.1).
- **Current page:** conveyed by `aria-current`, not only the underline. The underline is `--link` (6.9:1 on ink).
- **Focus not obscured (2.4.11):** `scroll-padding-top: calc(var(--bar-h) + 1rem)` on `html`. A tabbed-to link in the footer or 404 is never under the bar.
- **Targets:** nav items and the wordmark are ≥44 px tall. Social links sit in a text list; the ≥24 px spacing rule (2.5.8) is met by line height and gap.
- **Landmarks:** one `header`, `nav`s labelled Primary / More pages / Social, one `main`, one `footer`. The 404 has one h1.
- **New tabs:** every social link announces ", opens in a new tab".
- **Language:** `lang="en-CA"`.
- **Reduced motion:** nothing in the chrome moves. The hairline isn't motion (it's scroll-linked colour, not animation over time).

## Acceptance criteria (observable; `yarn dev:agent` on :4500 unless stated; induced violations reverted before closing)

1. **Kit applied.**
   - `/` (the placeholder) renders on ink with bone text in Archivo.
   - `<html>` carries `lang="en-CA"`, `data-kit="kryshan"` and the `dark` class.
   - `getComputedStyle(document.documentElement).getPropertyValue("--link")` is `#f2716b`.
   - `brand/kits/kryshan.ts` imports nothing from `review/`. Its `colors`, `ramps`, `roles` (plus "Passion label") and `typeScale` match Kit D's rendered kit page values (`/review/kits/kryshan-d`).
2. **No italic on first paint.**
   - A cold load of `/` requests the roman Archivo file(s) only.
   - `--font-quote` is defined on `<html>`.
   - No italic font file is requested.
3. **Env fallback.**
   - With `NEXT_PUBLIC_SITE_URL` unset, `yarn build:agent && yarn start:agent` serves `/` with `<link rel="canonical" href="https://kryshanrandel.com…">`.
   - `curl -s localhost:4510/robots.txt` names `https://kryshanrandel.com/sitemap.xml`.
4. **Lint walls fire** *(Vigil)*. Each of these makes `yarn lint` fail:
   - (a) `import "@/review/kits/types"` in `app/(site)/page.tsx`
   - (b) `import "@/lib/review/anchor"` in `components/composed/site/site-footer.tsx`
   - (c) `import "@/app/review/_components/placeholder-ribbon"` in `content/site.ts`
   - (d) a relative `import "../review/kits/types"` in `brand/production.ts`
   - (e) `import "@/review/brand"` in `app/robots.ts`

   (a), (b), (d) and (e) carry the D-SITE-19 message. (c) may instead carry "Upward import", because `@/app/*` already covers it.
5. **Old walls still fire.**
   - An `import "@/app/layout"` in `components/composed/site/skip-link.tsx` fails with "Upward import".
   - An `import "@/components/composed/site/site-shell"` in `content/site.ts` fails with "Upward import".
6. **Routes.**
   - `siteRoutes` returns exactly the table in "Routes".
   - `grep -rnE "[\"'\`]/(work|about|teaching|contact)" app components content` finds no route string outside `lib/routes.ts`.
   - `lib/routes.ts` contains no `@/`.
7. **Inventory complete** *(Vigil)*.
   - `LEGACY_CRAWL.source` is `live`, or the closing note carries `[NEEDS VALUE AT BUILD]` with the reason.
   - Every non-excluded `<loc>` from every sitemap has exactly one `LEGACY_PATHS` row.
   - No two rows share a `from`.
   - Every `{ project }` target is one of the 27 slugs in `content/projects.ts`.
   - Every category, attachment and not-kept film follows the mapping table.
   - The closing note gives counts by `kind`, the number of query-only URLs skipped, and any row listed for Taylor.
8. **No invented rows.** Every `from` appears in the crawl's raw output: the sitemaps, the harvested links, or, on fallback, Wayback or 02 §1.4. The closing note says where the raw list was saved in the scratchpad (not committed).
9. **Bar at 1440 and 768:**
   - one 56 px sticky line
   - wordmark left; Work · About · Teaching · Contact right
   - no hairline at `scrollY` 0; a hairline after scrolling 8 px
   - the bar stays solid over any content
10. **Bar at 390:**
    - a 44 px sticky line with the wordmark and Contact
    - the Work · About · Teaching row beneath, which scrolls out of view while Contact stays
    - no horizontal scroll at 320 px
11. **Nav targets.**
    - Each nav link's `href` equals its `siteRoutes` value.
    - Clicking Work on `/` shows the site's 404 with the chrome (the page doesn't exist yet).
12. **`aria-current`.**
    - Temporarily passing `current="about"` on the placeholder Home gives `aria-current="page"` on About only, with the underline.
    - `current="work" currentKind="true"` gives `aria-current="true"` on Work.
    - Reverted; the closing note says so.
13. **Skip link.**
    - The first Tab on `/` and on `/nope` focuses a visible "Skip to content", and Enter moves focus to `main`.
    - Temporarily passing `skipTo="work"` renders "Skip to the work" with `href="#work"`. Reverted.
14. **Footer on `/` and `/nope`:**
    - the `mailto:` email in `foreground`
    - "Vancouver, works anywhere."
    - a `nav` named "Social" with IMDb · Vimeo · YouTube · LinkedIn, then Instagram · Facebook on a quieter line
    - each social link's accessible name ends ", opens in a new tab"
    - no "©", no X/Twitter
15. **404.**
    - `curl -sI localhost:4510/nope` returns `404`.
    - The page shows the chrome, one h1 "That page doesn't exist. The work does.", and "Go to the work →" linking to `/work`.
16. **Focus offset.** `getComputedStyle(document.documentElement).scrollPaddingTop` is `60px` at 390 and `72px` at 1440.
17. **Data moved.**
    - `grep -rn "SITE.social\|SITE.nav" app components content lib review` finds nothing.
    - Demos A–D's footers list the same links in the same order as before.
18. **Review layer intact.**
    - `/review/mocks/home-a/kryshan-a` and `/review/mocks/home-d/kryshan-d` look identical inside the mock area to a screenshot taken before this ticket (1440 and 390).
    - On `/review/mocks/home-b/kryshan-b` and `/review/mocks/home-c/kryshan-c`, the "Frame to be replaced" ribbon text is amber 800 (the light-kit colour), not amber 300. No `dark:` style applies inside a light `KitScope`.
    - `/review`, `/review/brand` and `/review/feedback` return 200.
19. **Docs.**
    - PERFORMANCE §4 and `docs/specs/README.md` say `preload`.
    - The CONVENTIONS §2 line is updated.
    - M-SITE-1 is in TECHNICAL-DECISIONS.
20. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/`, `/nope`, `/review/mocks/home-d/kryshan-d` and `/review/mocks/home-b/kryshan-b`, via `yarn dev:agent` (never `yarn dev` or `yarn build`). Closing note in this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Authoring snapshot (2026-09-24; re-crawl, don't copy).**
  - `robots.txt` names `/sitemap.xml`, which redirects to a Yoast `/sitemap_index.xml` with four children: `page-`, `project-`, `project_category-` and `attachment-sitemap.xml`.
  - It listed about 6 pages, 30 project URLs (including `/project/`), 13 categories and about 35 attachment pages.
  - Two attachment URLs are query-only (`/?attachment_id=…`).
  - Slugs that differ from ours: `united-8s` → `united8s`, `riverdale-epk` → `riverdale-ew-bts`, `rcfc-were-in-this-together` → `rffc-were-in-this-together`.
  - Films not among the 27: `dead-rising-watchtower`, `where-the-canoe-takes-us-the-story-of-pulling-together`, `simon-fraser-university-short-documentaries`, `rain-hair-salon-the-chelsea`, `human-resources`, `home-is-where-the-art-is`.
  - Attachment parents include `/test/`, which isn't in the page sitemap; its attachments fall to "Anything else".
  - 5Rhythms, Tradeswoman Exhibit and both TUTS films have no old page.
- **`forbid()`**'s helper can take `{ group, message }` pairs so one call per glob carries both kinds of message. `no-restricted-imports` patterns use gitignore semantics: `@/review/*` also matches deeper paths because the parent matches.
- **Globs with parentheses:** confirm `app/(site)/**` actually matches with the induced violation (criterion 4a). If minimatch misreads the parentheses, escape them.
- **Porting from Demo D:** Demo D's `PAGE_CSS` already holds the hairline keyframes. Drop `--review-bar-h` and `--demo-bar-h` from every expression.
- **`next/link` or `<a>` in the nav:** either is static. `next/link` prefetches the four pages' payloads in production once they exist; that's harmless, since it's after load.
- **`VideoEmbed`'s own `priority` prop** is SITE-3's port to rename, not this ticket's. This ticket fixes the docs only.

## Dev's call

- `forbid()`'s helper shape.
- `next/link` versus `<a>` in the bar and footer.
- Whether to commit a crawl script (`scripts/crawl-legacy-urls.mjs`, Node, no dependencies, never run by the build) or run `curl` by hand. If committed, it goes in `scripts/` with a doc comment.
- The 404 link's type step: Lead or Label, `--link`, a ≥44 px target.
- Class ordering and `cn()` use per CONVENTIONS §7.

Anything with real alternatives beyond M-SITE-1 goes to TECHNICAL-DECISIONS.

## Out of scope

- **Page bodies:** Home (SITE-3), Work (SITE-4), detail pages (SITE-5), About (SITE-6), Teaching (SITE-7), Contact (SITE-8).
- **Redirects in `next.config.ts`, the sitemap, robots changes:** SITE-5, from this slice's `LEGACY_PATHS`.
- **Host redirects (www → apex, http → https) and DNS:** Vercel domain settings at SITE-10's cutover.
- **A re-crawl just before cutover, for pages added to the old site after today:** SITE-10's cutover checklist. On a non-`live` source here, it's SITE-10's gate.
- **The content model** (`rights`, `POSTERS`, `FEATURED`, validation): SITE-2.
- **`STRANDS` caption amendments, the Teaching fallback, the Person JSON-LD, the copy button and the email hand-off:** SITE-3.
- **Shared microcopy beyond the chrome** (Copy link, Work status, Previous/Next): the ticket that renders each string adds it to `content/site.ts`.
- **Deleting `reviewRoutes`, the review lint block, `proxy.ts` and the like:** SITE-9.

## Depends on

**No slice dependencies.** Gate: Demo D approved by Kryshan (spec header `[ASSUMPTION]`, handoff O-7). Taylor confirms before kickoff.

Also sent before SITE-1: the one message (build order, "Before SITE-1"). This ticket is written against its defaults and waits on none of the answers.

## Recommended Claude Code execution

**Opus 5.5.** The code is small; the traps aren't:
- the flat-config override that silently drops a wall
- the root `dark` class leaking into light kit scopes
- a crawl whose mapping needs judgement by title, not slug

A cheaper model tends to append a second lint block, see `yarn lint` pass, and ship a repo that no longer forbids upward imports. It also tends to map `/project/rcfc-…` to `/work` because the slug didn't match.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-1 — Foundation** (`docs/specs/03-site-build/SITE-1-foundation.md`). Model: **Opus 5.5**. **The site wears his kit and his chrome. Nothing public can import the review layer, and every old URL is recorded from a real crawl.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §3, §4.1, §4.2, §7.6, §8, §9, §10, §12 (D-SITE-2, 19, 24, 25, 28)
> 3. `docs/specs/03-site-build/00-build-order.md` (SITE-1 scope sheet)
> 4. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` §6.2 and §10
> 5. `review/mocks/home-d.tsx` (`Bar`, `Footer`, `PAGE_CSS`: port, don't import) and `review/kits/kryshan-a.ts` / `kryshan-d.ts` (copy the values)
> 6. `docs/client/kryshan-02-success-criteria.md` §1.4
> 7. `AGENTS.md`
> 8. `docs/CONVENTIONS.md`
> 9. `docs/PERFORMANCE.md`
> 10. `docs/BRANDING.md` §3–§4
> 11. `docs/specs/README.md` (kickoff contract)
> 12. `docs/specs/DEVIATIONS.md`
> 13. `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Routes come from `lib/routes.ts`, and that file keeps no `@/` import. Env comes only through `lib/env.ts`. No hex outside `brand/`.
> - Client leaves never import `@/lib/config`; values arrive as props. This slice adds no client component at all.
> - No upward imports. Nothing public imports `review/`, `lib/review/` or `app/review/`.
> - Merge lint patterns into the existing `forbid()` call per glob; never add a second block for the same files.
> - Never invent an old URL. On a failed live crawl, follow the fallback chain and mark `[NEEDS VALUE AT BUILD]`.
> - Never run `yarn dev` or `yarn build`; use `yarn dev:agent` and `yarn build:agent`.
> - If this ticket would force you to break a non-negotiable, stop and ask.
>
> Close in three places:
> 1. this ticket's Status
> 2. `docs/specs/PROGRESS.md` (add a "Site build (track `03-site-build/`)" section)
> 3. `DEVIATIONS.md`, one line per divergence, including each review-file edit, the `tagline` drop, the "More pages" label and the README line; plus M-SITE-1 in `TECHNICAL-DECISIONS.md`
>
> Then tick `03-site-build/00-build-order.md`. Run `yarn verify` and report what it printed.

---

## Closing note

**Closed 2026-09-24 by Mason (Claude Code, one thread for the SITE tickets; see DEVIATIONS).**

**What shipped.**
- **Production kit:** `brand/kits/kryshan.ts`, Kit D as literals, with a roman Archivo loader plus an italic loader (`preload: false`) behind `--font-quote`; `PRODUCTION_KIT` set.
- **Nested grounds (M-SITE-2):** `kitClassName()` emits `light`, and `dark:` stops at `.light`.
- **Environment:** `NEXT_PUBLIC_SITE_URL` falls back to `https://kryshanrandel.com`.
- **Routes:** `siteRoutes` (`work({ role, passion })`, `project`, `about`, `teaching`, `contact`), `WORK_ROLES`, `LEGACY_CRAWL` and `LEGACY_PATHS` in `lib/routes.ts`. No `@/` import.
- **Content:** `NAV`, `SOCIALS`, `CHROME` and `NOT_FOUND` in `content/site.ts`; `SITE.nav` and `SITE.social` removed.
- **Chrome (M-SITE-1):** a server `SiteShell` (skip link → bar → `main#main` → footer). The bar has a CSS-only phone split, `--bar-h` 44/56 and a scroll-timeline hairline. The 404 carries the chrome and the spec §6.7 copy; `lang="en-CA"`.
- **Lint:** the D-SITE-19 wall is merged into each existing `forbid()` call, plus a new block for `app/(site)/**` and `app/*.{ts,tsx}`.
- **Docs:** PERFORMANCE §4 and specs/README say `preload`; CONVENTIONS §2 updated; M-SITE-1 and M-SITE-2 logged.
- **No client component was added.**

**The crawl.**
- **Source:** `live`, 2026-09-24. robots.txt → `/sitemap.xml` (301 to Yoast's `/sitemap_index.xml`) → page, attachment, project and project_category sitemaps (84 `<loc>`s), then an HTML link harvest of every page (113 fetches, cap not hit; 131 distinct link targets).
- **105 rows by kind:**
  - page 5
  - project 25
  - project-not-kept 6
  - category 28 (13 from the sitemap, plus 15 paginated)
  - attachment 33
  - other 8
- **Query-only URLs skipped:** 2 (`/?attachment_id=26316`, `/?attachment_id=26319`).
- **How films were matched:** by page title, then confirmed by each old page's embedded video ID against `content/projects.ts`. The confirmations include `rcfc-were-in-this-together` → `rffc-were-in-this-together` (Vimeo 166846735), `riverdale-epk` → `riverdale-ew-bts` (YouTube 92ZF6lgw4us) and `united-8s` → `united8s`. `/averybcproduction/` and `/contactclub/` map to their projects.
- **No old page:** 5Rhythms, Tradeswoman Exhibit and both TUTS films.
- **Vigil spot-check:** three random rows (`/project_category/psa/`, `/project/glimpse/`, `/project/a-dogs-way-home-epk/ashley-judd/`) were re-fetched live, and each matches its target.
- **Raw output (not committed):** `crawl/raw.json` and `crawl/rows.json` in this session's scratchpad (`/private/tmp/claude-501/…/scratchpad/crawl/`).

**Rows listed for Taylor** (all follow the table; each is a one-row change if wrong):
- `/cdn-cgi/l/email-protection` → Work (other). A Cloudflare email-obfuscation link on the old Contact page. It is 404 on the old site.
- `/terminal-cinema-review/` → Work (other). A standalone press page for The Bully Solution, linked from its old page. The title doesn't name a film, so it isn't guessed onto one.
- `/author/nrmadmin/` → Work (other). The old site 301s it to `/`.
- `/test/homepage/` and `/test/kryshan-directing-read-through-2/` → Work (attachment; `/test/` itself isn't a page).
- The 15 paginated category URLs, mapped as their category (logged).

**Found in passing, for SITE-2 / Taylor (not changed here):** the old VANDU page embeds **Vimeo 325057243**, while spec O-SITE-7 lists VANDU's link as missing.

**Verification.**
- **`yarn verify`:** passed (lint with zero warnings, `check-types`, `build:agent`). `/`, `/_not-found`, `/robots.txt` and `/sitemap.xml` are static.
- **Fallback build** (`NEXT_PUBLIC_SITE_URL=` + `build:agent` + `start:agent`):
  - canonical and `og:url` are `https://kryshanrandel.com`
  - `robots.txt` names `https://kryshanrandel.com/sitemap.xml`
  - `curl -sI /nope` → 404
  - a cold load of `/` requests only the roman Archivo woff2
  - `--font-quote` is defined on `<html>`
- **Lint walls:** all seven induced violations fired (#4 a–e with the D-SITE-19 message; (c) with both messages; #5 with "Upward import") and were reverted.
- **Temporary props on the placeholder Home**, reverted (the file is back to a bare `<SiteShell>`):
  - `current="about"` gave `aria-current="page"` on About only, with a 2 px red 300 underline
  - `current="work" currentKind="true" skipTo="work"` gave `aria-current="true"` on Work and "Skip to the work" → `#work`

**Browser walk** (`yarn dev:agent`, :4500):
- **1440 and 768:** one 56 px line; no hairline at 0, and a hairline (`--border` at 40%) after scrolling; the bar stays pinned and solid; `scroll-padding-top` is 72 px.
- **390:** a 44 px sticky line (wordmark · Contact), with the More pages row scrolling out while Contact stays; `scroll-padding-top` is 60 px; every nav target is 44 px.
- **320:** no horizontal scroll.
- **`/nope`:** a real Tab focuses a visible "Skip to content", and Enter moves focus to `main`.
- **Footer:** email, place, Social nav with six links, each named "…, opens in a new tab"; no ©; no X/Twitter link.
- **Reduced motion** (the `globals.css` rule forced on): nothing in the chrome transitions, and the hairline still resolves.
- **Review layer:**
  - Demos A and D are identical to their pre-ticket state at 1440 and 390, by a per-element fingerprint of computed colour, font, border and box: 0 diffs across 126 and 331 elements.
  - Kit B's ribbon is amber 800 inside its `light` scope under `html.dark`.
  - Kit C is a dark kit, and its ribbon is amber 300, as before (logged).
  - `/review`, `/review/brand`, `/review/feedback` and the kit, layout and mock pages return 200.
- **Hidden-pane caveat:** the pane's document is hidden, so the scroll timeline only resamples when a frame renders. The hairline was read after screenshots forced frames.

**Deviations:** twelve SITE-1 lines in DEVIATIONS.md (four are also listed as contradictions at kickoff: the kit roles' stale text, `.env.example`, kit C's ground, and the `cn()` decoration trap).

**The one thing SITE-2 must know:** `lib/routes.ts` must stay free of `@/` imports (SITE-5 imports it from `next.config.ts`). Alias `ProjectRole` to `WorkRole` there rather than redefining it. `LEGACY_PATHS` targets new slugs, including the five held films, so the held set lives only in `content/projects.ts`.
