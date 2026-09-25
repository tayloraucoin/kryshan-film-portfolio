# SITE-3a — Home: the role rows come out, and the three role paragraphs go back to the bottom

**Epic:** SITE — Kryshan Randel's live site · **Amends SITE-3 (Home)** · Size: S
**Status:** Complete (2026-09-25)

**Slice type:** a Home layout change on existing parts. Nothing new is built. The risk is small: a dangling link, an orphaned component, or a validator still checking lists that no longer exist.

---

## Outcome

Home stops sorting his films by role. It shows:

- the title cell and the featured grid, as today
- "All {n} pieces →"
- his three role paragraphs (Directing · Camera and editing · Teaching) side by side at the bottom, as in Demo A
- the footer

The Directing row and the Camera and editing row are gone, along with their end tiles.

## Why

His words on Demo D (via Taylor, 2026-09-25): _"Not sure about dividing up directing camera and editing especially since there is so much crossover between projects… And keeping the longer descriptions at the bottom like the previous version."_

- **The crossover problem is real.** A film sits in one row only, by its first credit. Born To Be (Director / Camera / Co-editor) shows under Directing alone, so a producer browsing camera work never sees that he shot it. Dare, Just Up The Block and Lyons Heart have the same problem.
- **"The previous version" is Demo A.** Its three strands sat as a three-column text block under the grid (`review/mocks/home-a.tsx`, `Strands()`).
- **This reverses D-KRD-13** (Demo D handoff §6.6, KR-9). The rows were added in answer to his round-one "Netflix" and "too much text". He has now seen them and asked for the text back.

## Rulings this slice makes (logged)

1. **D-KRD-13 is reversed on the live site.**
   - Home has no role rows.
   - The review layer's Demo D keeps its rows until SITE-9 deletes it, because it is what he reviewed.
2. **The strands block follows Demo A, with production links:**
   - three columns at ≥1280 and stacked below that, each with a hairline above
   - each is an h2, the strand body in muted text, and one link:
     - Directing → `/work?role=directing`
     - Camera and editing → `/work?role=camera`
     - Teaching → `/teaching`
   - The link labels are the Locked `HOME_LINKS` strings; "All directing" and "All camera work" stay true under SITE-4a.
3. **Section order:** featured grid → "All {n} pieces →" → strands → footer.
   - The link to every piece sits directly under the films, where the eye leaves the grid. The descriptions come last, as he asked.
   - `[PROVISIONAL — Vitrine]`.
4. **Home's film count drops from 20 to 6** (the featured grid only).
   - That is the cost of taking the rows out. "All {n} pieces →" carries the rest.
   - If his answer to question 2 (below) is "on Home", SITE-4a changes this: Home shows every piece.

## What changes

| File                                          | Change                                                                                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/(site)/page.tsx`                         | Remove both `FilmRow`s and the separate Teaching section. Add the three-strand block, ported from Demo A's `Strands()` with real links and `aria-labelledby` per strand. Update the component's doc comment. |
| `content/home.ts`                             | Delete `DIRECTING_ROW` and `CAMERA_ROW`, and their comment and fallback notes. The Directors Reel fallback note loses its "Born To Be leads the Directing row" clause.                                       |
| `content/projects.ts`                         | The Directors Reel comment drops "and Born To Be back in DIRECTING_ROW".                                                                                                                                     |
| `content/validate.ts`                         | Remove the row checks (`["DIRECTING_ROW", …]`, `["CAMERA_ROW", …]`) and the import. `FEATURED` checks stay.                                                                                                  |
| `components/composed/work/film-row.tsx`       | Delete it. Only Home imports it; the review layer has its own copy under `review/mocks/_components/home-d/`.                                                                                                 |
| `content/site.ts`                             | Nothing changes: `STRANDS` keeps the same strings, in a new place.                                                                                                                                           |
| `docs/client/kryshan-09-copy-for-approval.md` | H-2 and H-3 read "Where it shows: the bottom of Home, under 'Directing'" (and "under 'Camera and editing'"). The text is unchanged. Regenerate the document.                                                 |
| Spec §6.1 and the records                     | A DEVIATIONS line per ruling. §6.1's section list gets an amendment note; the spec stays as authored.                                                                                                        |

## Non-negotiables

- Static, no client JavaScript added. The strands are server-rendered text.
- The Teaching strand keeps its O-SITE-5 fallback (no second school).
- The review layer is not touched.
- No hex outside `brand/`; routes only from `lib/routes.ts`.

## Acceptance

1. `/` has no element with `id="directing"` or `id="camera-editing"`, and no end tiles.
2. The three strands render after "All {n} pieces →", in a row at 1440 and stacked at 768 and 390. Each strand's link goes where ruling 2 says.
3. `grep -rn "DIRECTING_ROW\|CAMERA_ROW" app components content lib` returns nothing (the review layer's own copies are allowed).
4. `film-row.tsx` is gone, and `grep -rn "work/film-row" app components` is empty.
5. The approval document's H-2 and H-3 rows describe the new place.
6. `yarn verify` passes. Browser walk of `/` at 1440, 768 and 390 and in reduced motion, with no horizontal overflow and a CLS of 0.

## Depends on

SITE-3 (Complete). It does not wait on his answers.

## Out of scope

The "arrange by" control (SITE-4a) and any change to Work.

---

### Closing note (2026-09-25)

- **Built as scoped.**
  - `app/(site)/page.tsx`: the rows are gone. A `STRAND_LINKS` map sends Directing to `/work?role=directing`, Camera and editing to `/work?role=camera`, and Teaching to `/teaching`.
  - `content/home.ts`: the row lists and their comments are removed.
  - `content/validate.ts`: `HOME_LISTS` is `FEATURED` only.
  - `content/projects.ts`: the Directors Reel comment is updated.
  - `components/composed/work/film-row.tsx` is deleted.
- **Acceptance.**
  - 1–4: no `#directing` or `#camera-editing`; the strands come after "All 22 pieces →", three across at 1440 and stacked at 768 and 390; `grep` for the row lists in `app components content lib` is empty; `work/film-row` has no importers.
  - 5: the approval document is regenerated; H-2 to H-4 now read "the bottom of the home page". The text is unchanged.
  - 6: `yarn verify` exit 0 (lint zero warnings, types, 32 static pages).
- **Walk.** `/` at 1440, 768 and 390: no horizontal overflow. No motion was added.
- **Records.** DEVIATIONS: three SITE-3a lines.
