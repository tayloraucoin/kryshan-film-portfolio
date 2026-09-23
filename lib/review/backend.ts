import "server-only";
import { env, reviewBackendConfigured } from "@/lib/env";
import type {
  ReviewActionResult,
  ReviewComment,
  ReviewRoundInfo,
  ReviewSubmission,
} from "@/lib/review/types";

/**
 * The only client of tayloraucoin.com's review ingest
 * (docs/REVIEW-BACKEND-CONTRACT.md). Server-only: the bearer key is read from
 * `lib/env.ts` and never leaves this process.
 *
 * Every function returns a result rather than throwing. "offline" covers an
 * unconfigured backend, a network failure, and a timeout alike, because the
 * UI does the same thing for all three: keep the comment in the browser and
 * say so.
 */
const TIMEOUT_MS = 8000;

type BackendResult<T> = ReviewActionResult<T>;

async function call<T>(
  path: string,
  init: { method: "GET" | "POST" | "DELETE"; body?: unknown },
  parse: (json: unknown) => T,
): Promise<BackendResult<T>> {
  if (!reviewBackendConfigured()) return { ok: false, reason: "offline" };

  const url = `${env.REVIEW_BACKEND_URL}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: init.method,
      headers: {
        Authorization: `Bearer ${env.REVIEW_INGEST_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    console.warn(
      "[review] backend unreachable",
      error instanceof Error ? error.name : "unknown",
    );
    return { ok: false, reason: "offline" };
  }

  if (response.status === 401) return { ok: false, reason: "unauthorized" };
  if (!response.ok) {
    console.warn(
      `[review] backend ${response.status} on ${init.method} ${path}`,
    );
    return { ok: false, reason: "failed" };
  }

  try {
    return { ok: true, data: parse(await response.json()) };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

function asObject(json: unknown): Record<string, unknown> {
  if (typeof json !== "object" || json === null)
    throw new Error("not an object");
  return json as Record<string, unknown>;
}

export async function fetchRoundInfo(): Promise<
  BackendResult<ReviewRoundInfo>
> {
  return call("/api/review/health", { method: "GET" }, (json) => {
    const round = asObject(asObject(json).round);
    return {
      label: String(round.label ?? ""),
      clientName: String(round.clientName ?? ""),
      submittedAt:
        typeof round.submittedAt === "string" ? round.submittedAt : null,
    };
  });
}

export async function fetchComments(
  path?: string,
): Promise<BackendResult<ReviewComment[]>> {
  const query = path ? `?path=${encodeURIComponent(path)}` : "";
  return call(
    `/api/review/comments${query}`,
    { method: "GET" },
    (json) => (asObject(json).comments ?? []) as ReviewComment[],
  );
}

export async function postComment(
  comment: ReviewComment,
): Promise<BackendResult<undefined>> {
  return call(
    "/api/review/comments",
    { method: "POST", body: comment },
    () => undefined,
  );
}

export async function deleteComment(
  id: string,
): Promise<BackendResult<undefined>> {
  return call(
    `/api/review/comments/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    () => undefined,
  );
}

export async function postSubmission(
  submission: ReviewSubmission,
): Promise<BackendResult<undefined>> {
  return call(
    "/api/review/submissions",
    { method: "POST", body: submission },
    () => undefined,
  );
}
