# KR-7 — Demo D scaffold: kit D, layout D, a faithful copy of Demo A, rounds kept apart, contact email from env

**Epic:** KR — Kryshan Randel, review layer · **Track:** `02-review-demo-d/` · Size: M
**Slice type:** registry and review-chrome plumbing. The risks are changing Demo A by accident, changing the submitted round-1 form, and mixing rounds in the kit switcher.

**Status:** Not started

---

## Outcome

Demo D exists beside Demo A, and **renders identically to A**:
- `/review/kits/kryshan-d`, `/review/layouts/kryshan-d` and `/review/mocks/home-d/kryshan-d` are live behind the gate.
- Kit D is Kit A's tokens by reference, with its text fields amended.
- Layout D is A's markdown, copied verbatim.
- `home-d` is `home-a` copied onto new files.

Around it:
- The review index opens with "Revised after your review", then "The first round".
- Demo A and Demo D link to each other ("Before" / "After").
- The brand page and the kit pages name D as the current kit.
- Rounds don't mix: D appears only in Kit D, and the round-1 feedback form is unchanged.
- The contact email now comes from `CONTACT_EMAIL`.

This slice does **not** make any of the design changes (KR-8), the rows (KR-9), or anything on the public site beyond the email variable.

## Why / intent

- **`demo-d-ux-handoff-v1.md`** — the governing handoff. This slice builds D-KRD-1, 2, 16, 17, 18 and the scaffold of §3–§5 and §13.
- **Taylor, 2026-09-24:** "Make as Demo D actually, don't modify A, but you can start with duplicating everything from A. I want to be able to compare before and after." A faithful copy first makes KR-8's diff *be* the revision.
- **Taylor, 2026-09-24:** "just set the contact email as .env var" (D-KRD-16).
- **What this slice is NOT (binding):**
  - It does not edit `review/kits/kryshan-a.ts`, `review/layouts/kryshan-a.md`, `review/mocks/home-a.tsx`, or any file under `review/mocks/_components/` that A imports.
  - It does not change the round-1 feedback form's questions, options or schema.

**Rulings this slice makes (labelled, logged):**

- **Round membership is a field (`round: 1 | 2`) on `ReviewKit`, `ReviewLayout` and `ReviewMock`,** not a second registry. Every existing consumer keeps one list, and filtering is one line where it matters: the switcher, the feedback form, the index.
- **`CONTACT_EMAIL` is required** (`z.email()`). A missing address fails the build instead of shipping a wrong one. The value for today is `kryshanrandel@gmail.com`; Taylor switches it when `hello@kryshanrandel.com` is verified (O-4).

## Experience & states

**Review index `/review`:**
- H1 "Your site, in review."
- First section, headed **"Revised after your review"**, with the line "Kit A and Layout A with your changes. Open it beside Demo A to compare." Then three cards (Kit D, Layout D, Demo D) and "Compare with Demo A →".
- Then a heading **"The first round"** with the existing sentence ("Three ways this site could be.") and the existing three columns, listing round-1 entries only.
- The brand link ("Start here") and the gate/backend warnings are unchanged.

**Mock page switcher (review chrome):**
- **Round 1 mocks:** the three round-1 kits (as today). Demo A also shows **"After: Demo D →"**.
- **Demo D:** its layout name and **"Before: Demo A →"**; no kit buttons, because Kit D is the only kit in its round.

**Cross-round URLs:** `/review/mocks/home-d/kryshan-{a,b,c}` and `/review/mocks/home-{a,b,c}/kryshan-d` → 404.

**Brand page:** "Your kit" shows D:
- "Kit D" · "Wicked leads" · guardrail · Card A v2 tie-breaks
- "Kit A, revised after your review."
- links: See kit D · See it on a home page (Demo D) · the original Kit A

**Kit page lines:**
- Kit D: "Wicked leads: Wicked, but not nasty. Kit A, revised after your review."
- Kit A: "Wicked leads: Wicked, but not nasty. Your choice. Revised as Kit D after your review."
- B and C: unchanged ("Shown in the round; not chosen.").

**Review bar:** publishes its measured height as `--review-bar-h` on `<html>` (a `ResizeObserver`), removed on unmount. Nothing visible changes.

**Failure / edge states:**
- Unknown mock or kit → 404, as today.
- A missing `CONTACT_EMAIL` fails `next build` with t3-env's message.

