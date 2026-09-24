# Demo D — UX → dev handoff (v1)

**Owner:** Vitrine (lead web designer) · **Consulted:** Vesper (interaction and states), Mason (build and placement), Drummer (conversion and scope), Tribune (the client and the visitor), Sage (behavioural evidence)
**Date:** 2026-09-24 · **Track:** `docs/specs/02-review-demo-d/` · **Epic:** KR (proposed tickets KR-7, KR-8, KR-9, §17)
**Status:** Ready for ticket authoring. Every ruling in §14 is **Ruled** unless marked otherwise.

**Reads with, in order:**
1. `docs/client/kryshan-08-review-synthesis.md`: what he said and how each comment was classified.
2. `docs/client/kryshan-04-brand-pillars.md` Step 8: Card A v2, with Generous replaced by Galvanizing.
3. `docs/client/kryshan-06-layout-A.md`: the layout D starts from.
4. What he actually saw: `review/kits/kryshan-a.ts`, `review/mocks/home-a.tsx`, `review/mocks/_components/expanding-grid.tsx`.
5. `docs/specs/TECHNICAL-DECISIONS.md`: M-KR-1 (the expand motion) and M-KR-3 (any mock in any kit).

---

## 0. In one paragraph

Kryshan chose Layout A in Kit A on every question, flagged four things inside it, and invited "a few more elements to borrow from what Netflix does so well, but only in the spirit of keeping things simple and fast." The four things:
- his name twice
- a Close button he couldn't see
- a "Full page" link he couldn't make sense of
- noise around the player

**Demo D** is A with those fixed and the Netflix borrowings added. It is built **beside** A, not over it, so Taylor and Kryshan can open A and D and compare before and after. D has:
- the same tokens as Kit A
- the same six-film spine
- the same one deliberate moment

What changed is how little sits around the work:
- his name set once, in a bar that stays on screen
- his own line in a wider first square
- a film that opens across the whole width, right below where it was tapped
- an ✕ you can see
- a genre line on every film
- no tile ever blank
- two rows of more work to swipe across (a separate ticket)

A stays exactly as he saw it.

---

## 1. Frame

**Who opens Demo D, and in what state.** Two people.
- **Kryshan**, calm, on a laptop and on his phone, with Demo A open in another tab. He is checking two things:
  - that each flinch is gone
  - that "Netflix" arrived without the noise he called out in Layout B
- **The visitor D rehearses:** a producer on a phone with two bars and four minutes, who came from someone else's recommendation and has a shortlist. Every ruling is checked against this person, not only against Kryshan's taste (synthesis §8).

**The one job of Demo D's page:** get from landing to a playing film in one tap, and from a playing film to his email in one more, with nothing on screen that isn't the work, his name once, his voice once, or a way to reach him.

**Register:** Kit A's, unchanged: dry, precise, red used as punctuation. No new colour, no new face, no new motion idea.

**Emotional contract:** he should feel he was heard and that nothing he liked was taken away. The producer should feel the work is the point and he is easy to reach.

**Not in this track (binding):**
- **No change to A.** `review/kits/kryshan-a.ts`, `review/layouts/kryshan-a.md`, `review/mocks/home-a.tsx`, `review/mocks/_components/expanding-grid.tsx`, and the rendered Demo A all stay as reviewed. One exception is accepted: the contact email becomes shared (D-KRD-16).
- **No real site.** No Work, About, Teaching or Contact pages. No project detail pages. No production kit. No redirects. Forward notes for the real build are in Appendix D; none of them is built here.
- **The round-1 feedback form stays frozen:** same questions, same options, same schema `kryshan-2026-09`. A round-2 form is not specified.
- **No new dependency.**

---

## 2. What changes from A

| # | In A, as he saw it | In D | Why (his words, or the consult) | Ruling |
|---|---|---|---|---|
| 1 | Wordmark in the nav, plus his name again as the title cell's H1 | Name set once, in the top bar; the title cell's H1 is his first-person line | "My name twice" | D-KRD-3 |
| 2 | Nav bar scrolls away | The bar stays at the top (sticky); on phones the wordmark and **Contact** stay, and the other links scroll away | Netflix; contact always one tap (Drummer) | D-KRD-4 |
| 3 | Title cell 1 column, name at display size | Title cell 2 columns wide, his line at H1 size, roles line beneath; six featured films (Contact Club and Born To Be move to the Directing row) | 5.9/7 "more of me on Home", without Layout B's noise | D-KRD-5 |
| 4 | Tapped cell grows to 2×2 in the grid; other cells reflow around it | The tile stays; the film opens **full width on the line below the tapped tile's row** ("the jawbone"); on phones it replaces the tile | "if videos go full screen"; one grammar for grid and rows (Vesper, Mason) | D-KRD-6 |
| 5 | "Close" text button below the player and the meta | An ✕ at the right of a slim strip **above** the player; Esc; tap the tile again | "harder to see right away, maybe just an 'x' instead?" | D-KRD-7 |
| 6 | "Full page →" (a dead link) + email + Close on one line | No "Full page". The email stays: one line, alone, last | "the 'full page' linking to my email … Looks too noisy/crowded"; 02 §0 (Tribune, Vesper) | D-KRD-8 |
| 7 | Meta line: year · role · client | **Kind · year · role** ("Short · 2009 · Director"); client stays in the tile's top-left label | Netflix's genre line; producers hire by kind | D-KRD-9 |
| 8 | "Passion project" label or client name | Same, stated as law: "For hire" appears nowhere | "just the names of the clients implying they are for hire" | D-KRD-10 |
| 9 | Tiles are empty until the poster loads | A blurred poster from the start; a failed image shows a titled card | His McKee refusal (white cells); Netflix never shows an empty tile | D-KRD-11 |
| 10 | No play cue | A small play glyph on hover and focus, playable tiles only, mouse and trackpad only | Netflix; "hover, see the text, click, instantly watch" (Levin) | D-KRD-12 |
| 11 | Three text strands below the grid | Two rows you swipe across (Directing · Camera and editing), each captioned with its strand; the Teaching strand stays as text | Netflix; "scroll either down or across"; "too much text" | D-KRD-13 (KR-9) |
| 12 | Inert links jump to the top of the page | Unbuilt links say so in one line and never move the page | The "Full page" confusion was a dead link read as a live one | D-KRD-15 |

---

## 3. Routes and registries

No new route segment; D is new registry entries in the existing review routes.

| URL | What | Notes |
|---|---|---|
| `/review/kits/kryshan-d` | Kit D's style page | The existing kit template, unchanged |
| `/review/layouts/kryshan-d` | Layout D: brief first, the markdown folded below | The existing template; brief in Appendix A, markdown per Appendix B |
| `/review/mocks/home-d/kryshan-d` | **Demo D** | The page this handoff specifies |
| `/review/mocks/home-d` | Redirects to `/review/mocks/home-d/kryshan-d` | Existing behaviour (the paired kit) |
| `/review/mocks/home-d/kryshan-{a,b,c}` · `/review/mocks/home-{a,b,c}/kryshan-d` | 404 | Rounds don't mix (D-KRD-17) |

