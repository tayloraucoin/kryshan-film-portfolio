# SITE — Kryshan Randel's live site — Build Order

**New here? Read `../README.md` first.** It holds the build process, the kickoff contract and the completion protocol. This file is the ordered, checkable build queue for `03-site-build/`. The product source of truth is `site-ux-spec-v1.0.md` (cited below as "spec"). Its decision log is binding (D-SITE-n, plus the D-KRD-n rulings it inherits).

> Derived from each ticket's `## Depends on`. A ticket may start only when everything it lists shows **Complete** in `../PROGRESS.md`. If this file and a ticket's `## Depends on` disagree, **the ticket wins**: fix this file.

**Authored by:** Reeve (sequence, tickets) with Mason (placement, boundaries) and Vitrine (scope against the spec) · 2026-09-24

## How to work this file

1. Find the next unchecked ticket.
2. Confirm its gate in `PROGRESS.md`.
3. Build one ticket per thread (the kickoff contract in `../README.md`).
4. On done, close in three places, then tick here.

## Before SITE-1: the one message (Taylor)

Send Kryshan the batched questions in spec §13 (O-SITE-1 to 8, 14 and 16), with a reply-by date: *"Anything unanswered by {date} goes ahead on the stated default."* Every ticket is written against those defaults, so nothing below waits on his answers except where a ticket says **Waiting**.

Also before SITE-1 (Taylor):
- **The alias.** Create `hello@kryshanrandel.com` and send a test from an outside account (O-SITE-15). It gates the **first look**, not SITE-1.
- **Environment variables.** Set `CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL` in Vercel for Production **and** Preview.

## The four steps

| Step | Phase | Tickets | What exists afterwards |
|---|---|---|---|
| **1** | **Demo D goes live** | SITE-1 → SITE-2 → SITE-3 | The approved Demo D is the real home page at `/`, on the production kit, with real chrome and live links (pages that don't exist yet return the site's 404). Demo A and Demo D still render in `/review` for comparison. |
| **2** | **The rest of the site** | SITE-4, SITE-5, SITE-6, SITE-7, SITE-8 | Every page in spec §3 exists on real data, and redirects are wired. **First look** once the alias delivers (spec §2). |
| **3** | **His words** | SITE-C | Every His-words and Write string written and approved; stories, full awards, verified press and the credits list complete. Can start as soon as SITE-2's shapes exist, and runs alongside Step 2. |
| **4** | **Handover and launch** | SITE-9 → SITE-10 | The style guide is exported and the review layer deleted; the launch gates close, `EDITING.md` is written, DNS is cut over. |

## Critical path (sequential)

SITE-1 → SITE-2 → SITE-3 → SITE-4 → SITE-5 → SITE-9 → SITE-10

(SITE-C must also be Complete before SITE-10.)

## Build-order checklist

### Step 1 — Demo D goes live

- [x] **SITE-1** · Foundation: production kit, the live chrome, routes, lint walls, the old-URL inventory · M · (Demo D approved)
- [x] **SITE-2** · Content model: showable data, posters, home lists, consent types, build-time validation · L · Mason review · (SITE-1)
- [x] **SITE-3** · The film components go live, and Demo D becomes the home page · L · (SITE-2)

### Step 2 — The rest of the site

- [x] **SITE-4** · Work: every film, role and passion filters with no flash, the credits he can't show as films · L · (SITE-3)
- [x] **SITE-5** · Detail pages, redirects, sitemap and structured data · M · (SITE-3)
- [x] **SITE-6** · About: the person, then the proof · M · Trust surface · (SITE-2, SITE-3)
- [x] **SITE-7** · Teaching: where he teaches, camps, coaching, and who vouches for him · M · Trust surface (minors) · (SITE-2, SITE-3)
- [ ] **SITE-8** · Contact: the address, big and copyable · S · (SITE-1, SITE-3)

### Step 3 — His words

- [ ] **SITE-C** · The copy pass: loglines, stories, awards, press verification, credits and every Write string · L · Content flags · (starts after SITE-2; closes after SITE-3 to SITE-8)

### Step 4 — Handover and launch

