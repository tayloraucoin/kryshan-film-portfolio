# SITE-7 — Teaching: where he teaches, camps and coaching on a subgrid, who vouches for him, and a build that fails before a minor's photo ships without consent

**Epic:** SITE — Kryshan Randel's live site · **Step 2 (The rest of the site)** · Size: M
**Slice type:** a static content page on a trust surface (minors). There are two ways this goes wrong. The worse one is a consent breach that still builds green: a photo of a minor without its consent dates, a student named, or "at-risk" printed. The other is invented copy filling a slot the spec marks Write or Waiting.
**Vigil:** review by *inducing* the failures with temporary fixtures, not by reading the happy page: a minors photo with a bad or missing consent date, a Whatì photo without community consent, a photo with no `people`, a fifth teaching testimonial, a first-name testimonial carrying a full name. Every fixture must fail `yarn verify` with a message he could act on. Revert every fixture before closing.

**Status:** Complete (2026-09-24)

> **Vigil: consent review.** The builder runs and reports each induction below (acceptance 10–12). For each fixture, QA states what it added, which command failed (`check-types` or `build:agent`), and the first line of the error:
> 1. `people: { minors: true, … }` with an invalid date
> 2. `people: { minors: true }` missing `guardianConsent`
> 3. a Whatì photo without `communityConsent`
> 4. a photo with no `people`
> 5. five teaching testimonials
> 6. a `first-name-role` testimonial whose `name` has a space
>
> **⚠ Content flag.** The H1 is the spec's provisional default. The opener, the coaching body and the meta description ship as interim strings taken from Locked copy (see the rulings). SITE-C replaces all four with approved words. The camp facts line, the Frames descriptor, VFS, every photo and every testimonial are absent until their answers arrive (O-SITE-5, O-SITE-14). None of this is a defect at first look; it is a defect at launch only if SITE-C hasn't landed.

---

## Outcome

A program director or a would-be student lands on `/teaching` and, in one screen, reads what a class with him produces, then where he teaches, what camps and programs he has run, and how coaching starts. They see only the photos and the words of people who have agreed to be there, then an invitation to email him. The three blocks sit side by side on a wide screen with their headings and lists on shared lines. They stack on anything narrower. With no photos and no testimonials (the launch default), the page is complete and has no empty frame, heading or placeholder. Adding a photo later is a content edit. The build refuses it if the photo shows a minor without guardian and program consent dates, or a Whatì participant without community consent. The final words are not in this slice (SITE-C). Neither is any photo he hasn't sent, the About page's testimonials (SITE-6), or the sitemap entry (SITE-5).

## Why / intent

- **Spec §6.5** is the page: its job, six sections, text table and acceptance seeds. **§3** fixes the heading outline: h1 opener · h2 per block · h2 What people say.
- **Spec §11** is binding. It defines the `Photo` and `Testimonial` consent types, the four `content/validate.ts` throws, and the standing rules:
  - A person can withdraw by having their entry deleted.
  - Nobody is attributed as a former "at-risk" participant.
- **D-SITE-13:** Teaching testimonials may use full, first-name-plus-role or anonymous-plus-role attribution, at most four, with no carousel. **D-SITE-17:** 03 §8's Teaching opener is retired. **D-SITE-20:** no section, heading or frame renders for missing content.
- **His words** (`docs/client/_direction/review-stage-feedback.md`): "I could send you more photos for teaching, and text. Maybe some testimonials might be good here too? I could get those." The page has to be complete before any of that arrives.
- **Scope sheet (build order, SITE-7):** `app/(site)/teaching/page.tsx` and `content/teaching.ts`; three blocks on `subgrid`; photos only as he sends them, each with `people` declared; the camp facts line omitted until O-SITE-14; the provisional H1.
- **Ground truth consumed, never rebuilt:**
  - SITE-2's `Photo` and `Testimonial` types, `IsoDate`, `content/testimonials.ts` and the `content/validate.ts` side-effect import in `app/(site)/layout.tsx`
  - SITE-1's `siteRoutes.teaching`, the bar's current-item mechanism and the skip link
  - SITE-3's `components/composed/site/email-hand-off.tsx`
  - `lib/metadata.ts` `createPageMetadata`
  - `components/composed/media/frame.tsx`
