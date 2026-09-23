# Claude Code prompt B — Kit B + Layout B ("The Study") review trio

You are working in `kryshan-site`. KR-1 is done: `content/site.ts`, `content/projects.ts`, and `public/media/posters/` exist, and trio A is live under `/review`. This thread is one ticket: **KR-2 — Review trio B: kit, layout, mock home.** Reuse the shared content; do not recreate it. If any of it is missing, stop and say so.

## Before writing any code
Same reading list as KR-1 (`docs/CONVENTIONS.md`, `BRANDING.md`, `REVIEW-LAYER.md`, `PERFORMANCE.md`; the `BrandKit` type; `kit-scope`; `components/media/*`; `lib/media/*`; the registries), plus `review/kits/kryshan-a.ts` and `review/mocks/home-a.tsx` so B matches A's patterns. Open `docs/specs/KR-2-review-trio-b.md`, list file paths first, log divergences in `DEVIATIONS.md`.

## Deliverable 1 — `review/kits/kryshan-b.ts`
Complete `BrandKit` from `kryshan-05-tokens.json → B` only:

| Role | Token |
|---|---|
| background | `ground` (cream #E9E4D8) |
| foreground | `text` (ink #16140F) |
| card / popover | `neutral[200]` |
| card-foreground | `text` |
| primary | `accent` (red 500 #C9352E) |
| primary-foreground | `ground` |
| secondary | `neutral[200]` |
| secondary-foreground | `text` |
| muted | `neutral[100]` |
| muted-foreground | `neutral[500]` |
| accent | `red[600]` (text-size links; red 500 is 4.1:1 on cream, AA-large only) |
| accent-foreground | `ground` |
| destructive | `red[600]` |
| border / input | `neutral[300]` |
| ring | `red[600]` |
| ground | `light` |
| radius | `4px` |

Also expose the **dark surface** `neutral[900]` for the work grid: use whichever kit slot the type has for a dark/inverse surface (sidebar, chart, or card-inverse); if none exists, add a CSS variable `--surface-dark` inside the kit's vars via the documented extension point, and log it.
Fonts: `sans` = Work Sans (400–600); `display` = Space Mono (400, 700); `mono` = Space Mono. Quotes use Fraunces Italic: if the type has only three slots, load Fraunces (italic, `opsz`) as a fourth `next/font` instance in the kit file and expose it as `--font-quote`; log it. Name: "Kryshan B · Generous leads · red on warm cream". `placeholder: false`. Description/notes slot: essence "A tale well told, and a good time telling it." and the never-list from PDF page B-5.

## Deliverable 2 — `review/layouts/kryshan-b.md`
Copy `kryshan-06-layout-B.md` verbatim, front matter as the registry requires (title "Layout B — The Study", pairs with `kryshan-b`, `placeholder: false`).

## Deliverable 3 — `review/mocks/home-b.tsx` (+ `_components/`)
Server-component mock of **Home only**, in `KitScope` with `kryshan-b`, to `kryshan-06-layout-B.md` §4 and §6:

1. **The rail** (≥1024, 260px; 220px at 1024–1279): name "Kryshan / Randel" in primary, display (mono) 700, two lines; nav Work · About · Teaching · Contact in mono (inert, `data-review-id`); a hairline; three lines in sans: "Director, camera operator, editor, and film instructor. Vancouver, works anywhere. Stories that are hard to look away from."; the email as a primary link; IMDb · Vimeo · YouTube · LinkedIn in small mono; Instagram · Facebook beneath, smaller. Below 1024 the rail collapses to a top header (name, nav, email icon) and the three lines move to the footer; below 768 add a fixed bottom bar with "Email" and "Work" (inert Work).
2. **Reel strip**: a `"use client"` leaf `reel-strip.tsx`: horizontal scroll-snap of three full-width 16:9 poster-first players: just-watch-us, directors-reel, jack. The first is fully in view on load (poster `priority`), the second peeks; arrows on desktop, swipe on touch. Each player: title, play button, and an "info" toggle that slides the `story` in from the right over the frame (Betancourt). Iframes mount only on play; second and third posters lazy.
3. **Featured 2×2**: 5rhythms, wolf-of-west-georgia-street, just-up-the-block, contact-club. Frames sit on the dark surface (a full-width band in `--surface-dark` behind the grid) so night frames don't punch holes in the cream. Hover washes toward cream with the title (Roper); tap opens the **lightbox**: a `"use client"` leaf using the vendored dialog (`npx shadcn@latest add dialog` if absent) over the dimmed page: player at 16:9, beneath it roleLabel · client · year, `story`, `awards`, one press quote in the quote font if the project has one (only Jack and The Bully Solution do; strings in 03 §5), prev/next within the featured four, close, "Full page →" (inert), and a footer line "Email me about this kind of work" → mailto.
4. **Names and press** (two columns; stack below 768). Left, sans lead size, verbatim: "I've directed Ted Danson, Mary Steenbergen, Peter Gallagher, Kevin Smith, Tom Green and Aubrey Plaza for spots I'm not allowed to show you, and shot behind the scenes for Disney, Netflix, Sony, Paramount, Universal, CBS and the CW on sixty-odd productions." Right, two quotes in the quote font with sources: "Wonderfully wrong." — Ain't It Cool News · "Must-see… should send their filmmakers to the big leagues." — CityTV News.
5. **Teaching teaser**, one line, verbatim: "I also teach. Directing, camera and editing at VFS and LaSalle; camps; coaching." + inert link.
6. **Footer** (main column): email, placeLine, socials.

**Hero line** in the strip's first slide overlay (optional, above the title, display size): "Twenty-seven years of stories, and *a good time telling them.*" with the italic phrase in primary. Add `data-review-id="home-b.hero-line"` so he can comment on it; the number is pending confirmation, and the ticket notes that.

**Review anchors**: rail, each rail link, strip (`home-b.strip.<slug>`), each featured frame, the lightbox (`home-b.lightbox`), names block, each quote, teaser, footer.

## Acceptance criteria
- `yarn verify` passes; the three routes render; `/review` lists trio B beside A.
- Rail persistent at ≥1024; header + bottom bar below; email reachable in one tap at every width.
- Strip: snap, arrows, swipe; info toggle; no iframe before play; first poster `priority`.
- Lightbox: opens on tap, traps focus, Escape closes, prev/next, no iframe until play; reduced motion → no dim animation.
- Featured frames on the dark surface; contrast (verify with `lib/color/contrast`): ink/cream ≥ 7:1; red 500 is used only at display sizes (≥ 24px) where 4.1:1 clears AA-large; every body-size red link and the rail's email use `red[600]` (6.2:1).
- No hex outside `review/kits/`; no lorem/stock; nothing NDA'd shown; Bully Solution absent from Home.
- CLS 0; under 200 KB before first frame at 390. Walk 1440/1024/390.
- Ticket flipped, PROGRESS ticked, DEVIATIONS written, commit `KR-2: review trio B`.

## Do not
Home only. No new fonts beyond the four named. No testimonials. Don't touch trio A except the index listing. No `public/` PDF.

## Attachments expected
- `kryshan-05-tokens.json` · `kryshan-05-brand-kits.pdf` (Kit B pages) · `kryshan-06-layout-B.md` · `kryshan-03-copy-and-voice.md` (§5 quotes, §8 lines) · `kryshan-02-success-criteria.md`
