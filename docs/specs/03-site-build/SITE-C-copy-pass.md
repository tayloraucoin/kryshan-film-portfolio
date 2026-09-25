# SITE-C — The copy pass: 27 loglines, stories, awards, verified press and credits, and every Write string, cut from his words and approved by him

**Epic:** SITE — Kryshan Randel's live site · **Step 3 (His words)** · Size: L
**Slice type:** a content pass with no code. Cantor writes, with Vitrine. The output is data in `content/*.ts` and one approval document. The failure class is a false or unapproved sentence in public:
- an invented fact
- a quote no one checked
- a banned word
- a private detail (the Wolf, Ashley Judd, a VANDU or RFFC participant)
- a string he never saw

**Status:** In progress · Stage A drafted and landed 2026-09-24, round 2 (Taylor's walkthrough) landed 2026-09-25; Stage B drafted except press. Vitrine signed the in-place check 2026-09-25. Waiting on Taylor's send, his approval, and the ~24 press articles. (authored 2026-09-24)

> **⚠ CONTENT FLAGS: what is provisional in the output, not just the process.**
> - **Press:** only quotes read in their source ship. The rest are dropped, not softened. The ~24 articles are `[PENDING — Taylor supplies]`.
> - **Leo** (O-SITE-4): "Leo-nominated as an editor", no title, until answered. Blocks launch.
> - **VFS** (O-SITE-5): removed everywhere until answered. Blocks launch.
> - **Q12:** the names lines and the credits list ship on the defaults (03 §8 names with roles; his EPK CV). Aubrey Plaza is omitted until her role is confirmed (ruling 6).
> - **Q13:** the Wolf is shown.
> - **Q18:** The Bully Solution lists festivals only.
> - **Q19:** Glimpse "screened on the Sundance Channel" alone.
> - **Q21:** no career-start year.
> - **Frames wording and camp facts** (O-SITE-14): absent until he and Frog Hollow confirm.
> - **Every string** is his to approve. Until the approval document records his OK, a string is a draft, however final it looks on the preview.
>
> **Vitrine review:** Vitrine checks each string in place on the preview at 1440 and 390 for wraps, truncation on tiles and one red phrase per page, and signs the approval document's header before it is sent.

---

## Outcome

Every word on the site that isn't structural is his, cut to fit, and approved by him on the record:
- 27 loglines, each short enough to be a search description
- stories that keep the odd detail and lose the CV habits
- awards stated exactly, nominated or won
- press quotes checked word for word against the article they came from, each dated
- a credits list that traces line by line to his CV or IMDb
- every Write string the spec left open, written in his register

A producer reads nothing false, nothing inflated, nothing private and no word from the refuse-list. He reads a document listing every string, marks each one OK or changes it, and his reply is the approval. After that, a rewrite is a change round, not part of this pass. The pass touches no layout, component, route or type. If a string doesn't fit its slot, the owning page ticket changes, not this one. Testimonials are the speakers' own words (spec §11), and photos are his to send (SITE-6, SITE-7).

## Why / intent

- **Spec §2, copy scope (Drummer):** "SITE-C is **one cutting pass** from his own intake words, plus the few **Write** strings in §6. Rewrites after he has approved a string count as a change round."
  - The first-look milestone needs loglines, short awards and every Locked and Write string.
  - Stories, full awards, verified press and the credits list may follow; their sections collapse cleanly (D-SITE-20).
- **Spec §6** holds the text tables, each string with a status and a limit. **§6.3's per-film notes are binding.** **§7** is the voice law: five rules, pillars as copy, the words lists, mechanics, and the corrections in §7.5. **§4.4** is the vocabulary. **§11** covers rights and privacy.
- **Spec §7.7** is the copy inventory, the checklist this pass completes. **Appendix B** lists the sources. One correction: the Glimpse anecdote is in `docs/client/writing/4605f881-2ba8-4a52-bb6f-1f5ab3dcc3ae.rtf` (the paragraph beginning "I work very collaboratively…"). The intake files that essay as the Berlinale Talents 2017 application; the spec calls it the TIFF Talent Lab 2017 essay. The file is the source.
- **03 §9 and Cantor's role prompt:** his words first; edit down, never rewrite up; one award, two festivals; no table-stakes adjectives; every number traces to 02 §8 or waits.
- **02 §13:** twelve facts that disagree with themselves. §7.4 rules: "When sources disagree, say less."
- **What this slice is NOT (binding):**
  - No layout, component, route, type or field change.
  - It never edits a testimonial.
  - No Locked string changes, except through a Proposed item he answered.
  - No new page sections.
  - No copy about the events life beyond his interests sentence.
  - Nothing from the 2017 essays' features in development (Q28: off).
- **Ground truth:**
  - SITE-2's `Project` fields (`logline`, `story`, `awards`, `awardsFull`, `press` with `verifiedOn`, `articles`)
  - SITE-4's `content/credits.ts`
  - SITE-6's `content/about.ts`
  - SITE-7's `content/teaching.ts`
  - the files SITE-3, SITE-4, SITE-5 and SITE-8 hold their Write strings in (their closing notes name them)

  Fill fields that exist; never add one.

**Rulings this slice makes (labelled, logged):**

1. **Two stages, one document, at most two sends.**
   - **Stage A** is everything the first look shows. It is sent with the first-look link, so he approves words in context.
   - **Stage B** is stories, `awardsFull`, press, articles and credits. It is appended to the same document and sent when complete.
   - Both must be approved before this ticket closes.
   - Logged.
2. **The approval record is `docs/client/kryshan-09-copy-for-approval.md`**, in the shape below. His reply (email or WhatsApp) is the approval. Its date and medium go in the header, with where the reply is kept. One home for approval state: content files carry no approval flags. Logged.
3. **The articles live in `docs/client/press/`** as working sources, one file per article: the saved page or PDF, or a `.md` holding the URL and the quoted passage. They are named `<outlet>-<yyyy>-<kebab-title>.<ext>`. `[PENDING — Taylor supplies]`. Stage B's press can't start without them. Logged.
4. **Press verification rule.** A quote enters `press` only when Cantor has:
   - read it in its source (an article, or a festival programmer's note that has a URL)
   - confirmed the exact wording, the outlet's own styling, and that it is about this film
   - cut it to ≤15 words with "…" where cut, never altering a word or its punctuation ("Just wrong!" keeps its "!")
   - set `verifiedOn` to the ISO date of that reading

   A quote that can't be found is not in the file. It appears in the ledger as dropped, with the reason. `url` is the live article, or an archive.org capture when the live page is gone.

   Mentions that aren't quotes ("Midnight Mania Honorable Mention", Panic Manual; "Midnight Mania Highlight", Examiner.com) are not press and not awards: dropped. `[PROVISIONAL — Cantor]`. Logged.
5. **Loglines are written for all 27 films, held ones included** (Appendix A: Shotlister, VANDU, and Glimpse, The Bully Solution and Directors Reel while held). Unholding a film is then a one-field edit. Held rows are marked "held: not shown yet" in the document. Logged.
6. **Aubrey Plaza is omitted from both names lines until Q12 says whether he directed her or shot her.** His bio says directed; his CV lists her under behind-the-scenes interviews. O-SITE-6's default ("names per 03 §8 with roles") can't state a role the sources dispute, and §7.4 says say less. The cost is one fewer name. `[PROVISIONAL — Cantor; Q12 reopens]`. Logged.
7. **His edits are applied verbatim, with one exception.** An edit that breaks the voice law or a binding decision gets one reply:
   - Cantor names the rule (e.g. §7.3 "award-winning", §4.4 "for hire") and drafts a compliant alternative in the document.
   - If he keeps his wording, Taylor rules.
   - A kept edit that changes a D-SITE ruling or §4.4 gets a DEVIATIONS line before it lands.
   - An edit that adds a fact needs its source before it lands.

   Logged.
8. **Unresolved conflicts from 02 §13 are cut, not chosen.** The string drops the disputed fact; the facts ledger records which string, which conflict, and "said less". This is not a ruling but spec §7.4 restated. It is listed so no one picks a side.

## Experience & states (the workflow: no surface)

**Inputs:**

| Input | Where | Status |
|---|---|---|
| The text tables, per-film notes and voice law | Spec §4.4, §6.1–§6.7, §7, §11; 02 §8, §13, §14; 03 §5–§9 | On disk |
| His raw words | `docs/client/_direction/full-intake.md`: "The work" (Story, Watch, Awards per film), "Everything you already have" and "Your words" (bio), "Experience and proof" (EPK CV, awards, press, notable names), "About you" (credentials) | On disk |
| His essays | `docs/client/writing/*.rtf`. Read with `textutil -convert txt -stdout <file>`. | On disk |
| His review words | `docs/client/_direction/review-stage-feedback.md` | On disk |
| The ~24 press articles | `docs/client/press/` (ruling 3) | `[PENDING — Taylor supplies]` |
| His answers to the one message (O-SITE-1 to 8, 14, 16) | Taylor forwards them. Anything unanswered by the reply-by date takes the §13 default. | `[PENDING — Kryshan]` |
| Field names and files | Closing notes of SITE-2, SITE-3, SITE-4, SITE-5, SITE-6, SITE-7 and SITE-8 | Per ticket |

The intake header holds his phone number and email. Never copy either into anything.

**The pass, in order:**

1. **Inventory.** Create the approval document with one row per string in the inventory below, before writing any copy. Every row is `Draft`.
2. **Cut and write (Stage A).**
   - His words are cut to their limits using his sentences; Write strings are drafted to their bullets.
   - One recommended version per string, no alternates. The spec's own forks (About H1 A or B; the Contact H1 flag; the Proposed captions) were already put to him in the one message, so apply his answer or the default.
   - Run §3.4's convergence tests on every string. The refuse-list scan is mechanical (acceptance 3).
3. **Verify.**
   - Every fact traces to 02 §8, his CV, his intake or an answer. The facts ledger records each 02 §13 conflict and how it was handled.
   - Stage B builds the press ledger and the credits ledger.
4. **Land.**
   - Type each string into the field its owning ticket created, exactly as in the document.
   - Counts are never typed. Where a string needs a number, use the owning component's `{n}` token or leave the number out.
   - Run `yarn verify` and walk the preview.
5. **Send.** Vitrine signs the header. Taylor sends the document (Stage A with the first-look link), marks rows `Sent` and dates the header.
6. **Apply his reply.**
   - His edits land verbatim, subject to ruling 7.
   - Each row becomes `Approved`, `Approved with his edit` (his wording shown), `Default applied` (a Waiting item he left unanswered) or `Held` (the fact isn't resolved; the string is absent and its section collapses).
   - Land the changes and run `yarn verify` again.
7. **Stage B.** Repeat steps 2 to 6 for stories, `awardsFull`, press, articles and credits once the articles are in.
8. **Close.** The header reads "Approved in full" with dates for both sends.

**Row states (exhaustive):**
- `Draft`
- `Sent`
- `Approved`
- `Approved with his edit`
- `Default applied`
- `Held`
- `Changed after approval`: a change round, recorded under "Change rounds" with the date, the row, who asked, and whether it was a defect or a change

**The one-pass rule:**
- Before his approval, his edits are part of this pass.
- Once his reply approves a string, any rewrite is a **change round**. It is recorded in the document and handled under the offer's change-round terms (Taylor's call); SITE-C doesn't absorb it.
- **Defects are fixed free and aren't change rounds:** a misspelling, a false fact, a refuse-list word, a privacy breach, or a contradiction with a D-SITE ruling.

**The inventory** (every row in the approval document; the limits are the spec's):

| ID | String | Status (spec) | Limit and rule | Lands in |
|---|---|---|---|---|
| H-1 | Home meta description | Write, default given | ≤155 chars. The default is spec §6.1's line (146 chars) | SITE-3's home content |
| H-2, H-3 | Directing and Camera captions | Proposed (O-SITE-16) | His answer or the §6.1 amended line. The Leo title only per O-SITE-4 | `content/home.ts` or `site.ts` per SITE-3 |
| H-4 | Teaching strand | Locked with fallback | The VFS form only if O-SITE-5 says yes | as H-2 |
| W-1 | "What I can't show you" | His words (cut) | ≤55 words. Each name with his role and the production; **Mary Steenburgen**; Plaza per ruling 6; one dry turn at most | SITE-4's file |
| W-2 | Behind the scenes H2 | Write | 2–4 words, literal, not "EPK" | SITE-4 |
| W-3 | Credits context line | Write | ≤20 words: capacity (behind-the-scenes and EPK camera, IATSE 669) and the count as `{n}` from `credits.ts`; no adjectives | SITE-4 |
| W-4 | Work hand-off sentence | Write | ≤12 words, plain, for the camera hire | SITE-4 |
| W-5 | Work meta description | Write | ≤155 chars; the three roles and the kinds of work | SITE-4 |
| D-{slug}-L ×27 | Logline | His words (cut) | ≤25 words **and** ≤155 chars; premise or purpose; present tense; no "PSA —", "Short film:" or "The film:" prefix; unique (it is the meta description) | `content/projects.ts` |
| D-{slug}-S | Story | His words (cut) | ≤90 words, 1–3 paragraphs; setup plain, odd detail last; credit inside the verb; per-film notes; absent for Just Up The Block and Tradeswoman Exhibit | `projects.ts` (Stage B) |
| D-{slug}-A | Short awards | His words (data) | One award, two festivals; award, then festival, then the judge if the judge is the point | `projects.ts` |
| D-{slug}-AF | `awardsFull` | His words (data) | One per line; "nominated" or "won" exactly | `projects.ts` (Stage B) |
| D-{slug}-P | Press | His words (data) | Ruling 4 | `projects.ts` (Stage B) |
| D-{slug}-R | Articles | Data | `{ outlet; title; url }`; the URL resolves, or is an archive capture | `projects.ts` (Stage B) |
| D-0 | Detail hand-off sentence | Write | ≤12 words; one line for all films | SITE-5's file |
| A-1 | About H1 | Waiting (O-SITE-3) | His pick, or default A verbatim | `content/about.ts` |
| A-2 | Bio | His words (cut) | ≤200 words, ≤3 paragraphs, the first ≤60. Paragraph 1: what he does plus one checkable credit. Paragraph 2 holds the interests line verbatim ("host large-scale immersive events"). No awards, no festival lists. Galvanizing shown through the contests "where I met many of my favourite collaborators". Not yet: "since 1999", the Crazy8s count, VFS. "One-person crew". | `about.ts` |
| A-3 | Glimpse paragraph | His words (cut) | ≤70 words; names Justine Warrington; ends on the script rising to her performance; source file above | `about.ts` |
| A-4 | Awards lines | His words (data) | 4–6 lines: award, film, festival; Leo per O-SITE-4; Bully per Q18 | `about.ts` |
| A-5 | Names line | His words (cut) | ≤45 words; each name with his role and the production; **Mary Steenburgen**; Plaza per ruling 6; the dry turn "…I'm not allowed to show you" is this page's one joke; no "more than sixty" (§7.5) | `about.ts` |
| A-6 | Clients | His words (data) | Studios and networks first; no Legendary Pictures; names in type | `about.ts` |
| A-7 | About press (≤4) | From D-P's verified set | Range: the wicked and the slick; fewer rather than a weaker one | `about.ts` (Stage B) |
| A-8 | Captions and alt text | Write | Captions ≤12 words: production and what he's doing; adults named only with their OK. Alt per §7.6. Only for photos SITE-6 shipped. | `about.ts` |
| A-9 | Credentials line | His words (data) | IATSE 669 (EPK) · Capilano College · American Academy of Dramatic Arts · Motion Picture Orientation, WHMIS, ActSafe; no conflicting dates | `about.ts` |
| A-10 | About hand-off | Write, default given | Default: "If it's hard to look away from, email me." If A-5 keeps its dry turn, this ends plain (one dry turn per page). | `about.ts` |
| A-11 | About meta description | Write | ≤155 chars | `about.ts` |
| T-1 | Teaching H1 (and red phrase, or none) | Write, provisional default | Galvanizing register: what students **do**, with a standard; replaces SITE-7's default only if it improves on it | `content/teaching.ts` |
| T-2 | Teaching opener | Write | ≤40 words: directing, camera and editing; where; for whom | `teaching.ts` |
| T-3 | Block bodies | His words (cut) | Places as they spell themselves (Whatì, Frog Hollow Neighbourhood House); "Founded"; Frames only in the confirmed wording, never "at-risk"; VFS per O-SITE-5 | `teaching.ts` |
| T-4 | Camp facts line | Write | One line: ages, length, what participants leave with, vulnerable-sector check; only once O-SITE-14 is answered, otherwise `Held` | `teaching.ts` |
| T-5 | Coaching body | Write | ≤50 words; starts "Tell me what you're making and where it's stuck."; no price | `teaching.ts` |
| T-6 | Captions and alt text | Write | ≤12 words: program and year; no students' names; alt per §7.6 | `teaching.ts` |
| T-7 | Teaching meta description | Write | ≤155 chars: directing, camera and editing; camps; coaching | `teaching.ts` |
| C-1 | Contact teaching line | Write | ≤12 words, plain, no "also" | SITE-8's file |
| C-2 | Contact H1 | Locked, flagged (O-SITE-16) | His answer or the Locked line | SITE-8 |
| CR | `credits.ts` entries | His words (data) | Title (Year) · format · network; titles as released; `released: true` only when confirmed; unknowns `false`; no cast | `content/credits.ts` (Stage B) |

**Per-film notes (spec §6.3, binding; each is also a numbered check in acceptance 7):**
- **Just Watch Us:** the outcome is DGC BC's campaign. Use "More BC directors have been hired on American shows shot here since." (03 §8), not a causal claim for him.
- **Jack:** cut "world's number one", "genre legend" and "numerous". "Best Death" stays.
- **Artless:** "Pan's Labyrinth" takes its apostrophe.
- **Glimpse:** one distribution line once Q19 is answered; until then, "screened on the Sundance Channel" alone.
- **The Bully Solution:** "Power tools…" stays last.
- **Contact Club:** the only place "$25" appears, in its story. The logline doesn't carry it.
- **The Wolf of West Georgia Street:** keep the premise and the craft; cut the wife's access to his journals and profiles.
- **A Dog's Way Home EPK:** never mention Ashley Judd's pre-shoot conversation.
- **VANDU, RFFC:**
  - Name the organisation and its staff collaborators only.
  - Never name or describe an on-screen participant.
  - No "gritty", "raw" or "eye-opening".
  - For RFFC, cut "premiere".
- **Twenty8s:** cut "most successful".
- **Just Up The Block, Tradeswoman Exhibit:** no story.
- **Also from the intake:**
  - "tribute" goes wherever he used it (Born To Be, United8s, RFFC).
  - "helmed" goes from the Directors Reel.
  - "nearly thirty years" goes (02 §13 #3).
  - "most successful alumni" goes from It's A Crazier Life.
  - Crazy8s counts go (02 §13 #4).

**The approval document's shape** (`docs/client/kryshan-09-copy-for-approval.md`):

```markdown
# Kryshan Randel — Your site's words, for your OK

**Status:** Draft · Stage A sent YYYY-MM-DD · Stage B sent YYYY-MM-DD · Approved in full YYYY-MM-DD
**Approval record:** Kryshan Randel · YYYY-MM-DD · <email reply | WhatsApp> of YYYY-MM-DD · kept at <where>
**Checked in place by:** Vitrine · YYYY-MM-DD (1440 and 390)
**Answers used:** O-SITE-3 → A (default, unanswered by YYYY-MM-DD) · O-SITE-4 → … · (one entry per question)

## How to use this
Every sentence on the site that isn't a button or a label is below, in page order.
Mark each one OK, or write the change beside it. Your reply is your approval.
Once you've approved a line, changing it later is a change round.

## Home
### H-1 · Home: search description
- **Where it shows:** under your name in search results
- **Kind:** Write · limit ≤155 characters · this one: 146
- **Text:** Director, camera operator and editor in Vancouver. Dark comedies that won at Bloodshots, PSAs for the Directors Guild of Canada, IATSE 669 camera.
- **From:** spec §6.1 default
- **What changed from your words:** —
- **Your call:** [ ] OK · Change to: ______
- **Result:** Draft

## Work … ## Films (one heading per film, in `workOrder()`; held films marked "held: not shown yet") … ## About … ## Teaching … ## Contact

## Stage B — stories, full awards, press, credits

## Ledgers
### Press ledger
| # | Film | Quote as you supplied it | Quote as published (≤15 words) | Source, as styled | URL | verifiedOn | Result (verified · corrected: what · dropped: why) |
### Credits ledger
| Title | Year | Format | Network | released | Source (EPK CV · IMDb · his answer) | Note |
### Facts ledger (02 §13)
| # | Conflict | Resolution (his answer · said less) | Rows it touched |
### Change rounds
| Date | Row | Asked by | Defect or change round | Note |
```

**Failure / edge states (named):**
- **A quote isn't in its article, or the article can't be found:** dropped; a ledger row says why. It is never paraphrased into a quote.
- **The quote's wording differs from what he supplied:** the article's wording ships; the ledger shows "corrected".
- **A limit can't be met without inventing:** cut further. For an optional field, leave it absent and let the section collapse. Never pad.
- **A fact is disputed (02 §13) and unanswered:** say less (ruling 8).
- **His edit breaks the law:** ruling 7.
- **His edit adds a fact:** hold the row until its source is given.
- **He doesn't answer a Waiting question by the reply-by date:** `Default applied`, with the default named in the row.
- **He doesn't approve at all:** SITE-C stays open and SITE-10 can't close. Taylor chases; nothing launches on unapproved words.
- **A string doesn't fit its slot at 390** (a wrap that breaks a tile or an H1): Vitrine flags it. The fix is a shorter string, never a layout edit here.
- **A field the string needs doesn't exist:** STOP and route it to the owning ticket, or to Mason for SITE-2's shape. Never add a field.
- **A private detail surfaces in his edit** (the Wolf's family, Judd, a participant, the events life): refused with §6.3 or §11 cited. Not negotiable (ruling 7 doesn't apply).

## Non-negotiables (this slice)

- **Nothing false.** Every number, date, title, award and credit traces to a named source or waits. Unresolved means said less.
- **No unverified quote in the file.** No `press` entry without `verifiedOn` and a ledger row.
- **Edit down, never up.** His sentences, cut. Write strings only where the spec says Write. No new claims, adjectives or superlatives.
- **Nothing private.** Nothing from the Wolf beyond the premise and the craft, no Judd conversation, no VANDU or RFFC participant, no events life beyond his interests sentence, no phone or address.
- **The refuse-list is mechanical and has no exceptions** except proper nouns, titles as released, and verbatim quotes.
- **Data only.** `content/*.ts` values and the approval document. No component, layout, type, route or field change.
- **Nothing is "final" until his reply is recorded.**

## Data & content

**Database: none (static site, no database).**

**Content files** (values only; fields as their owning tickets created them):
- `content/projects.ts`, all 27 entries: `logline`, `story`, `awards`, `awardsFull`, `press[]` (`quote`, `source`, `url?`, `verifiedOn`), `articles[]`
- `content/credits.ts`: entries and `released`
- `content/about.ts`: opener pick, bio, Glimpse paragraph, names line, awards lines, `CLIENTS`, credentials, captions and alt, hand-off, meta
- `content/teaching.ts`: `h1`, `opener`, block items, `factsLine`, coaching `body`, captions and alt, `metaDescription` (replacing SITE-7's interim strings and their `// SITE-C:` comments)
- `content/home.ts` and `content/site.ts`: H-1 to H-4, and wherever SITE-3, SITE-4, SITE-5 and SITE-8 placed W-1 to W-5, D-0, C-1 and C-2

**Placement** (Mason's call, build order scope sheet: "Output is data only"):
- `docs/client/kryshan-09-copy-for-approval.md` (new, ruling 2)
- `docs/client/press/` (Taylor's inputs, ruling 3)
- No file under `app/`, `components/`, `brand/`, `lib/` or `review/` changes.

**Validators:** none added. The launch-tier checks (logline ≤155 characters, unique descriptions, approved frames) are SITE-10's. This pass must already satisfy them, and must pass SITE-2's checks (a logline on every showable film, valid ISO dates in `verifiedOn` and `videoPublished`).

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

**None — no surface in this slice.** Copy-side obligations:
- Photo `alt` text follows §7.6: what he's doing and where; adults named only with their OK; never students; never repeats the caption.
- Link text stays the Locked §7.6 strings.
- No string relies on colour or position ("below", "the red one").

## Acceptance criteria (observable — greps run from the repo root on `content/` and on `yarn build:agent`'s HTML in `.next-build/server/app/`; each command's output quoted in the closing note)

1. **The approval document** exists at `docs/client/kryshan-09-copy-for-approval.md` in the shape above.
   - It has one row for every inventory entry, including a logline row for each of the 27 slugs in Appendix A.
   - The header records Vitrine's in-place check, both sends, and "Approved in full" with the date, medium and location of his reply.
   - No row is `Draft` or `Sent`. Every `Default applied` and `Held` row names its question.
2. **Doc and data agree:** every row's approved text equals the value in its content file, character for character. Check by script or by row-by-row comparison; the closing note says which.
3. **Refuse-list scan.** Every hit left in the output is listed in the closing note with its reason (proper noun such as Creative BC or The Great Canadian Commercial Contest, title as released, verbatim quote, factual "premiered"). Anything else fails.
   - `grep -rniwE "passionate|professional|creative|quality|experienced|award-winning|trusted|versatile|dynamic|cinematic|storyteller|storytelling|fun|great|incredible|unique|riveting|tribute|helm|helmed|acclaimed|numerous|famed|legendary|premiere|premier|journey|wedding|weddings|corporate|videography|videographer|packages|rates|affordable|twisted|lazy|gritty|raw|empower|inspire|welcome|explore|discover|commercial" content/`
   - Also the phrases: `grep -rniE "genre legend|world's number one|most successful|content creator|any budget|one-man|eye-opening|for hire|client work|let's work together|get in touch|at-risk|at risk|bring out the best" content/`
   - Exclamation marks: `grep -rnE "[[:alpha:]]!" content/`. The only hits allowed are inside a verbatim press quote and the outlet name "Exclaim!".
4. **Spelling:**
   - Each of these returns 0 over `content/` and `.next-build/server/app/`:
     - `grep -rn "Steenbergen"`
     - `grep -rnE "Whati([^ì]|$)"`
     - `grep -rn "Pans Labyrinth"`
     - `grep -rniE "5 ?Ry?thms"` (only "5Rhythms" allowed)
     - `grep -rn "Neighborhood"`
     - `grep -rnE "Aint It Cool|imagineNative|Crazy8.s|Kick Start|Randal"`
   - Over `content/` only, because CSS in the build output legitimately says "color": `grep -rnwE "color|colors|favorite|center|theater|programme" content/` returns 0 hits inside string values.
   - `grep -rn "Steenburgen" content/` returns ≥1, in each names line that names her.
   - `grep -rn "B\.C\." content/` hits only the title "A Very B.C. Production".
5. **"$25" and "for hire":**
   - `grep -rn '\$25' content/` returns exactly one line, inside `contact-club`'s `story`.
   - `grep -rl '\$25' .next-build/server/app --include=*.html` lists only `work/contact-club.html`.
   - `grep -rli "for hire" content/ .next-build/server/app --include=*.html --include=*.ts` returns nothing.
   - "any budget" and "affordable" return nothing.
6. **Loglines:**
   - All 27 `PROJECTS` entries have a `logline` of ≤155 characters and ≤25 words. The closing note reports the longest (characters and words).
   - No two loglines are identical.
   - None starts with a kind prefix (`grep -nE 'logline: "(PSA|Short film|The film|Music video|EPK|Teaser|Trailer|Promo)' content/projects.ts` returns nothing).
   - All are in the present tense (reviewed).
   - Every showable film's page `<meta name="description">` equals its logline.
7. **Per-film notes, each checked:**
   - (a) `just-watch-us` contains "More BC directors have been hired on American shows shot here since." verbatim.
   - (b) `jack` contains none of "world's number one", "genre legend" or "numerous", and its `awards` contains "Best Death".
   - (c) `artless` contains "Pan's Labyrinth".
   - (d) `glimpse` contains "Sundance Channel". It contains no "Corus", "Movieola" or "Ouat" unless Q19 is answered, and then exactly one of them.
   - (e) `the-bully-solution`'s logline ends "Power tools…". Its awards are festivals only unless Q18 is answered.
   - (f) `the-wolf-of-west-georgia-street` contains none of "journal", "Facebook", "profile" or "wife".
   - (g) `a-dogs-way-home-epk` contains none of "metoo", "#MeToo" or "before the shoot", and no reference to Ashley Judd's conversation.
   - (h) `vandu` and `rffc-were-in-this-together` name no participant and contain none of "gritty", "raw", "eye-opening" or "premiere".
   - (i) `twenty8s` contains no "most successful".
   - (j) `just-up-the-block` and `tradeswoman-exhibit` have no `story`.
   - (k) Every `story` is ≤90 words and ≤3 paragraphs.
8. **Awards:**
   - Every short `awards` list holds at most one award and two festivals.
   - Every "nominated" or "won" matches the source (the facts ledger cites it).
   - `grep -rn "Leo" content/` shows only "Leo-nominated as an editor", unless O-SITE-4 is answered and the answer is quoted in the header.
   - No VFS mention anywhere unless O-SITE-5 says yes (`grep -rniE "Vancouver Film School|\bVFS\b" content/ .next-build/server/app`).
9. **Press:**
   - The count of `verifiedOn:` in `content/` equals the number of `press` entries, and equals the ledger's "verified" plus "corrected" rows.
   - Every `verifiedOn` is a valid ISO date on or before the closing date.
   - Every quote is ≤15 words.
   - Every source is styled as the outlet styles itself (Ain't It Cool News, Exclaim!, Rue Morgue).
   - No quote in `content/` is missing from the ledger.
10. **Articles:** every `articles[].url` returned 2xx on `curl -sIL -o /dev/null -w "%{http_code}"` on its verification date, or is an archive.org capture; the ledger records which.
11. **Credits:**
    - Every `credits.ts` entry has a credits-ledger row citing the EPK CV, IMDb or his Q12 answer.
    - `released: true` appears only on titles the ledger shows as released.
    - No entry carries cast.
    - `grep -rniE "sixty|over 40|forty" content/` returns nothing; counts render from data.
12. **Word limits for every Write and cut string**, checked by count and reported in the document's "this one" field:
    - H-1, W-5, A-11 and T-7 ≤155 characters
    - W-1 ≤55 words; A-5 ≤45 words
    - W-2 2–4 words; W-3 ≤20 words
    - W-4, D-0 and C-1 ≤12 words
    - A-2 ≤200 words, ≤3 paragraphs, the first ≤60
    - A-3 ≤70 words
    - T-2 ≤40 words; T-5 ≤50 words, beginning "Tell me what you're making and where it's stuck."
    - every caption ≤12 words
13. **Descriptions are unique:** the `<meta name="description">` values of `/`, `/work`, `/about`, `/teaching`, `/contact` and every `/work/<slug>` in the build output are pairwise distinct.
14. **Privacy:**
    - The build output contains neither his phone number (in both the formats the intake header uses) nor any street address.
    - `grep -rniwE "party|parties|rave|DJ|nightlife|burning" content/` hits only About's verbatim interests sentence.
    - Participants in VANDU and RFFC are unnamed (7h).
15. **Voice, reviewed per page and recorded in the document:**
    - at most one dry closing turn per page, named
    - at most one participle opener per page
    - no serial comma outside the roles line
    - Canadian spelling
    - "one-person crew" wherever crew size is stated
    - roles exactly as `roleLabel` wherever a credit is stated
16. **Data only:** `git diff --stat` from this ticket's first commit shows changes only under `content/`, `docs/client/kryshan-09-copy-for-approval.md`, `docs/client/press/` and the records (`docs/specs/…`). Nothing under `app/`, `components/`, `brand/`, `lib/` or `review/`.
17. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 via `yarn dev:agent` (never `yarn dev`/`yarn build`) on `/`, `/work`, three detail pages (the longest logline, the longest story, one link-out), `/about`, `/teaching` and `/contact`: no string wraps a tile title or H1 badly, and the panel shows the logline and short awards. A closing note is appended to this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- Counts can come from a throwaway script outside the repo (scratchpad; no test suite, nothing committed), run with `yarn dlx tsx <file>` importing `@/content/projects` and friends. tsx honours `tsconfig` paths. Generate the "this one" counts rather than typing them.
- Words are counted as whitespace-separated tokens; characters as `[...s].length` (code points), so "ì" and "…" count once.
- The ellipsis in quotes is the single character "…". Ranges take an en dash (2010–2022). Keep one apostrophe style across `content/`, matching what's on disk.
- archive.org: `https://web.archive.org/web/*/<url>` finds captures. Cite the dated capture URL, not the wildcard.
- The intake's Watch notes already are loglines in his voice. Most need only the prefix removed and a trim. SITE-2 filled them mechanically, so start from `content/projects.ts`, not the intake.
- Cantor's human-hand extension (`docs/roles/marketing-growth/Cantor_ext_human-hand-mode.md`, §1–§3 and §5) is a useful scan for the Write strings. Its §0 and §4 aren't filled for this client; ignore them.

## Dev's call

- Order of work within a stage.
- The document's per-page grouping below the fixed header and ledgers.
- Whether counts are scripted or hand-counted, as long as the numbers are right and the closing note says which.
- Which verified quotes go on About (within A-7's rule).
- Which of the articles become `articles[]` entries, as long as each is about that film.

## Out of scope

- **Testimonials:** their words, cleared by written consent and entered by Taylor as they arrive (spec §11). SITE-C never edits one.
- **Photos, their clearance and crops:** he sends them; SITE-6 and SITE-7 hold them; Vitrine crops.
- **Any layout, component or field change**, including a slot too short for an approved string: the owning ticket (SITE-3 to SITE-8), or Mason for SITE-2's types.
- **The one message and its answers:** Taylor, before SITE-1 (build order).
- **Locked strings** (nav, microcopy §7.6, Home H1, 404): only through a Proposed item he answered.
- **Launch-tier validators, `docs/EDITING.md`:** SITE-10.
- **The style guide's copy sections** (§7.2–§7.4 exported): SITE-9.
- **An articles or press block on Teaching or About beyond A-7** (e.g. the Vancouver Courier piece on Frames): not in the spec; v1.1 if wanted.
- **Features in development (Q28), the events life (02 §9), the social card's text (O-SITE-11):** off, or not this ticket.

## Depends on

- **SITE-2** — Complete in `PROGRESS.md` to **start**: the `Project` fields, `verifiedOn`, and `content/projects.ts` with mechanical loglines.
- **SITE-4, SITE-6, SITE-7, SITE-8** (and SITE-3 and SITE-5 for H-1 to H-4 and D-0) — Complete in `PROGRESS.md` before the **landing step** of the strings that go into their files, and before this ticket **closes**. Drafting and the approval document can run ahead of them. This is stricter than the build order's dependency table, which lists SITE-2 only; the files don't exist until those tickets land.
- **Inputs, not tickets:** the ~24 articles `[PENDING — Taylor supplies]` (Stage B press); his answers to the one message `[PENDING — Kryshan]` (defaults otherwise).

## Recommended Claude Code execution

**Opus 5.5**, with the Cantor role prompt injected and Vitrine's for the in-place check. The value of this ticket is restraint and verification, not fluency. Choosing down (Sonnet 5), the likely failures are:
- It writes up instead of cutting down (adjectives appear, "award-winning" returns).
- It fills a limit with a plausible fact.
- It "tidies" a press quote to the style rules (drops the "!" from "Just wrong!", swaps an ellipsis).
- It trusts his supplied wording without opening the article.

Each of those is a false sentence on a page he's approving under his own name.

**Split permitted:** one session for Stage A (through step 6), a second for Stage B after the articles arrive. The approval document's row states are the handoff; no separate handoff file.

---

### Claude Code kickoff (paste into the session)

> Execute **SITE-C — The copy pass** (`docs/specs/03-site-build/SITE-C-copy-pass.md`). Model: **Opus 5.5**. You are **Cantor**, with Vitrine checking in place. **Cut his words down, never write them up; nothing false, nothing private, no quote unread; nothing is final until his reply is recorded.** State the stage (A or B) in your first message.
>
> Read first, in order:
> 1. this ticket
> 2. `docs/roles/marketing-growth/Cantor_copywriter-role-prompt.md`
> 3. `docs/roles/product-design/Vitrine_web-designer-role-prompt.md`
> 4. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §2 (copy scope, milestones), §4.4, §6.1–§6.7 (every text table and the per-film notes), §7, §11, §13, Appendix A and B
> 5. `docs/client/kryshan-02-success-criteria.md` §8, §13, §14
> 6. `docs/client/kryshan-03-copy-and-voice.md` §5–§9
> 7. `docs/client/_direction/full-intake.md` (The work; Everything you already have; Experience and proof; Your words). Copy nothing from its header.
> 8. `docs/client/writing/*.rtf`
> 9. `docs/client/_direction/review-stage-feedback.md`
> 10. his answers to the one message (from Taylor)
> 11. `docs/client/press/`
> 12. the closing notes of SITE-2 to SITE-8 (field names and files)
> 13. `AGENTS.md`, `docs/CONVENTIONS.md` §9 and §10a
> 14. `docs/specs/DEVIATIONS.md`
> 15. `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Values in `content/*.ts` and the approval document only. No component, layout, type, route or field change; if a string needs one, STOP and route it.
> - Routes from `lib/routes.ts`, env via `lib/env.ts` and no hex outside `brand/` still bind anything you touch.
> - Never run `yarn dev` or `yarn build`; use `yarn dev:agent` / `yarn build:agent`.
>
> Run every grep in the acceptance criteria and quote its output.
>
> Close in three places: this ticket's Status, `docs/specs/PROGRESS.md`, `DEVIATIONS.md` (and `TECHNICAL-DECISIONS.md` if a choice had real alternatives). Then tick `03-site-build/00-build-order.md`. Report what `yarn verify` printed.

---

### Progress note — Stage A (2026-09-24, Mason in the Cantor seat; not a closing note)

**State:** every Stage A string is written or cut and landed in its content file, and `docs/client/kryshan-09-copy-for-approval.md` holds all 92 rows as `Draft` (plus `Held`: A-7, T-4, T-6). Stage B stories, `awardsFull` and `articles` are drafted and landed too; press is `[PENDING — Taylor supplies]`. The ticket stays open until he approves both stages (acceptance 1).

**Answers used:** none arrived, so every one-message question takes its §13 default (the document's header lists each).

**How the document and data agree (acceptance 2):** the document is generated by a throwaway script (scratchpad, not committed) that reads the landed values. Projects, Work, detail, Contact and Home strings come through `tsx` imports; About and Teaching are regex-read, because `about.ts` imports JPEGs. So every row's text and its "this one" count is the data's own.

**Greps (acceptance 3 to 14), run on `content/` and a complete `yarn build:agent`:**

- **3, refuse-list words.** The hits, all allowed:
  - proper nouns: The Great Canadian Commercial Contest (bio), Creative BC (×3), SFU Creative Studios, Pulling Together Canoe Journey, A Dog's Journey (credit title)
  - "Legendary Pictures", in a code comment
  - the factual "sold-out premiere" in Glimpse's story
  - "unique" in a `validate.ts` build-error message (not site copy)
- **3, phrases.** Only "at-risk" in the comments and validator that forbid it.
- **3, exclamation marks.** 0.
- **4, spelling.** Steenbergen, `Whati` not followed by ì, Pans Labyrinth, 5 Rythms, Neighborhood, and Aint It Cool / imagineNative / Crazy8's / Kick Start / Randal: 0 in `content/` and in `.next-build/server/app`.
- **4, US spellings in `content/`.** 0.
- **4, Steenburgen.** 2, one in each names line (W-1, A-5).
- **4, B.C.** Only the title "A Very B.C. Production".
- **5, $25.** One line (`contact-club` story). Its only HTML is `work/contact-club.html`.
- **5, "for hire", "any budget", "affordable".** 0.
- **6, loglines.**
  - 27 of 27 within ≤155 characters and ≤25 words. The longest is Contact Club (149 characters, 22 words).
  - 0 duplicates, and the kind-prefix grep is empty.
  - Present tense or a purpose fragment: reviewed.
  - Every `/work/<slug>` description equals its logline.
- **7a–k.** All pass, checked by script. On (c): the grep's straight "Pan's" is on disk as "Pan’s", because `content/` uses curly apostrophes.
- **8, awards.** Every short list has at most one award and two festivals.
  - Leo: only "Leo-nominated as an editor".
  - VFS: 0 in `content/` and in the build. Two code comments were reworded so the grep is literally empty.
- **10, articles.** Four URLs returned 200 on 2026-09-24: PLANK, Roots Music Canada, Tinnitist, The Province.
- **11, number words.** "sixty", "over 40" and "forty": 0.
- **13, descriptions.** 27 `<meta name="description">` values (5 pages plus 22 films), all distinct.
- **14, privacy.**
  - Street, postcode and phone patterns: 0 files in `.next-build/server` and `.next-build/static`, and 0 in the approval document.
  - Events words: only About's interests sentence.
- **12, limits.** All met; the counts are in the document.
- **15, voice.**
  - One dry turn per page: About's names line, so A-10 ends plain.
  - One participle opener per page. Artless and A Very B.C. Production had two, so "It" / "It was" was added to their stories.
  - No serial comma outside the roles line.
  - "one-person crew" wherever crew size is stated (Digital Days, bio, H-3).

**`yarn verify`:** exit 0 (lint with zero warnings, types, build: 32 static pages).

**Walk (`dev:agent`), at 1440, 768 and 390 on the nine routes checked:**
- The routes were `/`, `/work`, `/about`, `/teaching`, `/contact`, and the detail pages for Contact Club (longest logline), Artless and Jack (longest showable stories) and the Wolf.
- No horizontal overflow on any of them. No H1 text changed in this pass.
- The Jack panel on Home shows the logline and short awards.
- Work at 390 shows W-1, W-2, W-3 ("…on 35 released productions.") and W-4.
- There is no showable link-out film to walk (all three link-out candidates are held).
- Reduced motion: no code changed.

**Left for Stage B / close:** the press ledger from the articles, About's press picks (A-7), his approval of both stages, Vitrine's header check, and then the closing note.

---

### Progress note — Stage A, round 2 (2026-09-25, Cantor with Vitrine; Taylor's walkthrough notes; not a closing note)

**State:** the approval document now has 98 rows, all `Draft` except five `Held` rows:
- A-7 About press
- A-12 the Glimpse heading, which needs a slot
- T-4 camp facts
- T-6.3 the stage photo, waiting on the program's name
- the held films' rows

Vitrine signed "Checked in place" (1440, 768, 390). Every one-message question is still on its §13 default. The ticket stays open until he approves both stages.

**What changed (every edit is a cut or a correction; DEVIATIONS has one line each):**
- **H-2, H-3, H-4:** full stops instead of semicolons. H-4 goes to him as Proposed.
- **Stories:** four are cut where they repeated the logline above them: Dare, TUTS 2025 Season Teaser, RFFC, and It's A Crazier Life ("very").
- **MPPIA:** "MPIAA" is corrected to MPPIA in A-6, A-8.1 (the caption now names A Very B.C. Production) and the film's card (facts ledger #14).
- **A-2:** the bio's serial comma goes; "behind-the-scenes" is hyphenated.
- **About portrait (A-8.3):** the music-video street shoot at 4:5, moved from On set. The Drive "portrait" is the held Ted Danson photo.
- **Teaching photos:** T-6.1 CEDIM 2010 and T-6.2 LaSalle graduates 2025. T-6.3 is held.

**Taylor's notes answered without a copy change (reasons in the thread report):**
- W-1 is kept.
- The credits stay unlinked: the IMDb profile link is the proof. Per-title links need a `credits.ts` field and add 35 exits.
- There is no Work filter menu: 22 films, and it contradicts his "arrange, never hide" note.
- About and Teaching names stay unlinked: §11 "names… as text only"; clients in type until Q2; link rot on defunct festivals; `string[]` fields.
- About's voice is checked against the intake: it holds.
- Teaching's H1 is kept.

**Routed to Mason (layout or component, not this ticket), each with Vitrine's or Vesper's call:**
1. **Footer alignment (defect):** in `components/composed/site/site-footer.tsx`, the email link's `self-start` overrides the row's `md:items-baseline`, so the 16 px address and the 14 px place line sit on different baselines. Fix: `self-start md:self-baseline`.
2. **"All {n} credits" state (defect):** in `app/(site)/work/_components/credits-list.tsx`, the `summary` is `inline-flex`, which removes the native disclosure marker, so nothing shows open or closed. Add an `aria-hidden` chevron that turns on `[open]` (`group-open:`). The Locked text stays as spec §6.2 rules.
3. **Contact address width (Should-fix):** the section's `max-w-[40rem]` forces `hello` / `@kryshanrandel.com` onto two lines at desktop sizes. Let the address run the full measure; keep the `<wbr>` and `overflow-wrap:anywhere` for phones. The H1 and teaching line keep 40rem.
4. **Copy button icon (Should-fix):** a 16 px copy glyph beside "Copy", swapping to a check on "Copied" and `aria-hidden`, with the label kept. Do the same for "Copy link", so one control looks like one thing.
5. **Home place line (Consider):** the roles line and "Vancouver, works anywhere." share one `<p>` in bone. Wrap `SITE.place` in `text-muted-foreground` so it matches the footer. Not red: red 500 is large-only (3.4:1); red 300 is the link colour and would make the place line read as the link beside the footer's mailto; the Home H1 already spends the page's one red phrase.
6. **About A-12 slot:** an h2 "Working with actors" over the Glimpse paragraph. The string is drafted and Held.

**Greps (acceptance 3 to 14), rerun on `content/` and a fresh `build:agent`:**
- **3:** the same allowed hits as Stage A, plus the MPPIA line (Creative BC is a proper noun). Phrases: only the at-risk comments and validator. Exclamation marks: 0.
- **4:**
  - Steenbergen, Whati, Pans Labyrinth, 5 Rythms, Neighborhood, and the styling set: all 0.
  - US spellings: 0.
  - Steenburgen: 2.
  - "B.C.": the title, and the A-8.1 caption quoting the title.
- **5:** "$25" appears once (`contact-club` story), and its only HTML is `work/contact-club.html`. "For hire", "any budget" and "affordable": 0.
- **6:** 27 of 27 within the limits (the longest is Contact Club, 149 characters and 22 words). No duplicates, no prefixes, and every detail page's meta equals its logline.
- **7a–k:** all pass. The longest story is Glimpse (61 words).
- **8:** Leo appears only as "Leo-nominated as an editor". VFS: 0.
- **11:** 0.
- **13:** 27 descriptions, 27 distinct.
- **14:**
  - The intake phone number and personal emails: 0 across 306 build, content and document files.
  - Phone, street and postcode patterns: only a binary woff2 matched.
  - Events words: only the interests sentence.
- **MPIAA:** 0 left.

**`yarn verify`:** exit 0 (lint with zero warnings, check-types, build:agent: 32 static pages).

**Walk:** on :4500 (the running `dev:agent` from this checkout), at 1440, 768 and 390, over `/`, `/work`, `/about`, `/teaching`, `/contact`, and Dare, RFFC, TUTS 2025, It's A Crazier Life, A Very B.C. Production and Contact Club.
- No horizontal overflow anywhere.
- No H1 or tile title text changed.
- The portrait is 443×554 at 1440 (1280 px source). The Teaching photos are 443×295 (840 and 793 px sources).

**Doc and data (acceptance 2):** regenerated by the throwaway script from the landed values, so they agree by construction.

**Addendum (same day):**
- Taylor approved items 5 and 6 of the routed list, and they are built: Home's place line is `muted-foreground`, and About has "Working with actors" (A-12, now Draft and landed).
- Vitrine fixed About's opener at ≥1024: two equal columns, and the 24rem portrait shares Recognition's second-column line and matches the text's height.
- Items 1 to 4 (footer baseline, credits chevron, Contact width, copy icon) remain with Mason.
- Per-title credit links wait on Kryshan's answer (Taylor asked him).
