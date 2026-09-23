# Claude Code prompt A — Kit A + Layout A ("The Marquee") review trio

You are working in `kryshan-site`, a copy of `client-boilerplate` (CB-0 foundation and CB-1 review layer are done). This thread is one ticket: **KR-1 — Review trio A: kit, layout, mock home.** It also creates the shared client content that tickets KR-2 and KR-3 will reuse.

## Before writing any code
1. Read `docs/CONVENTIONS.md`, `docs/BRANDING.md`, `docs/REVIEW-LAYER.md`, `docs/PERFORMANCE.md`, `docs/NEW-CLIENT.md`, and the ticket template in `docs/specs/_templates/`.
2. Read `brand/kit.ts` (or wherever `BrandKit` is defined), `brand/kit-vars.ts`, `components/brand/kit-scope.tsx`, `components/media/*`, `lib/media/*`, `lib/routes.ts`, `lib/config.ts`, `content/home.ts`, and the three placeholder registries under `review/`.
3. Read the attachments listed at the end.
4. Open ticket `docs/specs/KR-1-review-trio-a.md` from the template with the acceptance criteria below, and **list every file path you will create or change before writing code.**
5. Where this prompt and the repo's types or docs disagree, the repo wins; write one line per divergence in `DEVIATIONS.md`.

## Deliverable 1 — shared client content (created here, reused by KR-2/KR-3)

### `content/site.ts` (extend if it exists, else create)
Typed, named exports: `siteName: "Kryshan Randel"`, `rolesLine: "Director, camera operator, editor, and film instructor."`, `placeLine: "Vancouver, works anywhere."`, `email: "kryshanrandel@gmail.com"`, `socials` (IMDb `https://www.imdb.com/name/nm1451064/`, Vimeo `https://vimeo.com/kryshanrandel`, YouTube `https://www.youtube.com/user/kryshanrandelfilms`, LinkedIn `https://linkedin.com/in/kryshanrandel`; Instagram and Facebook flagged `secondary: true`). No other facts.

### `content/projects.ts`
Typed array, one entry per piece from **02 §3.5** (27 entries). Fields: `slug`, `title`, `year`, `roles: ("directing"|"camera"|"editing")[]`, `roleLabel` (exact string from the inventory, e.g. "Director / Co-writer"), `lane: "passion"|"hire"`, `client?`, `kind`, `story` (the "Story" text from 02, verbatim), `awards?`, `embed: { provider: "youtube"|"vimeo"|"linkout"|"none", id?: string, url?: string }`, `poster: string` (path under `/media/posters/`), `rights: "public"|"pending"|"nda"`, `featured?: number` (1–5 from his top five), `lead?: true` (Just Watch Us, Directors Reel, Jack, 5Rhythms), `posterStatus?: "replace"` (directors-reel, bully-solution, glimpse).
Lane assignment: passion = Jack, The Bully Solution, Glimpse, Contact Club, Lyons Heart, Artless, It's A Crazier Life, The Wolf of West Georgia Street; everything else = hire. `rights: "pending"` for The Wolf of West Georgia Street; The Bully Solution is `provider: "linkout"` with the old-site URL until the Dailymotion decision. VANDU is `provider: "none"`. Shotlister is `provider: "linkout"`. Use YouTube-nocookie / Vimeo dnt=1 through `lib/media`; never a raw iframe URL in content.
Spell "5Rhythms" (not "5 Rythms"). Do not invent any field value; if the inventory lacks it, leave the optional field out.

