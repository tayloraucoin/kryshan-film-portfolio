import { SiteFooter } from "@/components/composed/site/site-footer";
import { SiteHeader } from "@/components/composed/site/site-header";
import { SkipLink } from "@/components/composed/site/skip-link";

/**
 * The public site's chrome. Every public page sits inside this group; the
 * review layer has its own layout and never renders this header.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
