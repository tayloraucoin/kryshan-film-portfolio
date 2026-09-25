# SITE-2 — Content model: which films are showable, the one poster source, the home lists, the consent types, and a build that refuses bad content in plain words

**Epic:** SITE — Kryshan Randel's live site · **Step 1 (Demo D goes live)** · Size: L
**Slice type:** Contract / data shape. There is no public surface. It risks four failures:
- A film that shouldn't be public leaks, or one that should be public vanishes silently (D-SITE-8's failure mode).
- A consent rule on minors is typed but not enforced.
- The review layer stops compiling mid-build.
- An error message he can't act on.

The edge cases *are* the ticket.

**Vigil:** a trust surface (consent, minors, rights). Review by **inducing** every failure listed in "Validation", one at a time, on `yarn build:agent`. Then state which were exercised. The list:
- public without poster
- public without logline
- public without video
- held slug in a home list
- unknown slug
- duplicate across home lists
- bad date
- About testimonial with partial attribution
- photo with minors missing a consent date
- Whatì photo without community consent
- link-out to kryshanrandel.com
- "at-risk" in an attribution
- two problems at once (both are reported)

**Status:** Draft → ready for execution (authored 2026-09-24)

> **Mason — data-shape review (routed to you; recommendations inline, counter-propose as M-SITE-2 in `TECHNICAL-DECISIONS.md`).**
> 1. **One flat `Project` type.**
>    - `embed` is optional in the type and required for public films by `validate.ts`.
>    - `isShowable` is a type predicate to `ShowableProject` (where `embed` is required).
>    - The alternative was a union discriminated on `rights`. Recommended against: he edits this file by copying an entry, and a union's type error is unreadable to him, where `validate.ts` says it in words.
> 2. **An entry in `POSTERS` *is* the approval of that frame.** This replaces `posterStatus`. No separate "approved" flag exists to drift out of sync.
> 3. **`logline: string` is required on every entry**, held ones included. All 27 have intake words today. For public films, `validate.ts` checks it isn't blank.
> 4. **Placement of the shared types:**
>    - `IsoDate` and `isIsoDate()` in `lib/iso-date.ts`, because projects, testimonials and photos all need them, and `lib/` is framework-free.
>    - `Photo` in `content/photo.ts`.
>    - `Photo.src` is a `StaticImageData` static import, as posters are: blur, width and height come for free, and a missing file fails the build.
> 5. **The Reel Youth (Whatì) check matches text** (`/wh?at[iì]|reel youth/i` in the caption or alt). The alternative was adding a field the spec's type doesn't have. `[PROVISIONAL — Mason]`. Cost of being wrong: a Whatì photo captioned without the place name slips past the build. SITE-7 accepts photos only as he sends them, and reviews each one.
> 6. **`content/projects.ts` and `content/home.ts` import only by relative path, and never an image or a stylesheet.** This keeps `next.config.ts` able to import them for SITE-5's redirects (spec §8).
> 7. **`validate.ts` collects every problem and throws once.** It is registered by side-effect import in `app/(site)/layout.tsx`. Photo arrays join it through a `PHOTO_SETS` list that SITE-6 and SITE-7 append to.

---

## Outcome

After this slice, one file decides what the public site may show:
- `content/projects.ts`: every film carries `rights: "public" | "held" | "nda"`, and `isShowable` is the single test.
- `SHOWABLE_PROJECTS` is the single list.
- `workOrder()` is the single order.

Every film in that list has, before any page exists to show it:
- an approved poster, from `content/posters.ts` (the only poster source)
- a playable video or a link-out to its real host
- a logline in his own words

Home's lists (`FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW`) and the headline with its red phrase live in `content/home.ts`. Testimonials and photos have types that make consent explicit.

Most importantly, `next build` refuses content that breaks these rules, and says why in words he can act on: which file, which entry, what to do.

- **Held today:** five films (the Directors Reel falls back per spec §6.1).
- **Showable:** 22.

Demo A and Demo D, and B and C, still render exactly as he reviewed them.

Nothing visible on the public site changes in this slice. SITE-3 renders Home from these lists; SITE-4, SITE-5, SITE-6 and SITE-7 render the rest. No story, press or full awards are written here (SITE-C).

## Why / intent

**Rulings this ticket builds:**
- **D-SITE-8:** public only if `rights === "public"`. No working video, an unconfirmed clearance or an unapproved frame means `held`. One predicate, one list. The count tells the truth.
- **Spec §5:** the whole content model. The field table is binding: `none`, `OLD_SITE`, `poster`, `featured`, `lead`, `posterStatus` and `pending` are removed; `logline`, `awardsFull`, `press`, `articles` and `videoPublished` are added.
- **Spec §4.5:** `content/posters.ts` is the only poster source. A missing file fails the build.
- **D-SITE-9:** link-outs go to the real host, `{ provider: "linkout"; host; url }`, never to the old site. After cutover, an old-site link-out redirects to itself (handoff O-6).
- **D-SITE-6:** `workOrder()`: `FEATURED` first, then newest first, ties by title.
- **Spec §6.1:** `FEATURED` and the Directors Reel fallback. **Handoff §6.6:** the row curation rules.
- **Spec §11:** the consent types (a) and the build checks (b). **D-SITE-13:** About takes full attribution only, at most 3; Teaching allows at most 4.
- **Spec §5:** "Every error message is written for him."
- **Build order scope sheet:**
  - The review layer keeps compiling and rendering until SITE-9, with the smallest change, each change logged.
  - Demo A and Demo D must still render.

