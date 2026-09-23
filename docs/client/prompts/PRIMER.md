# Primer — running the Kryshan review round (KR-1, then KR-2, then KR-3)

Paste the block below into a fresh Claude Code thread opened in `/Users/taylor/lighthouse/clients/kryshan-film-portfolio`. Run one ticket per thread, in order: KR-1 (creates the shared content), KR-2, KR-3. Each thread ends with a commit on the working branch. After KR-3, KR-4 (mint the round, set env, deploy, walk, send) is a short thread of its own.

Everything a thread needs is already in the repo. No attachments.

---

```
You are Mason, principal engineer, building ONE ticket in this repo: KR-1 — Review trio A (kit A, layout A, mock home A) plus the shared client content that KR-2 and KR-3 reuse. The repo is /Users/taylor/lighthouse/clients/kryshan-film-portfolio, a copy of client-boilerplate with its foundation (CB-0) and review layer (CB-1) done and verified.

READ FIRST, in order, before writing anything:
1. AGENTS.md (the guardrails; never `yarn dev` or `yarn build`, use `yarn dev:agent` on :4500 and `yarn build:agent`).
2. docs/specs/KR-1-review-trio-a.md (the ticket) and docs/specs/README.md (kickoff contract, closure protocol).
3. docs/client/prompts/kryshan-07-cc-prompt-A.md (the brief, deliverable by deliverable) and docs/client/prompts/kryshan-07-cc-prompts-readme.md.
4. docs/CONVENTIONS.md, docs/BRANDING.md, docs/REVIEW-LAYER.md (§5 is the seam you are filling), docs/PERFORMANCE.md.
5. The code you extend: brand/types.ts (BrandKit, including `extraVars`), brand/kit-vars.ts, components/composed/brand/kit-scope.tsx, components/composed/media/{frame,video-embed}.tsx, lib/media/embed-url.ts, lib/color/contrast.ts, lib/routes.ts, lib/config.ts (SITE), review/kits/{types,index,placeholder-a}.ts, review/layouts/index.ts, review/mocks/{index,placeholder-home}.tsx, app/review/(gated)/kits/[kit]/page.tsx.
6. The client material: docs/client/branding/kryshan-05-tokens.json (only source of colour), docs/client/kryshan-06-layout-A.md, docs/client/kryshan-03-copy-and-voice.md §8, docs/client/kryshan-02-success-criteria.md §3.5 and §10, docs/client/project-images/MANIFEST.md. The PDF at docs/client/branding/ is the visual target; never copy it into public/.

WHERE THE PROMPT AND THE REPO DIFFER (the repo wins; one DEVIATIONS.md line each):
- The BrandKit type is in brand/types.ts, not brand/kit.ts. Review kits are `ReviewKit` (review/kits/types.ts): a BrandKit plus letter, tagline, thesis, voice, never, placeholder. Put the essence line in `tagline` and the PDF's never-list in `never`.
- Site identity (name, tagline, email, nav, socials) lives in lib/config.ts `SITE`, not content/site.ts. Extend SITE with the socials and the roles/place lines; create content/site.ts only for client facts that are copy rather than identity, or skip it and say so.
- shadcn components are in components/primitives/ (Base UI: `render={<Link/>}` with `nativeButton={false}` instead of `asChild`). Our components are in components/composed/. The footer is components/composed/site/site-footer.tsx and reads SITE; the mock may reuse it.
- Extra CSS variables a kit needs (`--font-quote`, `--surface-dark`, `--tag-*`) go in the kit's `extraVars` (docs/BRANDING.md §3a).
- Fonts: load with next/font/google at module scope inside the kit file, set the slot's stack to `var(--font-x), fallback`, and put the loader's className in `fontClassName`. Archivo's width axis: `axes: ["wdth"]`; condensed display via `font-stretch` in a utility.
- Routes are typed (`typedRoutes: true`); mock links are inert (`href="#"`, `aria-disabled`), so this does not bite. Anything real goes through lib/routes.ts.
- Posters already exist at public/media/posters/<slug>.jpg (27 files, 1600 px max; glimpse and the-bully-solution are native SD). Do not reconvert; wire them. Six mappings are marked "likely" in MANIFEST.md: keep them, and list them in your closing note as needing confirmation. Two are screen captures with odd ratios; the Frame component's object-cover handles it.
- `posterStatus: "replace"` (directors-reel, the-bully-solution, glimpse) renders the existing PlaceholderRibbon text "Frame to be replaced" on the frame, not on the page.
- Registries: replace the placeholder-a entries in review/kits/index.ts, review/layouts/index.ts and review/mocks/index.ts with kryshan-a; leave placeholder-b and placeholder-c in place for KR-2/KR-3. Delete review/kits/placeholder-a.ts, review/layouts/placeholder-a.md; keep placeholder-home.tsx while B and C still use it.

PROCESS
- Turn one: state the ticket, list every file you will create or change, then read. No code before the list.
- Build the shared content first (content/projects.ts, 27 entries, every value traceable to 02 §3.5; leave optional fields out rather than invent), then the kit, then the layout copy, then the mock, then the index wiring.
- Verify: `yarn verify`, then `yarn dev:agent` and a browser walk of /review/kits/kryshan-a, /review/layouts/kryshan-a, /review/mocks/home-a at 1440, 1024 and 390 (the gate code is in .env.local; if there is none, create .env.local with REVIEW_ACCESS_CODE and REVIEW_SESSION_SECRET for local use and say so). Check: no iframe before tap, one cell open at a time, Escape closes, contrast lines on the kit page, no placeholder ribbon on the three routes.
- Close in three places: the ticket's Status line, docs/specs/PROGRESS.md, docs/specs/DEVIATIONS.md (one line per divergence; real-alternative choices go to TECHNICAL-DECISIONS.md as M-KR-n). Tick 00-build-order.md. Commit: `KR-1: review trio A (kit, layout, mock home)`.
- Closing note, 3–5 lines: what shipped, deviations, the poster mappings still to confirm, the one thing KR-2 must know.

Do not build any page other than Home. Do not touch trios B or C beyond the index listing. Do not invent facts, numbers, quotes, durations or dates. Do not show anything NDA'd or the Bully Solution frame on Home.
```

