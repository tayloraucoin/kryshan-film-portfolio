# SITE-6 — About: the person, then the proof; cleared photos only, full attribution only, nothing private in the build

**Epic:** SITE — Kryshan Randel's live site · **Step 2 (The rest of the site)** · Size: M
**Slice type:** a content page on a trust surface. The risks are:
- a photo or name that wasn't cleared (studio sets, Ted Danson, possible minors in an audience)
- private data shipped in a file (the phone number and address on his CV; EXIF/GPS in a photo)
- builder-written copy passed off as his words
- empty headings and frames where content hasn't arrived yet

**Vigil:** privacy and consent. Review the **build output and `public/`**, not just the rendered page.

**Status:** Draft → ready for execution (authored 2026-09-24)

> **Vigil: trust-surface review.**
> 1. List every file under `public/media/photos/`. Confirm each is one of the cleared files named below, and that no held photo exists anywhere under `public/` (a file in `public/` is fetchable even if no page links it).
> 2. Read each converted file's metadata (for example `sharp(file).metadata()`) and confirm there's no EXIF or GPS.
> 3. Grep `.next-build/` and `public/` for his phone number and street address, as they appear on the EPK CV in `docs/client/_direction/full-intake.md`. Read them there; never paste them into a log, a ticket or a commit.
> 4. Induce each consent failure in `content/`, confirm the build fails with a message written for him, then revert:
>    - an About testimonial with `attribution: "first-name-role"`
>    - a fourth About testimonial
>    - a photo with no `people`
>    - a press pick that doesn't resolve
> 5. Render the page with zero testimonials, zero photos and no portrait, and confirm no empty heading or frame.
>
> QA states which of these it ran.

---

## Outcome

`/about` is the person first, briefly, then the proof, skimmable in under a minute:
- **Opener:** his opener line (default A), then a bio of at most 200 words cut from his own About text, with the person (his interests, the contests where he met his collaborators) before the résumé.
- **Recognition:** his awards, the names line and "Clients include" with the client names in type, and press quotes once SITE-C has verified them.
- **The Glimpse paragraph:** how Justine Warrington's audition made him rewrite the script.
- **On set:** two or three cleared 3:2 photographs, captioned.
- **What people say:** full-attribution testimonials, if any exist.
- **Credentials:** one quiet line.
- **Email hand-off:** "If it's hard to look away from, email me."

Anything that hasn't arrived yet (a portrait, press, testimonials) leaves no heading, frame or gap. No phone number, street address, held photo or event photo exists anywhere in the build.

This slice writes no new copy beyond the strings the spec gives verbatim and the cuts it defines below. SITE-C refines every His-words cut and writes every Write string. Teaching's page and photos are SITE-7.

## Why / intent

