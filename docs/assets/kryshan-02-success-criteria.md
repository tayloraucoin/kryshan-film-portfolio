# Kryshan Randel — Success Criteria (source of truth)

Vitrine · batch 1 · 2026-09-22 · built from the intake only (submitted 2026-09-15). No media or reference sites read yet; that is batch 2.

**Confidence tags used throughout**

| Tag | Meaning |
|---|---|
| **[M] Mandatory** | He said it plainly, or the offer requires it. Missing this is a defect. |
| **[S] Strong preference** | Stated once with a reason, implied by three or more picks, or the only reading that fits his goals. Departing from it needs a stated reason. |
| **[O] Optional / possible** | He floated it, hedged it, said "maybe" or "not sure." Design decides; he confirms. |
| **[I] Inspired** | Not requested. My read of what the evidence points at, labelled as judgment. |
| **[?]** | Needs an answer from him before it can be treated as fact. Collected in §14. |

Where a line cites a source it is in parentheses: (goals), (brain dump), (taste: site name), (CV), (bio), (project: title).

---

## 0. Brief readiness — the three answers

**Who matters most, and what state are they in when they arrive?**
Direct clients: a producer, agency, or organisation about to hire a director, camera operator, or editor. He ranked "direct clients" above producers, agencies, festivals, students, press, recruiters, peers, investors, and collaborators. They arrive with his name from someone else, on a phone as often as a desktop, with minutes, deciding whether to email him or the next name on the list. (who this site is for)

**What is the one action the site exists to produce?**
"Watch something, then email me wanting to work with me." Watching is the proof; the email is the conversion. Nothing on the site should sit between a visitor and a play button, and nothing should sit between a play button and his email address. (who this site is for)

**What must a first-time visitor believe after thirty seconds?**
That he is a storyteller who can direct, shoot, or edit anything cinematic on any budget; that he is "passionate, creative, works with / can come with great teams, trustworthy"; and that he is fun and fast to work with. (why people pick them; impression after one visit)

**Secondary visitor with their own territory:** students and teaching clients (VFS, LaSalle, camps, one-on-one coaching). He wants more camps, travel work, and coaching. They get a signposted place, not the front door. [S] (work they want more of)

---

## 1. Site-wide

### 1.1 Purpose and shape
- [M] Portfolio site. Less cluttered than the current WordPress site. Quick, easy to navigate. (goals)
- [M] "Make clients want to hire me within 30 seconds" for directing, shooting, editing and/or teaching, corporate or independent or a mix. (goals)
- [M] Four pages named: Home, Work, About, Contact. (pages they want) The offer allows five; the fifth is unassigned. [?] Candidate: Teaching (§7).
- [M] Reachable by email. No agent or rep; enquiries go to him directly. (representation; how people should reach them)
- [M] First person throughout. (your words)
- [M] Name on the site exactly: **Kryshan Randel**. One line: **Director, Videographer, Editor, Film Instructor**. Based in Vancouver, works anywhere. (about you)
- [S] Feel words: Creative · Professional · Excellence. Must never feel: Crowded. (taste)
- [S] Impression to leave: passionate, creative, comes with great teams, trustworthy. (impression after one visit)
- [S] Self-image to honour: fun, creative, professional, fast, natural storyteller, very collaborative. (why people pick them)
- [S] Never read as: someone who "just films something without any creativity or initiative," lazy, or passive. (what they are not)

### 1.2 Hard refusals (bind everywhere)
- [M] Too much text. (dislikes)
- [M] Too many pages. (dislikes; goals: "one or two clicks too many")
- [M] Too noisy / busy / crowded. (dislikes; must never feel like)
- [M] Slow loading times. (dislikes; goals: "the website is slow")
- [M] Spelling mistakes. (dislikes) — note: proofread every string; the client will notice. Canadian spelling to match his own writing ("favourite," "colour").
- [M] Nothing from the old site's inconsistent per-project pages carries over unchanged. (goals)
- [S] Work he wants to stop attracting must not be advertised: weddings, corporate videos with no room for creativity. (work to stop attracting) The site can show corporate work; it must frame it as creative.

### 1.3 Navigation and depth
- [S] Visitors roam rather than follow a funnel. Structure slider "How they get through it" sits strongly toward *They roam* (2.0). Every page reachable from every page; no enforced sequence. (which way it leans)
- [S] Video plays without leaving the page. Named as the reason for five separate picks (Alex D. Levin, Andrea Geremia, Barnaby Roper, Matias Boucard, Jacob McKee). This is the single most-repeated lifted feature in the intake. (taste)
- [S] One or two clicks from anywhere to a playing video. He diagnosed the old site as "one or two clicks too many for people to actually watch." (goals)
- [S] Email address visible at the bottom of every page. (taste: Alex D. Levin) [I] Also treat the footer as the contact path so the Contact page is never load-bearing.
- [S] Social links present but subtle, at the bottom of the home page and "maybe other pages." (brain dump; what must survive)
- [O] Per-project story/trivia: he wants "the whole story" around each piece (slider 5.0) but also suspects the trivia is "too many clicks / too much info" and floated dropping it. Resolution in §3.4. (reel page note; which way it leans)

