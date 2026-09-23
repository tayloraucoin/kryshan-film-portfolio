"use server";

import type { Route } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REVIEW_COOKIE, REVIEW_SESSION_MAX_AGE } from "@/lib/config";
import { env, reviewLayerEnabled } from "@/lib/env";
import { accessCodeMatches, issueSession } from "@/lib/review/access";
import { isGatedReviewPath, reviewRoutes } from "@/lib/routes";
import { accessCodeInput } from "@/lib/validators/review";

export type EnterCodeState = { error: "wrong" | "off" | "invalid" } | null;

/**
 * The gate's one action. A wrong code says so and nothing else; an
 * unconfigured layer says it is off rather than pretending the code was
 * wrong. On success the signed cookie is set, path-scoped to `/review`, and
 * the reviewer lands where they were heading.
 */
export async function enterCode(
  _previous: EnterCodeState,
  formData: FormData,
): Promise<EnterCodeState> {
  if (!reviewLayerEnabled()) return { error: "off" };

  const parsed = accessCodeInput.safeParse({
    code: formData.get("code"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) return { error: "invalid" };

  if (!accessCodeMatches(parsed.data.code)) return { error: "wrong" };

  const session = issueSession();
  if (!session) return { error: "off" };

  const store = await cookies();
  store.set(REVIEW_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: reviewRoutes.prefix,
    maxAge: REVIEW_SESSION_MAX_AGE,
  });

  const next = parsed.data.next;
  redirect(
    next && isGatedReviewPath(next) ? (next as Route) : reviewRoutes.index,
  );
}
