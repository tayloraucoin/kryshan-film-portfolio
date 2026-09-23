# KR-6 — The feedback questions: rankings, 0.0–7.0 sliders, and the forks that decide the build

**Epic:** KR — Kryshan Randel, Phase 1 review round · **Phase 1** · Size: L
**Slice type:** review-round instrument design, across two repos (this site's form and taylor-aucoin's ingest). Runs before KR-4 (send).

**Status:** Complete (2026-09-22)

---

## Outcome

`/review/feedback` asks Kryshan the handful of structured questions whose answers decide the build spec, not just "which kit, which layout, which demo" and three text boxes. It uses rankings (for example, rank the three kits on typography alone), 0.0–7.0 sliders (the same scale his intake used, so answers can be compared with what he said before he saw anything), and the few either/or forks the layouts left open. Every answer reaches tayloraucoin.com and appears, labelled, in the submission email. The question set is data, so the next client's round reuses the machinery with new questions.

## Why / intent

- Taylor, after walking KR-1..5: "ask him to rank certain things, like typography… spectrum of opinions are helpful too (0.0–7.0)."
- `docs/client/kryshan-06-layouts-overview.md` "What differs enough to be worth asking him" already names the four structural forks (hero or no hero; where the passion/paid split lives; where teaching lives; how much of him is on Home). None of them is asked today.
- `docs/client/kryshan-04-brand-pillars.md` says the real kit choice is **which pillar leads**; the form never asks it.
- `docs/client/kryshan-02-success-criteria.md` §12 records his intake sliders (warm 6/7, bold 6/7, playful 6/7, timeless 3/7, personality 5/7; "who they meet first" 6.0 toward him; "how they get through it" 2.0 toward roam; "the whole story" 5.0; "footage" 5.0). Asking the same sliders after he has seen the designs tells us whether the designs moved him, and the gap is itself a finding.
- The current form (`preferredKit`, `preferredLayout`, `preferredMock`, `flinch`, `fightFor`, `notes`) predates the kit switcher (KR-5): "preferred demo" is now nine combinations.

## Constraints (binding)

- **Short.** Target ten minutes on a phone. Every question must change a decision in the build spec or a 02 §14 open item; if an answer would not change anything, cut the question. Structure answers first, then free text.
- **His register, not a survey's.** Plain words, first person, Canadian spelling, no jargon ("ground", "chrome", "token" never appear). Each question says why it is being asked, in one line, where that helps.
- **Facts are not asked here.** 02 §14's fact questions (email to publish, Leo wording, VFS, award lists) go in Taylor's separate message, not in the design form. The design forks in §14 (Q3 hero, Q7 fifth page, Q8 lane names, Q11 socials) may be asked if the thread decides they belong.
- **Every field optional**, partial answers accepted, progress kept in the browser until sent (the comments already do this; `lib/review/pending-store`).
- **Accessible:** sliders are real range inputs with a visible value to one decimal and labelled ends; rankings work without drag (select 1st/2nd/3rd, keyboard and touch); WCAG 2.2 AA.
- **Backward compatible wire format.** Existing fields stay valid. New answers travel as a versioned, generic structure (for example `answers: { schema: "kryshan-2026-09", ratings, rankings, choices, texts }` keyed by stable question ids), plus a label snapshot so the email and the stored jsonb read without the client site's code. `review_submissions.payload` is jsonb: no migration should be needed; if one is, stop and say why.
- **Both validators agree field for field** (`lib/validators/review.ts` here and in taylor-aucoin), and both copies of `REVIEW-BACKEND-CONTRACT.md` are updated.
- **taylor-aucoin:** its REV-1 review ingest is uncommitted on `feature/review-process`. Edit on that branch alongside it, follow its `AGENTS.md`/`CLAUDE.md`, use its `:agent` scripts (dev 4300, build `build:agent`), record in `docs/review/specs/` (open `REV-2`), and **do not commit there**; report the diff for Taylor.