- **What this slice is NOT (binding):**
  - It writes no copy beyond strings the spec gives verbatim.
  - It adds no photo he hasn't sent and cleared.
  - It prints no price, no "at-risk" and no student's name.
  - It adds no client component.

**Rulings this slice makes (labelled, logged):**

1. **Interim strings come from Locked copy only; SITE-C replaces them.**
   - The opener's sentences (Write, ≤40 words, no default in §6.5) ship as the Home Teaching strand body. That is Locked, with its O-SITE-5 fallback: "Directing, shooting and editing at LaSalle College; film camps; one-on-one coaching." It is referenced from the constant SITE-3 left it in, never retyped, so a VFS answer updates both.
   - The meta description (Write) uses the same constant.
   - The coaching body (Write, ≤50 words) ships as the one sentence §6.5 gives verbatim: "Tell me what you're making and where it's stuck."
   - Each field carries a `// SITE-C:` comment.
   - The builder writes nothing new. The cost of being wrong is that the first look reads thin until SITE-C lands, never false.
   - `[PROVISIONAL — Cantor]`. Logged.
2. **H1 is the spec's default, verbatim: "Bring a story. You'll leave having directed, shot and cut it."**
   - It has no red phrase. §6.5 allows "none, or one phrase chosen with the final H1", and choosing belongs to SITE-C.
   - The H1 is a data field, so SITE-C changes it without touching layout.
   - `[PROVISIONAL — Cantor, his OK in SITE-C]`. Logged.
3. **The Frames entry ships without a descriptor.** "Frames Film Project (founder, with Frog Hollow Neighbourhood House, 2012–2015)" is exactly as §6.5 lists it. "For young people facing barriers" waits for the wording he and Frog Hollow confirm (O-SITE-14). "At-risk" never appears in any form. Logged.
4. **No teaching photo ships by default. `LaSalle_grad.jpg` is held.**
   - The file is `docs/client/behind-the-scenes/3c39f340-….jpg`. It shows identifiable graduates in front of a sponsor wall, and it isn't in §11's used-by-default list.
   - It is about 0.93:1, so a 3:2 frame would crop people (CONVENTIONS §8: native ratio).
   - It is used only if his O-SITE-14 reply clears it. Vitrine then chooses the frame, not the builder.
   - Logged.
