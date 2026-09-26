# SITE-3 — The film components go live, and Demo D becomes the home page: tile as a real link, panel with Copy link and a subject line, rows with end tiles, the copy button, the email hand-off, `Person` JSON-LD

**Epic:** SITE — Kryshan Randel's live site · **Step 1 (Demo D goes live)** · Size: L
**Slice type:** a port of an approved client-facing demo into the public site, plus the shared film grammar every later page consumes. The risks:
- a public file importing `review/` (or a copy that drifts from the approved demo)
- a tile that stops being a link, or a link that stops opening the panel
- a server-only value (`CONTACT_EMAIL`, `lib/config`) pulled into a client bundle
- an open film that survives a navigation and plays on arrival
- a video-host request before a tap

**Vigil:** the film path is the product's one action ("watch something, then email", spec §1). Review by **inducing**: a modifier click, a middle click and a no-JS click on a tile; a clipboard failure (insecure origin, denied permission) and a cancelled share sheet; Esc with focus inside the player; a resize and a rotate with a film open; a client-side navigation away and Back with a film playing; a throttled cold load and a poster that fails to load. QA states which of these it exercised.

**Status:** Complete (2026-09-24)

> **Mason — placement is already ruled** (build order, scope sheet, SITE-3). One contract is decided here because SITE-4 and SITE-5 consume it: the server-built `Film` view model (ruling 1). Counter-propose in `TECHNICAL-DECISIONS.md` before the build starts if you disagree; otherwise the builder logs it as the next free `M-SITE-n`.

---

## Outcome

`kryshanrandel.com/` is Demo D, live: the bar, his line in a two-column first square, six films, the Directing row and the Camera and editing row (each ending in a tile that leads to that slice of Work), the Teaching strand, "All {n} pieces →", and the footer, on the production kit and real data. A tap on a film opens it exactly as in Demo D, full width on the line below, playing; but every tile is now a real link to that film's page, so a Cmd-click, a middle click, a shared tile or a visitor without JavaScript goes to `/work/<slug>` instead. The open film's strip carries "Copy link" at its left end and the ✕ at its right; below the player sit the title, the genre line, the lane, the logline and the short awards, and his email last, which opens a message already titled with that film. Every link on the page is live; pages that don't exist yet (Work, the detail pages, About, Teaching, Contact) return the site's 404 until their tickets land. The components that do this now live in `components/composed/work/`, where Work (SITE-4) and the detail pages (SITE-5) will reuse them; the shared copy button and the email hand-off live in `components/composed/site/`. Demo A and Demo D still render in `/review` for comparison.

Not in this slice: the Work page and its filters (SITE-4); detail pages, redirects, the sitemap entries and `VideoObject` (SITE-5); any other page body (SITE-6 to SITE-8); final copy beyond the strings the spec gives verbatim (SITE-C).

## Why / intent

- **Spec §6.1** — Home is "built exactly as Demo D (handoff §6)" with five production changes: tiles are links, unbuilt-link toasts are gone, rows end with end tiles, the panel follows §4.3, counts come from data. This ticket is those five changes plus the port.
- **Spec §4.3** — the shared components' contract: tile, panel, link-out films, email hand-off, copy. **D-SITE-3** (tiles are real links; plain click opens in place; no prefetch), **D-SITE-9** (link-outs), **D-SITE-11** (Copy link in the strip, `[PROVISIONAL — shown to him at first look]`), **D-SITE-22** (logline and short awards; no story in the panel), **D-SITE-23** (mailto subject).
- **Handoff `demo-d-ux-handoff-v1.md` §6–§10** — every D-KRD ruling carries over unless §6.1 amends it. **M-KR-1** and **M-KR-6** (the view transition, the jawbone insertion walked over live columns, one module-level open-film store) are ported as they are, never re-decided.
- **D-SITE-19** — nothing public imports `review/`. The leaves are **copied** into `components/composed/work/` and rewritten there (handoff Appendix D: "never imported from `review/`").
- **D-SITE-27** `[PROVISIONAL — his OK in the one message]` — the Directing and Camera and editing captions ship as the amended lines. **O-SITE-5** default — the Teaching strand ships without VFS.
- **Spec §4.2** — the bar's height is `--bar-h`; `--review-bar-h` and `--demo-bar-h` are gone from everything public.
- **Spec §6.1 metadata** and **§8** — `Person` JSON-LD on Home, through `lib/structured-data.ts` and one server component, both created here and reused by SITE-5 and SITE-6.
- **What this slice is NOT (binding):**
  - It does not edit, delete or import anything under `review/`. Demo D's leaves stay where they are until SITE-9; the duplication is temporary and logged.
  - It does not build `/work`, `/work/<slug>`, or change `next.config.ts` redirects.
  - It adds no motion beyond M-KR-1's view transition (D-SITE-21), no dependency, and no analytics (D-SITE-15).
- **Ground truth consumed, never rebuilt:**
  - **SITE-1:** `siteRoutes` (`home`, `work({ role?, passion? })`, `project(slug)`, `about`, `teaching`, `contact`), the sticky bar in `components/composed/site/site-header.tsx` publishing `--bar-h`, the footer, the per-page skip-link text, `html { scroll-padding-top }`, socials in `content/site.ts`, `PRODUCTION_KIT` with `--link`, and the lint walls.
  - **SITE-2:** `isShowable`, `SHOWABLE_PROJECTS`, `findShowableProject`, `workOrder`, `projectMetaLine` (`content/projects.ts`); `POSTERS` (`content/posters.ts`); `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW`, the H1 and its red phrase (`content/home.ts`); `content/validate.ts`. Read each file for its exact signature; if one differs from the name here, use it as built and don't fork it.

**Rulings this slice makes (labelled, logged):**

