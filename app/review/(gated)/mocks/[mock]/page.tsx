import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { findReviewKit } from "@/review/kits";
import { findReviewMock } from "@/review/mocks";

export async function generateMetadata({
  params,
}: PageProps<"/review/mocks/[mock]">): Promise<Metadata> {
  const { mock: id } = await params;
  const mock = findReviewMock(id);
  return { title: mock ? `Demo ${mock.letter}` : "Demo" };
}

/**
 * A demo home page: the mock component, in its kit's scope, full width. The
 * review bar sits above; nothing else of the review layer is on the page,
 * so what the reviewer comments on is what would ship.
 */
export default async function ReviewMockPage({
  params,
}: PageProps<"/review/mocks/[mock]">) {
  const { mock: id } = await params;
  const mock = findReviewMock(id);
  if (!mock) notFound();
  const kit = findReviewKit(mock.kitId);
  if (!kit) notFound();

  const Mock = mock.Component;

  return (
    <KitScope kit={kit} className="min-h-full">
      <PlaceholderRibbon placeholder={mock.placeholder} />
      <Mock kit={kit} />
    </KitScope>
  );
}
