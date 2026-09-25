# SITE-10 — Launch: the gates on the record, launch-tier validation, Lighthouse per template, `EDITING.md`, the DNS cutover, and the accounts in his name

**Epic:** SITE — Kryshan Randel's live site · **Step 4 (Handover and launch)** · Size: M · **Launch-blocking**
**Slice type:** launch operations, plus one validator pass and one document. The risks:
- launching with a "Blocks launch" item silently open
- losing his mail or breaking old links at the cutover
- a self-edit guide whose error table doesn't match what the build prints, which strands him the first time a change doesn't appear
- Taylor left holding an account or a shared key after handover
**Vigil:** full review. Review by **inducing**, not observing (the callout below).
**Status:** Draft → ready for execution (authored 2026-09-24)

> **Vigil: full depth.** QA states which paths it exercised:
> - every launch-tier check, induced once
> - every SITE-2 check, induced once, with the printed text compared to `EDITING.md`
> - every `LEGACY_PATHS` entry, followed on the live domain
> - MX, SPF, DKIM and DMARC records, diffed before and after the cutover
> - an outside-account email to the alias after the cutover
> - held slugs and `/review`, requested on the live domain
> - the privacy sweep over the build output
> - the `EDITING.md` dry run
>
> **Taylor: decisions batched below (A, B, C),** each with a recommendation and a default. Each blocks only the step it names.
> **Actors are labelled on every step:** [Agent], [Taylor], [Kryshan]. An agent never enters a credential or a payment method, and never changes an account setting. It verifies from public evidence (`dig`, `curl`, `git`) and records.

---

## Outcome

`kryshanrandel.com` serves the new site:
- Every page is static, and every template scores at least 95 on mobile Lighthouse with no layout shift.
- Every old WordPress URL lands on its new page in at most two hops.
- His mail arrives exactly as it did the day before.

The launch-tier checks now stop the build if a logline runs long, two pages share a description, or a film goes public on a frame he hasn't approved. Every message the build can print is in `docs/EDITING.md`, next to what it means and what to do. The guide walks him through the changes he'll actually make, in plain words, through Claude Code.

Every "Blocks launch" item is closed or defaulted, with evidence, in this ticket's launch record. The domain, the Vercel project, the GitHub repo and the mail alias are his, and Taylor is removed last.

This slice writes no page copy (SITE-C), deletes nothing from the review layer (SITE-9), and adds no feature, analytics or Search Console (D-SITE-15).

## Why / intent

- **Spec §2, "Launch":** "everything in §13 marked 'Blocks launch' is closed, and the review layer is deleted." **"Ownership (Drummer)":** domain, Vercel, repo and alias in his name; Taylor removed at handover; MX and SPF kept.
- **Spec §5, "Checks added in SITE-10":** logline ≤155 characters, unique descriptions, no showable film missing its approved frame. "Every error message is written for him … and each is listed in `docs/EDITING.md`, 'When a change doesn't appear' (Tribune)."
- **Spec §8:** descriptions ≤155 characters and unique. Redirects are explicit, at most two hops, the last a 308 (D-SITE-25).
- **Spec §10 and PERFORMANCE §1, §9:** Lighthouse ≥95 on mobile, CLS 0, under 200 KB before first paint, LCP elements as listed, no video host before a tap.
- **Spec §11 (binding):** no phone number or home address anywhere in the build. Held and NDA'd work never shown. Consent enforced.
- **Spec §13 and the build order's launch-blocking set:**
  - O-SITE-4 and O-SITE-5 (§13, "Blocks: Launch")
  - O-SITE-15
  - the old-URL crawl
  - the Directors Reel frame or its fallback
  - press verification
  - the review layer deleted
  - ownership transferred
- **CONVENTIONS §10a:** he maintains the site through a Claude Code guide. It stays true only if the seams stay where it says: `content/`, `public/media/`, `brand/`.
- **`docs/client/README.md`, "Housekeeping":** "Before handover, either move the raw folders … or delete `project-images/`, `inspiration/` and `writing/`." It's open, so it goes into decision C.
- **M-KR-5:** `REVIEW_INGEST_KEY` is one shared value across taylor-aucoin and every client repo. It's gone from code and environment after SITE-9, but not from old deployments (decision B).
- **What this slice is NOT (binding):** the builder writes no page copy. A launch-tier check that fails on existing content is **routed to SITE-C** (Cantor cuts; Kryshan approves), never trimmed by the builder. No new page, section, feature, redirect source or dependency.
- **Ground truth:**
  - `content/validate.ts` and its SITE-2 checks and message style
  - `LEGACY_PATHS` (SITE-1)
  - `redirects()` in `next.config.ts` (SITE-5)
  - `docs/STYLE-GUIDE.md` (SITE-9)
  - the repo is `github.com/tayloraucoin/kryshan-film-portfolio`, in Taylor's account today