5. **"In the room" has no visible heading.** §3's outline lists none, and captioned figures carry their own meaning. It renders as a plain `<section>` of `<figure>`s, and only when at least one room photo exists. `[PROVISIONAL — Vitrine]`. Logged.
6. **Testimonial attribution is rendered from the consent form, never guessed.**
   - `name` is stored exactly as the person asked to be shown (handoff Appendix D's ask).
   - `full` renders "{name}, {role}". `first-name-role` renders "{name}, {role}". `anonymous-role` renders "{role}" alone, and the name never reaches the HTML.
   - `relationship` is never rendered.
   - Order is file order; the file's comment says program directors first (§6.5, "weighted to program directors and graduates").
   - Logged.
7. **Four validator additions, all in `content/validate.ts`, with messages written for him:**
   - Teaching photos (opener and room) go through SITE-2's photo consent checks.
   - At most three room photos.
   - At most four `page: "teaching"` testimonials.
   - A `first-name-role` `name` must be one word.

   A fifth quote fails the build rather than vanishing silently from a page he edits himself. `[PROVISIONAL — Mason]`. Logged.
8. **A shared placement call, if SITE-6 hasn't made it first.**
   - A single testimonial (quote plus attribution, all three forms) and a captioned 3:2 photo are used by About and Teaching.
   - If SITE-6 already created them, reuse them and extend with a typed prop.
   - If not, SITE-7 creates `components/composed/site/testimonial.tsx` and `components/composed/media/photo-figure.tsx` (CONVENTIONS §0 rule 1, §6), both server components.
   - On-disk reality wins. `[PROVISIONAL — Mason]`. Logged.

## Experience & states

**Order (spec §6.5):** bar (Teaching current) · opener · three blocks · In the room (only with photos) · What people say (only with testimonials) · email hand-off · footer. Skip link: "Skip to content".

**Opener:**
- H1, then the opener sentence(s) in the Body step. H1 size per spec §4.1.
- ≥1024 with an opener photo: the photo (3:2) sits beside the text, top-aligned. It never sits above the H1.
- Below 1024, the photo comes after the text.
- Without a photo (the default), the text runs at max 60ch.
- There is no red phrase (ruling 2).

**Three blocks, on `subgrid`:**

| Block (h2, Locked) | Content | Source |
|---|---|---|
| Where I teach | A `<ul>`: "LaSalle College (2023–present)" · "InFocus Film School (2010–2022)". VFS is absent (O-SITE-5 default: removed everywhere). | §6.5, verbatim |
| Programs and camps | A `<ul>`: "Frames Film Project (founder, with Frog Hollow Neighbourhood House, 2012–2015)" · "Reel Youth: Whatì, NWT and Mississauga (2017–2018)" · "CEDIM, Mexico: visiting professor (2010)" · "Camps in Victoria and Toronto" · "Remote camps". Then the **camp facts line**, only when `factsLine` is set (O-SITE-14). | §6.5, verbatim. The last two items are sentence-cased as list items. |
| One-on-one coaching | One paragraph: the coaching body (ruling 1). No price. | §6.5 |

- **≥1024:** three equal columns. The parent grid defines three rows (heading · body · facts), and each block spans them with `grid-template-rows: subgrid`. The three h2s sit on one line, and the three bodies start on one line even when one heading wraps. The facts row is empty space in the two blocks that have none, never an empty element.
- **Below 1024:** stacked in DOM order (Where I teach, Programs and camps, One-on-one coaching), each block's rows in order.
- Places are spelled as the places spell them: **Whatì** with its accent, **Frog Hollow Neighbourhood House**.

**In the room:** 0 to 3 photos he has sent and cleared, 3:2, captioned, `people` declared.
- In a row at ≥768; stacked below.
- Zero photos (the default) means no section at all.

**What people say:** teaching testimonials (`page: "teaching"`), at most four.
- Two columns at ≥1024, each quote max 52ch; stacked below. Roman type (italic is for press quotes, spec §4.1).
- Markup is `<figure><blockquote>…</blockquote><figcaption>attribution</figcaption></figure>`.
- Zero testimonials (the default) means no h2 and no section.

**Email hand-off:** SITE-3's component with the Locked sentence "If you run a program or want coaching, email me." (06-A §4), then `SITE.email` as a plain `mailto:` with no subject (D-SITE-23's subject is for films). Then the footer.

**Metadata:**
- `createPageMetadata({ title: "Teaching", description, path: siteRoutes.teaching })` gives the title "Teaching — Kryshan Randel", an absolute canonical and the interim description (ruling 1).
- `og:image` falls back to the site default. §6.5 names none, so don't invent one.
- No JSON-LD (spec §8: `Person` is on Home and About only).

**How a photo arrives later (a content edit, no ticket):**
1. He sends it with who is in it.
2. It is converted to `public/media/photos/teaching-<kebab>.jpg` (3:2, ≤1600 px, JPEG).
3. It is added as a `Photo` with:
   - `people` declared, and all consent dates when minors are present
   - `communityConsent` too for Reel Youth (Whatì)
   - an `alt` that says what he's doing and where, and never names a student (§7.6)
   - a caption: program and year, ≤12 words (SITE-C writes it)
4. The build refuses anything short of that.

