import { NextResponse, type NextRequest } from "next/server";
import { REVIEW_COOKIE } from "@/lib/config";
import { reviewGateOn } from "@/lib/env";
import { verifySession } from "@/lib/review/access";
import { isGatedReviewPath, reviewRoutes } from "@/lib/routes";

/**
 * The review gate. Every request under `/review` except the access page must
 * carry a valid session cookie, or it is sent to the access page with the
 * intended destination in `next`. Also stamps `X-Robots-Tag: noindex` on the
 * whole tree, so even a leaked link never reaches an index.
 *
 * This is the only authorization decision the review layer makes. Pages do
 * not re-check; if this file is wrong, the pages are wrong, which is the
 * point: one place to audit.
 *
 * `REVIEW_GATE=off` (local development) lets every request through, and
 * sends the access page on to where the visitor was going, so nobody types
 * a code on their own machine. `noindex` is stamped either way.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const withNoIndex = (response: NextResponse) => {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  };

  if (!reviewGateOn()) {
    if (isGatedReviewPath(pathname)) return withNoIndex(NextResponse.next());
    const next = request.nextUrl.searchParams.get("next");
    const url = request.nextUrl.clone();
    url.pathname = next && isGatedReviewPath(next) ? next : reviewRoutes.index;
    url.search = "";
    return withNoIndex(NextResponse.redirect(url));
  }

  if (!isGatedReviewPath(pathname)) return withNoIndex(NextResponse.next());

  const session = request.cookies.get(REVIEW_COOKIE)?.value;
  if (verifySession(session)) return withNoIndex(NextResponse.next());

  const url = request.nextUrl.clone();
  url.pathname = reviewRoutes.access();
  url.search = "";
  url.searchParams.set("next", pathname);
  return withNoIndex(NextResponse.redirect(url));
}

export const config = {
  matcher: ["/review/:path*"],
};
