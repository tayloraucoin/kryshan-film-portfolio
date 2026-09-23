import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderRibbon } from "@/app/review/_components/placeholder-ribbon";
import { KitScope } from "@/components/composed/brand/kit-scope";
import { findReviewKit } from "@/review/kits";
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
  const layout = findReviewLayout(mock.layoutId);

  const Mock = mock.Component;

  return (
    <>
      <KitSwitcher
        mockId={mock.id}
        layoutName={layout ? `Layout ${layout.letter} · ${layout.name}` : ""}
        activeKitId={kit.id}
        pairedKitId={mock.kitId}
      />
      <KitScope kit={kit} className="min-h-full">
        <PlaceholderRibbon placeholder={mock.placeholder} />
        <Mock kit={kit} />
      </KitScope>
    </>
  );
}
