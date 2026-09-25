# SITE-4a — Work: "Arrange by" reorders by his role instead of hiding films

**Epic:** SITE — Kryshan Randel's live site · **Amends SITE-4 (Work)** · Size: M
**Status:** Complete (2026-09-25), built on the defaults of Q-A1 (reorder) and Q-A2 (Work only) at Taylor's instruction. His answers can reopen it.

**Slice type:** it changes how an existing, correctness-sensitive control behaves. SITE-4's hardest property was that a filtered cold load paints correctly with no flash. This ticket has to keep that property while changing the page's order instead of hiding tiles.

The failure modes:

- a flash of the default order
- visual order and focus order disagreeing after load
- the open-film panel landing on the wrong line
- a film missing from an arrangement

---

## Questions to him (sent 2026-09-25; the answers decide the shape)

| #    | Question                                                                                                           | Default if unanswered                                                      | What changes with the other answer                                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q-A1 | When you click "Camera": stay visible with the camera work first (reorder), or show only the camera work (filter)? | **Reorder.** His word was "rearrange", and it answers his crossover worry. | Filter: this ticket shrinks to a label change ("Arrange by" becomes "Show"), and SITE-4's behaviour stays.                                                                                                      |
| Q-A2 | Where: on Home above all the films, or on Work only?                                                               | **Work only.** It keeps Home short, and Work is where a producer browses.  | Home: Home's grid becomes every piece in `workOrder()` with the control above it, and Work keeps only the credits and "What I can't show you". The component is the same either way (the placement note below). |

## Outcome (on the defaults)

Work's role links become **"Arrange by: Featured · Directing · Camera · Editing"**.

- **Featured** is today's `workOrder()`.
- **Choosing a role** brings every film carrying that role to the front, in `workOrder()`, followed by every other film, in `workOrder()`.
- **Nothing is hidden, so the count never changes.** A film with three roles leads in all three arrangements.
- **The "Passion projects" chip still filters.** He didn't question it, and D-SITE-5 keeps it.
- **Arrangements are still URLs** (`/work?role=camera`), so the Home strand links, the legacy redirects (`LEGACY_PATHS`) and Cmd-click all keep working.

## Why

His words (2026-09-25): _"…there is an option to rearrange by position by clicking up 'directing' 'camera' or 'editing' up top? Maybe even the words 'arrange by' before?"_

"Position" means his job on the production, and "rearrange" means reorder. A filter hides a film's other roles from a visitor who is browsing by one role. A reorder shows the most relevant work first without the page claiming the rest isn't his.

## Rulings this slice makes (logged)

1. **D-SITE-5 is amended:** role links reorder; the passion chip filters. D-SITE-4's "hide before paint" becomes "arrange before paint". D-SITE-6 is unchanged: `workOrder()` still orders each group.
2. **The URL parameter stays `role`**, so every existing link and redirect lands on the matching arrangement. `lib/routes.ts` doesn't change.
3. **A quiet divider between the role's films and the rest.** A full-width hairline with a Label reading "The rest" `[PROVISIONAL — Vitrine; wording SITE-C]`, so a visitor can see where the camera work ends. It isn't drawn in Featured order.
4. **How it arranges before paint (M-SITE-8, TECHNICAL-DECISIONS):**
   - **Before hydration:** the pre-paint script already sets `data-work-role` on `<html>` from the URL. Static CSS gives matching tiles `order: -1`, and the divider `order: -1` after them. The first paint is arranged with no flash, from the same static HTML.
   - **After hydration:** CSS `order` alone would leave focus order and screen-reader order in the default sequence (WCAG 1.3.2, 2.4.3) and break the panel's line-walk (M-KR-6), which assumes DOM order is visual order. So a layout effect re-renders the grid with the films in arranged order, before the browser paints, and sets `data-work-arranged`, which switches the `order` rules off.
   - **The mismatch window:** the only time DOM and visual order disagree is between first paint and hydration, when nothing is focusable yet.