1. **The film components take a server-built `Film`, not a `Project`.** `components/composed/work/film.ts` (`import "server-only"`) exports:
   ```ts
   export type Film = Readonly<{
     slug: string;
     title: string;
     genreLine: string;          // projectMetaLine(project)
     passion: boolean;           // lane === "passion"
     client?: string;            // the label for paid work
     logline: string;
     awards: ReadonlyArray<string>; // the short list; [] when none
     embed: Project["embed"];
     roles: ReadonlyArray<ProjectRole>;
     poster: StaticImageData;    // POSTERS[slug]
     href: Route;                // siteRoutes.project(slug)
     shareUrl: string;           // absoluteUrl(href)
   }>;
   export function toFilm(project: Project): Film;
   export function filmsFor(slugs: ReadonlyArray<string>): Film[]; // findShowableProject, unknown or held skipped
   ```
   Why: the absolute URL needs `lib/config` (which reads `CONTACT_EMAIL`, a server variable), so it must be computed on the server and arrive as data (spec §4.3). The slim shape also keeps stories, full awards and press out of the RSC payload that ships inside the HTML, and makes "the panel carries no story" a type fact (D-SITE-22). Client leaves import `Film` with `import type` only. `[PROVISIONAL — Mason]`. Logged in `TECHNICAL-DECISIONS.md` as the next free `M-SITE-n`.
2. **The open-film store resets when nothing is subscribed.** `open-film.ts` is module state, which survives client-side navigation in the App Router. When the last subscriber unsubscribes (the page's grid and rows unmounted), `openSlug` and the session reset to `null`. Without this, a film left open on Home reopens and autoplays when the visitor comes Back. Logged.
3. **The film CSS moves to `app/globals.css`.** The transition timing (`::view-transition-group(*)`, 220 ms, `cubic-bezier(0.2,0.8,0.2,1)`; 150 ms under `html[data-film-vt=swap]`) and `--player-cap` go in one commented, unlayered block. KR-8 kept them in the page because a server component couldn't import a module that imports `flushSync`; Home and Work both need them, and the panel and the filter are the site's only view transitions (D-SITE-21). Logged.
4. **The sticky bar gets a view-transition name.** SITE-3 adds `data-site-bar` and `view-transition-name: site-bar` to the sticky element in SITE-1's `site-header.tsx` (a one-line change), so tiles animating during an open never paint over the bar (handoff §6.2's `demo-bar`, ported). The scroll offset is measured from `[data-site-bar]`'s `offsetHeight`, never by `parseFloat` of `--bar-h` (a rem or `calc()` value would misread). Logged.
5. **A `data-js` flag, set before first paint.** `lib/pre-paint-script.ts` exports `PRE_PAINT_SCRIPT`, a string rendered as an inline `<script>` as the first element of `app/(site)/layout.tsx`. In this ticket it only sets `data-js` on `<html>`; `app/globals.css` adds `html:not([data-js]) [data-needs-js] { display: none }`. The copy button carries `data-needs-js`, so the Copy buttons on the detail pages (SITE-5) and Contact (SITE-8) are absent without JavaScript and present at first paint with it, with no layout shift. SITE-4 extends the same script for Work's filters. Any client leaf that relies on `data-js` also sets it on mount (idempotent), for the one path where the script didn't run: a client-side navigation into `(site)` from outside it. The root layout's `suppressHydrationWarning` on `<html>` must stay. Logged.
6. **The public film components carry no `data-review-id` and no `reviewPrefix`.** Nothing reviews the public pages through the comment layer, and SITE-9 deletes every `data-review-id` in `components/` and `app/(site)/` (spec §2). Departs from CONVENTIONS §5. Logged.
7. **`Person.jobTitle` is the roles line**, from `SITE.tagline` without its final full stop: "Director, camera operator, editor, and film instructor". Spec §6.1 names the field but not its value; this is his own styling, not new copy. Logged.
8. **Decorative arrows are hidden from assistive tech.** The →, ↓ and ↗ in "Watch ↓", "All {n} pieces →", "Teaching →", the end tiles and "Watch on {host} ↗" sit in `aria-hidden` spans; the visible text is unchanged. Spec §4.3 states this for ↗ only; the others would otherwise be read as "right arrow". Logged.

## Experience & states

**Handoff §6–§10 applies, with `--bar-h` for both of the demo's bars, and wins where this summary is silent.** Spec §6.1 and §4.3 win over the handoff where they differ.

### Page order (`/`)

1. Bar, footer and skip link ("Skip to the work"): SITE-1's chrome, unchanged apart from ruling 4.
2. **Featured grid:** the title cell (two columns wide from 768), then `FEATURED` in order. Default: Just Watch Us · Directors Reel · Jack · 5Rhythms · The Wolf of West Georgia Street · Just Up The Block. If SITE-2 held the Directors Reel (the §6.1 fallback), the lists in `content/home.ts` already say so; this ticket renders whatever they hold.
3. **Directing row:** h2 "Directing", the caption, `DIRECTING_ROW` in order, then the end tile **"All directing →"** to `siteRoutes.work({ role: "directing" })`.
4. **Camera and editing row:** h2 "Camera and editing", the caption, `CAMERA_ROW` in order, then **"All camera work →"** to `siteRoutes.work({ role: "camera" })`.
5. **Teaching strand:** h2 "Teaching", the body, "Teaching →" to `siteRoutes.teaching`.
6. **"All {n} pieces →"** to `siteRoutes.work()`, `n = SHOWABLE_PROJECTS.length`.
7. Footer.

Section spacing, gutters and grid columns are Demo D's (spec §4.1): 64/80 px between sections, 12/24 px gutters, 1 / 2 / 4 columns at <768 / 768–1279 / ≥1280.

### Title cell (`app/(site)/_components/title-cell.tsx`, server)