- [ ] **SITE-9** · Style guide exported, then the review layer deleted · M · (SITE-3 to SITE-8 Complete)
- [ ] **SITE-10** · Launch: gates, launch-tier validation, Lighthouse, `EDITING.md`, DNS cutover, ownership · M · Launch-blocking · (SITE-9, SITE-C)

## Ordering constraints (alphabetical order hides these)

- **SITE-1 precedes SITE-2.** The content model reads `siteRoutes` and `LEGACY_PATHS`, and the lint walls must exist before anything is copied out of `review/`, or a public import from `review/` slips in unnoticed.
- **SITE-2 precedes every page.** It owns `isShowable`, `SHOWABLE_PROJECTS`, `workOrder()`, the consent types and `content/validate.ts`. A page built before them would invent its own list of public films, which is D-SITE-8's failure mode.
- **SITE-3 precedes SITE-4 and SITE-5.** It ports the tile, panel, grid, row and open-film store into `components/composed/work/`. Work and the detail pages consume them; building either first forks the film grammar.
- **SITE-4 precedes SITE-5 on the critical path** because `workOrder()` next/previous and the tile hrefs are proven on Work first. If a thread is free, they may run in parallel, since SITE-5 depends only on SITE-3.
- **SITE-6, SITE-7 and SITE-8 depend on SITE-3** for its shared site parts: the email hand-off, the copy button, `JsonLd` and `lib/structured-data.ts`. None of them renders films. Once SITE-3 is Complete, SITE-4 to SITE-8 can all run in parallel.
- **SITE-C starts after SITE-2 and closes after SITE-3 to SITE-8.** Drafting and his approval can begin once the shapes exist. Each string lands in its page's file only after that page's ticket is Complete.
- **SITE-9 exports the style guide before deleting anything.** The export renders from `/review/brand` and the Kit D page, which use `lib/color/contrast.ts`. Taylor tags the last review commit first.
- **SITE-10 is last.** The launch-tier validators (loglines ≤155 characters, unique descriptions, approved frames) would fail the build while SITE-C is still filling content.

## Full dependency table

| Ticket | Complete-required dependencies |
|---|---|
| SITE-1 | — (Demo D approved, per spec header) |
| SITE-2 | SITE-1 |
| SITE-3 | SITE-2 |
| SITE-4 | SITE-3 |
| SITE-5 | SITE-3 |
| SITE-6 | SITE-2, SITE-3 |
| SITE-7 | SITE-2, SITE-3 |
| SITE-8 | SITE-1, SITE-3 |
| SITE-C | SITE-2 to start; SITE-3 to SITE-8 to close |
| SITE-9 | SITE-3, SITE-4, SITE-5, SITE-6, SITE-7, SITE-8 |
| SITE-10 | SITE-9, SITE-C |

## Scope sheet: Mason and Vitrine's work plan, per ticket

The authoring input for each ticket. Tickets expand these; they never contradict them without a DEVIATIONS line.

**SITE-1 · Foundation.**

- **Production kit (D-SITE-2):** copy Kit D into `brand/kits/kryshan.ts` as a plain `BrandKit`, dropping the review-only fields (`letter`, `thesis`, `voice`, `never`, `round`, `placeholder`). Keep `ramps`, `roles` and `typeScale` so the style guide stays true. Set `PRODUCTION_KIT`, and give it its own `Archivo` loader.
- **Environment fallback (D-SITE-24):** `NEXT_PUBLIC_SITE_URL` falls back to `https://kryshanrandel.com`.
- **Lint walls (D-SITE-19):** in `eslint.config.mjs`, `app/(site)/**`, `app/*.ts(x)`, `components/**`, `content/**` and `brand/**` may not import `@/review/*`, `@/lib/review/*` or `@/app/review/*`.
- **Routes (`lib/routes.ts`):**
  - `siteRoutes`: `home`, `work({ role?, passion? })`, `project(slug)`, `about`, `teaching`, `contact`.
  - `LEGACY_PATHS`: the old-URL inventory, from a crawl of `kryshanrandel.com` (sitemap plus links) recorded as data (O-SITE-9).
- **Chrome** (spec §4.2):
  - `components/composed/site/site-header.tsx` becomes the sticky bar, a CSS-only split below 768, publishing `--bar-h`, with `aria-current`.
  - `site-footer.tsx`: the email, place and `Social` nav.
  - Skip link text per page.
