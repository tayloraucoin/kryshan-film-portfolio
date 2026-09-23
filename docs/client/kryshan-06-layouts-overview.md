# Kryshan Randel — Site Layouts: Overview

Vitrine · batch 6 · 2026-09-22 · reads with 02 (every [M] and [S]), 03 (copy slots), 04 (pillar cards), 05 (kits and tokens). Three layouts, each paired with one kit on purpose. They differ in structure, not in skin: how the passion/paid and role splits are expressed, where the reel sits, which in-place player they use, and how a visitor reaches the archive.

## Shared, non-negotiable (from 02)
- Five pages; project detail pages do not count. Home · Work · About · Contact, plus one.
- Watch something → email. A playing video within one tap of landing; the email on every page.
- Work organised by role (Directing · Camera · Editing) **and** split into passion/for-hire, both without leaving the page.
- Just Watch Us, Jack, 5Rhythms and the Directors Reel on Home; his top five governs featured order.
- Titles over thumbnails, one line on hover, story one level down; no photos under videos; nothing crowded; nothing loads until asked.
- Names he may state are stated, never shown. Logos as names until cleared. Testimonials only with consent. Events life off.
- Social links: IMDb, Vimeo, YouTube, LinkedIn prominent; Instagram, Facebook secondary (pending Q11).
- Redirects from `/reel/`, `/about/`, `/contact-me/`, `/project/<slug>/`.
- WCAG 2.2 AA; reduced-motion designed; touch equivalents for every hover.

## The three, side by side

| | **Layout A · The Marquee** | **Layout B · The Study** | **Layout C · The Index** |
|---|---|---|---|
| Pairs with | Kit A, Wicked leads, red on black | Kit B, Generous leads, red on cream | Kit C, Resourceful leads, green/amber |
| Nav | Top bar; name left in red, four links right | Persistent left rail: name, nav, three-line self-description, email | Top bar with wide-tracked labels; ghost word behind the hero |
| Home first screen | **No hero.** The work grid starts at the top; his name and one line occupy the first cell | A horizontal reel strip (Betancourt) beside the rail | A statement (accent phrase) over a ghost word, then the index begins |
| Player | Cell expands inside the grid, others reflow (McKee) | Lightbox over the dimmed page with prev/next (Roper); the home strip plays inline | Index row expands into a player; credits reflow around it |
| Passion / for hire | One grid; passion tagged in red; a toggle filters | Two stacked sections with his own names for them | A lane column in the index; filter chips |
| Roles | Tabs above the grid | Filter chips inside each section | R/G/B tags on every row; filter chips |
| Depth | Expanded cell shows story + awards; "Full page →" to the detail page | Lightbox shows story + awards + press quote; detail page behind | Expanded row shows story + credits; detail page behind |
| Fifth page | Teaching | Teaching | Credits (the full EPK filmography); teaching lives on About |
| Archive reach | Scroll; "all work" toggle shows everything | Scroll within sections; "show more" per section | The index is the archive, sortable |
| Proof placement | About: awards, names, clients, press strip | Home carries names and two press quotes beneath featured; About the rest | Credits page is the proof; About carries the thesis |
| The one genre break | A director's site with no hero: the grid is the hero | A hirer's proof (names, press) on the home page, in his voice | The work as a list, not a grid; frames appear small, left of each row |

## What differs enough to be worth asking him
1. **Hero or no hero.** A drops it; B replaces it with a reel strip; C keeps a one-line statement. His intake wanted "a 10–20 second highlight reel and/or a photo… 3–4 featured videos… a summary of what I do." A satisfies the videos and the summary and refuses the hero; B satisfies all three; C satisfies the summary first.
2. **Where the split lives.** A: one grid, tags and a toggle. B: two named sections. C: a column in a table.
3. **Where teaching lives.** A and B give it the fifth page; C gives the fifth page to the credits and puts teaching on About.
4. **How much of him is on Home.** A: one cell. B: the rail, always. C: one sentence and a ghost word.

## Pairing logic
A's grid-as-hero needs a dark ground so the mixed-exposure frames read as one object, and it needs a single type family so the title cell doesn't look like a different site: Kit A. B's persistent rail with three lines of him and press on the home page is the Generous card made structural: Kit B, cream, mono wordmark, serif quotes. C's index with R/G/B tags and a credits page is the Resourceful card made structural: Kit C, the only kit where roles get colours.

## Recommendation
A, with B as the fallback, for the same reasons as 04 §7. If he flinches at "no hero," the fix inside A is a single featured player above the grid (Just Watch Us), not a switch to B.

## Files
- `kryshan-06-layout-A.md` · `kryshan-06-layout-B.md` · `kryshan-06-layout-C.md`
Each: page map · arrival-to-email path · depth · per-page sections with real content slots · component inventory with states · breakpoints · performance and rights · the break · open items.
