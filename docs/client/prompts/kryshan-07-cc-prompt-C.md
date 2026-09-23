# Claude Code prompt C — Kit C + Layout C ("The Index") review trio

You are working in `kryshan-site`. KR-1 and KR-2 are done; shared content and trios A and B exist. This thread is one ticket: **KR-3 — Review trio C: kit, layout, mock home.** Reuse `content/projects.ts` and the posters. Same reading list, same process: open `docs/specs/KR-3-review-trio-c.md`, list file paths first, log divergences.

## Deliverable 1 — `review/kits/kryshan-c.ts`
Complete `BrandKit` from `kryshan-05-tokens.json → C` only:

| Role | Token |
|---|---|
| background | `ground` (#0C0E0D) |
| foreground | `text` (mist #ECEFEA) |
| card / popover | `neutral[800]` |
| card-foreground | `text` |
| primary | `accent` (green 500 #35C27A) |
| primary-foreground | `ground` |
| secondary | `neutral[800]` |
| secondary-foreground | `text` |
| muted | `neutral[900]` (also the ghost-word colour) |
| muted-foreground | `neutral[300]` |
| accent | `amber[500]` (#E2A63A, the warm second) |
| accent-foreground | `ground` |
| destructive | `red role tag` (#E0473F) |
| border / input | `neutral[700]` |
| ring | `green[300]` |
| ground | `dark` |
| radius | `0` |

Role-tag colours are three: directing `role_tags.directing` (#E0473F), camera `role_tags.camera` (green 500), editing `role_tags.editing` (#4C8DFF). Expose them as `--tag-directing`, `--tag-camera`, `--tag-editing` through the kit's extension point (or the chart slots if the type has them) and log the choice. They are used **only** on role tags.
Fonts: `sans` = Chivo (300–900); `display` = Chivo; `mono` = Chivo (one family; log if the type wants distinct faces); quotes = Newsreader Italic (`opsz`) as `--font-quote`, same approach as KR-2. Name: "Kryshan C · Resourceful leads · green and amber on near-black". `placeholder: false`. Notes: essence "Any story. Any budget. Told properly." and the never-list from PDF page C-5.

## Deliverable 2 — `review/layouts/kryshan-c.md`
Copy `kryshan-06-layout-C.md` verbatim with the registry's front matter (title "Layout C — The Index", pairs with `kryshan-c`, `placeholder: false`).

## Deliverable 3 — `review/mocks/home-c.tsx` (+ `_components/`)
Server-component mock of **Home only**, in `KitScope` with `kryshan-c`, to `kryshan-06-layout-C.md` §4 and §6:

1. **Nav bar**: wordmark in primary, Chivo 900, tight tracking, left; WORK · ABOUT · CREDITS · CONTACT right in wide-tracked uppercase (`tracking-[.28em]`), inert, with `data-review-id`s.
2. **Statement, one screen**: H1 "Any story. Any budget. *Told properly.*" (the last phrase in primary), Chivo 800; support line in Chivo 300: "Kryshan Randel. Director, camera operator, editor, and film instructor. IATSE 669. Vancouver, works anywhere."; a ghost word "RANDEL" in `muted` at ~30vw behind the text (`aria-hidden`, hidden below 768). No image, no video. On desktop the first index rows must be visible without scrolling (statement ≤ 60vh).
3. **Featured index, eight rows** — a `"use client"` leaf `expanding-index.tsx` rendering a real `<table>` (semantic; roles as text for screen readers) with columns: frame (160×90 poster, lazy after the first two, the first `priority`) · title + client · year · role tags · lane · duration (omit the duration column entirely if `content/projects.ts` has no duration field; do not invent). Rows, in order: just-watch-us, directors-reel, jack, 5rhythms, tuts-2026-trailer, wolf-of-west-georgia-street, just-up-the-block, dare. Role tags: small dots + label, lit in `--tag-*`; multi-role rows show up to three dots. Hover: frame brightens, title underlines. Tap: the row expands to a player (poster-first `video-embed`, iframe on play) at 16:9 spanning the content width, with `story` and `awards` beside it (desktop) or beneath (phone), and "Full page →" (inert). One row open at a time; the open row's tag colour becomes the lit colour for the page's active labels (the wordmark stays green). 220 ms; reduced motion → instant. Link-out and `none` providers as in KR-1.
   Below 768 each row becomes a card: frame full width 16:9 with the title over it, meta line beneath (year · role dots · client).
4. **The strands** as three wide-tracked labels with two lines each (03 §8), each with an inert link.
5. **All 27 →** one line, inert.
6. **Footer**: email (hover primary), placeLine, socials.

**Review anchors**: nav links, statement (`home-c.statement`), each row (`home-c.index.<slug>`), the expanded row (`home-c.expanded`), each strand, the all-work line, footer.

## Acceptance criteria
- `yarn verify` passes; three routes render; `/review` lists trio C; all three trios visible together.
- Index is a semantic table on desktop and cards below 768; keyboard: rows are buttons or have a button; Enter/Space expands; Escape collapses; focus returns.
- Tag colours appear only on tags and the page's active labels; nothing else uses them.
- Statement ≤ 60vh on 1440 and 1024; ghost word hidden on 390 and `aria-hidden`.
- No iframe before play; first poster `priority`; contrast mist/ground ≥ 7:1, green/ground ≥ 4.5:1, amber/ground ≥ 4.5:1 (verify with `lib/color/contrast`).
- No hex outside `review/kits/`; no lorem/stock; nothing NDA'd; no Bully Solution on Home.
- CLS 0; under 200 KB before first frame at 390. Walk 1440/1024/390.
- Ticket flipped, PROGRESS ticked, DEVIATIONS written, commit `KR-3: review trio C`.

## Do not
Home only (no Credits page yet, even though this layout gives it the fifth page). Don't invent durations, studio names or dates. Don't touch trios A or B except the index listing. No `public/` PDF.

## After this ticket
Tell Taylor: all three trios are live; the review index lists them; `REVIEW_ACCESS_CODE` is set; the three poster replacements (directors-reel, bully-solution, glimpse) show ribbons and are waiting on Kryshan's answer to 02 §14 Q27.

## Attachments expected
- `kryshan-05-tokens.json` · `kryshan-05-brand-kits.pdf` (Kit C pages) · `kryshan-06-layout-C.md` · `kryshan-03-copy-and-voice.md` (§8) · `kryshan-02-success-criteria.md` (§3.5)
