# SITE-D — Business card redirects: two short links that outlive the print run

**Epic:** SITE — Kryshan Randel's live site · **Step 2b (ad hoc, off the critical path)** · Size: S
**Slice type:** two static redirects, config only. The risk is a link printed on paper that can't be reprinted: if either source path or the temporary status is wrong, the card is either dead or permanently miscached in someone's browser.

**Status:** Not started

> **Vigil: the print is permanent, the redirect is not.** Review by inducing the failure: confirm both redirects are 307 (not 308/301) with `curl -sIL`, since a browser that has already cached a 308 will never re-check the destination even after this file changes.

---

## Outcome

Two QR codes go on Kryshan's printed business card. Scanning one hits `/card`, which lands on the home page tagged `?utm_source=business-card&utm_medium=qr`; the other hits `/imdb`, which lands on his IMDb profile. Both paths also work typed by hand, with or without a trailing slash, and in all caps. Because the card can't be reprinted, both redirects are **temporary** (307): the destination can change at any time — a new IMDb URL, a different landing page — by editing one file and redeploying, with no effect on anyone who scanned the card before or after the change.

This slice does not add analytics: the repo has none (checked `package.json` and the codebase for Vercel Analytics, Plausible, GA, PostHog — none present), so there is nothing to wire the UTM params into. They exist on the URL only, for whatever the client adds later.

## Why / intent

- **The client's request:** two redirect links for a printed business card (source: Taylor, 2026-09-26), replacing a placeholder IMDb URL supplied in that request.
- **What this slice is NOT (binding):** no analytics integration (none exists to integrate with); no change to `LEGACY_PATHS` or `buildLegacyRedirects()` (SITE-5); no new page or route under `app/(site)/` — these are pure config redirects.

**Rulings this slice makes (labelled, logged):**

- **A new file, `lib/business-card.ts`, holds the two destinations as one named constant,** rather than inlining them in `next.config.ts` next to `buildLegacyRedirects()`. CONVENTIONS §0.6 puts routes in `lib/routes.ts`, but these two destinations are club to the constants pattern in `lib/config.ts` (`SITE`), not the route-building pattern (`siteRoutes` builds paths on this site; one of these targets is an external host). A dedicated file keeps the "these are printed, don't rename the source paths" warning next to the values it protects, where `git blame` and a future editor will actually see it. Logged.
- **Both redirects are `permanent: false` (307), always,** even though every other redirect in this file (`buildLegacyRedirects`) is `permanent: true`. That's the one substantive rule in the client's brief: a 308 gets cached by the scanning browser, and the destination could never change for that visitor again. Logged.
- **The client self-edit guide doesn't exist yet** (`docs/EDITING.md` is written wholesale at SITE-10, per `00-build-order.md` Step 4, and SITE-10 hasn't started). This slice creates `docs/EDITING.md` now, as a stub holding only this one entry, rather than waiting for SITE-10 or skipping the client's explicit ask. SITE-10 will find the file already started and add to it, not overwrite it. Logged.

## Experience & states

**States (exhaustive):**

- `/card`, `/card/`, `/CARD`, `/CARD/` → 307 → `/?utm_source=business-card&utm_medium=qr`
- `/imdb`, `/imdb/`, `/IMDB`, `/IMDB/` → 307 → Kryshan's IMDb URL

**Failure / edge states (named):** none — these are static config redirects with no runtime branch, no user input, and no data dependency.

## Non-negotiables (this slice)

- **Both redirects are `permanent: false`.** A 308 here is a shipped bug: it cannot be undone for anyone who already scanned the card.
- **The source paths `/card` and `/imdb` are never renamed or removed**, and the file says so at the definition site.
- **No hex, no lorem, no new dependency.**

## Content and media

**Content files:** none — `docs/EDITING.md` gains a section, but it is documentation, not site copy.
**Media:** none.

## Placement

- `lib/business-card.ts` — new. Exports the two destination URLs as one named constant, with the "printed on a business card, don't rename the source paths" comment.
- `next.config.ts` — `redirects()` gains a second source of entries alongside `buildLegacyRedirects()`, built from `lib/business-card.ts`, covering the bare, trailing-slash and upper-case forms.
- `docs/EDITING.md` — new (stub). One section: what `/card` and `/imdb` are, that they're on printed cards, and how to change where they point.
- `docs/specs/DEVIATIONS.md` — one line for the `docs/EDITING.md` stub, once closed.

## Accessibility

**None — no surface in this slice.** A redirect has no rendered page.

## Performance

Not applicable: a 307 response has no render cost, and this adds no bytes to any page.

## Acceptance criteria (observable)

1. `curl -sIL` against `yarn build:agent && yarn start:agent` (:4510) for `/card`, `/card/`, `/CARD`, `/CARD/` each returns a 307 whose `location` is `/?utm_source=business-card&utm_medium=qr`.
2. The same for `/imdb`, `/imdb/`, `/IMDB`, `/IMDB/`, each landing on Kryshan's IMDb URL.
3. Both entries in `next.config.ts`'s redirect list read `permanent: false`.
4. `lib/business-card.ts` is the only place either destination URL is written; `next.config.ts` imports it.
5. `docs/EDITING.md` exists and names `/card` and `/imdb`, that they are printed on Kryshan's business card, and which file to edit (`lib/business-card.ts`) to change where they point.
6. `yarn verify` passes.

## Out of scope

- **Analytics wiring for the UTM params** — no analytics tool exists in this repo to wire them into; out of scope until one is added.
- **The full `docs/EDITING.md`** — SITE-10 writes the rest of it; this slice adds one section only.
- **Reprinting or ordering the business card itself** — outside the codebase.

## Depends on

- **SITE-1** — Complete in `PROGRESS.md` (owns `lib/routes.ts` and `siteRoutes.home`, which the `/card` destination is built from).

---

### Kickoff (paste into the session)

> Build **SITE-D — Business card redirects** (attached spec). **Both redirects are 307, forever — a 308 here can never be undone for anyone who already scanned the card.**
> Read first, in order: this spec · `specs/README.md` · `docs/CONVENTIONS.md` · `next.config.ts` (the existing `buildLegacyRedirects()` pattern) · `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`.
> Close in three places. Run `yarn verify`.