## Non-negotiables (this slice)

- **A is untouched.** Demo A renders exactly as it did on 2026-09-23. The only differences allowed are the switcher's "After" link and whatever `SITE.email` holds.
- **The round-1 feedback form is byte-identical** in questions and options, and `FEEDBACK_SCHEMA` stays `kryshan-2026-09`.
- **The public site stays static;** `CONTACT_EMAIL` is read at build time only, server-side, and reaches client leaves as props.

## Content and media

**Content files:**
- `content/home.ts`: the mailto derives from `SITE.email` (no hardcoded address).
- `review/layouts/kryshan-d.md`: a verbatim copy of `kryshan-a.md`.
- Layout D's registry `brief`: A's brief verbatim for now; KR-8 replaces it with handoff Appendix A.

**Media:** none.

## Placement

- `lib/env.ts` (`CONTACT_EMAIL`)
- `lib/config.ts` (`SITE.email`)
- `.env.example`
- `content/home.ts`
- `review/kits/types.ts` (`round`)
- `review/kits/kryshan-d.ts` (new; handoff Appendix C)
- `review/kits/index.ts`
- `review/layouts/index.ts` (`round`, D entry)
- `review/layouts/kryshan-d.md` (new, copy)
- `review/mocks/index.ts` (`round`, `comparesWith`, D entry)
- `review/mocks/home-d.tsx` (new, copy of `home-a.tsx`, prefix `home-d`)
- `review/mocks/_components/home-d/expanding-grid.tsx` (new, copy of A's grid; KR-8 replaces it)
- `review/brand.ts` (`KIT_LEADS`: `current`, `revises`, D entry)
- `review/feedback.ts` (round-1 filter)
- `app/review/(gated)/page.tsx`
- `app/review/(gated)/brand/page.tsx`
- `app/review/(gated)/kits/[kit]/page.tsx`
- `app/review/(gated)/mocks/[mock]/[kit]/page.tsx` + `_components/kit-switcher.tsx`
- `app/review/_components/review-bar.tsx`

## Accessibility

- The compare links are real links with visible text.
- The index keeps one h1.
- The switcher bar stays `data-review-chrome`, so comment mode ignores it.

## Performance

No change on the public site. `home-d` is a copy: same poster-first player, no video before a tap.

## Acceptance criteria (observable)

1. `/review/kits/kryshan-d`, `/review/layouts/kryshan-d`, `/review/mocks/home-d/kryshan-d` → 200. `/review/mocks/home-d` redirects to `/review/mocks/home-d/kryshan-d`.
2. At 1440 and 390, Demo D is visually identical to Demo A: same grid, same name twice, same Close button. Only the switcher bar differs.
3. `git diff` shows no change to `review/kits/kryshan-a.ts`, `review/layouts/kryshan-a.md`, `review/mocks/home-a.tsx`, `review/mocks/_components/*.tsx|ts` (outside `home-d/`).
4. Cross-round combinations return 404; Demo D's switcher shows no kit buttons and a "Before: Demo A →" link; Demo A's shows its three kits and "After: Demo D →".
5. `/review/feedback` shows the same options as before this ticket (three kits, three layouts, nine combinations, the original three pillars).
6. The index shows "Revised after your review" above "The first round". The brand page's "Your kit" is Kit D. The kit pages carry the lines above.
7. `SITE.email` equals `CONTACT_EMAIL`; `.env.example` documents it.
8. `yarn verify` passes.

## Out of scope

- **Every visible change to Demo D** (the top bar, title cell, panel, genre line, blur, glyph, unbuilt links): KR-8.
- **Rows:** KR-9.
- **A round-2 feedback form:** not specified (handoff O-7).

## Depends on

- **KR-6** — Complete in `PROGRESS.md`.

---

### Kickoff (paste into the session)

> Build **KR-7 — Demo D scaffold** (`docs/specs/02-review-demo-d/KR-7-demo-d-scaffold.md`). **Demo D must render identically to Demo A, and A must not change.**
> Read first, in order:
> 1. this spec
> 2. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` §3, §4, §5, §13, Appendix C
> 3. `docs/specs/README.md`
> 4. `docs/CONVENTIONS.md`
> 5. `docs/REVIEW-LAYER.md`
> 6. `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`
>
> Close in three places. Run `yarn verify`.
