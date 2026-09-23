# Layout B — The Study

Pairs with **Kit B** (Generous leads · red on warm cream · Space Mono / Work Sans / Fraunces). Tokens → `B`.

**Thesis.** A persistent left rail carries him on every page: name, nav, three lines of who he is, and the email. The main column carries the work, starting with a horizontal reel strip. Proof (names, two press quotes) sits on the home page in his voice, so a hirer never has to leave it to trust him. The work plays in a lightbox over the dimmed page.

## 1. Page map

| Page | Route | Job | Redirects in |
|---|---|---|---|
| Home | `/` | Reel strip, four featured, names and press, teaching teaser | — |
| Work | `/work` | Two named sections (passion / for hire), each filterable by role | `/reel/` |
| About | `/about` | Portrait, story, the Glimpse anecdote, awards, clients, on set | `/about/` |
| Teaching | `/teaching` | Camps, coaching, where he teaches | — |
| Contact | `/contact` | Email, socials; the rail already says it | `/contact-me/` |
| Project detail | `/work/<slug>` | Sharing, search, full story, press for that film | `/project/<slug>/` |

## 2. Arrival to email
Land → the rail shows name, three lines, and the email; the strip shows Just Watch Us with a play button → tap (one tap) → plays inline in the strip → or tap any featured frame → lightbox → the lightbox footer carries "Email me about this kind of work" → or the rail, always. On phone the rail collapses to a header with the email one tap away and returns as the footer.

## 3. Where depth lives
- **Level 0, the strip and the frames:** poster frame, title, one line.
- **Level 1, the lightbox:** player at 16:9 over the dimmed cream; beneath: role, client, year, one-paragraph story, awards, one press quote in Fraunces italic if one exists, prev/next arrows, close, "Full page →".
- **Level 2, the detail page.**

## 4. Pages, section by section

### The rail (persistent, ≥1024)
Name in red Space Mono (two lines) · Work · About · Teaching · Contact in mono · a hairline · three lines in Work Sans: "Director, camera operator, editor, and film instructor. Vancouver, works anywhere. Stories that are hard to look away from." · the email as a red link · IMDb · Vimeo · YouTube · LinkedIn as small mono text (Instagram, Facebook beneath, pending Q11). Width 260px; the rest is the main column with a 40px gutter.

### Home `/`
1. **Reel strip:** a horizontal scroller of three full-width players at 16:9: Just Watch Us, Directors Reel, Jack (his lead flags), each with a play button, title, and an "info" toggle that slides a one-paragraph story in from the right (Betancourt). Scroll snaps; arrows on desktop; swipe on touch. The first player is fully in view on load; the second peeks.
2. **Featured:** a 2×2 of poster frames: 5Rhythms, The Wolf of West Georgia Street, Just Up The Block, Contact Club. Hover washes toward cream with the title (Roper); tap opens the lightbox.
3. **Names and press** (the break): two columns. Left, in Work Sans lead size: "I've directed Ted Danson, Mary Steenbergen, Peter Gallagher, Kevin Smith, Tom Green and Aubrey Plaza for spots I'm not allowed to show you, and shot behind the scenes for Disney, Netflix, Sony, Paramount, Universal, CBS and the CW on sixty-odd productions." Right, two press quotes in Fraunces italic with sources ("Wonderfully wrong." / "Must-see… should send their filmmakers to the big leagues.").
4. **Teaching teaser:** one line and a link: "I also teach. Directing, camera and editing at VFS and LaSalle; camps; coaching." → `/teaching`.
5. **Footer** (main column): email again; "Vancouver, works anywhere"; socials.

### Work `/work`
1. **Section 1 — his name for the passion lane** (Q8; placeholder "Films I made because I had to"): a one-line intro in his voice, role chips (Directing · Camera · Editing · All), then a 3-column grid of frames on the dark surface (900) so night frames sit properly: Jack, The Bully Solution (replacement frame), Glimpse, Contact Club, Lyons Heart, Artless, It's A Crazier Life, The Wolf of West Georgia Street.
2. **Section 2 — his name for the for-hire lane** ("Films I was hired to make"): one-line intro, role chips, 3-column grid: Just Watch Us, A Very BC Production, Be Reel Green, Born To Be, Dare, Just Up The Block, 5Rhythms, Digital Days, VANDU, RFFC, TUTS 2025, TUTS 2026, Tradeswoman, Twenty8s, United8s, Riverdale EW, A Dog's Way Home, Shotlister. "Show more" after twelve.
3. **The "can't show you" line** (as A) beneath section 2.
4. Footer.

### About `/about`
1. **Portrait** left (his, alone; until then the BTS-with-crew photo the copy can carry), **opener** right (03 §8, warm variant), then the long bio with the interests line moved up.
2. **The Glimpse anecdote** in Fraunces italic, set large, on the cream.
3. **Awards** as a two-column list (one award, two festivals, link) and **clients and collaborators** as names in mono (logos swap in if cleared).
4. **On set:** three BTS photos in a row with captions naming collaborators.
5. **Credentials line.**
6. Footer.

### Teaching `/teaching`
As A: opener with the LaSalle photo; three blocks; the email line. In B the tone is warmest here (03 dial).

### Contact `/contact`
Short. "No agent, no form. Email me and I'll write back." · the email at display size · socials. The rail already carries all of it; this page exists for the URL and the redirect.

### Project detail `/work/<slug>`
As A, with the press quotes for that piece set in Fraunces beneath the player (Corkle).

## 5. Component inventory

| Component | Variants | States |
|---|---|---|
| Rail | desktop; collapsed header (phone/tablet) | active link red; email hover red-600 |
| Reel strip | 3 players; arrows; info panel | idle (poster + play); playing; info open |
| Frame | 2×2 featured; 3-col section grid on dark surface | hover (cream wash + title); focus; pending (placeholder) |
| Lightbox | player + meta + quote + prev/next + close | opening (dim in 150 ms); loading; playing; closing |
| Role chips | per section | active (red text, hairline) |
| Names block | — | — |
| Press quote | Fraunces italic, source line | — |
| Teaching teaser | — | link hover |
| Footer | main column | — |

## 6. Breakpoints
- **≥1280:** rail 260px + main; strip shows 1.2 players; featured 2×2; section grids 3 columns.
- **1024–1279:** rail 220px; strip 1 player; section grids 2 columns.
- **768–1023:** rail collapses to a top header (name, nav, email icon); strip full width; grids 2 columns; the three-line self-description moves to the footer.
- **<768:** header + a fixed bottom bar with "Email" and "Work"; strip is a swipe carousel; grids 1 column; lightbox becomes a full-screen sheet with the player at the top and meta scrolling beneath.

## 7. Performance and rights
- The strip's first player loads its poster only; the iframe mounts on tap. Second and third players mount when scrolled into view.
- Lightbox iframe mounts on open, unmounts on close.
- Same `projects` data file as A, with a `lane` field and an optional `quote` field.
- Rights gates as A. The names block on Home is text only by design.
- Cream ground: night frames render on the dark surface (900) inside section grids, never on raw cream.

## 8. The one break
Proof on the home page, in his voice: the names he may state and two press quotes, beneath the featured work, before Teaching. Director sites keep this for About; a producer with four minutes gets it without leaving Home.

## 9. Open items for this layout
- Q8: the two section names are the most important copy decision in this layout.
- Q1: testimonials, once cleared, slot beside the press quotes on Home and beneath the relevant film in the lightbox.
- Q3: if he wants a photo on Home, the rail is where it goes (small, above the name), not the main column.
- Q11: which socials the rail carries.