**Round separation (D-KRD-17).** Kits, layouts and mocks each gain a `round: 1 | 2`. A, B and C are round 1; D is round 2.
- The kit switcher on a mock page lists only kits of the mock's round. For D that means only Kit D, so the switcher shows its layout name and a compare link (§13) instead of kit buttons.
- The mock page calls `notFound()` for a cross-round combination.
- `review/feedback.ts` builds every option from round-1 entries only, so the submitted form and `FEEDBACK_SCHEMA` are unchanged.
- `[ASSUMPTION: a field on each registry entry, not a separate registry. Mason's call on the shape; the behaviour above is the contract.]`

**Contact email (D-KRD-16).**
- New server variable `CONTACT_EMAIL` in `lib/env.ts`: `z.string().email()`, required.
- `SITE.email` in `lib/config.ts` reads it. `.env.example` documents it, with the value to use until Kryshan's new address is verified (`kryshanrandel@gmail.com`).
- `content/home.ts` stops hardcoding the Gmail mailto and derives it from `SITE.email`.
- The value reaches client components only as a prop from a server component, never by importing `lib/config` into a client leaf.
- Taylor will advise him to create `hello@kryshanrandel.com`. It goes live by changing the variable, only after a test email sent from an outside account arrives.

---

## 4. Kit D

