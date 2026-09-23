# Layout C — The Index

Pairs with **Kit C** (Resourceful leads · green and amber on near-black · Chivo / Newsreader). Tokens → `C`.

**Thesis.** The work as a list. One statement over a ghost word, then an index of every piece: a small poster frame, title, year, R/G/B role tag, lane, client, duration. A row expands into a player with the credits reflowing around it. The fifth page is the full EPK filmography. Teaching lives on About. This is the site that sells camera and editing first and lets the shorts prove range.

## 1. Page map

| Page | Route | Job | Redirects in |
|---|---|---|---|
| Home | `/` | The statement, the featured index (eight rows), the strands | — |
| Work | `/work` | The full index: sort, filter by role and lane | `/reel/` |
| About | `/about` | The thesis sentence, portrait, bio, teaching section, credentials | `/about/` |
| Credits | `/credits` | The EPK/BTS filmography, sixty-plus titles, columned, linking to IMDb | — |
| Contact | `/contact` | Email, socials | `/contact-me/` |
| Project detail | `/work/<slug>` | Sharing, search, full story | `/project/<slug>/` |

## 2. Arrival to email
Land → statement and first index rows on screen → tap a row (one tap) → it expands and plays → the expanded row's meta carries the email → or the footer, always → Credits page also ends in the email ("Need this kind of crew? Email me.").

## 3. Where depth lives
- **Level 0, the row:** small frame (160×90), title, year, role tag, lane, client, duration.
- **Level 1, the expanded row:** player at 16:9 across the content width; beside it (desktop) or beneath (phone): story, awards, "Full page →".
- **Level 2, the detail page.**

## 4. Pages, section by section

### Home `/`
1. **Nav bar:** wordmark in green Chivo 900, left; WORK · ABOUT · CREDITS · CONTACT wide-tracked, right.
2. **Statement, one screen, short:** H1 "Any story. Any budget. *Told properly.*" with the accent phrase in green; support line in Chivo 300; a ghost "RANDEL" in 900-level carbon behind it; a small line beneath: "IATSE 669 · Vancouver · works anywhere." No image. No video. (The frames start 60% down the first screen on desktop, so a play button is visible without scrolling.)
3. **Featured index, eight rows:** Just Watch Us (Directing, R), Directors Reel (R), Jack (R), 5Rhythms (Camera, G), TUTS 2026 Trailer (Camera/Editing, G), The Wolf of West Georgia Street (Editing, B), Just Up The Block (R/G/B, shows all three), Dare (G/B). The tag colours are the only colour on the row until hover, when the frame brightens.
4. **The strands** as three wide-tracked labels with two lines each (03 §8), each linking to `/work?role=`.
5. **All 27 →** `/work`.
6. **Footer:** email, place line, socials.

### Work `/work`
1. Nav.
2. **Controls:** filter chips Directing · Camera · Editing (lit in R/G/B when active) · lane chips Passion · For hire · sort Year / Featured / A–Z. URL-addressable.
3. **The index,** all 27, default sort Featured then Year. Column headers in wide caps. Rows expand in place; only one row open at a time; the open row's tag colour becomes the page's lit colour (green stays the wordmark). Rows outside the filter collapse (height 0, 200 ms) rather than fade, because a list should shrink.
4. **The "can't show you" line** → `/credits`.
5. Footer.

### About `/about`
1. **Opener:** the Berlinale sentence at lead size (03 §8, C variant); portrait right.
2. **Bio,** long, with the interests line up.
3. **Teaching** as a section (not a page): the opener, three compact blocks, the email line. Amber for the label.
4. **Recognition:** awards list (one award, two festivals, link); clients and collaborators as names in wide caps; four press quotes in Newsreader italic with sources in amber.
5. **On set:** three BTS photos, captions naming production and collaborators; the C70 and the rigs are welcome here.
6. **Credentials line** and a link to Credits.
7. Footer.

### Credits `/credits`
1. Nav.
2. **Intro line:** "Behind-the-scenes and EPK camera, 2004 to now. Sixty-odd productions, usually as a crew of one." A note: "Most of this footage belongs to the studios; the credits are mine."
3. **The list,** columned (Title · Year · Format · Studio or network · My role), sourced from his EPK CV and IMDb, reconciled (02 §13 #11 the "Randal" credit), sortable by year; each row links to IMDb where a page exists. Cast names are not listed (they are on IMDb and they invite the wrong reading of "who he's worked with").
4. **Also:** a short second list, Director/writer credits (the shorts and series from his filmography that are not in the 27), title and year only.
5. **The line:** "Need this kind of crew? Email me." → email.
6. Footer.

### Contact `/contact`
"Enquiries go to me." · the email at display size · socials.

### Project detail `/work/<slug>`
As A. Role tag colour on the page's labels.

## 5. Component inventory

| Component | Variants | States |
|---|---|---|
| Nav bar | default; scrolled | active label lit in the page's colour |
| Statement | with ghost word (Home only) | — |
| Index row | featured (Home); full (Work); credits (Credits, no frame) | default; hover (frame brightens, title underlines); expanded; collapsed (filtered) |
| Expanded row | player + meta side-by-side / stacked | loading; playing; closing |
| Role tag | R / G / B; multi (up to three dots) | lit; dim |
| Filter chips | role; lane; sort | active (lit in role colour or green) |
| Strand label | wide caps + two lines | link hover green |
| Credits table | columned; sortable | row hover |
| Press quote | Newsreader italic, amber source | — |
| Footer | — | email hover green |

## 6. Breakpoints
- **≥1280:** index columns: frame 160 · title/client · year · role · lane · duration; expanded row: player 2/3, meta 1/3.
- **768–1279:** duration and lane columns drop into the title cell's second line; expanded row stacks.
- **<768:** each row is a card: frame full width at 16:9 with title over it, meta line beneath (year · role dots · client); expanded card is the player; chips scroll horizontally; the statement shrinks to two lines and the ghost word is hidden; credits table becomes a two-line list.

## 7. Performance and rights
- The index is a table, so 27 rows with 160px frames are a few KB of markup and ~300 KB of lazy images; the first eight frames load eagerly.
- Player mounts on expand, unmounts on collapse.
- `projects` data file plus a `credits` data file (title, year, format, studio, role, imdb id). He edits both through the guide.
- Rights gates as A. Cast names deliberately omitted from Credits.
- Green-black ground; frames get a 30% hairline.

## 8. The one break
The work is a list with small frames, not a grid of big ones. It costs him some of the "cinematic" first impression and buys a producer the fastest scan of his range on any device, and it makes the sixty-title credits page feel like the same object as the work.

## 9. Open items for this layout
- Q7: this layout assumes the fifth page is Credits, not Teaching. If he wants both, Teaching becomes the fifth page and Credits becomes a long section on About.
- Q12: the Credits page is the place most likely to need a rights check line by line.
- Kit C's R/G/B tags are the single biggest yes/no in this layout; if he says no, tags become text and the layout survives.
- The statement's number ("Any budget") is safe; the "twenty-seven years" line is not used here.
