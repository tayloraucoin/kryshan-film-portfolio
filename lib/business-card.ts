import { siteRoutes } from "./routes";

/**
 * The two short links printed on Kryshan's physical business card, next to a
 * QR code each (SITE-D). The card is already printed and can't be reissued,
 * so the source paths below (`/card`, `/imdb`) must never be renamed or
 * removed, and `next.config.ts` must always redirect them as temporary
 * (307): a permanent redirect would be cached by the scanning browser, and
 * the destination could then never change for that visitor again.
 *
 * To change where a code points, edit a value here and redeploy. Nothing
 * else needs to change.
 *
 * Imported by relative path, like its sibling constants in this file's
 * directory: `next.config.ts` pulls this in before the `@/` alias exists.
 */
export const BUSINESS_CARD_DESTINATIONS = {
  /** Home, tagged so scans from the card show up apart from other traffic. */
  card: `${siteRoutes.home}?utm_source=business-card&utm_medium=qr`,
  /** Kryshan's IMDb profile. */
  imdb: "https://www.imdb.com/name/nmXXXXXXX/",
} as const;