- **Socials** move from `lib/config.ts` to `content/site.ts` (D-SITE-28).
- **404:** `app/not-found.tsx` with the chrome, spec §6.7 copy, and `lang="en-CA"`.
- **Docs:** PERFORMANCE §4 says `preload`, not `priority`.
- **Not here:** no page bodies; the nav links to routes that 404 until their tickets land.

**SITE-2 · Content model (Mason review: data shape).**

- **`content/projects.ts` reshaped** per spec §5:
  - `rights: "public" | "held" | "nda"`
  - the link-out variant `{ provider: "linkout"; host; url }`
  - `none`, `OLD_SITE`, `poster`, `featured`, `lead` and `posterStatus` removed
  - `logline`, `awardsFull`, `press` (with `verifiedOn`), `articles` and `videoPublished` added
  - `isShowable`, `SHOWABLE_PROJECTS`, `findShowableProject`, `workOrder()` and `projectMetaLine` exported here, once
  - Current holds: VANDU, Shotlister, Glimpse, The Bully Solution, and Directors Reel if its frame isn't approved (the §6.1 fallback).
  - Loglines filled mechanically from the intake's "Watch" notes (his words, trimmed, no prefix, ≤155 characters) and flagged for SITE-C.
- **`content/posters.ts`:** a static import for every showable slug. The only poster source.
- **`content/home.ts`:** `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW`, the H1 and its red phrase.
- **`content/testimonials.ts` and the `Photo` type:** spec §11 (a), with empty arrays.
- **`content/validate.ts`:** spec §5 and §11 (b), wired as a side-effect import in `app/(site)/layout.tsx`. Error messages are written for him.
- **The review layer keeps compiling and rendering** until SITE-9: adapt `review/mocks/**` to the new fields with the smallest change (posters from `POSTERS`, no `none` provider), each change logged. Demo A and D must still render.

**SITE-3 · Film components live, Demo D is Home.**