## Placement

Here: the question set as data in `review/feedback.ts` (per client; the Kryshan questions), the renderer in `app/review/(gated)/feedback/_components/`, the action in `_actions/submit-feedback.ts`, validators in `lib/validators/review.ts`, contract in `docs/REVIEW-BACKEND-CONTRACT.md`. taylor-aucoin: `lib/types/review.ts`, `lib/validators/review.ts`, `server/services/review.ts` (the `notifyOps` summary), `app/api/review/submissions/route.ts`, `docs/review/REVIEW-BACKEND-CONTRACT.md`.

## Acceptance criteria (observable)

1. A question-set document (in the ticket's closing note or `review/feedback.ts` comments) lists each question, its type, its scale ends, and the build decision or source line it serves. Nothing without a source.
2. `/review/feedback` renders the set in sections, works at 390 px, and submits a partially completed form.
3. The kit and layout rankings and the favourite combination use the live registries (no hard-coded names), and the favourite combination offers the nine layout × kit pairs.
4. At least the four overview forks, "which pillar should lead", per-dimension kit rankings (at minimum colour, typography, voice/copy), and the intake sliders re-asked on 0.0–7.0 with his intake values available to Taylor in the email for comparison.
5. A submission with only the old fields still validates on both sides; a submission with answers is stored whole and the email prints every answered question with its label and value.
6. `yarn verify` passes here; taylor-aucoin's lint, types and `build:agent` pass. A local end-to-end send (this site on :4500 → taylor-aucoin on :4300 with a local round) is shown working, or the reason it could not run is stated.
7. Closed in three places here; REV-2 opened and closed in taylor-aucoin's `docs/review/specs/`; one DEVIATIONS line per divergence in each repo; the wire-format choice as a TECHNICAL-DECISIONS entry (`M-KR-n` here, the REV series there).

## Out of scope

The public site; comment changes; any 02 §14 fact question; sending the round (KR-4).

## Depends on

- KR-5 (kit switcher; nine combinations). Complete.

---

### Kickoff (paste into a fresh thread)

```
@"/Users/taylor/Documents/universal-roles-files/engineering/Mason—cto-principle-dev-role-prompt.md" @"/Users/taylor/Documents/universal-roles-files/product-design/Vitrine_web-designer-role-prompt.md"

You are Mason, principal engineer, teaming up with Vitrine, building ONE ticket: KR-6 — the feedback questions (docs/specs/KR-6-feedback-questions.md). Two repos:
- /Users/taylor/lighthouse/clients/kryshan-film-portfolio (the client site and its /review round; KR-1..5 done)
- /Users/taylor/lighthouse/taylor-aucoin (the review ingest; REV-1 is uncommitted on feature/review-process — edit alongside it, do not commit there)
Taylor has authorised changes to taylor-aucoin for this ticket.

VITRINE LEADS THE QUESTIONS, MASON LEADS THE PLUMBING. Design the question set first, as a short document, before any code: each question, its type (rank / 0.0–7.0 slider / either-or / text), its wording in Kryshan's register, the labelled ends of every slider, and the build decision or source line it serves. Cut anything whose answer would not change the build. Target ten minutes on a phone. Then build it.

READ FIRST, in order, before writing anything:
1. kryshan-film-portfolio/AGENTS.md (guardrails; never `yarn dev`/`yarn build`, use `yarn dev:agent` on :4500 and `yarn build:agent`). Then taylor-aucoin/AGENTS.md and CLAUDE.md (its agent ports are 4300/4310).
2. docs/specs/KR-6-feedback-questions.md (this ticket: constraints and acceptance) and docs/specs/README.md (kickoff contract, closure protocol). Then DEVIATIONS.md and TECHNICAL-DECISIONS.md (especially M-CB-5, M-KR-3, and the KR-5 lines).
3. The client material, all under docs/client/:
   - kryshan-02-success-criteria.md — the source of truth. §12 (his intake sliders and lifted features: the baseline to re-ask), §14 (open questions: which are design forks vs facts), §2.2 and §3.1 (what he asked for on Home; the passion/paid split).
   - kryshan-01-taste-read.md — what his picks meant; tensions between what he said and what he chose.
   - kryshan-03-copy-and-voice.md — his register (§2, §9 rules); §8 forks (hero lines, lane names).
   - kryshan-04-brand-pillars.md — the pillars and which one each kit leads with; "the real choice".
   - branding/kryshan-05-tokens.json and kryshan-05-brand-kits.pdf (Kit A/B/C pages) — what differs between the kits: colour, type, voice.
   - kryshan-06-layouts-overview.md ("What differs enough to be worth asking him") and kryshan-06-layout-A.md, -B.md, -C.md (§9 open items in each).
   - prompts/kryshan-07-cc-prompts-readme.md and PRIMER.md — how the round was built.
4. docs/REVIEW-LAYER.md, docs/REVIEW-BACKEND-CONTRACT.md, docs/CONVENTIONS.md, docs/PERFORMANCE.md.
5. What exists: app/review/(gated)/feedback/{page.tsx,_components/feedback-form.tsx,_actions/submit-feedback.ts}, lib/validators/review.ts, lib/review/{backend.ts,pending-store.ts}, review/brand.ts, review/layouts/index.ts (the briefs and BRIEF_QUESTIONS), review/kits/*, review/mocks/index.ts, app/review/(gated)/page.tsx. Walk /review, /review/brand, the three layout briefs and a few /review/mocks/<mock>/<kit> pages on :4500 (REVIEW_GATE=off in .env.local) so the questions refer to what he will actually see.
6. taylor-aucoin: docs/review/{README.md,REVIEW-BACKEND-CONTRACT.md,specs/*}, lib/types/review.ts, lib/validators/review.ts, server/services/review.ts (the notifyOps summary email), app/api/review/submissions/route.ts, db/schema/review-submissions.ts.

STARTING POINTS FOR THE QUESTION SET (Vitrine's; keep, change or cut with a reason):
- The brand: rank the three pillars for which should lead (Wicked / Generous / Resourceful); a 0.0–7.0 "sounds like me" per pillar; the essence line kept / changed / dropped.
- The kits, ranked per dimension, not only overall: colour, typography (the name and the headings), voice (the sample lines), and overall. Kit C's coloured role tags: yes / no (04 calls it the biggest single yes/no).
- The layouts: rank overall; then the four forks from the overview, asked as forks or as sliders with named ends (work first ↔ me first; one grid with labels ↔ two named sections ↔ a list with a column; Teaching page ↔ Credits page; a little of me on Home ↔ a lot of me on Home). What to call the two lanes (03 §8's three pairs, or his own words).
- Favourite combination: one of the nine layout × kit pairs, and a runner-up.
- The intake sliders re-asked on 0.0–7.0 with the same ends (02 §12), so Taylor sees intake vs now.
- Keep the three free-text boxes (what made you flinch; what you'd fight for; anything else), last.

PROCESS
- Turn one: state the ticket, list every file you will create or change in BOTH repos, then read. No code before the list.
- Question set document first, then the data shape and wire format (write the TECHNICAL-DECISIONS entry before implementing), then taylor-aucoin (types, validators, service, email, contract), then this site (data, renderer, action, validators, contract), then verification.
- Verify: `yarn verify` here; taylor-aucoin lint, types and `build:agent`. Browser walk of /review/feedback at 1440 and 390: fill part of it, reload (progress kept), finish, send. If you can run taylor-aucoin locally on :4300 with a local round, send end to end and show the stored payload and the email text; otherwise say exactly why not.
- Close: this ticket's Status, PROGRESS.md, DEVIATIONS.md (+ TECHNICAL-DECISIONS) here; REV-2 in taylor-aucoin/docs/review/specs/ with its own PROGRESS/DEVIATIONS. Commit here only: `KR-6: feedback questions (rankings, sliders, forks)`. Do not commit in taylor-aucoin.
- Closing note, 3–5 lines: the final question list (count and minutes), what changed on the wire, what Taylor must do in taylor-aucoin, anything cut and why.

Do not ask him facts (02 §14 Q5, Q15–Q21 go in Taylor's own message). Do not invent quotes; every line attributed to him is from 01–03. Do not touch the mocks, kits or public site.
```

---

## Question set (Vitrine, 2026-09-22)

Written before any code. Order is deliberate: the gut answer first (which demo he would send a producer to), then the reasons, then the sliders he answered before seeing anything, then free text. Every structured answer is optional. Types: **rank** (put three in order; 1st/2nd/3rd per row, no drag), **scale** (0.0–7.0, one decimal, two named ends), **choice** (pick one), **text**.

Sections 1 to 4 each link back to the pages they ask about. Kit, layout, pillar and demo names come from the live registries (`review/kits`, `review/layouts`, `review/brand.ts`, `review/mocks`); nothing below is typed twice.

### 1 · Your favourite

| id                 | Type       | Wording                                  | Serves                                                                                                                                                                    |
| ------------------ | ---------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `favourite.first`  | choice (9) | Which demo would you send a producer to? | The build's layout × kit (KR-5's nine combinations). Also fills the old `preferredKit` / `preferredLayout` / `preferredMock` fields, so the email's top lines still read. |
| `favourite.second` | choice (9) | And your second?                         | The fallback. 06 "Recommendation": A, with B as fallback; this tests it.                                                                                                  |