### 1.4 Ownership, editing, and continuity
- [M] Built as sold: Next.js, TypeScript, Vercel free tier, GitHub repo in his name, video embedded from YouTube/Vimeo, style guide and self-edit guide delivered, old URLs redirected. (offer)
- [M] He will be "very" hands-on after launch. Content must be editable by him through the plain-language guide: adding a project, swapping a thumbnail, rewriting the bio, changing a link. Prefer a data-driven project list (one file or folder per project) over hand-built pages. (how hands-on after launch)
- [M] Domain kryshanrandel.com is his; registrar unknown; he wants a call to sort access. Email is not at that domain. (accounts and access)
- [M] Current platform WordPress. Old URL patterns seen on the live site: `/reel/`, `/about/`, `/contact-me/`, `/project/<slug>/` (e.g. `/project/just-watch-us/`, `/project/directors-reel/`, `/project/jack/`, `/project/united-8s/`, `/project/the-bully-solution/`, `/project/shotlister/`). The site runs Google Tag Manager (GTM-TP2KD9B) and credits "Site Design New Reality Media" in the footer. A full URL inventory is needed before build for redirects. [?]
- [S] Project comms with him over WhatsApp. Calls may be recorded. (preferred contact; consent)

### 1.5 Out of scope unless added (offer)
- Logo or wordmark: he has no logo ("Logo status: no"). The name set in type is the mark. A designed wordmark is the $250 add-on; do not design one by stealth. [I] Colour in the name (his own idea, brain dump) is an expression choice inside the type system, not a logo.
- Animations add-on ($250): the expand-in-place and hover-reveal interactions are core to how he wants the work seen, and the offer's standard build must deliver them. Anything beyond (a signature transition, a scroll-driven moment) is the add-on. Engagement-owner call, flagged here so it is decided, not absorbed.
- Contact form: unsure. Email-only satisfies the brief. A form is inside scope if chosen; a form that stores entries needs the Supabase add-on. [?]
- Booking, blog, admin panel: not requested.
- New photography, a 10–20 second reel cut, re-edits: the offer does not make the work. See §2.2 and §14.

---

## 2. Home page

### 2.1 Job
Answer who he is, what he does, and why you should care before the first scroll on a phone; get a visitor to a playing video in one tap; make the email obvious. [M] (goals; one action)

### 2.2 Content he asked for
- [M] "10–20 second highlight reel and/or a photo of me." (what should be on the home page) — Neither a 10–20 s cut nor a current photo exists in the intake. The Directors Reel (2023) is a full reel, not a 10–20 s piece. [?] He must either supply a short cut, accept the poster-frame of the Directors Reel, or supply a current photo. The offer does not cut reels or shoot photos. Photos are also "out of date" by his own account. (goals)
- [M] 3–4 featured videos, "maybe more." (what should be on the home page)
- [S] A summary of what he does "similar to my previous site" — the three strands: Directing · Camera Operator/Editing · Teaching, each in two or three lines. (pasted home page copy)
- [S] Links to best work, "maybe even all work." (brain dump) [I] Read as: featured pieces on home, a clear route to the full Work page, not the full archive on home.
- [S] Subtle social links at the bottom. (brain dump)
- [S] He meets the visitor early. Structure slider "Who they meet first" sits toward *You* (6.0): his presence (photo, name, a line in his voice) should be above or beside the first work, not buried on About. Genre convention says work first; his lean says both in the first screen. [I] Resolve by putting his name and a one-line self-description in the first view alongside the first play button, not by leading with a portrait. (which way it leans)
- [S] Footage carries the work more than stills (slider 5.0 toward *Footage*). Thumbnails are poster frames from the videos, not photography. (which way it leans)

### 2.3 Shortlisted for home (his picks)
| Piece | Year | Role | Link | His flag |
|---|---|---|---|---|
| Just Watch Us | 2019 | Director / Co-writer (DGC BC PSA) | youtube.com/watch?v=CQUSAB2euBk | Lead with this · Front and centre · Shortlisted for home · #1 of five |
| Jack | 2009 | Director (short film) | vimeo.com/23552792 | Lead with this · Front and centre · Shortlisted for home · #2 of five |
| 5 Rhythms | 2025 | Camera / Editor (promo for Bettina Rothe) | youtube.com/watch?v=arSy1rmGMGU | Lead with this · Shortlisted for home · #3 of five |
| Directors Reel | 2023 | Director (demo reel) | youtube.com/watch?v=UyVrm210Fc8 | Lead with this · Front and centre |
| The Wolf of West Georgia Street | 2014 | Director / Co-editor | youtube.com/watch?v=X272pj_iu7Y | #4 of five |
| Just Up The Block | 2025 | Director / Camera / Editor (Courtenay Cohousing) | youtube.com/watch?v=czL8jlkT2jc | #5 of five |

- [M] Just Watch Us, Jack, and 5 Rhythms are on the home page. (shortlisted for home)
- [S] The Directors Reel is on the home page: it is the only "lead with this" item not in his home shortlist, and it is the piece that answers "what does he do" fastest. (project flags)
- [O] Wolf of West Georgia Street and Just Up The Block round out to five or six if the layout wants them. (if they could only show five)
- [I] Note the spread of his own top five: a PSA for the industry, a horror comedy, a dance-practice promo, a fake trailer, a cohousing PSA. Three roles, four registers. That spread *is* the message ("any genre, mood, emotional experience and/or time/budget parameters") and the home page should show it as a range, not hide it.
- Spelling: his intake says "5 Rythms" throughout; the practice is spelled 5Rhythms. Confirm the on-site spelling. [?]

---

## 3. Work page(s)