**What this slice is NOT (binding):**
- It renders no public page and ports no Demo D component.
- It writes no copy beyond cutting loglines by the rule below.
- It changes nothing in `review/` beyond the adaptation list.
- It does not reopen D-SITE-8: "held" is the only way to hide a film.

**Ground truth, consumed:**
- **SITE-1:**
  - `WORK_ROLES` / `WorkRole` and `siteRoutes` from `lib/routes.ts`
  - `LEGACY_PATHS`, whose `{ project }` targets this slice validates
  - the lint walls
- **Existing:**
  - `projectMetaLine`, which stays
  - `lib/media/embed-url.ts` (`VideoProvider`)
  - the 27 JPEGs in `public/media/posters/`

### Rulings this slice makes (labelled, logged)

1. **The five Mason calls in the callout above**, adopted as recommended. `[PROVISIONAL — Mason]` until he ratifies M-SITE-2. Logged.
2. **The Directors Reel fallback applies now**, not at the first look.
   - With `posterStatus` gone, there is no honest way to mark "public, frame not approved".
   - The build order lists it among the current holds "if its frame isn't approved".
   - `[NEEDS VALUE AT BUILD]`: before editing, check whether an approved replacement frame exists. Look for a DEVIATIONS line, a `docs/client/project-images/MANIFEST.md` row, or a Taylor note naming one. None exists at authoring. If one exists, use it:
     - the Directors Reel is public
     - its new JPEG is in `POSTERS`
     - the lists below use the unfallen order
     - the counts become 23 and 4
3. **In the fallback, Contact Club takes the Directors Reel's slot (position 2)** in `FEATURED`, and Born To Be leads `DIRECTING_ROW`.
   - Spec §6.1 says "Contact Club moves up" without a position. The vacated slot keeps every other film where he approved it.
   - Reversible in two lines. Logged.
4. **Loglines are cut by the rule in "Loglines"**, and flagged for SITE-C in the file's header comment.
   - Where the Watch note names only the kind ("PSA", "EPK featurette", "Artist portrait"…), the Story note's first sentence is used instead. The scope sheet names only Watch notes, but a kind-only line repeats the genre line, which §6.3 forbids.
   - The Wolf's line drops a private person's name, which the intake spells two ways (§7.4: "when sources disagree, say less"). That needs one inserted "a", the only non-deletion. Logged.
5. **`validate.ts` enforces more than spec §5's list.** Each addition protects a binding rule that nothing else enforces:
   - every public film has a video (D-SITE-8)
   - link-outs are https and never on `kryshanrandel.com` (D-SITE-9, O-6)
   - no slug appears twice across the Home lists (one tile per film; the open-film store is keyed by slug)
   - the red phrase appears in the headline exactly once (§4.1, one red phrase per page)
   - testimonial counts per page (D-SITE-13)
   - `LEGACY_PATHS` project targets name a real slug, and no `from` repeats (D-SITE-25)
   - "at-risk" never appears in an attribution or a photo's words (§11)

   Logged.
6. **The review adaptation keeps every demo pixel-identical.**
   - Held films keep appearing in the demos, which filter `rights !== "nda"` and are unchanged.
   - Their posters come from a review-only fallback map.
   - The "Frame to be replaced" ribbons come from a review-only set.

   See "Review-layer adaptation". Each file edit is logged. D-KRD-1 ("A's files aren't edited") is departed from with a DEVIATIONS line: the type change makes the edit unavoidable.
7. **`findProject` stays**, for the review layer only. Its doc comment says public code uses `findShowableProject`. SITE-9 deletes it if nothing else imports it. Logged.

## Behaviour & states

**No surface.** The slice is described by the state of the data and by what `next build` does.

### The types (`content/projects.ts`)

```ts
import type { VideoProvider } from "../lib/media/embed-url";
import type { WorkRole } from "../lib/routes";
import type { IsoDate } from "../lib/iso-date";
import { FEATURED } from "./home";

export type ProjectRole = WorkRole;
/** Internal only; never rendered. "passion" shows as "Passion project"; "hire" shows the client's name. */
export type ProjectLane = "passion" | "hire";
/**
 * public: shown everywhere.
 * held: hidden until it's ready (no working video, no approved poster, or a
 *   clearance not yet confirmed). The only way to hide a film.
 * nda: never shown or named, anywhere, in any form (spec §11).
 */
export type ProjectRights = "public" | "held" | "nda";

export type ProjectEmbed =
  | { provider: VideoProvider; id: string } // "youtube" | "vimeo"; ids only
  /** Watched on its real host; shown as "Watch on {host} ↗" (D-SITE-9). Never kryshanrandel.com. */
  | { provider: "linkout"; host: string; url: string };

/** Verbatim, ≤15 words; a quote without verifiedOn isn't in the file (spec §11). */
export type PressQuote = { quote: string; source: string; url?: string; verifiedOn: IsoDate };
export type Article = { outlet: string; title: string; url: string };

export type Project = {
  slug: string;
  title: string;
  year: number;
  roles: ReadonlyArray<ProjectRole>;
  roleLabel: string;
  lane: ProjectLane;
  client?: string;
  kind: string;
  /** One sentence, his words: ≤25 words and ≤155 characters (also the meta description). */
  logline: string;
  /** 1–3 short paragraphs, ≤90 words, separated by a blank line. His words, cut. */
  story?: string;
  /** The short list: one award, two festivals. */
  awards?: ReadonlyArray<string>;
  awardsFull?: ReadonlyArray<string>;
  press?: ReadonlyArray<PressQuote>;
  articles?: ReadonlyArray<Article>;
  /** Required for a public film (content/validate.ts). */
  embed?: ProjectEmbed;
  /** Hand-entered, for VideoObject.uploadDate only. */
  videoPublished?: IsoDate;
  rights: ProjectRights;
};

export type ShowableProject = Project & { rights: "public"; embed: ProjectEmbed };
```