**States (exhaustive):**
- default (no photos, no testimonials, no facts line, interim strings)
- opener photo present or absent
- 0 / 1 / 2 / 3 room photos
- 0 / 1 / 2 / 3 / 4 teaching testimonials
- each testimonial's attribution: full, first-name-role or anonymous-role
- facts line present or absent
- VFS present (after O-SITE-5 says yes) or absent
- Frames descriptor present (after the wording is confirmed) or absent
- final copy landed (after SITE-C)
- widths: 1440 · 1024 (columns begin) · 768 · 390 · 320

**Failure / edge states (named):**
- **A photo of minors without valid guardian and program consent dates:** `check-types` or `build:agent` fails, naming `content/teaching.ts`, the photo and the fix. It never renders.
- **A Reel Youth (Whatì) photo without `communityConsent`:** the build fails.
- **A photo without `people`:** the build fails. There is no default.
- **A fifth teaching testimonial, or a fourth room photo:** the build fails with the cap and the file.
- **A `first-name-role` entry carrying a full name:** the build fails.
- **An About testimonial** (`page: "about"`) never renders here. A teaching one never renders on About.
- **A photo file missing:** static import, so the build fails.
- **A withdrawal:** deleting the entry is the whole process. The section collapses when it was the last one.
- **A heading that wraps at 1024:** the subgrid keeps the bodies aligned.
- **The address at 320 px:** the hand-off wraps without horizontal scroll.

## Non-negotiables (this slice)

- **No student's name anywhere on the page, including `alt`, captions and attribution.** Graduates and program directors only, per their consent form.
- **"At-risk" never appears, in any spelling.** Frames is described only in the wording he and Frog Hollow confirm.
- **A minor's photo cannot ship without guardian and program consent dates; a Whatì photo cannot ship without community consent.** The build fails; the page never decides.
- **No invented copy.** Every string is §6.5 verbatim, a Locked string by reference, or absent. If the page seems to need a new sentence, STOP and route it to SITE-C.
- **No empty frames, headings or placeholders** for missing photos, testimonials or the facts line (D-SITE-20).
- **Static, server-only.** No `"use client"` under `app/(site)/teaching/`, no request-time reads, nothing imported from `review/`.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/teaching.ts` (new), exporting `TEACHING`. Every field is commented for the self-edit guide:
  - `h1` (ruling 2)
  - `opener` (interim, ruling 1)
  - `openerPhoto?: Photo`
  - `blocks`:
    - `whereITeach`: `{ heading: "Where I teach"; items: string[] }`
    - `programs`: `{ heading: "Programs and camps"; items: string[]; factsLine?: string }`
    - `coaching`: `{ heading: "One-on-one coaching"; body: string }`
  - `roomPhotos: Photo[]` (empty)
  - `handOff` ("If you run a program or want coaching, email me.")
  - `metaDescription` (interim)
- `content/testimonials.ts`: read only, filtered to `page === "teaching"`. SITE-7 adds no entries; testimonials arrive with written consent (spec §11).

**Placement** (Mason's call, build order scope sheet; the shared components are ruling 8):
- `app/(site)/teaching/page.tsx`: server page and `generateMetadata`/`metadata`
- `app/(site)/teaching/_components/`: any page-only server pieces, e.g. `teaching-blocks.tsx`
- `content/teaching.ts`
- `content/validate.ts`: additions only
- `components/composed/site/testimonial.tsx` and `components/composed/media/photo-figure.tsx`, only if SITE-6 hasn't created equivalents
- `public/media/photos/`: nothing added by default

**Validators** (`content/validate.ts`, ruling 7). Each message names the file, the entry and the fix in plain words, and is listed for SITE-10's `docs/EDITING.md`:
- `TEACHING.openerPhoto` and `TEACHING.roomPhotos` go into SITE-2's photo checks: `people` present; minors need valid ISO `guardianConsent` and `programConsent`; Whatì needs `communityConsent`.
- `roomPhotos.length ≤ 3`.
- Teaching testimonials ≤ 4.
- A `first-name-role` `name` has no whitespace.
- **Confirm, don't assume:** read how SITE-2's check identifies a Reel Youth (Whatì) photo. If SITE-2's `Photo` gives no way to identify one, STOP and route the smallest marker to Mason (for example `community?: "whati"`) as a DEVIATIONS line. Don't invent a caption-text match.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).** This page's hand-off mailto carries no subject.

## Accessibility

- **One h1.** Then h2s in the order Where I teach · Programs and camps · One-on-one coaching · What people say (when present). No heading for In the room (ruling 5). No skipped levels.
- **DOM order is reading order at every width.** The subgrid aligns rows. Don't reorder with `order` or `dense`.
- **Lists are real `<ul>`s**, so screen readers announce "list, 5 items".
- **Testimonials:** `<figure>`, `<blockquote>`, `<figcaption>`. The anonymous form exposes the role only. No quote is in italics.
- **Photos:** `alt` per §7.6 (what he's doing and where; never students; doesn't repeat the caption). The caption is a `<figcaption>`.
- **Focus not obscured:** the page inherits `scroll-padding-top: calc(var(--bar-h) + 1rem)`, so the skip link lands the H1 below the bar.
- **Targets and contrast:** the hand-off address is a ≥44 px target. Text is `foreground`/`muted-foreground` on ink. No `primary` below 24 px, and no red phrase at all.
- **`lang="en-CA"`** comes from the root. "Whatì" is plain text; no `lang` switch is needed.

## Acceptance criteria (observable — `yarn dev:agent` on :4500 for walks; `yarn build:agent` output in `.next-build/` for greps; fixtures temporary and reverted)

1. `/teaching` returns 200 and is listed as static (○) in `build:agent`'s route table. `<title>` is "Teaching — Kryshan Randel". The canonical is `https://kryshanrandel.com/teaching` with `NEXT_PUBLIC_SITE_URL` unset. The meta description equals the Teaching strand body and appears on no other page's `<meta name="description">`.
2. The heading outline, read from the DOM, is exactly: h1 "Bring a story. You'll leave having directed, shot and cut it." · h2 "Where I teach" · h2 "Programs and camps" · h2 "One-on-one coaching". There is no "What people say" h2 while there are zero teaching testimonials, and there is one h1.
3. **Subgrid at 1440 and at 1024:**
   - The three blocks are side by side.
   - The three h2s' `getBoundingClientRect().top` are equal.
   - The first element after each h2 (the two `<ul>`s and the coaching `<p>`) share one `top`, including with one heading wrapping. At 1024, confirm by temporarily narrowing if none wraps naturally.
   - At 768, 390 and 320 the blocks stack in DOM order, with no horizontal scroll.