5. **Changing the arrangement** runs SITE-4's view transition. Tiles already carry `view-transition-name`, so they visibly move to their new places. In reduced motion there is no transition.
6. **The labels are Write strings for SITE-C,** and he approves them:
   - "Arrange by"
   - "Featured" (the default)
   - "The rest"
   - the announcement for each role, e.g. "Camera work first", replacing "Showing {m} of {n}" for roles

   `[PROVISIONAL — Cantor]`.

## What changes

| File                                                                  | Change                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/work-filter.ts`                                                  | `matchesWorkFilter`: the role no longer excludes; only `passion` does. Add `arrangeWork(films, role)`, which returns the role's films then the rest, each in input order. `WORK_FILTERS` drops the role × passion empty variants that can no longer occur. |
| `app/globals.css` (the Work filter block)                             | Replace the role hide rules with `order` rules scoped to `html[data-work-role=…]:not([data-work-arranged])`. The count rules keep only the passion variants.                                                                                               |
| `lib/pre-paint-script.ts`                                             | Unchanged attributes. Confirm `data-work-arranged` is never set by the script.                                                                                                                                                                             |
| `app/(site)/work/_components/work-grid.tsx`                           | Pass `films` through `arrangeWork` for the current role, and render the divider `<li>` (col-span-full, `aria-hidden` hairline with a visible Label) between the groups.                                                                                    |
| `…/work-filters.tsx`, `change-work-filter.ts`, `work-filter-store.ts` | The "Arrange by" lead-in label; "All" becomes "Featured". Set `data-work-arranged` after the arranged render. The `aria-live` announcement text changes. `aria-current` is unchanged.                                                                      |
| `components/composed/work/film-grid.tsx`                              | Probably nothing: it already walks `films` in the order it is given. Check that the divider `<li>` counts as a full line in `lineEnds` (span = columns).                                                                                                   |
| `content/work.ts`, `content/site.ts` (`WORK_COPY`)                    | The new labels. Remove the role empty lines (`empty(role)`), which can no longer happen; keep "No passion projects yet."                                                                                                                                   |
| `docs/client/kryshan-09-copy-for-approval.md`                         | New rows: W-6 ("Arrange by", "Featured"), W-7 ("The rest"), W-8 (the announcements).                                                                                                                                                                       |
| Records                                                               | DEVIATIONS for rulings 1–3, 5 and 6; TECHNICAL-DECISIONS M-SITE-8 for ruling 4; amendment notes on spec §6.2 and SITE-4.                                                                                                                                   |

**If Q-A2 is "on Home":** Home renders `WorkGrid` (every showable film) with the control above it, in place of `FilmGrid` over `FEATURED`. The pre-paint script's Work block runs on `/` too. Work keeps the credits and "What I can't show you". That adds about half a day, mostly to extend the pre-paint and CSS scope to `/`.

## Non-negotiables

- **No flash:** a cold load of `/work?role=camera` paints arranged, and the first frame's tile order equals the settled order (compare filmstrips, as SITE-4 did).
- **After hydration, DOM order equals visual order** in every arrangement, so keyboard focus moves through the tiles in the order you see them.
- **Every showable film appears in every arrangement.** The count is `SHOWABLE_PROJECTS.length` unless the passion chip is on.
- **The page stays static:** no searchParams read on the server.
- **Held and NDA'd films never appear.** `workOrder()` is still the only source.

## Acceptance

1. For each of Featured, Directing, Camera and Editing, cold and on change:
   - the tiles appear in `arrangeWork(workOrder(), role)` order
   - the divider sits between the groups (absent in Featured)
   - the count reads "{n} pieces"
2. With JavaScript off: the default order, and the control hidden (`data-needs-js`), as SITE-4.
3. After load, Tab moves through tiles in visual order in every arrangement, checked at 1440 (4 columns) and 390 (1 column).
4. Opening a film after an arrangement change places the panel under the tapped tile's line, at 1440, 768 and 390.
5. Passion chip plus a role: only passion films, arranged by the role. The empty line appears only if no passion films exist.
6. `/work?role=camera` from a legacy redirect and from Home's Camera strand link lands arranged.
7. Reduced motion: the arrangement changes with no animation.
8. `yarn verify` passes. Walk at 1440, 768 and 390 plus reduced motion. Record the runtime checks the hidden pane can't do (the filmstrip frames, Safari) on Taylor's list.

## Depends on

- SITE-4 (Complete) and SITE-3a (Home's strand links point here).
- **His answers to Q-A1 and Q-A2,** or Taylor's call to build on the defaults.

## Out of scope

- The passion chip's behaviour.
- Ordering inside a group by how central the role was (e.g. Director before Co-director). `roles` has no weighting, and adding one is a field change (SITE-2).
- Changes to detail pages: next and previous still follow `workOrder()` (D-SITE-26).

---

### Closing note (2026-09-25)

**Built:**

- `lib/work-filter.ts`: `arrangeWork`; `matchesWorkFilter` is passion-only.
- `components/composed/work/film-grid.tsx`: an optional `divider`, walked as a full line by the slug-based `lastOnLine`.
- `app/(site)/work/_components/work-grid.tsx`: renders `[...first, ...rest]` and "The rest", and sets `data-work-arranged` in a layout effect.
- `change-work-filter.ts`: announces the order for a role change and the count for a passion change; `clearWorkAttributes` also clears `data-work-arranged`.
- `work-filters.tsx`: "Arrange by" and "Featured".
- `work-filter-store.ts`: doc comment only.
- `app/(site)/work/page.tsx`: the count shows "{m} of {n}" only with passion on.
- `app/globals.css`: role hide rules replaced by pre-hydration `order` rules.
- `content/work.ts`: `WORK.arrange` and the new labels.
- M-SITE-8 in TECHNICAL-DECISIONS.

**Acceptance:**

1. Cold loads:
   - After hydration, `?role=camera` gives the 13 camera films, then the divider, then the 9 others, and the count reads "22 pieces".
   - Before hydration (static HTML with scripts disabled), the visual order equals the settled order for directing, camera and editing at 1440, 768 and 390 (9 of 9).
2. With JavaScript off: the server HTML is in `workOrder()` with the divider not displayed. The controls are hidden by `data-needs-js`, as before.
3. Tab order follows DOM order, which is the arrangement. Checked around the divider: rffc → Just Watch Us → Contact Club.
4. Panel placement at 1440 with Camera:
   - Born To Be places after A Dog's Way Home, at the end of line 2.
   - RFFC, alone on its line, places before the divider.
   - Just Watch Us places after the Wolf.
5. Directing + Passion shows 6 of 22, "Showing 6 of 22" is announced, and the divider is hidden (every passion film is directing).
6. `/work?role=…` is the same URL legacy redirects and Home's strand links use.
7. Reduced motion: this ticket adds no motion of its own; the change uses SITE-4's `runTransition`, which already respects it.
8. `yarn verify` exit 0.

**Walk:**

- `/work` at 1440, 768 and 390: no overflow. At 390, "Arrange by" wraps to its own line above the links.
- Switching arrangements changes the URL (`?role=directing`, then `…&passion=1`, then no query) and sets `aria-current`.
- Focus stays on the link used. The status reads "Directing first", "Showing 6 of 22", "Featured order".

**Runtime checks for Taylor** (the hidden pane stalls view transitions and `ResizeObserver`):

- the tiles visibly moving on an arrangement change
- a cold arranged load filmstrip in a real window
- panel re-placement on resize with the divider shown

**Records:** DEVIATIONS (four SITE-4a lines), M-SITE-8, approval-document rows W-6 to W-8.
