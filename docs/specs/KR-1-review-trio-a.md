# KR-1 — Review trio A: kit A, layout A ("The Marquee"), mock home A

**Epic:** KR — Kryshan Randel, Phase 1 review round · **Phase 1** · Size: L
**Slice type:** review assets from approved deliverables; risks are invented facts, uncleared media, and a mock that drifts from its layout.

**Status:** Complete (2026-09-22)

---

## Outcome

Behind the gate, `/review/kits/kryshan-a`, `/review/layouts/kryshan-a` and `/review/mocks/home-a` render kit A as a live style page, layout A's markdown verbatim inside kit A's scope, and a Home-only mock built to `kryshan-06-layout-A.md` §4 and §6 with his real titles, posters and copy. `/review` lists the trio. Also creates the shared client content (`content/site.ts`, `content/projects.ts`) and wires the 27 posters already in `public/media/posters/` (see `docs/client/project-images/MANIFEST.md`; three are `posterStatus: "replace"`, six mappings are marked *likely* and must be confirmed). This slice builds Home only: no Work, About, Teaching, Credits or Contact pages.

## Why / intent

- **`docs/client/prompts/kryshan-07-cc-prompt-A.md`** — the deliverable-by-deliverable brief. It is the spec for this ticket; this file carries the acceptance criteria and the records. Where the prompt and the repo's types or docs disagree, the repo wins and the divergence is one `DEVIATIONS.md` line.
- **`docs/client/branding/kryshan-05-tokens.json → A`** — the only source of colour values. No hex outside `review/kits/`.
- **`docs/client/kryshan-06-layout-A.md`** — the layout; copied verbatim, never rewritten.
- **`docs/client/kryshan-03-copy-and-voice.md` §8** and **`kryshan-02-success-criteria.md` §3.5, §10** — every string and every fact. Nothing invented.
- **What this slice is NOT (binding):** not the production kit (`brand/production.ts` stays `null`); not a page other than Home; not a place for the PDF (`docs/client/branding/` only, never `public/`).

## Experience & states

Per the prompt's Deliverable 3. Every interactive piece (the in-place player, the lightbox, the expanding row) has: idle (poster + play), open/playing, closing; keyboard: Enter/Space opens, Escape closes, focus returns; reduced motion: instant. Link-out providers render a "Watch on the old site →" card; `provider: "none"` renders a "Link pending" ribbon; `posterStatus: "replace"` renders the placeholder ribbon reading "Frame to be replaced".

## Non-negotiables (this slice)

- **No iframe before a tap.** The poster-first player is the only video element.
- **Nothing NDA'd, no Bully Solution frame on Home, no stock, no lorem, no reference image.**
- **Every `data-review-id` the prompt names exists**, so Kryshan's comments land on named parts.
- **`yarn verify` with zero warnings; browser walk at 1440, 1024 and 390.**

## Content and media

**Content files:** `content/site.ts`, `content/projects.ts` (KR-1 creates; KR-2/3 read only).
**Media:** `public/media/posters/<slug>.jpg` (present; KR-1 wires them). Rights per 02 §10; `rights: "pending"` for The Wolf of West Georgia Street.

## Placement

`review/kits/kryshan-a.ts` · `review/layouts/kryshan-a.md` (+ registry entry) · `review/mocks/home-a.tsx` with client leaves in `review/mocks/_components/` · index wiring in `review/kits/index.ts`, `review/layouts/index.ts`, `review/mocks/index.ts`.

## Accessibility

Contrast pairs as the prompt lists, verified with `lib/color/contrast.ts` and printed on the kit page. Keyboard paths for every open/close. Role tags and labels never rely on colour alone.

## Performance

CLS 0 (every frame reserves 16:9); first poster `priority` with a real `sizes`; under 200 KB before the first frame at 390; posters lazy beyond the first screen.

## Acceptance criteria (observable)

The prompt's "Acceptance criteria" section, verbatim, plus:

1. `/review` lists the trio beside the others; the placeholder ribbon does not appear on any of the three routes.
2. `yarn verify` passes.
3. Browser walk recorded in the closing note (widths, what was tapped, what was seen).

## Out of scope

- **Any page other than Home** — Phase 2.
- **Replacement poster frames** — waiting on 02 §14 Q27; the ribbon marks them.
- **The production kit** — set after Kryshan chooses (docs/BRANDING.md §4).

## Depends on

- No slice dependencies.

---

### Kickoff (paste into the session)

> Build **KR-1 — Review trio A** (this spec). **The prompt in `docs/client/prompts/kryshan-07-cc-prompt-A.md` is the brief; the repo's types and docs win on conflict; log every divergence.**
> Read first, in order: this spec · `docs/specs/README.md` · `docs/CONVENTIONS.md` · `docs/BRANDING.md` · `docs/REVIEW-LAYER.md` · `docs/PERFORMANCE.md` · the prompt · its attachments under `docs/client/` · `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`.
> List every file path before writing code. Close in three places. Run `yarn verify`.

---

### Closing note (2026-09-22)

Browser walk on `yarn dev:agent`, gate off (`REVIEW_GATE=off`). `/review` lists trio A with no placeholder badge; the three routes show no placeholder ribbon.
- **1440:** grid 4 columns, title cell first, no iframe on load (0). Tapped Jack → 2 × 2 cell, Vimeo `dnt=1` iframe mounted, focus on Close; Escape → iframe gone, focus back on Jack. Tapped Contact Club then Just Watch Us → one panel at a time, youtube-nocookie. Archivo loaded (62–125% width), h1 at `font-stretch: 72%`, labels 88%. CLS 0.0002 (font swap; frames reserve 16:9).
- **1024:** grid 2 columns, title cell beside Just Watch Us, Directors Reel shows "Frame to be replaced".
- **390:** nav stacked on two lines, name + roles/place line + "Watch ↓" first, meta line visible under every title. Tapped 5Rhythms → full-width player playing, meta beneath. Dev-server transfer after all nine posters: ~116 KB (posters 97 KB at w=828); a cold production measurement is KR-4's.
- Kit page prints six contrast pairs (text 16.7:1 AAA; red 300 small accent 6.9:1 AA; red 500 3.4:1 AA large). Layout page renders the markdown with no horizontal scroll at 390.
- Reduced motion: checked in code only (the leaf skips the view transition under `prefers-reduced-motion: reduce`); the browser pane cannot emulate it.