- **Spec §6.4:** the page, its section order, its text table and its acceptance seeds.
- **Spec §3:** the heading outline (h1 opener · h2 Recognition (h3 Awards · h3 Directed and shot · h3 Press) · h2 On set · h2 What people say).
- **Spec §11:** binding. Set photos: studio sets held (Q14), Ted Danson held; the MPIAA PSA shoot, concert shoot, multicam archival, music-video shoot and AD-ing in the Yukon used by default. Consent is enforced in two layers. His phone number and home address never appear anywhere in the build. The events life is limited to his interests sentence.
- **D-SITE-12:** bio ≤200 words, Recognition before the story, optional sections vanish when empty.
- **D-SITE-13:** About takes testimonials with full attribution only, at most three; no carousel.
- **D-SITE-16:** the portrait is optional; with none, there's no frame.
- **D-SITE-20:** no section, heading or frame for missing content.
- **Spec §7:** the copy system. §7.3 banned words, §7.4 mechanics, §7.5 corrections (Steenburgen; "more than sixty" unsupported).
- **Scope sheet (SITE-6):** Recognition before the Glimpse paragraph; testimonials with full attribution only; "His-words strings cut **by the rule**, Write strings left to SITE-C with the defaults given in spec §6.4"; photos converted from `docs/client/behind-the-scenes/` at 3:2, ≤1600 px, JPEG, cleared set only.
- **What this slice is NOT (binding):**
  - no rewritten sentences (a rewrite is SITE-C's, and then his)
  - no logos (Q2)
  - no gallery, carousel or lightbox
  - no photo under a video (there are no videos on this page)
  - no event words beyond the interests sentence
- **Ground truth, consumed and never rebuilt:**
  - SITE-2: the `Testimonial` and `Photo` types, `content/testimonials.ts`, `content/validate.ts` and its consent checks, `projects.ts` `press` with `verifiedOn`
  - SITE-3: `components/composed/site/email-hand-off.tsx`, `json-ld.tsx`, and the `Person` builder in `lib/structured-data.ts`
  - SITE-1: the chrome, `siteRoutes.about`, `--bar-h`

## Rulings this slice makes (labelled, logged)

- **"Cut by the rule" means deletion only, from a named source.** This is the spec's **His words** definition, "cut from his text; no new words" (§6 status keys), made operational:
  1. Take whole sentences or clauses verbatim from the named source. Delete words; never add, reword or merge. Whole sentences may be reordered only to meet a direction's paragraph plan.
  2. The only substitutions allowed:
     - Canadian spelling (§7.4; "Neighborhood" → "Neighbourhood", "favorite" → "favourite")
     - §7.5 corrections ("Steenbergen" → "Steenburgen")
     - §4.4 vocabulary ("one-man crew" → "one-person crew")
     - whitespace
  3. Delete anything the direction column, §7.3 or an unresolved 02 §13 conflict forbids.
  4. If a direction can't be met by deletion alone, meet what you can. Never add words to meet it. List the unmet item in the closing note for SITE-C.
  5. Every cut string carries a code comment: `// SITE-C: cut by rule (SITE-6); not approved`.

  Logged.
- **The On-set set at SITE-6 is two photos, with an optional third.** The cleared set is the five §11 names. Spec §6.4 wants two or three **3:2** frames; see **Photos** below for the file-by-file call. Default:
  - the MPIAA PSA shoot
  - AD-ing in the Yukon
  - the music-video shoot, as the third, **only if** a 3:2 crop keeps his whole head and the camera in frame

  Excluded by default:
  - **The concert shoot:** portrait 2:3, which leaves him a small figure at the edge after a 3:2 crop. It also carries a third-party photographer's credit burned into the frame, and that photographer's permission isn't on record.
  - **The multicam archival:** a theatre audience with partly visible faces fills the background, at what the crew shirt suggests is a community arts event. Its `people` value can't be declared honestly without knowing whether any of them are minors.

  Both exclusions are `[NEEDS DECISION — Taylor, via Kryshan: confirm the concert photographer's OK; confirm no minors are identifiable in the multicam audience]`. The default (excluded) costs one fewer photo and is undone by adding one entry. Logged.
- **Captions default to the spec's own labels until SITE-C writes them** `[PROVISIONAL — SITE-C]`. Captions are **Write** (≤12 words, from him), and spec §6.4 gives no default. Each photo ships with the label spec §11 uses for it:
  - "The MPIAA PSA shoot."
  - "AD-ing in the Yukon."
  - "The music-video shoot."

  These name no person. SITE-C replaces them. Logged (DEVIATIONS).
- **Alt text is written by the §7.6 rule, from what is visible,** and flagged for SITE-C. The rule: what he's doing and where; no one named but him; never students; doesn't repeat the caption. It's an accessibility description, not marketing copy. Logged.
- **About's meta description is the H1 (default A) until SITE-C writes one** `[PROVISIONAL — SITE-C]`. The description is **Write** with no default. The H1 is his words, ≤155 characters, and unique on the site. Logged.
- **About's press quotes are picks, not copies.** `content/about.ts` holds `pressPicks: { slug; source }[]` (≤4). The page resolves each pick against that film's verified `press` in `content/projects.ts`, so a quote has one home and can't drift. It ships **empty**: no quote is verified until SITE-C, and an unverified quote isn't in the file (§11). SITE-C adds the picks; the spec names the range ("Wonderfully wrong", "Slickly-made…"). Logged.
- **The captioned photo is a shared composed component.** `components/composed/media/photo-figure.tsx` is a server component rendering one `Photo`: a 3:2 `Frame`, `next/image` with blur, and the caption. Teaching (SITE-7, spec §6.5) provably renders the same type, so it goes in `components/` (CONVENTIONS §0.1). If SITE-7 landed an equivalent first, reuse it and don't fork. `[ASSUMPTION: Mason's placement rule applied; the scope sheet is silent; reversible.]` Logged.
- **The portrait slot is built now and renders nothing until a portrait exists.** `portrait?` in `content/about.ts`, per spec §6.4's layout. O-SITE-2's default is none, so the build ships without one. Building the slot now means that when he supplies a portrait, it's a content edit, not a change round. Logged.

## Experience & states

### Sections, in order (spec §6.4)

1. **Bar** (About `aria-current="page"`). Skip link: "Skip to content".
2. **Opener:**
   - **With a portrait:**
     - ≥1024: the portrait (4:5, one third of the width, `loading="eager"`) beside the text.
     - Below 1024: the H1, then the portrait (max 20rem), then the bio.
   - **Without a portrait (the default):** the text runs at max 60ch.
   - **H1** (max 24ch): "Born and raised in BC, I've been making films for as long as I can remember." This is default A, **Waiting** on O-SITE-3; B is offered in the one message. Red phrase: none (with A).
   - **Bio:** at most 3 paragraphs, ≤200 words, the first ≤60 words. Cut by the rule (below).
3. **Recognition** (h2). Rendered only if at least one of its h3s has content.
   - **Awards** (h3) and **Directed and shot** (h3), two-up at ≥768:
     - Awards: 4–6 lines.
     - Directed and shot: the names line, then "Clients include" followed by the client names in type.
   - **Press** (h3), below them: up to four quotes, 2 × 2 at ≥768. The quote is in italic (the only italic on the page), with the source beneath, linked when `url` exists. **Absent at SITE-6** (the picks are empty).
4. **The Glimpse paragraph:** Lead step, roman, between hairlines, max 52ch. No heading.
5. **On set** (h2): the photos, in a row at ≥768 and stacked below. Each is a `PhotoFigure` (3:2, lazy, blur, caption).
6. **What people say** (h2): About testimonials from `content/testimonials.ts` (`page === "about"`), at most three, stacked. Each shows the quote (roman, not italic), then "{name}, {role}". **Absent when there are none.**
7. **Credentials line:** one line in `muted-foreground`: "IATSE 669 (EPK) · Capilano College · American Academy of Dramatic Arts · Motion Picture Orientation, WHMIS, ActSafe" (spec §6.4; no dates).
8. **Email hand-off** (`EmailHandOff`), sentence: "If it's hard to look away from, email me." This is the spec's default. See Out of scope for the one-dry-turn question, which is SITE-C's. Then the footer.

### Strings: what SITE-6 does with each (spec §6.4 text table)

| Element | Status | SITE-6 ships |
|---|---|---|
| H1 | Waiting, default A | Default A verbatim (above). |
| Bio | His words (cut) | **Cut by the rule** from the "About Me page" block in `docs/client/_direction/full-intake.md` (starts "Born and raised in BC"). See the bio rules below. |
| Glimpse paragraph | His words (cut) | **Cut by the rule** from `docs/client/writing/4605f881-2ba8-4a52-bb6f-1f5ab3dcc3ae.rtf`, the only file that contains the Justine Warrington passage. The intake lists it as the "Berlindale Talent Lab application 2017"; spec §6.4 calls its source the "TIFF Talent Lab 2017 essay", and the file on disk wins. ≤70 words, names Justine Warrington, ends on the script rising to her performance. |
| Awards lines | His words (data) | **By the rule** from 02 §8.1, as "Award, film, festival", with "nominated" and "won" stated exactly. See the awards rules below. |
| Names line | His words (cut) | Cut by the rule from 03 §8: "I've directed Ted Danson, Mary Steenburgen, Peter Gallagher, Kevin Smith, Tom Green and Aubrey Plaza for spots I'm not allowed to show you." The unsupported "more than sixty" clause (§7.5) and "Ask me about them." are deleted so the dry turn ends the line. Adding each name's production is new words, so it's SITE-C's (**Waiting** on Q12). |
| "Clients include" + clients | His words (data) | `CLIENTS` from 02 §4's named list: studios and networks first (Disney, Netflix, Paramount Pictures, Universal Studios, Sony Pictures, The CW, BBC America, CBS, CTV, Hallmark), then the rest in 02 §4's order. **No Legendary Pictures.** Names in type; no logos. SITE-C may shorten it. |
| Press | His words (data) | `pressPicks: []`. The Press h3 is absent. |
| Captions | Write | The spec §11 labels, `[PROVISIONAL — SITE-C]`. |
| Testimonials | Their words | Whatever `content/testimonials.ts` holds for About; none is expected. |
| Credentials | His words (data) | The spec's line verbatim. |
| Email hand-off sentence | Write, default given | The default verbatim. |
| Meta description | Write | The H1 text, `[PROVISIONAL — SITE-C]`. |

**Bio: the rules for this cut.** Apply the deletion rule above, plus:
- Paragraph 1: what he does, and one checkable credit.
- Paragraph 2: the interests sentence **verbatim**, including "host large-scale immersive events". It's the only sanctioned mention of the events life (02 §9, spec §11). Also the contests line ("Through these events, I met many of my favourite collaborators").
- Leave out:
  - the sentence used as the H1
  - every award and festival list (they live in Recognition)
  - "acclaimed" and any other §7.3 word
  - Legendary Pictures (02 §13 #10)
  - Vancouver Film School (O-SITE-5)
  - "since 1999" or any year count (02 §13 #3)
  - the Crazy8s count (§13 #4)
  - the Glimpse distributor (Q19)
  - the Leo film title (O-SITE-4)
  - "for hire" (§4.4)
- First person throughout.

**Awards: the rules for this cut.**
- Use only facts that are unambiguous in 02 §8.1:
  - Jack: Grand Jury Prize and Best Death, Bloodshots Film Festival
  - Glimpse: A&E Short Filmmakers Award, National Screen Institute
  - Contact Club: Best Actor (Riaan Smit), Vancouver Quarantine Performance Project
  - the Leo, per O-SITE-4's default: "Leo-nominated as an editor", with no title
  - optionally, Be Reel Green: screened at VIFF 2018
- Leave out The Bully Solution's awards (**Waiting** on Q18: "when sources disagree, say less") and the archive-level entries.

### Photos: the cleared set, file by file

The mapping from UUID filename to what the photo shows comes from the intake's upload list (`docs/client/_direction/full-intake.md`, the "Behind the scenes" lines near the end). It was checked by eye at authoring. **`[NEEDS VALUE AT BUILD]`:** open each source file and confirm it shows what this table says before converting. If one doesn't match, stop and report it; don't guess.

| Source file (`docs/client/behind-the-scenes/`) | Intake name | What it shows (at authoring) | Size | SITE-6 |
|---|---|---|---|---|
| `e986099a-d2c2-4df1-b8f9-057336ec92bc.jpg` | `MPIC_PSA_shoot.jpg` | Him, masked, directing an actor on an LED-screen stage; camera crew in the foreground. It's likely the A Very B.C. Production shoot (the same skyline as that film's poster), for SITE-C to confirm. | 2000×1333 (3:2); **carries EXIF** | **Use**: `public/media/photos/mpiaa-psa-shoot.jpg`, `people: "adults"` |
| `7964aecd-c7bf-412f-a9f8-b8d2543b6566.jpg` | `ADing_yukon.jpg` | Him with a walkie by a lake; two actors kneeling; boom and camera crew | 2048×1536 (4:3) | **Use**: crop to 3:2 keeping him and the actors, `public/media/photos/ad-ing-yukon.jpg`, `people: "adults"` |
| `7a66c94f-0941-4f7e-8fac-7a4c9a0cef9f.jpg` | `musicvid_shoot.jpg` | Him holding a camera rig on a street shoot; two others | 1638×2048 (4:5) | **Use as the third only if** a 3:2 crop keeps his whole head and the camera: `public/media/photos/music-video-shoot.jpg`, `people: "adults"` |
| `48d9752f-661b-4a04-b3b1-41f376e5eb5f.jpg` | `concert_shoot.jpg` | A band on stage, black and white; him small at the left with a camera; a photographer's credit burned in | 801×1200 (2:3) | **Excluded** (see Rulings) |
| `507dcc0f-8fb4-4bb1-8f31-452b2e88dd83.jpg` | `multicam_archival.jpg` | Him beside a multicam rig in a theatre; audience faces in the background | 2048×1536 | **Excluded** (see Rulings) |
| `32d55eb3-…png`, `4957bce0-…png`, `f975f80f-…png` | `MPIAA PSA BTS 1–3` | The same PSA shoot (`4957bce0` is nearly the same frame as the chosen one) | 2160×1216 | Not used: one photo per shoot. They're alternates if SITE-C prefers one. |
| `7dee3183-…jpg`, `f916aef4-…jpg` | Fire Country EPK, Leatherface | Studio sets | — | **Held** (Q14). Never copied into `public/`. |
| `a9b176af-…jpg`, `with-ted-danson.jpg` | `teddanson.jpg` (the same image twice) | With Ted Danson | — | **Held** (§11). Never copied into `public/`. |
| `3c39f340-…jpg` | `LaSalle_grad.jpg` | A graduation group | — | Not About's (Teaching's photos come only as he sends them, SITE-7). Never copied here. |

**Conversion:**
- Crop to exactly 3:2, framed by eye around him and the action. The crop happens at conversion; the page never CSS-crops.
- At most 1600 px wide (1600×1067), JPEG at quality 82 (the posters' setting).
- **All metadata stripped** (EXIF, GPS, camera and date).
- Kebab-case names, as above.
- Converted with a throwaway script (`sharp` is present via Next). Never commit the script's dependencies. Never `yarn add` for this.

### States (exhaustive)

- **Portrait:** present · absent (the default)
- **Recognition:** all three h3s · some · none (the h2 is gone)
- **Press:** 0 (the default at SITE-6) · 1–4
- **On set:** 0 (the h2 is gone) · 2 · 3
- **Testimonials:** 0 (the default; the h2 is gone) · 1–3
- **Glimpse paragraph:** present · absent (no hairlines, no gap)
- **Credentials line:** always present

### Failure / edge states

- **An About testimonial not `attribution: "full"`:** the build fails (SITE-2's check). With a message for him: "content/testimonials.ts: {name}'s quote is on the About page, which only shows full names. Change `page` to "teaching" or get their OK for their full name."
- **A fourth About testimonial:** the build fails (added here). "About shows at most three testimonials; remove one."
- **A photo with no `people`, or minors without consent dates:** the build fails (SITE-2's check).
- **More than three On-set photos:** the build fails (added here).
- **A press pick that doesn't resolve to exactly one verified `press` entry** on a film that isn't NDA: the build fails (added here), naming the pick.
- **A missing photo file:** the static import fails the build (the posters precedent).
- **The image optimizer is unavailable, or a photo fails to load:** the reserved 3:2 frame shows `bg-muted`, with the caption still beneath it. No layout shift.

## Non-negotiables (this slice)

- **Nothing held, private or unconsented ships.** No studio-set, Ted Danson or LaSalle photo under `public/`, in any form. No phone number or street address anywhere in the build. No event photo or event words beyond the interests sentence. No EXIF or GPS in any shipped image.
- **About testimonials are full attribution only, at most three,** enforced at build, not by review.
- **No new words in a His-words string.** Deletion and the listed substitutions only. Every cut string is flagged for SITE-C.
- **No empty heading, frame or gap** for missing content (D-SITE-20).
- **No logos, no gallery, no carousel, no italic outside press quotes,** and no block wider than 68ch.
- **Static, server-rendered, no client JavaScript on this page** beyond what the chrome already ships.

If the spec would force you to break one of these, **stop and ask**.

## Data & content

**Database: none (static site, no database).**

**Content files:**
- **`content/about.ts`** (new) exports `ABOUT` and `CLIENTS`. `ABOUT` holds:
  - `opener` (H1)
  - `bio: string[]` (≤3 paragraphs)
  - `glimpse`
  - `namesLine`
  - `awards: string[]`
  - `credentials`
  - `photos: Photo[]`
  - `portrait?`, which reuses `Photo` so that `people` is declared and validated; its caption isn't rendered
  - `pressPicks: { slug: string; source: string }[]`
  - `handOff` (the sentence)
  - `description` (meta)

  Each His-words and provisional string carries its `// SITE-C:` comment, and each entry has a one-line comment saying what it is (CONVENTIONS §10a).