### 2 · The brand

| id           | Type  | Wording                                                              | Ends / options                                   | Serves                                                                                                 |
| ------------ | ----- | -------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `brand.lead` | rank  | Which should lead? _Put them in order. First place decides the kit._ | Wicked · Generous · Resourceful (from `PILLARS`) | 04 Step 7 and "the real choice": which pillar card governs the build's tie-break rule.                 |
| `brand.fit`  | scale | How much do these three sound like you?                              | Not me ↔ Exactly me                              | Whether 04's trunk holds. A low number means another brand pass before the build spec, not a kit pick. |

### 3 · The kits

_Rank each part on its own. You can love one kit's colours and another's type._

| id                 | Type   | Wording                                                                                                                                                | Serves                                                                                  |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `kit.colour`       | rank   | Colour. _The background, and the one strong colour on your name._                                                                                      | 01 §4 and §7.2 (dark or light background is a real fork); the production kit's palette. |
| `kit.type`         | rank   | Type. _Your name and the headings._                                                                                                                    | 01 §5 (condensed Archivo / Space Mono wordmark / Chivo); the production kit's fonts.    |
| `kit.voice`        | rank   | How it sounds. _The sample lines: the headline, the About lines, the contact line._                                                                    | 03 §8 voice dials (A driest, B warmest, C most editorial) and the hero-line fork.       |
| `kit.role-colours` | choice | Coloured dots for Directing, Camera and Editing? _Kit C gives each role its own colour. The others use words._ Yes, colour them · No, words are enough | 06 layout C §9: "the single biggest yes/no in this layout"; 04 Card C, UI row.          |

