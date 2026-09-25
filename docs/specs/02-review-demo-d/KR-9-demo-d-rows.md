# KR-9 — Demo D's rows: Directing, and Camera and editing, to swipe across

**Epic:** KR — Kryshan Randel, review layer · **Track:** `02-review-demo-d/` · Size: M
**Slice type:** one Netflix borrowing, built as its own ticket so it can be cut. The risks:
- a horizontal scroller nobody notices on desktop
- keyboard focus lost inside a clipped track
- Home turning into the archive

**Status:** Complete (2026-09-24)

---

## Outcome

Below Demo D's six films, two curated rows replace A's Directing and Camera and editing strands. Each row shows its heading and the strand's one line as a caption, then films you swipe or scroll across:
- 4.5 visible at ≥1280, 2.5 at 768–1279, and one plus a 15% peek on a phone
- arrows in the row header for mouse and trackpad users, shown only when there is more to see

A film in a row opens exactly as in the grid: full width, directly beneath that row, with the same panel, ✕, email line and close behaviour, and the same one-film-per-page rule. The Teaching strand stays as text on its own. Layout D's brief gains its rows sentences.

## Why / intent

- **`demo-d-ux-handoff-v1.md`**: this slice builds D-KRD-13, per §6.6, §7 and §8, and Appendix A's `[KR-9]` wording.
- **Taylor, 2026-09-24:** "Include, own ticket."
- **His intake:** "Able to scroll either down or across to see it all."
- **His dislikes:** "too much text".
- **What this slice is NOT (binding):**
  - no "All directing →" end tile (a dead link in the demo)
  - no autoplay or auto-advance
  - no film already in the featured grid
  - no change to KR-8's panel behaviour

**Rulings this slice makes (labelled, logged):**

- **Row lists are explicit and curated in `home-d.tsx`**, not computed. The rules that produced them (handoff §6.6) govern later edits.
- **Below 768 a row's panel sits beneath the row and the tile stays in the track.** The track can't give up a tile the way the grid does.

## Experience & states

**Row films, in this order:**
- **Directing:** `contact-club`, `born-to-be`, `a-very-bc-production`, `dare`, `its-a-crazier-life`, `be-reel-green`, `artless`, `united8s`.
- **Camera and editing:** `riverdale-ew-bts`, `a-dogs-way-home-epk`, `tuts-2026-trailer`, `tuts-2025-season-teaser`, `tradeswoman-exhibit`, `digital-days`, `rffc-were-in-this-together`.

**Header:**
- H2 (kit A's H2 step) with the caption beneath (`STRANDS[].body`, `muted-foreground`, max 60ch).
- The arrow pair on the right, only on pointer devices at ≥768.

**Track:** scroll-snap, the KR-8 tile at the widths above, `scroll-padding-inline` equal to the gutter, no scrollbar on fine pointers.

**Arrows:**
- 44 × 44 bone chevrons on a `card` plate, hover `--link`.
- Hidden at their own end, and absent when the row fits.
- `aria-hidden`, `tabindex="-1"`.
- One click scrolls one page (smooth, instant under reduced motion).

**States:**
- **Row:** overflowing · fits · at start · at end · focus-within (the focused tile is scrolled fully into view) · empty (not rendered).
- **Tile:** all of KR-8's.

**Opening from a row:**
- The panel appears directly beneath the row's track, full content width.
- The row keeps its scroll position.
- Any film open elsewhere on the page closes.
- Swapping between two films in the same row crossfades in place.

## Non-negotiables (this slice)

- **No video before a tap; every row poster is lazy.**
- **Nothing in the rows is a dead link.**
- **The tile, panel, store and close behaviour are KR-8's, reused.** There is no second implementation.

## Content and media

**Content files:** none new. Captions come from `STRANDS` in `content/site.ts`.
**Media:** static imports for the fifteen row posters are added to `review/mocks/_components/home-d/posters.ts`.

## Placement

- `review/mocks/home-d.tsx` (row lists; the Teaching strand alone)
- `review/mocks/_components/home-d/film-row.tsx` (new)
- `review/mocks/_components/home-d/posters.ts`
- `review/layouts/index.ts` (D's brief: the fourth `because` item and the KR-9 `givesUp`)

## Accessibility

- Each row is a `<section aria-labelledby>` its heading, and its track is a `<ul>`.
- Tab walks every tile; the arrows duplicate scrolling and are hidden from assistive tech.
- A focused tile is never clipped by the track or hidden under the bars.

## Performance

- All fifteen row posters are lazy, with blur placeholders.
- No JS runs on scroll beyond the arrow visibility check (a passive listener plus `ResizeObserver`).

## Acceptance criteria (observable)

1. At 1440, the two rows show the listed films in the listed order, 4.5 tiles visible, arrows present. Clicking → scrolls one page; ← appears.
2. At 390, the rows swipe with a peek of the next tile and show no arrows.
3. Tapping Dare opens its film beneath the Directing row. Tapping Digital Days closes Dare and opens beneath the Camera and editing row. Tapping Jack in the grid closes that and opens beneath the grid's second line.
4. Tab from the last grid tile walks every row tile in order; each is fully visible when focused.
5. The Teaching strand appears alone, after the rows; the Directing and Camera and editing strands are gone.
6. Layout D's brief shows the Netflix `because` line and the KR-9 `givesUp`.
7. No request to YouTube or Vimeo on a cold load; no blank tile on a throttled load.
8. `yarn verify` passes.

## Out of scope

- **End tiles linking to filtered Work:** the real build (handoff Appendix D).

## Depends on

- **KR-8** — Complete in `PROGRESS.md`.

---

### Kickoff (paste into the session)

> Build **KR-9 — Demo D's rows** (`docs/specs/02-review-demo-d/KR-9-demo-d-rows.md`). **Reuse KR-8's tile, panel and store; the rows add a track and nothing else.**
> Read first, in order:
> 1. this spec
> 2. `demo-d-ux-handoff-v1.md` §6.5–§6.6, §8, Appendix A
> 3. `docs/specs/README.md`
> 4. `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`
>
> Close in three places. Run `yarn verify`.

---

## Closing note

**What shipped:**
- `review/mocks/_components/home-d/film-row.tsx`: header with arrows, scroll-snap track, and the same `FilmTile`, `FilmPanel` and open-film store as the grid.
- Fifteen more static poster imports.
- The two curated rows in `home-d.tsx`, and the Teaching strand on its own.
- Layout D's brief gains the Netflix `because` line and the KR-9 `givesUp`.

**Walk at 1440:**
- The rows hold 8 and 7 films in the listed order, 4.5 tiles visible.
- ← is hidden at the start; → scrolls 1081 px and ← appears.
- Dare opens beneath the Directing row, and the row keeps its scroll position. Contact Club swaps in place.
- Digital Days moves the panel beneath the Camera and editing row. Jack moves it back into the grid (after its line).
- ✕ closes. Exactly one panel is open at any time.
- All 15 row tiles are fully visible when focused, walking forwards and backwards.

**Walk at 390:**
- Tile 311 px in a 390 px track (a peek of the next tile), no arrows.
- No request to a video host on a cold load.

**Verify:** `CONTACT_EMAIL=kryshanrandel@gmail.com yarn verify` passes. No diff to A's files.

**For the next thread:** Demo D is complete behind the gate. Before it is sent:
- `CONTACT_EMAIL` must be set in Vercel.
- Taylor decides on a round 2 (handoff O-7).
