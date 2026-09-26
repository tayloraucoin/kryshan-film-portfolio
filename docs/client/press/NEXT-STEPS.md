# Press — next steps

**Opened:** 2026-09-26 · **Press landed:** 2026-09-26 (M-SITE-9; DEVIATIONS, SITE-C Stage B press) · **Owner:** Taylor (the send), Kryshan (the questions)
**Feeds:** SITE-C Stage B (press ledger, A-7), SITE-5 (a film's Press), SITE-6 (About › Recognition › Press)

The press files arrived as `press.zip`: 23 articles over 38 scanned pages, 1997–2008, from the old site's press page. **They are not in the repo.** Only the two crops the site renders are committed (`public/media/press/`); the zip stays with Taylor. This file is the reading of them, so nobody has to re-read the scans.

## What shipped

- **The library, `content/press.ts`:** 97 verbatim quotes from 30 sources, the 23 clippings plus the seven reviews he listed, each read in its source on 2026-09-26.
  - 25 are about him, 55 about the two contests, and 17 about films.
  - Each has its source, date, and a `note` where there's a reason to think twice: a misprint, Bryan Singer, a film not on the site, a number to confirm.
  - Nothing in it shows by itself.
- **About › Recognition › Press** picks four (A-7, `Draft`):
  - Toronto Film Scene on Jack
  - Ain't It Cool News on The Bully Solution
  - The Nerve on him ("…motivate and inspire filmmakers…")
  - The Province on the contest ("…guerrilla filmmaking at its best…")
- **Film pages:**
  - Jack shows Toronto Film Scene, Rue Morgue and The More the Merrier.
  - Glimpse (Infamous) and The Bully Solution (Ain't It Cool News, Fantasia) have picks ready and show them once the films are unheld.
- **"See the clipping"** on The Nerve and The Province quotes. It opens a tight crop (headline, byline, the passage) toned to the kit's bone and ink, and loads only when opened.
- **To change what shows:** swap an id in `ABOUT.pressPicks` (content/about.ts) or in a film's `press` (content/projects.ts). The build names any id that doesn't exist, or a film quote put on the wrong film.

## Questions for Kryshan (for the Stage B send)

Numbers match the `note`s in `content/press.ts`.

1. **The Terminal Cinema review of The Bully Solution** (Dave Bertrand, April 2008): which publication ran it? The clip has no masthead, and a quote can't ship without its source.
2. **Two films the clippings name that aren't in your list:**
   - *Cowboy*, which won the February 2005 Quick Flick Challenge
   - *Cell Phone*, the "$25 budget" short at Wrap Yourself In Our Shorts, 2005

   Should either be on the site?
3. **Infamous (2007) says you'd directed "more than 40 shorts."** Is that a number you stand behind today? It isn't used anywhere yet.
4. **Crediting the contest.** The Westender names Ed Hatton as co-producer, and the Vancouver Sun calls it "Kryshan Randel and Michelle Candido's 24-Hour Film Contest". The site says you "produced" it, which is safe. Before any quote calls it yours alone: how do you want Ed and Michelle credited, if at all?
5. **The Great Canadian Commercial Contest's winners qualified for the World's Best Commercials screening in Cannes** (Vancouver Courier, 4 May 2005). Did that happen? It would be a checkable line.

## Findings for the facts ledger (02 §13)

- **Bryan Singer presented the awards; he did not judge.** The September 2002 contest's judges are named separately (ElectronicScene, Sept 2002; The Province, 20 April 2003). The intake says "judges/presenters", so anything we write says "presented".
- **Start date (02 §13 #3):**
  - It began as a Capilano College project. The Westender (2004) says he met Hatton "in 2000 after Randel placed an ad for his newly-minted 24-hour film contest".
  - The first public contest was October 2001 (MovieMaker, The Nerve, Terminal City). The Courier says "since November 2001".
  - MovieMaker says he started it "while still in film school", which fits Capilano 1999–2002.
- **The count:** the eighth contest was March 2003 (Playback). That fits the CV's "eleven contests".
- **The run:** the Georgia Straight (August 2005) calls the 24 Hour Film Contest "defunct this year but back for 2006". The CV says 2001–2004. Say nothing about 2006.
- **ElectronicScene's "6-21-02" report** describes a Sunday, 21 July 2002. The file name's June date is probably wrong.
- **Terminal Cinema spells him "Randal"**, and so does one ElectronicScene caption. The site cites the outlet, never the misspelling.

## Source inventory

| Outlet | Date | Headline | Him | In `content/press.ts` |
|---|---|---|---|---|
| MovieMaker (US) | Winter 2004 | Make a Great Movie in a Day? | Named, quoted; started the contest in film school | `moviemaker-2004` · His own quoted words left out |
| Westender | 8 Apr 2004 | Filming on the fly / Directors for a day | Central; photo with Ed Hatton | `westender-2004` |
| The Nerve | Oct 2002 | (profane headline) | Main subject, "Creator" | `nerve-2002` |
| Infamous | Jun 2007 | The Future of BC Film | Profile, portrait | `infamous-2007` |
| The Province | Apr 20 2003 | X2 connects with community | Quoted; the Singer story | `province-2003-x2` · Fact source |
| The Province | undated (2002) | 24-hour race to the finish | Producer, quoted | `province-2002` |
| The Province | Jan 28 2003 | 5 hours of 24 Hours | Not named | `province-2003-best-of` |
| The Vancouver Courier | May 29 2002 | 24-hour contest puts film in the fast lane | Producer, quoted | `courier-2002` |
| The Vancouver Courier | Apr 6 2005 | Urban Landscape (column) | One line and a headshot (*Cell Phone*) | `courier-2005-04` · Q2 |
| The Vancouver Courier | May 4 2005 | Urban Landscape (column) | Not named | `courier-2005-05` |
| Terminal City Weekly | Dec 20 2002 | 24 Hour Film Contest Best of 2002 | Not named | `terminal-city-2002` |
| The Skinny (to confirm, Q1) | Apr 2008 | (Terminal Cinema, Pacific Cinematheque) | The Bully Solution | `skinny-2008` |
| The Georgia Straight | May 16 2002 | Faster, Faster, Shoot, Shoot! | Not named | `straight-2002` |
| The Georgia Straight | Apr 22 2004 | Contest Winners in the 'Soup' | "fest founder", quoted | `straight-2004` |
| The Georgia Straight | Aug 25 2005 | We Make Short Shorts | Quoted | `straight-2005` · Fact source |
| The Vancouver Sun | May 16 2002 | Group whoops it up, centre comes down | Passing (with Michelle Candido) | `sun-2002` · Q4 |
| Playback | Mar 31 2003 | Tick tock | Not named | `playback-2003` · Fact source (8th contest) |
| Reel West | Jul–Aug 2004 | Rookies Win | "publicist", "she" | `reel-west-2004` · Clipping never shown |
| Westender | Feb 17 2005 | Giddyup, Cowboy | Director of *Cowboy* | `westender-2005` · Q2 |
| ElectronicScene e-zine | Jul 2002 | Report from the 24 Hour Film Contest | "creator and producer", photo | `e-scene-2002-07` · Web printout; weak outlet |
| ElectronicScene e-zine | Sep 2002 | 24 Hr Film Contest & ES | "Producer" | `e-scene-2002-09` · Fact source (Singer) |
| Victoria Times Colonist | Aug 2 2002 | (headline page missing) | Not named | `times-colonist-2002` |
| The Richmond Review | Oct 22 1997 | Multi-media course first of its kind | Student, 17 | `richmond-review-1997` · Clipping never shown |

## Still open

1. **Kryshan's OK** on A-7 and the three D-…-P rows (the Stage B send), plus the five questions above.
2. **If he picks a print quote from another source for About,** it needs a clipping crop: the headline and passage only, toned like the two in `public/media/press/`, imported on its source in `content/press.ts` with the passage as `alt`. Without one, the quote shows as text only.
3. **When The Bully Solution is unheld:** repoint `/terminal-cinema-review/` from Work to its page (`lib/routes.ts`), and add The Skinny quote if question 1 confirms the outlet.
4. **Articles on Teaching** (the Vancouver Courier piece on Frames) stay out of scope (SITE-C), v1.1 if wanted.
