# Editing this site

This file is written in full at launch (`SITE-10`). Until then it holds only what's been asked for early.

## The business card links

Two short paths on the live site, `/card` and `/imdb`, are printed on Kryshan's business card as QR codes:

- `/card` sends a scan to the home page, tagged so it's identifiable as coming from the card.
- `/imdb` sends a scan to Kryshan's IMDb profile.

**To change where either one points:** edit `lib/business-card.ts` and redeploy. That's the only file that needs to change. The two paths themselves (`/card` and `/imdb`) must never be renamed or removed — they're printed on physical cards that can't be reissued.
