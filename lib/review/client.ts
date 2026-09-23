/**
 * Who this site is to tayloraucoin.com's review ingest (M-KR-5, contract §1).
 * Sent with every backend call; the shared `REVIEW_INGEST_KEY` proves the
 * site is one of Taylor's repos, and these values say which one.
 *
 * Set once per client repo (docs/NEW-CLIENT.md). `clientApp` names the round
 * and never changes; `engagementId` is the engagement's id in taylor-aucoin's
 * production database, linked when it exists there and ignored elsewhere.
 */
export const REVIEW_CLIENT = {
  clientApp: "kryshan-film-portfolio",
  engagementId: "cd1d6c5f-9c21-49ef-9e4b-a759c74b8554",
  label: "Phase 1 · kits and layouts",
} as const;
