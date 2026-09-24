# KR-8 — Demo D's home, revised: name once, a bar that stays, the film opens full width below where you tapped, an ✕ you can see

**Epic:** KR — Kryshan Randel, review layer · **Track:** `02-review-demo-d/` · Size: L
**Slice type:** interaction build on a client-facing demo. The risks are:
- a second expansion grammar
- focus lost on open or close
- a control over the video
- a dead link read as a live one
- A changing by accident

**Status:** Not started

---

## Outcome

Demo D (`/review/mocks/home-d/kryshan-d`) becomes Layout A after Kryshan's review:
- His name appears once, in a bar that stays at the top. On phones the name and Contact stay; Work, About and Teaching scroll away.
- A wider first square holds his own line, with "hard to look away from." in red, and his roles.
- Six films follow.
- Tapping a film leaves the tile in place, marked, and opens the film **full width on the line below that tile's row**, playing, with an ✕ in a strip above it. On phones the film replaces the tile.
- Every film shows *kind · year · role*. A tile is never blank. Mouse and trackpad users see a play mark on playable films.
- The panel holds the player, the credits and his email on its own line: no "Full page", no Close text.
- Every link to a page the demo doesn't have says so in one line and never moves the page.
- Layout D's brief and markdown now describe D.

The three text strands stay as A has them until KR-9.

## Why / intent

- **`demo-d-ux-handoff-v1.md`**: this slice builds D-KRD-3 to 12, 14, 15, 19 and 20, per §6.1–§6.5, §6.7, §6.8, §7–§12, and Appendices A and B (KR-8 wording).
- **His words** (`docs/client/_direction/review-stage-feedback.md`):
  - "My name twice"
  - "the 'close' button … harder to see right away, maybe just an 'x' instead?"
  - "the 'full page' linking to my email … if videos go full screen it might not be needed? Looks too noisy/crowded"
  - "a few more elements to borrow from what Netflix does so well, but only in the spirit of keeping things simple and fast"
- **What this slice is NOT (binding):**
  - no rows (KR-9)
  - no change to any file A imports
  - no new dependency
  - no hover previews, banner, autoplay or looping motion (D-KRD-14)

**Rulings this slice makes (labelled, logged):**

- **The jawbone replaces A's 2×2 expansion (D-KRD-6).**
  - The insertion point is computed from the grid's live column count by walking the items in DOM order (the title cell spans 2 when there are two or more columns). It is never computed with `grid-auto-flow: dense`, so visual order equals DOM order.
  - This goes to `TECHNICAL-DECISIONS.md` as **M-KR-6**.
- **One open film per page, held in a module-level store** read with `useSyncExternalStore`. No provider. KR-9's rows share it.
- **Blur placeholders come from D-only static imports of the posters** in `review/mocks/_components/home-d/posters.ts`. `content/projects.ts` keeps its shape, so A renders unchanged.

## Experience & states

**Everything in handoff §6 and §8 applies, and wins where this summary differs.** In short:

