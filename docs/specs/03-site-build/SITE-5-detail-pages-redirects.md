# SITE-5 — Detail pages, redirects, sitemap and structured data: one page per showable film, every old URL lands, nothing held leaks

**Epic:** SITE — Kryshan Randel's live site · **Step 2 (The rest of the site)** · Size: M
**Slice type:** static route generation plus build-time routing data. The risks are:
- an old WordPress link that dead-ends or loops (the page a producer was sent years ago)
- a held or NDA'd film reachable by URL, sitemap, redirect target or structured data
- a second list of public films forked from `SHOWABLE_PROJECTS` (D-SITE-8's failure mode)
- a player that needs two taps, or makes a video-host request before one

**Vigil:** redirects and the held/NDA boundary. Review by **inducing** the failures, not by reading the config.

**Status:** Draft → ready for execution (authored 2026-09-24)

> **Vigil: verification depth.**
> 1. Run every `LEGACY_PATHS` entry through `curl -sIL` against `yarn build:agent && yarn start:agent` (:4510). Report a table: source · hops · each status · final path · final status.
> 2. Request the canonical and the trailing-slash form of three detail pages, and of `/about`.
> 3. Request `/work/<slug>` for every held slug, every NDA slug and one invented slug.
> 4. Temporarily break the data and confirm each one fails `yarn build:agent` with a message written for him, then revert:
>    - a legacy entry naming a slug that isn't in `PROJECTS`
>    - a legacy source equal to a live route
>    - a redirect chain
> 5. Cold-load a detail page with the network tab open. Then load it with JavaScript disabled.
>
> QA states which paths it exercised: showable-embed · showable-link-out (temporary local fixture) · held · NDA · unknown slug · trailing slash · legacy-to-showable · legacy-to-held · legacy-to-page · each of the three build failures.

---

## Outcome

Every showable film has its own page at `/work/<slug>`. It's a page he can send a producer: the poster with one play button, the title, genre line, lane label and logline, a quiet "Copy link", his email with the film's title as the subject, then the story, awards, press and articles where they exist, and previous/next through `workOrder()`. A held or NDA'd film has no page, and its URL returns the site's 404. Every URL from the old WordPress crawl reaches the right new page in at most two hops, the last a 308: a showable film's old page goes to its detail page, a held one to `/work`. The sitemap lists the five pages and every showable detail page, and nothing else. Each detail page carries a `VideoObject` in JSON-LD.

This slice doesn't touch Work's grid or filters (SITE-4), write any logline, story or press (SITE-C), or change the host-level `http`→`https` and `www`→apex redirects (Vercel domain settings, SITE-10).

## Why / intent

- **Spec §6.3** is the page: sections 1–8, the text table, the per-film notes, metadata, `VideoObject`, and the acceptance seeds.
- **Spec §3** gives the route, the heading outline (h1 title · h2 Awards and selections · h2 Press · h2 Articles, each only when present) and `dynamicParams = false`.
- **Spec §8** covers titles, canonicals, the sitemap and the redirect rules (D-SITE-25).
- **D-SITE-8:** one predicate, one list. Detail pages, the sitemap and the redirect builder all read `SHOWABLE_PROJECTS`. None of them filters `PROJECTS` itself.
- **D-SITE-9:** link-outs show "Watch on {host} ↗" and are never embedded.
- **D-SITE-10:** poster-first, never autoplay on load.
- **D-SITE-11** `[PROVISIONAL — shown to him at first look]`: "Copy link" sits under the heading block.
- **D-SITE-20:** no heading, section or gap for missing content.
- **D-SITE-23:** the mailto carries `?subject={Title}`.
- **D-SITE-26:** next/previous use `workOrder()`, never the active filter.
- **What this slice is NOT (binding):**
  - no copy written (the loglines are SITE-2's mechanical fill; everything else is SITE-C)
  - no second list of public films
  - no autoplay
  - no panel on this page
  - no story in the panel (D-SITE-22)
- **Ground truth, consumed and never rebuilt:**
  - SITE-1: `siteRoutes`, `LEGACY_PATHS`, the chrome, `--bar-h`
  - SITE-2: `SHOWABLE_PROJECTS`, `findShowableProject`, `workOrder()`, `projectMetaLine`, `POSTERS`, `content/validate.ts`
  - SITE-3:
    - `components/composed/work/film-player.tsx`
    - `components/composed/site/copy-button.tsx`
    - `components/composed/site/email-hand-off.tsx`
    - `components/composed/site/json-ld.tsx`
    - `lib/structured-data.ts`

## Rulings this slice makes (labelled, logged)

- **"One tap plays (`VideoEmbed` with no autoplay)" means the player isn't started on load.** Read spec §6.3 item 3 this way. The page renders the poster and the play circle, and the tap mounts the iframe with `autoplay=1`, as everywhere else. **One tap plays; never two.** Passing `autoplay=0` to the iframe would force a second tap and break D-SITE-10's "one more tap than the panel". Logged (DEVIATIONS, as a reading).
- **The pre-tap play control can be a real link.** `components/composed/media/video-embed.tsx` gains an optional `watchHref`. When it's set:
  - the control renders as `<a href={watchHref}>`
  - a plain primary click is intercepted and mounts the player
  - a modifier or middle click, or no JavaScript, goes to the host's watch page (`watchUrl()` in `lib/media/embed-url.ts`)

  It's the tile's grammar (D-SITE-3) applied to the play circle, and it's how spec §6.3's "Without JS, the play circle is a link" is met. Consumers that don't pass `watchHref` are unchanged. If SITE-3's `film-player.tsx` already provides this, reuse it and skip the edit. Logged.
- **`embedUrl()` takes an option to leave autoplay off.** It becomes `embedUrl(video, { autoplay = true } = {})`. `VideoObject.embedUrl` is built with `{ autoplay: false }`, the "plain embed" spec §6.3 asks for. The iframe keeps the default. Logged.
- **Redirect sources are stored without a trailing slash, and an entry that would redirect to itself is dropped.** Next 16 runs its own trailing-slash redirect (`/:path+/` → `/:path+`, 308, `priority: true`) before any custom redirect (`node_modules/next/dist/lib/load-custom-routes.js`). So:
  - `/project/jack/` takes one hop to `/project/jack`, then one hop to `/work/jack`: two hops, both 308.
  - `/about/` reaches `/about` in one hop with no entry at all. An explicit `/about` → `/about` would loop.

  Logged.
- **The redirect builder refuses bad data at config load.** `redirects()` in `next.config.ts` throws (failing `next build`) when:
  - a legacy entry names a project slug that isn't in `PROJECTS`
  - a normalized source equals a live route and points elsewhere (it would shadow the page, because redirects run before the filesystem)
  - a destination is also a source (a chain)
  - two entries share a source with different destinations

  Every message names `lib/routes.ts` or `content/projects.ts`, the entry, and the fix, in plain words. Logged.
- **The detail page's email hand-off block is omitted until its sentence exists.** The sentence is a **Write** string (spec §6.3, SITE-C). Without it, the address alone would repeat the email line under the heading. Per D-SITE-20, nothing renders in its place; the email line and the footer still carry the address. Logged.
- **"Copy link" is hidden without JavaScript,** as Contact's "Copy" is (spec §6.6). A button that does nothing is a false control. This is a no-op if SITE-3's `CopyButton` already does it. Logged.
- **The sitemap lists all five pages from `siteRoutes` now,** even though About, Teaching and Contact may land after this ticket. Nothing is indexed before the DNS cutover (SITE-10), and this way no later page ticket has to touch the sitemap. Logged.

## Experience & states

### The detail page `/work/<slug>` (spec §6.3, in order)

1. **Bar:** Work has `aria-current="true"`. Skip link: "Skip to content".
2. **"← Work"** links to `siteRoutes.work()`, with no query; filters aren't restored. Label step, 44 px target.
3. **Player:**
   - Full content width, with its width capped so the whole 16:9 frame fits under the bar.
   - The poster has `preload` (it's the LCP element). A 64 px play circle in the tile's play-mark style is centred, with accessible name "Play {Title}".
   - YouTube and Vimeo: poster-first, with `watchHref` set to the host watch page. One tap plays.
   - **Link-out:** the poster, plus **"Watch on {host} ↗"**. It opens in a new tab, the ↗ is `aria-hidden`, and it carries hidden text ", opens in a new tab" (§4.3, §7.6). Nothing is embedded.
4. **Heading block:**
   - H1 is the title, exactly as in `projects.ts`.
   - Then `projectMetaLine(project)` and the lane label: "Passion project" in `--link` when `lane === "passion"`, otherwise the client in `muted-foreground`, otherwise nothing.
   - Then the logline in the Lead step.
   - Then **"Copy link"** (Label step, `muted-foreground`), copying `absoluteUrl(siteRoutes.project(slug))`, which is passed in as a prop.
5. **Email line, directly under the heading block:** the address alone, as `mailto:{email}?subject={encodeURIComponent(title)}`. Reuse SITE-3's mailto builder; don't write a second one.
6. **Body:** two columns at ≥1024, one below.
   - **Story** (left): `story`, split on blank lines into 1–3 paragraphs, max 68ch.
   - **Facts** (right), each an h2 in the Label step and each omitted when empty:
     - **Awards and selections:** `awardsFull`, one per line.
     - **Press:** the quote in italic, the source beneath, linked when `url` exists.
     - **Articles:** outlet and title, linked.
   - Role, For and Year are **not** repeated.
   - If the story is absent, the facts take the body alone, left-aligned. If everything is absent, the body isn't rendered and leaves no gap.
7. **Previous / Next** (`workOrder()`, wrapping at both ends):
   - "Previous" / "Next" in the Label step, then the title in the Lead step.
   - Side by side at ≥768 (Previous on the left), stacked below. Each is a 44 px+ target.
8. **Email hand-off:** the sentence plus the address, rendered only when the shared detail-page sentence exists (see Rulings). Then the footer.

### Metadata (per page, via `createPageMetadata`)

- Title: `{Title} ({Year})` through the template, rendering "{Title} ({Year}) — Kryshan Randel".
- Description: the logline.
- Canonical: `siteRoutes.project(slug)`.
- `og:image`: `POSTERS[slug]` (src, width, height), alt "{Title}, a still from the film".

### JSON-LD `VideoObject` (via `lib/structured-data.ts` and `json-ld.tsx`)

- `name`: the title.
- `description`: the logline.
- `thumbnailUrl`: `absoluteUrl(POSTERS[slug].src)`.
- YouTube and Vimeo: `embedUrl` from `embedUrl(video, { autoplay: false })`.
- Link-outs: `url` is the link-out URL, with **no** `embedUrl`.
- `uploadDate` **only** when `videoPublished` exists; otherwise the key is absent.
- The builder function takes plain arguments; `lib/` never imports `content/`.

### Redirects (`next.config.ts`, D-SITE-25)

`redirects()` reads `LEGACY_PATHS` from `./lib/routes` and `PROJECTS` / `SHOWABLE_PROJECTS` from `./content/projects`, both by **relative path**. Per entry:

1. **Normalize the source:** strip one trailing slash unless the source is `/`.
2. **Resolve the destination:**
   - a project entry whose slug is in `SHOWABLE_PROJECTS` → `siteRoutes.project(slug)`
   - a project entry whose slug is in `PROJECTS` but not showable (held or NDA) → `siteRoutes.work()`
   - a page entry → that page's `siteRoutes` path
3. **Drop the entry** if the normalized source equals its destination.
4. **Emit** `{ source, destination, permanent: true }` (308).
5. **Validate the whole set** (Rulings). On failure, throw.

Spec §8's required mappings must come out of the data, not be hand-written beside it:
- `/reel/` → `/work`
- `/contact-me/` → `/contact`
- `/about/` → `/about` (the internal hop only)

A held film that becomes public moves its old URL to its detail page at the next build, with no edit to the redirect code.

### Sitemap (`app/sitemap.ts`)

- `/`, `/work`, `/about`, `/teaching`, `/contact` (from `siteRoutes`), then `siteRoutes.project(slug)` for each of `SHOWABLE_PROJECTS`, all absolute via `absoluteUrl`.
- No `lastModified` (no date is known; don't invent one).
- `app/robots.ts` is **unchanged**: it already allows `/`. Its `/review` disallow is deleted in SITE-9.

### States (exhaustive)

**Per detail page:**
- embed (YouTube or Vimeo), before the tap
- playing (after the tap; the iframe is mounted)
- link-out
- with or without a story
- with or without `awardsFull`, press and articles, in every combination
- with or without `videoPublished`
- first or last in `workOrder()` (the neighbours wrap)
- Copy link: idle · copied ("Link copied", 2 s, `role="status"`) · failed ("Couldn't copy. The link is selected.", after `navigator.share` if it exists, otherwise showing the URL as selected text)
- JavaScript off: the play circle is a link to the host; Copy link is hidden

**Per URL:**
- a showable slug: 200
- a held slug: 404
- an NDA slug: 404
- an unknown slug: 404
- a trailing-slash form: 308 to the slashless form
- each legacy URL, as mapped

### Failure / edge states

- **An unknown, held or NDA slug** gets the site's 404 (`app/not-found.tsx`, with the chrome and spec §6.7's copy), because of `dynamicParams = false`. The page also calls `notFound()` when `findShowableProject` returns nothing.
- **A legacy entry naming a slug that isn't in `PROJECTS`:** the build fails. Example message: "lib/routes.ts: the old address /project/united-8s/ points at the film 'united-8s', which isn't in content/projects.ts. Use the film's current slug."
- **A legacy source equal to a live route:** the build fails, naming the route.
- **A chain or a duplicate source:** the build fails, naming both entries.
- **A query-string legacy URL** (for example `/?p=123`), if the inventory holds any: emit it with `has: [{ type: "query", key, value }]` against source `/`. `[NEEDS VALUE AT BUILD]`: read how SITE-1 recorded such entries, if at all, and state what you found.
- **The host's embed fails to load:** the host's own error shows. No custom state is added (the precedent is KR-8's DEVIATIONS line).
- **Clipboard refused** (an insecure context, a denied permission, or `writeText` rejecting): the label never says "Link copied". The fallback runs per §4.3.

## Non-negotiables (this slice)

- **One list.** Detail pages, the sitemap and the redirects read `SHOWABLE_PROJECTS` / `findShowableProject`. No `rights === "public"` test or `.filter` over `PROJECTS` anywhere in this slice.
- **No page, sitemap entry, redirect destination or JSON-LD for a held or NDA'd film.**
- **No iframe, player script or video-host request before a tap.** One tap plays. Never autoplay on load.
- **At most two hops from any crawled URL, the last a 308.** No loops, no chains, no redirect shadowing a live page.
- **`content/projects.ts` stays loadable by `next.config.ts`:** no runtime alias (`@/…`) imports, and no image imports (posters stay in `content/posters.ts`). Type-only imports are written `import type`.
- **Static.** No `searchParams`, `headers()` or `cookies()`. Routes come from `lib/routes.ts`, and URLs are made absolute only through `absoluteUrl`.

If the spec would force you to break one of these, **stop and ask**.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- Read only: `content/projects.ts` (`title`, `year`, `kind`, `roleLabel`, `lane`, `client`, `logline`, `story`, `awardsFull`, `press`, `articles`, `embed`, `videoPublished`), `content/posters.ts` (`POSTERS`), and `lib/routes.ts` (`LEGACY_PATHS`).
- The detail-page hand-off sentence is read from wherever SITE-3 and SITE-4 put the shared hand-off sentences (`content/site.ts` expected). `[NEEDS VALUE AT BUILD]`: follow Work's pattern. Leave the sentence absent; SITE-C writes it.
- **No copy is written in this slice.**

**Placement** (Mason's call, build order scope sheet; the sub-bullets are this ticket's):
- `app/(site)/work/[slug]/page.tsx`: `generateStaticParams`, `dynamicParams = false`, `generateMetadata`, the page, and the `VideoObject`.
- Page-only client leaves, if any, go in `app/(site)/work/[slug]/_components/`.
- `next.config.ts`: `redirects()` and its builder function, in the same file (one consumer).
- `app/sitemap.ts`.
- `lib/structured-data.ts`: add the `VideoObject` builder beside SITE-3's `Person`.
- `lib/media/embed-url.ts`: the `autoplay` option.
- `components/composed/media/video-embed.tsx`: `watchHref`, unless SITE-3's player already covers it.

**Validators:** none added to `content/validate.ts`. The legacy-data checks run in `next.config.ts` because that's where the data is consumed and where they fail earliest.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

- **One h1** (the title). The facts are h2s in the Label step. No heading renders for an absent section.
- **The play control** is named "Play {Title}". Whether it's a link (`watchHref`) or a button, Enter activates it and focus is visible. The iframe is titled with the film's title (existing `VideoEmbed`).
- **Link-outs and external press or article links** that open a new tab carry hidden ", opens in a new tab". The ↗ is `aria-hidden`.
- **Copy link** has a 44 px hit area. Its result is announced once through a polite `role="status"`, and the failure text is announced too.
- **Focus not obscured (2.4.11):** tabbing through the page never leaves a focused element under the sticky bar (SITE-1's `scroll-padding-top`).
- **Previous / Next** have accessible names that include the title (for example "Next: Jack"), not "Next" alone.
- **Contrast:** the lane label in `--link` (6.9:1). The press quotes are italic body text in `foreground`.
- **Language** `en-CA` (site-wide).

## Acceptance criteria (observable; run against `yarn build:agent && yarn start:agent` unless stated)

1. **Built pages.** `.next-build` contains a prerendered page for every slug in `SHOWABLE_PROJECTS` and for no other slug.
2. **Held and NDA slugs:**
   - `curl -sI localhost:4510/work/<slug>` returns 404 with the site's 404 page for every held slug (at authoring: `glimpse`, `the-bully-solution`, `shotlister`, `vandu`, plus `directors-reel` if its frame is unapproved), for every NDA slug, and for `/work/not-a-film`.
   - None of those slugs appears in `sitemap.xml`, in any redirect destination, or in any page's JSON-LD.
   - *(Vigil.)*
3. **Order at 1440, on `/work/jack`:** bar (Work `aria-current="true"`) · "← Work" · the poster with the play circle · h1 "Jack", genre line, "Passion project", logline, "Copy link" · the email line · body · Previous / Next · footer. The email line is the first element after the heading block.
4. **One tap plays.**
   - A cold load makes **no** request to `youtube-nocookie.com`, `youtube.com`, `ytimg.com`, `vimeo.com` or `vimeocdn.com`.
   - One click on the play circle mounts the iframe playing.
   - The iframe `src` contains `autoplay=1`.
5. **No JavaScript:** the play circle is a link whose `href` is the host's watch page, and "Copy link" isn't shown.
6. **Link-out** (verified on a temporary local fixture, then reverted, if no showable film is a link-out):
   - Shows the poster and "Watch on {host} ↗" with `target="_blank"` and the hidden text.
   - No iframe exists.
   - The JSON-LD has `url` and no `embedUrl`.
7. **Mailto.** The email line's `href` is `mailto:{SITE.email}?subject=` plus the percent-encoded title (spaces as `%20`, never `+`). Checked on "A Very B.C. Production".
8. **Copy link.**
   - Success: the clipboard holds `{NEXT_PUBLIC_SITE_URL}/work/<slug>`, the label reads "Link copied" for about 2 s, and the status announces.
   - **Failure,** induced by stubbing `navigator.clipboard.writeText` to reject: the label never reads "Link copied". The share sheet opens, or, where `navigator.share` is absent, the URL is shown selected. The status reads "Couldn't copy. The link is selected."
9. **Empty sections.**
   - On a film with no `story`, `awardsFull`, `press` or `articles`, the page's h2 count is 0 and there's no empty body gap.
   - On a film with `awardsFull`, only the "Awards and selections" h2 appears.
10. **Previous / Next** follow `workOrder()`. The first film's Previous is the last film and the last film's Next is the first. Changing `/work` filters first has no effect on them.
11. **Metadata.**
    - Each page's `<title>` is "{Title} ({Year}) — Kryshan Randel".
    - The description equals the logline.
    - The canonical is `{SITE_URL}/work/<slug>`.
    - The `og:image` is the poster, with alt "{Title}, a still from the film".
    - Across all built HTML, every `<title>` and every meta description is unique (report the check).
12. **`VideoObject`** parses as JSON on every detail page. It has `name`, `description`, and an absolute `thumbnailUrl`. `embedUrl` has no `autoplay=1`. `uploadDate` appears exactly when `videoPublished` is set. No `<` appears unescaped inside the script.
13. **Redirects** *(Vigil)*. For every `LEGACY_PATHS` entry:
    - `curl -sIL localhost:4510<source>` ends at the mapped path with a 200.
    - It takes at most 2 redirects, every one of them a 308.
    - Checked specifically:
      - `/reel/` → `/work`
      - `/contact-me/` → `/contact`
      - `/about/` → `/about` (1 hop)
      - one showable film's `/project/<old-slug>/` → `/work/<slug>`
      - one held film's → `/work`
      - `united-8s` → `/work/united8s`, if the inventory holds it
    - The full table is pasted into the closing note.
14. **Build-time refusals** *(Vigil)*. Each of these, introduced temporarily, fails `yarn build:agent` with a message naming the file, the entry and the fix, and is then reverted:
    - a legacy entry naming a slug that isn't in `PROJECTS`
    - a legacy source equal to `/work`, pointing elsewhere
    - a chain (A → B, B → C)
15. **Sitemap.** `sitemap.xml` lists exactly the five page URLs plus one URL per showable film, all absolute on `NEXT_PUBLIC_SITE_URL` (the fallback is `https://kryshanrandel.com`, never localhost). `robots.txt` is unchanged.
16. **One list.** A code search over this slice's files finds no filter over `PROJECTS` and no `rights ===` test.
17. **CLS 0** on a cold load of a detail page. The LCP element is the poster.
18. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/work/jack`, `/work/just-watch-us`, a film with the fewest optional fields, and one 404 slug, via `yarn dev:agent` (never `yarn dev`/`yarn build`). The closing note is appended to this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **Next 16:**
  - `params` is a Promise: `const { slug } = await params` in both the page and `generateMetadata`.
  - `PageProps<"/work/[slug]">` is the global helper under `typedRoutes`.
  - `dynamicParams` is documented in `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`.
- **Importing from `next.config.ts`:** it's transpiled to CommonJS, and it already imports `./lib/env` by relative path. An alias import anywhere in `content/projects.ts`'s runtime graph fails config load with "Cannot find module '@/…'", before any page builds. The failure is loud, but check it early.
- **Special characters:** redirect sources are path-to-regexp patterns. A crawled path containing `(`, `)`, `:`, `*`, `+` or `?` must be escaped. Percent-encoded WordPress slugs are matched as encoded.
- **`POSTERS[slug].src`** is a root-relative `/_next/static/media/…` path. `createPageMetadata` resolves it against `metadataBase`; JSON-LD needs `absoluteUrl()` explicitly.
- **Player width:** a cap of `min(100%, calc((100svh - var(--bar-h) - 2rem) * 16 / 9))` keeps the frame under the bar. The panel's `--player-cap` idea from KR-8 is the precedent.
- **A redirect-check script:** a throwaway Node script that loops over `LEGACY_PATHS` and prints the curl table is the fastest way to produce criterion 13. SITE-10 will want to re-run it after the DNS cutover.
- **Previous / Next** are internal links to static pages; `next/link` is fine. Prefetch is your call (two small pages).

## Dev's call

- Whether Previous/Next use `next/link` and whether they prefetch.
- The exact player height cap and the two-column split ratio at ≥1024.
- Whether the redirect builder is one function or two (resolve, then validate), as long as it stays in `next.config.ts`.
- Whether the redirect-check script is committed under `scripts/`. If it is, it gets no `package.json` entry in this slice.
- `watchHref` versus an equivalent prop name, if SITE-3's player already exposes one.

Anything here with real alternatives goes to `TECHNICAL-DECISIONS.md` at closure (next free `M-SITE-n`).

## Out of scope

- **Work's grid, filters, the credits list and tile hrefs:** SITE-4.
- **Loglines refined, stories, `awardsFull`, press verification, articles, the detail-page hand-off sentence and per-film notes:** SITE-C.
- **The old-URL crawl and the `LEGACY_PATHS` data itself:** SITE-1 (O-SITE-9). This ticket consumes it.
- **Host-level redirects** (`http`→`https`, `www`→apex) and the DNS cutover: SITE-10.
- **Launch-tier validation** (logline ≤155 characters, unique descriptions as a build check, approved frames): SITE-10.
- **The `/review` disallow in `robots.ts`:** SITE-9.
- **A custom "player won't load" state or a loading spinner:** not in the standard build (KR-8 precedent). A later ticket if wanted.
- **Social card art** (O-SITE-11): the poster stands in.

## Depends on

- **SITE-3:** the film player, `CopyButton`, `EmailHandOff`, `JsonLd` and `lib/structured-data.ts`, and the mailto builder. Complete in `PROGRESS.md`.
- Transitively, **SITE-1** (`siteRoutes`, `LEGACY_PATHS`, the chrome) and **SITE-2** (`SHOWABLE_PROJECTS`, `findShowableProject`, `workOrder()`, `POSTERS`, `validate.ts`). Both are Complete by SITE-3's gate.
- SITE-4 is **not** required (build order: they may run in parallel).

## Recommended Claude Code execution

**Opus 5.5.** The value is in the edge cases: the internal trailing-slash hop, identity entries that loop, sources that would shadow live pages, the held/NDA boundary across four outputs, and "one tap" versus "no autoplay". A cheaper model writes one redirect per crawled URL with the trailing slash intact (so none of them ever matches), adds an `/about` → `/about` loop, and filters `PROJECTS` a second time for the sitemap. The page looks right, and old links break silently after the cutover.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-5 — Detail pages, redirects, sitemap and structured data** (`docs/specs/03-site-build/SITE-5-detail-pages-redirects.md`). Model: **Opus 5.5**. **Every showable film gets one sendable page; every old URL lands in at most two 308 hops; nothing held or NDA'd is reachable by any route.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/README.md` (the kickoff contract)
> 3. `AGENTS.md`
> 4. `docs/CONVENTIONS.md`
> 5. `docs/PERFORMANCE.md` §2, §4, §5
> 6. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §3, §4.3, §4.5, §6.3, §6.7, §7.6, §8, §9, §12 (D-SITE-3, 8–11, 20, 22–26)
> 7. `docs/specs/03-site-build/00-build-order.md` (the scope sheet for SITE-1, SITE-2, SITE-3, SITE-5)
> 8. the SITE-1, SITE-2 and SITE-3 tickets and their closing notes: reuse, don't fork
> 9. `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` and `.../05-config/01-next-config-js/redirects.md`
> 10. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Routes only from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`.
> - Client leaves never import `@/lib/config`: the email and URLs arrive as props.
> - No upward imports, and nothing public imports `review/`.
> - `content/projects.ts` must stay loadable from `next.config.ts` (relative or type-only imports).
> - Never `yarn dev` or `yarn build`: use `yarn dev:agent` and `yarn build:agent && yarn start:agent`.
> - If a non-negotiable would have to break, stop and ask.
>
> Close in three places: this ticket's `Status:`, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (plus `TECHNICAL-DECISIONS.md` for real alternatives), then tick `03-site-build/00-build-order.md`. Run `yarn verify` and report what it printed. Append a `## Closing note` here: what shipped, the redirect table, deviations, and the one thing the next ticket must know.
