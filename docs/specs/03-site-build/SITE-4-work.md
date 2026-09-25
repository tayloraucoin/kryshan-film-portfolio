# SITE-4 — Work: every film, role and passion filters that are right before first paint, and the credits he can't show as films

**Epic:** SITE — Kryshan Randel's live site · **Step 2 (The rest of the site)** · Size: L
**Slice type:** a static page with a client-side filter that must be correct before the first paint, over SITE-3's film grammar, plus a data file sourced from his CV. The risks:
- a filtered page that paints unfiltered, then snaps (the flash Vesper B2 forbids)
- React state and the URL or the page disagreeing after a navigation
- an open film surviving a filter change, or focus lost when it goes
- a page that stops being static (`searchParams`, `useSearchParams`)
- his home address or phone number reaching the build (both are on the CV this data comes from)

**Vigil:** review by **inducing**: a throttled cold load of each filtered URL, recorded as a filmstrip; a filter change with a film playing (mouse in Chrome **and** Safari, and keyboard); a client-side navigation into `/work`, out of it and Back; no JavaScript; unknown query values; an empty combination; find-in-page into the collapsed credits. QA states which it exercised.

**Status:** Draft → ready for execution (authored 2026-09-24)

> **Mason — one placement call is made here** (ruling 1): the before-paint filter attributes live on `<html>`, set by the `(site)` layout's pre-paint script that SITE-3 created, not on the grid wrapper as spec §6.2 words it. The scope sheet left the script's file open. Counter-propose in `TECHNICAL-DECISIONS.md` before the build if you disagree; otherwise the builder logs it as the next free `M-SITE-n`.

---

## Outcome

`/work` is the archive: every showable film in one grid, in `workOrder()`, with the tile and the open film exactly as on Home. A producer narrows it by what they're hiring for (All · Directing · Camera · Editing) and by "Passion projects", and the URL says so (`/work?role=camera&passion=1`), so the page can be shared or reloaded in that state. Arriving on a filtered URL, from Home's "All camera work →" or a pasted link, the very first paint already shows only the matching films, with the right count and the right filter marked, and nothing moves afterwards. Changing a filter reflows the grid with the site's one transition, closes any open film, keeps focus where the visitor clicked, and announces the new count. Below the grid sits "What I can't show you" (once SITE-C writes it), then **Behind the scenes**: his released EPK and behind-the-scenes credits, newest first, 18 visible and the rest a click (or a find-in-page) away, then the IMDb link, then his email. The silent regular, the camera hire, gets there in one tap from "Behind-the-scenes credits ↓" under the header.

Not in this slice: detail pages and next/previous (SITE-5); the sitemap entry for `/work` and the `/reel/` redirect (SITE-5); final wording of the can't-show block, the credits context line, the hand-off sentence and the meta description (SITE-C).

## Why / intent

