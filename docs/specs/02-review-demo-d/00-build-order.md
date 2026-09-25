# Build order — Demo D (A, revised after Kryshan's review)

The ordered queue for `02-review-demo-d/`. `PROGRESS.md` (at `docs/specs/`) is the only source of truth for Complete; this file mirrors it and is ticked afterwards.

**How to work this file:**
1. Take the next unchecked ticket.
2. Confirm its "Depends on" shows Complete in `PROGRESS.md`.
3. Build one ticket per thread, using the kickoff contract in `docs/specs/README.md`.
4. Close it in three places.
5. Tick it here.

**Governing handoff:** `demo-d-ux-handoff-v1.md`. Its decision log (D-KRD-n) is binding.

## Critical path

`KR-7 → KR-8 → KR-9`

## Checklist

- [x] **KR-7** — Demo D scaffold: kit D, layout D, a faithful copy of Demo A, rounds kept apart, contact email from env · M · (KR-6)
- [x] **KR-8** — Demo D's home, revised: name once, a bar that stays, the film opens full width below where you tapped, an ✕ you can see · L · (KR-7)
- [x] **KR-9** — Demo D's rows: Directing, and Camera and editing, to swipe across · M · (KR-8) · **can be cut**

## Ordering constraints

- **KR-7 precedes KR-8** because KR-7 is a faithful copy of A. KR-8's diff is then exactly the revision, which is what Taylor asked to compare.
- **KR-9 follows KR-8** because rows reuse KR-8's tile, panel and open-film store. Building rows first would create a second implementation.

## What does not gate

- **Nothing here gates the real build.** Its track comes later.
- **Handoff open items O-1 to O-8 don't block these tickets.** The Directors Reel keeps its "Frame to be replaced" ribbon until O-3 is answered.

## Locked references

- D-KRD-1 to D-KRD-20
- M-KR-1 (view transitions)
- M-KR-3 (the shared mock variables)
- 04 Step 8 (Card A v2)
