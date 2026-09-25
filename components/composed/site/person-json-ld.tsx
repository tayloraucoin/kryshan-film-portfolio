import { JsonLd } from "@/components/composed/site/json-ld";
import { SOCIALS } from "@/content/site";
import { SITE } from "@/lib/config";
import { absoluteUrl } from "@/lib/metadata";
import { siteRoutes } from "@/lib/routes";
import { personJsonLd } from "@/lib/structured-data";

/**
 * His `Person` (spec §6.1, §8), on Home and About. The decision it carries:
 * one set of arguments, so the two pages can never describe him
 * differently. `jobTitle` is the roles line without its full stop; the
 * locality is his place line up to its comma. Server component.
 */
export function PersonJsonLd() {
  return (
    <JsonLd
      data={personJsonLd({
        name: SITE.name,
        jobTitle: SITE.tagline.replace(/\.$/, ""),
        url: absoluteUrl(siteRoutes.home),
        sameAs: SOCIALS.map((social) => social.href),
        locality: SITE.place.split(",")[0] ?? SITE.place,
      })}
    />
  );
}