4. "Where I teach" lists exactly the two §6.5 items. `grep -ci "vancouver film school\|\bVFS\b" .next-build/server/app/teaching.html` returns 0.
5. "Programs and camps" lists the five items verbatim, including "Whatì" (with the accent) and "Frog Hollow Neighbourhood House". `grep -rliE "at-risk|at risk" .next-build/server/app --include=*.html` returns nothing. The Frames item carries no descriptor.
6. **Camp facts line:**
   - With `factsLine` unset, the Programs block's last element is its `<ul>`; no empty `<p>` or row element exists.
   - With a temporary value set, it renders as the block's last row and the columns stay aligned. Revert it.
7. The coaching block reads "Tell me what you're making and where it's stuck." The page's HTML contains no `$`, no "rate", no "price".
8. **Default media:**
   - `/teaching` renders no `<img>` outside the chrome, no `Frame`, and no In the room section.
   - The opener text's computed `max-width` is 60ch.
   - The page has no `preload` image.
9. **Photo fixture (temporary):** add one adult photo to `roomPhotos` and one as `openerPhoto`, using a §11 default-cleared set photo, `docs/client/behind-the-scenes/e986099a-d2c2-4df1-b8f9-057336ec92bc.jpg` (the MPIAA PSA shoot). Put a 3:2 copy at `public/media/photos/fixture-*.jpg`, set `people: "adults"`, then delete the copy and revert the entries.
   - Opener: beside the text at 1440, after the text at 390.
   - Room: a row at 1440, stacked at 390.
   - Each photo has its caption, is 3:2 with CLS 0 (the performance panel shows no shift), and has a non-empty `alt`.