### Posters
Unzip `kryshan-project-images.zip`. Map each file to its slug using 02 §3.5 (the intake filenames are in the zip's manifest or the image names). Convert to JPEG, max width 1600, quality 82, into `public/media/posters/<slug>.jpg`. Skip the duplicate second "A Very BC Production" file. For the three with `posterStatus: "replace"`, still ship the file but the frame component must show the placeholder ribbon (convention: placeholders show a ribbon) with the text "Frame to be replaced".

## Deliverable 2 — `review/kits/kryshan-a.ts`
A complete `BrandKit`. Values come **only** from `kryshan-05-tokens.json → A`. Map them to the shadcn roles like this (adjust names to the real type):

| Role | Token |
|---|---|
| background | `ground` (#0B0B0C) |
| foreground | `text` (bone #F1ECE4) |
| card / popover | `neutral[800]` |
| card-foreground / popover-foreground | `text` |
| primary | `accent` (red 500) |
| primary-foreground | `ground` |
| secondary | `neutral[800]` |
| secondary-foreground | `text` |
| muted | `neutral[900]` |
| muted-foreground | `neutral[300]` |
| accent | `red[300]` (text-size accent; the 500 fails AA at body size on black) |
| accent-foreground | `ground` |
| destructive | `red[600]` |
| border / input | `neutral[700]` |
| ring | `red[300]` |
| ground | `dark` |
| radius | `2px` |

Fonts (three slots, `next/font/google`, loaded inside the kit file): `sans` = Archivo with `axes: ["wdth"]`, weights 400–800; `display` = the same Archivo instance (Kit A is one family; if the type requires three distinct slots, point display and mono at Archivo and note it in DEVIATIONS); `mono` = Archivo. Set the kit's `name: "Kryshan A · Wicked leads · red on black"`, `placeholder: false`, and fill any description/notes slot the type has with: essence "A tale well told, and a good time telling it." and the never-list from the PDF page A-5.
No hex anywhere else in this ticket.

## Deliverable 3 — `review/layouts/kryshan-a.md`
Copy the attached `kryshan-06-layout-A.md` verbatim into the layouts registry, adding whatever front matter the registry requires (title "Layout A — The Marquee", pairs with kit `kryshan-a`, `placeholder: false`). Do not rewrite it.

## Deliverable 4 — `review/mocks/home-a.tsx` (+ `review/mocks/_components/…` for anything only it uses)
A server-component mock of the **Home page only**, wrapped in `KitScope` with `kryshan-a`, built exactly to `kryshan-06-layout-A.md` §4 "Home" and §6 breakpoints:

1. **Nav bar**: wordmark "Kryshan Randel" in primary, condensed (`font-stretch: 72%` via a utility on the sans slot), left; Work · About · Teaching · Contact right. Links are **inert** in the mock (`href="#"`, `aria-disabled`), styled as real, and each carries a `data-review-id` (`home-a.nav.work` etc.). On phone: two-line stack, no hamburger.
2. **The grid, first screen, no hero.** 4/2/1 columns. Cell 1 = title cell: name at display size in primary, `rolesLine` + `placeLine` beneath in foreground; on phone add a small "Watch ↓" in primary. Cells 2–9 in this order: just-watch-us, directors-reel, jack, 5rhythms, wolf-of-west-georgia-street, just-up-the-block, contact-club, born-to-be. Each cell: `components/media` frame at native 16:9 with the poster (first poster gets `priority`), hairline border at 40% opacity, title over the frame, one-line meta (year · roleLabel · client) that fades in on hover/focus and is always visible on touch. Passion pieces show a small "Passion project" label top-left in primary; hire pieces show the client name in muted-foreground.
   **Expand in place**: a `"use client"` leaf `expanding-grid.tsx` holds a single `openSlug` state. The open cell spans 2 columns × 2 rows on desktop (full width on phone), mounts the poster-first `video-embed` (iframe only on tap, per convention), and shows beside/beneath it: roleLabel, client, year, `story`, `awards`, and a text link "Full page →" (inert). Other cells reflow. Only one open at a time; Escape closes; focus returns to the cell. 220 ms grow from the tapped cell; `prefers-reduced-motion` → instant. Link-out providers render a "Watch on the old site →" card instead of a player; `provider: "none"` renders the frame with a "Link pending" ribbon.
3. **The three strands**: one row (3 cols → 3 rows on tablet/phone). Copy exactly from 03 §8: Directing / Camera and editing / Teaching, two lines each; each ends with an inert link.
4. **All work →** one line: "All 27 pieces →" (inert).
5. **Footer** from `components/site/footer` if it takes props, else a mock footer: email at body size in foreground (hover primary), placeLine, IMDb · Vimeo · YouTube · LinkedIn; Instagram and Facebook on a second, smaller line.

**Copy** (draft strings, use verbatim):
- Title cell support line: "Director, camera operator, editor, and film instructor. Vancouver, works anywhere."
- Strands: from 03 §8.
- Nothing else. No hero line in this layout.

**Review anchors**: `data-review-id` on the nav, the title cell, every grid cell (`home-a.grid.<slug>`), the expanded panel (`home-a.expanded`), each strand, the all-work line, the footer and each social link.

## Deliverable 5 — wiring
Register the three in the review index so `/review` lists "Kit A", "Layout A", "Home A" as a trio (follow how the placeholders are listed). Keep placeholders B and C in place for now.

## Acceptance criteria (the ticket)
- `yarn verify` passes with zero warnings.
- `/review/kits/kryshan-a`, `/review/layouts/kryshan-a`, `/review/mocks/home-a` render behind the gate; `/review` lists them.
- Home A: no hero; first screen is the grid with the title cell; tapping a cell expands it in place and plays; only one open; Escape closes; keyboard reachable; reduced motion respected.
- Posters: 27 files in `public/media/posters/`, three with the replace ribbon, first poster `priority`, real `sizes`.
- No iframe before tap. No hex outside `brand/` and `review/kits/`. No lorem, no stock, no reference imagery.
- Contrast: foreground/background ≥ 4.5:1; small red text uses `accent` (red-300), never primary.
- Browser walk on 1440, 1024, 390 widths; CLS 0 on the grid (posters have explicit aspect ratio); under 200 KB before the first frame on 390.
- Ticket `Status:` flipped, `PROGRESS.md` ticked, `DEVIATIONS.md` lines written, one commit on the working branch: `KR-1: review trio A (kit, layout, mock home)`.

## Do not
- Do not build Work, About, Teaching or Contact pages. Home only.
- Do not add a hero, a reel, or a photo above the grid.
- Do not invent facts, numbers, quotes or testimonials; every string is in the attachments.
- Do not show anything from the NDA'd work; do not use the gory Bully Solution frame anywhere (it's `replace`).
- Do not put the PDF in `public/`.
- Do not `yarn dev` / `yarn build`; use the `:agent` scripts.

## Attachments expected
- `kryshan-05-tokens.json` (colour and font source of truth)
- `kryshan-05-brand-kits.pdf` (Kit A pages 2–6 are the visual target)
- `kryshan-06-layout-A.md` (the layout to build; copy verbatim into the registry)
- `kryshan-03-copy-and-voice.md` (§8 copy bank)
- `kryshan-02-success-criteria.md` (§3.5 inventory, §10 rights)
- `kryshan-project-images.zip` (27 poster screenshots)
