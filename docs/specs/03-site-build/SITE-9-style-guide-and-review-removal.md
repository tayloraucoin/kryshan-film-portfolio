# SITE-9 — Style guide exported, then the review layer deleted: the export, the tag, the full deletion list, and every doc that described `/review`

**Epic:** SITE — Kryshan Randel's live site · **Step 4 (Handover and launch)** · Size: M
**Slice type:** a handover deliverable, then a deletion across code, config, dependencies and docs. The risks are:
- deleting before the export or the tag (the kit page is the only thing that renders the contrast table)
- a public page that quietly depended on something deleted
- docs left describing a `/review` that no longer exists
**Vigil:** not a trust surface. Review by checking the diff against criteria 6 to 17, and by comparing before and after screenshots of every public route (criterion 21).
**Status:** Draft → ready for execution (authored 2026-09-24)

> **Mason: deletion review.** Rulings 4 and 5 below delete things spec §2's list doesn't name: orphaned files, two extra packages and the D-SITE-19 lint wall. The recommended calls are stated inline. Counter-propose in `TECHNICAL-DECISIONS.md` before the build if you disagree.
> **Taylor: the tag gate.** The builder stops after the export commit and waits until `review-round-final` exists on `origin` (ruling 2). Nothing is deleted before then.

---

## Outcome

Kryshan has his style guide: `docs/STYLE-GUIDE.md`, which says in words how the site looks and speaks, and `docs/STYLE-GUIDE.pdf`, the brand page and the Kit D page as he saw them in the round, printed before those pages disappear. The last commit that holds the review round is tagged, so the whole layer can be recovered with one `git checkout`. After that commit:
- `/review` and everything under it return the site's 404.
- The code, config, environment schema, lint rules, dependencies and docs no longer mention the layer. The exceptions are two retired docs, kept as history with a banner.
- Every public page renders exactly as it did before, and every route is still static.

This slice adds no launch-tier validation, writes no `EDITING.md`, and touches no DNS or account (all SITE-10). It changes no page copy (SITE-C).

## Why / intent

- **Spec §2, "Style guide":** `docs/STYLE-GUIDE.md` plus an exported PDF, "rendered from `/review/brand` and the Kit D page before the review layer is deleted, because those pages compute contrast with `lib/color/contrast.ts`". Contents: the pillars (Card A v2), colour roles and contrast, the type scale, tile and panel anatomy, the email hand-off, spec §7.2 to §7.4, and the never-list.
- **Spec §2, "Deleted at launch":** the full code list, the docs to update in the same ticket, and "Before deletion: Taylor tags the last review commit." `docs/REVIEW-LAYER.md` §6 and `docs/BRANDING.md` §4 step 3 say the same: "The public site never depended on any of it."
- **D-SITE-2:** "Nothing in `review/` survives."
- **D-SITE-19:** the lint wall that kept public code off `review/`. This ticket removes what it guarded (ruling 5).
- **Build order, ordering constraints:** "SITE-9 exports the style guide before deleting anything … Taylor tags the last review commit first."
- **Launch-blocking set (build order):** "the review layer deleted (SITE-9)". SITE-10 cannot close without this ticket.
- **SITE-3's DEVIATIONS line** (the temporary duplication of Demo D's leaves in `review/mocks/_components/home-d/`) ends here. Record that it ended.
- **What this slice is NOT (binding):** it changes no public page's markup, styles, copy or behaviour. If a public file must change for any reason other than a comment that names the deleted layer, STOP and ask. Such a change means the public site depended on `review/`, which D-SITE-19 said could not happen.
- **Ground truth:**
  - The layer on disk: `app/review/**`, `review/**`, `lib/review/**`, `lib/validators/review.ts`, `proxy.ts`.
  - `brand/kits/kryshan.ts`: SITE-1's production kit, Kit D's tokens without the review-only fields. It's the live source of every hex in the style guide.
  - `lib/color/contrast.ts`: stays after deletion.

**Rulings this slice makes (labelled, logged):**

