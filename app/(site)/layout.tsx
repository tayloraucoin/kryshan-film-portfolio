import "@/content/validate";
import { PRE_PAINT_SCRIPT } from "@/lib/pre-paint-script";

/**
 * The public site's route group. Two jobs:
 * - import the content check, so any content problem fails `next build`
 *   with a list he can act on (content/validate.ts);
 * - run the pre-paint script first, which marks `<html data-js>` before the
 *   page paints (lib/pre-paint-script.ts).
 *
 * It renders no chrome: each page wraps its content in `SiteShell`
 * (components/composed/site/site-shell.tsx), because the bar's current item
 * and the skip link's words depend on the page and a layout can't see which
 * page it wraps (M-SITE-1).
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
      {children}
    </>
  );
}