`review/kits/kryshan-d.ts` exports `KRYSHAN_KIT_D`, built as `{ ...KRYSHAN_KIT_A, …overrides }`:
- Every colour, font loader, radius, ramp, type step and extra variable is **A's, by reference**. The comparison is honest, and A's file is not touched.
- The `next/font` loader is not duplicated.
- The overrides are text only (Appendix C):
  - `id` `kryshan-d`, `letter` `D`
  - `name`, `thesis`, `roles` (A's roles plus the passion label)
  - `voice.contact`, built from `SITE.email`
  - `never` (A's list plus four)
  - `placeholder: false`

`review/brand.ts` gains a `KIT_LEADS` entry for D:
- lead Wicked, guardrail "Wicked, but not nasty.", Card A v2's two tie-breaks
- `current: true`, `revises: "kryshan-a"`

A's entry keeps `chosen: true` (his choice in the round).

---

## 5. Layout D

**Registry.** A `review/layouts/index.ts` entry:
- `id` `kryshan-d`, `letter` `D`, `name` "The Marquee, revised"
- `thesis`: "Layout A after your review: your name once, your films first, and a film that opens across the page right where you tapped it."
- `kitId` `kryshan-d`, `mockId` `home-d`, `file` `kryshan-d.md`, `round` 2
- `brief`: Appendix A, verbatim

**Markdown.** `review/layouts/kryshan-d.md` is `kryshan-a.md` copied verbatim (KR-7), then:
- Appendix B's amendment block inserted after the title (KR-8)
- its §4 Home and §5 Component inventory patched where Appendix B says

The rest of the file stays as A's. It describes pages this demo doesn't build, and it is the record of what those pages will be.

---

## 6. Demo D's home, surface by surface

`review/mocks/home-d.tsx` (server component), rendered by the existing mock page inside Kit D's `KitScope`. New client leaves live beside A's in `review/mocks/_components/`, as **new files**. A's components are never edited. D may import shared, unchanged leaves: `project-player.tsx`, `frame-ribbon.tsx`, `view-transition.ts`, `components/composed/media/*`.

### 6.1 Page order

1. Top bar (sticky), §6.2
2. Featured grid: the title cell plus six films, §6.3, §6.4
3. **[KR-9]** Directing row, then Camera and editing row, §6.6. Until KR-9 lands, this slot holds A's Directing and Camera and editing strands, unchanged.
4. Teaching strand (text), §6.7
5. "All 27 pieces →", §6.7
6. Footer, §6.7

One open film at a time on the whole page, wherever it was opened (§6.5).

### 6.2 Top bar (D-KRD-4)

**Content:**
- **Wordmark** "Kryshan Randel": A's treatment (Archivo 800, `font-stretch: 72%`, uppercase, 20 px, tracking +1%, `text-primary`). It links to the top of this page. It is never a heading. Accessible name "Kryshan Randel, back to top".
- **Nav:** Work · About · Teaching · Contact, in A's label style (Archivo 600, width 88, 11 px, tracking 18%, uppercase, `foreground`, hover `--link`). All four are unbuilt links (§6.8). Hit area 44 px tall through padding.

**Position:**
- `position: sticky`, stuck at `top: var(--review-bar-h, 0px)`, directly under the review layer's own sticky bar.
- The review bar publishes its measured height as `--review-bar-h` on `<html>` with a `ResizeObserver`. In the real site there is no review bar and the variable falls back to 0.
- `z-index` above the tiles and below the review bar (which is `z-40`).
- Its own `view-transition-name` (`demo-bar`), so tiles animating during an open or close never paint over it.

**Look:**
- Solid `background`, never translucent, never blurred, never over a poster.
- At rest: no hairline.
- Once the page has scrolled 8 px: a `border-border/40` bottom hairline, driven by CSS `animation-timeline: scroll()`.
- Where scroll-driven animations aren't supported, the hairline shows all the time. No JS.

**Breakpoints:**
- **≥768:** one line. Wordmark left, the four nav items right, 56 px tall, gutters as A (24 px).
- **<768:** a **44 px sticky line** with the wordmark left and **Contact** right (same label style). The other three (Work · About · Teaching) sit in a **non-sticky row directly beneath** it, which scrolls away with the page. No hamburger, no hide-on-scroll script. Contact is one tap from anywhere on a phone.

### 6.3 Title cell (D-KRD-3, D-KRD-5)

The grid's first item. It is **him, in his voice**, never his name.

**Content, top to bottom, bottom-aligned inside the cell:**
1. **H1**, the page's only h1: *I direct, shoot and edit stories that are* **hard to look away from.**
   - Kit A's H1 step: Archivo 700, width 80, leading 1.02, sentence case, `foreground`.
   - The phrase "hard to look away from." is in `text-primary` (red 500). That is AA for large text only, so the H1 never renders below 24 px.
   - Size: 40 px at ≥1280, `clamp(2rem, 2.6vw, 2.5rem)` from 768 to 1279, 32 px below 768.
2. **Roles and place line:** `SITE.tagline` + " " + `SITE.place` ("Director, camera operator, editor, and film instructor. Vancouver, works anywhere."). Kit A's Lead step (Archivo 400, 20 px, leading 1.4) at ≥768; 16 px below. `foreground`, max 48ch.
3. **<768 only:** "Watch ↓" in A's label style, `--link`, an in-page link to the first film tile (as in A).

**Geometry:**
- **≥1280:** spans **2 columns × 1 row**. If the text is taller than a tile at some width, the row grows and the tiles in it align to the top. The text is never clipped and never shrunk below the sizes above.
- **768–1279:** spans the full row (both columns), padding-block 24 px.
- **<768:** full width, padding 24 px top and 16 px bottom, no minimum height. On a 375 × 667 screen the whole first poster is visible below it (the bar, nav row and cell together stay under about 370 px).

**Portrait (rule for later; nothing renders today):**
- When he supplies a current portrait, it sits at 4:5 to the left of the text inside the cell.
- The cell then spans 2 × 2 at ≥1280, and the featured list grows to eight (Contact Club and Born To Be return to it) so every grid row stays full.
- With no portrait there is no empty frame, no placeholder and no ribbon.

### 6.4 Featured grid and the tile

**Films, in order (six):** `just-watch-us`, `directors-reel`, `jack`, `5rhythms`, `the-wolf-of-west-georgia-street`, `just-up-the-block`. That is his top five plus his "lead with this" flags. `rights: "nda"` never renders (as A).

**Grid:** 4 columns at ≥1280, 2 at 768–1279, 1 below 768; gaps and gutters as A (12 and 16 px gaps; 12 and 24 px gutters).
- ≥1280: `[title title JWU Reel] [Jack 5Rhythms Wolf Block]`, two full rows.
- 768–1279: `[title title] [JWU Reel] [Jack 5Rhythms] [Wolf Block]`.

**The tile.** A's frame and scrim, with these differences:
- **Element:** a `<button>` (the demo has no detail pages). `aria-expanded`, and `aria-controls` pointing at the panel while it's open. Accessible name: "Play {title}, {meta line}" for YouTube or Vimeo; "Open {title}, {meta line}" otherwise.
- **Top-left label** (as A): "Passion project" in `--link` for `lane: "passion"`, otherwise the client name in `muted-foreground`, otherwise nothing (the Directors Reel). Never the words "For hire".
- **Bottom scrim** (as A): the title (Archivo 600, width 88, 18 px), then the **meta line**: `{kind} · {year} · {roleLabel}`, e.g. "PSA · 2019 · Director / Co-writer" or "Short · 2009 · Director" (caption step: Archivo 500, width 90, 13 px, `muted-foreground`). Built once by a `projectMetaLine(project)` exported beside the type in `content/projects.ts`, additively; A doesn't call it.
- **Meta visibility** (as A): fades in on hover and focus-visible on fine pointers; always visible under 768 px and on coarse pointers.
- **Play glyph** (D-KRD-12): YouTube and Vimeo tiles only, fine pointers only.
  - A 32 px circle, `background` at 85%, with a bone triangle, 12 px from the bottom-right corner above the scrim text.
  - Fades in with the meta.
  - Link-out and pending tiles show no glyph.
  - Never shown on touch.
- **Poster:** never blank (D-KRD-11).
  - Blurred placeholder at build time: `next/image` `placeholder="blur"` from a static import.
  - Mechanism, `[PROPOSED — Mason]`: a D-only map of static poster imports in `review/mocks/_components/`, keyed by slug. `content/projects.ts` keeps its shape, so A renders unchanged. The real build moves this into `content/posters.ts` (Appendix D).
  - The first film's poster gets `preload` (Next 16's replacement for `priority`); every other poster is lazy.
- **Existing ribbons stay:** "Frame to be replaced" on the Directors Reel poster until he supplies a replacement (open item O-3).

### 6.5 The open film: the panel (D-KRD-6, D-KRD-7, D-KRD-8)

**One grammar, everywhere.** The film opens **full width, on the line below where you tapped it**, and the tile you tapped stays in place, marked.
- **In the grid:** the panel is a full-width grid item (`col-span-full`) inserted directly after the **last tile of the tapped tile's visual row**. The column count is read from the grid's computed `grid-template-columns` when the panel opens and again on resize. No `grid-auto-flow: dense`: DOM order and visual order must stay the same.
- **In a row (KR-9):** the panel is inserted directly after that row's scroller (the scroller would clip it).
- **Below 768 px:** the panel **replaces** the tapped tile. The tile is `hidden` while the panel is open, so the same poster isn't shown twice, and it is restored on close.
- **One panel per page.** A single open-film store, shared by the grid and both rows, holds one slug. Opening anything closes whatever is open.

**Panel anatomy, in DOM order:**

1. **Close strip:** 44 px tall, full panel width, holding one button at its right end.
   - The **✕**: an inline SVG (20 px, 2 px stroke, round caps), `foreground` (bone on ink, 16.7:1). Not the "✕" character, which Archivo may lack.
   - 44 × 44 target. Accessible name "Close {title}".
   - Hover `--link`. Focus-visible ring `ring`, 2 px, 2 px offset.
   - **Never over the video:** YouTube's and Vimeo's own controls live in the video's top corners.
2. **Body:**
   - **≥1280:** two columns. The player on the left, at width `min(100% − 320px − 24px, (100svh − var(--review-bar-h,0px) − var(--demo-bar-h) − 44px − 32px) × 16/9)`. The meta column on the right, at least 320 px wide, top-aligned.
   - **<1280:** one column. The player at `min(100%, same height cap × 16/9)`, centred, with the meta beneath.
3. **Player:** the existing `ProjectPlayer`, unchanged.
   - YouTube and Vimeo mount already playing (the tap was the gesture).
   - Link-outs show the poster and "Watch on the old site →" (see O-6).
   - Pending pieces show the "Link pending" ribbon.
   - No player, iframe or third-party request exists before the tap.
4. **Meta column, top to bottom:**
   - **Title:** Archivo 700, width 80, 28 px, leading 1.02. `id` for the panel's `aria-labelledby`.
   - **Meta line:** the same `projectMetaLine`.
   - **Lane:** "Passion project" in `--link`, or the client name in `muted-foreground`. One or the other, never both, never "For hire".
   - **Story**, when the project has one (none do yet): body 14 px, leading 1.6, max 68ch. Absent means no gap.
   - **Awards**, when present: at most three lines (one award, two festivals, as in the data). `muted-foreground`, 14 px. Absent means no gap.
   - **Email:** the address itself (`SITE.email`) as a `mailto:` link, alone on its line, 14 px, `--link`, underline on hover. **The last element in the panel.** No label, no icon, no "Full page", no Close text.
5. **Surface:** `background`, `border-border/40` hairline around the panel, 16 px padding at the bottom and inline around the meta. No shadow.

**Behaviour:**

| Action | Result |
|---|---|
| Tap, click, Enter or Space on a tile | The panel opens at its insertion point; the tile goes to its open state. |
| The same tile again | Closes. |
| Another tile **on the same visual line** (or in the same row) while open | The panel's content swaps in place with a 150 ms crossfade (instant under reduced motion); the old tile returns to default, the new one goes to open. |
| Another tile **elsewhere** | This panel closes and the new one opens at its own insertion point, as one transition. |
| ✕ | Closes. |
| Esc | Closes, **while focus is on the page**. Esc can't reach the page while focus is inside the cross-origin player, which is why the ✕ is the dependable way out. |
| Resize or rotate while open | The insertion point is recomputed; the panel stays open on the same film. |

**On open:**
- After layout settles (inside the view-transition callback), if the player isn't fully visible, scroll so the panel's top sits just under the demo bar (smooth; instant under reduced motion).
- Focus moves to the panel container (`tabindex="-1"`, `role="region"`, `aria-labelledby` the title). No focus trap. Tab reaches the ✕, then the player, then the email.

**On close:**
- The iframe unmounts, so audio stops.
- Tiles reflow back and focus returns to the tile that opened the panel.
- If the visitor hasn't scrolled since opening, the page returns to where it was before; otherwise the tile is scrolled into view (`block: "nearest"`).

### 6.6 Rows [KR-9] (D-KRD-13)

Two sections after the featured grid, replacing A's Directing and Camera and editing strands. The Teaching strand stays text (§6.7).

**Row header**, one line at ≥768:
- On the left, the H2 (Kit A's H2 step: Archivo 600, width 88, 28 px) with the caption beneath (the strand's body from `STRANDS` in `content/site.ts`, `muted-foreground`, 16 px, max 60ch).
- On the right, the arrow pair (pointer devices only).
- Below 768: stacked, no arrows.

**Row films (curated, explicit, in this order):**
- **Directing:** `contact-club`, `born-to-be`, `a-very-bc-production`, `dare`, `its-a-crazier-life`, `be-reel-green`, `artless`, `united8s`.
- **Camera and editing:** `riverdale-ew-bts`, `a-dogs-way-home-epk`, `tuts-2026-trailer`, `tuts-2025-season-teaser`, `tradeswoman-exhibit`, `digital-days`, `rffc-were-in-this-together`.

**Curation rules** (these produced the lists; they govern edits):
- Nothing already in the featured grid.
- Each piece in one row only, by its first role.
- No poster marked "replace" (Glimpse, The Bully Solution).
- No baked-in title card (Twenty8s).
- No link-outs (Shotlister).
- No pending links (VANDU).
- At most eight per row.
- Mix passion and paid work for range.

**Track:**
- A horizontal scroller: `overflow-x: auto`, `scroll-snap-type: x mandatory`, tiles `scroll-snap-align: start`, `scroll-padding-inline` equal to the gutter, no visible scrollbar on fine pointers.
- Tile width: `(row width − 4 × 16px) / 4.5` at ≥1280, so the half tile is the "there's more" cue; `(row width − 2 × 16px) / 2.5` at 768–1279; 85% of the row width below 768 (a 15% peek).
- **The same tile as §6.4**, with the same states, labels, meta line and glyph.
- **No "All directing →" end tile** in the demo (it would be a dead link); the real build adds one (Appendix D).

**Arrows:**
- Two 44 × 44 buttons in the header row: bone chevrons (inline SVG) on a solid `card` plate, hover `--link`.
- Each is hidden at its end of the scroll, and both are hidden when the row fits.
- Mouse and trackpad only: `aria-hidden="true"`, `tabindex="-1"`. Keyboard users Tab through the tiles, and each focused tile is scrolled into view.
- One click scrolls one page (visible width minus one tile): smooth, or instant under reduced motion.

**Opening a film from a row:** the panel appears directly beneath the row's track, full content width, and the row keeps its scroll position. Everything else is §6.5.

**Semantics:** each row is a `<section aria-labelledby>` its H2, and the track is a `<ul>`.

### 6.7 Teaching strand, "All 27 pieces", footer

**Teaching strand.**
- Before KR-9: A's three strands, unchanged.
- After KR-9: the Teaching strand alone. A's strand block at full content width, max 60ch body: "Teaching" H2, the strand text, and "Teaching →" as an unbuilt link (§6.8).
- No photo: Kit A's never-list forbids photos under videos, and this sits below two rows of them.

**All 27 pieces →**, as A, but as an unbuilt link (§6.8). The count comes from `PROJECTS.length`, not typed.

**Footer**, as A:
- The email (`SITE.email`), `foreground`, body size, hover `--link`
- "Vancouver, works anywhere."
- IMDb · Vimeo · YouTube · LinkedIn, with Instagram and Facebook on a quieter second line (02 §14 Q11 default)

### 6.8 Unbuilt links: demo honesty (D-KRD-15)

Every link to a page the demo doesn't build: the four nav items, "Teaching →", "All 27 pieces →", and any strand link before KR-9.
- It keeps its look and hover. It is `aria-disabled="true"`, never `href="#"` (A's links jump to the top).
- Activating it shows one toast through the review layer's existing `Toaster`, for about 3 seconds: **"That page isn't built yet. This demo is the home page."** It never scrolls and never navigates.
- The toast is announced politely.
- The real email and the social links are real links.

This is the lesson of the "Full page" confusion: in a demo, a link that looks live and goes nowhere reads as the design, not as a gap.

---

## 7. Breakpoints

| | ≥1280 | 768–1279 | <768 |
|---|---|---|---|
| Top bar | One line: wordmark and four links, 56 px, sticky | Same | 44 px sticky line (wordmark · Contact) plus a non-sticky row (Work · About · Teaching) |
| Grid | 4 columns; title cell 2 columns | 2 columns; title cell full row | 1 column; title cell full width, then "Watch ↓" |
| Tile meta | On hover and focus | On hover and focus (always on coarse pointers) | Always |
| Panel | Full width under the tapped row; player left, meta right (≥320 px) | Full width under the tapped row; meta below | Replaces the tile; meta below |
| Rows [KR-9] | 4.5 tiles visible; arrows | 2.5 tiles; arrows on pointer devices | 1 tile plus a 15% peek; swipe; no arrows |

---

## 8. States

| Element | States |
|---|---|
| **Tile** | default · hover (fine pointer: hairline to full `border`, title lifts 2 px, meta and glyph fade in) · focus-visible (ring plus the hover changes) · **open** (`aria-expanded="true"`, a 2 px `--link` rule along the tile's bottom edge, glyph hidden) · image loading (blur) · image failed (`card` background, the title in the scrim, never blank) · coarse pointer (meta always on, no glyph) · hidden (<768 while its panel is open) |
| **Panel** | opening · player mounting (the poster stays; a `--link` spinner only after 400 ms) · playing · autoplay blocked (the provider's own play button shows; **never** a second play button of ours on top) · embed failed ("The player won't load here." plus the provider link, `--link`) · swapping (150 ms crossfade) · closing (iframe unmounted) · no story or awards (those blocks collapse, no gaps) |
| **✕** | default · hover `--link` · focus-visible ring · pressed (`--link`) |
| **Top bar** | at rest (no hairline) · scrolled (hairline) · <768 split (sticky line plus scrolling row) |
| **Nav item** | default `foreground` · hover `--link` · focus-visible ring · activated (the unbuilt-link toast) |
| **Row [KR-9]** | overflowing (arrows as needed) · fits (no arrows) · at start (left arrow hidden) · at end (right arrow hidden) · focus-within (focused tile scrolled into view) · empty (the section isn't rendered) |
| **Arrow [KR-9]** | default (bone on `card`) · hover `--link` · hidden at its end · absent on coarse pointers and below 768 |
| **Unbuilt link** | default · hover · focus-visible · activated (toast; no movement) |

---

## 9. Motion

Kit A's single deliberate moment, reused: M-KR-1's same-document view transition, 220 ms, `cubic-bezier(0.2,0.8,0.2,1)`, instant under `prefers-reduced-motion: reduce` or without support.
- **Open and close:** the tiles after the insertion point carry `view-transition-name`s and slide by the browser's morph; the panel fades in or out. There is **no** shared-element morph from poster to player: the tile stays on screen, and two elements can't share a name. Only the panel and the tiles after it are named, which keeps phones light. The demo bar has its own name so nothing paints over it.
- **Swap:** 150 ms crossfade of the panel's contents.
- **Hover reveals:** A's 120 ms fades.
- **Row arrows:** `scroll-behavior: smooth` unless reduced motion.
- **Nothing else moves.** No autoplay, no loop, no parallax, no hover previews, no count-ups.
- The builder records the switch from A's 2×2 expansion to the jawbone insertion as a new TECHNICAL-DECISIONS entry (M-KR-6), citing D-KRD-6.

---

## 10. Accessibility (WCAG 2.2 AA; this surface's traps)

- **One h1:** the title cell's line. The wordmark is a link with the accessible name "Kryshan Randel, back to top". Rows are `h2`; the panel title is `h2` inside `role="region"`.
- **Focus not obscured (2.4.11):**
  - With two sticky bars stacked, a tabbed-to tile can hide under them.
  - While Demo D is mounted, `html { scroll-padding-top: calc(var(--review-bar-h,0px) + var(--demo-bar-h)) }`, set by the mock the same way A sets its view-transition CSS. Each panel gets `scroll-margin-top` to match.
- **Contrast** (kit A, computed 2026-09-24):
  - bone on ink, 16.7:1
  - `muted-foreground` (neutral 300) on ink, 7.6:1
  - `--link` (red 300) on ink, 6.9:1
  - bone on `card` (the arrow plates), 12.5:1
  - `primary` (red 500) on ink: 3.4:1, so only the H1 phrase (≥24 px) and the wordmark (20 px at weight 800, which counts as large) use it
- **Targets:** every control at least 44 × 44 through padding (the ✕, arrows, nav items, tiles), above 2.5.8's 24 px minimum.
- **Tiles:** `aria-expanded` and `aria-controls`. On close, focus returns to the originating tile. The name includes the meta line.
- **Iframe:** titled with the project title (existing `VideoEmbed`).
- **Esc:** does not work while focus is inside the player iframe. The ✕ is focusable and first in the panel's order, so a keyboard user can always reach it: Shift+Tab out of the player lands on it.
- **Rows:** keyboard users Tab through the tiles; arrows are hidden from assistive tech (they duplicate scrolling).
- **Reduced motion:** no view transitions, no smooth scrolling, instant crossfades.
- **Toasts:** polite live region, never the only way to learn something essential.
- **Touch:** every hover reveal has an equivalent, and the meta is always visible on coarse pointers.

---

## 11. Performance

- **No video before intent:** no iframe, player script or request to YouTube or Vimeo until a tile is tapped (network tab on a cold load).
- **CLS 0:** every frame reserves 16:9. The panel's player reserves its box before the iframe mounts (the poster fills it).
- **First screen:** only the first poster is `preload`; all row posters are lazy. Blur data is inline (about 21 posters × 300 bytes).
- **JavaScript:** the open-film store and the grid, row and panel leaves; nothing global; the bar's hairline is CSS.
- `[ASSUMPTION: Lighthouse on /review is not meaningful (the review tree is dynamic and gated); the checks are the network tab, CLS and a phone walk, per docs/PERFORMANCE.md §9 items 3–5.]`

---

## 12. Content: every string D shows

| Where | String | Source |
|---|---|---|
| Wordmark | Kryshan Randel | `SITE.name` |
| Nav | Work · About · Teaching · Contact | `NAV_LABELS` |
| H1 | I direct, shoot and edit stories that are **hard to look away from.** | Kit A `voice.h1`; the phrase from 03 §8 |
| Roles line | Director, camera operator, editor, and film instructor. Vancouver, works anywhere. | `SITE.tagline` + `SITE.place` |
| Phone link | Watch ↓ | As A |
| Tile label | Passion project · {client} | `lane`, `client` |
| Meta line | {kind} · {year} · {roleLabel} | `content/projects.ts` |
| Row headings [KR-9] | Directing · Camera and editing | `STRANDS[].title` |
| Row captions [KR-9] | the strand bodies | `STRANDS[].body` (03 §8) |
| Teaching strand | Teaching · its body · Teaching → | `STRANDS` |
| All work | All 27 pieces → | `PROJECTS.length` |
| ✕ name | Close {title} | — |
| Panel email | {SITE.email} | `CONTACT_EMAIL` |
| Embed failed | The player won't load here. | New; in the leaf |
| Unbuilt-link toast | That page isn't built yet. This demo is the home page. | New; in the leaf |
| Footer | {SITE.email} · Vancouver, works anywhere. · socials | `SITE` |

**Canadian spelling. No exclamation marks.** Nothing is invented: no story text, no awards beyond the data, no testimonials.

---

## 13. Review-layer chrome around D

- **Review index (`/review`).**
  - A new first section above the existing three columns, headed **"Revised after your review"**, with one line: "Kit A and Layout A with your changes. Open it beside Demo A to compare."
  - Three cards: Kit D, Layout D, Demo D, plus a **"Compare with Demo A →"** link to `/review/mocks/home-a/kryshan-a`.
  - The existing columns follow under a heading **"The first round"**, with contents unchanged, listing round-1 entries only.
  - The header's "Three ways this site could be." stays as the heading of that first-round section. The page's H1 becomes **"Your site, in review."**
- **Compare links.**
  - `ReviewMock` gains an optional `comparesWith` field (`home-d` ↔ `home-a`).
  - The mock page's switcher bar (review chrome, `data-review-chrome`) shows **"Before: Demo A"** on D and **"After: Demo D"** on A.
  - This edits the chrome, not Demo A.
- **Brand page (`/review/brand`).**
  - "Your kit" shows the current lead (D) with the line "Kit A, revised after your review," and a link to the original Kit A.
  - Its "See it on a home page" link goes to Demo D.
  - The rest is as amended on 2026-09-24.
- **Kit pages.**
  - Kit D's page shows "Wicked leads: Wicked, but not nasty. Kit A, revised after your review."
  - Kit A's shows "Your choice. Revised as Kit D after your review."
- **Feedback form:** unchanged; round-1 options only (§3).
- **Comments:** D's pages accept comments like any review page. Keys are paths, so D's comments never mix with A's.

---

## 14. Decision log

Statuses: **Ruled** · `[PROVISIONAL]` · `[NEEDS DECISION]`. Tickets cite these IDs.

| ID | Ruling | Tradeoff, said out loud | Status |
|---|---|---|---|
| **D-KRD-1** | Demo D is A revised and built beside A. A's kit, layout, mock and components are not edited. | Two copies of similar code, which the review layer's deletion at handover removes. In exchange, an honest before/after. | Ruled (Taylor, 2026-09-24) |
| **D-KRD-2** | Kit D is Kit A's tokens by reference, with text fields amended (Appendix C). | No visual change to judge in the kit itself; D's differences are all structural. That is correct: he chose A's look. | Ruled |
| **D-KRD-3** | His name is set once, in the top bar. The title cell's H1 is his first-person line. The wordmark is a link, never a heading. | Search engines see his name in `<title>` and the bar rather than the h1; the real build's metadata carries it. | Ruled |
| **D-KRD-4** | Solid sticky bar. At ≥768, one line. Below 768, a sticky wordmark · Contact line plus a nav row that scrolls away. CSS only. | Phones lose persistent Work/About/Teaching links but keep Contact, the one that converts. We chose this over hide-on-scroll (Vesper's proposal) to keep Contact one tap and the header script-free. | Ruled |
| **D-KRD-5** | Title cell 2 columns wide; six featured films; Contact Club and Born To Be move to the Directing row; a portrait later makes it 2 × 2 with eight featured. | Two films leave the first screen; in return he gets the most "him" A's structure allows without a rail. | Ruled |
| **D-KRD-6** | One grammar: the tapped tile stays, and the film opens full width on the line below its row (in rows: below the track). Below 768 the panel replaces the tile. Supersedes A's 2×2. | The first screen jumps a little further on open than A's in-place growth. What we gain: nothing reorders, the player is as big as the page allows, and grid and rows behave the same. | Ruled |
| **D-KRD-7** | Close is an SVG ✕ in a 44 px strip above the player, never over it; also by toggling the tile, and Esc while focus is on the page. | 44 px of height per open film. Overlaying the video would steal YouTube's own controls. | Ruled |
| **D-KRD-8** | The panel holds the player, title, meta line, lane, story, awards and **the email alone, last**. No "Full page", no Close text. | We keep the one thing on that line he half-flagged. His confusion came from the dead link beside it. 02 §0 puts nothing between a play button and the email. Drummer preferred nothing but the player; the bar's Contact now backs it up. **Name this to him in the note that sends D.** | Ruled |
| **D-KRD-9** | Tiles and the panel show **Kind · Year · Role**; the client moves to the label only. | Loses the client from the meta line (it is still the label). Gains the word a producer hires by. | Ruled |
| **D-KRD-10** | "Passion project" is the only lane label. Paid work is named by its client. "For hire" appears nowhere, including alt text and future filters. | A corporate producer can't filter to "paid only" by name. His words decide, and client names are proof. | Ruled |
| **D-KRD-11** | Never a blank tile: a build-time blur placeholder; a failed image shows a titled `card`. | A few KB of inline data (about 21 posters × 300 bytes). | Ruled; mechanism `[PROPOSED — Mason]` |
| **D-KRD-12** | Play glyph on hover and focus, on fine pointers, for YouTube and Vimeo tiles only. | One more mark per tile on hover. Answers "what happens if I click?" | Ruled |
| **D-KRD-13** | Netflix rows: two curated rows replacing two text strands; scroll-snap; arrows in the header; no end tile in the demo. Its own ticket, KR-9, which can be cut. | A second browsing shape on Home, and Home now shows 21 of 27 pieces. Drummer called it a change of direction; Taylor ruled it in, as its own ticket. | Ruled (Taylor) |
| **D-KRD-14** | Netflix refusals, binding: autoplaying hover previews, a billboard hero, auto-advancing carousels, "continue watching", ratings or match %, infinite scroll, a Netflix look (he works for Netflix; a clone reads as a template), anything that loads before a tap. | — | Ruled |
| **D-KRD-15** | Unbuilt links in a demo say so (a toast) and never move the page. | A little review-only JS. Stops the next "Full page" confusion. | Ruled |
| **D-KRD-16** | Contact email from the server variable `CONTACT_EMAIL`, through `SITE.email`. A shows it too. | A's email line can differ from what he reviewed if the value changes. The address isn't under comparison. | Ruled (Taylor) |
| **D-KRD-17** | Rounds don't mix: D is round 2. The switcher lists same-round kits, cross-round URLs 404, and the round-1 feedback form is frozen. | D can't be tried in B or C, which were rejected. | Ruled |
| **D-KRD-18** | Review chrome: a "Revised after your review" section on the index, before/after compare links, and the brand and kit pages pointing to D as current. | — | Ruled |
| **D-KRD-19** | No coloured role dots anywhere. | — | Ruled (his answer) |
| **D-KRD-20** | D shows no link-out and no pending piece: none is in the featured six, and the rows exclude them. `ProjectPlayer` is reused unchanged, so its link-out and pending states still work if the lists change. The post-cutover loop (old-site link-outs redirecting to themselves) is a real-build blocker, routed as O-6. | The Bully Solution and Shotlister aren't on D's Home at all; they wait for their links. | Ruled |

---

## 15. Consult record

| Question | Positions | Resolution |
|---|---|---|
| The replacement for Generous | Sage: Emboldening > Galvanizing > Ringleader. Tribune: Galvanizing > Emboldening > Captain. Drummer: Captain > Galvanizing > Magnetic. | **Galvanizing**, the only word in every top two. 04 Step 8; a ranking check with Kryshan (O-1). |
| Grid expansion vs rows expansion | Vesper and Mason, independently: two grammars; `dense` backfill reorders the grid | One grammar, the jawbone (D-KRD-6) |
| ✕ over the video | Vesper and Mason: collides with YouTube and Vimeo controls; Esc doesn't cross the iframe | Strip above the player (D-KRD-7) |
| Email in the panel | Tribune (Blocking) and Vesper: keep it. Drummer: nothing but the player. | Kept, alone, last (D-KRD-8) |
| Rows | Vesper and Tribune: yes, capped. Drummer: direction change, scope. | Taylor: include, own ticket (D-KRD-13) |
| Transparent bar | Vesper and Mason: nothing to be transparent over; a red wordmark over posters fails contrast | Solid (D-KRD-4) |
| Phone bar | Vesper: hide on scroll down. Drummer: Contact always one tap. | CSS split: sticky wordmark · Contact (D-KRD-4) |
| Resourceful's price risk | Drummer: "$25", "any budget" and "shoestring" read as under-charging | Re-guarded "never cheap" (04 Step 8); no price-like number in any line D adds |
| Testimonials and minors (for the real build) | Sage and Tribune: consent in the data, no minors, no "at-risk" attribution, graduates only | Appendix D (forward) |

---

## 16. Open items, routed

| ID | Item | To | Blocks |
|---|---|---|---|
| O-1 | **Pillar check:** ask him to *rank* Galvanizing, Emboldening and Captain, each with one line of proof (04 Step 8). A different winner changes `review/brand.ts` and 04 only. | Taylor → Kryshan | Nothing in D |
| O-2 | **Current portrait** for the title cell (the only portrait supplied is with Ted Danson). | Kryshan | Nothing: the cell works without it (§6.3) |
| O-3 | **Replacement poster frames** (02 §14 Q27): the Directors Reel is in D's featured six with a "Frame to be replaced" ribbon; Glimpse and The Bully Solution are kept out of the rows until theirs arrive. | Kryshan (or Vitrine pulls frames, with his OK) | D ships with the ribbon; the real site doesn't |
| O-4 | **`CONTACT_EMAIL` per environment:** Gmail until `hello@kryshanrandel.com` exists and a test email from an outside account arrives. | Taylor | Nothing |
| O-5 | **KR-4 closure:** the round was evidently sent (he submitted on 2026-09-23), but KR-4 is unticked in PROGRESS and has no ticket file. Confirm it was deployed with `REVIEW_GATE=on`, then close it with a DEVIATIONS line. | Taylor | Nothing |
| O-6 | **Old-site link-outs loop after DNS cutover:** The Bully Solution and Shotlister point at `kryshanrandel.com/project/…`, which the new site will redirect to itself. They need a Dailymotion URL (Q9) and the Shotlister spots or links (Q10) before cutover, or they are hidden at launch. | Kryshan; real-build launch gate | The real launch, not D |
| O-7 | **Does D go to Kryshan as a second round?** If yes, with or without a short round-2 form? Not specified here. | Taylor | Sending D |
| O-8 | **The silent customer:** ask for the old site's analytics (GTM-TP2KD9B) on the domain call, or have him ask two or three recent camera hires how they used his site. | Taylor | Nothing |

---

## 17. Proposed slices (for ticket authoring; not tickets)

| Ticket | Scope | Rulings | Depends on |
|---|---|---|---|
| **KR-7 · Demo D scaffold** | `CONTACT_EMAIL` and `SITE.email`; `round` on the registries; switcher scoped by round; cross-round 404s; feedback form frozen to round 1. Kit D (spread from A, Appendix C). Layout D registered, markdown copied verbatim from A. `home-d.tsx` plus **new copies** of A's grid leaf, so the demo renders **identically to A**. Index section, compare links, brand and kit page lines. `--review-bar-h` from the review bar. | D-KRD-1, 2, 16, 17, 18 | KR-6 |
| **KR-8 · Demo D home, revised** | Top bar; title cell; six featured; the tile's meta line, glyph, blur and open state; the panel (jawbone, ✕ strip, email line, behaviour, focus, scroll); unbuilt-link toasts; Appendix A's brief; Appendix B's amendment block into `kryshan-d.md`; M-KR-6 logged. | D-KRD-3–12, 14, 15, 19, 20 | KR-7 |
| **KR-9 · Demo D rows** | The two curated rows; header, track, arrows; opening from a row; the Teaching strand alone; the brief's two rows sentences (Appendix A, marked). | D-KRD-13 | KR-8 |

Critical path: KR-7 → KR-8 → KR-9. KR-9 can be cut without touching anything else. KR-7 being a faithful copy is deliberate: KR-8's diff then *is* the revision, reviewable line by line.

---

## 18. Observable checks (seeds for each ticket's acceptance criteria)

**A is untouched**
- `/review/mocks/home-a/kryshan-a` renders as it did on 2026-09-23.
- A's kit, layout, mock and grid files show no diff. The only allowed differences in A's rendered output: the switcher's "After: Demo D" link and the value of `SITE.email`.

**Opening and closing a film**
1. On a 375 px phone, a cold load of Demo D shows the bar, the nav row, his line and the whole first poster. Tapping that poster plays it (one tap), and the ✕ is visible above the player without scrolling.
2. At 1440 px, tapping the third tile opens a full-width panel directly below the first grid row; the tapped tile stays in place with its red rule. Tapping the fourth tile swaps the panel's content without moving the page. Tapping a second-row tile moves the panel below the second row.
3. Pressing ✕ stops the audio, returns focus to the tile, and restores the scroll position.

**Name, lanes and genre line**
4. His name appears exactly once in the rendered page text (the wordmark), plus `<title>`.
5. "For hire" appears nowhere in the DOM, including `aria-label`s.
6. Every tile's meta reads Kind · Year · Role.

**Panel contents**
7. No "Full page" string anywhere. The panel's last focusable element is the `mailto:` link with `SITE.email`.

**Unbuilt links and loading**
8. Every nav item, "Teaching →" and "All 27 pieces →" shows the toast and leaves the scroll position unchanged.
9. No request to YouTube or Vimeo on a cold load. No blank tile on a throttled load. CLS 0.

**Rows [KR-9]**
10. Two rows with the listed films in the listed order. Arrows appear only on pointer devices and only when a row overflows. Tab walks every tile, and each focused tile is fully visible, never under a bar.

**Reduced motion and rounds**
11. With reduced motion on, open, close, swap and arrows are all instant, and the layouts are identical.
12. `/review/mocks/home-d/kryshan-a` returns 404. The feedback form's options are byte-identical to round 1.

**Verify**
13. `yarn verify` passes.

---

## Appendix A — Layout D brief (for `review/layouts/index.ts`, verbatim)

```ts
brief: {
  idea: "Layout A after your review. Your films still come first, with no banner. Your name is set once, in the bar at the top, and stays there as you scroll. Tap a film and it opens across the whole page, right below where you tapped, and plays.",
  answers: [
    "Your name in the bar at the top, then the grid. The first, wider square is you, in your words: “I direct, shoot and edit stories that are hard to look away from.”",
    "Tap it and it opens full width, just below the row you tapped, and plays. Its title, credits and your email sit beside or below it. The ✕ right above the film closes it; the player’s own button makes it full screen.",
    "Your name, always, in the bar that stays at the top. Your line in the first square, and your photo there too once you send a current one.",
    "One grid. Passion projects carry a small red “Passion project” label; everything else carries the client’s name. “For hire” appears nowhere.",
    "Home · Work · About · Teaching · Contact. This demo is the home page; the other pages follow the same rules.",
  ],
  because: [
    { quote: "My name twice", source: "your review", so: "It’s set once now, and it never leaves the screen." },
    { quote: "maybe just an 'x' instead?", source: "your review, on the Close button", so: "An ✕ right above the film, where you look first." },
    { quote: "if videos go full screen it might not be needed", source: "your review, on “Full page”", so: "The film opens across the whole page, and “Full page” is gone." },
    // [KR-9] add:
    { quote: "a few more elements to borrow from what Netflix does so well", source: "your review", so: "Rows you swipe across, a bar that stays put, a genre line on every film. Nothing that plays or moves by itself." },
  ],
  givesUp:
    // KR-8 wording:
    "Your wider square takes the place of two films in the top grid. And your email stays under each film you open, on its own line: it’s the one thing a producer needs right after watching.",
    // KR-9 wording (replaces the above):
    // "Your wider square takes the place of two films in the top grid; Contact Club and Born To Be now start the Directing row below. Your email stays under each film you open, on its own line: it’s the one thing a producer needs right after watching. And some Netflix habits are left out on purpose: previews that play by themselves, a big banner, anything that loads before someone asks.",
},
```

---

## Appendix B — Layout D markdown

KR-7 copies `review/layouts/kryshan-a.md` to `review/layouts/kryshan-d.md` verbatim. KR-8 then makes these three edits:

1. Title line → `# Layout D — The Marquee, revised`. Pairing line → `Pairs with **Kit D** (Kit A's tokens · Wicked · Resourceful · Galvanizing · red on black · Archivo).`
2. Insert this block directly after the pairing line:

```md
> **Amended after Kryshan's review (2026-09-24).** This is Layout A with his changes. Everything below still holds except where this block says otherwise; the rulings are in `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` (D-KRD-n).
>
> - **His name once.** Set in the top bar only; the bar stays at the top (on phones: name and Contact stay, the other links scroll away). The title cell carries his first-person line and his roles, not his name, and spans two columns. (D-KRD-3, 4, 5)
> - **Six featured films,** his top five and his lead flags; Contact Club and Born To Be open the Directing row. (D-KRD-5)
> - **The open film** appears full width on the line below the tapped tile's row, and the tile stays, marked; on phones it replaces the tile. Close is an ✕ above the player. No "Full page" link; his email stays, alone, as the panel's last line. (D-KRD-6, 7, 8)
> - **Genre line:** kind · year · role on every tile and in the panel; "Passion project" or the client's name as the only label; "For hire" nowhere. (D-KRD-9, 10)
> - **Never a blank tile;** a play mark on hover. (D-KRD-11, 12)
> - **Two rows you swipe across,** Directing and Camera and editing, replace those two text strands; Teaching stays as text. (D-KRD-13)
> - **Left out on purpose:** previews that play by themselves, a banner, anything that loads before a tap. (D-KRD-14)
```

3. In §4 Home, add *"(amended: see the block at the top)"* after the "Home `/`" heading. In §5, add *"(amended: see the block at the top)"* after the table's "Expanded cell" row name.

Nothing else in the file changes. Work, About, Teaching and Contact are described as in A. They are not built by this track.

---

## Appendix C — Kit D field values (verbatim)

```ts
export const KRYSHAN_KIT_D: ReviewKit = {
  ...KRYSHAN_KIT_A,
  id: "kryshan-d",
  letter: "D",
  name: "Kryshan D · Kit A, revised after review · red on black",
  thesis:
    "Kit A after your review. The same dark room and the same single red, with the pillars in your order: Wicked, Resourceful, Galvanizing. What changed is how little sits around the work: your name once, and nothing beside a playing film except its title, its credits and your email.",
  roles: [
    ...(KRYSHAN_KIT_A.roles ?? []), // `roles` is optional on BrandKit; A defines it
    {
      name: "Passion label",
      hex: "#f2716b", // tokens A.red.300 (A's --link)
      use: "The one lane label: “Passion project” in small red. Paid work is named by its client in secondary text, never “For hire”.",
    },
  ],
  voice: {
    ...KRYSHAN_KIT_A.voice,
    contact: `No agent, no form, no waiting. ${SITE.email}`,
  },
  never: [
    ...KRYSHAN_KIT_A.never,
    "His name twice on one screen.",
    "A link that looks live and goes nowhere.",
    "“For hire” as a label.",
    "Anything over the video but the video.",
  ],
  placeholder: false,
};
```

`[ASSUMPTION: review/kits may import SITE from lib/config (review → lib is a downward import). If the builder would rather keep kits free of config, pass the contact line through the kit page instead; the rendered string is the contract.]`

---

## Appendix D — Forward notes for the real build (NOT built in this track)

These are recorded so nothing learned here is lost. None is in scope for KR-7 to KR-9.

- **Tiles become real links:** `<a href="/work/<slug>">`, with a plain click intercepted to open the panel; the URL doesn't change on open; no `next/link` prefetch storm (Mason).
- **Rows** end in an "All directing →" or "All camera and editing →" tile linking to the filtered Work page.
- **Work filters:**
  - role tabs All · Directing · Camera · Editing, built as links, not ARIA tabs
  - one **Passion projects** toggle (`aria-pressed`)
  - read from `location.search` after hydration and written with `history.replaceState`; never `useSearchParams` on a static page
  - faded cells `inert`, with a politely announced count
- **Posters** as static imports in `content/posters.ts`: the blur, width and height come for free, and a missing file fails the build. The self-edit guide says: "drop in the JPEG, add one line."
- **Lint:** block `app/(site)/**`, `components/**`, `content/**` and `brand/**` from importing `@/review/*` or `@/lib/review/*` before any work component is ported. D's leaves are rewritten into `components/composed/work/`, never imported from `review/`.
- **Teaching testimonials:**
  - A `Testimonial` type with required `consent: { date, how, attribution }`; the build fails without it.
  - Three or four quotes, two sentences each, named with role and organisation, weighted toward program directors who booked him again.
  - No quotes from anyone who was a minor when taught (unless they're an adult now and consent for themselves). No "at-risk" attribution. Graduates only, not current students. No identifiable minors in photos.
  - The block renders only when at least one cleared quote exists; zero means no heading and no "coming soon".
  - The ask he sends people, in Drummer's words: *"I'm adding a teaching page to my website. Would you write two or three sentences about working with me: what I taught, and one thing that changed for your students or program? Tell me how you'd like your name and role shown. Replying means you're OK with it appearing on my site."*
- **Resourceful's guardrail in copy:** "$25" only inside Contact Club's own line; "any budget" never in a headline.
- **Launch gates:** O-6 (link-outs); poster replacements; VANDU's link; the Wolf clearance (02 §14 Q13); every other 02 §14 item either answered or carried as a visible default.
