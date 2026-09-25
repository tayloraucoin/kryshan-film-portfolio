import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { reviewRoutes } from "@/lib/routes";
import { findReviewKit, REVIEW_KITS } from "@/review/kits";
import { roundOf } from "@/review/kits/types";
import { findReviewLayout } from "@/review/layouts";
import { findReviewMock } from "@/review/mocks";
import { KitSwitcher } from "./_components/kit-switcher";

export async function generateMetadata({
  params,
}: PageProps<"/review/mocks/[mock]/[kit]">): Promise<Metadata> {
  const { mock: id, kit: kitId } = await params;
  const mock = findReviewMock(id);
  const kit = findReviewKit(kitId);
  return {
    title: mock && kit ? `Demo ${mock.letter} · Kit ${kit.letter}` : "Demo",
  };
}

/**
 * A demo home page in any kit: the mock's layout, rendered inside the chosen
 * kit's scope, full width. The switcher above lets the reviewer try the same
 * layout in each kit (nine combinations); the kit is a path segment so every
 * comment records which combination it was left on.
 */
export default async function ReviewMockPage({
  params,
}: PageProps<"/review/mocks/[mock]/[kit]">) {
  const { mock: id, kit: kitId } = await params;
  const mock = findReviewMock(id);
  if (!mock) notFound();
  const kit = findReviewKit(kitId);
  if (!kit) notFound();
  // Rounds never mix: Demo D only in kit D, the first three only in A–C.
  if (roundOf(kit) !== roundOf(mock)) notFound();
  const layout = findReviewLayout(mock.layoutId);
  const kits = REVIEW_KITS.filter((k) => roundOf(k) === roundOf(mock));
  const compared = mock.comparesWith
    ? findReviewMock(mock.comparesWith)
    : undefined;

  const Mock = mock.Component;

  return (
    <>
      <KitSwitcher
        mockId={mock.id}
        layoutName={layout ? `Layout ${layout.letter} · ${layout.name}` : ""}
        activeKitId={kit.id}
        pairedKitId={mock.kitId}
        kits={kits}
        compare={
          compared
            ? {
                href: reviewRoutes.mock(compared.id, compared.kitId),
                label: `${roundOf(compared) > roundOf(mock) ? "After" : "Before"}: Demo ${compared.letter}`,
              }
            : undefined
        }
      />
      <KitScope kit={kit} className="min-h-full">
        <PlaceholderRibbon placeholder={mock.placeholder} />
        <Mock kit={kit} />
      </KitScope>
    </>
  );
}