**Rulings this slice makes (labelled, logged):**

1. **The launch-tier checks are always on.** No environment switch: a switch would be a second home for the rule, and a Vercel variable could silently turn off his safety net. They run on every build after this ticket. Logged.
2. **"Descriptions" means every page's meta description (Home, Work, About, Teaching, Contact) plus every showable film's logline**, which is its detail page's description (spec §6.3).
   - All are unique, compared case-insensitively after trimming.
   - All are ≤155 characters (spec §8), which extends §5's logline limit to the five page descriptions.
   - A page description found outside `content/` moves, unchanged, into that page's content file (CONVENTIONS §10a).
   - Logged.
3. **"Approved frame" reads SITE-2's marker.** `[NEEDS VALUE AT BUILD]`: read how SITE-2 recorded a frame that's in the file but not yet approved (`content/posters.ts`, DEVIATIONS).
   - If a marker exists, the check is "no showable slug carries it".
   - If none exists, add `FRAMES_AWAITING_APPROVAL: readonly string[]` to `content/posters.ts`, seeded from O-SITE-13's three slugs (directors-reel, glimpse, the-bully-solution) minus any whose replacement he has approved, with the date in the launch record. The check is then "no showable slug is listed".
   - `[PROVISIONAL — Mason]`. Logged.
4. **Hops are counted from the `https` form of each crawled URL, on the host the crawl recorded** (`[NEEDS VALUE AT BUILD]`: apex or www, from SITE-1's inventory).
   - The browser's `http`→`https` upgrade isn't counted.
   - The other host is followed too and recorded, but it's informational, not a gate.
   - `[PROVISIONAL — Mason]`. Logged.
5. **DNS stays where it's hosted today.** Only the web records (apex A/AAAA, www CNAME) change. Nameservers and every mail record are untouched. The old WordPress hosting stays paid and up for **14 days** after cutover as the rollback target, then Kryshan cancels it. `[PROVISIONAL — Taylor]` (the hosting cost is his). Logged.
6. **`EDITING.md`'s publishing flow:**
   - Claude Code makes the change, runs `yarn verify` locally (the same checks as the live build), commits to `main` and pushes. Vercel builds.
   - A failed build leaves the live site as it was; Vercel keeps serving the last good deployment.
   - No branches, no pull requests.
   - `[PROVISIONAL — Taylor]`. Logged.
7. **Closure comes before Taylor's removal.**
   - The closing commit (ticket Status, `PROGRESS.md`, DEVIATIONS, the build-order tick) is the last thing Taylor pushes, from the transferred repo.
   - Removing his access is the one act after closure. Its evidence is Kryshan's dated confirmation, kept in Taylor's engagement record, not in the repo.
   - `[PROVISIONAL — Taylor]`. Logged.
8. **The launch record lives in this ticket,** in the "Launch record" section at the end, filled in during the build. It's the one place a future session learns what launch looked like. Logged.

**Decisions needed (Taylor, batched):**

- **A. The Vercel plan.** `[NEEDS DECISION — Taylor, before G2]`
  - Vercel's Hobby tier is for non-commercial use, and whether a freelancer's portfolio counts is a judgement against Vercel's current terms.
  - **Recommendation:** check the terms, and tell Kryshan the plan and its cost before the project moves to his account.
  - **Default** if unanswered at G2: the plan the project is on now, stated to him in the handover message.
- **B. Deployments built before SITE-9 carry the shared `REVIEW_INGEST_KEY`** (M-KR-5) in their runtime environment. Moving the project hands them to his account. `[NEEDS DECISION — Taylor, before G2]`
  - The options: delete those deployments; rotate the shared key across taylor-aucoin and every client; or accept the exposure.
  - **Recommendation:** delete them. Nothing is lost, since any commit rebuilds.
  - **Default:** delete every deployment older than SITE-9's before G2.
- **C. What leaves with the repo.** `[NEEDS DECISION — Taylor, before G3]`
  - `docs/client/`'s raw folders (about 76 MB: `project-images/`, `inspiration/`, `writing/`) and `docs/roles/` (Taylor's agent role prompts) go with the repo, and git history keeps whatever was ever committed.
  - **Recommendation:** delete `inspiration/` at HEAD (third-party reference images that never ship). Keep `project-images/` and `writing/` (his own material) and `docs/roles/` (history holds them anyway).
  - **Default:** the recommendation.

## Behavior & states

### A. Launch-tier validation (`content/validate.ts`) [Agent]

Add these to SITE-2's checks, in SITE-2's style: pure functions that throw, run by the side-effect import in `app/(site)/layout.tsx`.