### 3.1 Organisation
- [M] Organised by **role**: Directing · Camera · Editing. This was the explicit answer to "how the work should be organized." (the work)
- [S] A second division between **passion projects** and **for-hire** work. He raised it in the goals ("not sure how to balance my dark and twisted passion projects with conservative corporate work, I want to keep making both"), in the site-separation question ("art" and "art I got paid for," from Petros, which he called "brilliant"), and in the brain dump ("clear division… or both (tags or two separate pages or both)"). He is not sure whether it is tags, pages, or both. (taste: Petros; how separate; brain dump)
- [S] A visitor can filter or scan by both axes without leaving the page. Tags were how his old site did it and he liked that part. (how separate)
- [O] "Narrative" vs "commercial" as a third framing (taste: Christopher Mably, 3/7, "I do like how projects are divided"). Lower weight; the passion/for-hire split covers the same ground.
- [S] Corporate work stays on the site and stays creative-looking. He wants to keep doing both kinds. Framing that hides corporate would cost him work he wants (PSAs, sizzle reels, theatre trailers are all client work). (goals)

### 3.2 Presentation of each piece
- [S] Video thumbnails side by side; brief description appears on hover; thumbnail expands to a video hovering over the page, playable immediately. (the style they described; taste: Alex D. Levin, Barnaby Roper, Jacob McKee — "my favorite way so far of seeing videos on pages")
- [S] Title over each thumbnail. (taste: Matias Boucard)
- [S] Scroll down *or* across to see it all. (brain dump; taste: José Betancourt — "option to scroll horizontally")
- [S] No photos stacked beneath each video. (taste: Nick Sanders — the one thing he disliked on his best-rated design)
- [S] Descriptions short enough that they "don't crowd the pages." (taste: Edna Luise Biesold)
- [M] Consistent treatment across every project; the old site's per-project inconsistency is a named failure. (goals)
- [I] Real poster frames chosen per piece, at native 16:9; he supplied a screenshot for every project, which are the starting thumbnails. Vertical Instagram work (Shotlister) needs a treatment that does not fake 16:9. (taste: José Betancourt liked IG verticals placed between 16:9 pieces)

### 3.3 Placement he assigned
**Front and centre:** Just Watch Us · Directors Reel · Jack.
**In the archive:** A Very B.C. Production · Artless · Glimpse · The Bully Solution · Dare · Just Up The Block · Riverdale EW BTS · Twenty8s · United8s · A Dog's Way Home EPK · Shotlister · Contact Club · The Wolf of West Georgia Street · It's A Crazier Life · Lyons Heart · VANDU · Digital Days · Be Reel Green · RFFC · 5 Rhythms · TUTS 2025 Season Teaser · TUTS 2026 Trailer.
**No placement given:** Born To Be · Tradeswoman Exhibit. [?]
Note the contradiction he wrote into it: 5 Rhythms is "lead with this" and shortlisted for home but placed "in the archive." Read as: featured on home, filed under Camera/Editing on Work. Wolf of West Georgia Street and Just Up The Block are in his top five but "in the archive." Read as: archive placement is the Work-page default; his top five and lead flags govern home. [I]

### 3.4 Per-project depth
- [S] The story, awards, and press for each piece exist and he values them (slider 5.0 toward *the whole story*), but they must not be in the way. He said of the old site: "maybe better just to feature the links to the work itself without all that trivia." (reel page note)
- [I] Resolution: play in an overlay from the grid; the story, role, client, year, and awards sit in that overlay beneath or beside the player; a lightweight detail page exists behind it for sharing and search (project pages do not count against the page budget). Nobody is forced through a detail page to press play. This satisfies both his statements.
- [S] Role and credit stated precisely on every piece ("Director / Co-writer," "Camera Operator / Editor," "EPK Camera Operator"). A producer reads these as different hires. (offer; role prompt)

### 3.5 Full project inventory (from the intake's "The work")
Rights: all 27 marked "Public — safe to show" by him. Links are his; unverified.

