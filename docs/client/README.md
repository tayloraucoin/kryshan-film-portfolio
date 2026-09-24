# Client deliverables — Kryshan Randel

Everything Vitrine produced for this engagement (Phase 1, batches 0–7) plus the raw material Kryshan supplied, filed here so no build thread depends on a chat attachment. Read `prompts/kryshan-07-cc-prompts-readme.md` first when building the review round.

Nothing in this folder is served. Raw media here is the source; what the site uses is converted into `public/media/`.

## Vitrine's batches

| File | Batch | What |
|---|---|---|
| `kryshan-00-run-sheet.md` | 0 | How Phase 1 runs and what each batch produces. |
| `kryshan-01-taste-read.md` | 2 | Expression: taste thesis, what his picks say, colour, type, media treatment. |
| `kryshan-02-success-criteria.md` | 1 | **Source of truth.** Every want, refusal and constraint, tagged; §3.5 is the 27-piece inventory; §13 fact conflicts; §14 the open questions. |
| `kryshan-03-copy-and-voice.md` | 3 | Voice profile and the copy bank; §8 is what the mocks say. |
| `kryshan-04-brand-pillars.md` | 4 (v2) | The three pillar cards behind kits A, B, C. **Amended 2026-09-24:** Step 8 holds the operative Card A v2 (Wicked · Resourceful · Galvanizing; Generous retired). |
| `branding/kryshan-05-brand-kits.pdf` | 5 | The three kits, rendered. Visual target for the kit pages. Never goes in `public/`. |
| `branding/kryshan-05-tokens.json` | 5 | **The only source of colour values.** Ramps, roles, fonts per kit. |
| `branding/kryshan-05-brand-kits-source.py` · `kryshan-05-color-utils.py` | 5 | The PDF's source; the never-lists, voice strings and media rules per kit are in here as data. |
| `kryshan-06-layouts-overview.md` · `kryshan-06-layout-{A,B,C}.md` | 6 | The three layouts. Copied verbatim into `review/layouts/` by KR-1..3. |
| `prompts/kryshan-07-cc-prompt-{A,B,C}.md` · `prompts/kryshan-07-cc-prompts-readme.md` | 7 | The Claude Code prompts for the three review trios. Their acceptance criteria are mirrored in `docs/specs/KR-{1,2,3}-*.md`. |
| `prompts/PRIMER.md` | — | What to paste into a fresh thread to run KR-1 (then B, then C). |
| `kryshan-08-review-synthesis.md` | 8 | The review round triaged: verdict, takeaways, every comment classified, the pillar replacement, what is still open. Input to `docs/specs/02-site-build/`. |
| `_direction/` | — | Taylor's direction files: the original intake (`full-intake.md`) and the round's submission (`review-stage-feedback.md`). Source material, read-only. |

## Kryshan's raw material

| Folder | What | Where it is used |
|---|---|---|
| `project-images/` | The 27 poster screenshots he uploaded (28 files; one duplicate). `MANIFEST.md` maps each file to its slug. | Converted to `public/media/posters/<slug>.jpg` (1600 px, JPEG q82). Three need replacing (02 §14 Q27). |
| `behind-the-scenes/` | 13 on-set photos, including `with-ted-danson.jpg`. | About page, later. Studio-set photos held until cleared (02 §14 Q14). Not converted yet. |
| `writing/` | His three application essays (RTF). Voice source only. | Nothing ships from these; see 03 §1 and §6. |
| `inspiration/` | 16 reference images. Mood only. | **Never ship.** Reference for the kits' colour temperature (01 §3). |

## Housekeeping

- This folder is ~95 MB, mostly PNG. It stays in the repo through the review round so nothing is lost between threads. Before handover, either move the raw folders to Supabase storage (Taylor's call) or delete `project-images/`, `inspiration/` and `writing/`, keeping the markdown and `branding/`.
- Do not edit Vitrine's files. If a build diverges from them, the divergence is logged in `docs/specs/DEVIATIONS.md`, not patched into the deliverable. Vitrine amends her own files in the open, with a dated amendment section (02 §16, 04 Step 8).