As handoff §6.3: the H1 from `content/home.ts` with its red phrase in `text-primary`, the roles line (`SITE.tagline` + " " + `SITE.place`), and below 768 "Watch ↓" linking to the first featured tile's `id` (`film-<slug>`). No portrait and no empty frame (D-SITE-16).

### The tile (`film-tile.tsx`)

Everything in handoff §6.4 and §8's tile states, with these changes:

| | Demo D | Live |
|---|---|---|
| Element | `<button>` | `<a href={film.href}>`, a plain anchor (not `next/link`), so nothing is prefetched |
| Plain click (primary button, no Cmd/Ctrl/Shift/Alt) | opens | `preventDefault()`, then opens, swaps or closes exactly as in the demo |
| Cmd/Ctrl/Shift/Alt click, middle click, "Open in new tab" | — | the browser's own behaviour: `/work/<slug>` (the site's 404 until SITE-5); no panel opens on this page |
| No JS | — | navigates to `/work/<slug>` |
| Enter | opens | fires the link's click, so it opens (with a modifier, it navigates) |
| Space | opens | scrolls the page, as on any link |
| Accessible name | "Play {title}, {meta}" | "{Title}, {genre line}" (spec §7.6) |
| ARIA | `aria-expanded`, `aria-controls` while open | the same, on the link |
| Poster | demo map, `FrameRibbon` | `film.poster` (from `POSTERS`), `placeholder="blur"`; no ribbon |
| Play glyph | YouTube / Vimeo | the same; none for link-outs |

**Tile states:** default · hover · focus-visible · open (2 px `--link` rule, no glyph) · image loading (blur) · image failed (`card` with its title) · coarse pointer (meta always on, no glyph) · hidden (one column, while its film is open).

Each tile's `<li>` carries `id="film-<slug>"`, `data-roles="<roles space-separated>"`, and `data-lane="passion"` only on passion work (SITE-4 filters on these; "hire" never reaches the DOM, spec §5 "never rendered").

### The panel (`film-panel.tsx`)

DOM order, top to bottom:
1. **Strip**, 44 px: **"Copy link"** at the left end (Label step, `muted-foreground`, the shared copy button, keyed by slug so it resets on a swap), then the **✕** at the right end ("Close {Title}"). Copy link precedes the ✕ in the DOM, so Shift+Tab out of the player lands on the ✕.
2. **Player** (`film-player.tsx`): YouTube and Vimeo mount playing (the tap was the gesture). A link-out shows `film.poster` with **"Watch on {host} ↗"**, `target="_blank" rel="noopener"`, a visually hidden ", opens in a new tab", and the ↗ `aria-hidden` (spec §4.3, D-SITE-9). No "old site" text, no ribbon, no `none` case.
3. **Meta:** the title (h2, `id` for the region's `aria-labelledby`), the genre line, the lane ("Passion project" in `--link`, or the client in `muted-foreground`, or nothing), the **logline** in the slot and style the demo gave the story (14 px, leading 1.6, max 68ch), the **short awards** (at most three lines, `muted-foreground`, absent means no gap).
4. **The email, last and alone:** `href = mailtoHref(email, film.title)` → `mailto:{email}?subject={encodeURIComponent(Title)}`. No story, no "Full page", no Close text.

Layout, player cap and behaviour are the demo's (handoff §6.5): side by side at ≥1280, stacked below; `--player-cap` now subtracts `--bar-h` only. Opening, swapping, moving, closing, Esc, resize and the scroll/focus orchestration are unchanged.

### The rows (`film-row.tsx`)

KR-9's row, plus an optional **end tile** as the track's last `<li>`: a `card` plate at the tiles' width and 16:9 ratio, the label centred in the Label step, the whole plate a plain `<a>` (never `next/link`, so SITE-4's before-paint filter runs on arrival), a target of at least 44 px, focus ring as the tiles. It takes part in the arrows' scroll range and in the focus reveal. Rows with no films don't render; a row's end tile never renders alone.

### The copy button (`components/composed/site/copy-button.tsx`, client)

One component for the panel's "Copy link" (here), the detail page's "Copy link" (SITE-5) and Contact's "Copy" (SITE-8). Its props carry the value, the three labels (idle, done, failed) from `content/site.ts`, a failure mode (`"share-or-show"` for links, `"select"` for Contact, with the id of the element to select), an optional share title and `className`.

| Path | What happens |
|---|---|
| `isSecureContext` and `navigator.clipboard.writeText` succeeds | Label reads the done string ("Link copied") for 2 s, then reverts; the component's own visually hidden `role="status"` (always in the DOM, polite) announces it. |
| Clipboard unavailable or rejected, `share-or-show`, `navigator.share` exists | The share sheet opens with the URL. Resolved or cancelled (`AbortError`): the label stays "Copy link" and nothing is announced. Any other rejection falls through to the next row. |
| Clipboard unavailable or rejected, `share-or-show`, no share | The absolute URL appears on its own line directly under the strip (Caption step, wraps anywhere), fully selected; the status reads "Couldn't copy. The link is selected." It stays until the panel closes or swaps. |
| Clipboard unavailable or rejected, `select` | The target element's text is selected; the status reads "Couldn't copy. The address is selected." |
| No JS | Absent (`data-needs-js`, ruling 5). |

On any failure the label never reads the done string. Clicking again during the 2 s restarts the timer. The timer clears on unmount.

### The email hand-off (`components/composed/site/email-hand-off.tsx`, server)