- **Spec §6.2** — the page: sections, filters, states, text table and acceptance seeds. **D-SITE-4** (hide before paint, view transition on change; amends 06-A's fade), **D-SITE-5** (role links plus one chip, in the URL), **D-SITE-6** (`workOrder()`, the same inside every filter), **D-SITE-7** (the credits list on Work: released only, newest first, 18 then expand, jump link, IMDb link, then the email), **D-SITE-20** (no section renders for missing content), **D-KRD-10** and spec §4.4 (only "Passion project" names a lane; "for hire" never), **D-SITE-26** (next/previous ignore the filter; SITE-5).
- **Spec §6.1 acceptance seed** — "The end tiles land on filtered Work with no flash (§6.2)." It is verified here, because `/work` doesn't exist until now.
- **Spec §5** — `Credit { title; year; format; network; released }`; only `released: true` renders. **Spec §11** — his phone number and home address never appear anywhere in the build.
- **Spec §4.3, §9, §10** — the shared components, focus not obscured (`scroll-margin-top` on `#credits`), targets, reduced motion; the filter leaf and its pre-paint script are the only JavaScript this page adds.
- **What this slice is NOT (binding):**
  - It never reads the query on the server. `/work` is one static page; filtering is presentation over a complete HTML document (PERFORMANCE §2).
  - It doesn't fork the film grammar: `FilmGrid`, `FilmTile`, `FilmPanel`, the open-film store and `Film` are SITE-3's, consumed as they are.
  - It doesn't write copy. Write and His-words strings are SITE-C's; this ticket builds their slots and renders nothing where they're empty.
- **Ground truth consumed:** SITE-1's `siteRoutes.work({ role?, passion? })` and the role union it types; SITE-2's `workOrder()`, `SHOWABLE_PROJECTS` and `content/validate.ts`; SITE-3's `components/composed/work/*`, `components/composed/site/email-hand-off.tsx`, `lib/pre-paint-script.ts`, the `data-js` / `[data-needs-js]` rule, `transition.ts` (`runTransition`) and `dismissFilm()`. If a signature differs from its name here, use it as built.

**Rulings this slice makes (labelled, logged):**

1. **The filter attributes live on `<html>`, set by the `(site)` layout's pre-paint script.** A script placed before the grid can't reach a wrapper the parser hasn't reached yet, and a `<script>` rendered by the Work page is created on the client (and never runs) whenever someone arrives at `/work` by a client-side navigation. The `(site)` layout persists across those navigations, so its script (SITE-3's `lib/pre-paint-script.ts`) is only ever parsed with the document. `<html>` already carries `suppressHydrationWarning`. Spec §6.2 said "on the grid wrapper"; the intent (hidden before paint, state synced on hydration) is unchanged. `[PROVISIONAL — Mason]`. Logged in DEVIATIONS and as the next free `M-SITE-n`.
2. **Everything visible that depends on the filter is styled from those two attributes, never from React state:** which tiles show, the empty line, the count text, the current role link's look, the chip's on-look. React owns the state; it writes the attributes and owns the ARIA state (`aria-current`, `aria-pressed`) and the live status. That is what makes a cold filtered load right at first paint rather than only the tiles. Logged.
3. **Without JavaScript the whole filter nav is hidden, not only the chip.** On a static page a role link can't filter without script; it would reload the same unfiltered page under a URL that says otherwise. Spec §6.2 hides the chip; this extends it to the role links. The count reads "{n} pieces". `[PROVISIONAL — Vesper]`. Logged.
4. **After any filter change, focus is on the control that was used.** Safari doesn't focus a link or button on a mouse click, and focus may have been inside the panel that just closed; if `document.activeElement` isn't the control, it's focused with `preventScroll`. **"Show all" in the empty state** disappears when used, so focus moves to the "All" role link. Logged.
5. **One email hand-off on Work, after "Full credits on IMDb".** Spec §6.2 ends both section 5 and section 6 with the hand-off; §4.3 says one component ends a page's content, and D-SITE-7 orders "an IMDb link, then the email". The can't-show block ends on its own last sentence. `[PROVISIONAL — Vitrine]`. Logged.
6. **The collapsed credits sit in a native `<details>`; no `hidden="until-found"` is added.** Chromium already opens a closed `<details>` when find-in-page matches inside it, which is the behaviour the spec wants. A browser that doesn't support the `until-found` value treats any `hidden` attribute as hidden, so it degrades to hidden, not open as §6.2 says, and `@types/react` 19 types `hidden` as a boolean. `[PROVISIONAL — Mason]`. Logged.
7. **The credits list is his EPK CV, reconciled against his IMDb paste** (O-SITE-6's default: "credits per his EPK CV"; spec Appendix B). The rules and the resulting 39 entries are in *Data & content*. IMDb-only credits aren't added; SITE-C and his Q12 answer may add them. Logged.
8. **Work's page strings live in a new `content/work.ts`** (spec §5 doesn't list a home for them; CONVENTIONS §10a requires one). Its two h2 strings default to the spec's own heading outline (§3): "What I can't show you" and "Behind the scenes". The second is a Write string (2–4 words, literal), `[PROVISIONAL — Cantor]`; SITE-C may replace it. Until SITE-C writes Work's meta description, the page uses `SITE.description`. Logged.
9. **"Full credits on IMDb" opens in a new tab**, announced like the footer's socials (§7.6). Logged.
10. **Credits tie-break by title**, as `workOrder()` does (§6.2 says only "newest first"). **Role links carry the current passion state in their `href`,** so a Cmd-click opens exactly the combination the visitor would get. Logged.

## Experience & states

### Page order

1. Bar (Work `aria-current="page"`, SITE-1), skip link "Skip to the work".
2. **Header:**
   - H1 "Work"; beside it, as a sibling (never inside it), the count in `muted-foreground`: "{n} pieces" when unfiltered, "{m} of {n}" when any filter is on. `n = SHOWABLE_PROJECTS.length`.
   - **Filters** (hidden without JS, ruling 3): `<nav aria-label="Filter work">` with the role links **All · Directing · Camera · Editing** (Label step), then the chip **"Passion projects"**.
   - **Layout:** ≥1024 H1 and count left, filters right, one line · 768–1023 H1 and count, then the filters on the next line · <768 the role links on one line (they fit at 320 px with no horizontal scroll), then the chip on its own line.
   - **"Behind-the-scenes credits ↓"** under the header (Label, `--link`, the ↓ `aria-hidden`), linking to `#credits`. Rendered only when the credits section renders.
3. **Grid:** `workOrder()` mapped with SITE-3's `toFilm`, in `FilmGrid` with no leading cell; 1 / 2 / 4 columns at <768 / 768–1279 / ≥1280 (Home's breakpoints). The first poster is preloaded; the rest are lazy.
4. **"What I can't show you"** (h2 visible): a text block after the grid, max 60ch, no images. Renders only when `content/work.ts` holds its body (SITE-C; **Waiting** on Q12). Absent means no heading and no gap.
5. **Behind the scenes** (`<section id="credits">`, `scroll-margin-top` from `--bar-h`): h2, the context line when SITE-C has written it, the released credits (below), "Full credits on IMDb", then the **email hand-off** (`EmailHandOff`, the sentence when SITE-C has written it, otherwise the address alone). If no credit is released, the section and the jump link are absent and the hand-off still ends the page.
6. Footer.

### Filter controls

