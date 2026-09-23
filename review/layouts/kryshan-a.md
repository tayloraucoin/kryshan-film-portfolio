# Layout A — The Marquee

Pairs with **Kit A** (Wicked leads · red on black · Archivo). Tokens in `kryshan-05-tokens.json` → `A`.

**Thesis.** A director's site with no hero. The first thing on the page is the work, as a dark grid of poster frames with his name in the first cell. A cell expands in place to play; the others move aside. Everything else on the site exists to support that grid.

## 1. Page map (five pages; project pages excluded)

| Page | Route | Job | Redirects in |
|---|---|---|---|
| Home | `/` | Get to a playing video in one tap; say who he is in one cell | — |
| Work | `/work` | The whole grid, filtered by role and lane | `/reel/` |
| About | `/about` | The long story, the names, the proof | `/about/` |
| Teaching | `/teaching` | Camps, coaching, where he teaches; the same email | — |
| Contact | `/contact` | Email, socials, nothing else | `/contact-me/` |
| Project detail (n) | `/work/<slug>` | Sharing, search, the full story | `/project/<slug>/` |

## 2. Arrival to email
Land → the grid is already on screen → tap a frame → it expands and plays (one tap) → the expanded cell carries a one-line story and his email link → or scroll to the footer, which carries the email on every page. Contact is never more than one tap away; the Contact page is a courtesy, not a dependency.

## 3. Where depth lives
- **Level 0, the grid cell:** poster frame, title over the frame, on hover/tap one line (year · role · for whom).
- **Level 1, the expanded cell:** the player at 16:9 spanning two columns; beside or beneath it: role, client, year, one-paragraph story, awards (one award, two festivals), and a text link "Full page →".
- **Level 2, the detail page:** everything, including the festival list, press quotes for that film, links to articles, and next/previous. Exists for sharing and search; nobody is sent there to press play.

## 4. Pages, section by section

### Home `/`
1. **Nav bar** (persistent): wordmark "Kryshan Randel" in red, condensed Archivo, left; Work · About · Teaching · Contact right; on phone a two-line stack, no hamburger.
2. **The grid, first screen.** Four columns on desktop, two on tablet, one on phone. Cell 1 is the **title cell**: black, his name at display size in red, and the support line in bone ("Director, camera operator, editor, and film instructor. Vancouver, works anywhere."). Cells 2–9: Just Watch Us, Directors Reel, Jack, 5Rhythms, The Wolf of West Georgia Street, Just Up The Block, Contact Club, Born To Be. (His top five, the lead flags, and three that widen the range: a comedy trailer, a music video, a pandemic short.) Passion pieces carry a small red "Passion project" label in the top-left corner; for-hire pieces carry the client name in secondary text.
3. **The three strands.** One row, three columns: Directing · Camera and editing · Teaching, two lines each (03 §8), each with a text link into Work filtered by that role (or into Teaching).
4. **All work →** a single link to `/work`, plus the count ("27 pieces").
5. **Footer** (persistent): email in bone at body size, left; "Vancouver, works anywhere"; IMDb · Vimeo · YouTube · LinkedIn right; Instagram and Facebook in the second row, smaller. No copyright line larger than the email.

### Work `/work`
1. Nav.
2. **Filter bar:** role tabs Directing · Camera · Editing · All (tabs, not chips, because a producer picks one); a lane toggle **Passion / For hire / Both** on the right. Active tab underlined in red; active lane in red text. Filters are URL-addressable (`/work?role=camera&lane=hire`) so he can send a producer a filtered link.
3. **The grid,** all 27 pieces (minus any he removes), default order: featured first, then by year descending. Same cell and expansion as Home. Cells that are not in the current filter fade to 30% rather than disappearing, so the page never jumps.
4. **A quiet line at the end of the grid:** "Some of my best work I can't show you. I've directed Ted Danson, Mary Steenbergen, Peter Gallagher, Kevin Smith, Tom Green and Aubrey Plaza for spots under NDA, and shot behind the scenes on sixty-odd productions. Ask." → email.
5. Footer.

