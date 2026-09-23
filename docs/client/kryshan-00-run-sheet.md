# Kryshan Randel — Phase 1 Run Sheet

Vitrine · Lead Web Designer · 2026-09-22
Engagement: Websites for creative work (coded) · $2,000 CAD flat · five pages (project detail pages excluded) · Next.js / TypeScript / Vercel · video embedded from YouTube/Vimeo, never hosted · style guide + self-edit guide + redirects included · no reels cut, no photos shot, no work remade

Phase 1 ends when Kryshan has three paired branding kits and mock home pages in reviewer mode and has left comments. Phase 2 (build spec, real build, first look) starts from those comments.

---

## How this runs

- Every batch is one prompt from you and one working session from me. Reply **"begin batch N"** and I start. Anything extra you want to say goes in the same message.
- Every batch outputs `.md` files (and one PDF at batch 5) under a numbered `kryshan-NN-*` name so the set stays in order in Notion or the repo.
- Each batch consumes the previous ones. I re-read my own earlier outputs rather than the raw intake where I can, so later batches stay fast and consistent.
- Each batch ends with a short sign-off: what was produced, assumptions I made (labelled), and anything I need from you or Kryshan. I will not stop to ask mid-batch unless the gap would change the design.
- Two batches are worth you actually reading before saying "begin": **batch 4 (pillars)** and **batch 6 (layouts)**. Everything downstream inherits them. The others you can wave through.

## Inputs confirmed available

- Intake dossier (in this thread). Supabase signed URLs inside it are valid until roughly Sept 30; I will pull what I need before then.
- Google Drive media folder `1_BLlYrQBekDlpXOYkfVphYIP_rhZz-j4` — reachable via the Drive connector (inspiration, behind-the-scenes, brand assets, project images, portrait).
- Google Drive writing folder `1tyA9GcsDS_looPq1pw_q1vQIVV-tqZ6B` — reachable (three RTF application essays).
- Brand Pillars protocol and Vitrine role prompt (uploaded).
- Sales page (fetched) — fills the engagement socket above.

## Inputs I cannot reach

- `/Users/taylor/Desktop/example sites` — local disk, not reachable from here. Two options, your call at batch 2:
  1. Zip that folder and upload it (preferred — those are the exact screenshots he commented on).
  2. I browse each reference site live with the Chrome extension and take my own screenshots. Slower, and a few of the sites are JS-heavy and may render poorly headless.
- The 24 press articles — attach as a zip or folder at **batch 3**. If they are not ready, batch 3 proceeds on the intake's press quotes and the articles land as an addendum in whichever batch they arrive.

---

## The batches

### Batch 1 — Success criteria (source of truth)

**Input:** intake only.
**Output:** `kryshan-02-success-criteria.md`
The extensive "what they asked for" document. Every want, refusal, constraint, and structural preference from the intake, grouped (site-wide · home · work · about · contact · content & proof · media & rights · behaviour & performance · what must survive · what must never appear) and tagged with one of four confidence levels:

- **Mandatory** — he said it plainly, or the offer requires it.
- **Strong preference** — stated once with a reason, or implied by three or more picks.
- **Optional / possible** — he floated it, hedged it, or said "maybe."
- **Inspired** — not requested, but a clear read of what his picks were pointing at; labelled as my judgment.

Also includes: the three brief-readiness answers (who matters most and their state on arrival; the one action; what a first-timer must believe after 30 seconds), a facts-conflict list (dates and credits that disagree between his CV, IMDb, and bio), and **one consolidated question list for Kryshan** — the only message he needs to answer during Phase 1.
No media reading in this batch; it is the intake, sorted.

### Batch 2 — Taste and style read

**Input:** batch 1 · Drive media (inspiration, BTS, portrait, brand assets, project thumbnails) · reference sites (your zip, or live browse).
**Output:** `kryshan-01-taste-read.md`
Taste thesis (one sentence, specific enough to rule things out) · requirements harvested from lifted features (the email on every page, the thumbnail that expands in place, "art / art I got paid for", horizontal scroll, titles over thumbnails) · hard refusals · what the reference imagery says about light, palette, temperature and texture (mood only; none of it ships) · how his own thumbnails and BTS photos sit on dark vs light grounds · the self-description-vs-picks tension (warm/bold/playful vs 12 dark picks) and where the aspiration should be spent · a first read of the corporate-vs-passion split and the secret-events question.
Numbered 01 because it sits above 02 in the final set; produced second because it needs the media pass.

### Batch 3 — Copy and voice

**Input:** batch 1 and 2 · the three RTF essays · press articles (attach here) · every word he wrote in the intake.
**Output:** `kryshan-03-copy-and-voice.md`
Voice profile from his own writing (sentence length, humour register, how he names people and credits, what he underclaims) · what he wants to say (the two throughlines: storyteller; makes collaborators their best) · how he wants to come across and what he refuses to be · a proof inventory with rights status per item (awards, laurels, press quotes with source, client and cast names he may state but not show, testimonials pending permission) · bio raw material sorted for a short/medium/long cut · words and constructions to avoid · a small bank of in-register structural copy (nav labels, section headers, a hero line or two) written so layouts can be tested against real language, not as final copy.

