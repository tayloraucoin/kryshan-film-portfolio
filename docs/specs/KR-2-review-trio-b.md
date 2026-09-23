# KR-2 — Review trio B: kit B, layout B ("The Study"), mock home B

**Epic:** KR — Kryshan Randel, Phase 1 review round · **Phase 1** · Size: L
**Slice type:** review assets from approved deliverables; risks are invented facts, uncleared media, and a mock that drifts from its layout.

**Status:** Not started

---

## Outcome

Behind the gate, `/review/kits/kryshan-b`, `/review/layouts/kryshan-b` and `/review/mocks/home-b` render kit B as a live style page, layout B's markdown verbatim inside kit B's scope, and a Home-only mock built to `kryshan-06-layout-B.md` §4 and §6 with his real titles, posters and copy. `/review` lists the trio. Reuses KR-1's content; adds a fourth font (Fraunces Italic) as `--font-quote` and a dark surface variable, both through the kit's extension point, and a lightbox built on the vendored dialog. This slice builds Home only: no Work, About, Teaching, Credits or Contact pages.

## Why / intent

- **`docs/client/prompts/kryshan-07-cc-prompt-B.md`** — the deliverable-by-deliverable brief. It is the spec for this ticket; this file carries the acceptance criteria and the records. Where the prompt and the repo's types or docs disagree, the repo wins and the divergence is one `DEVIATIONS.md` line.
- **`docs/client/branding/kryshan-05-tokens.json → B`** — the only source of colour values. No hex outside `review/kits/`.
- **`docs/client/kryshan-06-layout-B.md`** — the layout; copied verbatim, never rewritten.
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

`review/kits/kryshan-b.ts` · `review/layouts/kryshan-b.md` (+ registry entry) · `review/mocks/home-b.tsx` with client leaves in `review/mocks/_components/` · index wiring in `review/kits/index.ts`, `review/layouts/index.ts`, `review/mocks/index.ts`.

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

- **KR-1** — shared content, posters, kit/mock patterns. Complete in `PROGRESS.md`.

---

### Kickoff (paste into the session)

> Build **KR-2 — Review trio B** (this spec). **The prompt in `docs/client/prompts/kryshan-07-cc-prompt-B.md` is the brief; the repo's types and docs win on conflict; log every divergence.**
> Read first, in order: this spec · `docs/specs/README.md` · `docs/CONVENTIONS.md` · `docs/BRANDING.md` · `docs/REVIEW-LAYER.md` · `docs/PERFORMANCE.md` · the prompt · its attachments under `docs/client/` · `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`.
> List every file path before writing code. Close in three places. Run `yarn verify`.