10. **Consent inductions** (Vigil 1–4). Each fails `yarn verify` and names `content/teaching.ts`, the entry and the fix:
    - (a) minors with `guardianConsent: "2026-13-40"` fails `build:agent`, thrown by `validate.ts`
    - (b) minors without `guardianConsent` fails `check-types` (or `build:agent` if typed loosely)
    - (c) a Whatì photo without `communityConsent` fails
    - (d) a photo with no `people` fails
    - The closing note quotes each first error line. Every fixture is reverted, and `git status` shows no fixture file.
11. **Testimonial fixtures** (temporary, `consent.how: "written"`, `record: "fixture — not real"`, no real person's name or words; revert all):
    - One `full`, one `first-name-role`, one `anonymous-role`: "What people say" appears, two columns at ≥1024 with each quote ≤52ch wide, stacked at 390. Attribution reads "{name}, {role}", "{name}, {role}" and "{role}". The anonymous entry's `name` string is absent from the HTML.
    - A fifth teaching testimonial fails the build with the cap.
    - A `first-name-role` `name` containing a space fails the build.
    - A `page: "about"` fixture never renders on `/teaching`.
12. **No student named:** every caption, `alt` and attribution in the fixtures was reviewed against §7.6, and the closing note states it. The shipped default contains no personal name except his.
13. **Email hand-off:**
    - It is the last content before the footer: the Locked sentence in the Lead step, then `SITE.email` as `mailto:` with no `?subject`.
    - The bar's Contact link stays on screen at 390.
    - At 320 the address wraps without overflow.
14. **Chrome:**
    - The bar marks Teaching `aria-current="page"` with the 2 px `--link` underline.
    - The skip link reads "Skip to content" and moves focus to `main`.
    - Home's "Teaching →" and the bar's Teaching link both land on this page with 200, where they returned 404 before this slice.
15. **Negative:**
    - `grep -rn "use client" "app/(site)/teaching"` returns nothing.
    - The page imports nothing from `@/review/*`, `@/lib/review/*` or `@/app/review/*` (lint passes).
    - No hex and no inline route string (`siteRoutes.teaching` only).
    - Cold load: no request to a video host.
16. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/teaching` (plus 1024 and 320 for criteria 3 and 13) via `yarn dev:agent`, never `yarn dev` or `yarn build`. A closing note is appended to this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- Tailwind v4 ships `grid-rows-subgrid`. One shape that works: parent `lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-x-6`, each block `lg:row-span-3 lg:grid lg:grid-rows-subgrid`. `lg` is 1024 by default. Check the gap: `row-gap` on the parent is inherited by the subgrid rows.
- The facts row exists in the grid template whether or not a block fills it. Render nothing into it (no empty `<p>`), so criterion 6 holds.
- Reference the Teaching strand constant instead of copying its string. If SITE-3 moved `STRANDS` out of `content/site.ts`, import from wherever it now lives. Content importing content is allowed (CONVENTIONS §3).
- `Photo.src`: if SITE-2 made it a static import, width, height and blur come for free and a missing file fails the build. If it's a string path, pass real `width`/`height` and a real `sizes`. No `w-auto` on `next/image` (PERFORMANCE §4).
- The LCP element is the H1 (spec §10). Don't `preload` an opener photo; `loading` is your call.
- Reading `SITE.email` in the page and passing it down is fine; there are no client leaves on this page.
- Validator messages in one voice with SITE-2's. Reuse its message helper if it has one.

## Dev's call

- The `TEACHING` object's exact field names, beyond the shape above (keep the `// SITE-C:` comments).
- Whether the blocks are one `_components/` file or inline in the page.
- The opener photo's column share at ≥1024 (text stays ≤60ch).
- Gap sizes inside a block, within the kit's rhythm (spec §4.1).
- `loading` on photos.
- The internal shape of the shared testimonial and photo components (ruling 8), as long as About can use them unchanged.

Anything with real alternatives goes to `TECHNICAL-DECISIONS.md`.

## Out of scope

- **Final words** (H1 confirmation and red phrase, opener, block bodies cut from his words, coaching body, facts line, captions, meta description): SITE-C.
- **Collecting testimonials and consent records:** Kryshan and Taylor, per handoff Appendix D's ask and spec §11. They enter as content edits, not a ticket.
- **Photos he hasn't sent, and the LaSalle graduate photo's clearance and crop:** O-SITE-14 answer, then Vitrine.
- **VFS** (O-SITE-5, launch-blocking), **the Frames wording** and **the camp facts** (O-SITE-14): the one message; Taylor.
- **About's testimonials, portrait and On set photos:** SITE-6.
- **`/teaching` in the sitemap:** SITE-5's `app/sitemap.ts`.
- **An articles or press block on Teaching** (for example the Vancouver Courier piece on Frames): not in spec §6.5; v1.1 if wanted.
- **Launch-tier validation, `docs/EDITING.md`, Lighthouse per template:** SITE-10.
- **The Home Teaching strand's copy:** SITE-3, from content SITE-C owns.

## Depends on

- **SITE-2** — `Photo`, `Testimonial`, `IsoDate`, `content/testimonials.ts`, `content/validate.ts` wired into `app/(site)/layout.tsx`. Complete in `PROGRESS.md`.
- **SITE-1** — `siteRoutes.teaching`, the bar's `aria-current`, the skip link, `--bar-h`. Complete via SITE-2's gate.
- **SITE-3** — `components/composed/site/email-hand-off.tsx` (the hand-off component) and the shared photo parts, if SITE-6 has created them. Complete in `PROGRESS.md`. *(Reconciled 2026-09-24: the build order now lists SITE-3; the earlier inline fallback is withdrawn.)*

## Recommended Claude Code execution

**Opus 5.5.** The page is simple; the risk is the consent wiring and the discipline not to write. Choosing down (Sonnet 5), the likely failures are:
- It builds a clean page but never passes the teaching photos through SITE-2's consent checks, so a minor's photo builds green.
- It fills the empty opener, facts line or Frames descriptor with plausible invented copy. That is the one failure the ticket can't recover from, because it reads as his words.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-7 — Teaching** (`docs/specs/03-site-build/SITE-7-teaching.md`). Model: **Opus 5.5**. **Nothing on this page names a student, says "at-risk", or shows a minor without consent dates, and a violation fails the build, not the page.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §6.5, §3 (outlines), §4.1–§4.3, §7.6, §9, §11
> 3. `docs/specs/03-site-build/00-build-order.md` (SITE-7 scope sheet)
> 4. SITE-2's ticket and closing note (`Photo`, `Testimonial`, `validate.ts`; reuse, don't fork)
> 5. SITE-1's and SITE-3's closing notes (routes, bar, `email-hand-off.tsx`)
> 6. SITE-6's closing note if Complete (shared testimonial and photo components)
> 7. `AGENTS.md`, `docs/CONVENTIONS.md`, `docs/PERFORMANCE.md`, `docs/specs/README.md` (kickoff contract)
> 8. `docs/specs/DEVIATIONS.md`
> 9. `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Write no copy: strings are §6.5 verbatim, Locked by reference, or absent. Route anything else to SITE-C.
> - Routes from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`.
> - Client leaves never import `@/lib/config` (this page needs none).
> - No upward imports; nothing public imports `review/`.
> - Never run `yarn dev` or `yarn build`; use `yarn dev:agent` / `yarn build:agent`.
> - If a non-negotiable would have to break, STOP and ask.
>
> Run every induction in acceptance 10–11, quote the errors, and revert every fixture.
>
> Close in three places: this ticket's Status, `docs/specs/PROGRESS.md`, `DEVIATIONS.md` (and `TECHNICAL-DECISIONS.md` for real-alternative choices). Then tick `03-site-build/00-build-order.md`. Report what `yarn verify` printed.

