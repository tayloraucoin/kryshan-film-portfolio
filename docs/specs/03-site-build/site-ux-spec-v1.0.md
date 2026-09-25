# Kryshan Randel — Site UX Spec v1.0

**Owner:** Vitrine (lead web designer) · **Reviewed and agreed by:** Vesper (interaction, states, accessibility), Mason (build, data, routes), Cantor (copy), Tribune (the client and the visitor), Drummer (conversion and scope), Sage (behavioural evidence)
**Date:** 2026-09-24 · **Track:** `docs/specs/03-site-build/` · **Epic:** SITE (decisions `D-SITE-n`, tickets `SITE-n`)
**Status:** v1.0 (reconciled with the SITE tickets 2026-09-24: §2 style-guide owner, §4.2 `SiteShell`, §4.3 port ticket, §6.2 credits, Glimpse source), the source of truth for the real site. Tickets cite this file by section and decision ID. The build order and tickets are in this folder (`00-build-order.md`, `SITE-n-*.md`).

`[ASSUMPTION: Kryshan approves Demo D as built (handoff O-7).]` If he asks for changes after that approval, they are sorted under the offer's change-round rules. Only changes that count as defects are fixed free. Whatever he approves amends this file as v1.1.

---

## 0. How to read this

**What this file is:** the whole site, page by page. It says:
- what exists
- what each piece of text is for
- how everything behaves
- what it may and may not say

It doesn't write final copy. Copy is written at ticket time against §7 and each page's text table, and every table marks which strings are already locked.