**Top bar:**
- Sticky under the review bar (`top: var(--review-bar-h, 0px)`), solid `background`, with a `border/40` hairline once the page has scrolled 8 px (CSS scroll timeline; always shown where that's unsupported).
- At ≥768: one 56 px line holding the wordmark and Work · About · Teaching · Contact.
- Below 768: a 44 px sticky line (wordmark · Contact) and a non-sticky row beneath it (Work · About · Teaching).
- The wordmark links to the top of the page. The nav items are unbuilt links.

**Title cell:**
- H1 "I direct, shoot and edit stories that are **hard to look away from.**" (the phrase in `primary`), then the roles and place line, and "Watch ↓" below 768.
- Spans 2 columns from 768 up.

**Films, in order:** `just-watch-us`, `directors-reel`, `jack`, `5rhythms`, `the-wolf-of-west-georgia-street`, `just-up-the-block`.

**Tile states:**
- default
- hover (fine pointer): hairline full, title lifts, meta and play glyph fade in
- focus-visible
- open: 2 px `--link` rule, no glyph, `aria-expanded`
- image loading: blur
- image failed: `card` with its title
- coarse pointer: meta always on, no glyph
- hidden: below 768, while its film is open

**Panel:**
- ✕ strip (44 px, SVG ✕, "Close {title}"), then player and meta: side by side at ≥1280 (meta ≥320 px), stacked below that.
- Meta order: title (h2), kind · year · role, "Passion project" or client, story if any, awards if any, then the email alone, last.
- The player's height is capped so it fits under both bars.

**Behaviour:**

| Action | Result |
|---|---|
| Tap a tile | Opens its film. |
| The same tile again | Closes. |
| A tile on the same visual line | Swaps the panel's content (150 ms crossfade). |
| A tile elsewhere | Moves the panel to that tile's line. |
| ✕, or Esc while focus is on the page | Closes. |
| Resize | The panel re-places itself. |

**Open:**
- Focus moves to the panel.
- After the transition, the page scrolls so the player sits under the bars, but only if it isn't already fully visible.

**Close:**
- The iframe unmounts.
- Focus returns to the tile.
- The page scrolls back to where it was if the visitor hasn't scrolled since; otherwise the tile is scrolled into view.

**Unbuilt links:**
- `aria-disabled`, with a toast: "That page isn't built yet. This demo is the home page."
- They never scroll or navigate.
- This covers the nav, the strand links and "All 27 pieces →".

**Reduced motion:** every change is instant; no smooth scroll.

**Failure / edge states:**
- Poster fails to load: `card` background with the title (never blank).
- Autoplay blocked by the browser: the provider's own play button shows, and we add none of ours.
- Link-out or pending pieces: none are in D's six. If one is added, `ProjectPlayer`'s existing states apply (D-KRD-20).

## Non-negotiables (this slice)

- **No iframe, player script or video-host request before a tap.**
- **Nothing over the video.** The ✕ lives in the strip above the player.
- **His name appears once** in the page's text (the wordmark). **"For hire" and "Full page" appear nowhere**, including accessible names.
- **One grammar:** the film always opens on the line below its tile's row, never reordering tiles.
- **A is untouched**, as KR-7 defines it.

## Content and media

**Content files:**
- `content/projects.ts` gains an exported `projectMetaLine(project)` (kind · year · roleLabel). It is additive; A doesn't call it.
- Layout D's `brief` becomes handoff Appendix A, with KR-8's wording: no rows sentences.

**Media:**
- Static imports of the six featured posters from `public/media/posters/`, for blur.
- The Directors Reel keeps its "Frame to be replaced" ribbon (handoff O-3).

## Placement

- `review/mocks/home-d.tsx`
- New client leaves in `review/mocks/_components/home-d/`, each a new file, none imported by A:
  - `featured-grid.tsx` (replaces the KR-7 copy `expanding-grid.tsx`, which is deleted)
  - `film-tile.tsx`
  - `film-panel.tsx`
  - `open-film.ts` (store and open/close orchestration)
  - `transition.ts` (D's view-transition runner, reusing `prefersReducedMotion` from the shared helper)
  - `unbuilt-link.tsx`
  - `posters.ts`
- The top bar is a server component inside `home-d.tsx`.
- `review/layouts/index.ts` (D's brief)
- `review/layouts/kryshan-d.md` (handoff Appendix B edits)
- `content/projects.ts` (`projectMetaLine`)
- `docs/specs/TECHNICAL-DECISIONS.md` (M-KR-6)

## Accessibility

Handoff §10, including:
- One h1. The wordmark's accessible name is "Kryshan Randel, back to top".
- Focus not obscured by the two sticky bars: `html { scroll-padding-top }` and the panel's `scroll-margin-top` are both set from `--review-bar-h` + `--demo-bar-h`.
- Targets at least 44 px.
- `aria-expanded` and `aria-controls` on the tiles.
- The panel is a `role="region"` labelled by its title.
- The Esc caveat inside the cross-origin iframe is documented; the ✕ is reachable by Shift+Tab from the player.
- Toasts are polite.

## Performance

- CLS 0: every frame reserves 16:9.
- Only the first poster has `preload`; the rest are lazy.
- Blur data is inline (six posters now).
- Transitions are CSS view transitions only.
- No video-host request on a cold load.

## Acceptance criteria (observable)

1. **At 1440:**
   - The page reads bar, then `[his line (2 columns) · Just Watch Us · Directors Reel]`, then `[Jack · 5Rhythms · Wolf · Just Up The Block]`, then the three strands, "All 27 pieces →", and the footer.
   - Tapping Jack opens a full-width panel below the second line, playing, with the ✕ above the player and Jack's tile still in place and marked.
   - Tapping 5Rhythms swaps the panel in place. Tapping Just Watch Us moves it below the first line.
2. **At 390:** the bar line (name · Contact), the nav row, his line and the whole first poster are visible on load. Tapping the poster replaces it with the playing film and a visible ✕. ✕ restores the tile and returns focus to it.
3. **Keyboard:**
   - Tab reaches every tile. Enter opens and focus lands on the panel. Tab then reaches the ✕, the player and the email.
   - Esc (with focus outside the player) closes, and focus returns to the tile.
   - No focused element is hidden under either bar.
4. Rendered text contains "Kryshan Randel" exactly once (the wordmark). "For hire" and "Full page" appear nowhere in the DOM or in `aria-label`s. Every tile's meta reads kind · year · role.
5. Clicking Work, About, Teaching, Contact, a strand link or "All 27 pieces →" shows the toast and leaves `scrollY` unchanged.
6. **Network, cold load:** no request to YouTube or Vimeo. **Throttled load:** no blank tile. **Layout:** no shift.
7. With reduced motion emulated, open, close and swap are instant and the layouts are identical.
8. Demo A still renders exactly as before (KR-7's check #3 still holds).
9. `yarn verify` passes. **M-KR-6** is logged.

## Out of scope

- **Rows, and the Teaching strand standing alone:** KR-9.
- **Real pages, detail pages, links on tiles:** handoff Appendix D, the real build.
- **A custom "player won't load" state or loading spinner** on top of `ProjectPlayer`: that would mean editing a component A shares. If it's wanted, it's a later ticket.

## Depends on

- **KR-7** — Complete in `PROGRESS.md`.

---

### Kickoff (paste into the session)

> Build **KR-8 — Demo D's home, revised** (`docs/specs/02-review-demo-d/KR-8-demo-d-home-revised.md`). **One grammar: the film opens full width on the line below where it was tapped, and nothing sits over the video.**
> Read first, in order:
> 1. this spec
> 2. `demo-d-ux-handoff-v1.md` (all of §6–§12, Appendices A and B)
> 3. `docs/specs/README.md`
> 4. `docs/CONVENTIONS.md`
> 5. `docs/PERFORMANCE.md`
> 6. `TECHNICAL-DECISIONS.md` M-KR-1 and M-KR-3
> 7. `DEVIATIONS.md`
>
> Close in three places. Run `yarn verify`.