| Control | Markup | Default | Hover | Current / on | Focus |
|---|---|---|---|---|---|
| Role link | `<a href={siteRoutes.work({ role, passion })}>`; the current one has `aria-current="true"` | `muted-foreground` | bone | bone, 2 px `--link` underline | ring |
| Chip | `<button type="button" aria-pressed>`, 32 px visual box, 44 px hit area | hairline, `muted-foreground` | bone | `--link` text and hairline | ring |

- A **plain primary click** on a role link (the SITE-3 tile test: no Cmd, Ctrl, Shift or Alt) is intercepted and applies the filter; any other click opens the link's URL, which paints filtered in its new tab.
- **Activating the current role link** does nothing: no transition, no `replaceState`, no announcement.
- **Matching:** a film matches a role when its `roles` include it; the chip narrows to `lane === "passion"`. Both apply together. The order inside every filter is `workOrder()` (D-SITE-6).

### The before-paint mechanism (exact)

**Attributes (the contract):**
- `data-work-role` on `<html>`: `directing` | `camera` | `editing`; absent for All.
- `data-work-passion` on `<html>`: present (empty value) when the chip is on; absent otherwise.
- On the tiles (SITE-3's `FilmGrid` renders them): `data-roles="directing camera"` on each tile's `<li>`, and `data-lane="passion"` only on passion work.
- `data-work-grid` on the element wrapping the Work grid.
- `data-js` on `<html>` (SITE-3).

**1. The script** (extends `PRE_PAINT_SCRIPT` in `lib/pre-paint-script.ts`; the `(site)` layout already renders it before anything else in `<body>`). Built on the server from `siteRoutes.work()` and the role list in `lib/work-filter.ts`, it does, in order:
```js
(function () {
  var d = document.documentElement;
  d.setAttribute("data-js", "");
  if (location.pathname !== "/work") return;          // siteRoutes.work(), interpolated
  var q = new URLSearchParams(location.search), r = q.get("role");
  if (["directing", "camera", "editing"].indexOf(r) > -1) d.setAttribute("data-work-role", r);
  if (q.get("passion") === "1") d.setAttribute("data-work-passion", "");
})();
```
Unknown values are ignored: `?role=Camera`, `?role=sound` and `?passion=true` leave the page on All with the chip off. Nothing rewrites the URL on load.

**2. The CSS** (static; unlayered so it wins over Tailwind utilities). The tile rule, exactly:
```css
html[data-work-role="directing"] [data-work-grid] li[data-roles]:not([data-roles~="directing"]),
html[data-work-role="camera"]    [data-work-grid] li[data-roles]:not([data-roles~="camera"]),
html[data-work-role="editing"]   [data-work-grid] li[data-roles]:not([data-roles~="editing"]),
html[data-work-passion]          [data-work-grid] li[data-roles]:not([data-lane="passion"]) { display: none; }
```
`display: none` takes a tile out of the layout, the accessibility tree and the tab order at once; the panel's `<li>` has no `data-roles` and is never hidden. The same attributes select, by the same pattern:
- the **count variant**: the server renders one span per combination (`all`, `all+passion`, `directing`, `directing+passion`, `camera`, `camera+passion`, `editing`, `editing+passion`), each with its own precomputed "{n} pieces" or "{m} of {n}"; CSS shows only the one matching the attributes.
- the **empty line**: rendered only for combinations with zero matches (known at build), shown only for its combination.
- the **current role link's look** (`data-work-link="all|directing|camera|editing"`) and the **chip's on-look** (`data-work-chip`).
- without `data-js`, the whole filter nav is hidden (`data-needs-js`, SITE-3's rule).

**3. Hydration and mount sync** (`work-filters.tsx`): the filter state lives in a small module store (`work-filter-store.ts`, `useSyncExternalStore`, server snapshot = All, reset to All when the last subscriber leaves, as SITE-3's open-film store does). In a `useLayoutEffect` on mount, the leaf parses `location.search` with `parseWorkFilter` (the same rules as the script, from `lib/work-filter.ts`), writes both `<html>` attributes (a no-op after a cold load; the only thing that works after a client-side navigation, where the script didn't run), sets `data-js`, and sets the store. Because it's a layout effect, a client-side arrival is corrected before the browser paints. On unmount it removes `data-work-role` and `data-work-passion` (never `data-js`), so no other page inherits them.

**4. A change** (a role link, the chip, or "Show all"):
1. If the new filter equals the current one, stop.
2. `runTransition(update, "move")` (SITE-3), where `update` synchronously: calls `dismissFilm()` if a film is open (the panel and its iframe unmount; no focus or scroll work), writes the `<html>` attributes, and sets the store.
3. `window.history.replaceState(null, "", siteRoutes.work(next))`: `/work`, `/work?role=camera`, `/work?passion=1` or `/work?role=camera&passion=1`. No history entry is added; nothing reloads.
4. The status (visually hidden, `role="status"`, polite, empty until the first change) reads "Showing {m} of {n}", or "Showing all {n}" when unfiltered.
5. Focus: ruling 4. The scroll position is not restored.

Tiles that remain slide to their new places with the view transition (instant under reduced motion); only tiles visible after the change carry a `view-transition-name` (Vesper C4), so a leaving tile drops out with the page rather than flying.

**The canonical never carries the query:** metadata path `siteRoutes.work()`.

### The open film on Work

Exactly SITE-3's panel. The insertion point is worked out over **visible tiles only**: `WorkGrid` passes `FilmGrid` an `isVisible(film)` built from the store, so a panel opened under a filter lands after the last visible tile on its line, and a resize recomputes it the same way (Vesper B4). A filter change always closes it first (step 4.2), even when the open film would still match.

### Credits (`credits-list.tsx`, server)

- `RELEASED_CREDITS` (from `content/credits.ts`): `released: true` only, newest first, ties by title.
- Each entry: **Title (Year)**, then "· {format} · {network}" in `muted-foreground`. No cast, no posters, no role.
- Columns: 3 at ≥1024, 2 at 768–1023, 1 below.
- The first 18 in a list; the rest in `<details>` whose `<summary>` reads "All {n} credits" (`n` = all released credits, the 18 included) and doesn't change when open. The summary is a 44 px target with a visible focus ring. With 18 or fewer released credits there is no `<details>`.
- Then "Full credits on IMDb" (the IMDb URL from the socials in `content/site.ts`), `target="_blank" rel="noopener"`, with a hidden ", opens in a new tab". Then the email hand-off.
- Filters never touch this section.

### Text table (what this ticket renders, and from where)

| Element | Status (spec §6.2) | Rendered from |
|---|---|---|
| H1 "Work" | Locked | `content/work.ts` |
| Count "{n} pieces" / "{m} of {n}", filter labels, "Passion projects", "Behind-the-scenes credits ↓" | Locked | `content/work.ts` (count as functions); the jump link from `content/site.ts` (§7.6) |
| Status "Showing {m} of {n}" · "Showing all {n}" | Locked (§7.6) | `content/site.ts` |
| Empty line "No {role} passion projects yet." · "Show all" | Locked (§7.6) | `content/site.ts`; `{role}` is the lowercase role. With no role and the chip on (impossible with today's data), "No passion projects yet." |
| "What I can't show you" body | His words (cut), **Waiting** on Q12 | `content/work.ts`, empty until SITE-C: the section doesn't render |
| Behind the scenes H2 | Write | `content/work.ts`, default "Behind the scenes" (ruling 8) |
| Context line | Write | `content/work.ts`, a function of the released count, empty until SITE-C: not rendered |
| Credits entries | His words (data), **Waiting** on Q12 | `content/credits.ts` (ruling 7) |
| "All {n} credits" · "Full credits on IMDb" | Locked | `content/site.ts` (§7.6) |
| Email hand-off sentence | Write | `content/work.ts`, empty until SITE-C: the address renders alone |
| Meta description | Write | `content/work.ts`, empty until SITE-C: `SITE.description` |
| **Red phrase** | — | None. |

`content/work.ts` and `content/site.ts` import nothing from `@/lib/config` (client leaves import them).

### States (exhaustive)

- **All** (cold load of `/work`).
- **Filtered by role**, **chip on**, **both**: after a change, and on a cold load of the URL (right before first paint).
- **Filtered and empty:** the empty line, no frames, "Show all".
- **Panel open, then a filter changed:** the panel closes, focus stays on the control.
- **Panel open under a filter:** placed over visible tiles; re-placed on resize.
- **No JS:** every tile, "{n} pieces", no filter nav, the credits and `<details>` working, tile clicks navigating.
- **Client-side arrival** (the bar's Work link, Back, Forward): state from `location.search` before paint.
- **Unknown query values:** All, chip off.
- **Credits:** ≤18 released (no `<details>`) · >18 (`<details>` closed / open) · none released (no section, no jump link) · a find-in-page match inside the closed `<details>`.
- **Page strings missing** (SITE-C pending): can't-show absent, context line absent, the hand-off as the address alone, the fallback description.

### Failure / edge states

- **Script didn't run** (a client-side arrival from outside `(site)`, or script blocked): the mount sync writes the attributes before paint; the filter nav appears once the leaf mounts.
- **Clicking the bar's Work link while on `/work?role=camera`:** the page shows All and the URL is `/work` (acceptance 12).
- **Back after several filter changes:** leaves `/work` (they were replacements); a reload keeps the current filter.
- **Esc, the ✕ and all panel failure states:** SITE-3's.
- **A duplicate or malformed credit:** `content/validate.ts` fails the build with a message naming `content/credits.ts`, the entry and the fix.

## Non-negotiables (this slice)

- **`/work` stays one static page, and its HTML contains every showable tile.** No `searchParams` prop, no `useSearchParams`, no `headers()` or `cookies()`; filtering only hides.
- **A filtered cold load is right at first paint:** tiles, count, current link, chip, empty line. Nothing snaps after hydration.
- **One order:** `workOrder()`, the same inside every filter.
- **Changing a filter closes any open film, keeps focus on the control and doesn't restore the scroll position.**
- **Only released credits render, and nothing from the CV's header does:** no address, postcode, phone or personal email in any file or in the build.
- **SITE-3's components are consumed, not forked;** if one needs a change, change it there and re-check SITE-3's acceptance criteria.
- **"Hire" never reaches the page,** as text, label or attribute value.

If the spec would force a break of one of these, STOP and ask.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- **`content/credits.ts` (new):**
  ```ts
  export type Credit = Readonly<{
    title: string;          // as released
    year: number;
    format: "Feature" | "TV series" | "TV movie" | "Short";
    network: string;        // the studio, network or company, as his CV writes it
    released: boolean;      // only true renders
  }>;
  export const CREDITS: ReadonlyArray<Credit>;
  export const RELEASED_CREDITS: ReadonlyArray<Credit>; // released only; year desc, then title
  ```
  A top comment tells him how to add a credit and that an unreleased title stays `released: false` until it's out.
- **`content/work.ts` (new, ruling 8):** the H1, the count and filter labels, the chip label, the two h2 strings, and optional `cantShow`, `creditsContext(count)`, `handOff` and `description` (all empty until SITE-C).
- **`content/site.ts`:** add the §7.6 rows Work needs (status, empty line and "Show all", the credits strings, the jump link) beside SITE-3's `FILM_COPY`.

**How the 39 credits were derived (rules, for this ticket and for SITE-C):** source `docs/client/_direction/full-intake.md`, "Behind the scenes / EPK CV: Select Credits" (the list) and "IMDB: Camera and Electrical Department" (the check).
- **The list:** the CV's 39 Select Credits. Nothing from the CV's header (name, address, phone, email, URL) and no cast.
- **Title:** IMDb's title where the CV title differs ("titles as released"). Reconciled by matching cast and company: Godfrey → The Right One · Somebody's Someone → I Am Somebody's Child: The Regina Louise Story · Christmas Detour → A Christmas Detour · Dirk Gently → Dirk Gently's Holistic Detective Agency · The Babysitter's Club → The Baby-Sitters Club · Farming for Love Season 2 → Farming for Love · capitalization of Sonic the Hedgehog, The Art of Racing in the Rain and A Babysitter's Guide to Monster Hunting.
- **Year:** the year printed under his role in the IMDb paste (a film's release year; the year of his episode for a series). The CV's year where IMDb doesn't list the title.
- **Format:** IMDb's label: TV Series → "TV series"; TV Movie (the CV's "MOW") → "TV movie"; Short → "Short"; no label → "Feature". The CV's "TV Pilot" (The Republic of Sarah) is a series on IMDb.
- **Network:** the company after the format in the CV, as written.
- **Released:** `true` when the IMDb paste shows a user rating for the title; otherwise `false` (the scope sheet: unknowns are `false`).

| # | Title | Year | Format | Network | Released |
|---|---|---|---|---|---|
| 1 | Freaks: Underground | 2025 | Feature | Chloe Pictures Inc. | false |
| 2 | Protectors of the Land | 2025 | Feature | Potluck Stories Inc. | true |
| 3 | So Help Me Todd | 2023 | TV series | CBS | true |
| 4 | Farming for Love | 2024 | TV series | CTV | true |
| 5 | Festival of the Living Dead | 2024 | Feature | Living Dead Productions | true |
| 6 | Calamity Jane | 2024 | Feature | Calamity Productions Ltd. | true |
| 7 | Fire Country | 2023 | TV series | CBS | true |
| 8 | Real Love | 2022 | TV series | Lifetime | false |
| 9 | Balestra | 2024 | Feature | Automatik | true |
| 10 | Love Me | 2024 | Feature | Love Me Productions | true |
| 11 | The Bad Seed Returns | 2021 | TV movie | Lifetime | false |
| 12 | Monster High: The Movie | 2022 | TV movie | Paramount Plus / Nickelodeon | true |
| 13 | Batwoman | 2021 | TV series | CW | true |
| 14 | The Hardy Boys | 2020 | TV series | Hulu | true |
| 15 | The Good Doctor | 2019 | TV series | CTV | true |
| 16 | Zoey's Extraordinary Playlist | 2020 | TV series | NBC | true |
| 17 | A Babysitter's Guide to Monster Hunting | 2020 | Feature | Netflix | true |
| 18 | The Baby-Sitters Club | 2020 | TV series | Netflix | true |
| 19 | The Right One | 2021 | Feature | 10 x 10 Entertainment | true |
| 20 | A Christmas Detour | 2015 | TV movie | Hallmark | true |
| 21 | The Republic of Sarah | 2021 | TV series | CBS | true |
| 22 | Child's Play | 2018 | Feature | Orion Pictures | false |
| 23 | Sonic the Hedgehog | 2020 | Feature | Paramount Pictures | true |
| 24 | A Million Little Things | 2018 | TV series | ABC | true |
| 25 | Good Boys | 2019 | Feature | Good Universe | true |
| 26 | Legends of Tomorrow | 2018 | TV series | Warner Bros. Television | true |
| 27 | A Dog's Journey | 2019 | Feature | Universal Studios | true |
| 28 | The Art of Racing in the Rain | 2019 | Feature | Universal Studios | true |
| 29 | I Am Somebody's Child: The Regina Louise Story | 2019 | TV movie | Lifetime | true |
| 30 | Skyscraper | 2018 | Feature | Universal Studios | true |
| 31 | A Dog's Way Home | 2019 | Feature | Sony Pictures | true |
| 32 | Riverdale | 2017 | TV series | Warner / The CW Network | true |
| 33 | Supernatural | 2017 | TV series | Warner / The CW Network | true |
| 34 | A Series of Unfortunate Events | 2018 | TV series | Netflix | true |
| 35 | Freaks | 2018 | Feature | Freaks Productions | true |
| 36 | Mech-X4 | 2018 | TV series | Disney | true |
| 37 | The Miracle Season | 2018 | Feature | LD Entertainment | true |
| 38 | Descendants 2 | 2017 | TV movie | ABC/Disney | true |
| 39 | Dirk Gently's Holistic Detective Agency | 2016 | TV series | BBC America | true |

35 released. **Flagged for SITE-C (Q12), not resolved here:** the four `false` entries (Child's Play, The Bad Seed Returns and Real Love are likely out; Freaks: Underground may be IMDb's unrated "Freaks Part II" (2026)); A Christmas Detour's year (CV 2019, IMDb 2015); the two title reconciliations by cast (Godfrey, Somebody's Someone); IMDb-only EPK credits not on the CV (Snowpiercer, Electra Woman and Dyna Girl, Dead Rising: Watchtower and others); the Aubrey Plaza question (Child's Play is an EPK credit here; the names line is SITE-C's). The builder transcribes the table; it doesn't research titles.

**Placement** (Mason's call, build order scope sheet, with ruling 1 and the co-located additions it needs):
- `app/(site)/work/page.tsx` (server): metadata, header, count variants, the grid wrapper `data-work-grid`, the can't-show block, the credits section, the hand-off.
- `app/(site)/work/_components/work-filters.tsx` (client): role links, chip, status, mount sync, change handling.
- `app/(site)/work/_components/work-grid.tsx` (client, new): reads the store, renders SITE-3's `FilmGrid` with `isVisible`, and the empty-line variants with "Show all".
- `app/(site)/work/_components/work-filter-store.ts` (new): the module store and `useWorkFilter()`.
- `app/(site)/work/_components/credits-list.tsx` (server).
- `lib/work-filter.ts` (new, pure): the `WorkFilter` type, `parseWorkFilter(search)`, `matchesWorkFilter(film, filter)`, `workFilterKey(filter)` (`"camera+passion"`), and the role list the script string interpolates. It uses the role union SITE-1 typed for `siteRoutes.work`; don't add a third copy of it.
- `lib/pre-paint-script.ts`: extended as above.
- The filter CSS: an unlayered block in `app/globals.css`, or a stylesheet imported by the Work page (Dev's call); the selectors are fixed above.
- `content/credits.ts`, `content/work.ts` (new); `content/site.ts`, `content/validate.ts` (edited).

**Validators** (`content/validate.ts`, messages written for him and naming the file, the entry and the fix):
- every credit has a non-empty `title` and `network`;
- `year` is a whole number from 1990 to next year;
- no two credits share the same title and year ("content/credits.ts: "Love Me" (2024) is listed twice. Delete one of them.").

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).** The panel's mailto carries the film's title, as on Home.

## Accessibility

- **One h1.** Outline: h1 Work · h2 What I can't show you (when present) · h2 Behind the scenes (when present); the panel's title is an h2 inside its region (spec §3).
- **Filters are links and a toggle, not ARIA tabs:** `<nav aria-label="Filter work">`; `aria-current="true"` on the current role link; `aria-pressed` on the chip. Pre-hydration the visual state is CSS-driven; the ARIA state follows at mount (ruling 2).
- **Hidden tiles are out of the accessibility tree and the tab order** (`display: none`); Tab never lands on a filtered-out tile.
- **Announcements:** one polite status, empty until the first change, then "Showing {m} of {n}" or "Showing all {n}". No announcement on load, none for a no-op.
- **Focus:** stays on the control used (ruling 4); "Show all" hands it to "All"; the panel's own focus rules are SITE-3's.
- **Focus not obscured (2.4.11):** `#credits` and the panel carry `scroll-margin-top` from `--bar-h`; the jump link lands with the h2 clear of the bar.
- **Targets ≥44 px:** role links, chip, "Show all", the `<summary>`, "Full credits on IMDb", the jump link.
- **Decorative arrows** (↓) are `aria-hidden`; "Full credits on IMDb" announces ", opens in a new tab".
- **Reduced motion:** filter changes are instant.
- **320 px:** the role links fit on one line with no horizontal scroll.

## Acceptance criteria (observable — `yarn dev:agent` for the walk; `build:agent` + `start:agent` for static HTML and filmstrips; DevTools "Fast 4G" plus 4× CPU throttling for cold loads)

1. **All, at 1440:** H1 "Work" with "{n} pieces" beside it (`n` = `SHOWABLE_PROJECTS.length`) on the left and the filters on the right, on one line; "Behind-the-scenes credits ↓" beneath; the grid in `workOrder()` (the `FEATURED` films first, in order), 4 columns, no title cell.
2. **Static HTML:** fetching `/work?role=camera` from `start:agent` returns a document containing every showable tile's `href="/work/<slug>"`; every tile `<li>` has `data-roles`; `data-lane` appears only as `data-lane="passion"`; the string `hire` appears in no attribute value.
3. **No flash, cold load:** for `/work?role=camera`, `/work?passion=1` and `/work?role=directing&passion=1`, the Performance filmstrip's first painted frame already shows only matching tiles, the matching count ("{m} of {n}"), the current role link underlined and the chip's on-look where on; no later frame changes any of them; CLS is 0.
4. **From Home:** clicking "All camera work →" on `/` loads `/work?role=camera`, and its first painted frame shows only camera tiles (§6.1 seed). Same for "All directing →".
5. **Unknown values:** `/work?role=Camera`, `/work?role=sound` and `/work?passion=true` render All with the chip off and no console error.
6. **A change:** clicking Directing reflows the grid, changes the URL to `/work?role=directing` with no document request and no new history entry, announces "Showing {m} of {n}", and leaves focus on Directing. Toggling the chip adds `passion=1` and sets `aria-pressed="true"`. All returns the URL to `/work` and announces "Showing all {n}". Clicking the current link does nothing.
7. **Order:** under each role, the visible tiles are exactly `workOrder()` filtered to that role, in the same relative order.
8. **History:** after three changes, Back leaves `/work`; a reload keeps the current filter; Cmd-click on Camera opens `/work?role=camera` (with `&passion=1` if the chip is on) in a new tab, which paints filtered.
9. **Empty:** an empty combination (find one from the data, e.g. a role with the chip on) paints its empty line and no frames on a cold load and after a change; "Show all" returns to All, focus lands on "All", and the status reads "Showing all {n}".
10. **Film open, then a filter change** (mouse in Chrome and in Safari, then keyboard): the panel and its iframe are gone (audio stops), focus is on the control used, and `scrollY` isn't set back to where it was before the film opened.
11. **Panel under a filter:** with Camera on at 1440, opening the fifth visible tile places the panel after the eighth visible tile (the end of its four-column line; or after the last visible tile, if there are fewer); resizing to 900 (two columns) re-places it after the sixth visible tile. Hidden tiles never count toward a line.
12. **Client-side navigation:** on `/work?role=camera`, clicking the bar's Work link shows All, with the URL `/work`. Leaving `/work` for another page by the bar removes `data-work-role` and `data-work-passion` from `<html>`. Back to `/work?role=camera` paints filtered with no unfiltered frame.
13. **No JS:** every tile renders; the count reads "{n} pieces"; no role link and no chip are visible; the credits `<details>` opens by click; a tile click navigates to `/work/<slug>`.
14. **Credits:** the jump link lands on `#credits` with the h2 clear of the bar; the h2 reads "Behind the scenes"; the first entry reads "Protectors of the Land (2025) · Feature · Potluck Stories Inc."; 18 entries show, the 18th being "A Dog's Journey (2019)"; the summary reads "All 35 credits" open and closed; Child's Play, Real Love, The Bad Seed Returns and Freaks: Underground appear nowhere in the DOM; 3 / 2 / 1 columns at 1440 / 800 / 390; no filter changes this section.
15. **Find-in-page (Chrome):** with `<details>` closed, searching "Dirk Gently" opens it and highlights the entry.
16. **Ending:** "Full credits on IMDb" links to the IMDb URL in `content/site.ts`, opens a new tab, and announces it; the page's last content before the footer is the one email hand-off (the address alone while `content/work.ts` has no sentence). Exactly one hand-off on the page.
17. **Missing strings:** with `content/work.ts` as committed (SITE-C pending), no "What I can't show you" heading and no context line are in the DOM. With a local, uncommitted body and context line, both render (the block after the grid at ≤60ch, the context line with the released count); revert before committing and say so in the closing note.
18. **No credits:** with a local, uncommitted empty `CREDITS`, neither `#credits` nor the jump link is in the DOM and the hand-off still ends the page; revert.
19. **Validation:** a local, uncommitted duplicate credit fails `yarn build:agent` with a message naming `content/credits.ts` and the entry; revert.
20. **Privacy:** `grep -rEi "tisdall|v6p ?3m7|778\.238|238\.3555" content/ .next-build/` returns nothing (his street, postcode and phone, as the CV prints them).
21. **Metadata:** `<title>` is "Work — Kryshan Randel"; on `/work?role=camera` the canonical is `<SITE_URL>/work` with no query; the description is `SITE.description` until SITE-C.
22. **Static:** the `build:agent` route table lists `/work` as static (○); `app/(site)/work/` contains no `searchParams`, `useSearchParams`, `headers(` or `cookies(`. A cold load of `/work?role=camera&passion=1` logs no hydration warning.
23. **Widths:** at 1024+ one header line; at 800 H1 and count, then the filters; at 390 and 320 the role links on one line with no horizontal page scroll, the chip on the next line; every control's hit area is at least 44 px tall.
24. **Reduced motion (emulated):** filter changes are instant; the result is identical.
25. **Records:** DEVIATIONS lines for rulings 1 to 10; ruling 1 in `TECHNICAL-DECISIONS.md` as the next free `M-SITE-n`.
26. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/work` and `/` (the end tiles) via `yarn dev:agent` (never `yarn dev` or `yarn build`). Closing note in the ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Why a layout effect:** updates scheduled in `useLayoutEffect` flush before the browser paints, so a client-side arrival at a filtered URL is corrected invisibly. React 19 no longer warns about layout effects during server rendering.
- **Next and `replaceState`:** Next's docs (`node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`, "Native History API") use `window.history.replaceState(null, "", url)`; the router merges its own state and nothing remounts. Don't pass `history.state` by hand.
- **If acceptance 12 fails** (the page isn't remounted when the bar's Work link is clicked on a filtered URL), re-run the mount sync in a layout effect that runs after every render of the leaf, comparing `location.search` to the store.
- **Naming only the tiles visible after a change** can be done by setting a pending filter (one synchronous render that updates the names) just before starting the transition; the leaving tiles are then unnamed in the old snapshot.
- **The count variants** are eight short spans; generating both them and their CSS from `workFilterKey` keeps the two in step. `display: revert` (or `contents`) on the matching variant avoids fighting utility classes.
- **The script string:** build it with template literals from constants; don't `toString()` a function (minification).
- **`<details>` inside CSS columns:** two lists (the first 18, then the rest inside `<details>`) each in the same column classes read naturally; `break-inside: avoid` on entries.
- **Reuse `dismissFilm()`** inside the transition update rather than `closeFilm()`, which moves focus and scrolls.

## Dev's call

- Static CSS in `globals.css` or a stylesheet imported by the Work page, for the filter block.
- The count's type step (Caption or Lead) and exact gaps, within spec §4.1.
- `CSS columns` or a grid for the credits, as long as reading order is newest first.
- Internal names in the store and the leaves beyond those the tables fix.
- The mechanism for naming only visible-after tiles, as long as a leaving tile doesn't fly.

Real alternatives chosen here go to `TECHNICAL-DECISIONS.md`.

## Out of scope

- **Detail pages, next/previous (`workOrder()`, not the filter, D-SITE-26), `VideoObject`:** SITE-5.
- **The `/reel/` → `/work` redirect and the sitemap entry for `/work`:** SITE-5.
- **The can't-show body, the credits context line, the hand-off sentence, the meta description, confirming the credits list (Q12):** SITE-C.
- **Filter-aware Home rows or any change to Home:** none; Home is SITE-3's.
- **Any change to the tile, panel, grid or store beyond a defect fix:** SITE-3's components; a defect fix there re-checks SITE-3's criteria and gets a DEVIATIONS line.
- **The launch-tier validators (logline length, unique descriptions):** SITE-10.

## Depends on

- **SITE-3** — Complete in `PROGRESS.md` (the film components, `Film`, `dismissFilm`, `runTransition`, `email-hand-off.tsx`, `lib/pre-paint-script.ts` and the `data-js` rule; through it, SITE-2's `workOrder()` and `validate.ts` and SITE-1's `siteRoutes.work`).

## Recommended Claude Code execution

**Opus 5.5.** The page is small; the timing isn't. The whole value is in the ordering between the parser, the first paint, hydration and client-side navigation, and in the focus and panel edges of a filter change. Sonnet 5 will very likely reach for `useSearchParams` (which pulls the grid out of the static HTML) or sync state in a `useEffect` (which paints unfiltered first), and both pass `yarn verify`.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-4 — Work** (`docs/specs/03-site-build/SITE-4-work.md`). Model: **Opus 5.5**. **A filtered cold load is right at first paint, the page stays one static document with every tile in it, and a filter change closes any open film and leaves focus on the control.**
>
> Follow the kickoff contract in `docs/specs/README.md` verbatim. Read first, in order:
> 1. this ticket
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §3, §4.3, §5, §6.2, §7.6, §9, §11, §12 (D-SITE-4 to 7, 20)
> 3. `docs/specs/03-site-build/SITE-3-film-components-and-home.md` and its closing note (reuse, don't fork), then `components/composed/work/*`, `lib/pre-paint-script.ts`, `app/(site)/layout.tsx`
> 4. `lib/routes.ts`, `content/projects.ts`, `content/site.ts`, `content/validate.ts`
> 5. `docs/client/_direction/full-intake.md` lines ~211–300 (the EPK CV) and ~306–660 (the IMDb paste), for checking the credits table only
> 6. `AGENTS.md`, `docs/CONVENTIONS.md`, `docs/PERFORMANCE.md`
> 7. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints: routes only from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`; client leaves never import `@/lib/config`; no upward imports and nothing public imports `review/`; never read the query on the server; never copy the CV's address or phone; never run `yarn dev` or `yarn build` (use `dev:agent` / `build:agent`). If a non-negotiable would have to break, stop and ask.
>
> Close in three places: the ticket's `Status:` line, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (+ `TECHNICAL-DECISIONS.md` for ruling 1). Then tick `docs/specs/03-site-build/00-build-order.md`. Report what `yarn verify` printed.