**Precedence when documents disagree:**
1. This file, and its decision log (§12).
2. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` (the D-KRD rulings), for anything this file inherits and doesn't restate. Home is Demo D.
3. `docs/client/kryshan-02-success-criteria.md` (facts, wants, refusals) and `kryshan-04-brand-pillars.md` Step 8 (Card A v2).
4. `kryshan-06-layout-A.md`, for anything about Work, About, Teaching and Contact that §6 doesn't amend.
5. `kryshan-03-copy-and-voice.md`, for voice and the copy bank. Its errors are corrected in §7.5.
6. House law: `docs/CONVENTIONS.md`, `docs/PERFORMANCE.md`, `docs/BRANDING.md`.
7. On-disk reality plus `docs/specs/DEVIATIONS.md` override any stale string here.

**Words used with fixed meanings:**
- **tile:** a film's poster in a grid or row
- **panel:** the open film, full width below the tapped tile's line (D-KRD-6)
- **detail page:** `/work/<slug>`
- **lane label:** "Passion project" or the client's name
- **genre line:** kind · year · role
- **alias:** `hello@kryshanrandel.com`
- **showable:** passes `isShowable` (§5)
- **email hand-off:** the one component that ends a page's content with a sentence and the address (§4.3)

**Counts in this file are examples.** Every rendered count is `SHOWABLE_PROJECTS.length`, never typed. At launch it may be 24 to 27.

---

## 1. Frame

**Who matters most.** A producer, agency or organisation about to hire a director, camera operator or editor. They arrive:
- with his name from someone else
- on a phone as often as a desktop
- with minutes to spare
- deciding between him and the next name on the list (02 §0)

**The silent regular** (Tribune) is the repeat camera hire: a unit publicist or EPK producer who wants Camera work and the credits list without reading anything else.

**The second audience** is program directors and students hiring a teacher, a camp or a coach. They get their own page, not the front door.

**The one action:** *watch something, then email.* The rules that follow from it:
- Nothing sits between a visitor and a play button.
- Nothing sits between a playing film and his email.
- The email is on every page, and the bar's Contact link is always on screen.

**What a first-time visitor must believe after thirty seconds:**
- He directs, shoots and edits anything cinematic, whatever the genre or the constraint.
- Other people do their best work with him.
- He is fun and fast to work with.

The pillars, in his order: **Wicked · Resourceful · Galvanizing** (04 Step 8).

**The taste thesis:** quiet chrome, one saturated red that is his, the work one tap from playing (01 §1).

**The genre contract:** a creative portfolio.
- The work leads.
- The person is present but second.
- Proof sits where a hirer looks.

The one deliberate break: no hero. The first screen is the work, with him in the first square (D-KRD-5).

**Refusals that bind every page** (02 §1.2):
- too much text
- too many pages
- noisy or crowded layouts
- slow loading
- spelling mistakes
- photos under videos
- broken or private links
- white or empty tiles
- anything that reads as wedding or flat corporate videography

---

## 2. Scope, ownership, milestones

**Built:**
- five pages: Home, Work, About, Teaching, Contact
- a detail page for every showable film
- a 404 page
- the chrome: bar, footer and skip link
- redirects from the old WordPress URLs
- per-page metadata, a sitemap and structured data
- the production kit
- the self-edit guide (`docs/EDITING.md`)
- the style guide

**Style guide (the offer's deliverable).**
- **Format and file:** `docs/STYLE-GUIDE.md` plus an exported PDF. The PDF is rendered from `/review/brand` and the Kit D page before the review layer is deleted, because those pages compute contrast with `lib/color/contrast.ts`.
- **Contents:**
  - the pillars (Card A v2)
  - colour roles and contrast
  - the type scale
  - tile and panel anatomy
  - the email hand-off
  - §7.2 to §7.4 of this file
  - the never-list
- **Owner:** SITE-9 (exported before the review layer is deleted; see the build order).

**Not built (binding):**
- A contact form (email only; a form that stores entries is the Supabase add-on).
- Anything from his events life beyond his own interests sentence (02 §9).
- Hosted video. YouTube and Vimeo embeds only; anything else is a link-out.
- Blog, booking, admin panel, CMS.
- Analytics (D-SITE-15).
- A designed logo; the wordmark is his name in type.
- Reels cut, photos shot, or frames made by us, beyond pulling stills from his own videos with his OK.
- Motion beyond the view transition (D-SITE-21).

**Ownership (Drummer):**
- The domain, the Vercel project, the GitHub repo and the mail alias are **in his name**.
- Taylor works as a collaborator and is removed at handover.
- The DNS cutover keeps the MX and SPF records for his mail.

**Copy scope (Drummer):**
- SITE-C is **one cutting pass** from his own intake words, plus the few **Write** strings in §6.
- Rewrites after he has approved a string count as a change round.

**Milestones:**
- **First look** (the offer's first-look clock): every page built and deployed to a preview URL on real data. That means:
  - titles
  - lane labels
  - genre lines
  - loglines
  - short awards
  - every Locked and Write string in §6

  Stories, full awards, verified press and the credits list may still be arriving; their sections collapse cleanly (D-SITE-20). The alias must deliver before the first look, because it's printed on every page.
- **Launch:** everything in §13 marked "Blocks launch" is closed, and the review layer is deleted.

**Deleted at launch** (REVIEW-LAYER §6.2; Mason):
- **Code:**
  - `app/review/`, `review/`, `lib/review/`, `lib/validators/review.ts`
  - `proxy.ts` (the whole file)
  - the `REVIEW_*` schema, `runtimeEnv` entries and the three helpers in `lib/env.ts`
  - `REVIEW_SESSION_MAX_AGE` and `REVIEW_COOKIE` in `lib/config.ts`
  - `reviewRoutes`, `isGatedReviewPath` and `isReviewPath` in `lib/routes.ts`
  - the `/review` disallow in `app/robots.ts`
  - `outputFileTracingIncludes` in `next.config.ts`
  - the review section of `.env.example`, and its Vercel variables
  - the `review/**` block and the `@/review/*` patterns in `eslint.config.mjs`
  - every `data-review-id` in `components/` and `app/(site)/`
  - `react-markdown`, `remark-gfm` and `sonner` if nothing else imports them
- **Docs updated in the same ticket:** AGENTS.md (repo map), README, CONVENTIONS, PERFORMANCE §8, NEW-CLIENT.
- **Before deletion:** Taylor tags the last review commit.

---

## 3. Site map and routes

| Route | Page | Its one job | H1 | Primary action | Nav | Redirects in |
|---|---|---|---|---|---|---|
| `/` | Home | A film playing in one tap; who he is, in his voice | His first-person line | Tap a film | Wordmark | — |
| `/work` | Work | Every showable film, filterable by role and by passion work; the credits he can't show as films | "Work" | Tap a film | Work | `/reel/` |
| `/work/<slug>` | Detail page | One film you can send someone: player, story, awards, press | The film's title | Play | (Work) | `/project/<old-slug>/` |
| `/about` | About | Who he is, the proof, the people he's worked with | His opener line | Email | About | `/about/` |
| `/teaching` | Teaching | What he teaches, where, and how to book him | Teaching opener | Email | Teaching | — |
| `/contact` | Contact | The address, big and copyable | "No agent, no form, no waiting." | Email | Contact | `/contact-me/` |
| any unmatched path | 404 | Send a lost visitor to the work | "That page doesn't exist. The work does." | Work | — | — |

- **Every route is static.** No page reads a request at render time (PERFORMANCE §2).
- **Routes live in `lib/routes.ts` only:** `siteRoutes.work({ role?, passion? })`, `siteRoutes.project(slug)`, and so on.
- **Detail pages:** `app/(site)/work/[slug]/page.tsx`, with `generateStaticParams` over `SHOWABLE_PROJECTS` and `dynamicParams = false`, so every other slug returns 404.

**Heading outlines:**

| Page | Outline |
|---|---|
| Home | h1 his line · h2 Directing · h2 Camera and editing · h2 Teaching |
| Work | h1 Work · h2 What I can't show you · h2 Behind the scenes |
| Detail | h1 title · h2 Awards and selections · h2 Press · h2 Articles (each only when present) |
| About | h1 opener · h2 Recognition (h3 Awards · h3 Directed and shot · h3 Press) · h2 On set · h2 What people say |
| Teaching | h1 opener · h2 per block · h2 What people say |
| Contact | h1 |
| 404 | h1 |

The panel's title is an h2 inside its region.

---

## 4. The site-wide system

### 4.1 Kit and rhythm

**The production kit is Kit D** (Kit A's tokens, with the amended words), copied to `brand/kits/kryshan.ts` and set as `PRODUCTION_KIT` (BRANDING §4).

| Role | Token | Used for | Contrast on ground |
|---|---|---|---|
| Ground | `background` (ink) | Every page | — |
| Text | `foreground` (bone) | Body text, titles | 16.7:1 |
| Secondary | `muted-foreground` (neutral 300) | Genre lines, captions, client labels, footer | 7.6:1 |
| Surface | `card` | Arrow and end-tile plates, a failed tile | bone on it: 12.5:1 |
| Hairline | `border` at 40% | Frames, section rules, the bar | — |
| Accent, large only | `primary` (red 500) | The wordmark (20 px/800) and one phrase per page in an H1 (≥24 px) | 3.4:1 (large only) |
| Small accent | `--link` (red 300) | Links, "Passion project", open-tile rule, hovers, focus | 6.9:1 |

**Type.** Archivo only, the kit's steps:

| Step | Setting |
|---|---|
| Display | 800 · width 72 · uppercase, wordmark only |
| H1 | 700 · width 80 · 40 px, sentence case |
| H2 | 600 · width 88 · 28 px |
| Lead | 20 px |
| Body | 16 px, max 68ch |
| Caption | 13 px · width 90 |
| Label | 11 px · 600 · width 88 · tracking 18% · uppercase |

- **H1 size on every page:** 32 px below 768, `clamp(2rem, 2.6vw, 2.5rem)` to 1279, 40 px at ≥1280.
- **Italic is for press quotes only.**
- **One red phrase per page at most.** Each page's text table says where, or "none".

**Rhythm.**
- Sections are 64 px apart below 768, 80 px at ≥768.
- Gutters are 12 px below 768 and 24 px from 768.
- No maximum page width. Prose is capped by `ch`.
- Nothing is centred except the play button on a poster.

### 4.2 Chrome

- **Bar** (D-KRD-4, unchanged):
  - Sticky, solid; a hairline after 8 px of scroll.
  - At ≥768: one 56 px line, the wordmark then Work · About · Teaching · Contact.
  - Below 768: a 44 px sticky line (wordmark · Contact), with Work · About · Teaching in a row beneath it that scrolls away.
  - Its height is published as `--bar-h`. The demo's `--review-bar-h` and `--demo-bar-h` are gone.
  - The wordmark links to `/`, with accessible name "Kryshan Randel, home". It is never a heading.
  - The current nav item gets `aria-current="page"`, or `"true"` on detail pages (for Work), and a 2 px `--link` underline.
- **Footer, on every page:**
  - the email hand-off's address line: `SITE.email` alone, in `foreground`
  - "Vancouver, works anywhere."
  - `<nav aria-label="Social">`: IMDb · Vimeo · YouTube · LinkedIn, then a quieter line with Instagram · Facebook
  - No copyright line. No X/Twitter.
- **Skip link:** first in the tab order. "Skip to the work" on Home and Work, "Skip to content" elsewhere.
- **Every page renders its chrome through `SiteShell`** (`components/composed/site/site-shell.tsx`, SITE-1, M-SITE-1), passing `current` for the bar's `aria-current` and the page's skip-link text. `app/(site)/layout.tsx` doesn't render the chrome, because a layout can't know the current page without client JS.
- **404:** `app/not-found.tsx` sits outside `(site)`, so it renders `SiteHeader` and `SiteFooter` itself.

### 4.3 Shared components (ported from Demo D, SITE-3)

They live in `components/composed/work/`. Nothing on the public site imports from `review/` (D-SITE-19).

**Tile** (D-KRD-9 to 12):
- 16:9 frame, lane label, title and genre line over a scrim, a play mark on hover and focus (fine pointers), and a blur placeholder.
- It is **a real link**: `<a href={siteRoutes.project(slug)}>` with `aria-expanded`, and `aria-controls` while open.
  - A plain click opens the panel. A modifier click, a middle click or no JS goes to the detail page. No `next/link` prefetch.
  - Enter opens; Space scrolls, as on any link.
- Accessible name: "{Title}, {genre line}".
- **Filtered-out state:** removed (§6.2).

**Panel** (D-KRD-6 to 8):
- Full width on the line below the tapped tile's row; on phones it replaces the tile.
- **The strip** (44 px):
  - **"Copy link"** at its left end, in Label style, `muted-foreground`. After copying it reads "Link copied" for 2 s, confirmed through a polite `role="status"`.
  - **✕** at its right end.
  - Copy link comes before the ✕ in the DOM, so Shift+Tab from the player still reaches the ✕ first.
- **Then:** the player (playing), the title (h2), the genre line, the lane label, the **logline** and the **short awards** (one award, two festivals).
- **The email alone, last**, as `mailto:{email}?subject={Title}`, so every enquiry names the film that prompted it (Drummer).
- **The panel carries no story.** The story is on the detail page (D-SITE-22).

**Link-out films** (D-SITE-9):
- The panel and the detail page show the poster with **"Watch on {host} ↗"**.
- It opens in a new tab and carries hidden text ", opens in a new tab". The ↗ is `aria-hidden`.

**Email hand-off** (Vesper C6). One component ends the content of Work, the detail pages, About and Teaching:
- a sentence in the Lead step, specific to the page
- then the address in `--link`, as a mailto

The panel and Contact use the address alone, without the sentence.

**Copy** (Contact's "Copy", the panel's and the detail page's "Copy link"):
- Uses `navigator.clipboard.writeText` only when `isSecureContext`.
- On failure, the label never says "Copied". Contact selects the address; Copy link uses `navigator.share` where it exists, otherwise it shows the URL as selected text. The status then reads "Couldn't copy. The address is selected." or "…The link is selected."
- The URL is absolute (`absoluteUrl(...)`), passed in as a prop.
- **Client leaves never import `@/lib/config`.** The email and URLs arrive as props, because `CONTACT_EMAIL` is a server variable.

**Motion:** the view transition only (M-KR-1, M-KR-6), for the panel and the Work filter. Instant under reduced motion.

### 4.4 Vocabulary (binding across pages and copy)

- **Roles:** *Directing · Camera · Editing*, in that order. In running text: "directing, camera and editing". Never icons or colours.
- **Lanes:**
  - "Passion project" on a tile; "Passion projects" as the filter.
  - Paid work is named by its client.
  - "For hire", "client work", "commercial" and "corporate" never appear, in labels or copy (D-KRD-10; the Directing strand is amended in §6.1).
- **His titles:** "Director, camera operator, editor, and film instructor." (the roles line, his styling). Never "videographer".
- **Place:** "Vancouver, works anywhere."
- **Crew:** "one-person crew", never "one-man crew" or "one-person unit".
- **Numbers:** craft, never price (*Resourceful, never cheap*).
  - "$25" appears only in Contact Club's story.
  - "Any budget" never appears.
  - Counts are rendered from data, never typed.

### 4.5 Media rules

- **Posters:**
  - Chosen frames, native 16:9, ≤1600 px, JPEG.
  - `content/posters.ts` holds a static import per showable slug and is the **only** poster source (blur, width and height at build; a missing file fails the build).
  - The first poster on a page gets `preload`; the rest are lazy.
- **Video:** poster-first, no iframe before a tap, never autoplay with sound on load. YouTube (nocookie) and Vimeo (`dnt=1`).
- **Photographs:**
  - His portrait (4:5) and on-set or teaching photos (3:2), captioned, never under a video, never a gallery.
  - Every photo entry declares who is in it (§11).
- **Reference images:** never ship.

---

## 5. Content model (what he edits, and where)

Every fact he may change lives in `content/`, every image in `public/media/`, and the kit in `brand/`. The self-edit guide explains each task (CONVENTIONS §10a).

| File | Holds | Notes |
|---|---|---|
| `content/projects.ts` | Every film | See the fields below. `isShowable(p)` and `SHOWABLE_PROJECTS` are exported **once, here**; Home, Work, detail pages, the sitemap, redirects and next/previous all read them. `findShowableProject(slug)`. `workOrder()` is the one ordering function (D-SITE-6). |
| `content/posters.ts` | `POSTERS: Record<slug, StaticImageData>` | The only poster source. `Project.poster` is removed. |
| `content/home.ts` | `FEATURED` (six slugs, in order), `DIRECTING_ROW`, `CAMERA_ROW`, the H1 and its red phrase | The only featured list. `Project.featured`, `lead` and `order` are removed. |
| `content/about.ts` | Opener, bio paragraphs, the Glimpse paragraph, the names line, awards lines, `CLIENTS`, the credentials line, on-set photos (`Photo[]`), the closing sentence | — |
| `content/credits.ts` | `Credit { title; year; format: "Feature" \| "TV series" \| "TV movie" \| "Short"; network; released: boolean }` | Only `released: true` entries render (Tribune: unreleased titles are often embargoed). |
| `content/teaching.ts` | Opener, three blocks, the ask, `Photo[]` | — |
| `content/testimonials.ts` | `Testimonial[]` | Consent typed (§11). |
| `content/site.ts` | Nav labels, strands, 404 line, shared microcopy (§7.6), **socials** (moved from `lib/config.ts`, CONVENTIONS §10a) | — |
| `lib/config.ts` | Identity: name, roles line, place; `email` from `CONTACT_EMAIL` (fallback: the alias) | — |
| `lib/env.ts` | `CONTACT_EMAIL` (fallback `hello@kryshanrandel.com`); `NEXT_PUBLIC_SITE_URL` (fallback `https://kryshanrandel.com`, D-SITE-24) | — |

**`Project` fields at v1.0:**

| Field | Type | Status |
|---|---|---|
| `slug` | `string` | Exists |
| `title` | `string` | Exists |
| `year` | `number` | Exists |
| `roles` | `ProjectRole[]` | Exists |
| `roleLabel` | `string` | Exists |
| `lane` | `"passion" \| "hire"` | Exists (the value stays internal; never rendered) |
| `client?` | `string` | Exists |
| `kind` | `string` | Exists |
| `logline` | `string`, ≤25 words and ≤155 characters | New, required for showable |
| `story?` | `string`, 1–3 paragraphs, ≤90 words | His words cut; optional |
| `awards?` | `string[]`, one award, two festivals (the short list) | Exists |
| `awardsFull?` | `string[]` | New |
| `press?` | `{ quote; source; url?; verifiedOn: IsoDate }[]` | An unverified quote isn't in the file |
| `articles?` | `{ outlet; title; url }[]` | New |
| `embed` | `{ provider: "youtube" \| "vimeo"; id }` or `{ provider: "linkout"; host; url }` | `none` and `OLD_SITE` are removed |
| `videoPublished?` | `IsoDate` | Hand-entered, for `VideoObject.uploadDate` only |
| `rights` | `"public" \| "held" \| "nda"` | `pending` is removed |
| `posterStatus` | — | Removed; `validate.ts` refuses a showable film without an approved poster import |

`isShowable(p)` is `p.rights === "public"`.
- A film with no working video, an unverified clearance, or an unapproved poster is **`"held"`**.
- That is the only way to hide one, and it's what the guide tells him to do.

**Build-time validation** (`content/validate.ts`): pure functions that throw, imported for their side effect by `app/(site)/layout.tsx`, so any violation fails `next build`.

Checks from SITE-2:
- slugs unique
- a poster for every showable slug
- `FEATURED` and the row lists contain only showable slugs
- dates valid ISO
- a logline on every showable film
- the consent rules in §11

Checks added in SITE-10:
- logline ≤155 characters
- unique descriptions
- no showable film missing its approved frame

**Every error message is written for him.** Each names the file, the entry and the fix in plain words, and each is listed in `docs/EDITING.md`, "When a change doesn't appear" (Tribune).

---

## 6. Pages

**Text table status keys:**
- **Locked:** approved.
- **His words:** cut from his text; no new words.
- **Write:** new copy, against the bullets.
- **Proposed:** a change to a locked string, going to him in the one message; the default applies if he doesn't answer.
- **Waiting:** blocked on an answer (§13).

**Red phrase:** each table ends by saying where the page's one red phrase is, or "none".

### 6.1 Home `/`

**Job:** a film playing in one tap; who he is, in his voice, beside it.

**Built exactly as Demo D** (handoff §6), with these production changes:
1. **Tiles are links to detail pages** (§4.3).
2. **Unbuilt-link toasts are gone.** Every link is live:
   - Work · About · Teaching · Contact go to their pages.
   - "Teaching →" goes to `/teaching`.
   - "All {n} pieces →" goes to `/work`.
3. **Each row ends with an end tile.** A `card` plate, the Label style, centred:
   - **"All directing →"** to `/work?role=directing`
   - **"All camera work →"** to `/work?role=camera`

   Sage and Vesper: "camera and editing" over-promised a Camera filter.
4. **The panel** follows §4.3: Copy link in the strip, the logline instead of the story, and the mailto with a subject.
5. **Counts** are `SHOWABLE_PROJECTS.length`.

**Sections:**
1. Bar
2. Featured grid: the title cell, two columns wide, then six films
3. Directing row, with its end tile
4. Camera and editing row, with its end tile
5. Teaching strand
6. "All {n} pieces →"
7. Footer

**Featured films** (`FEATURED`): Just Watch Us · Directors Reel · Jack · 5Rhythms · The Wolf of West Georgia Street · Just Up The Block.
- **Fallback** (Drummer): if the Directors Reel's replacement frame isn't approved by the first look, it becomes `held` in featured position. Contact Club moves up, and Born To Be leads the Directing row.

**Portrait rule:** with a current portrait, the title cell becomes 2 × 2 at ≥1280 and `FEATURED` grows to eight (Contact Club, Born To Be). Without one, there's no frame.

**Text table:**

| Element | Status | Source | Direction |
|---|---|---|---|
| H1 "I direct, shoot and edit stories that are **hard to look away from.**" | Locked | Kit A voice; 03 §8 | Red phrase: "hard to look away from." |
| Roles line | Locked | `SITE` | — |
| "Watch ↓" (phones) | Locked | Demo D | — |
| Directing caption | **Proposed**: "Dark comedies and horror shorts that won at Bloodshots and screened at Sitges and Fantasia; PSAs, music videos, web series and sizzle reels for clients." | 03 §8, amended | "For hire" goes (D-KRD-10). The default is the amended line. |
| Camera and editing caption | **Proposed**: "IATSE 669. Behind-the-scenes and EPK camera for Sony Pictures and Entertainment Weekly; docs and non-fiction, often as a one-person crew. Leo-nominated as an editor." | 03 §8, amended | The checkable names lead (Drummer); "Canon C70" goes, because it reads as a budget tier. The default is the amended line. "Leo-nominated as an editor" stays; the title waits on O-SITE-4. |
| Teaching strand body | Locked, with a fallback | 03 §8 | Until VFS is confirmed (O-SITE-5): "Directing, shooting and editing at LaSalle College; film camps; one-on-one coaching." |
| End tiles, "All {n} pieces →" | Locked | This spec | "Pieces", not "films" or "projects". |
| Meta description | Write, default given | Cantor | "Director, camera operator and editor in Vancouver. Dark comedies that won at Bloodshots, PSAs for the Directors Guild of Canada, IATSE 669 camera." (≤155 characters) |
| **Red phrase** | — | — | The H1 phrase. |

**Metadata:**
- Title "Kryshan Randel — Director, camera operator, editor" (absolute).
- `og:image`: the site card (O-SITE-11); until then the Just Watch Us poster, alt "Just Watch Us, a still from the film".
- JSON-LD `Person`: name, `jobTitle`, url, `sameAs` (the socials), `address.addressLocality` "Vancouver".

**Acceptance seeds:**
- Handoff §18's checks, except the unbuilt-link ones.
- A modifier click on a tile opens its detail page.
- The end tiles land on filtered Work with no flash (§6.2).

### 6.2 Work `/work`

**Job:** every showable film, filterable by what the visitor is hiring for, plus the credits he can't show as films. The archive, and the page `/reel/` points to.

**Sections:**
1. **Bar** (Work current).
2. **Header:**
   - H1 "Work", with the count beside it in `muted-foreground` ("{n} pieces", or "{m} of {n}"). The count is a sibling of the h1, never inside it.
   - **Layout by width:**
     - ≥1024: H1 and count on the left, filters on the right, one line.
     - 768–1023: H1 and count, then the filters on the next line.
     - Below 768: the role links on one line (they fit at 320 px, no horizontal scroll), then the chip on its own line.
   - **Under the header:** "Behind-the-scenes credits ↓" (Label, `--link`), jumping to `#credits` (Tribune, Vesper).
3. **Filters** (D-SITE-5):
   - **Role links:** All · Directing · Camera · Editing, in `<nav aria-label="Filter work">`.
     - Links, not ARIA tabs. Label step.
     - Default `muted-foreground`; hover bone; current bone with a 2 px `--link` underline and `aria-current="true"`.
   - **One chip, "Passion projects":** a `<button aria-pressed>`, 32 px visual box, 44 px hit area.
     - Off: hairline and `muted-foreground`. On: `--link` text and hairline. Focus: ring.
   - **URL:** `/work?role=camera&passion=1`.
     - Unknown values are ignored.
     - Changes are written with `history.replaceState`.
     - The canonical has no query.
   - **No flash on a filtered cold load** (Vesper B2):
     - Each tile renders `data-roles` and `data-lane`.
     - A small inline script before the grid reads `location.search` and sets `data-role` and `data-passion` on the grid wrapper **before first paint**.
     - CSS hides the tiles that don't match. React state syncs from those attributes on hydration.
     - Without JS: All, and the chip is hidden.
   - **Matching:** a piece matches a role if its `roles` include it. The chip narrows to `lane === "passion"`.
4. **Grid:**
   - `workOrder()`: `FEATURED` first, in order, then everything else newest first, ties by title. **The same order applies inside every filter** (Sage).
   - Same tile and panel as Home. No title cell. 4 / 2 / 1 columns.
   - **Filtering hides** non-matching tiles: out of the layout, the accessibility tree and the tab order. The rest reflow with the view transition, and only the tiles visible after the change are named (Vesper C4).
   - **Changing a filter while a film is open:** the panel closes first, **focus stays on the filter control**, and the scroll position isn't restored. The panel's insertion point is always worked out over visible tiles only (Vesper B4).
   - **Live status**, visually hidden: "Showing {m} of {n}" / "Showing all {n}".
   - **Empty result:** "No {directing | camera | editing} passion projects yet." plus "Show all". No empty frames.
5. **"What I can't show you":**
   - A text block after the grid, max 60ch, no images. h2 visible.
   - Each name carries his role and the production (Sage), and every one appears in `credits.ts`, IMDb or his CV.
   - No email hand-off here. The page's one hand-off comes after the credits (below).
6. **Behind the scenes** (`#credits`, D-SITE-7):
   - H2, one context line, then `credits.ts` (released only), **newest first**, in columns: 3 at ≥1024, 2 at ≥768, 1 below.
   - Each entry: **Title (Year)** · format · network. No cast. No posters.
   - 18 visible, then a native `<details>` with summary "All {n} credits". The summary text doesn't change when open. (`hidden="until-found"` was considered and dropped: browsers without support hide the content, and React 19's types don't allow the value. Checked in SITE-4.)
   - Then "Full credits on IMDb", then the email hand-off (Drummer), so the page's last exit isn't off-site.
   - Not filtered: it stays where it is under every filter.
7. **Footer.**

**Text table:**

| Element | Status | Source | Direction |
|---|---|---|---|
| H1 "Work" | Locked | 03 §8 | Not "Reel", not "Portfolio". |
| Count, filters, chip, jump link | Locked | This spec | Numerals. |
| Empty line | Locked | Cantor | "No {role} passion projects yet." |
| "What I can't show you" | His words (cut) | 03 §8 names line | ≤55 words. **Waiting** on Q12, which now includes whether Aubrey Plaza was directing or camera, and whether the Rio Theatre PSAs are public. Each name carries its role and production. Spell **Mary Steenburgen**. |
| Behind the scenes H2 | Write | — | 2–4 words, literal. Not "EPK": producers know it, students don't. |
| Context line | Write | 02 §8.3 | ≤20 words: capacity (behind-the-scenes and EPK camera, IATSE 669) and a count **rendered from `credits.ts`**. No adjectives. |
| Credits entries | His words (data) | EPK CV, IMDb | Titles as released. **Waiting** on Q12 for the list. |
| "All {n} credits" / "Full credits on IMDb" | Locked | Cantor | — |
| Email hand-off sentence | Write | — | ≤12 words; for the camera hire, plain. |
| Meta description | Write | — | ≤155 characters, names the three roles and the kinds of work. |
| **Red phrase** | — | — | None. |

**States:**
- All
- filtered
- filtered and empty
- panel open, then filter changed
- a filtered cold load (hidden before paint)
- no JS

**Acceptance seeds:**
- A cold load of `/work?role=camera` paints only camera tiles, with CLS 0, and the static HTML contains every tile.
- Toggling the chip updates the URL without a reload.
- The status announces.
- Changing a filter with a film open leaves focus on the control.
- The credits jump link works; entries are newest first; the expander's summary shows the total.

### 6.3 Detail page `/work/<slug>`

**Job:**
- the film as a page he can send
- the landing place for old `/project/<slug>/` links
- where the full story, awards and press live (02 §3.4, Level 2)

**Sections:**
1. **Bar** (Work `aria-current="true"`).
2. **"← Work"**, to `/work`. Filters aren't restored.
3. **Player:**
   - Full content width, capped to fit under the bar.
   - **Poster-first:** a 64 px play circle in the tile's play-mark style, centred, named "Play {Title}". One tap plays (`VideoEmbed` with no autoplay).
   - Without JS, the play circle is a link to the host's watch page.
   - Link-outs show "Watch on {host} ↗" (§4.3).
4. **Heading block:**
   - H1 title, genre line, lane label.
   - Then the logline (Lead step).
   - Then **"Copy link"** (Label, `muted-foreground`).
5. **The email line**, directly under the heading block (Drummer): the address alone, `mailto:` with the title as the subject.
6. **Body.** Two columns at ≥1024, one below:
   - **Story** (left): 1–3 short paragraphs. Absent means the section is gone.
   - **Facts** (right): **Awards and selections** (`awardsFull`, one per line), **Press** (italic quote, source beneath, linked when there's a URL), **Articles** (outlet and title, linked). Each is an h2 in the Label step, and each is omitted when empty.
   - Role, For and Year aren't repeated; the genre line and lane label already say them (Vesper).
7. **Previous / Next:**
   - Side by side at ≥768 (Previous on the left), stacked below.
   - "Previous" / "Next" in Label, then the title in the Lead step.
   - `workOrder()`; wraps at the ends.
8. **Email hand-off** (the sentence plus the address), then the footer.

**Text table (per film, in `projects.ts`):**

| Element | Status | Source | Direction |
|---|---|---|---|
| Title | Locked | 02 §3.5 | Titles exactly as released ("A Very B.C. Production"). "5Rhythms". |
| Logline | His words (cut) | Intake "Watch" notes | ≤25 words and ≤155 characters (it is also the meta description). Premise or purpose, present tense. No "PSA —" prefixes; the genre line says it. |
| Story | His words (cut) | Intake "Story" | ≤90 words. Setup plain, the odd detail last. Credit inside the verb ("co-edited with Alex Barker"). Cut CV habits and superlatives (§7.3). |
| Awards (short, full) | His words (data) | Intake; 02 §8.1 | Award, then festival, then the judge if the judge is the point. The Bully Solution **waits** on Q18. |
| Press | His words (data) | Intake press | Verbatim, ≤15 words, ellipsis where cut. Source as the outlet styles itself (Ain't It Cool News, Exclaim!). A festival programmer's note counts as a source when a URL exists. `verifiedOn` required. |
| "← Work", "Previous", "Next", fact labels, "Copy link", "Play {Title}" | Locked | Cantor | — |
| Email hand-off sentence | Write | — | ≤12 words, one shared line for all films. |
| **Red phrase** | — | — | None. |

**Per-film notes (binding for the copywriter):**
- **Just Watch Us:** the outcome belongs to DGC BC's campaign. Use "More BC directors have been hired on American shows shot here since." (03 §8), not a causal claim for him.
- **Jack:** cut "world's number one", "genre legend" and "numerous". "Best Death" stays.
- **Artless:** "Pan's Labyrinth" takes its apostrophe.
- **Glimpse:** use one distribution line once Q19 is answered. Until then, "screened on the Sundance Channel" alone.
- **The Bully Solution:** needs a non-gory frame (O-SITE-13) and the Dailymotion link-out (O-SITE-7). "Power tools…" stays last.
- **Contact Club:** the only place "$25" appears.
- **The Wolf of West Georgia Street:** a private person's birthday gift. Keep the premise and the craft; cut the wife's access to his journals and profiles. Shown only if Q13 confirms clearance (default: shown).
- **A Dog's Way Home EPK:** never mention Ashley Judd's pre-shoot conversation. It was private.
- **VANDU, RFFC** (Tribune B3):
  - Name the organisation and its staff collaborators only.
  - Never name or describe an on-screen participant.
  - The poster and share image show no identifiable participant.
  - Plain and respectful: no "gritty", "raw" or "eye-opening". For RFFC, cut "premiere".
- **Twenty8s:** cut "most successful".
- **Just Up The Block, Tradeswoman Exhibit:** the stories carry no detail. Omit the story rather than pad it.

**Metadata:**
- Title "{Title} ({Year}) — Kryshan Randel".
- Description: the logline.
- `og:image`: the poster, alt "{Title}, a still from the film".
- Canonical `/work/<slug>`.

**JSON-LD `VideoObject`** (`lib/structured-data.ts`, which takes plain arguments; one server component renders it, escaping `<`):
- name, description, `thumbnailUrl`
- `embedUrl`: the plain embed, no autoplay. Link-outs emit `url` and no `embedUrl`.
- `uploadDate` only from `videoPublished`.

**Acceptance seeds:**
- Every crawled old URL reaches the right page in at most two hops, the last a 308 (`curl -sIL` on `build:agent`).
- No page exists for a `held` film.
- The email line sits directly under the heading block.
- Every title and description is unique.

### 6.4 About `/about`

**Job:** the person briefly, then the proof, skimmable in under a minute and readable in full.

**Sections:**
1. **Bar.**
2. **Opener:**
   - ≥1024: the portrait (4:5, one third, `loading="eager"`) beside the text.
   - Below 1024: the H1, then the portrait (max 20rem), then the bio.
   - Without a portrait, the text runs at 60ch.
   - H1 max 24ch, then the **bio**: ≤200 words, at most three paragraphs, the first ≤60 words.
3. **Recognition** (h2), before the story (Drummer, Sage):
   - **Awards** (h3) and **Directed and shot** (h3), two-up at ≥768.
     - Awards: four to six lines.
     - Directed and shot: the names line, then "Clients include", with the client names in type.
   - **Press** (h3) below them: up to four quotes, 2 × 2 at ≥768. Ship fewer rather than a weaker one.
4. **The Glimpse paragraph:** Lead step, roman (italic is for quotes), between hairlines, max 52ch.
5. **On set** (h2): two or three 3:2 photographs with captions; a row at ≥768, stacked below. Cleared photos only (§11).
6. **What people say** (h2): hire-side testimonials, **full attribution only**, at most three, stacked. Zero means no section (D-SITE-13).
7. **Credentials line:** one line in `muted-foreground`.
8. **Email hand-off**, then the footer.

**Text table:**

| Element | Status | Source | Direction |
|---|---|---|---|
| H1 | **Waiting** on his pick; default A | 03 §8: A) "Born and raised in BC, I've been making films for as long as I can remember." B) "My favourite subject is human consciousness, and my favourite theme is how quickly a mind turns against itself under pressure." | Default A. It is his own bio line and reads safely to every client, including the mental-health organisations he films for (Tribune). B is offered in the one message. Red phrase: none with A; "turns against itself" with B. |
| Bio | His words (cut) | His bio; 03 §6 | ≤200 words. Paragraph 1 says what he does and one checkable credit. **The person before the résumé:** the interests line is in paragraph 2, verbatim ("host large-scale immersive events"). No awards in the bio (they're in Recognition). No festival lists. Active verbs. Show Galvanizing through the contests "where I met many of my favourite collaborators". Not yet: "since 1999", the Crazy8s count, VFS. First person. |
| Glimpse paragraph | His words (cut) | His Berlinale Talents 2017 application (`docs/client/writing/4605f881-….rtf`) | ≤70 words. Name Justine Warrington. End on the script rising to her performance. |
| Awards lines | His words (data) | 02 §8.1 | Award, film, festival. "Nominated" versus "won" stated exactly. Leo **waits** on O-SITE-4; The Bully Solution on Q18. |
| Names line | His words (cut) | 03 §8 | ≤45 words. Each name with his role and the production. **Mary Steenburgen.** **Waiting** on Q12. The dry turn ("…I'm not allowed to show you") is this page's one closing joke. |
| Clients | His words (data) | 02 §4 | Studios and networks first. No Legendary Pictures (#10). Logos only if cleared (Q2). |
| Press | His words (data) | §6.3's verified set | Range: the wicked ("Wonderfully wrong") and the slick ("Slickly-made…"). |
| Captions | Write | Him | ≤12 words: production, what he's doing, adults by name only with their OK. |
| Testimonials | Their words | Cleared | ≤40 words. About something that happened on the job, not adjectives (Sage). |
| Credentials | His words (data) | 02 §4 | IATSE 669 (EPK) · Capilano College · American Academy of Dramatic Arts · Motion Picture Orientation, WHMIS, ActSafe. No conflicting dates. |
| Email hand-off sentence | Write | Cantor | Default: "If it's hard to look away from, email me." (It calls back to Home's H1. Only one dry turn per page, so if the names line keeps its turn, this ends plain.) |
| Meta description | Write | — | ≤155 characters. |

**Acceptance seeds:**
- No block wider than 68ch.
- With no portrait and no testimonials, no empty section appears.
- No street address or phone number anywhere in the build output.

### 6.5 Teaching `/teaching`

**Job:** a program director or a would-be student sees where he teaches, what a camp or coaching looks like, and who vouches for him, then emails.

**Sections:**
1. **Bar.**
2. **Opener:**
   - H1, then one or two sentences.
   - ≥1024: one teaching photo (3:2) beside the text. Below 1024 it goes after the text.
   - Without a photo, the text runs at 60ch.
3. **Three blocks**, aligned with `subgrid` so the headings and lists line up; stacked below 1024:
   - **Where I teach:**
     - LaSalle College (2023–present)
     - Vancouver Film School (**waits** on Q16)
     - InFocus Film School (2010–2022)
   - **Programs and camps:**
     - Frames Film Project (founder, with Frog Hollow Neighbourhood House, 2012–2015)
     - Reel Youth: Whatì, NWT and Mississauga (2017–2018)
     - CEDIM, Mexico: visiting professor (2010)
     - camps in Victoria and Toronto
     - remote camps

     The block ends with one line of camp facts: ages, length, what participants leave with, and his vulnerable-sector check (**waits** on O-SITE-14).
   - **One-on-one coaching:** who it's for, what a session covers, how it starts.
4. **In the room:** two or three photos he sends, captioned, with `people` declared (§11).
5. **What people say:** teaching testimonials, at most four, two columns at ≥1024 (max 52ch each). Weighted to program directors and graduates. First name plus role, or anonymous plus role, are allowed here only.
6. **Email hand-off:** "If you run a program or want coaching, email me." (Locked, 06-A §4.) Then the footer.

**Text table:**

| Element | Status | Source | Direction |
|---|---|---|---|
| H1 | Write, with a provisional default | Cantor | Galvanizing register: what students **do**, with a standard. The 03 §8 line "I teach because I like watching people find their voice" is retired (D-SITE-17). Default, pending the fact in O-SITE-14: "Bring a story. You'll leave having directed, shot and cut it." Red phrase: none, or one phrase chosen with the final H1. |
| Opener sentences | Write | 03 §8; intake | ≤40 words: directing, camera and editing; where; for whom. |
| Block headings | Locked | This spec | "Where I teach" · "Programs and camps" · "One-on-one coaching". |
| Block bodies | His words (cut) | Intake | Places spelled as the places spell them (Whatì, Frog Hollow Neighbourhood House). "Founded", not "was involved in". Frames is "for young people facing barriers" (never "at-risk youth"), with the wording checked with him and Frog Hollow. |
| Camp facts line | Write | O-SITE-14 | One line of facts; omitted until answered. |
| Coaching body | Write | Tribune | ≤50 words. Starts from the first step: "Tell me what you're making and where it's stuck." No price. |
| Captions | Write | Him | ≤12 words: program and year. No students' names. |
| Testimonials | Their words | Cleared | ≤40 words, about something that happened. |
| Meta description | Write | — | Directing, camera and editing; camps; coaching. |

**Acceptance seeds:**
- Complete with zero testimonials and whatever photos exist.
- No student named anywhere.
- A photo marked as including minors without the consent fields fails the build.

### 6.6 Contact `/contact`

**Job:** the address, big and copyable. A courtesy; the email is already on every page.

**One block**, left-aligned, max 40rem (amending 06-A's centring, D-SITE-26):
- H1 "No agent, no form, no waiting."
- The email: Display weight, width 80, **not uppercase**, `clamp(2rem, 7vw, 4rem)`, as a `mailto:`.
  - Break it as `hello<wbr>@kryshanrandel.com`, with `overflow-wrap: anywhere` as the last resort.
- **"Copy"** on its own line beneath (§4.3). Hidden without JS.
- One line for the teaching audience (Write, ≤12 words).
- No place line and no socials: the footer directly beneath carries both.

**Text table:**

| Element | Status | Direction |
|---|---|---|
| H1 | Locked, **flagged to him** | "No waiting" promises how fast he replies (Sage, Cantor). Offered alternative: "No agent and no form. Email me." |
| Email, "Copy" / "Copied" / failure line | Locked | — |
| Teaching line | Write | Plain, no "also". |
| Meta description | Locked (Cantor) | "Email Kryshan Randel directly. Director, camera operator, editor and film instructor. Vancouver, works anywhere." |
| **Red phrase** | — | None. |

**Acceptance seeds:**
- The page has no form element.
- Copy works by keyboard and announces.
- At 320 px the address wraps without overflow.

### 6.7 404

**Content:**
- H1 "That page doesn't exist. The work does." (Locked, Cantor; the old line was no longer true once every old URL redirects.)
- "Go to the work →" to `/work`.
- The bar and footer (§4.2).

---

## 7. The copy system

The copywriter writes every **Write** string and cuts every **His words** string against this section. **He approves final words.**

### 7.1 Voice, from his own sentences

**Overall:**
- First person, singular "I", or a collaborator's name. Never "we".
- Direct, warm, unpretentious, dry.
- The kit's dial is the driest of the three: short lines.

**Five rules** (Cantor):
1. **The constraint is the claim.** State time, kit or crew as bare fact. *"Shot on 35mm film in four days."*
2. **Plain setup, odd detail last.** *"…the day after their instructor saw the rough cut with Pan's Labyrinth temp music."*
3. **Credit inside the verb, never as a thank-you line.** *"Co-directed with the artist Myk Gordon, co-edited with Alex Barker."*
4. **Access stated, not sold.** *"I had an hour with the casts of Legally Blonde and Charlie and The Chocolate Factory between photo shoots."*
5. **At most one participle opener per page** ("Shot blocks away…", "Directed and shot during…"). He leans on them, and stacked they read as a template.

**One dry closing turn per page, at most** (Sage). Every other block ends on the fact.

### 7.2 The pillars, as copy (04 Step 8)

- **Wicked, but not nasty:**
  - The dark and funny is in the films and the details, never in insults or shock.
  - "Best Death" stays.
  - No gore described for its own sake.
- **Resourceful, but never cheap:**
  - Constraints are craft, not value-for-money.
  - No "affordable" and no "any budget".
  - "$25" only in Contact Club's story.
- **Galvanizing, but not domineering:**
  - Shown by what happened: an actor won; a script was rewritten around a performance; contests became where he met his collaborators.
  - Never "I empower", "I inspire" or "I bring out the best".
  - Warmth is proven in other people's words.
- **Tie-breaks:**
  - A line that could read as a discount or a plea is rewritten.
  - When the wicked choice and the safe choice conflict, wicked wins, and precision pays for it.

### 7.3 Words

- **Use:** directed, shot, cut, edited, co-edited, co-directed with {name}, founded, taught, rewrote · directing, camera, editing · passion project · pieces · one-person crew · the client's real name · Vancouver, works anywhere.
- **Never, as claims:** passionate, professional, creative, quality, experienced, award-winning (name the award), trusted, versatile, dynamic, **cinematic, storyteller** (banned outright), fun, great, incredible, unique, riveting.
- **Never, as inflation:** tribute, helm/helmed, acclaimed, numerous, famed, legendary, genre legend, premiere/premier as praise, world's number one, most successful, journey.
- **Never, because of the work he wants less of:** wedding, corporate video, content, content creator, videography services, packages, rates, affordable.
- **Never from the intake, as written:** "dark and twisted passion projects", "conservative corporate work", "one-man crew", "I'm not lazy", "eye-opening", "for hire".
- **Never as UI filler:** Welcome, Explore, Discover, "Let's work together", "Get in touch today", exclamation marks, emoji.

### 7.4 Mechanics

- **Spelling:** Canadian throughout: colour, favourite, centre, theatre, neighbourhood, program (a program, not a programme).
- **Names and styling:**
  - **Mary Steenburgen.** 5Rhythms. Kickstart (the DGC program).
  - "BC" in prose; titles exactly as released ("A Very B.C. Production").
  - Outlets as they style themselves: Ain't It Cool News, Exclaim!, imagineNATIVE.
- **Serial comma** only in the roles line (his styling); none elsewhere.
- **Numbers:** numerals for years, counts and awards; words for one to nine in prose.
- **Quotes** are verbatim, with ellipses where cut. **Never alter a quote** to fit these rules; a quote keeps its own exclamation mark ("Just wrong!").
- **Roles** exactly as `roleLabel` wherever a credit is stated.
- **Facts:** every number, date and title traces to 02 §8 or waits on §13. When sources disagree, say less.

### 7.5 Corrections to earlier documents

- **03 §5 and §8** spell "Mary Steenbergen". The correct spelling is **Steenburgen**.
- **03 §8's "more than sixty productions"** isn't supported: his CV lists eleven titles plus "over 40 more". Render the count from `credits.ts`.
- **03 §8's Teaching opener** is retired (D-SITE-17).
- **03 §8's 404 line** is replaced (§6.7).

### 7.6 Shared microcopy (`content/site.ts`; Locked unless marked)

| Where | String |
|---|---|
| Skip link | "Skip to the work" (Home, Work) · "Skip to content" |
| Wordmark name | "Kryshan Randel, home" |
| Nav landmarks | "Primary" · "Social" |
| Tile name | "{Title}, {genre line}" |
| Panel ✕ | "Close {Title}" |
| Copy link | "Copy link" → "Link copied" · failure: "Couldn't copy. The link is selected." |
| Contact copy | "Copy" → "Copied" · failure: "Couldn't copy. The address is selected." |
| Link-out | "Watch on {host} ↗" + hidden ", opens in a new tab" |
| Social links | + hidden ", opens in a new tab" |
| Play (detail page) | "Play {Title}" |
| Work status | "Showing {m} of {n}" · "Showing all {n}" |
| Empty result | "No {role} passion projects yet." · "Show all" |
| Credits | "All {n} credits" · "Full credits on IMDb" · "Behind-the-scenes credits ↓" |
| Back, pagination | "← Work" · "Previous" · "Next" |
| Detail facts | "Awards and selections" · "Press" · "Articles" |
| og:image alt | "{Title}, a still from the film" |
| Photo alt (rule) | What he's doing and where. Adults named only with their OK. Never students. Doesn't repeat the caption. |
| Copyright | None |

### 7.7 Copy inventory

| Page | Locked | His words to cut | To write | Waiting on him |
|---|---|---|---|---|
| Home | H1, roles line, end tiles, nav, meta | — | — | Directing and Camera captions (Proposed), Leo and VFS facts |
| Work | H1, filters, microcopy | "Can't show you" block; credits data | Credits H2 and context, hand-off sentence, meta | Q12 (names and credits) |
| Detail pages | Titles, microcopy | Loglines, stories, awards, press | Hand-off sentence | Q13, Q18, Q19; press verification |
| About | — | Bio, Glimpse paragraph, names line, awards, clients, credentials | Captions, hand-off sentence, meta | Opener pick, Q15, Q12, Q14, portrait, testimonials |
| Teaching | Block headings, the ask | Block bodies | H1, opener, coaching, camp facts, captions, meta | Q16, O-SITE-14, the Frames wording, photos, testimonials |
| Contact | H1 (flagged), microcopy, meta | — | Teaching line | The H1 flag |
| 404 | H1 | — | — | — |

---

## 8. Search, sharing, redirects

- **Titles:** "{Page} — Kryshan Randel"; Home is absolute.
- **Descriptions:** ≤155 characters, unique.
- **Canonicals:** absolute via `SITE_URL`. `NEXT_PUBLIC_SITE_URL` falls back to `https://kryshanrandel.com` (D-SITE-24), so a missing variable never points canonicals at localhost.
- **Sitemap:** `/`, `/work`, `/about`, `/teaching`, `/contact`, every showable detail page. **`robots.txt`** allows everything.
- **Open Graph:** per §6.
- **Structured data:** `Person` on Home and About; `VideoObject` on detail pages (§6.3).
- **Redirects** (D-SITE-25):
  - Explicit, one entry per old URL in the crawl inventory (O-SITE-9).
  - Built in `next.config.ts` from `LEGACY_PATHS` (`lib/routes.ts`) plus `SHOWABLE_PROJECTS`: a showable film's old URL goes to `/work/<slug>`; a held one to `/work`.
  - `/reel/` → `/work` · `/contact-me/` → `/contact` · `/about/` → `/about`.
  - `content/projects.ts` stays importable from `next.config.ts` by relative path, with no alias imports, because `lib/routes.ts` may not import `content/`.
  - At most two hops, the last a 308.

---

## 9. Accessibility (WCAG 2.2 AA)

Handoff §10 applies site-wide. In addition:
- **Landmarks:** one h1 per page, landmarks for the bar, main and footer, and the heading outlines in §3.
- **Focus not obscured (2.4.11):** `html { scroll-padding-top: calc(var(--bar-h) + 1rem) }` on every page, and `scroll-margin-top` on the panel and on `#credits`.
- **Targets** of at least 44 px: nav items, filters, chip, ✕, arrows, end tiles, copy buttons, previous/next.
- **Red 500** appears only at ≥24 px, or as the 20 px/800 wordmark.
- **Motion:** the view transition and 120 ms fades only; everything is instant under reduced motion.
- **Language:** `lang="en-CA"`.
- **New tabs** are announced (§7.6).
- **Captions:** the embed URLs don't suppress the hosts' own captions.
- **Alt text:** posters inside a labelled tile have `alt=""`. Photos are described (§7.6).

---

## 10. Performance

- **Every template:** Lighthouse ≥95 on mobile, CLS 0, **under 200 KB before first paint, measured**. That's PERFORMANCE §1; tighter per-page budgets can't be met, since the runtime plus Archivo is already close to 100 KB.
- **LCP element:**
  - the first poster or the H1 (Home, Work)
  - the poster (detail pages)
  - the H1 (About, Teaching, Contact, 404)
- **No request to a video host before a tap.**
- **JavaScript:** the film leaves, the filter leaf and its pre-paint inline script, and the copy buttons. No global provider.
- **House doc fix:** PERFORMANCE §4 still says `priority`; the Next 16 term is `preload` (fixed in SITE-1).

---

## 11. Rights, consent and privacy (binding)

**Never shown:**
- NDA'd work in any form, including a thumbnail, alt text, a share image or a row.
- Names he may state appear as text only.

**Never anywhere in the build:** his phone number or home address (both are on his CV).

**The events life:** only his interests sentence. No event photos, no event words in any pillar's proof. Ask whether his Instagram or Facebook show the events; if they do, those links come off the site (O-SITE-6).

**Set photos:**
- Studio sets (Fire Country, Leatherface) are held until Q14.
- The Ted Danson photo is held.
- Used by default, confirmed in the one message: the MPIAA PSA shoot, the concert shoot, the multicam archival, the music-video shoot, AD-ing in the Yukon.

**Consent is enforced in two layers** (Mason, Tribune).

**(a) Types:**
- **`Testimonial`:**
  - `quote`, `name`
  - `role` (their role)
  - `relationship: "hirer" | "collaborator" | "graduate" | "program-director"`, with no current-student value
  - `consent: { how: "written"; record: string; date: IsoDate; attribution: "full" | "first-name-role" | "anonymous-role" }`. `record` says where the written OK is kept, for example "email, 2027-03-02".
  - `page: "about" | "teaching"`
- **`Photo`:**
  - `src`, `alt`, `caption`
  - `people: "none-identifiable" | "adults" | { minors: true; guardianConsent: IsoDate; programConsent: IsoDate; communityConsent?: IsoDate }`, required and with no default.

**(b) `content/validate.ts`** throws at build when:
- an About testimonial isn't `attribution: "full"`
- a photo is missing `people`
- a photo includes minors without the consent dates
- a Reel Youth (Whatì) photo lacks `communityConsent`

**Standing rules:**
- A person can withdraw; deleting their entry is the whole process.
- Nobody is ever attributed as a former "at-risk" participant.
- On-screen participants in VANDU and RFFC are never named or described (§6.3).
- **Logos:** names in type until cleared (Q2).
- **Press:** a quote without `verifiedOn` isn't in the file.

---

## 12. Decision log

| ID | Ruling | Tradeoff | Status |
|---|---|---|---|
| **D-SITE-1** | The site is Layout D: Home is Demo D, and the other pages are Layout A's pages as amended here. The D-KRD rulings apply site-wide unless overridden here. | Layout A stays a live reference; §6 wins. | Ruled |
| **D-SITE-2** | Production kit = Kit D, copied into `brand/kits/kryshan.ts`. | Nothing in `review/` survives. | Ruled |
| **D-SITE-3** | Tiles are real links; a plain click opens the panel in place; no prefetch. | Two ways to one film; crawlers, new tabs and shares all work. | Ruled |
| **D-SITE-4** | Work filters hide non-matching tiles before paint on a cold load, and with the view transition on change. This amends 06-A §4's fade. | The page height changes, but only on the visitor's own action. | Ruled |
| **D-SITE-5** | Filters are role links plus one "Passion projects" chip, carried in the URL. | No "paid only" filter; his words forbid naming that lane. | Ruled |
| **D-SITE-6** | `workOrder()`: `FEATURED` first, then newest first, the same inside every filter. | The years look mixed; no chronology is claimed. | Ruled |
| **D-SITE-7** | The credits list lives on Work: released titles only, newest first, 18 visible then expand, a jump link under the header, an IMDb link, then the email. | Adds text to Work. It's the silent regular's reason to visit. | Ruled |
| **D-SITE-8** | Public only if `rights === "public"`. No working video, an unconfirmed clearance or an unapproved frame means `held`. One predicate, one list. | 24–27 at launch; the count tells the truth. | Ruled |
| **D-SITE-9** | Link-outs go to the video's real host, "Watch on {host} ↗", never embedded and never to the old site. | One film leaves the site. | Ruled |
| **D-SITE-10** | Detail pages are poster-first; never autoplay. | One more tap than the panel; the visitor didn't tap to get there. | Ruled |
| **D-SITE-11** | "Copy link" sits in the panel's strip and under a detail page's heading. The email stays alone. | One quiet control. It's how he'll send a producer one film. | Ruled; `[PROVISIONAL — shown to him at first look]` |
| **D-SITE-12** | About: bio ≤200 words, Recognition before the story, optional sections vanish when empty. | Less of his bio shows; the cut is his words. | Ruled |
| **D-SITE-13** | Testimonials: written consent, typed and validated. About takes full attribution only (≤3); Teaching also allows first-name and anonymous forms (≤4). No carousel. | Launch may have none. | Ruled |
| **D-SITE-14** | Contact is an address page with Copy; no form. | Some expect a form; the brief is email only. | Ruled |
| **D-SITE-15** | No analytics at launch. The mailto subject names the film. | We launch without numbers. The old GTM data is the baseline (O-SITE-10). | Ruled; `[PROVISIONAL — Taylor]` |
| **D-SITE-16** | The portrait is optional; with none, no frame anywhere. | About is text-led until he supplies one. | Ruled |
| **D-SITE-17** | The Teaching opener is rewritten in the Galvanizing register; 03 §8's draft is retired. | Loses the gentlest line; that was the point of his review. | Ruled |
| **D-SITE-18** | Email is `CONTACT_EMAIL`, falling back to the alias. The alias must deliver before the first look. | A dead alias loses leads silently. | Ruled |
| **D-SITE-19** | Lint: `app/(site)/**`, `app/*.ts(x)`, `components/**`, `content/**` and `brand/**` may not import `@/review/*`, `@/lib/review/*` or `@/app/review/*`. | — | Ruled |
| **D-SITE-20** | No section, heading or frame renders for missing content. | Pages vary in length. | Ruled |
| **D-SITE-21** | The view transition (the panel, the Work filter) is the standard build's one motion. Anything further is the $250 animations add-on. | — | Ruled |
| **D-SITE-22** | The panel shows the logline and short awards; the story lives on the detail page. | The panel stays light, which answers his "noisy" flag. | Ruled |
| **D-SITE-23** | Panel and detail-page mailto links carry `?subject={Title}`. | — | Ruled |
| **D-SITE-24** | `NEXT_PUBLIC_SITE_URL` falls back to `https://kryshanrandel.com`. | Same pattern as D-SITE-18. | Ruled |
| **D-SITE-25** | Redirects are explicit, one per crawled URL, built from data; at most two hops. | Needs the crawl first. | Ruled |
| **D-SITE-26** | Contact is left-aligned (amending 06-A's centring). Next/previous use `workOrder()`, not the active filter. | — | Ruled |
| **D-SITE-27** | The Directing and Camera captions are amended (§6.1): "for clients"; the checkable names lead; "one-person crew". | Changes strings he saw in Demo D. | `[PROVISIONAL — his OK in the one message]` |
| **D-SITE-28** | Socials move to `content/site.ts`. | — | Ruled |

---

## 13. Open items

**The one message to him** carries O-SITE-1 to O-SITE-8 and O-SITE-14.
- It's sent before SITE-1, with a reply-by date.
- *"Anything unanswered by {date} goes ahead on the stated default."*
- Taylor sends it.

| ID | Item | Default | Blocks |
|---|---|---|---|
| O-SITE-1 | Pillar ranking check | Galvanizing | Nothing |
| O-SITE-2 | A current portrait | None | Nothing |
| O-SITE-3 | About opener A or B | A | Nothing |
| O-SITE-4 | Leo nomination: film title (*A* or *One* Night at Malibuz), his credit (editor or co-editor), category, year | "Leo-nominated as an editor", no title | Launch |
| O-SITE-5 | VFS: current? (Q16) | Removed everywhere | Launch |
| O-SITE-6 | Q12: names and credits he may state, including Aubrey Plaza (directed or camera?) and whether the Rio Theatre PSAs are public. Q2 logos · Q14 set photos · whether his Instagram or Facebook show the events · his preference between hello@ and kryshan@ | Names per 03 §8 with roles; credits per his EPK CV; logos off; studio sets held; socials kept; hello@ | Work and About copy |
| O-SITE-7 | The Bully Solution's Dailymotion URL; the Shotlister spots on his YouTube; VANDU's link | `held` | Nothing |
| O-SITE-8 | Q13 (Wolf clearance), Q17, Q18, Q19 (distributor: Ouat Media, Corus, or Sundance plus Movieola), Q21 | Wolf shown; say less | Detail-page copy |
| O-SITE-9 | Crawl the old site's URLs | — | SITE-1 (redirect data) |
| O-SITE-10 | Access to the old GTM data | — | Nothing |
| O-SITE-11 | Social card (1200 × 630) | Just Watch Us poster | Nothing |
| O-SITE-13 | Replacement frames: Directors Reel, Glimpse, The Bully Solution (Q27) | We pull, he approves; Directors Reel falls back per §6.1 | First look (Home) |
| O-SITE-14 | Teaching: photos, text, testimonials; camp ages, length and what participants leave with; vulnerable-sector check; the Frames wording (with Frog Hollow) | Page ships with what's cleared; the facts line is omitted | Nothing |
| O-SITE-15 | `hello@kryshanrandel.com` delivers (a test from an outside account, dated) | — | **First look** |
| O-SITE-16 | Directing and Camera captions (D-SITE-27) · the Contact H1's "no waiting" | The amended captions; the H1 as is | Nothing |

O-SITE-12 (`uploadDate`) is resolved by `videoPublished`.

---

## 14. Build plan

The phases, dependencies and tickets are in `00-build-order.md` and the `SITE-n` tickets in this folder, authored by Reeve with Mason's placement calls. **Step 1 is porting the approved Demo D into the live site** (`app/(site)/`, `components/composed/work/`). The review layer keeps rendering until the review layer is deleted, just before launch.

---

## Appendix A — The 27 pieces at launch

**Key:**
- H = featured, with its position
- D, C = the Home row it's in (Directing; Camera and editing)
- W = on Work
- P = detail page
- **held** = not public until unblocked

| # | Slug | Where | Lane label | To unblock |
|---|---|---|---|---|
| 1 | just-watch-us | H1 · W · P | DGC BC | — |
| 2 | directors-reel | H2 · W · P | — | Approved frame (O-SITE-13), or the §6.1 fallback |
| 3 | jack | H3 · W · P | Passion project | — |
| 4 | 5rhythms | H4 · W · P | Bettina Rothe | — |
| 5 | the-wolf-of-west-georgia-street | H5 · W · P | Passion project | Q13 (default: shown) |
| 6 | just-up-the-block | H6 · W · P | Courtenay Cohousing | — |
| 7 | contact-club | D · W · P | Passion project | — |
| 8 | born-to-be | D · W · P | Myk Gordon | — |
| 9 | a-very-bc-production | D · W · P | MPIAA, IATSE 669/891, DGC BC, Creative BC | Truncates on the tile; full on the panel |
| 10 | dare | D · W · P | Myk Gordon | — |
| 11 | its-a-crazier-life | D · W · P | Passion project | — |
| 12 | be-reel-green | D · W · P | Creative BC / Reel Green | — |
| 13 | artless | D · W · P | Passion project | — |
| 14 | united8s | D · W · P | Crazy8s | Old slug `united-8s` |
| 15 | riverdale-ew-bts | C · W · P | Entertainment Weekly | — |
| 16 | a-dogs-way-home-epk | C · W · P | Sony Pictures | — |
| 17 | tuts-2026-trailer | C · W · P | Theatre Under The Stars | — |
| 18 | tuts-2025-season-teaser | C · W · P | Theatre Under The Stars | — |
| 19 | tradeswoman-exhibit | C · W · P | Carly Steiman | — |
| 20 | digital-days | C · W · P | IATSE 669/891, DGC BC | — |
| 21 | rffc-were-in-this-together | C · W · P | Richmond Mental Health Consumer and Friends Society | Truncates on the tile |
| 22 | glimpse | W · P when unheld | Passion project | **held** until its frame is approved |
| 23 | the-bully-solution | W · P when unheld | Passion project | **held** until its frame and the Dailymotion URL arrive |
| 24 | twenty8s | W · P | Crazy8s | Title card baked in: fine in the archive |
| 25 | lyons-heart | W · P | Passion project | — |
| 26 | shotlister | — | Shotlister / Zach Lipovsky | **held** until the spots are on his YouTube |
| 27 | vandu | — | VANDU | **held** until a link |

## Appendix B — Sources for §6's data

- **Loglines and stories:** `docs/client/_direction/full-intake.md`, "The work" (Watch and Story per film). The KR-1 deviation said stories were absent because the intake wasn't in the repo; it is now.
- **Credits:** the intake's EPK CV and IMDb paste (Q12).
- **Press:** the intake's Press field and article links, plus the ~24 articles Taylor was emailed (03 §7).
- **Clients:** 02 §4 (Legendary Pictures held, #10).
- **Teaching:** the intake's Associated Professional Experience and bio.
- **The Glimpse anecdote:** `docs/client/writing/4605f881-2ba8-4a52-bb6f-1f5ab3dcc3ae.rtf` (his Berlinale Talents 2017 application).