- **`public/media/photos/`** (new): the two or three converted JPEGs, imported statically, following `content/posters.ts`'s import pattern.
- **Read only:** `content/testimonials.ts` (`page === "about"`), `content/projects.ts` (`press`), `lib/config.ts` (`SITE.email` via the server page).

**Placement:**
- `app/(site)/about/page.tsx` and `content/about.ts` (Mason's call, build order scope sheet).
- `components/composed/media/photo-figure.tsx` (this ticket's ruling above).
- About-only server pieces (the testimonials list, the press grid), if extracted, go in `app/(site)/about/_components/`.
- JSON-LD `Person` through SITE-3's `lib/structured-data.ts` and `json-ld.tsx`. The same data as Home; no second builder.

**Validators** (added to `content/validate.ts`, messages written for him and listed for `docs/EDITING.md`):
- at most three About testimonials
- at most three On-set photos
- at most four press picks
- every press pick resolves to exactly one verified `press` entry on a film that isn't NDA

SITE-2's consent checks (`attribution`, `people`, minors, Whatì) are consumed as they are.

**AI notes: None.**

**Instrumentation: None (D-SITE-15); the mailto subject is the only signal (D-SITE-23).** About's hand-off mailto carries no subject (spec §4.3 gives subjects to the panel and detail pages only).

## Accessibility

- **One h1.** h2 Recognition → h3 Awards, Directed and shot, Press. h2 On set. h2 What people say. No skipped levels, and no heading for an absent section.
- **Photos:** `figure` with `figcaption`. The alt follows §7.6 and doesn't repeat the caption.
- **Portrait, when present:** alt says it's him ("Kryshan Randel"), with no caption.
- **Press quotes:** `blockquote` + `cite` (or `figure`/`figcaption`). The quote is italic; the source isn't.
- **Testimonials:** `figure` with the attribution in `figcaption`, not in italic.
- **Measure:** no text block wider than 68ch, and the Glimpse paragraph at 52ch.
- **Contrast:** `muted-foreground` for the credentials line and the source lines (7.6:1). The hairlines around the Glimpse paragraph are decorative (`border/40`).
- **Focus not obscured:** the only interactive elements are links (press URLs, the hand-off mailto, the chrome); none sits under the bar when focused.
- **Language** `en-CA`.

## Acceptance criteria (observable; `yarn dev:agent` for the walk, `yarn build:agent` for the build checks)

1. **Order at 1440 (no portrait):** bar · h1 (default A) · bio (≤3 paragraphs) · h2 Recognition with h3 Awards and h3 Directed and shot side by side · the Glimpse paragraph between hairlines · h2 On set with 2–3 photos in a row · the credentials line · the email hand-off · footer. No Press h3 and no "What people say" h2.
2. **Heading outline:** the headings inside `main`, in DOM order, are exactly h1, h2 Recognition, h3 Awards, h3 Directed and shot, h2 On set. Nothing else, with the default content.
3. **The bio:**
   - ≤200 words, ≤3 paragraphs, the first ≤60 words.
   - Contains "host large-scale immersive events" verbatim, and doesn't repeat the H1 sentence.
   - Contains none of: "acclaimed", "Legendary", "Vancouver Film School", "1999", "for hire", "one-man".
   - Every sentence in it exists in the source (after the listed substitutions). The closing note shows the source-to-cut mapping.
4. **The Glimpse paragraph:** ≤70 words, contains "Justine Warrington", max 52ch. Every sentence traces to `4605f881-…rtf`.
5. **The names line** reads exactly as in the table above, including "Mary Steenburgen". There's no count of productions anywhere on the page.
6. **Clients:** `CLIENTS` starts with the ten studios and networks and contains no "Legendary". No logo image is on the page.
7. **Photos on disk:**
   - `public/media/photos/` holds exactly the converted cleared files (2 or 3).
   - Each is 3:2, ≤1600 px wide, JPEG, with no EXIF (reported per file).
   - No held file (Fire Country, Leatherface, Ted Danson, LaSalle) exists anywhere under `public/`: checked by filename and by image size.
   - *(Vigil.)*
8. **Photos on the page:** each renders at 3:2 with a blur placeholder and a caption. At 390 they stack; at ≥768 they sit in a row. No CSS crop: the frame ratio equals the file ratio.
9. **Private data** *(Vigil)*: a grep of `.next-build/` and `public/` for his phone number and his street address (read from the EPK CV in the intake, not written down anywhere) returns nothing. Report "0 matches" without printing the values.
10. **Empty states:**
    - With the default content there's no empty heading, frame or gap.
    - With a temporary local portrait fixture (any 4:5 image, not committed, then reverted): at 1440 the portrait sits beside the text at one third; at 390 it sits between the H1 and the bio, at max 20rem.
    - With the fixture removed, the text runs at 60ch and no frame remains.
11. **Testimonials** *(Vigil)*, with temporary fixtures, reverted after:
    - One full-attribution About testimonial renders under "What people say" with "{name}, {role}", not in italic.
    - A `first-name-role` About testimonial fails `yarn build:agent` with the plain-words message.
    - A fourth About testimonial fails the build.
12. **Press picks:** a temporary pick for a slug with no verified press fails the build, naming the pick. It's reverted, and `pressPicks` ships empty.
13. **Measure:** no text block in `main` computes wider than 68ch (the H1 at 24ch, the Glimpse paragraph at 52ch). Checked at 1440.
14. **Metadata:**
    - `<title>` "About — Kryshan Randel".
    - The description equals the H1 text (provisional) and is unique among built pages.
    - The canonical is `{SITE_URL}/about`.
    - The JSON-LD `Person` is present and identical in content to Home's.
15. **Italic** appears on the page only inside press quotes (none at SITE-6, so none at all).
16. **Performance:** CLS 0 on a cold load; the LCP element is the H1; no page-specific client JavaScript chunk.
17. `yarn verify` passes (lint zero warnings, check-types, build:agent). Browser walk at 1440, 768 and 390 on `/about` via `yarn dev:agent` (never `yarn dev`/`yarn build`). The closing note is appended to this ticket per the kickoff contract, including each cut string's source mapping and any direction item the deletion rule couldn't meet.

## Likely-relevant technical notes (ADVISORY — dev decides)

- **`sharp`:** `sharp(src).extract({ left, top, width, height }).resize({ width: 1600 }).jpeg({ quality: 82 }).toFile(dst)` strips metadata by default (don't call `.withMetadata()`). Rotate by EXIF orientation first if any source has one (none did at authoring).
- **Suggested starting crops (verify by eye):**
  - Yukon: the full width, from about 8% down.
  - Music video: a 1638×1092 band starting about 7% from the top.
- **Static imports** from `public/` give `width`, `height` and `blurDataURL` for free, as `content/posters.ts` does. `next/image` with `placeholder="blur"`, lazy, and a real `sizes` (`(min-width: 768px) 33vw, 100vw`).
- **The awards and Directed-and-shot two-up** is a plain two-column grid at ≥768. Press, when it exists, is 2 × 2 at ≥768.
- **Hairlines** around the Glimpse paragraph: `border-y border-border/40` with vertical padding. It's roman at the Lead step: don't reach for `italic`.
- **RTF source:** `textutil -convert txt` (macOS) turns the essay RTF into readable text for cutting. Don't commit the conversion.

## Dev's call

- Exact field names inside `ABOUT`, as long as the spec §5 names (`CLIENTS`, the photos as `Photo[]`) hold.
- Whether the testimonials list and press grid are extracted into `_components/` or kept inline in the page.
- The crop rectangles, within the rule (3:2, him and the action kept).
- Whether the music-video photo makes the cut, by the stated test. Say which in the closing note.
- The alt text wording, within §7.6's rule.

Anything here with real alternatives goes to `TECHNICAL-DECISIONS.md` at closure (next free `M-SITE-n`).

## Out of scope

- **Refining the bio, Glimpse paragraph and names line (productions and roles, Q12), writing the captions and meta description, and choosing press picks after verification:** SITE-C.
- **Whether the hand-off keeps its dry callback, or ends plain because the names line keeps the page's one turn** (spec §6.4's parenthetical): SITE-C's call. SITE-6 ships the given default.
- **The opener choice (A or B)** and **the portrait:** Kryshan, via the one message (O-SITE-3, O-SITE-2). A content edit when answered.
- **The concert and multicam photos:** blocked on the `[NEEDS DECISION]` above. Added later as one content entry each.
- **Logos:** Q2. Names in type until cleared.
- **Teaching's photos, testimonials and the LaSalle photo:** SITE-7.
- **Press verification (`verifiedOn`):** SITE-C.
- **The credits list and its count:** Work, SITE-4. About renders no production count.
- **Launch-tier checks** (unique descriptions as a build rule): SITE-10.

## Depends on

- **SITE-2:** the `Testimonial` and `Photo` types, `content/testimonials.ts`, `content/validate.ts` (consent checks), and `press` with `verifiedOn` on `Project`. Complete in `PROGRESS.md`.
- **SITE-3:** `EmailHandOff`, `JsonLd`, and the `Person` builder in `lib/structured-data.ts` (the scope sheet: "created here and reused by SITE-5 and SITE-6"). Complete in `PROGRESS.md`. The build order's dependency table lists SITE-2 only; this ticket wins, and the table needs SITE-3 added.

## Recommended Claude Code execution

**Opus 5.5.** This is a trust surface where the right answer is often to ship less: two photos, not five; an empty press block, not an unverified quote; a deleted clause, not a smoother sentence. A cheaper model polishes his bio into new sentences (breaking "His words"), converts all thirteen photos "for later" (putting held studio-set and Ted Danson images on a public URL), keeps the EXIF, and renders a "What people say" heading over nothing.

---

### Claude Code kickoff (paste into the session)

> Build **SITE-6 — About: the person, then the proof** (`docs/specs/03-site-build/SITE-6-about.md`). Model: **Opus 5.5**. **Ship only what is cleared and only his words: deletion-only cuts, cleared photos stripped of metadata, full-attribution testimonials, and nothing rendered for what hasn't arrived.**
>
> Read first, in order:
> 1. this ticket
> 2. `docs/specs/README.md` (the kickoff contract)
> 3. `AGENTS.md`
> 4. `docs/CONVENTIONS.md` (§0, §6, §10a)
> 5. `docs/PERFORMANCE.md` §4
> 6. `docs/specs/03-site-build/site-ux-spec-v1.0.md` §3, §4.1, §4.5, §6.4, §7 (all), §11, §12 (D-SITE-12, 13, 16, 20)
> 7. `docs/client/kryshan-02-success-criteria.md` §4, §8.1, §9, §13
> 8. `docs/client/kryshan-03-copy-and-voice.md` §6 and §8 (the names line)
> 9. the sources: `docs/client/_direction/full-intake.md` (the About Me block; the Behind the scenes upload list) and `docs/client/writing/4605f881-2ba8-4a52-bb6f-1f5ab3dcc3ae.rtf`
> 10. the SITE-2 and SITE-3 tickets and closing notes: reuse, don't fork
> 11. `docs/specs/DEVIATIONS.md` + `docs/specs/TECHNICAL-DECISIONS.md`
>
> Constraints:
> - Routes only from `lib/routes.ts`; env only via `lib/env.ts`; no hex outside `brand/`.
> - Client leaves never import `@/lib/config` (props only).
> - No upward imports, and nothing public imports `review/`.
> - Never copy a held photo into `public/`. Never write his phone number or address anywhere, including logs.
> - Never `yarn dev` or `yarn build`: use `yarn dev:agent` / `yarn build:agent`.
> - If a non-negotiable would have to break, stop and ask.
>
> Close in three places: this ticket's `Status:`, `docs/specs/PROGRESS.md`, and `DEVIATIONS.md` (the provisional captions, alt text and meta description; the photo exclusions), plus `TECHNICAL-DECISIONS.md` for real alternatives. Then tick `03-site-build/00-build-order.md`. Run `yarn verify` and report what it printed. Append a `## Closing note` here: what shipped, the cut-to-source mapping, the photos used, and the one thing SITE-C must know.