**Exports, each defined once, here:**
- `PROJECTS`, the 27 entries in their existing order.
- `isShowable(p): p is ShowableProject`, which returns `p.rights === "public"` and nothing else (spec §5). `validate.ts` is what guarantees `embed`.
- `SHOWABLE_PROJECTS: ReadonlyArray<ShowableProject>`, in `PROJECTS` order.
- `findShowableProject(slug): ShowableProject | undefined`.
- `workOrder(): ReadonlyArray<ShowableProject>`: `FEATURED` in order, then every other showable film by `year` descending, ties by `title.localeCompare(other, "en-CA")`.
- `projectMetaLine(project)`, unchanged.
- `findProject(slug)`, kept per ruling 7.

**Removed:** `ProjectPoster`, `poster()`, `OLD_SITE`, `{ provider: "none" }`, `poster`, `featured`, `lead`, `posterStatus`, `"pending"`.

**`lib/iso-date.ts` (new):**
- `export type IsoDate = \`${number}-${number}-${number}\``
- `export function isIsoDate(value: string): boolean`: true only for `YYYY-MM-DD` that is a real calendar day, so `2026-02-30` is false.

**`content/photo.ts` (new, types only):**

```ts
import type { StaticImageData } from "next/image";
import type { IsoDate } from "@/lib/iso-date";
/** Who is in the picture. Required, no default (spec §11). */
export type PhotoPeople =
  | "none-identifiable"
  | "adults"
  | { minors: true; guardianConsent: IsoDate; programConsent: IsoDate; communityConsent?: IsoDate };
export type Photo = { src: StaticImageData; alt: string; caption: string; people: PhotoPeople };
```

**`content/testimonials.ts` (new):**

```ts
export type TestimonialConsent = {
  how: "written";
  /** Where the written OK is kept, e.g. "email, 2027-03-02". */
  record: string;
  date: IsoDate;
  attribution: "full" | "first-name-role" | "anonymous-role";
};
export type Testimonial = {
  quote: string;
  /** Always recorded; `attribution` decides what is shown. */
  name: string;
  role: string;
  /** No current-student value, on purpose. */
  relationship: "hirer" | "collaborator" | "graduate" | "program-director";
  consent: TestimonialConsent;
  page: "about" | "teaching";
};
export const TESTIMONIALS: ReadonlyArray<Testimonial> = [];
```

- The file header states the standing rules in plain words:
  - a person can withdraw, and deleting their entry is the whole process
  - never an "at-risk" attribution
  - no quote from anyone who was a minor when taught, unless they're an adult now and consent for themselves
- It also quotes the ask he sends (handoff Appendix D).

### Rights today: 22 public, 5 held

| Slug | Rights | Why (a comment on the entry, citing the open item) | What unholds it |
|---|---|---|---|
| `directors-reel` | held | Replacement frame not approved (O-SITE-13, Q27); the §6.1 fallback | An approved frame: its `POSTERS` line, `rights: "public"`, and restore `FEATURED` and `DIRECTING_ROW` (ruling 3) |
| `glimpse` | held | Frame not approved (O-SITE-13); today's file is 720 × 480, near black | An approved frame |
| `the-bully-solution` | held | Frame not approved (a non-gory one, O-SITE-13), and no Dailymotion URL (O-SITE-7). The old-site link-out is removed (D-SITE-9, O-6) | Both arrive; `embed: { provider: "linkout", host: "Dailymotion", url }` |
| `shotlister` | held | No video: the spots aren't on his YouTube (O-SITE-7). The old-site link-out is removed | The spots on YouTube (an id), or a real-host link-out |
| `vandu` | held | No link (O-SITE-7). Its frame must show no identifiable participant (§6.3) and is checked when it's unheld | A link and a checked frame |
| `the-wolf-of-west-georgia-street` | **public** | Q13's default is "shown" (O-SITE-8) | — (the `"pending"` value is gone) |
| the other 21 | public | — | — |

- Held films with no video carry **no `embed`**.
- Glimpse and the Directors Reel keep their YouTube ids.
- No entry is `nda` today.

### Posters (`content/posters.ts`)

- `POSTERS: Readonly<Record<string, StaticImageData | undefined>>`: one static import per **showable** slug, 22 today, from `@/public/media/posters/<slug>.jpg`, keyed by slug.
- `posterFor(slug): StaticImageData` returns the entry. It throws `Error(\`No approved poster for "${slug}"\`)` if absent, which is unreachable after validation. SITE-3 and later use it.
- **The file's header comment, for him:** "A line here approves that frame. To show a new film: put its JPEG (16:9, at most 1600 px wide) in `public/media/posters/`, add one import and one line here, then set the film's rights to "public"."
- Held films have **no** line (ruling 1, callout 2).
- The six "likely" mappings in `MANIFEST.md` are a first-look confirmation for Taylor, **not** a hold.