1. **The style guide ships in SITE-9, not SITE-10.** Spec §2 names SITE-10 as its owner. The build order moves it here because the export must come before the deletion, and the scope sheet governs placement. Logged (DEVIATIONS: spec §2's "Owner: SITE-10" is superseded).
2. **The tag is an annotated `review-round-final` on the export commit, pushed to `origin`.**
   - Taylor creates it, or tells the session in so many words to run `git tag -a review-round-final -m "Last commit with the review layer, before SITE-9's deletion"` and `git push origin review-round-final`.
   - The builder never tags on its own initiative.
   - Recover the layer later with `git checkout review-round-final -- app/review review lib/review …`.
   - Logged.
3. **One PDF, `docs/STYLE-GUIDE.pdf`:** the brand page first, then the Kit D page.
   - Print both with headless Chrome against `build:agent` plus `start:agent`, with `REVIEW_GATE=off`.
   - The review chrome (bar, comment layer and pins, comments sheet, toasts, placeholder ribbon) is hidden in print, and the dark ground prints. This is done by a print-only change **inside the review layer**, in the export commit. It's deleted with the layer a commit later.
   - `[PROVISIONAL — Taylor]`. Logged.
4. **Orphans left by the deletion are deleted:**
   - Delete `components/composed/brand/kit-scope.tsx`: only review pages used it; BRANDING §2 is updated to match.
   - Delete `components/primitives/sonner.tsx`: its only importer was the gated layout. Deleting it is what lets `sonner` go, per spec §2's "if nothing else imports them". It can come back with `npx shadcn@latest add sonner`.
   - Delete `next-themes` and `@tailwindcss/typography`, plus its `@plugin` line in `app/globals.css`. Their only importers were that primitive and the layout page's `prose`. BRANDING §5 already forbids a `next-themes` provider.
   - **Keep:**
     - `lib/color/contrast.ts` (BRANDING §6 names it)
     - `server-only` (CONVENTIONS §4 names it as the house tool)
     - every other shadcn primitive
   - `[PROVISIONAL — Mason]`. Logged.
5. **The lint config loses every review pattern:**
   - the `forbid(["review/**"], …)` block
   - `@/review/*` in each remaining list
   - SITE-1's D-SITE-19 block (`@/review/*`, `@/lib/review/*`, `@/app/review/*`)

   The paths no longer exist, so any import of them fails `check-types` on its own. The header comment's layer chain becomes `lib` → `brand` → `content` → `components` → `app`. `[PROVISIONAL — Mason]`. Logged.
6. **Docs beyond spec §2's list are updated too.** These also describe the layer as live:
   - `docs/BRANDING.md` (§2, §4 step 3, §6, §7)
   - `docs/README.md`
   - `.env.example`'s header

   `docs/REVIEW-LAYER.md` and `docs/REVIEW-BACKEND-CONTRACT.md` are **kept** as history. Each gets one banner line at the top, and nothing else changes: frozen tickets cite them, and the tag holds the code they describe. Logged.
7. **Layout D's markdown is preserved.** It's the only copy of the layout he approved (Layout A's three are already in `docs/client/`). Copy `review/layouts/kryshan-d.md` byte for byte to `docs/client/kryshan-06-layout-D.md` and add one row to `docs/client/README.md`'s table. Vitrine's files are otherwise untouched. Logged.

## Behavior & states

**No new surface.** The observable result: two new docs, a tag on `origin`, 404s under `/review`, and public routes unchanged.

**Phase 1, export (one commit, "SITE-9: style guide export"):**
1. Write `docs/STYLE-GUIDE.md` with these sections, in order:

| # | Section | Source | Must hold |
|---|---|---|---|
| 1 | What this is | — | Two or three sentences: the site's visual and verbal rules; the PDF shows the kit as he approved it; the live values are in `brand/kits/kryshan.ts`. |
| 2 | The pillars | `docs/client/kryshan-04-brand-pillars.md` Step 8 (Card A v2); spec §7.2 | Wicked, but not nasty · Resourceful, but never cheap · Galvanizing, but not domineering, in his order, with each guardrail and the tie-breaks. Generous appears nowhere. |
| 3 | Colour roles and contrast | Spec §4.1's role table; hexes from `brand/kits/kryshan.ts` | Seven rows: ground, text, secondary, surface, hairline, accent (large only), small accent (`--link`). Each ratio is computed with `lib/color/contrast.ts`. The rules: red 500 only at ≥24 px or the 20 px/800 wordmark, and one red phrase per page at most. |
| 4 | Type | Spec §4.1 type table and H1 sizes | Archivo only. The seven steps with weight, width and size. Italic for press quotes only. |
| 5 | Tile and panel anatomy | Spec §4.3 | Tile: frame, scrim, lane label, title, genre line, play mark, blur, link behaviour, accessible name. Panel: the strip (Copy link left, ✕ right), then player, title, genre line, lane label, logline, short awards, and the email last with the film as the subject. The link-out variant. |
| 6 | The email hand-off | Spec §4.3 (Vesper C6) | The sentence in the Lead step, then the address in `--link`. Where it ends a page (Work, detail, About, Teaching) and where the address stands alone (panel, Contact). The example is Teaching's Locked sentence, "If you run a program or want coaching, email me." Don't use a Write string. |
| 7 | Voice and words | Spec §7.2 to §7.4 | Carried over whole, not linked: the document must stand alone. |
| 8 | Never | Kit D's `never` (`review/kits/kryshan-a.ts` plus the four lines in `kryshan-d.ts`) | Every line verbatim. Read it **before** Phase 3, because after that it exists only in the tag. |
| 9 | The PDF | — | One line linking `STYLE-GUIDE.pdf` and saying what its two parts are. |

2. Add the print-only change inside the review layer (ruling 3), then `yarn build:agent`, then `REVIEW_GATE=off yarn start:agent`. Print `/review/brand` and `/review/kits/kryshan-d` to the scratchpad and merge them into `docs/STYLE-GUIDE.pdf`.
3. Copy the layout D markdown (ruling 7).
4. Add a row for `STYLE-GUIDE.md` to `docs/README.md` (that file's other edits come in Phase 3). Commit.

**Phase 2, the tag gate.** STOP. Tell Taylor the commit hash and ask him to tag it (ruling 2). Continue only when `git ls-remote --tags origin review-round-final` returns that hash.

**Phase 3, deletion (one commit, "SITE-9: delete the review layer").** Everything in criteria 6 to 17.

**Phase 4, docs (in the same commit or the next).** Criterion 18.

**Taylor's actions (not agent work):**
- the tag
- deleting `REVIEW_GATE`, `REVIEW_ACCESS_CODE`, `REVIEW_SESSION_SECRET`, `REVIEW_BACKEND_URL` and `REVIEW_INGEST_KEY` from the Vercel project's Production, Preview and Development environments once the deletion deploys
- ticking KR-4 in `PROGRESS.md`, which is still open although the round ran (`docs/client/_direction/review-stage-feedback.md`)
- optionally, a line to Kryshan that the review link is retired and the style guide replaces the kit pages

The builder records in the closing note what Taylor confirmed, with dates.

**States:** pre-export · exported (commit A) · tagged · deleted (commit B) · docs current · verified.

**Failure and edge states (named):**
- **`/review/brand` or the Kit D page fails to render at export time** (for example, a SITE-2 field change the mocks didn't absorb): fix it minimally **inside the review layer**, log it, and export. Never change a public file to make a review page render.
- **The PDF prints the review bar, prints without the dark ground, or has text as an image:** the print change is incomplete. Fix it in the review layer and re-print. The tag must land on the commit whose PDF is right.
- **The tag is absent, points at another commit, or isn't on `origin`:** STOP. Don't delete. The deletion commit's parent must be the tagged commit.
- **A public file fails to compile after deletion:** the public site imported the layer, which D-SITE-19 forbade. STOP and report the import. Don't restore the file, and don't copy the needed code out of the tag without Mason's call.
- **`check-types` fails on missing modules under `.next-agent/` or `.next-build/`:** those are stale generated route types from before the deletion. Delete those two folders only (never `.next/`, which is the human's) and re-run.
- **Screenshots differ before and after:** something public depended on a deleted file (a `prose` class, a `KitScope`, a toast). STOP and report. The fix belongs in the public component's own ticket scope, not in a re-added dependency.

## Non-negotiables (this slice)

- **Export, then tag, then delete.** No deletion commit exists until the export commit is tagged on `origin`.
- **The public site does not change.** It renders the same, stays static (no ƒ route), and makes no request to a video host before a tap.
- **The whole list goes.** Every path, symbol, variable, lint pattern and package in spec §2, plus rulings 4 and 5. A partial deletion is a failed ticket.
- **Deliverables survive.** Layout D's markdown, Kit D's never-list and the brand page's content are all captured before deletion.
- **Frozen records stay frozen.** Don't edit `docs/specs/01-review-round/`, `docs/specs/02-review-demo-d/`, any closed ticket, or `docs/client/`'s deliverables (only the new layout D copy and one index row are added). `DEVIATIONS.md` and `TECHNICAL-DECISIONS.md` are append-only.
- **No copy.** The style guide carries existing words (spec, 04 Step 8, Kit D). It invents no tagline, example sentence or new rule.

## Data & content

**Database: none (static site, no database).**

**Content files:** none changed. Comments in `content/site.ts` that name the review mocks are reworded, and no values change.

**Placement** (Mason's call, build order scope sheet; rulings 4 to 7 are `[PROVISIONAL — Mason]`):
- **New:**
  - `docs/STYLE-GUIDE.md`
  - `docs/STYLE-GUIDE.pdf`
  - `docs/client/kryshan-06-layout-D.md`
- **Deleted:**
  - `app/review/`
  - `review/`
  - `lib/review/`
  - `lib/validators/review.ts`
  - `proxy.ts`
  - `components/composed/brand/kit-scope.tsx`
  - `components/primitives/sonner.tsx`
- **Edited:**
  - `lib/env.ts`
  - `lib/config.ts`
  - `lib/routes.ts`
  - `app/robots.ts`
  - `next.config.ts`
  - `eslint.config.mjs`
  - `.env.example`
  - `.prettierignore`
  - `app/globals.css`
  - `package.json` and `yarn.lock` (via `yarn remove`)
  - comments only: `app/layout.tsx`, `app/(site)/layout.tsx`, `app/sitemap.ts`, `brand/types.ts`, `brand/production.ts`, `lib/color/contrast.ts`, `content/site.ts`
  - docs: `AGENTS.md`, `README.md`, `docs/CONVENTIONS.md`, `docs/PERFORMANCE.md`, `docs/BRANDING.md`, `docs/NEW-CLIENT.md`, `docs/README.md`, `docs/client/README.md` (one row), and the banner line in `docs/REVIEW-LAYER.md` and `docs/REVIEW-BACKEND-CONTRACT.md`

**Validators:** none added or changed.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

- **Public site:** no change, and the walk proves it. The skip link, landmarks, one h1 per page and focus visibility are identical before and after.
- **The PDF:** text is selectable real text, not an image. Colour swatches keep their labels, so the document doesn't rely on colour alone.
- **`docs/STYLE-GUIDE.md`:** one H1, sections as H2, tables with header rows.

## Acceptance criteria (observable; checked at `build:agent` + `start:agent`, before and after the deletion commit)

**Export and tag**
1. `docs/STYLE-GUIDE.md` has the nine sections in the order of the Phase 1 table. Section 8 reproduces every line of Kit D's `never` verbatim: compare with `git show review-round-final:review/kits/kryshan-a.ts` and `…/kryshan-d.ts`. The word "Generous" appears nowhere in the file.
2. Every hex in section 3 equals the value in `brand/kits/kryshan.ts`. Every ratio is computed with `lib/color/contrast.ts` to one decimal, and the closing note shows how. Where a computed ratio differs from spec §4.1 (16.7, 7.6, 12.5, 3.4, 6.9), the computed number is printed and a DEVIATIONS line says so.
3. `docs/STYLE-GUIDE.pdf` opens in Preview:
   - It contains the brand page, then the Kit D page.
   - The dark ground and swatches print in colour.
   - Nowhere does it show the review bar, the Comment button, the comment count, pins, the comments sheet, a toast or a ribbon.
   - Its text can be selected and searched (search for "Wicked").
4. `cmp review/layouts/kryshan-d.md docs/client/kryshan-06-layout-D.md` exits 0 at the export commit. `docs/client/README.md` gains exactly one table row, and nothing else in `docs/client/` changes (`git diff --stat docs/client`).
5. `git rev-parse review-round-final^{commit}` equals the export commit. `git ls-remote --tags origin review-round-final` returns it. `git show review-round-final:proxy.ts` succeeds. The deletion commit's parent is the tagged commit or a descendant that deletes nothing.

**Deletion (each proven by the command shown or by the file's diff)**

6. `git ls-files app/review review lib/review lib/validators/review.ts proxy.ts components/composed/brand/kit-scope.tsx components/primitives/sonner.tsx` prints nothing.
7. `lib/env.ts`:
   - has no `REVIEW_*` key in `server` or `runtimeEnv`
   - has no `reviewLayerEnabled`, `reviewGateOn` or `reviewBackendConfigured`
   - has a header comment that no longer mentions the review layer
   - leaves `CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL`, with their fallbacks (D-SITE-18, D-SITE-24), unchanged in the diff
8. `lib/config.ts` has no `REVIEW_SESSION_MAX_AGE` or `REVIEW_COOKIE`. `lib/routes.ts` has no `REVIEW_PREFIX`, `reviewRoutes`, `isGatedReviewPath` or `isReviewPath`. In both files the diff shows removals only: `siteRoutes`, `LEGACY_PATHS` and `SITE` are untouched.
9. `app/robots.ts` imports nothing from the review routes. `curl -s localhost:4510/robots.txt` shows `Allow: /`, no `Disallow` line, and an absolute `Sitemap:` line built on `SITE_URL` (spec §8).
10. `next.config.ts` has no `outputFileTracingIncludes`. Its `redirects()` and everything else are unchanged in the diff.
11. `.env.example` has no "Review layer" section and no `REVIEW_` variable, and its header comment names only the site's variables. `.prettierignore` has no `review/layouts` line.
12. `eslint.config.mjs` has no `review` in any pattern or `files` glob, per ruling 5. **The remaining walls still work:** a temporary `import "@/app/layout"` added to a `lib/` file makes `yarn lint` fail with the upward-import message. Revert it and say so in the closing note.
13. `git grep -n -E "data-review-(id|chrome)" -- app components` prints nothing.
14. `package.json` no longer lists `react-markdown`, `remark-gfm`, `sonner`, `next-themes` or `@tailwindcss/typography`, and `yarn why <each>` reports it isn't depended on. `app/globals.css` has no `@plugin "@tailwindcss/typography"`. Its `KitScope` comment is rewritten.
15. **Zero-hit sweep.** This prints nothing:
    `git grep -n -E "@/review/|@/lib/review/|@/app/review/|lib/review/|reviewRoutes|isGatedReviewPath|isReviewPath|REVIEW_[A-Z_]+|data-review-|review_session|outputFileTracingIncludes|KitScope|react-markdown|remark-gfm|sonner|next-themes|tailwindcss/typography" -- . ':!docs' ':!yarn.lock'`
16. **Word sweep.** Every hit from `git grep -n -i "review" -- app components lib content brand '*.ts' '*.mjs' '*.css' '*.json' .env.example` is listed in the closing note, and each is "review" as an ordinary English word (for example, "enforced by lint rather than by review"). None names the layer.
17. **Docs sweep.** Every hit from `git grep -n -i "review" -- AGENTS.md README.md docs/CONVENTIONS.md docs/PERFORMANCE.md docs/BRANDING.md docs/NEW-CLIENT.md docs/README.md` is listed in the closing note. Each is either a past-tense pointer to the tag or the retired docs, or ordinary English. No line describes `/review`, `review/` or `proxy.ts` as present.

**Docs**

18. Each file below says the following:
    - **`AGENTS.md`:**
      - "What this is" names this site: Kryshan Randel's portfolio, kryshanrandel.com.
      - Source precedence item 3 is gone or points to the retired docs as history.
      - The guardrails read: layers `lib` → `brand` → `content` → `components` → `app`; no hex outside `brand/`; no request-time reads anywhere on the site.
      - The repo map has no `app/review/`, `review/` or `proxy.ts` row, and the `lib/` row has no review client.
      - The "For anything under `/review`" instruction is gone.
    - **`README.md`:** this site's name and one-line description (NEW-CLIENT §2's rename, never done). The read-first list, the layout block, and a one-line "The review round" pointer to `review-round-final` in place of its paragraph.
    - **`docs/CONVENTIONS.md`:**
      - §0 rules 2, 7 and 9 without the review exceptions
      - §2's tree without `review/` and `proxy.ts`
      - §3's matrix without the review row and column
      - §4 without the `lib/review/*` examples
      - §5 without the `data-review-id` bullet
    - **`docs/PERFORMANCE.md`:** §2's `force-dynamic` line says no route on this site uses it. §8 doesn't mention `/review`.
    - **`docs/NEW-CLIENT.md`:** a note at the top that this repo is a client site past its review round (tag `review-round-final`). Steps 3, 4, 5 and 6 are marked done, and their `/review` instructions are not presented as current.
    - **`docs/BRANDING.md`:**
      - §2 without review kits and `KitScope`
      - §4 step 3 in the past tense with the tag
      - §6 naming `lib/color/contrast.ts` and `STYLE-GUIDE.md`, not the kit page
      - §7 pointing at `STYLE-GUIDE.md` and `.pdf`
    - **`docs/README.md`:** a `STYLE-GUIDE.md` row. The two REVIEW rows are marked retired.
    - **The two REVIEW docs:** a one-line banner and no other change (`git diff` shows a single added line and a blank line each).
    - **Link check:** `yarn docs:check-links` passes.

**The site after deletion**

19. `yarn build:agent`'s route table lists no `/review` route and no Proxy or Middleware line. Every route is ○ or ●; none is ƒ.
20. On `start:agent`:
    - `/review`, `/review/access`, `/review/brand` and `/review/kits/kryshan-d` return 404 with the site's 404 page: bar, footer, and "That page doesn't exist. The work does." (spec §6.7).
    - `curl -sI localhost:4510/` and `…/work` carry no `X-Robots-Tag` header.
21. **The public site is unchanged.** Screenshots before the deletion commit (at the tagged commit) and after are identical at 1440, 768 and 390 for:
    - `/`
    - `/work`
    - `/work?role=camera`
    - one embed detail page
    - `/about`, `/teaching`, `/contact`
    - an unmatched path

    A cold load of `/` still makes no request to YouTube, Vimeo or ytimg.
22. Closing records:
    - a DEVIATIONS line for each of rulings 1 and 3 to 7, as applied
    - a line recording that SITE-3's `home-d` duplication ended
    - the closing note records Taylor's confirmations (the tag, Vercel `REVIEW_*` deleted in all three environments, KR-4) with dates
23. `yarn verify` passes (lint with zero warnings, check-types, build:agent). A browser walk at 1440, 768 and 390 on every route in criterion 21, via `yarn dev:agent` (never `yarn dev` or `yarn build`). A closing note in this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Print:** `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf=<scratchpad>/brand.pdf http://localhost:4510/review/brand`, then the same for the kit page.
  - Headless Chrome drops backgrounds unless the page sets `print-color-adjust: exact`. Put it on the kit scope wrapper or on `html` in print, inside the review layer.
  - Tailwind's `print:hidden` variant hides the chrome.
- **Merge:** macOS ships `"/System/Library/Automator/Combine PDF Pages.action/Contents/MacOS/join" -o docs/STYLE-GUIDE.pdf brand.pdf kit.pdf`. No `pdfunite` or `qpdf` on this machine.
- **The gate** reads `REVIEW_GATE` at request time in `proxy.ts`, so `REVIEW_GATE=off yarn start:agent` works against an existing `build:agent`. Don't edit `.env.local` (agents may not; DEVIATIONS 2026-09-24).
- **Contrast** can be computed in a scratch script with `node --experimental-strip-types` importing `lib/color/contrast.ts` (it's pure). The kit page also prints the ratios it covers. `--link` may not be among them, since BRANDING §3a says `extraVars` aren't rendered.
- **Packages:** `yarn remove react-markdown remark-gfm sonner next-themes @tailwindcss/typography`. Never npm.
- **Screenshots:** the browser pane's screenshots at the three widths, before and after, side by side, are enough. A pixel-diff tool isn't required.
- **`lib/validators/` becomes empty and disappears.** CONVENTIONS §4's rule about zod schemas in `lib/validators/` stays as law for any future action.

## Dev's call

- How the review chrome is hidden in print (utility classes or a print stylesheet), as long as the change sits inside the review layer.
- The PDF paper size (Letter recommended) and margins.
- Whether `STYLE-GUIDE.md` includes screenshots of a tile and an open panel. If it does, they go in `docs/style-guide/`, taken from the live build, never reference imagery.
- The wording of every doc edit, in the house voice: plain, present tense, no history lessons beyond the tag pointer.
- Whether the docs edits share the deletion commit or follow it.

## Out of scope

- **Launch-tier validators, `docs/EDITING.md`, Lighthouse, DNS, ownership:** SITE-10.
- **Any page copy, including Write strings as style-guide examples:** SITE-C. Kryshan approves.
- **Removing other unused shadcn primitives or auditing other dependencies:** not in spec §2. It's boilerplate hygiene; pin it for `client-boilerplate` (Taylor, separate repo).
- **Backporting lessons to `client-boilerplate`:** Taylor, separate repo.
- **The round's records in taylor-aucoin** (comments, the submission): that repo. Nothing here touches them.
- **`docs/client/` housekeeping (the raw media folders):** SITE-10's decision queue.
- **Editing `brand/kits/kryshan.ts`'s values:** SITE-1 owns the kit. This ticket only rewords comments.

## Depends on

- **SITE-3, SITE-4, SITE-5, SITE-6, SITE-7, SITE-8:** Complete in `PROGRESS.md`. Every public page exists, so the before and after comparison covers the whole site, and SITE-3's port has ended the public site's last reason to read `review/`.
- SITE-1 and SITE-2 are complete transitively (the production kit, the lint walls, the content model).
- **Not SITE-C.** The style guide carries no page copy.

## Recommended Claude Code execution

**Sonnet 5.** The deletion is enumerated and every step has a proving command, so the risky reasoning is already pinned by the ticket. The judgement left is small: the print change and the docs wording. The failure mode of choosing down: a smaller model treats spec §2's path list as the whole job. It deletes the folders, then leaves the docs claiming `/review` exists, comments naming deleted files, and `KitScope` and the `prose` plugin orphaned. Or it deletes before the tag lands. Opus 5.5 is also fine; it isn't needed.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-9 — Style guide exported, then the review layer deleted** (`docs/specs/03-site-build/SITE-9-style-guide-and-review-removal.md`). Model: **Sonnet 5**. **Export, then stop for Taylor's tag, then delete everything on the list, and the public site must not change by a pixel.**
>
> Read first, in order:
> 1. this spec
> 2. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §2 (style guide, deletion list), §4.1, §4.3, §7.2–§7.4
> 3. `docs/specs/03-site-build/00-build-order.md` (SITE-9 scope sheet, ordering constraints)
> 4. `docs/REVIEW-LAYER.md` §6
> 5. `docs/BRANDING.md`
> 6. `AGENTS.md`
> 7. `docs/CONVENTIONS.md`
> 8. `docs/PERFORMANCE.md`
> 9. `docs/client/kryshan-04-brand-pillars.md` Step 8
> 10. `docs/specs/README.md` (kickoff contract)
> 11. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - After the export commit, STOP, give Taylor the hash, and wait until `review-round-final` is on `origin`. Never tag on your own initiative.
> - Change no public file except comments that name the layer. If a public file needs more, STOP and report.
> - Routes come from `lib/routes.ts`; env via `lib/env.ts`; no hex outside `brand/`.
> - Client leaves never import `@/lib/config` (props).
> - No upward imports; nothing public imports `review/`.
> - Never `yarn dev` or `yarn build`; use `dev:agent` and `build:agent`. Never npm.
> - Don't edit frozen tickets or Vitrine's deliverables.
>
> Close in three places: this ticket's Status, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (plus `TECHNICAL-DECISIONS.md` if Mason's calls changed). Then tick `03-site-build/00-build-order.md`. Run `yarn verify` and `yarn docs:check-links`. Close with 3–5 lines, and list every remaining "review" hit from criteria 16 and 17.
