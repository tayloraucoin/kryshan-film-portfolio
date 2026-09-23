"use server";

import { z } from "zod";
import {
  deleteComment,
  fetchComments,
  postComment,
} from "@/lib/review/backend";
import type { ReviewActionResult, ReviewComment } from "@/lib/review/types";
import { reviewCommentInput } from "@/lib/validators/review";

/**
 * The comment rail between the reviewer's browser and tayloraucoin.com.
 *
 * Thin by design: validate, forward, return a result. Every id is minted in
 * the browser, so a retry after a lost response is the same write again and
 * the backend treats it as a no-op (contract §1). Nothing here logs comment
 * text.
 */
export async function loadComments(
  path: string,
): Promise<ReviewActionResult<ReviewComment[]>> {
  const parsed = z.string().max(512).startsWith("/").safeParse(path);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  return fetchComments(parsed.data);
}

export async function addComment(
  input: unknown,
): Promise<ReviewActionResult<undefined>> {
  const parsed = reviewCommentInput.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  return postComment(parsed.data);
}

export async function removeComment(
  id: unknown,
): Promise<ReviewActionResult<undefined>> {
  const parsed = z.uuid().safeParse(id);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  return deleteComment(parsed.data);
}