- **Port** (copy, don't import) Demo D's leaves into `components/composed/work/`:
  - `film-tile.tsx`: a link, per spec §4.3
  - `film-panel.tsx`: Copy link in the strip, the logline and short awards, `mailto` with a subject
  - `film-grid.tsx`: an optional leading cell, `lineEnds` over visible tiles
  - `film-row.tsx`: end tile
  - `film-player.tsx`: the port of `project-player.tsx`, link-out "Watch on {host} ↗"
  - `open-film.ts`, `use-open-film.ts`, `transition.ts`
  - `components/composed/site/copy-button.tsx`: shared, secure-context aware
  - `components/composed/site/email-hand-off.tsx`: a server component
- **Home:** `app/(site)/page.tsx`, with the title cell in `app/(site)/_components/title-cell.tsx`, per spec §6.1: live links, end tiles, amended captions (D-SITE-27 defaults), the teaching fallback, the transition CSS, and JSON-LD `Person` via `lib/structured-data.ts` plus `components/composed/site/json-ld.tsx` (created here and reused by SITE-5 and SITE-6).
- **Deleted in the port:** `unbuilt-link.tsx` and the ribbons.
- **Logged in DEVIATIONS:** the temporary duplication with `review/mocks/_components/home-d/`.

**SITE-4 · Work.**

- **Placement:**
  - `app/(site)/work/page.tsx`
  - `app/(site)/work/_components/work-filters.tsx` (client)
  - the pre-paint inline script (a server-rendered `<script>` string, before the grid)
  - `credits-list.tsx` (server)
  - `content/credits.ts`: data from his EPK CV; `released` set where known, and unknowns marked `false`
- **Behaviour** per spec §6.2: hide before paint, `history.replaceState`, status, empty state, filter-close focus, the "can't show" block, `#credits` with `hidden="until-found"`, the IMDb link, the email hand-off.

**SITE-5 · Detail pages, redirects, sitemap, structured data.**

- **Detail pages:** `app/(site)/work/[slug]/page.tsx`, with `generateStaticParams` over `SHOWABLE_PROJECTS`, `dynamicParams = false`, `generateMetadata` and `VideoObject`.
- **Redirects:** in `next.config.ts`, built from `LEGACY_PATHS` plus `SHOWABLE_PROJECTS` (D-SITE-25), with `content/projects.ts` importable by relative path.
- **Sitemap and robots:** `app/sitemap.ts` lists showable pages.
- **Verification:** at most two hops, checked with `curl -sIL` against `build:agent`.

**SITE-6 · About.**

- **Placement:** `app/(site)/about/page.tsx` and `content/about.ts`.
- **Photos:** converted to `public/media/photos/` (3:2, ≤1600 px, JPEG) from `docs/client/behind-the-scenes/`, cleared set only (spec §11).
- **Content:** Recognition before the Glimpse paragraph; testimonials with full attribution only. Content as far as it exists: His-words strings cut **by the rule**, Write strings left to SITE-C with the defaults given in spec §6.4.

**SITE-7 · Teaching (trust surface: minors).**

- **Placement:** `app/(site)/teaching/page.tsx` and `content/teaching.ts`.
- **Layout:** three blocks on `subgrid`.
- **Photos:** only as he sends them, each with `people` declared.
- **The camp facts line:** omitted until O-SITE-14 is answered.
- **H1:** the provisional default.

**SITE-8 · Contact.** `app/(site)/contact/page.tsx`, using the shared copy button, with the email's `<wbr>` break and no form.

**SITE-C · Copy pass (Cantor, with Vitrine; he approves).**

- **Content:** every string in spec §6's tables marked His words or Write, against §7:
  - 27 loglines refined
  - stories cut (≤90 words, per-film notes)
  - `awardsFull`
  - press verified against the articles (`verifiedOn`)
  - `credits.ts` confirmed (Q12)
  - bio, Glimpse, names line
  - Teaching bodies
  - meta descriptions
- **One cutting pass;** rewrites after his approval are a change round.
- **Output is data only:** content files, with no layout changes.

**SITE-9 · Style guide, then delete the review layer.**

- **Style guide:** write `docs/STYLE-GUIDE.md` and export the PDF from `/review/brand` and the Kit D page, before anything is deleted.
- **Then delete** everything in spec §2's deletion list, and update the docs listed there.

**SITE-10 · Launch (launch-blocking).**

- **Validation:** launch-tier checks in `content/validate.ts`.
- **Gates:** spec §13's "Blocks launch" items closed or defaulted on the record; Lighthouse per template.
- **`docs/EDITING.md`:** including "When a change doesn't appear".
- **Cutover:** Vercel env confirmed; the DNS checklist (MX/SPF kept); domain, Vercel, repo and mail in his name, Taylor removed.

## Ticket-authoring batches (distinct from build phases)

| Batch | Tickets | Why grouped |
|---|---|---|
| A | SITE-1, SITE-2 | Step 1's contract layer: routes, chrome, the data model and validation. They must agree on names. |
| B | SITE-3, SITE-4 | The film grammar and its biggest consumer. They share the components' contract. |
| C | SITE-5, SITE-6, SITE-8 | Pages that read the model and `lib/structured-data.ts`; the lighter surfaces. |
| D | SITE-7, SITE-C | The trust-heavy content: minors, consent, and his words. |
| E | SITE-9, SITE-10 | Handover and launch; the deletion list and the gates. |

## Locked references (do not re-litigate)

- **Decisions:** D-SITE-1 to D-SITE-28 (spec §12); D-KRD-1 to D-KRD-20 (handoff §14); M-KR-1, M-KR-6. Cite by ID. Re-opening one requires new evidence routed to Taylor.
- **Binding law:**
  - `AGENTS.md` hard guardrails
  - CONVENTIONS §0 (the ten rules)
  - PERFORMANCE §1–§5
  - spec §4.4 (vocabulary), §7 (copy), §11 (rights, consent, privacy)
- **Launch-blocking set:**
  - O-SITE-4 (Leo), O-SITE-5 (VFS), O-SITE-15 (the alias, first look)
  - the old-URL crawl (SITE-1)
  - the approved Directors Reel frame, or its fallback
  - press verification (SITE-C)
  - the review layer deleted (SITE-9)
  - ownership transferred (SITE-10)