| # | Title | Year | Role | Kind | For | Link | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Just Watch Us | 2019 | Director / Co-writer | PSA | DGC BC | YouTube CQUSAB2euBk | Lead; his "more on how the work should read" sample sentence is this one |
| 2 | A Very B.C. Production | 2021 | Director / Co-writer | PSA | MPIAA, IATSE 669/891, DGC BC, Creative BC | YouTube zsXt4ykR6EY | Virtual production LED volume |
| 3 | Directors Reel | 2023 | Director | Demo reel | Self | YouTube UyVrm210Fc8 | Lead |
| 4 | Artless | 2009 | Director / Co-writer | PSA | Wrecking Ball Society | YouTube 3DSlctLvQG4 | Arts funding cuts PSA |
| 5 | Jack | 2009 | Director | Short | Passion | Vimeo 23552792 | Lead; awards §8 |
| 6 | Glimpse | 2007 | Director / Co-writer | Short | — | YouTube -MoaRA-QC8E | 35mm; awards §8 |
| 7 | Born To Be | 2023 | Director / Camera / Co-editor | Music video | Myk Gordon | YouTube BdDTZcIymG0 | No placement given |
| 8 | The Bully Solution | 2005 | Director | Short | Passion | Dailymotion via old site | Banned from YouTube and Vimeo; embed method unresolved [?] |
| 9 | Dare | 2025 | Co-director / Camera / Co-editor | Music video | Myk Gordon | YouTube KNP-9hOFCR0 | Live three-camera |
| 10 | Just Up The Block | 2025 | Director / Camera / Editor | PSA | Courtenay Cohousing | YouTube czL8jlkT2jc | Top five |
| 11 | Riverdale EW BTS | 2017 | Camera Operator | EPK | Entertainment Weekly | YouTube 92ZF6lgw4us | |
| 12 | Twenty8s | 2019 | Director | Promo | Crazy8s | YouTube CBbDVwxeTaM | 20th anniversary |
| 13 | United8s | 2017 | Director | EPK / opening film | Crazy8s | YouTube AsjwQgkOCUo | |
| 14 | A Dog's Way Home EPK | 2019 | Camera Operator | EPK | Sony Pictures | YouTube 6ijBBPwVdGY | Link supplied without scheme |
| 15 | Shotlister | 2018 | Director / Co-writer | Instagram ads | Shotlister / Zach Lipovsky | Old site page only | Six or seven vertical spots; individual IG links unknown [?] |
| 16 | Contact Club | 2020 | Director / Co-writer | Short | Passion | YouTube EMlAIDezFMs | $25 pandemic short; awards §8 |
| 17 | The Wolf of West Georgia Street | 2014 | Director / Co-editor | Fake trailer | Private birthday | YouTube X272pj_iu7Y | Top five; subject is a private person — confirm still cleared [?] |
| 18 | It's A Crazier Life | 2014 | Director | Promo / satire | Crazy8s | Vimeo 88313657 | |
| 19 | Lyons Heart | 2016 | Director / Camera / Editor | Artist portrait | Jennifer Lyons | Vimeo 155338101 | Passion |
| 20 | VANDU | 2019 | Camera / Editor | PSA | VANDU | No link supplied [?] | |
| 21 | Digital Days | 2017 | Camera / Editor | Promo | IATSE 669/891, DGC BC | YouTube NSTO9qq6SG8 | |
| 22 | Be Reel Green | 2018 | Director / Camera | Promo | Creative BC / Reel Green | YouTube tHqDJ6Gcbr0 | Screened VIFF 2018 |
| 23 | RFFC: We're In This Together | 2015 | Camera / Editor | Promo | Richmond Mental Health Consumer and Friends Society | Vimeo 166846735 | |
| 24 | 5 Rhythms | 2025 | Camera / Editor | Promo | Bettina Rothe | YouTube arSy1rmGMGU | Lead; home |
| 25 | Tradeswoman Exhibit | 2025 | Editor / Camera | Promo | Carly Steiman | YouTube BG0OpaU9rJo | No placement given |
| 26 | TUTS 2025 Season Teaser | 2025 | Camera / Editor | Teaser | Theatre Under The Stars | YouTube HRwxGEJdris | |
| 27 | TUTS 2026 Trailer | 2026 | Camera / Editor | Trailer | Theatre Under The Stars | YouTube 5Z6rq32MKyc | |

Not in the inventory but present in his CV and filmography, and candidates for the archive or a credits list, not for embedding: Ted on Set (2019, Ted Danson / Mary Steenbergen / Peter Gallagher — "allowed to say I worked with them but not allowed to post the results"), Rio Theatre PSAs (Kevin Smith, Tom Green, Gowan — same restriction), Where The Canoe Takes Us (2013–14 doc), Mission Ninety Two: Dragonfly / Libelle, Seasick, Bloodshed (VR), La Danza, Promoter and The Shameless Traveller sizzle reels, Novus TV segments, plus the full EPK/BTS credit list.

### 3.6 The work he wants more of, and what the Work page should therefore lead with
- [S] More: music videos, PSAs and commercials, trailers and sizzle reels, demo reels, theatre archivals and trailers; "more creative projects" across directing, camera, and editing. (work they want more of)
- [S] Teaching: film camps, travelling for work, one-on-one coaching. (work they want more of)
- [I] The Work page's default sort should surface exactly those kinds first. The inventory already has three theatre pieces, two music videos, five PSAs, and a sizzle-adjacent fake trailer. Kinds he wants less of (weddings, flat corporate) are absent from the inventory; keep it that way.

---

## 4. About page

- [M] First person. (your words)
- [M] The bio is his own; ~460 words as submitted. Layout must carry a bio of that length or the copy doc (batch 3) must propose a short/long structure he approves. Do not design for an 80-word bio he did not write. (current bio)
- [S] Client logos on the about page. (brain dump; taste: Alexandros Maragos — "all logos on the about me page") **Logos need his confirmation that he may show them.** [?] Until then the slot is designed and populated with names set in type. Named client list (affiliations): Disney, Netflix, Paramount Pictures, Universal Studios, Sony Pictures, The CW, BBC America, CBS, CTV, Hallmark, VanCity, Vancouver Symphony Orchestra, VIFF, Creative BC, Theatre Under the Stars, Bard on the Beach, The Rio Theatre, SFU Creative Studios, former Mayor Gregor Robertson, IATSE 669, Pulling Together Canoe Journey; director/writer/producer clients DGC BC, Shotlister / Zach Lipovsky, Richmond City Hall, MPIAA, Crazy8s.
- [O] Festival laurels on the about page. (brain dump) He has not supplied laurel files. [?]
- [S] Awards listed on the about page, "and award" style. (taste: Matias Boucard — "I like the awards listed on the about and award page (I wonder if logos here would also fit)")
- [O] Testimonials, "maybe about me page." (brain dump; goals) He has none collected yet and permission is outstanding; the intake flags kind words as **not cleared to publish**. [M] Nothing goes up without his written confirmation per quote. (flags; kind words)
- [S] Credentials and memberships: IATSE 669 (EPK category); 2016 Motion Picture Orientation, WHMIS, ActSafe; Capilano College Professional Film Studies and Media Programs (2002; CV says 1999–2002); American Academy of Dramatic Arts Acting Program (1996). (memberships and credentials)
- [S] The interests line stays in his words: transcendental meditation, skiing, beach volleyball, DJing, "host large-scale immersive events." (bio) This is the only sanctioned public mention of the events side of his life. See §9.
- [S] "Nice intimate bio writeup" was praised on Nick Sanders. Tone target for the bio: intimate and specific, not a CV in prose. (taste)
- [O] Contact combined with About. (brain dump: "Contact page could be either short and a form to fill out, or combined with about me page")
- [S] A current photograph of him. The old photos are out of date by his account; the only portrait supplied is a photo with Ted Danson. The offer does not shoot; he supplies. [?]

