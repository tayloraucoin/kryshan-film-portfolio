import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

/**
 * The review gate's credential is a signed cookie, issued once the reviewer
 * types the access code. Nothing about the code is stored in the cookie; the
 * value is `<issued-at>.<hmac(issued-at)>`, so a forged cookie needs the
 * session secret and an old cookie expires on its own timestamp.
 *
 * Both functions are pure over their inputs and read the secret from
 * `lib/env.ts`, which is why `proxy.ts` can call `verifySession` on every
 * request with no shared state.
 */
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** True when the typed code matches, compared in constant time. */
export function accessCodeMatches(candidate: string): boolean {
  const expected = env.REVIEW_ACCESS_CODE;
  if (!expected) return false;
  const a = Buffer.from(candidate.trim());
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Mints a cookie value. Returns null when the layer is not configured. */
export function issueSession(now: Date = new Date()): string | null {
  const secret = env.REVIEW_SESSION_SECRET;
  if (!secret) return null;
  const issuedAt = String(now.getTime());
  return `${issuedAt}.${sign(issuedAt, secret)}`;
}

/** True when the cookie value carries a valid, unexpired signature. */
export function verifySession(
  value: string | undefined,
  now: Date = new Date(),
): boolean {
  const secret = env.REVIEW_SESSION_SECRET;
  if (!secret || !value) return false;

  const [issuedAt, signature] = value.split(".");
  if (!issuedAt || !signature) return false;

  const expected = sign(issuedAt, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const issued = Number(issuedAt);
  if (!Number.isFinite(issued)) return false;
  return now.getTime() - issued < SESSION_TTL_MS;
}