Props: `email`, an optional `sentence`, an optional `subject`, `className`. Renders the sentence in the Lead step (when present), then the address in `--link` as `mailtoHref(email, subject)`. Without a sentence it renders the address alone (the panel and Contact form, and the fallback while SITE-C writes a page's sentence). **Not rendered on Home** (spec §4.3 lists Work, detail, About, Teaching); SITE-4 is its first consumer.

### Home copy and data sources

| String | Status (spec) | Source in code |
|---|---|---|
| H1 and red phrase | Locked | `content/home.ts` (SITE-2) |
| Roles line | Locked | `SITE.tagline` + `SITE.place` |
| "Watch ↓" | Locked | `content/home.ts` (added here) |
| Directing caption | Proposed, default applies (D-SITE-27): "Dark comedies and horror shorts that won at Bloodshots and screened at Sitges and Fantasia; PSAs, music videos, web series and sizzle reels for clients." | `STRANDS` in `content/site.ts`, amended here |
| Camera and editing caption | Proposed, default applies (D-SITE-27): "IATSE 669. Behind-the-scenes and EPK camera for Sony Pictures and Entertainment Weekly; docs and non-fiction, often as a one-person crew. Leo-nominated as an editor." | `STRANDS`, amended here |
| Teaching strand body | Locked with fallback (O-SITE-5): "Directing, shooting and editing at LaSalle College; film camps; one-on-one coaching." | `STRANDS`, amended here |
| "All directing →", "All camera work →", "All {n} pieces →", "Teaching →" | Locked | `content/home.ts` (added here; `{n}` is a function argument) |
| Meta title | Locked: "Kryshan Randel — Director, camera operator, editor" (absolute) | `content/home.ts` `HOME_META` (added here) |
| Meta description | Write, default given: "Director, camera operator and editor in Vancouver. Dark comedies that won at Bloodshots, PSAs for the Directors Guild of Canada, IATSE 669 camera." (146 characters) | `HOME_META` |
| og:image | the Just Watch Us poster (O-SITE-11 default), alt "Just Watch Us, a still from the film" | `POSTERS["just-watch-us"]`; alt from the og alt rule in `content/site.ts` |
| Tile name, "Passion project", "Close {Title}", Copy link's three strings, "Watch on {host} ↗" + hidden text, og alt rule | Locked (§7.6, §4.4) | `content/site.ts` `FILM_COPY` (added here; reuse any SITE-1 already placed) |
| **Red phrase** | — | The H1 phrase only. |

`content/site.ts` stays free of `@/lib/config` and of anything that reads the environment, because client leaves import it.

### Structured data

One `<script type="application/ld+json">` on `/`, rendered by `components/composed/site/json-ld.tsx` from `personJsonLd(...)` in `lib/structured-data.ts` (plain arguments; `lib/` can't import `content/`):
```json
{ "@context": "https://schema.org", "@type": "Person",
  "name": "Kryshan Randel",
  "jobTitle": "Director, camera operator, editor, and film instructor",
  "url": "<SITE_URL>/",
  "sameAs": ["<the six social URLs from content/site.ts, in order>"],
  "address": { "@type": "PostalAddress", "addressLocality": "Vancouver" } }
```
The component escapes `<` as `<` (Next's JSON-LD guide). No other structured data on Home.

### States (exhaustive)

- **Page:** cold load · a film open (grid, or a row) · one column with the tile replaced · reduced motion · no JS · after a client-side navigation away and Back.
- **Tile:** as listed above.
- **Panel:** opening · playing · autoplay blocked (the provider's own button; never one of ours) · swapping (150 ms) · closing (iframe unmounted) · link-out (poster and "Watch on {host} ↗") · no awards (collapses) · Copy link idle / done / share sheet / URL shown and selected.
- **Row:** as KR-9, plus the end tile.
- **Links out of Home:** Work, About, Teaching, Contact, the end tiles, "Teaching →", "All {n} pieces →" and every tile's href lead to routes that return the site's 404 until SITE-4 to SITE-8. That is correct in this ticket, not a defect.

### Failure / edge states

- **Poster fails to load:** `card` with the title in the scrim. Never blank.
- **Modifier, middle or context-menu click on a tile:** the browser handles it; no panel opens on the current page; the current page's open film (if any) is untouched.
- **Clipboard blocked (insecure origin, denied permission) or share cancelled:** per the copy button table. The label never lies.
- **Esc with focus inside the player:** does nothing (cross-origin iframe); the ✕ is the dependable exit, one Shift+Tab away.
- **Resize or rotate while open:** the insertion point is recomputed from the live columns; the same film stays open.
- **Client-side navigation away with a film open, then Back:** the iframe unmounted on leave (audio stops); on return no panel is open and no video-host request is made (ruling 2).
- **A held or unknown slug in a home list:** `filmsFor` skips it at render; `content/validate.ts` (SITE-2) already fails the build on it.
- **Missing `CONTACT_EMAIL`:** falls back to the alias (D-SITE-18); the panel still has an address.

## Non-negotiables (this slice)

- **Nothing public imports `review/`.** Copy the leaves, rewrite them, and leave `review/` untouched; `yarn lint` enforces D-SITE-19.
- **Client leaves never import `@/lib/config` or `@/lib/metadata`.** The email and every URL arrive as props (`Film.shareUrl`, `email`); `Film` is imported as a type only.
- **Every tile is a real `<a href>` to its detail page; only a plain primary click is intercepted.** No `next/link`, no prefetch.
- **No iframe, player script or video-host request before a tap.** Only the first poster on the page is preloaded.
- **One grammar and one panel per page:** the film opens full width on the line below its tile's row (below the track in a row), nothing reorders, nothing sits over the video.
- **The panel carries no story; the email is alone and last, with the film's title as its subject.**
- **The public site stays static.** `/` builds as a static route; nothing reads a request.

If the spec would force a break of one of these, STOP and ask.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/home.ts`: add `HOME_META` (`title`, `description`) and the Home link labels ("Watch ↓", "All directing →", "All camera work →", "Teaching →", and "All {n} pieces →" as a function of `n`). Consumes SITE-2's `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW`, H1 and red phrase unchanged.
- `content/site.ts`: amend the three `STRANDS` bodies to the strings in the table above; add `FILM_COPY` (tile name, "Passion project", "Close {Title}", Copy link idle / done / failed, the link-out label and hidden text, the og alt rule). No `@/lib/config` import.
- `content/projects.ts`, `content/posters.ts`: read only.

**Placement** (Mason's call, build order scope sheet; ported source → destination):

| Source (unchanged) | Destination (new) | What changes |
|---|---|---|
| `review/mocks/_components/home-d/film-tile.tsx` | `components/composed/work/film-tile.tsx` | `<a href>` with the plain-click intercept; name "{Title}, {genre line}"; takes a `Film`; no `FrameRibbon`; no `review/` imports. |
| `…/home-d/film-panel.tsx` | `components/composed/work/film-panel.tsx` | Copy link in the strip before the ✕; logline and short awards in place of story; `mailtoHref(email, title)`; `--bar-h`; no `reviewPrefix` or `data-review-id`. |
| `…/home-d/featured-grid.tsx` | `components/composed/work/film-grid.tsx` | Optional `leading` cell (spans 2 columns from 768; Home only); optional `isVisible(film)` so `lineEnds` walks visible tiles only (SITE-4 passes it; default: all visible); `preloadFirst`; each `<li>` gets `id`, `data-roles`, `data-lane`. |
| `…/home-d/film-row.tsx` | `components/composed/work/film-row.tsx` | Optional `end: { label, href }` end tile; takes `Film[]`; no `review/` imports. |
| `review/mocks/_components/project-player.tsx` | `components/composed/work/film-player.tsx` | YouTube/Vimeo → `VideoEmbed` (`startPlaying`, default true); link-out → poster and "Watch on {host} ↗"; no `none` case, no ribbons, no `posterFirst`. |
| `…/home-d/open-film.ts` | `components/composed/work/open-film.ts` | `FILM_PANEL_ID = "film-panel"`; bar offset from `[data-site-bar]`; reset when unsubscribed (ruling 2); adds `dismissFilm()` (clears the store and session with no focus or scroll work, to be called inside a caller's own transition update; SITE-4 uses it). |
| `…/home-d/use-open-film.ts` | `components/composed/work/use-open-film.ts` | Import paths only. |
| `…/home-d/transition.ts` | `components/composed/work/transition.ts` | `data-demo-vt` → `data-film-vt`; `prefersReducedMotion` defined here (the review helper isn't importable). |
| `…/home-d/posters.ts` | — | Not ported; `POSTERS` (SITE-2) is the only poster source. |
| `…/home-d/unbuilt-link.tsx`, `frame-ribbon.tsx` | — | Not ported. They stay in `review/` for Demo D until SITE-9. |
| `review/mocks/home-d.tsx` (page composition) | `app/(site)/page.tsx` + `app/(site)/_components/title-cell.tsx` | Live links; end tiles; amended captions; teaching fallback; `HOME_META`; og:image; `<JsonLd>`; no `<Bar>`, `<Footer>` or page `<style>` (SITE-1's chrome and ruling 3). |

New, not ported:
- `components/composed/work/film.ts` (ruling 1, `server-only`)
- `components/composed/site/copy-button.tsx` (client)
- `components/composed/site/email-hand-off.tsx` (server)
- `components/composed/site/json-ld.tsx` (server)
- `lib/structured-data.ts` (`personJsonLd`; SITE-5 adds `videoObjectJsonLd`)
- `lib/mailto.ts` (`mailtoHref(email, subject?)`; pure, importable by client leaves)
- `lib/pre-paint-script.ts` (ruling 5)

Edited:
- `app/(site)/layout.tsx` (the pre-paint `<script>` first)
- `app/globals.css` (ruling 3's block; the `data-needs-js` rule)
- `components/composed/site/site-header.tsx` (ruling 4 only)
- `content/home.ts`, `content/site.ts`

Every new composed component carries its top-of-file decision comment and accepts `className` (CONVENTIONS §6).

**Validators:** none added. SITE-2's `content/validate.ts` already refuses a held or unknown slug in `FEATURED` and the rows, and a showable film without a poster or logline.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

Handoff §10 applies, with these changes and traps:
- **One h1** (the title cell). Outline: h1 his line · h2 Directing · h2 Camera and editing · h2 Teaching; the panel's title is an h2 inside `role="region"` (spec §3).
- **Tiles are links with `aria-expanded`** (valid on `link`) and `aria-controls` while open. Enter opens; Space scrolls. The name is "{Title}, {genre line}"; posters inside a labelled tile have `alt=""`.
- **Focus not obscured (2.4.11):** SITE-1's `scroll-padding-top: calc(var(--bar-h) + 1rem)` on `html`; tiles and the panel get `scroll-margin-top` from `--bar-h`. Confirm the `html` rule exists; if SITE-1 didn't add it, add it to `globals.css` and log it.
- **Copy link** announces through its own polite `role="status"`, which exists before any text is put in it. The failure text is announced, never "Link copied".
- **The link-out** announces ", opens in a new tab"; its ↗ is hidden (ruling 8 for the other arrows).
- **Targets ≥44 px:** tiles, ✕, Copy link, arrows (pointer only), end tiles, "Watch ↓", "Teaching →", "All {n} pieces →".
- **Reduced motion:** open, close, swap and row arrows are instant; layouts identical.
- **Esc** can't cross the player's iframe; the ✕ is first in the panel's tab order.

## Acceptance criteria (observable — `yarn dev:agent` for the walk; `build:agent` output for static checks; a throttled "Fast 4G" profile for load checks)

1. **At 1440,** `/` reads: bar · [his line (2 columns) · first two `FEATURED` films] · [the next four] · Directing row (the `DIRECTING_ROW` films, then "All directing →") · Camera and editing row (the `CAMERA_ROW` films, then "All camera work →") · Teaching strand · "All {n} pieces →" · footer. With the default lists that is Just Watch Us · Directors Reel, then Jack · 5Rhythms · Wolf · Just Up The Block; 8 and 7 row films.
2. **Plain click** on Jack opens a full-width panel below the second grid line, playing, with the tile still in place and marked; the URL does not change. 5Rhythms swaps in place; Just Watch Us moves the panel below the first line; Dare opens beneath the Directing row and closes Jack's panel. Exactly one panel exists at any time.
3. **Links:** in the static HTML, every tile is `<a href="/work/<slug>">` with `aria-expanded="false"`. Cmd-click, Ctrl-click, Shift-click and middle-click on a tile each open `/work/<slug>` in a new tab or window (the site's 404 until SITE-5) and open no panel on `/`. With JavaScript disabled, a click on a tile navigates to `/work/<slug>`.
4. **No prefetch:** hovering tiles and loading the page makes no request for `/work/*` (network tab, RSC and document requests included).
5. **Panel contents:** strip = "Copy link" (left), ✕ (right), in that DOM order; then the player; then title (h2), genre line, lane, logline, short awards; the last focusable element is a link whose `href` is `mailto:<SITE.email>?subject=<Title, percent-encoded>` (checked on "The Wolf of West Georgia Street": `subject=The%20Wolf%20of%20West%20Georgia%20Street`). No story text appears in any panel, including for a film that has a story in `content/projects.ts`. "Full page" appears nowhere in the DOM.
6. **Copy link, success (localhost is a secure context):** clicking it puts `<NEXT_PUBLIC_SITE_URL, or https://kryshanrandel.com>/work/<slug>` on the clipboard; the label reads "Link copied" for 2 s and returns; a screen reader (or the accessibility tree) shows the status "Link copied".
7. **Copy link, failure (induced):** with clipboard permission denied in devtools, or the page served on the LAN IP over `http` (not a secure context), the label never reads "Link copied"; in a desktop browser without `navigator.share` the URL appears selected under the strip and the status reads "Couldn't copy. The link is selected."; where `navigator.share` exists (a phone), the share sheet opens, and cancelling it leaves the label "Copy link" with no announcement.
8. **Keyboard:** Tab reaches every tile and end tile; Enter on a tile opens it and focus lands on the panel; Space on a focused tile scrolls the page and opens nothing; Shift+Tab from the player lands on the ✕; Esc (focus outside the player) closes and focus returns to the tile; no focused element sits under the bar.
9. **At 390:** the bar line, the nav row, his line and the whole first poster are visible on load; tapping the first poster replaces it with the playing film and a visible ✕ without scrolling; ✕ restores the tile and focus. Rows swipe with a peek, show no arrows, and end with their end tile.
10. **End tiles:** "All directing →" is a plain `<a>` to `/work?role=directing`, "All camera work →" to `/work?role=camera`; each is a `card` plate at tile size with a hit area of at least 44 × 44. "All {n} pieces →" shows `n = SHOWABLE_PROJECTS.length` (not a typed number) and links to `/work`; "Teaching →" links to `/teaching`.
11. **Copy on the page:** the Directing and Camera and editing captions and the Teaching body read exactly as in the table above. "For hire", "for hire", "Canon C70", "one-person unit", "Vancouver Film School" and "Kryshan Randel" (outside the wordmark) appear nowhere in the rendered text of `/`. The only text in `text-primary` besides the wordmark is the H1 phrase.
12. **Metadata:** `<title>` is "Kryshan Randel — Director, camera operator, editor"; the meta description is the default string (≤155 characters); the canonical is `<SITE_URL>/`; `og:image` is the absolute URL of the Just Watch Us poster, with `og:image:alt` "Just Watch Us, a still from the film".
13. **JSON-LD:** exactly one `application/ld+json` script on `/`; it parses as JSON to the `Person` above, with the six social URLs in `sameAs`, and contains no raw `<`.
14. **Loading (cold, throttled):** no request to `youtube.com`, `youtube-nocookie.com`, `ytimg.com` or `vimeo.com` before a tap; exactly one poster is preloaded (the first featured film); no tile is ever blank (blur, then image); CLS is 0 (Performance panel).
15. **Poster failure (induced by blocking one poster URL in devtools):** that tile shows a `card` with its title.
16. **Navigation persistence:** open Jack, click the bar's "About" (the 404), press Back: `/` shows no open panel, no iframe, and makes no video-host request.
17. **Reduced motion (emulated):** open, close, swap and arrows are instant; layouts are identical to the animated ones.
18. **No JS:** Copy link is absent (there is no panel); the page is complete; rows scroll natively; no arrows render.
19. **Boundaries:** no file under `components/`, `content/` or `app/(site)/` imports `@/review/*`; no file under `components/composed/work/` except `film.ts` imports `@/lib/config` or `@/lib/metadata`; `film.ts` imports `server-only`; no `data-review-id` in `components/composed/work/` or `app/(site)/page.tsx`. `git diff` for this ticket touches no file under `review/`.
20. **Static:** the `build:agent` route table lists `/` as static (○).
21. **The review layer still renders:** `/review/mocks/home-d/kryshan-d` and `/review/mocks/home-a/kryshan-a` return 200 locally (`REVIEW_GATE=off`) and behave as before. Demos A, C and D read `STRANDS`, so their strand captions now show the amended text (logged).
22. **Records:** DEVIATIONS lines for rulings 2 to 8 and for the temporary duplication with `review/mocks/_components/home-d/`; ruling 1 in `TECHNICAL-DECISIONS.md` as the next free `M-SITE-n`.
23. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/` via `yarn dev:agent` (never `yarn dev` or `yarn build`). Closing note in the ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **The plain-click test:** `event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.defaultPrevented`. Middle clicks fire `auxclick`, not `click`, so they never reach the handler. Keyboard Enter on a link fires `click` with `button === 0` and carries the modifier keys, so Cmd+Enter still opens a new tab.
- **Store reset:** the simplest place is the unsubscribe function returned by `subscribeOpenFilm`: when `listeners.size` drops to 0, set `openSlug = null` and `session = null`.
- **React 19 and `<script>`:** React warns ("Encountered a script tag…") only when it *creates* a script element on the client, not when it hydrates one. The `(site)` layout persists across client navigations, so its pre-paint script is only ever hydrated, except on a client-side navigation into `(site)` from outside it (the 404, which sits outside `(site)`, or `/review`). On that path the script doesn't run, which is why ruling 5 has the on-mount fallback, and React logs its warning once, in development only (acceptance 16 walks this path). Expect it, and name it in ruling 5's DEVIATIONS line; production is silent. JSON-LD (`type="application/ld+json"`) is a data block and never warns.
- **The static import's `src`** is root-relative (`/_next/static/media/…`); `metadataBase` (from `rootMetadata`) makes the og:image absolute. `StaticImageData` satisfies `VideoEmbed`'s `poster` prop.
- **`VideoEmbed` still passes `priority`** to `next/image`; the panel's player mounts playing, so the poster branch isn't used here. Leave `components/composed/media/` alone unless the build warns; if it does, switching that prop to `preload` is in scope and gets a DEVIATIONS line.
- **Row sizes** stay KR-9's; the end tile uses the same width classes as a row tile.
- **Tailwind v4:** `scroll-mt-[calc(var(--bar-h)+1rem)]` is fine (a `var()` inside `calc()`); the banned form is the bare `-[--x]` shorthand.

## Dev's call

- Internal names inside the components (helper functions, prop names other than those the tables fix).
- Whether `filmsFor` also accepts `Project[]` or only slugs.
- The copy button's hover colour (`foreground` or `--link`) and exactly where the selected URL line sits under the strip, within the table's rule.
- Whether the Teaching strand is a small server component in `app/(site)/_components/` or inline in `page.tsx`.
- The exact `data-film-vt` / `--player-cap` CSS text, within ruling 3.

Real alternatives chosen here go to `TECHNICAL-DECISIONS.md`.

## Out of scope

- **The Work page, its filters, the pre-paint filter logic and the credits list:** SITE-4 (it extends `lib/pre-paint-script.ts` and passes `isVisible`).
- **Detail pages, `VideoObject`, the sitemap entries, redirects:** SITE-5.
- **About's `Person` JSON-LD, About, Teaching, Contact:** SITE-6, SITE-7, SITE-8 (they reuse `json-ld.tsx`, `email-hand-off.tsx`, `copy-button.tsx`).
- **The portrait variant of the title cell (2 × 2, eight featured):** D-SITE-16; nothing renders until he supplies a portrait.
- **A "player won't load" state or spinner:** not built (KR-8's deviation stands).
- **Deleting Demo D's leaves, `FrameRibbon`, `unbuilt-link.tsx` or the review posters map:** SITE-9.
- **Loglines, awards, captions beyond the defaults above, any new sentence:** SITE-C.
- **Lighthouse gating:** SITE-10 (record the four numbers in the closing note if you run it; it isn't a gate here).

## Depends on

- **SITE-2** — Complete in `PROGRESS.md` (the showable model, `POSTERS`, the home lists, `validate.ts`; SITE-2 itself requires SITE-1's routes, chrome, `--bar-h`, socials and lint walls).

## Recommended Claude Code execution

**Opus 5.5.** The port looks mechanical, and that is the trap: the value is in the edges (the plain-click intercept, the store surviving navigation, a server-only value leaking into a client bundle, the copy button's failure paths, focus and scroll with a real bar). Sonnet 5 tends to keep the `<button>`, import from `review/` "to avoid duplication", or pass `SITE` into a client leaf, and the build or the lint wall then fails late, or worse, passes with a panel that reopens on Back.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-3 — The film components go live, and Demo D becomes the home page** (`docs/specs/03-site-build/SITE-3-film-components-and-home.md`). Model: **Opus 5.5**. **Port Demo D by copying, never importing: every tile is a real link that a plain click opens in place, the panel ends with the email and a subject line, and nothing public touches `review/`.**
>
> Follow the kickoff contract in `docs/specs/README.md` verbatim. Read first, in order:
> 1. this ticket
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §1, §3, §4, §6.1, §7.6, §9, §10, §12
> 3. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` §6–§11
> 4. `docs/specs/02-review-demo-d/KR-8-demo-d-home-revised.md` and `KR-9-demo-d-rows.md` (closing notes especially)
> 5. the source files in the ticket's placement table (read them whole before writing)
> 6. `AGENTS.md`, `docs/CONVENTIONS.md`, `docs/PERFORMANCE.md`
> 7. `docs/specs/03-site-build/SITE-1-*.md` and `SITE-2-*.md` (reuse, don't fork), and the files they produced: `lib/routes.ts`, `content/projects.ts`, `content/posters.ts`, `content/home.ts`, `content/site.ts`, `components/composed/site/site-header.tsx`
> 8. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md` (M-KR-1, M-KR-6)
>
> Constraints: routes only from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`; client leaves never import `@/lib/config` (the email and URLs arrive as props); no upward imports, and nothing public imports `review/`; never run `yarn dev` or `yarn build` (use `dev:agent` / `build:agent`). If a non-negotiable would have to break, stop and ask.
>
> Close in three places: the ticket's `Status:` line, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (+ `TECHNICAL-DECISIONS.md` for ruling 1). Then tick `docs/specs/03-site-build/00-build-order.md`. Report what `yarn verify` printed.

---

## Closing note

**Closed 2026-09-24 by Mason (Claude Code, the one SITE thread; Batch 1 with SITE-2).**

**What shipped.**
- **`/` is Demo D, live:**
  - the bar
  - his line in the two-column first cell, then the `FEATURED` films (the SITE-2 fallback: Just Watch Us · Contact Club · Jack · 5Rhythms · Wolf · Just Up The Block)
  - the Directing row (7 films, then "All directing →") and the Camera and editing row (7, then "All camera work →")
  - the Teaching strand, "All 22 pieces →" and the footer
  - `Person` JSON-LD
- **`components/composed/work/`** (the film grammar): `film.ts` (the `Film` view model, `server-only`, M-SITE-4), `film-tile`, `film-panel`, `film-grid`, `film-row`, `film-player`, `open-film`, `use-open-film` and `transition`.
- **`components/composed/site/`:** `copy-button`, `email-hand-off` and `json-ld`.
- **`lib/`:** `mailto.ts`, `pre-paint-script.ts` and `structured-data.ts`.
- **Content:** amended `STRANDS`, plus `FILM_COPY`, `HOME_META` and `HOME_LINKS`.
- **Untouched:** nothing under `review/` changed.

**Verified** (on `dev:agent` unless stated):
- **#1 Layout at 1440:** title cell plus two films, then four; rows of 7 and 7 with their end tiles.
- **#2 Opening films:** a plain click on Jack opens below line 2 with the URL unchanged and Vimeo playing. 5Rhythms swaps in place with 0 px of scroll. Just Watch Us moves the panel to line 1. Dare opens under the Directing row. One panel at a time.
- **#3 Tiles are links:** the static HTML has 20 `<a href="/work/<slug>" aria-expanded="false">`. Cmd, Ctrl, Shift and Alt clicks and a middle click are not intercepted and open no panel.
- **#4 No prefetch:** no `/work/*` request on load or hover (the tiles are plain anchors).
- **#5 Panel contents:** Copy link, then ✕, then the iframe, then the mailto last, with `subject=The%20Wolf%20of%20West%20Georgia%20Street`. No "Full page" anywhere. `Film` has no story field.
- **#6 and #7 Copy link:**
  - the real click in the unfocused pane was refused by the browser, so it took the failure path: the URL shown and selected, the status "Couldn't copy. The link is selected.", and the label never "Link copied"
  - a stubbed success: "Link copied" for 2 s, announced, then back to the idle label, with the absolute URL written
  - a stubbed share sheet: cancelled leaves the label unchanged with no announcement; any other error falls through to the selected URL
  - the swap reset the fallback (keyed by slug)
- **#8 Keyboard:** a real Enter opens with focus on the panel. A real Space scrolls 808 px and opens nothing. Esc closes and returns focus to the tile. The ✕ sits just before the iframe in DOM order.
- **#9 Phone (375 × 667):** the bar, the nav row, his line and the whole first poster (bottom at 561 px) are visible on load. A tap replaces the tile with the playing film, with the 44 × 44 ✕ at 365 px and no scroll. ✕ restores the tile and its focus. No arrows.
- **#10 End tiles:** `card` plates at the tiles' size (295 × 166), linking to `/work?role=directing` and `/work?role=camera`.
- **#11 Text:** the captions are exactly the amended strings. None of "For hire", "Canon C70", "one-person unit" or "Vancouver Film School" appears. His name appears once, and the only `text-primary` text is the wordmark and the H1 phrase.
- **#12 Metadata:** the title, the description, og:image (the Just Watch Us poster) and its alt are correct. The canonical is the bare origin (logged).
- **#13 JSON-LD:** exactly one tag, parsing to the `Person` with six `sameAs` and no raw `<`.
- **#14 Loading (production build):** no video-host request on a cold load; one poster preloaded (Just Watch Us); all 20 tile images have their blur placeholder in the server HTML; CLS 0 (buffered layout-shift observer).
- **#15 Poster failure:** a broken poster URL gives a `card` frame with the title.
- **#16 Store reset (ruling 2):** a client-side round trip (`/` → `/review` → Back, same document) left no panel and no iframe. A nav into the 404 is a hard load in Next, so it resets trivially.
- **#17 Reduced motion** (`matchMedia` stubbed): open, swap and close apply synchronously with zero view transitions. With motion allowed, the same open runs one.
- **#18 No JS** (server HTML): no arrows, no copy button, no panel; the tracks scroll natively.
- **#19 Boundaries:** the greps are clean, `film.ts` imports `server-only`, and no client file imports `lib/config`, `lib/metadata` or `lib/env`.
- **#20 Static:** `/` is ○.
- **#21 Review layer:** all review routes return 200. A and D differ only by the amended captions (A: two strings; D: those strings plus a one-line wrap moving what's below).
- **`yarn verify`:** passed.

**Walk:** 1440, 768 (two columns, 5Rhythms' panel after its own line, arrows for a pointer), 390/375 and 320 via SITE-1's chrome, plus reduced motion as above.

**Runtime checks for Taylor** (the agent pane is unfocused):
- a real Copy link in a focused window, and "Link copied" announced by VoiceOver
- the share sheet on a phone
- Tab walking every tile and end tile in a focused window

**Deviations:** 15 SITE-3 lines in DEVIATIONS.md, plus M-SITE-4.

**The one thing SITE-4 must know:**
- Build Work from `workOrder()` mapped through `toFilm`.
- Pass `isVisible` to `FilmGrid` so the jawbone walks visible tiles only.
- Filter on the `<li>`'s `data-roles` and `data-lane` (already rendered).
- Extend `PRE_PAINT_SCRIPT` for the filters.
- Close an open film with `dismissFilm()` inside the filter's own transition.
- Pass `id="work"` to `FilmGrid` for the skip link.
- Use `EmailHandOff`'s first consumer: Work itself.
- Mind the `cn()` trap with `decoration-*` colour plus thickness (SITE-1 DEVIATIONS).