---

## 5. Contact page

- [M] Email is the channel. (how people should reach them) Which address: the intake gives kryshanrandel@gmail.com; his filmography header gives kryshan@kryshanrandel.com; he answered "email at that domain: no." [?]
- [S] Short. "Short and a form to fill out, or combined with about me." (brain dump) Barnaby Roper's contact page was praised for simplicity.
- [O] A form. He is "unsure." (needs a form embedded)
- [M] No availability line. (show availability: no)
- [M] Social links: Facebook, Instagram, IMDb, LinkedIn, YouTube, Vimeo. "How many I'm not sure." (what must survive) URLs supplied: imdb.com/name/nm1451064 · linkedin.com/in/kryshanrandel · instagram.com/kryshanrandel · facebook.com/kryshanrandel · youtube.com/user/kryshanrandelfilms · vimeo.com/kryshanrandel. [?] Confirm which appear. [I] For a hirer, IMDb, Vimeo/YouTube, and LinkedIn do work; Facebook and Instagram are personal-adjacent and can sit lower.
- [M] Phone number: not requested on the site. His CV carries it; do not surface without asking. Home address on the EPK CV never appears anywhere.

---

## 6. Home-page summary strands (his previous copy, kept as content, rewritten by copy)
His current home page states three strands and he wants "a summary of what it is I do similar to my previous site." Content that must survive in some form:
- **Directing** — dark comedies and horror shorts screened and awarded at top genre festivals; director for hire for PSAs, music videos, web series, sizzle reels.
- **Camera Operator / Editing** — IATSE 669; shoots and edits docs, BTS, corporate and non-fiction with a Canon C70, often as a one-man crew; edits narrative shorts; Leo nomination for editing.
- **Teaching** — directing, shooting, editing at VFS and LaSalle; remote film camps; one-on-one coaching.
[S] Keep the strands to two or three lines each; the goal is "less cluttered," not a fourth paragraph.

## 7. Teaching (the fourth strand needs a home)
- [S] Teaching is one of the four things he is hired for ("Director, Videographer, Editor, Film Instructor") and one of the two categories of work he wants more of. It cannot be a footnote. (about you; work they want more of)
- [O] The unassigned fifth page is the natural place. Alternatively a section on About or a tag on Work. [?]
- [S] Content available: VFS (2026), LaSalle (2023–present), InFocus (2010–2022, twelve years), Reel Youth (Whati NWT, Mississauga), Frames Film Project (founder, 2012–2015, Frog Hollow Neighbourhood House, at-risk youth), CEDIM Mexico (visiting professor, 2010), camps in Mexico, Victoria, Toronto, NWT; one-on-one coaching. Press link on Frames exists (Vancouver Courier).
- [I] The teaching visitor's action is the same email; the framing is different (what a camp or coaching engagement looks like). No booking system was requested.

---

## 8. Proof and recognition (facts to state; all must be verified before publishing)