### 4 · The layouts

_Four things the layouts disagree on. Pick what you'd want, whichever layout it comes from._

| id                      | Type         | Wording                                                                                                                                   | Ends / options                                                                                                                                                                                       | Serves                                                                                                              |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `layout.first`          | choice       | What should someone see first on Home? _You asked for "a 10–20 second highlight reel and/or a photo of me". Here are the ways it can go._ | My films, straight away, no banner (A) · One film big at the top, then the rest (A's fix, 06 "Recommendation") · A strip of films to swipe through (B) · One line about what I do, then the list (C) | 06 overview fork 1; 02 §14 Q3 (the hero).                                                                           |
| `layout.split`          | choice       | Passion projects and paid work: how should they sit?                                                                                      | One grid, passion projects labelled (A) · Two sections, each with its own name (B) · A column in a list I can sort (C)                                                                               | 06 overview fork 2; 02 §3.1.                                                                                        |
| `layout.lane-names`     | choice       | What should the two be called? _The third is Petros's line, which you called brilliant._                                                  | Passion projects · For hire / Films I made because I had to · Films I was hired to make / Art · Art I got paid for (03 §8, verbatim)                                                                 | 02 §14 Q8; 06 layout B §9: "the most important copy decision in this layout".                                       |
| `layout.lane-names-own` | text (short) | Or in your own words                                                                                                                      | ≤ 200                                                                                                                                                                                                | Same.                                                                                                               |
| `layout.fifth`          | choice       | The fifth page. _Teaching gets a page, or your full behind-the-scenes credits list does. The other goes on About._                        | Teaching · Credits · Neither: keep it to four pages                                                                                                                                                  | 06 overview fork 3; 02 §14 Q7; 02 §7. "Neither" is there because "too many pages" is one of his refusals (02 §1.2). |
| `layout.me-on-home`     | scale        | How much of you should be on Home? _Layout A gives you one square; B, a column on every page._                                            | Just a line ↔ Always there                                                                                                                                                                           | 06 overview fork 4.                                                                                                 |

### 5 · Now that you've seen them

_You answered these before you'd seen anything. Answer again for the site you want now._ Same labels and ends as the intake (`taylor-aucoin/lib/intake/showcase-copy.ts` `tasteSpectrums`). His intake value is **not shown to him**, so it cannot anchor the new answer. It rides in the email beside the new one.

| id                         | Label                       | Ends                             | Intake (02) | What a change would move                                                           |
| -------------------------- | --------------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `now.meet-first`           | Who they meet first         | The work ↔ You                   | 6.0 (§2.2)  | How much of him sits in Home's first view.                                         |
| `now.way-through`          | How they get through it     | They roam ↔ You lead             | 2.0 (§1.3)  | Nav and archive: everything in reach, or a guided order.                           |
| `now.around-the-work`      | What sits around each piece | Just the piece ↔ The whole story | 5.0 (§3.4)  | How much story, awards and press the player carries (02 §3.4).                     |
| `now.where-the-look-lives` | Where the personality lives | In the work ↔ In the site        | 5.0 (§12)   | How quiet the frame around the work is (01 thesis).                                |
| `now.what-carries-it`      | What carries the work       | Frames ↔ Footage                 | 5.0 (§2.2)  | Poster frames or motion on landing, within PERFORMANCE.md (no video before a tap). |
| `now.temperature`          | Cool or warm                | Cool ↔ Warm                      | 6.0 (§12)   | The kit choice; 01 §2.5 (what he says about himself vs what he picked).            |
| `now.presence`             | Understated or bold         | Understated ↔ Bold               | 6.0 (§12)   | Same; where the aspiration gets spent.                                             |
| `now.levity`               | Serious or playful          | Serious ↔ Playful                | 6.0 (§12)   | Same; how dry the voice is.                                                        |
| `now.era`                  | Timeless or of its moment   | Timeless ↔ Of its moment         | 3.0 (§12)   | Type choice (04 Step 5, "timeless in type").                                       |

02 writes the feel sliders as "6/7". They are carried as 6.0 on the 0.0–7.0 scale the structure sliders already use (2.0, 5.0, 6.0).

### 6 · In your words (unchanged, last)

`flinch` "What made you flinch?" · `fightFor` "Anything you would fight for?" · `notes` "Anything else". These keep their existing wire fields.

### Count and time

22 structured questions plus one optional short text and three free-text boxes. Estimate on a phone: choices about 15 s, ranks about 30 s, sliders about 10 s: roughly **five and a half minutes** of structured answers, plus whatever he writes. Nine to ten minutes with two or three sentences in each box.

### Cut, with reasons

- **Overall kit rank and overall layout rank.** `favourite.first` / `favourite.second` already name the top layout and the top kit, and the per-part ranks and forks carry the detail. A third ranking of the same things would change nothing.
- **"Sounds like me" per pillar (three sliders).** The rank gives the order. One slider for the set (`brand.fit`) is enough to tell whether the trunk holds; three would triple the time and add nothing the build uses.
- **The essence line (keep / change / drop).** It is "a line to steer by, not a tagline to print" (`review/brand.ts`), so his answer changes no page. The lines that do print are covered by `kit.voice`.
- **A separate hero-line pick (03 §8's three H1s).** Layout A has no hero line, `layout.first` decides whether there is one, and `kit.voice` ranks the three headlines as rendered. If a hero survives, the line is a copy pass.
- **Social links (02 §14 Q11).** A list preference, not a judgement that depends on seeing the designs; it goes in Taylor's message with the facts.
- **02 §14 facts (Q5, Q15–Q21) and every rights question.** Out of scope by the ticket; Taylor's message.

---

## Closing note (2026-09-22)

- **Shipped:** 22 structured questions (2 favourite picks, pillar rank and fit, 3 per-part kit ranks, role colours, 4 layout forks, lane names, 9 intake sliders re-asked), one optional short text, then the three free-text boxes. About five and a half minutes of structured answers, nine to ten with writing. Data in `review/feedback.ts`; renderer in `_components/feedback-{form,fields,draft}`; action snapshots labels and intake baselines on the server.
- **Wire:** optional `answers: { schema: "kryshan-2026-09", items[] }` (M-KR-4, contract §4a); the old six fields unchanged, with `preferred*` filled from the favourite pick. No migration.
- **Verified:** `yarn verify` passes. Browser walk at 1440 and 390: partial fill, reload (progress kept), rank swap, keyboard slider, send. The outgoing POST was captured locally and passed taylor-aucoin's validator and email formatter (REV-2 PROGRESS). Not sent to taylor-aucoin itself: see DEVIATIONS.
- **Next (KR-4):** apply taylor-aucoin `0017` to staging, mint the round, and send the form once against staging before sending Kryshan the link. The facts (02 §14 Q5, Q15–Q21) and social links (Q11) go in Taylor's own message.

---

## Amendment (Taylor, 2026-09-22, after the first walk)

- **A thoughts box on every rank, scale and choice** ("so we get the real thoughts, not just a select value"). Behind "Add a thought" by default so the phone form stays short; the brand section's box is open ("What rings true, and what doesn't? Put it in your own words.", on `brand.fit`). `layout.lane-names` has none, because the next question is already his own words. Each note travels as a `text` item `<id>.note` straight after its answer, ≤ 1000 characters (contract §4a); taylor-aucoin folds it under the answer in the email and the admin page.
- **Section 5 is "A few sliders", with no intro.** The "you answered these before" framing is gone. The baselines still reach Taylor.
- **"Anything else" is "Anything else / general impressions".**
- **An admin view in taylor-aucoin** (`/admin/design-reviews`, REV-3) shows each round's forms (every answer and note, the three boxes) and its comments grouped by page.
- Timing: the notes are optional, so the structured estimate stands; each note written adds about half a minute.

## Amendment 2 (Taylor, 2026-09-22)

- **Section 5 removed entirely** ("as we already have that data"). The nine intake sliders are no longer re-asked, and `INTAKE_BASELINES` is gone. The wire's `baseline` field stays in the contract (nullable) for a future round that re-asks something; this form sends it as null.
- The form is now **13 structured questions** (2 favourite, 2 brand, 4 kits, 5 layouts) plus the optional lane-names text, a thoughts box on each, and the three free-text boxes. About four minutes of structured answers, eight to ten with writing.
- Acceptance criterion 4's "intake sliders re-asked" is withdrawn by Taylor; see DEVIATIONS.