### About `/about`
1. Nav.
2. **Opener:** portrait (his, alone, current; until then the frame is empty and the copy leads) left one-third; right: the About opener (03 §8) in lead size, then the long bio, lightly edited (03 §6), with the interests line moved up.
3. **The Glimpse anecdote** as a pull paragraph in italic Archivo: the audition he rewrote the script around.
4. **Recognition:** three columns. Awards (Leo nomination; Jack; Glimpse; Bully Solution; Contact Club: one award each, two festivals, link). Press strip: six quotes, source named, under 15 words each, italic. Clients and collaborators: names in type in a tight grid (logos swap in if cleared).
5. **On set:** two BTS photographs (with crews, not celebrities, unless cleared), captions naming the production and collaborators.
6. **Credentials line:** IATSE 669 (EPK) · Capilano · AADA · WHMIS/ActSafe/MPOC.
7. Footer.

### Teaching `/teaching`
1. Nav.
2. **Opener** (03 §8) with the LaSalle grad photo.
3. **Three blocks:** Where I teach (VFS, LaSalle; InFocus 2010–2022); Camps and programs (Mexico/CEDIM, Victoria, Toronto, Whatì NWT, Mississauga; Frames Film Project with Frog Hollow); One-on-one coaching (what it is, who it's for).
4. **A single line:** "If you run a program or want coaching, email me." → email.
5. Footer.

### Contact `/contact`
1. Nav.
2. **One block, centred, short:** "No agent, no form, no waiting." · the email at display size · Vancouver, works anywhere · the social links. Nothing else. (A form is added here only if Q6 says yes.)
3. Footer (yes, even here; consistency).

### Project detail `/work/<slug>`
Nav · player at full width · title, year, role, for whom · story · awards and festivals in full · press quotes for this piece with article links · prev/next in the current filter · footer. Metadata: title, description, poster as og:image, video as structured data.

## 5. Component inventory

| Component | Variants | States |
|---|---|---|
| Nav bar | default; scrolled (hairline appears) | link hover red; active page underlined red; focus ring red-300 |
| Wordmark | display (title cell), nav, footer | — |
| Grid | 4/2/1 columns; title cell present (Home) or absent (Work) | — |
| Work cell | 16:9 frame; label variant (Passion) | default; hover/focus (title lifts, one-line meta fades in, hairline brightens); expanded; dimmed (filtered out, 30%) |
| Expanded cell | spans 2 cols on desktop, full width on phone; player + meta panel | loading (poster stays, spinner in red); playing; closing |
| Player | YouTube, Vimeo, link-out (Dailymotion/Bully Solution until Q9) | poster-only until tap; never autoplay with sound |
| Filter tabs | role | default; active (red underline); focus |
| Lane toggle | three-way | active red text |
| Strand block | 3-up row | link hover red |
| Proof block | awards list; press quote; names grid | — |
| Photo | portrait; BTS with caption | — |
| Footer | full; compact (phone) | email hover red |
| Detail page | — | — |

## 6. Breakpoints
- **≥1280:** grid 4 columns; expanded cell spans 2×2 (player over meta panel side by side); nav single line; About two columns.
- **768–1279:** grid 2 columns; expanded cell spans full width, meta beneath the player; strands 3-up become 3 rows; About single column with portrait above.
- **<768:** grid 1 column, frames edge-to-edge with 12px gutters; the title cell is the first screen (name + line + a red "Watch ↓"); expanded cell is the player full width with meta beneath; tabs scroll horizontally; hover meta becomes always-visible one line under the title; footer stacks, email first.

## 7. Performance and rights
- No video element until a cell is tapped; poster frames are JPEG at 800/1200/1600, lazy beyond the first eight.
- Grid renders from a `projects` data file (one entry per piece: slug, title, year, role, lane, client, story, awards, embed URL, poster, rights flag). He edits that file through the guide.
- Rights flag gates rendering: `public` renders; `nda` renders as text only in the "can't show you" line; `pending` (logos, Wolf, set photos) renders as names/placeholders.
- Bully Solution: link-out card until the Dailymotion decision; poster must be the non-gory frame.
- First-screen budget on a phone: under 200 KB before the first frame is visible.

## 8. The one break
No hero. Every reference site he rated has a hero; this one puts the work on the first pixel and his name in the grid with it. It honours both "watch something" and "meet me first" without spending a screen on either.

## 9. Open items for this layout
- Q3 (hero): if he insists on a reel or a photo above the grid, add one featured player (Just Watch Us) above cell 1; the layout survives.
- Q8 (naming the lanes): the "Passion project" label wording is his to pick.
- Q7 (fifth page): if not Teaching, the page becomes a Credits page (see C) and teaching folds into About.
- The 27-piece grid needs the three replacement frames before first look.