---

## Closing note

**Closed 2026-09-24 by Mason (Claude Code, the one SITE thread; Batch 3 with SITE-6 and SITE-8).**

**What shipped.**
- **`/teaching`** (static, no client code): the h1 (provisional default), the interim opener, three blocks on a subgrid, the email hand-off.
- **Absent until content arrives:** "In the room" and "What people say".
- **Content:** `content/teaching.ts`.
- **Shared:** `components/composed/site/testimonial.tsx`, now also used by About.
- **Validation:** Teaching's checks in `content/validate.ts`.
- **Shipped by default:** no photos and no testimonials.

**Verified.**
- **#1 Metadata:** 200 and ○; "Teaching — Kryshan Randel"; with `NEXT_PUBLIC_SITE_URL` unset, the canonical is `https://kryshanrandel.com/teaching`; the description is the Teaching strand and unique.
- **#2 Outline:** h1 · h2 Where I teach · h2 Programs and camps · h2 One-on-one coaching. No "What people say".
- **#3 Subgrid:**
  - at 1440 and 1024, the h2 tops are equal and the body tops are equal
  - with one heading forced onto three lines at 1024, the bodies still share one top (430 px)
  - 768, 390 and 320 stack in DOM order with no overflow
- **#4 No VFS:** 0 matches.
- **#5 Programs:** five items verbatim, including "Whatì" and "Frog Hollow Neighbourhood House"; "at-risk" appears 0 times across the built HTML.
- **#6 Facts line:** with none, the Programs block ends on its `<ul>`. A fixture rendered as the last row with the columns aligned; reverted.
- **#7 Coaching:** the coaching sentence; the visible text has no `$`, "rate" or "price".
- **#8 Default media:** no `<img>` in `main`, no preload, the opener at 60ch.
- **#9 Photo fixtures** (MPIAA copies, reverted): the opener sits beside the text at 1440 and after it at 390; the room photo is in its row at 1440 and full width at 390. Both are 3:2 with a caption and alt text.
- **#10 and #11 Consent inductions** (each reverted; no fixture file remains), with first error lines:
  - (a) `build:agent`: "content/teaching.ts: "Fixture room caption." has the date "2026-13-40" in guardianConsent. Write dates as year-month-day, like 2026-03-02."
  - (b) `check-types`: "Type '{ minors: true; programConsent: "2026-01-02"; }' is not assignable to type 'PhotoPeople'."
  - (c) `build:agent`: "…the photo "Reel Youth, Whatì, 2017." is from Reel Youth in Whatì and needs communityConsent…"
  - (d) `check-types`: "Property 'people' is missing … but required in type 'Photo'."
  - (e) `build:agent`: "content/testimonials.ts: the Teaching page shows at most 4 quotes, and 5 are marked for it. Remove one."
  - (f) `build:agent`: "…the quote from "Sam Lee" is set to show a first name and role, but "Sam Lee" is more than one word…"
- **Testimonial display fixtures:**
  - the full, first-name and anonymous forms render "{name}, {role}", "{name}, {role}" and "{role}", roman
  - two columns at ≥1024 (each 476 px, under 52ch), stacked at 390
  - an About-only fixture doesn't appear
  - the anonymous name was found in the HTML (through the list key), fixed, then confirmed absent
- **#12 No student named:** every fixture caption, alt and attribution was placeholder text, reviewed against §7.6. The shipped default names no one but him.
- **#13 Hand-off:** last before the footer, `mailto:` with no subject; at 320 the address is a 44 px target inside the viewport; the bar's Contact stays.
- **#14 Links in:** Teaching `aria-current="page"`; Home's "Teaching →" and the bar's link now land with 200.
- **#15 Negative checks:** no "use client", no review imports, no hex, no inline route.
- **`yarn verify`:** passed.

**Deviations:** 9 SITE-7 lines.

**The one thing SITE-8 must know:** Contact reuses `CopyButton` in `"select"` mode, with the address element's id as `selectTargetId`. Its strings (Copy / Copied / "Couldn't copy. The address is selected.") belong in `content/site.ts` beside `FILM_COPY`, and the page has no form.