### Batch 4 — Brand pillars

**Input:** batches 1–3 · Brand Pillars protocol.
**Output:** `kryshan-04-brand-pillars.md`
Step 0 grounding (why he exists to a hirer, the two audiences, the alternatives a producer actually chooses instead, what people already say about him) · brain dump from his words, his picks, and his press · table-stakes cut with the Opposite and Competitor tests shown · **three pillar cards** — same roots, and in most cases the same three pillars, with a different dominant pillar and different guardrails in each, so the three kits in batch 5 are three legitimate positions on the same evidence rather than three unrelated brands · overlaps and essence line per card · Step 6 translation table per card (colour, type, imagery, voice, UI, motion) · my recommendation, stated once.
**Read this one.** A wrong pillar here is cheap to fix now and expensive after batch 5.

### Batch 5 — Three branding kits

**Input:** batch 4 (and 1–3 for content).
**Output:** `kryshan-05-brand-kits.pdf` plus its source (`.html` or `.md`) so a kit can be edited later.
One PDF, three kits, identical structure per kit so he compares like with like:

1. Pillar card and essence line
2. Palette: each brand colour at 50–900 with 500 as the base, plus ground, surface, and text roles; every text/ground pair contrast-checked at real sizes
3. Colour roles — what each colour is *for* (ground, accent, link, hover, division between passion and for-hire, never-use)
4. Typography: pairing, scale, weights, licensing; rendered, not described
5. Voice: the same three demo strings in each kit (title, subtitle, body) plus site-specific examples (home hero H1 and support line, work-section header, about opener, contact line, one thumbnail caption)
6. Media treatment: how a 16:9 thumbnail, a poster frame, and a laurel sit on the ground; one still from his own work in each
7. Motion and interaction stance in two sentences
8. "Never" list

Working hypothesis, to be confirmed by batch 4: each kit owns one of the three colours he is drawn to (red, green, blue) on the black/white he also named, and each spends the "bold, warm, playful" aspiration in a different place. I will say which I'd choose and why, per §3.4, but all three will be built to win.

### Batch 6 — Three site layouts

**Input:** batches 1, 2, 3 (for content) and 5 (for pairing).
**Output:** `kryshan-06-layout-A.md`, `-B.md`, `-C.md`, plus `kryshan-06-layouts-overview.md` (what differs, which kit each pairs with, and why).
Per layout: page map with one job per page (five-page budget, project pages excluded) · the arrival-to-email path · where depth lives (overlay vs detail page vs archive) · the passion/for-hire and director/camera/editing separation expressed as structure · per-page section list with content slots filled from his real material (which videos, which laurels, which logos pending clearance) · component inventory with states · responsive behaviour at three breakpoints · performance and rights notes · the one deliberate genre break. Layouts differ in structure (how the split is expressed, where the reel sits, how the archive is reached), not just in skin.
**Read this one too.**

### Batch 7 — Three Claude Code prompts

**Input:** batches 5 and 6 · your codebase conventions (see below).
**Output:** `kryshan-07-cc-prompt-A.md`, `-B.md`, `-C.md`
Each prompt builds, inside your prepared codebase: a route rendering that kit as a live style page (tokens, type, palette swatches, voice samples) · a route rendering its paired layout markdown · a mock home page with navbar built from that kit and that layout using his real titles, thumbnails, and copy · cross-links between the three · an **Attachments expected** block listing exactly which files to drop in (the PDF, the layout md, the copy doc, media manifest) · a done-when checklist · explicit "do not" lines (no stock, no lorem, no NDA'd work, no autoplay with sound).
**Before this batch I need from you:** framework version and router (app or pages), path convention for the three review routes, how markdown pages are rendered, the reviewer-mode component API or attribute I should hook into, where media lives (local `/public` vs remote URLs), and the token/theming approach you want (CSS variables, Tailwind config, or both).

---

## What comes after Phase 1

Kryshan reviews the three mocks in reviewer mode and leaves comments. I triage every comment as defect / taste adjustment / direction change / scope change, converge on one kit and one layout, and write the build spec for the real site. That is Phase 2, and it is when the three-day first-look clock in the offer starts.

## Standing assumptions (say if any is wrong)

- `[ASSUMPTION]` Direct clients (producers and agencies hiring a director, camera, or editor) are the primary visitor; students and teaching inquiries get their own signposted territory, not the front door.
- `[ASSUMPTION]` The one action is: watch one thing, then email. No form unless he chooses one in the open-questions reply.
- `[ASSUMPTION]` Five pages: Home, Work, About, Contact, plus one held in reserve (likely Teaching, or a Journal/Events page if the private-events question resolves that way). Project detail pages sit behind the Work page and do not count.
- `[ASSUMPTION]` The Bully Solution embeds from Dailymotion or is linked out; the site never hosts video.
- `[ASSUMPTION]` Client logos appear only after Kryshan confirms he may show them; until then they are designed as a slot and populated with names in type.
- `[ASSUMPTION]` The private events side of his life stays off the site unless he says otherwise in the open-questions reply; the "immersive events" line in his bio is his own wording and stays.
- `[ASSUMPTION]` Accessibility target WCAG 2.2 AA.
