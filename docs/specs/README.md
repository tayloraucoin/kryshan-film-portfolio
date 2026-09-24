# Specs (how to work this folder)

**Process model:** the Conscious Connections spec system as adapted for taylor-aucoin: one implementable slice per ticket, three append-only records, closure in three places.

## Folder layout

Work is filed in numbered track folders, in the order it happened. The records, the template and this README stay at the root and serve every track.

| Path                           | What                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `01-review-round/`             | Phase 1's review round (KR-1..KR-6), closed: its tickets and its `00-build-order.md`.                                              |
| `02-review-demo-d/`            | Demo D: kit A + layout A revised after Kryshan's review, built beside A for a before/after comparison. Starts from its UX handoff. |
| `<track>/<EPIC>-<n>-<slug>.md` | One implementable slice each, inside its track folder.                                                                             |
| `<track>/00-build-order.md`    | The track's ordered, checkable queue (created with its first ticket).                                                              |
| `<track>/*-ux-handoff-v<n>.md` | A track's governing UX handoff, when it has a surface. Its decision log is binding; tickets cite it by ID.                         |
| `_templates/slice-spec.md`     | The blank ticket.                                                                                                                  |
| `spec-system-guide.md`         | The house manual for the system (Conscious Connections', copied whole).                                                            |
| `PROGRESS.md`                  | The only source of truth for Complete, across all tracks.                                                                          |
| `DEVIATIONS.md`                | One line per intentional divergence from a spec. Append-only.                                                                      |
| `TECHNICAL-DECISIONS.md`       | Fast-lane ADRs for choices with real alternatives. Append-only. IDs `M-<EPIC>-n`.                                                  |

## Source precedence (when documents disagree)

1. The client's approved deliverables in `../client/` (02 success criteria is the source of truth; 04 Step 8 for the pillars; 05 tokens for colour; 06 layouts; 03 copy; the 07 prompts for the review round; 08 for what the round decided).
   A track's UX handoff (for example `02-review-demo-d/demo-d-ux-handoff-v1.md`) governs product behaviour for that track; its decision log is binding and amends the deliverables where it says so.
2. `../CONVENTIONS.md`, `../PERFORMANCE.md`, `../BRANDING.md` (site law).
3. `../REVIEW-LAYER.md` and `../REVIEW-BACKEND-CONTRACT.md` for anything under `/review`.
4. The sibling repos' conventions (`conscious-connections/docs/architecture/codebase-conventions.md`, taylor-aucoin `CLAUDE.md`) where 1–3 are silent.
5. On-disk reality + `DEVIATIONS.md` override any stale string in a spec.

## Non-negotiables (every ticket)

- No upward imports; `yarn lint` passes with zero warnings.
- Routes from `lib/routes.ts`; env from `lib/env.ts`; tokens by name.
- Nothing dynamic on the public site.
- No video element before a tap; images sized; the first poster `priority`.
- Real content only in anything a client sees.
- Nothing false on the page.

## Kickoff contract (paste into a fresh build thread, verbatim)

```
You are building ONE ticket from docs/specs/<track>/: <TICKET-ID>.

OBJECTIVE
Ship the ticket's Acceptance criteria — nothing more, nothing less.

BEFORE WRITING CODE
1. State the ticket ID and title in your first message.
2. Confirm every entry in "Depends on" shows Complete in PROGRESS.md. If not, STOP.
3. Read the ticket end to end, then its attach-list in order.
4. Read DEVIATIONS.md and TECHNICAL-DECISIONS.md — on-disk reality + those logs
   override any stale string in a spec.

CONSTRAINTS
- Honor every non-negotiable in specs/README.md. If the spec would force you to
  break one, STOP and ask.
- Placement per docs/CONVENTIONS.md §2. Routes from lib/routes.ts. env via lib/env.ts.
- Client leaves in _components/ with "use client" on line 1. Server Components default.
- Never run `yarn dev` or `yarn build`; use `dev:agent` / `build:agent`.

DEFINITION OF DONE
1. yarn verify passes (lint, types, build).
2. Browser walk on the routes the ticket touches, phone width included.
3. Ticket Status: Complete (YYYY-MM-DD).
4. PROGRESS.md row ticked.
5. One DEVIATIONS.md line per divergence; real-alternative choices → TECHNICAL-DECISIONS.md.
6. Close with 3–5 lines: what shipped, deviations, the one thing the next ticket must know.

Do not start the next ticket.
```

## Completion protocol

Three-place closure, every time: the ticket's `Status:` line → `PROGRESS.md` → `DEVIATIONS.md` (+ `TECHNICAL-DECISIONS.md` when applicable). Then tick the track's `00-build-order.md`, which mirrors and never leads.