### Home lists (`content/home.ts`)

- `FEATURED` (fallback in force): `just-watch-us`, `contact-club`, `jack`, `5rhythms`, `the-wolf-of-west-georgia-street`, `just-up-the-block`.
- `DIRECTING_ROW`: `born-to-be`, `a-very-bc-production`, `dare`, `its-a-crazier-life`, `be-reel-green`, `artless`, `united8s`.
- `CAMERA_ROW`: `riverdale-ew-bts`, `a-dogs-way-home-epk`, `tuts-2026-trailer`, `tuts-2025-season-teaser`, `tradeswoman-exhibit`, `digital-days`, `rffc-were-in-this-together`.
- `HOME_H1 = { text: "I direct, shoot and edit stories that are hard to look away from.", red: "hard to look away from." }` (Locked, §6.1).
- Comments in the file:
  - the curation rules (handoff §6.6)
  - the portrait rule: with a current portrait, `FEATURED` grows to eight (§6.1)
  - the fallback, and how to undo it
- The old `HOME` placeholder keeps `headline` and `support` until SITE-3 deletes it. Its `action` and its `@/lib/config` import are removed (callout 6). `app/(site)/page.tsx` builds its placeholder `mailto:` from `SITE.email` itself.

### Expected `workOrder()` (22, fallback in force)

1. The six in `FEATURED`, in order: Just Watch Us · Contact Club · Jack · 5Rhythms · The Wolf of West Georgia Street · Just Up The Block.
2. Then, by year:
   - 2026: TUTS 2026 Trailer
   - 2025: Dare · Tradeswoman Exhibit · TUTS 2025 Season Teaser
   - 2023: Born To Be
   - 2021: A Very B.C. Production
   - 2019: A Dog’s Way Home EPK · Twenty8s
   - 2018: Be Reel Green
   - 2017: Digital Days · Riverdale EW BTS · United8s
   - 2016: Lyons Heart
   - 2015: RFFC: We’re In This Together
   - 2014: It’s A Crazier Life
   - 2009: Artless

### Loglines (His words, cut by the rule; SITE-C refines all 27)

**The rule:**
1. **Source.**
   - Start from the Watch note in `docs/client/_direction/full-intake.md` "The work", minus "**LEAD WITH THIS** —", a "Short film:" or "The film:" label, the URL, and any remark after it.
   - If what remains only names the kind, or is empty, use the Story note's first sentence instead (ruling 4).
2. **Cuts only.**
   - Keep the first sentence.
   - Then drop trailing clauses until it's at most 155 characters.
   - Remove any word banned by §7.3, or by a §6.3 per-film note, with its clause (or the word alone, if the sentence still stands).
