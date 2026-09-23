import { notFound, redirect } from "next/navigation";
import { reviewRoutes } from "@/lib/routes";
import { findReviewMock } from "@/review/mocks";

/**
 * A demo's bare URL opens it in the kit it was designed with. Every demo
 * page lives at `/review/mocks/<mock>/<kit>`, so comments always say which
 * kit they were left on.
 */
export default async function ReviewMockDefaultPage({
  params,
}: PageProps<"/review/mocks/[mock]">) {
  const { mock: id } = await params;
  const mock = findReviewMock(id);
  if (!mock) notFound();
  redirect(reviewRoutes.mock(mock.id, mock.kitId));
}
