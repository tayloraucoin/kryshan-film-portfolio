# Specs (how to work this folder)

**Process model:** the Conscious Connections spec system as adapted for taylor-aucoin: one implementable slice per ticket, three append-only records, closure in three places.

## Folder layout

| Path                       | What                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `_templates/slice-spec.md` | The blank ticket.                                                                  |
| `<EPIC>-<n>-<slug>.md`     | One implementable slice each. Epic prefix per client build, e.g. `SITE-1-home.md`. |
| `00-build-order.md`        | The ordered, checkable queue (create it with the first ticket).                    |
| `PROGRESS.md`              | The only source of truth for Complete.                                             |
| `DEVIATIONS.md`            | One line per intentional divergence from a spec. Append-only.                      |
| `TECHNICAL-DECISIONS.md`   | Fast-lane ADRs for choices with real alternatives. Append-only. IDs `M-<EPIC>-n`.  |

## Source precedence (when documents disagree)

1. The client's approved deliverables in `../client/` (02 success criteria is the source of truth; 05 tokens for colour; 06 layouts; 03 copy; the 07 prompts for the review round).
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
You are building ONE ticket from docs/specs/: <TICKET-ID>.

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

Three-place closure, every time: the ticket's `Status:` line → `PROGRESS.md` → `DEVIATIONS.md` (+ `TECHNICAL-DECISIONS.md` when applicable). Then tick `00-build-order.md`, which mirrors and never leads.