3. **Typography.** First letter capital, a closing period, typographic apostrophes and quotation marks (as the file's titles already use).
4. **No new word**, except the Wolf's "a" (ruling 4).

**The header comment:**

```
// Loglines: his intake words, cut mechanically in SITE-2. SITE-C refines every one (spec §6.3, §7).
```

**The result (the builder copies these):**

| Slug | Source | Logline |
|---|---|---|
| just-watch-us | Watch | 90-second PSA promoting BC directors to be hired by Hollywood studio executives and showrunners. |
| a-very-bc-production | Watch | PSA celebrating the BC film and television’s industry’s big return to work during the Covid-19 pandemic. |
| directors-reel | Watch; "I’ve helmed" cut (§7.3) | Some of the directing highlights from various music videos, web series, short films, PSAs and other projects. |
| artless | Watch | PSA shot in one day created to raise awareness of the BC government’s proposed arts funding cuts. |
| jack | Watch; trailing clause cut (length) | A weekend getaway turns into a horrific nightmare when two couples engage in a perverse pumpkin slaughter. |
| glimpse | Watch, first sentence | Following a devastating breakup, Mary acquires the ability to see the future of her relationships with every man she encounters. |
| born-to-be | Watch | Music video for first single from new album. |
| the-bully-solution | Watch, first sentence; trailing clause cut (length) | Shy eight-year-old Timmy has been picked on his whole life, until school groundskeeper Jack Raddick gives Timmy some tools to deal with bullies. |
| dare | Watch | Music video from “Born To Be” album. |
| just-up-the-block | Story (Watch empty) | PSA for Courtenay Cohousing, a multigenerational community in the Comox Valley. |
| riverdale-ew-bts | Story; "fun" cut (§7.3) | A day of b-roll shooting for Riverdale’s Entertainment Weekly cover story photo session. |
| twenty8s | Story; "most successful" cut (§6.3) | Twenty year anniversary video of Vancouver’s short film related event Crazy8s. |
| united8s | Watch | Opening Film for the 2017 Crazy8s Gala. |
| a-dogs-way-home-epk | Story, first sentence | Camera operator for a behind the scenes interview with star Ashley Judd. |
| shotlister | Watch | Series of ads for the filmmaker app. |
| contact-club | Watch; trailing clause cut (length) | In a world where human contact is illegal, a secret encounter between a touch-starved client and a contact provider becomes more dangerous. |
| the-wolf-of-west-georgia-street | Watch; the name dropped (§7.4), "a" added (ruling 4) | Fake movie trailer created for a fortieth birthday party. |
| its-a-crazier-life | Watch | Opening film for the Crazy8s gala event. |
| lyons-heart | Story, first sentence | A portrait of local visual artist Jennifer Lyons. |
| vandu | Story, first sentence (§6.3: the organisation only) | PSA for VANDU, an organization dedicated to improving the lives of drug users, their families, and our communities. |
| digital-days | Watch; participle clause cut (length) | A video summary of the day-long conference and trade show put on by IATSE 669, IATSE 891 and DGC BC. |
| be-reel-green | Watch | The first in a series of videos I shot and directed for Creative BC, with the goal of reducing the BC film industry’s impact on climate change. |
| rffc-were-in-this-together | Story, cut to its noun phrase ("premiere", "tribute", "incredible" cut, §6.3, §7.3) | Profile of Richmond’s mental health community engagement organization. |
| 5rhythms | Story | Promotional video for a dance practice I’ve been a part of since 2013. |
| tradeswoman-exhibit | Story, first sentence | An exhibit featuring portraits of several close friends and colleagues. |
| tuts-2025-season-teaser | Story; trailing clause cut (length) | I had an hour with the casts of Legally Blonde and Charlie and The Chocolate Factory between photo shoots. |
| tuts-2026-trailer | Story | Filmed the premieres of both The Little Mermaid and Sister Act, then cut them into trailers for their summer seasons. |

All 27 are at most 155 characters (checked at authoring).
- Be Reel Green runs 27 words, over §5's 25-word limit. SITE-C cuts it; SITE-10's launch tier checks characters only.
- Grammar and tense are SITE-C's. The builder does not fix them.

### Validation (`content/validate.ts`)

**Shape:**
- Pure functions that each return a list of problem strings:
  - `checkProjects`
  - `checkPosters`
  - `checkHomeLists`
  - `checkTestimonials`
  - `checkPhotos(file, photos)`
  - `checkLegacyPaths`
- `export const PHOTO_SETS: ReadonlyArray<{ file: string; photos: ReadonlyArray<Photo> }> = []`. SITE-6 and SITE-7 append their arrays here.
- Then, at module level: run them all. If any problem exists, `throw new Error` with the header "The site can't be built until these are fixed:", each problem numbered on its own line.
- `app/(site)/layout.tsx` gains `import "@/content/validate";` as its first import. Any violation fails `next build`, and shows in the `dev:agent` overlay.

**The checks and their messages.** `{…}` is filled from the entry; every message names the file and the fix.

| # | Check | Message (for him) |
|---|---|---|
| 1 | Slugs unique in `PROJECTS` | `content/projects.ts: two films use the slug "{slug}". Each film needs its own slug, because it becomes the page address /work/{slug}. Rename one.` |
| 2 | A poster for every public film | `content/posters.ts: "{title}" is public but has no poster. Add a line for "{slug}" to content/posters.ts, or set its rights to "held" in content/projects.ts until the poster is ready.` |
| 3a | Home lists name real films | `content/home.ts: {LIST} names "{slug}", but there is no film with that slug in content/projects.ts. Check the spelling.` |
| 3b | Home lists name public films only | `content/home.ts: {LIST} names "{title}", which isn't public (its rights are "{rights}"). Take it out of {LIST}, or make it public in content/projects.ts.` |
| 4 | Every date is a real `YYYY-MM-DD` (press `verifiedOn`, `videoPublished`, testimonial `consent.date`, photo consent dates) | `{file}: "{entry}" has the date "{value}" in {field}. Write dates as year-month-day, like 2026-03-02.` |
| 5 | A logline on every public film | `content/projects.ts: "{title}" is public but has no logline. Write one sentence about the film in its logline, or set its rights to "held".` |
| 6 | About testimonials are full attribution (§11 b) | `content/testimonials.ts: the quote from {name} is on the About page, which shows full names and roles only. Set its attribution to "full" (with their OK), or move it to the Teaching page.` |
| 7 | Every photo says who is in it (§11 b) | `{file}: the photo "{caption}" doesn't say who is in it. Set people to "none-identifiable", "adults", or the minors form with its consent dates.` |
| 8 | A photo with minors has both consent dates (§11 b) | `{file}: the photo "{caption}" shows young people but is missing {guardianConsent / programConsent}. Add the date of the parent's or guardian's written OK and of the program's written OK, or remove the photo.` |
| 9 | A Reel Youth (Whatì) photo has community consent (§11 b; callout 5) | `{file}: the photo "{caption}" is from Reel Youth in Whatì and needs communityConsent: the date the community gave its OK. Add it, or remove the photo.` |
| 10 | Every public film has a video (ruling 5) | `content/projects.ts: "{title}" is public but has no video. Add its YouTube or Vimeo id, or a link-out to where it's hosted, or set its rights to "held".` |
| 11 | Link-outs are https and not on the old domain (ruling 5) | `content/projects.ts: "{title}" links out to {url}. A link-out must go to where the video really lives, over https, and never to kryshanrandel.com, which becomes this site.` |
| 12 | No slug twice across `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW` (ruling 5) | `content/home.ts: "{title}" is in both {LIST A} and {LIST B}. A film appears once on the home page; take it out of one.` |
| 13 | The red phrase is in the headline exactly once (ruling 5) | `content/home.ts: the red phrase "{red}" must appear word for word, once, in the headline "{text}". Change one to match the other.` |
| 14 | At most 3 About and 4 Teaching testimonials (D-SITE-13) | `content/testimonials.ts: the {About / Teaching} page shows at most {3 / 4} quotes, and {n} are marked for it. Remove one{, or move it to Teaching}.` |
| 15a | `LEGACY_PATHS` project targets exist (ruling 5) | `lib/routes.ts: the old address {from} points at "{slug}", but there's no film with that slug in content/projects.ts. Point it at the right slug.` |
| 15b | No `from` repeats | `lib/routes.ts: the old address {from} is listed twice. Keep one.` |
| 16 | "at-risk" never in a testimonial's `role` or a photo's `caption` or `alt` (ruling 5) | `{file}: "{entry}" uses the words "at-risk". Nobody on this site is described that way; name the role or the program instead.` |

- Check 7 is also a type error: `people` is required. The runtime check covers entries forced past the type.
- Check 8's dates are checked by check 4.
- Messages are plain strings in `validate.ts`, one constant or template per check, so SITE-10 can copy them into `docs/EDITING.md` word for word.

**States (exhaustive):**
- clean (the build passes, no output)
- one problem (the build fails and lists 1)
- several problems (the build fails and lists all of them, numbered)
- in `dev:agent`, the same list in the error overlay

**Failure / edge states:**
- **A held film named in a Home list:** check 3b, never a silent drop.
- **A public film with no poster file on disk:** the static import fails the build first, with Next's "Module not found" naming the path. Check 2 covers a missing line.
- **`next.config.ts` can't import `content/projects.ts`:** SITE-5 breaks. Prevented by callout 6 and proved by criterion 12.
- **The Directors Reel's frame is approved mid-slice:** take ruling 2's branch. The lists revert to the unfallen order.

### Review-layer adaptation (the smallest change; each file one DEVIATIONS line)

1. **New file: `review/mocks/_components/review-posters.ts`.**
   - `reviewPoster(slug): StaticImageData` returns `POSTERS[slug]`, else a review-only static import. Those exist only for the slugs with no `POSTERS` line: `directors-reel` (while held), `glimpse`, `the-bully-solution`, `shotlister`, `vandu`.
   - `FRAME_TO_REPLACE: ReadonlySet<string>` = the slugs the demos ribboned whose new frame isn't approved: `directors-reel` (while held), `glimpse`, `the-bully-solution`.
2. **`review/mocks/_components/project-player.tsx`:**
   - `poster` → `reviewPoster(project.slug)`
   - `project.posterStatus === "replace"` → `FRAME_TO_REPLACE.has(project.slug)`
   - `embed.provider === "none"` → `!embed` (the "Link pending" branch)
   - The link-out branch still reads `embed.url`.
3. **`review/mocks/_components/expanding-grid.tsx`, `expanding-index.tsx`, `featured-lightbox.tsx`, `reel-strip.tsx`, `home-d/film-tile.tsx`**, the same three substitutions where each occurs:
   - `project.poster` → `reviewPoster(project.slug)`
   - `posterStatus` → `FRAME_TO_REPLACE`
   - `project.embed.provider` → `project.embed?.provider`
4. **Unchanged:**
   - `review/mocks/home-a.tsx` to `home-d.tsx`: their own slug lists and `rights !== "nda"` filters, so held films still show in the demos, as he reviewed them
   - `home-d/posters.ts` (`DEMO_D_POSTERS`)
   - every other review file

## Non-negotiables (this slice)

- **One predicate, one list, one order.** `isShowable`, `SHOWABLE_PROJECTS` and `workOrder()` are defined once, in `content/projects.ts`. Nothing else decides what's public.
- **"held" is the only way to hide a film.** There is no other flag, filter or list.
- **No NDA'd work anywhere**, including alt text, a share image or a row (§11).
- **An unverified press quote isn't in the file.** `verifiedOn` is required by the type.
- **Consent is typed and enforced.** No testimonial without written consent. No photo without `people`. No minors without both dates.
- **Every error names the file, the entry and the fix, in plain words.**
- **The review layer compiles and every demo renders as it did.**

## Data & content

**Database: none (static site, no database).**

**Content files:**
- `content/projects.ts`: reshaped as above.
- `content/posters.ts`: new; 22 static imports.
- `content/home.ts`: `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW`, `HOME_H1`; `HOME` trimmed.
- `content/testimonials.ts`: new; empty array.
- `content/photo.ts`: new; types only.
- No data is added to `story`, `awardsFull`, `press`, `articles` or `videoPublished` (SITE-C). The existing `awards` short lists are unchanged.

**Placement** (Mason's call, build order scope sheet; the five open calls are routed in the callout):
- **Content:**
  - `content/projects.ts`, `content/posters.ts`, `content/home.ts`
  - `content/testimonials.ts`, `content/photo.ts`
  - `content/validate.ts`
- **Lib:** `lib/iso-date.ts`
- **App:**
  - `app/(site)/layout.tsx` (the side-effect import)
  - `app/(site)/page.tsx` (the placeholder's `mailto:`)
- **Review:** the files in "Review-layer adaptation"
- **Docs:** `docs/specs/TECHNICAL-DECISIONS.md` (M-SITE-2)

**Validators:** `content/validate.ts`, checks 1–16 above. Launch-tier checks are SITE-10's:
- logline ≤155
- unique descriptions
- the approved frame

Since an entry in `POSTERS` *is* the approval, SITE-10's frame check may reduce to check 2.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).**

## Accessibility

**None — no surface in this slice.** Two data rules serve later surfaces:
- `Photo.alt` is required.
- `logline` exists on every film, so SITE-3's panel and SITE-5's description are never empty.

## Acceptance criteria (observable; induced failures on `yarn build:agent`, each reverted before closing)

1. **The shape.** `content/projects.ts` exports exactly the types and functions in "The types".
   - `grep -rnE "posterStatus|OLD_SITE|\"pending\"|provider: \"none\"|\.featured|\.lead\b|ProjectPoster" content app components lib` finds nothing.
2. **Rights.**
   - 22 entries are `public` and 5 are `held`: `directors-reel`, `glimpse`, `the-bully-solution`, `shotlister`, `vandu`. Or 23 and 4 under ruling 2's branch, stated in the closing note.
   - Each held entry carries a comment with its reason and open-item ID.
   - `the-wolf-of-west-georgia-street` is public.
   - No entry has an `embed` pointing at `kryshanrandel.com`.
3. **Showable list.**
   - `SHOWABLE_PROJECTS.length` is 22.
   - `findShowableProject("glimpse")` is `undefined`; `findShowableProject("jack")` is Jack.
   - `workOrder()` returns exactly the 22 in the order under "Expected `workOrder()`".
4. **Posters.**
   - `POSTERS` has exactly the 22 showable slugs as keys, each a static import with `blurDataURL`.
   - No held slug has a line.
5. **Home lists.** `FEATURED`, `DIRECTING_ROW`, `CAMERA_ROW` and `HOME_H1` equal the lists above, and every slug in them is showable.
6. **Loglines.** Every entry's `logline` equals the table, character for character. The file header carries the SITE-C flag.
7. **Consent types.**
   - `TESTIMONIALS` is `[]`, typed.
   - `Photo` and `PhotoPeople` match spec §11 (a).
   - A `Testimonial` literal with `relationship: "student"` fails `yarn check-types`.
   - So does a `Photo` without `people` (tried in a scratch file, then removed).
8. **Clean build.** `yarn build:agent` passes with no validation output.
9. **Every check fails the build in words** *(Vigil)*. Each induced violation fails `yarn build:agent` with that check's message and the entry named:
   - (a) Jack's `POSTERS` line removed → check 2
   - (b) `glimpse` added to `FEATURED` → 3b
   - (c) `"jak"` added to `CAMERA_ROW` → 3a
   - (d) a press quote on Jack with `verifiedOn: "2026-02-30"` → 4
   - (e) Jack's logline set to `""` → 5
   - (f) a temporary About testimonial with `attribution: "first-name-role"` → 6
   - (g) a temporary `PHOTO_SETS` entry: minors with `programConsent` missing, forced past the type with a cast → 8
   - (h) the same photo captioned "Reel Youth, Whatì, 2017" with both dates and no `communityConsent` → 9
   - (i) Jack's `embed` removed → 10
   - (j) Jack's `embed` set to `{ provider: "linkout", host: "Old site", url: "https://kryshanrandel.com/project/jack/" }` → 11
   - (k) `jack` added to `DIRECTING_ROW` → 12
   - (l) `HOME_H1.red` set to `"hard to look at."` → 13
   - (m) four temporary About testimonials → 14
   - (n) a temporary `LEGACY_PATHS` row targeting `{ project: "jak" }` → 15a
   - (o) a testimonial with role "Former at-risk participant" → 16

   The closing note lists which ran.
10. **All problems at once.** (a) and (e) induced together fail one build that lists both, numbered 1 and 2.
11. **Dev overlay.** With (e) induced, `yarn dev:agent` shows the same message on `/`.
12. **`next.config.ts` can import the model.**
    - `content/projects.ts` and `content/home.ts` contain no `@/` specifier and no image or CSS import (grep).
    - A temporary `import { SHOWABLE_PROJECTS } from "./content/projects"` plus a `console.log(SHOWABLE_PROJECTS.length)` in `next.config.ts` builds and prints 22. Removed.
13. **Review layer.**
    - `/review/mocks/home-a/kryshan-a`, `home-b/kryshan-b`, `home-c/kryshan-c` and `home-d/kryshan-d` match screenshots taken before this ticket at 1440 and 390, including the Directors Reel's "Frame to be replaced" ribbon on A and D.
    - Opening Jack in Demo D plays.
    - `git diff --stat review/` lists only the files in "Review-layer adaptation".
14. **Placeholder Home** `/` still renders inside SITE-1's shell, and its Email link is `mailto:` + `SITE.email`.
15. **Lint walls still hold.** `grep -rn "@/review\|@/lib/review" content` finds nothing.
16. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/` and the four demo routes, via `yarn dev:agent` (never `yarn dev` or `yarn build`). Closing note in this ticket per the kickoff contract.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **`noUncheckedIndexedAccess`** already makes `POSTERS[slug]` `T | undefined`. `posterFor` exists so pages don't each write the same guard.
- **The side-effect import:** a module-level `throw` during "Collecting page data" or prerender fails `next build` with the message. Confirm the message isn't swallowed or redacted in the output (criterion 9); if it is, `console.error` the list before throwing.
- **Relative imports:** `next.config.ts` is compiled by Next itself. Extensionless relative TS imports resolve there, as `import "./lib/env"` already does. A type-only `@/` import would also be erased, but the rule is simpler to check as "no `@/` at all" in these two files.
- **`localeCompare(…, "en-CA")`** puts "Tradeswoman Exhibit" before "TUTS 2025 Season Teaser" (primary strength ignores case). The expected order above assumes that.
- **Forward contract for SITE-3:**
  - The title cell splits `HOME_H1.text` on `HOME_H1.red`.
  - The panel reads `logline` and `awards`.
  - `workOrder()` feeds next and previous in SITE-5.
  - "All {n} pieces" is `SHOWABLE_PROJECTS.length`.
- **Forward contract for SITE-6 and SITE-7:** append `{ file: "content/about.ts", photos: ABOUT_PHOTOS }` (or teaching) to `PHOTO_SETS`, and render testimonials by `attribution`. `name` is always recorded; it is shown only for `"full"`.

## Dev's call

- How each `check*` function is internally structured, and how the problems are formatted beyond the header, numbering and the messages above.
- Whether `workOrder()` memoizes.
- The exact comments' wording, as long as they carry the facts named above.
- The review-only import names in `review-posters.ts`.

## Out of scope

- **Rendering any of this** (Home, the tile, the panel, the posters on a page): SITE-3. **Porting the film components:** SITE-3. Spec §4.3's heading says "SITE-2"; the build order's scope sheet governs sequence.
- **Stories, `awardsFull`, verified `press`, `articles`, `videoPublished`, and refined loglines:** SITE-C.
- **`STRANDS` caption amendments and the Teaching fallback line:** SITE-3.
- **`content/credits.ts`:** SITE-4. **`content/about.ts`, `content/teaching.ts` and their photos:** SITE-6 and SITE-7, which register in `PHOTO_SETS`.
- **Redirects from `LEGACY_PATHS`:** SITE-5. This slice only validates the targets.
- **Launch-tier checks and `docs/EDITING.md`:** SITE-10.
- **Confirming the "likely" poster mappings** (`MANIFEST.md`): Taylor, before the first look. **Pulling replacement frames** (O-SITE-13): Kryshan, or Vitrine with his OK.
- **Deleting `DEMO_D_POSTERS`, `review-posters.ts` and `findProject`:** SITE-9.

## Depends on

- **SITE-1** — Complete in `PROGRESS.md`. Takes from it:
  - `WORK_ROLES` / `WorkRole` and `siteRoutes` (`lib/routes.ts`)
  - `LEGACY_PATHS` (validated here)
  - the lint walls
  - `SiteShell` (the placeholder Home renders inside it)

## Recommended Claude Code execution

**Opus 5.5.** The value is in the edge cases:
- consent on minors
- the held/showable boundary
- the fallback branch
- five review files that must change without changing a pixel

A cheaper model tends to:
- make `isShowable` also check `embed` or a poster, so a broken film vanishes silently instead of failing the build (D-SITE-8's exact failure)
- "fix" a logline's grammar, writing copy SITE-C owns
- let a review demo drop the Directors Reel because it has no `POSTERS` line

---

### Claude Code kickoff (paste into the session)

> Build **SITE-2 — Content model** (`docs/specs/03-site-build/SITE-2-content-model.md`). Model: **Opus 5.5**. **One predicate, one list, one order. "held" is the only way to hide a film. Bad content fails the build in words he can act on.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/03-site-build/SITE-1-foundation.md` (Complete; reuse `WORK_ROLES`, `siteRoutes`, `LEGACY_PATHS` and `SiteShell`, don't fork them)
> 3. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §4.5, §5, §6.1, §6.3 (per-film notes), §7.3, §7.4, §8, §11, §12 (D-SITE-6, 8, 9, 13), Appendix A
> 4. `docs/specs/03-site-build/00-build-order.md` (SITE-2 scope sheet)
> 5. `docs/specs/02-review-demo-d/demo-d-ux-handoff-v1.md` §6.4, §6.6, Appendix D
> 6. `content/projects.ts`, and every file in "Review-layer adaptation"
> 7. `docs/client/_direction/full-intake.md` "The work"
> 8. `docs/client/project-images/MANIFEST.md`
> 9. `AGENTS.md`
> 10. `docs/CONVENTIONS.md` §0 and §10a
> 11. `docs/specs/README.md`
> 12. `docs/specs/DEVIATIONS.md`
> 13. `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Routes from `lib/routes.ts`. Env via `lib/env.ts`. No hex outside `brand/`.
> - Client leaves never import `@/lib/config` (none is added here).
> - No upward imports; nothing public imports `review/`.
> - `content/projects.ts` and `content/home.ts` import only by relative path, and never an image.
> - Copy the loglines from the table; write no other copy.
> - Never run `yarn dev` or `yarn build`; use `yarn dev:agent` and `yarn build:agent`.
> - If this ticket would force you to break a non-negotiable, stop and ask.
>
> Close in three places:
> 1. this ticket's Status
> 2. `docs/specs/PROGRESS.md`
> 3. `DEVIATIONS.md`, one line per review file, plus ruling 2's outcome, the logline rule and the Wolf insertion; M-SITE-2 in `TECHNICAL-DECISIONS.md`
>
> Then tick `03-site-build/00-build-order.md`. Run `yarn verify` and report what it printed, and which induced failures you ran.

---

## Closing note

_(Written by the builder at closure: what shipped · ruling 2's branch (fallback or approved frame) · the induced failures run · deviations · the one thing SITE-3 must know.)_
