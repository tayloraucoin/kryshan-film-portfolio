# <ID> — <title that states the contents>

**Epic:** <EPIC> · **Phase <n>** · Size: <S|M|L>
**Slice type:** <what kind of work; what class of failure it risks>

**Status:** Not started

---

## Outcome

<One paragraph, prose. The world after this ships, in the language of whoever experiences it. Close by naming the adjacent things this slice does NOT do.>

## Why / intent

- **<deliverable § / M-<EPIC>-n>** — <the authority and what it obliges>.
- **What this slice is NOT (binding):** <the negative, where drift is a real risk>.

**Rulings this slice makes (labelled, logged):**

- **<The ruling.>** <Why. The tradeoff.> `[PROVISIONAL — owner]` if applicable. Logged.

## Experience & states

<Happy path. Then:>

**States (exhaustive):** <every reachable state>

**Failure / edge states (named):** <each with its handling>

## Non-negotiables (this slice)

- **<Imperative.>** <One line of consequence.>

## Content and media

**Content files:** <content/*.ts touched — or "none">.
**Media:** <posters, ids, rights status — or "none">.

## Placement

<exact paths, per CONVENTIONS.md §2>.

## Accessibility

<This surface's specific traps — or "**None — no surface in this slice.**">

## Performance

<What this slice must not regress: LCP element, first-screen bytes, no video before tap.>

## Acceptance criteria (observable)

1. <Observable behavior.>

N. `yarn verify` passes.

## Out of scope

- **<Excluded thing>** — <where it actually lives>.

## Depends on

- **<TICKET-ID>** — Complete in `PROGRESS.md`. — or "**No slice dependencies.**"

---

### Kickoff (paste into the session)

> Build **<ID> — <title>** (attached spec). **<The one-line law of the slice.>**
> Read first, in order: this spec · `specs/README.md` · `docs/CONVENTIONS.md` · <deliverables> · `DEVIATIONS.md` + `TECHNICAL-DECISIONS.md`.
> Close in three places. Run `yarn verify`.