| Check | Throws when | The message names |
|---|---|---|
| Logline length | A showable film's `logline` is over 155 characters. | `content/projects.ts`, the slug, the length, "155 or fewer", and why: it's also the Google description. |
| Description length | A page description is over 155 characters (ruling 2). | The content file, the page, the length. |
| Unique descriptions | Two descriptions match (ruling 2). | Both owners (a page or a slug) and their files, and "each page needs its own". |
| Approved frame | A showable slug is marked as awaiting approval (ruling 3). | `content/posters.ts`, the slug, and both fixes: approve the frame (remove the mark) or set `rights: "held"`. |

**Message rule (SITE-2's, matched):** plain words, Canadian spelling, no stack jargon. Each message names the file, the entry, what's wrong and the fix, in that order. The builder writes messages but never content strings.

### B. `docs/EDITING.md` [Agent]

**Reader:** Kryshan, working through Claude Code in this repo. Every task has four parts:
- **Ask Claude Code:** one sentence he could type.
- **What changes:** the exact file and field, for the Claude Code session.
- **Rules:** only the rules that bind this task.
- **Check:** what he'll see when it worked.

Plain language, Canadian spelling, no emoji. Nothing private: no phone number, no address, no secret.

**Sections, in order:**

| # | Section | Must say |
|---|---|---|
| 0 | Start here | The site in one paragraph: words in `content/`, pictures in `public/media/`, the look in `brand/`. Everything else is structure, and Claude Code should keep to those three places. Link `STYLE-GUIDE.md`. |
| 1 | How a change goes live | Ruling 6, step by step. Where to see a build in Vercel (Deployments: Building, Ready, Error). How to undo: "undo my last change" means a revert, then a push. |
| 2 | Add a film | `content/projects.ts`: every field in spec §5's table, with which are required. The poster goes in `public/media/posters/<slug>.jpg` (16:9, ≤1600 px wide, JPEG, a chosen frame), plus one import line in `content/posters.ts`. The slug is lowercase with hyphens and permanent, because it's the URL. The logline is ≤25 words and ≤155 characters, present tense, with no "PSA —". `rights: "public"` only when the video plays and clearance is confirmed; otherwise `"held"`. The video is a YouTube or Vimeo id, or a link-out to its real host, never the old site (D-SITE-9). Work places the film automatically: featured first, then newest. |
| 3 | Swap a poster | Replace the file under the same name, or add a new file and change the one import. The same frame rules apply. No identifiable participant on community work (VANDU, RFFC; spec §6.3). Check the tile at phone width. |
| 4 | Hide a film, and show it again | Set `rights: "held"`, and take the slug out of `FEATURED` and the rows first. Its page then returns the not-found page, Work and Home drop it, and the counts update themselves. An old WordPress link to it now goes to `/work`. Showing it again means setting `"public"`. Never use `"nda"` for something he may show. |
| 5 | Featured films and the Home rows | `content/home.ts`: `FEATURED` (six, in order; eight with a portrait, per spec §6.1's portrait rule), `DIRECTING_ROW`, `CAMERA_ROW`. Showable slugs only. Work's order follows `FEATURED`. |
| 6 | Add a testimonial (written consent first) | `content/testimonials.ts`. Get the written OK first, and `record` says where it's kept. About shows full name and role only (at most 3). Teaching also allows first name plus role, or anonymous plus role (at most 4). Never a current student. Never "at-risk" attribution. ≤40 words, their words verbatim. Include the ask from handoff Appendix D ("Teaching testimonials", Drummer's words) verbatim. Withdrawal: delete the entry, and that's the whole process. |
| 7 | Add a photo, and who's in it | The `Photo[]` in `content/about.ts` or `content/teaching.ts`; files in `public/media/photos/` (3:2, ≤1600 px, JPEG). `people` is required. Minors need guardian and program consent dates. Reel Youth (Whatì) photos also need community consent. No student named in a caption or alt text. Never under a video. |
| 8 | Add a press quote | Verbatim, ≤15 words, an ellipsis where cut. The outlet as it styles itself. `verifiedOn` is the date he checked the article. Never alter a quote (spec §7.4). |
| 9 | Add a credit | `content/credits.ts`. `released: true` only once the title is public. Order and count are automatic. |
| 10 | Change your bio, and other About words | `content/about.ts`. The bio is ≤200 words and at most three paragraphs, the first ≤60 words. Awards live in Recognition, not the bio. First person. Point to `STYLE-GUIDE.md` §7 and §8. |
| 11 | Change where email goes | The alias is re-pointed at the mail provider, and the site doesn't change (D-SITE-18). Only a new address changes `CONTACT_EMAIL`: set it in Vercel for Production **and** Preview, then redeploy. |
| 12 | Words | Two lines pointing to `STYLE-GUIDE.md`'s voice and never sections. |
| 13 | **When a change doesn't appear** | **13.1 Still building?** Vercel Deployments. **13.2 The build failed:** a table with one row per check in `content/validate.ts` (SITE-2's and this ticket's), headed "The message says" (the fixed text verbatim, placeholders in `{braces}`), "What it means" and "What to do". Then three rows for failures that aren't validators: a content file's shape error (a missing comma, a misspelt field), a poster import that can't be found, and an invalid `CONTACT_EMAIL` or `NEXT_PUBLIC_SITE_URL` (t3-env's message). **13.3 Built, but not showing:** browser cache (a hard refresh, or a private window on the phone); the film is `held`; the film isn't in `FEATURED` or a row (Work shows it, Home doesn't); a Work filter is on; social previews are cached by the platform. **13.4 Undo.** |
| 14 | What this guide doesn't cover | Layout, new pages, the kit, redirects, the domain: these are design changes. Who to ask: `[PROVISIONAL — Taylor]` supplies this line. |

### C. The launch gates (evidence in the launch record) [Taylor, verified by Agent]

| # | Gate | Source | Closed means | Evidence required |
|---|---|---|---|---|
| G-1 | O-SITE-4, the Leo nomination | §13 (Launch) | His answer is in the build, or the default "Leo-nominated as an editor", with no title | His reply (date, channel), or "no reply by {reply-by date}; default applied". The rendered Home caption and About awards line, quoted. |
| G-2 | O-SITE-5, VFS | §13 (Launch) | His answer is in the build, or VFS is removed everywhere | His reply or the default. When defaulted, a case-insensitive grep for "Vancouver Film School" and "VFS" over the build's HTML returns nothing. |
| G-3 | O-SITE-15, the alias delivers | Build-order set | A dated test from an outside account arrives | Before cutover (date), and again after (F-6). |
| G-4 | Old-URL crawl | Build-order set; SITE-1 | `LEGACY_PATHS` is the crawl | SITE-1 is Complete, and the entry count is recorded. F-2 passes live. |
| G-5 | Directors Reel frame | Build-order set; §6.1; O-SITE-13 | He approved the replacement frame, or the film is `held` with the §6.1 fallback in `content/home.ts` | The approval date, or the `FEATURED` list as it stands. |
| G-6 | Press verified | Build-order set; SITE-C | Every `press` entry has `verifiedOn` | SITE-C is Complete. The count of entries with `verifiedOn` equals the total. |
| G-7 | Review layer deleted | Build-order set; SITE-9 | SITE-9 is Complete | `PROGRESS.md`, and `/review` returning 404 live (F-4). |
| G-8 | Ownership transferred | Build-order set; spec §2 | G1 to G8 in section E are done | Section E's evidence. |

**Provisional sweep (not blocking, recorded):** each of the following is marked "answered: {what}" or "default applied":
- D-SITE-11, D-SITE-15, D-SITE-27
- O-SITE-1, 2, 3, 6, 7, 8, 14, 16

### D. Pre-cutover verification, local (`build:agent` + `start:agent`) [Agent]

**Lighthouse per template:** mobile preset, three runs each, median recorded.

| Template | URL | Expected LCP element (spec §10) |
|---|---|---|
| Home | `/` | the first poster or the H1 |
| Work | `/work` | the first poster or the H1 |
| Work, filtered cold load | `/work?role=camera` | the same (the pre-paint script must hold CLS at 0) |
| Detail, embed | `/work/just-watch-us` | the poster |
| Detail, link-out | the first showable link-out film `[NEEDS VALUE AT BUILD]`; record "none" if there isn't one | the poster |
| About | `/about` | the H1 |
| Teaching | `/teaching` | the H1 |
| Contact | `/contact` | the H1 |
| 404 | `/no-such-page` | the H1 |

For each template, record: Performance, Accessibility, Best Practices, SEO, LCP (seconds and element), CLS, TBT, first-screen transfer (KB) and video-host requests.

Also check:
- **PERFORMANCE §9, items 3 to 5:** a cold-load network check, a keyboard walk and reduced motion.
- **Static check:** every route in the build table is ○ or ●.
- **Privacy sweep** over the build output (criterion 12).

### E. Cutover and ownership (ordered; the actor labelled on each step)

| Step | Actor | Action | Evidence |
|---|---|---|---|
| E1 | Taylor | Decisions A to C answered or defaulted. | Launch record |
| E2 | Taylor + Kryshan | Name the registrar and DNS host (`[NEEDS VALUE AT BUILD]`). Export every record in the zone. | The zone, as text, in the record |
| E3 | Agent | `dig +short` for apex A and AAAA, www CNAME, MX, apex TXT (SPF), `_dmarc` TXT, each DKIM selector from the zone export, and CAA. This is the "before". | Output in the record |
| E4 | Taylor | Confirm that the MX target isn't the WordPress host. If it is, the cutover proceeds, but cancelling the host waits for a mail move (out of scope). | A note in the record |
| E5 | Taylor | Lower the TTL on the web records only, to 300, at least 24 hours before. | Date |
| E6 | Taylor | Vercel env for **Production and Preview**: `NEXT_PUBLIC_SITE_URL=https://kryshanrandel.com`, `CONTACT_EMAIL=hello@kryshanrandel.com`, and no `REVIEW_*` in any environment. Redeploy Production after any change. | Variable names and values (none are secret) |
| G1 | Kryshan | The domain's registrar account is in his name: registrant, login, and auto-renew on his own payment method, which he enters himself. | His confirmation; the expiry date |
| G2 | Taylor + Kryshan | The Vercel project is in his account (transfer it if it's in Taylor's; `[NEEDS VALUE AT BUILD]`: where it is now), after decisions A and B are applied. Re-check the domains, env vars and Git connection after the move. | The project URL under his account |
| G3 | Taylor + Kryshan | Transfer the GitHub repo to his account, with decision C applied first. Re-link Vercel's Git connection to the new path. `review-round-final` must still be present. | The new remote URL; `git ls-remote --tags` |
| G4 | Kryshan | The alias's mail account and domain admin are in his name. | His confirmation |
| E7 | Taylor | Add `kryshanrandel.com` (primary) and `www.kryshanrandel.com` (a 308 to the apex) in his Vercel project. | Vercel's domain screen |
| E8 | Taylor | At the DNS host, change **only** the web records, to the values Vercel's domain screen shows (`[NEEDS VALUE AT BUILD]`; never guessed). Leave MX, SPF, DKIM, DMARC, verification TXT records and the nameservers alone. | Timestamp |
| E9 | Agent | Propagation: `dig +short A kryshanrandel.com @1.1.1.1` shows Vercel's value, and certificates are issued for both hosts. | Output |
| F-1 to F-7 | Agent (F-6: Taylor or Kryshan) | Post-cutover verification (criteria 15 to 20). | Launch record |
| G5 | Agent | History secret sweep (criterion 22). | Output |
| G6 | Agent | The closure commit, pushed from the transferred repo, builds Production in his project (ruling 7). | Commit hash, deployment URL |
| G7 | Taylor + Kryshan | Recommended: a walk-through where he makes one `EDITING.md` change on his own machine. Not gating. If it doesn't happen, record "offered {date}". | Date |
| G8 | Taylor | **Last:** Taylor is removed from GitHub, Vercel, the registrar or DNS host, and the mail admin. | Kryshan's dated confirmation, kept off-repo (ruling 7) |

**Rollback (named):**
- If F-1 to F-5 fail and the fix won't land within the TTL window, restore E3's "before" web records. The old site returns within 300 s.
- Mail is never touched, so it never needs rolling back.
- The old host stays up for 14 days (ruling 5).

**States:** gates open · gates closed · verified locally · decided (A to C) · transferred (G1 to G4) · cut over · verified live · closed · Taylor removed.

**Failure and edge states (named):**
- **A launch-tier check fails on existing content** (a 160-character logline, a shared description): STOP. List every failure and route it to SITE-C. Don't trim or reword anything.
- **A gate has no answer and no default in the spec:** there isn't one today. If one appears, it's `[NEEDS DECISION — BLOCKING]` to Taylor, and the cutover waits.
- **A template scores below 95, or CLS isn't 0:** fix it within the template's own ticket scope (image `sizes`, `preload`, a missing dimension), and log it. A fix that changes design STOPs and goes to Taylor. There's no launch below the bar.
- **A crawled URL takes 3 hops, returns 404 or lands on the wrong page live:** fix the data (`LEGACY_PATHS`) or `redirects()`, redeploy, and re-run F-2 before the site is announced.
- **An MX or TXT diff after cutover is not empty:** STOP. Restore the "before" values at once, re-test mail, and record it.
- **The alias test doesn't arrive after cutover:** confirm the records are unchanged (E3 against F-5), then escalate to Taylor. The site isn't announced until mail works.
- **A certificate isn't issued within the Vercel window:** don't restore anything yet. Check the web records against Vercel's screen, then wait.
- **Decision B isn't applied before G2:** G2 waits. The default applies at G2's date.
- **A secret is found in history (G5):** STOP, and escalate before the transfer. Rotating it is Taylor's call. A history rewrite is out of scope unless he decides it.

## Non-negotiables (this slice)

- **No launch with a gate open.** Every row in section C is closed or defaulted, with evidence, before E8.
- **His mail is untouched.** MX, SPF, DKIM and DMARC are identical before and after, and the alias delivers after cutover.
- **Every crawled old URL lands in ≤2 hops, the last a 308,** on the live domain, before the site is announced.
- **The builder writes no copy.** Content that fails a check goes to SITE-C.
- **Every check the build can throw is in `EDITING.md`, verbatim, and has been induced once.**
- **Accounts are Taylor's or Kryshan's hands only.** No credential, payment method or account setting is entered or changed by an agent.
- **Nothing private in the build or the guide:** no phone number, street address, student name or secret.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/validate.ts`: four checks added (section A).
- `content/posters.ts`: `FRAMES_AWAITING_APPROVAL`, only under ruling 3's second branch.
- Any page description found outside `content/` moves, byte for byte, into that page's content file (ruling 2).
- No content value changes.

**Placement** (Mason's call, build order scope sheet; ruling 3 is `[PROVISIONAL — Mason]`):
- `content/validate.ts`
- `content/posters.ts` (conditional)
- `docs/EDITING.md` (new)
- `AGENTS.md` ("Start here" gains a first line: editing words, films or pictures starts with `docs/EDITING.md`)
- `docs/README.md` (one row)
- this ticket's launch record
- Under decision C, the deletions in `docs/client/`, with one row changed in `docs/client/README.md`.

**Validators:** logline ≤155; each page description ≤155; descriptions unique; no showable film with a frame awaiting approval. The messages follow SITE-2's rule.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

- **Launch walk on every template (spec §9, PERFORMANCE §9 items 4 and 5):**
  - the skip link is first in the tab order, with the right text per page
  - focus is visible everywhere, and never hidden under the bar (2.4.11: `scroll-padding-top`)
  - every target listed in spec §9 is at least 44 px
  - the video plays from the keyboard, and the panel's ✕ is reachable by Shift+Tab out of the player
  - everything is instant under `prefers-reduced-motion: reduce`
  - `lang="en-CA"`
  - one h1 per page, matching spec §3's outlines
- **Lighthouse:** every failing Accessibility audit is fixed (within the template's scope) or logged, with its reason.
- **`docs/EDITING.md`:** one H1; tasks as H2; the error table has header rows. Each task fits one screen.

## Acceptance criteria (observable; 1–12 on `build:agent` + `start:agent`, 13–23 on the live domain and accounts)

**Validation**
1. `content/validate.ts` contains the four checks in section A. Each is a pure function that throws a message following SITE-2's rule. The file reads no environment: `git grep -n -E "process\.env|@/lib/env" content/validate.ts` prints nothing.
2. **Each new check is induced once** with a scratch edit, then reverted:
   - a 156-character logline
   - a page description of 156 characters
   - a page description equal to a showable logline
   - a showable slug marked as awaiting approval

   Each makes `yarn build:agent` fail with its message. After the revert the build passes. The four printed messages are quoted in the closing note. *(Vigil.)*
3. At HEAD, all content passes. If it didn't at the start, the closing note lists what was routed to SITE-C and when it came back. `git diff` on `content/` shows no value change outside `validate.ts`, the ruling 3 marker, and descriptions moved byte for byte.

**`EDITING.md`**

4. `docs/EDITING.md` has sections 0 to 14 in order, with the four parts in every task, and each task names its file and field. Its audience line names Kryshan and Claude Code.
5. Section 13.2 has one row per check in `content/validate.ts` (SITE-2's and this ticket's) plus the three non-validator rows. **Every SITE-2 check is also induced once** (scratch, reverted), and the fixed text of each printed message appears verbatim in its row. The closing note lists every check induced. *(Vigil.)*
6. **The dry run.** A fresh Claude Code session is given only this instruction: "Read `docs/EDITING.md`. Hide {a showable film in `FEATURED`} and put {another showable film} in its place." It runs in a scratch `git worktree` under the scratchpad, never pushed, and discarded after. It produces a diff touching only `content/projects.ts` and `content/home.ts`, and `yarn verify` passes there. Record the diff's file list.
7. `AGENTS.md`'s "Start here" opens with the `EDITING.md` line. `docs/README.md` lists `EDITING.md`. `yarn docs:check-links` passes. `EDITING.md` contains no phone number, address, secret or student name.

**Gates and local verification**

8. The launch record's gates table has every row G-1 to G-8 marked closed or defaulted, with the evidence section C asks for. The provisional sweep is filled in. *(Taylor, with Agent verification.)*
9. The launch record's Lighthouse table is filled in for every template in section D (the median of three runs). For each template:
   - Performance is ≥95.
   - CLS is 0.
   - First-screen transfer is under 200 KB.
   - Video-host requests number 0.
   - The LCP element is as listed.

   Every failing Accessibility, Best Practices or SEO audit is listed with its fix or a DEVIATIONS line. SEO's canonical audit flagging the local origin is expected; it's re-checked in criterion 20.
10. A cold load of `/` requests no font other than the kit's own, self-hosted under `/_next/static/media/`, and nothing from YouTube, Vimeo or ytimg. The keyboard walk and the reduced-motion pass (Accessibility, above) are done on every template, and what was checked is stated.
11. `yarn build:agent`'s route table shows every route as ○ or ●, and no Proxy.
12. **Privacy sweep** over `.next-build/server/app/**/*.html`, with each command and its hit count recorded:
    - A phone-number pattern returns zero hits. Any false positive is listed and explained.
    - His street address (read from his CV in `docs/client/`, and never written into any committed file, including this record) returns zero hits.
    - `wp-content` and `kryshanrandel.com/project/` return zero hits.
    - Every held or NDA slug has no page, no sitemap entry, no tile and no poster file referenced.
    - Taylor reads Teaching's rendered text once for any student's name and confirms none is there.

**Cutover (live)**

13. The launch record holds E2's zone export, E3's "before" output, and each of E1 to E9's actor and date.
14. The Vercel env values in E6 are recorded as confirmed by Taylor, for Production and Preview.
15. `https://kryshanrandel.com/` returns 200 with the new site. `https://www.kryshanrandel.com/` answers with a 308 to the apex. Certificates are valid for both hosts.
16. **Every `LEGACY_PATHS` entry, followed live on the crawled host** (ruling 4):
    - at most two hops
    - the last redirect a 308
    - a final 200
    - the final path equals the expected target (a showable film to `/work/<slug>`, a held one to `/work`, plus `/reel/`, `/contact-me/` and `/about/` per spec §8)

    Record the count and zero failures. The other host's results are recorded too. *(Vigil.)*
17. Every `sitemap.xml` URL returns 200. `robots.txt` allows everything and names `https://kryshanrandel.com/sitemap.xml`. The canonical is absolute on `https://kryshanrandel.com` for Home, Work, one detail page, About and Contact. Every `og:image` URL on those pages returns 200.
18. Held slugs (`/work/<slug>`) and `/review` return 404 live.
19. E3's "before" and the "after" (F-5) for MX, SPF, DMARC and DKIM are identical: the diff is empty and recorded. A test from an outside account to `hello@kryshanrandel.com` after cutover arrives, dated *(Taylor or Kryshan)*.
20. Lighthouse on the live domain for Home and one detail page: Performance ≥95, CLS 0, and SEO's canonical audit passes. Recorded.

**Ownership**

21. G1 to G4 are done, each with the evidence section E asks for. Decisions A to C are applied as answered or defaulted, and recorded.
22. **History secret sweep (G5):**
    - `git log --all --name-only --format= | sort -u | grep -E "^\.env"` prints only `.env.example`.
    - `git log --all -p -- .env.example | grep -E "^\+(REVIEW_[A-Z_]+|CONTACT_EMAIL|NEXT_PUBLIC_SITE_URL)="` shows no secret value.
    - A generic key-pattern grep over `git log --all -p` returns nothing.
23. `yarn verify` passes (lint with zero warnings, check-types, build:agent). A browser walk at 1440, 768 and 390 on every template in section D via `yarn dev:agent` (never `yarn dev` or `yarn build`), and again on the live domain at 390 for Home and one detail page. A closing note in this ticket per the kickoff contract.
    - The closure commit is pushed from the transferred repo and builds Production in his Vercel project (G6: hash and URL recorded).
    - The note ends with "Taylor's removal (G8) follows this commit."

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Lighthouse:** `npx lighthouse <url> --output=json --output-path=<scratchpad>/<name>.json --quiet --chrome-flags="--headless=new"` (mobile is the default preset). Fetching the package needs Taylor's OK; don't add it to `package.json`. DevTools' Lighthouse panel is equivalent.
- **First-screen transfer:** from the JSON, sum `transferSize` over the `network-requests` items that finish before `first-contentful-paint`. State the method in the record.
- **Hops:** `curl -sIL -o /dev/null -w "%{num_redirects} %{http_code} %{url_effective}\n" <url>` for the count and the end, and `curl -sIL <url> | grep -i "^HTTP"` for each hop's status. Reuse SITE-5's checker if it committed one.
- **DKIM selectors can't be discovered with `dig`.** Read them from the zone export.
- **Inducing checks:** edit `content/` in the working tree, run `yarn build:agent`, then `git checkout -- content/`. Never commit an induced failure.
- **Vercel keeps the last successful Production deployment live when a build fails.** That's what ruling 6 and section 13 rely on.
- **The dry run:** `git worktree add <scratchpad>/editing-dry-run` gives an isolated copy. Run `yarn install` there, then remove the worktree after.

## Dev's call

- The validators' function names and structure, and the message wording within the rule.
- `EDITING.md`'s prose, examples and the order of rows within 13.2.
- Lighthouse via the CLI or DevTools.
- Whether a redirect checker is committed (`scripts/`, with a line in `AGENTS.md`'s commands) or kept in the scratchpad. If committed, log it in DEVIATIONS.

## Out of scope

- **Rewriting any copy that fails a check:** SITE-C (Cantor cuts; Kryshan approves).
- **Deleting the review layer, and the style guide:** SITE-9.
- **New redirect sources or pages:** SITE-1 (the data) and SITE-5 (the mechanism). A URL missed by the crawl and found after launch is a change request.
- **Analytics and Search Console:** D-SITE-15. Search Console isn't in spec §2. Pin it for later.
- **Moving DNS hosting or mail providers:** not in spec. Ruling 5 keeps both where they are.
- **The social card:** O-SITE-11 defaults to the Just Watch Us poster, and it doesn't block launch.
- **A history rewrite to remove files from the repo's past:** only if Taylor decides it under decision C or G5.
- **Tests:** a house rule (no tests during slices).
- **Backporting to `client-boilerplate`:** Taylor, separate repo.

## Depends on

- **SITE-9:** Complete in `PROGRESS.md` (the review layer deleted, `STYLE-GUIDE.md`, `review-round-final`).
- **SITE-C:** Complete in `PROGRESS.md` (loglines, descriptions and press final, so the launch-tier checks can pass).
- All of SITE-1 to SITE-8 are complete transitively.
- **Not a ticket, but a gate:** the reply-by date in Taylor's one message (build order, "Before SITE-1") has passed, so every unanswered item is on its default.

## Recommended Claude Code execution

**Opus 5.5.** This slice's value is in its failure states and in coordinating three people across four systems, and its edge cases are irreversible for the person it protects. The failure mode of choosing down (Sonnet 5):
- a happy-path launch: redirects checked locally but never on the live domain
- mail records "probably unchanged" instead of diffed
- an error table written from the source rather than from induced messages, so a row drifts from what the build prints
- a long logline quietly trimmed to make the build pass

---

### Claude Code kickoff (paste into the session)

> Build **SITE-10 — Launch** (`docs/specs/03-site-build/SITE-10-launch.md`). Model: **Opus 5.5**. **Nothing launches with a gate open, his mail untouched and every old URL landing in two hops, and every message the build can print is in `EDITING.md` because you induced it.**
>
> Read first, in order:
> 1. this spec
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §2, §5, §8, §9, §10, §11, §13, Appendix A
> 3. `docs/specs/03-site-build/00-build-order.md` (SITE-10 scope sheet, launch-blocking set)
> 4. `docs/specs/03-site-build/SITE-2-*.md` (validate.ts: reuse its style, don't fork it)
> 5. `SITE-5-*.md` (redirects: reuse its checker)
> 6. `SITE-9-style-guide-and-review-removal.md`
> 7. `docs/STYLE-GUIDE.md`
> 8. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` Appendix D (the testimonial ask)
> 9. `docs/client/README.md` (Housekeeping)
> 10. `AGENTS.md`
> 11. `docs/CONVENTIONS.md` §10a
> 12. `docs/PERFORMANCE.md` §1 and §9
> 13. `docs/specs/README.md` (kickoff contract)
> 14. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Write no page copy. Content that fails a check STOPs and goes to SITE-C.
> - Never enter a credential or a payment method, or change an account setting. Taylor and Kryshan do those; you verify with `dig`, `curl` and `git` and record the evidence.
> - Routes come from `lib/routes.ts`; env via `lib/env.ts` (and `content/validate.ts` reads none); no hex outside `brand/`.
> - Client leaves never import `@/lib/config` (props).
> - No upward imports; nothing public imports `review/`.
> - Never `yarn dev` or `yarn build`; use `dev:agent` and `build:agent`. Never npm.
>
> Fill in the launch record as you go. Close in three places (this ticket's Status, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` plus `TECHNICAL-DECISIONS.md` where a ruling had real alternatives), then tick `03-site-build/00-build-order.md`. Do it **before** Taylor's removal (ruling 7). Run `yarn verify` and `yarn docs:check-links`.

---

## Launch record (filled at build)

**Gates (section C):**

| # | Closed or defaulted | Evidence | Date |
|---|---|---|---|
| G-1 … G-8 | | | |

**Provisional sweep:**

| Item | Answered, or default applied | Date |
|---|---|---|
| D-SITE-11, D-SITE-15, D-SITE-27; O-SITE-1, 2, 3, 6, 7, 8, 14, 16 | | |

**Decisions A to C:**

| Decision | Answer or default | Applied on |
|---|---|---|
| A · B · C | | |

**Lighthouse (median of three, mobile):**

| Template | Where | Perf | A11y | BP | SEO | LCP (s, element) | CLS | TBT | First-screen KB | Video-host requests |
|---|---|---|---|---|---|---|---|---|---|---|
| (section D rows) | local | | | | | | | | | |
| Home, one detail | live | | | | | | | | | |

**DNS:** zone export (E2) · "before" (E3) · "after" (F-5) · diff result.

**Redirects (F-2):** host · entries · passed · failed · the other host's results.

**Cutover and ownership steps (E1 to G8):** actor · date · evidence, per row.