### 8.1 Awards and selections he listed
- **Leo Award nomination (2026)** — Best Editing, Musical/Comedy/Variety program or series, for *A Night at Malibuz* (co-editor). Title and credit inconsistent across sources; see §13.
- **Jack (2009)** — Bloodshots Film Festival: Grand Jury Prize, Audience Choice, Best Script, Best Death (judged by Dan O'Bannon). Fantasia: Silver Audience Choice, Best Short. Sharpcuts: Jury Prize, best horror short. Screened Sitges, CFC Worldwide, imagineNATIVE, Calgary Underground, Weekend of Fear, Mauvais Genre, Fantastic Week, Moving Image, Freakmacine, MotelX, Strange Tales. Distributed seven years by Shorts International (iTunes); broadcast on Shorts HD. The Shorts Report "most watchable Canadian shorts" list.
- **Glimpse (2007)** — DGC BC / BC Film Kick Start; premiered VIFF 2007 (sold out); A&E Short Filmmakers Award (NSI Online Film Festival, 2008); Sundance Channel via Ouat Media; also stated as sold to Corus (Sundance Channel and Movieola). See §13.
- **The Bully Solution (2005)** — Bloodshots (judged by Robert Rodriguez): Grand Prize / Grand Jury Prize, Audience Choice, Best Acting (David Lewis), Most Subversive Use of Genre (project entry only). Screened Fantastic Fest, Fantasia, Screamfest LA, Horror Fest UK, Sharpcuts, Calgary IFF, Olympia.
- **Contact Club (2020)** — Vancouver Quarantine Performance Project: Best Actor (Riaan Smit); nominated Best Film, Best Writing.
- **Be Reel Green (2018)** — screened VIFF 2018.
- **The Secret Life of Cassandra Brown (2007)** — Bloodshots Best Screenplay, Best Acting. **Socky Kong (2007)** — Trick 17 Best Sound Design. **Cowboy (2005)** — Quick Flick Challenge first place. (filmography; archive-level)

### 8.2 Press quotes he supplied (short, attributable, usable once sources are confirmed)
The Bully Solution: Ain't It Cool News; Mitch Davis, Fantasia. Jack: Toronto Film Scene; CityTV News; Rue Morgue; The More The Merrier Arts Radio; Exclaim!; Panic Manual (Midnight Mania honourable mention); Examiner.com (Midnight Mania highlight). Seven article URLs supplied (Plank, Vancouver Courier ×2, Roots Music Canada, Tinnitist, The Province, The Uncarved Blog). About 24 more articles emailed to Taylor, to be attached at build time. [M] A press section or press strip exists somewhere on the site (About or a dedicated block) to hold these; its shape is decided at layout, its content at build.

### 8.3 Names he may state but not show
- Directed: Aubrey Plaza, Kevin Smith, Tom Green, Ted Danson, Mary Steenbergen, Peter Gallagher. "Allowed to say I worked with them but not allowed to post the results." [M] Names in type only; no stills, no clips, no thumbnails of that work.
- Shot (BTS/EPK): Jim Carrey, Dwayne Johnson, Aubrey Plaza, Ashley Judd, plus the sixty-plus title EPK credit list (Sonic the Hedgehog, Riverdale, Supernatural, Fire Country, The Good Doctor, Skyscraper, A Series of Unfortunate Events, Batwoman, Child's Play, Snowpiercer, Love Me, etc.). [S] A credits list is proof, not work: it may appear as text (a scrolling or columned list, or a "sixty titles" line with a link to IMDb). [M] No NDA'd footage or stills, even as thumbnails.
- [I] This answers his worry that "most of my best work I can't show." The site shows what it can, states what it can't, and the credit list does the rest.

---

## 9. The private events life
- [M] He produces large-scale immersive events and keeps it "top secret." He has "great photos and videos if that is included somehow." Default: off the site, except the existing interests line in his bio in his own words. (goals; bio)
- [?] The decision is his, made explicitly, before anything is designed for it. If he wants it in, it gets its own quiet, signposted territory (a page or a section) that a producer never lands on by accident; it is not mixed into the Work grid.
- [I] Note that his inspiration images (Burning Man, Studio 54, red curtains, Saturday Night Fever) lean toward that side of his life. That is expression evidence for batch 2, not permission to show the events.

---

## 10. Media and rights
- [M] Every piece marked public by him; he confirms he is allowed to show it (offer). Wolf of West Georgia Street features a private person at a private party; confirm it is still cleared. [?]
- [M] Video embedded from YouTube and Vimeo only. The Bully Solution lives on Dailymotion (banned from YouTube and Vimeo); Dailymotion embeds are technically possible but the offer names YouTube/Vimeo. Engagement-owner call. [?]
- [M] Shotlister spots are on Instagram; individual links unknown; IG embeds are heavy and fragile. Options: link out, or he supplies the files to upload to his YouTube/Vimeo as a compilation. [?]
- [M] VANDU has no link. [?]
- [S] Thumbnails: he supplied one screenshot per project; treat as starting poster frames, replace where a better native frame exists. Two are literal screen captures with window chrome in the filename (Dare, Tradeswoman, both TUTS) and may need re-grabbing.
- [S] Behind-the-scenes photos supplied (Fire Country EPK, Leatherface with camera, music video shoot, AD-ing in Yukon, MPIAA PSA shoot ×4, multicam archival, concert shoot, with Ted Danson, LaSalle grad). These are candidates for About and for the "on set" texture of the site; each shows him at work, which supports "works with great teams." Studio-set photos (Fire Country, Leatherface) may fall under set photography restrictions. [?]
- [M] Inspiration images (Burning Man, red curtains, Marianne Williamson quote, Wild at Heart, The Cell, Studio 54, Mad Max, Fishtank Love, Farmer, Saturday Night Fever, Blue Velvet, Tilda Swinton red, Vertigo, Eternal Sunshine, In the Mood for Love) are mood only. None ship.
- [M] Brand assets supplied: Glimpse cover, Jack poster. Usable on those project entries.
- [M] Photo of him: one file, with Ted Danson. Also filed under BTS. Confirm it is cleared for a portrait slot; otherwise he supplies a current portrait. [?]

---

## 11. Behaviour and performance
- [M] Fast on a phone with two bars. No video loads until intent. Poster frames, not autoplaying embeds, in the grid. (dislikes: slow; offer)
- [M] No autoplay with sound. [I]
- [S] Hover reveals are designed with a touch equivalent (tap to reveal, second tap to play, or always-visible titles on touch). His interaction ideas are all hover-based; his primary visitor may be on a phone. [I]
- [S] Reduced-motion users get a designed equivalent of the expand-in-place. [I]
- [M] WCAG 2.2 AA absent any other target. [I]
- [M] Proper metadata per page and per project detail page; old WordPress URLs redirected. (offer)
- [M] Broken or private links are a stated dislike (taste: Kirill Groshev). Every embed is checked before first look.

---

## 12. Taste evidence that is structural (harvested lifted features)
Expression (colour, temperature, texture, type) is batch 2. These are the picks that are actually requirements, listed with the strength of the note.

| Requirement | Source and note | Weight |
|---|---|---|
| Video plays in one tap without losing the page: seen as a lightbox over the dimmed page (Roper), a cell that expands inside the grid (McKee), a horizontal strip of full-width players (Betancourt), or an instant project page (Levin, which he experienced as "instantly watch") | Alex D. Levin, Andrea Geremia ("only because it prevents going to a whole separate page"), Barnaby Roper, Matias Boucard ("prefer videos hovering over pages instead of having to click the back button"), Jacob McKee ("my favorite way so far") | [S] five picks, four with reasons |
| Email address at the bottom of every page | Alex D. Levin | [S] |
| Hover an image, see the text, click, instantly watch | Alex D. Levin | [S] |
| Titles over each thumbnail | Matias Boucard | [S] |
| Awards on the About page; logos may fit there too | Matias Boucard, Alexandros Maragos | [S] |
| Simple contact page; simple film archive page | Barnaby Roper | [S] |
| Passion vs paid split ("art" / "art I got paid for") | Petros — "brilliant" | [S] |
| Horizontal scroll as an option; IG verticals placed between 16:9 pieces | José Betancourt — "best of this section" | [O] |
| Thumbnail expands to fill the screen on click | Jacob McKee | [S] |
| Descriptions below films that don't crowd the page | Edna Luise Biesold | [S] |
| Narrative vs commercial division | Christopher Mably (3/7) | [O] |
| Attention-getting result headlines ("This film series helped win a million-dollar contract") | Kahani (3/7, "way too wordy" otherwise) | [O] — his own "Just Watch Us" sentence already does this |
| Few pages, or many pages that don't feel bulky because of layout | scootercorkle.com, Airview | [S] |
| Extreme simplicity, classy font, easier navigation | mjz.com, Airview ("all business and brevity") | [S] |
| **Refuse:** photos below each video | Nick Sanders | [M] |
| **Refuse:** slow pages, too crowded, too many pages | Andrea Geremia | [M] |
| **Refuse:** links that don't work / are private, slow video loading | Kirill Groshev | [M] |
| **Refuse:** white thumbnails with no image | Jacob McKee | [M] |
| **Refuse:** wordy and bulky | Kahani | [M] |
| **Refuse:** "a bit plain re the design" | Matias Boucard | [S] — he wants simplicity with style, not plainness |

Self-described leanings (for batch 2, recorded here as data): warm 6/7 · bold 6/7 · playful 6/7 · timeless 3/7 (mild toward timeless) · personality lives in the site 5/7. Picks as tagged by the gallery: dark ×12, alive ×10, balanced ×8, sparse ×5, light ×3, still ×3, quiet ×2, dense ×2. **Correction after visiting the sites (batch 2):** the gallery's dark/light tags describe the imagery, not the chrome. Seen, seven of his top-rated sites are light (Levin, Roper, Boucard, McKee, mjz, Betancourt, Corkle) and six are dark (Sanders, Petros, Airview, Biesold, Directors Bureau, Kahani). Ground colour is therefore an open fork; what the top picks share is quiet chrome, a small wordmark in one accent, and a play button one tap away. See `kryshan-01-taste-read.md` §2.1. Colours: red, green, blue, white, black. Style in his words: "Red and/or green and/or blue, video thumbnails arranged side by side with brief descriptions appearing as you hover over them, thumbnails expand to videos hovering over the page that are able to be played immediately." Colour "either in the thumbnails or some of the text (my name?) or both."

---

## 13. Facts that disagree with themselves (do not publish until resolved)

| # | Conflict | Sources |
|---|---|---|
| 1 | Leo-nominated film title: *A Night at Malibuz* (home copy, awards) vs *One Night at Malibuz* (CV). Credit: "co-editing" (bio) vs "Editor" (CV). Category wording differs between awards field and bio. Year 2025 (CV) vs 2026 nomination (awards). | home copy; CV; awards; bio |
| 2 | Vancouver Film School: present in home copy, first bio, and an experience entry dated 2026; absent from the second bio paste. Current or not? | home copy; bio ×2; experience |
| 3 | Career start: "since 1999 — 27 years" (about you) vs producing contests from 2001 (bio, CV) vs "nearly thirty years" (Directors Reel story). Capilano dates 2002 (credentials) vs 1999–2002 (EPK CV). | about you; bio; CV; project |
| 4 | Crazy8s opening films: "eight" (bio) vs "three opening films… six behind the scenes films and four podcasts" (CV) vs "my eighth year directing opening films" (United8s, 2017). | bio; CV; project |
| 5 | Glimpse distribution: sold to Corus, screened Sundance Channel and Movieola (bio) vs Sundance Channel via worldwide distributor Ouat Media (project). | bio; project |
| 6 | Bully Solution awards: Grand Jury Prize, Audience Choice, Best Acting (CV, awards) vs Grand Prize for Best Film, Audience Choice, Most Subversive Use of Genre, Best Acting (project). | CV; project |
| 7 | Shotlister spots: six (CV, project) vs seven (filmography). | CV; project; filmography |
| 8 | Contact email: kryshanrandel@gmail.com (intake) vs kryshan@kryshanrandel.com (filmography header) while "email at that domain: no." | intake; filmography |
| 9 | 5 Rhythms spelling ("5 Rythms" in intake). | intake |
| 10 | Legendary Pictures appears in the bio's client list but not in the affiliations list. | bio; affiliations |
| 11 | IMDb credits one title "as Kryshan Randal." Not a site issue; worth him knowing. | IMDb paste |
| 12 | Dan O'Bannon judged Jack "a few weeks before his passing" — O'Bannon died 17 December 2009; Bloodshots was October 2009. Plausible; verify wording. | project |

---

## 14. Questions for Kryshan (the one message)

Grouped so he can answer in one sitting. Design proceeds on the assumptions in brackets until answered.

**Must-answer before first look**
1. Testimonials: who are you asking, and can you send each quote with the person's written OK? Nothing goes up without it. [Assume: slot designed, empty until cleared.]
2. Client logos (Disney, Netflix, CBS, etc.): do you have permission to show their logos, or should the site list them by name? [Assume: names in type.]
3. Home page opener: do you have, or will you cut, a 10–20 second highlight? If not, which is it: the Directors Reel poster frame, or a current photo of you? And do you have a current photo? The only one supplied is with Ted Danson; is that one cleared and is it the one you want? [Assume: name in type plus a strong frame pulled from the Directors Reel or the Just Watch Us frame; the supplied Directors Reel screenshot (a grey windmill scene) cannot carry a hero; photo on About.]
4. The events side of your life: off the site entirely (except your bio line), or on it in a quiet, separate place? [Assume: off.]
5. Email to publish: kryshanrandel@gmail.com or kryshan@kryshanrandel.com? [Assume: gmail.]
6. Contact: email only, or a form as well? [Assume: email only, on every page.]
7. The fifth page: Teaching, or leave it at four? [Assume: Teaching.]
8. Passion vs for-hire: happy with a split in that spirit ("art" / "art I got paid for"), and if so what would *you* call the two? [Assume: a two-way tag on the Work page plus role tags; naming to copy.]
9. The Bully Solution: OK to embed from Dailymotion, or link out? URL? [Assume: link out until confirmed.]
10. Shotlister: can you send the six spots as files (to upload to your YouTube/Vimeo) or the individual Instagram links? VANDU: link? [Assume: Shotlister links out to the old page's content; VANDU held.]
11. Which social links: all six, or a subset? [Assume: IMDb, Vimeo, YouTube, LinkedIn prominent; Instagram, Facebook secondary.]
12. Names you may state (Plaza, Smith, Green, Danson, Steenbergen, Gallagher; Carrey, Johnson, Judd): confirm this list is exactly what you are cleared to say, and that the BTS/EPK credit titles may be listed as text. [Assume: yes, text only.]
13. The Wolf of West Georgia Street: still cleared with Andrew Johns and his family to show publicly? [Assume: yes, as stated.]
14. Set photos (Fire Country, Leatherface): cleared to show you on those sets? [Assume: held.]

**Facts to confirm (from §13)**
15. Leo nomination: exact film title, your credit (editor or co-editor), category wording, year.
16. Are you currently teaching at VFS? What term?
17. How many Crazy8s opening films: three or eight?
18. Bully Solution awards: which list is right?
19. Glimpse distribution wording: Corus / Movieola, or Ouat Media?
20. Shotlister: six or seven spots?
21. Since when: 1999 or 2001? (The site will say one number.)

**Nice to have**
22. Festival laurels: do you have the laurel graphics for Sitges, Fantasia, Fantastic Fest, VIFF, etc.?
23. Old site: a list of its pages/URLs, or leave it to me to crawl kryshanrandel.com before it comes down. [Assume: I crawl.]
24. Born To Be and Tradeswoman Exhibit: archive, or featured?
25. Registrar and DNS: when suits for the call?
26. Anything in the current site that should die with it, beyond the per-project pages? The current footer carries an X/Twitter link you did not list among the must-survive socials; keep or drop?
27. Thumbnails: the Bully Solution frame supplied is the blood-covered child, and the Glimpse and Bully Solution files are SD (720×480) with baked letterboxing. May I pull replacement frames from the videos (a non-gory Bully Solution frame, an HD Glimpse frame, a stronger Directors Reel frame), or would you rather choose them? [Assume: I pull and you approve.]
28. Your 2017 application essays mention features in development (Feel Like Jumping, Grandma Death, Playground, Chaos Girl). Is any of that current and meant for the site, or does it stay off? [Assume: off.]

---

## 15. What "done" looks like for Phase 1 (checkpoints against this document)
- Three branding kits, each traceable to §1.1, §12, and the taste read, none of which could be mistaken for a template.
- Three layouts, each satisfying every [M] in §1–§11, each expressing the role split (§3.1) and the passion/for-hire split (§3.1) structurally, each with contact one tap from anywhere, each with a home page that gets to a playing video in one tap and shows Just Watch Us, Jack, 5 Rhythms, and the Directors Reel.
- Three mock home pages he can comment on, built with his titles, his poster frames, and copy in his register, with nothing false and nothing NDA'd.
- Every [?] either answered or carried as a visible assumption into the build spec.


---

## 16. Amendments after batch 2 (visual verification, 2026-09-22)

Recorded here so the source of truth carries its own history; the lines above have been patched where they were wrong.

- **§2.2 / §14 Q3.** The Directors Reel screenshot he supplied cannot carry a hero. Assumption changed to a stronger frame from the reel or the Just Watch Us frame.
- **§1.4.** Live-site URL patterns and the GTM container are now recorded for redirects and analytics continuity.
- **§3.5 / §10, thumbnails (seen).** All 27 are landscape. Needs replacing before anyone sees the grid: Directors Reel (grey windmill frame), The Bully Solution (gory SD frame with baked letterbox), Glimpse (SD, near-black, baked letterbox). Title cards baked in, archive only: Twenty8s, Digital Days. A Very BC Production was uploaded twice. The set is mostly cool and neutral in palette; exposure runs from near-black night to bright daylight, which is the reason the grid needs a uniform frame rule (01 §6). New question 27 covers replacement frames.
- **§12.** The in-place-player requirement is restated as "one tap to play without losing the page," with the four seen mechanisms named, because one of his five picks for it (Levin) is in fact a fast page change. The leanings line now carries the dark/light correction.
- **§14.** Questions 26 (X/Twitter link), 27 (replacement frames), and 28 (features in development from his essays) added.
- **No change** to the brief-readiness answers, the mandatory list, the refusals, the placement he assigned, the fact conflicts, or the Phase 1 done-criteria.