---

## For KR-2 and KR-3

Same block with these substitutions: the ticket file (`KR-2-review-trio-b.md` / `KR-3-review-trio-c.md`), the prompt (`…prompt-B.md` / `…prompt-C.md`), the layout file, the tokens key (`B` / `C`), and this line replacing the shared-content paragraph:

> KR-1 is done: content/projects.ts, the posters and trio A exist. Reuse them; if anything is missing, stop and say so. Read review/kits/kryshan-a.ts and review/mocks/home-a.tsx first so B (or C) matches A's patterns. Replace only the placeholder-b (or -c) registry entries and delete the matching placeholder files; after KR-3, delete review/mocks/placeholder-home.tsx too.

KR-2 specifics: the fourth font (Fraunces Italic, `opsz`) as `--font-quote` and the dark surface `neutral[900]` as `--surface-dark`, both via `extraVars`; the lightbox on the vendored dialog (`components/primitives/dialog.tsx` exists).
KR-3 specifics: `--tag-directing`, `--tag-camera`, `--tag-editing` via `extraVars`, used only on role tags and the page's active labels; the index is a real `<table>` on desktop and cards below 768.

## KR-4 (after all three)

In taylor-aucoin: apply migration `0017` and `db/supabase/setup/06-review-rls.sql`, then `yarn review:create --client "Kryshan Randel" --label "Phase 1 · kits, layouts, home pages"`. In this repo's Vercel project: set `NEXT_PUBLIC_SITE_URL`, `REVIEW_ACCESS_CODE`, `REVIEW_SESSION_SECRET`, `REVIEW_BACKEND_URL=https://tayloraucoin.com`, `REVIEW_INGEST_KEY`. Deploy, open `/review/access`, confirm the bar says Connected, leave one test comment and delete it, walk all nine pages on a phone, then send Kryshan the URL and the code in separate messages.
