/**
 * His behind-the-scenes and EPK credits (spec §5, §6.2; D-SITE-7): the
 * productions he shot camera on that he can't show as films. Work lists the
 * released ones, newest first, under "Behind the scenes".
 *
 * From his EPK CV's "Select Credits", with titles and years checked against
 * his IMDb page (SITE-4 has the rules). Nothing from the CV's header.
 *
 * To add a credit: copy an entry and change it. Write the title as it was
 * released (IMDb's spelling) and the year it came out (for a series, the
 * year of his episode). Keep `released: false` until the title is out:
 * unreleased titles are often under embargo, and only `released: true`
 * entries appear on the site.
 *
 * Flagged for SITE-C (Q12): the four `released: false` entries, A Christmas
 * Detour's year (CV 2019, IMDb 2015), two titles matched by cast (Godfrey →
 * The Right One; Somebody's Someone → I Am Somebody's Child), and IMDb-only
 * credits not on the CV.
 */
export type Credit = Readonly<{
  /** As released. */
  title: string;
  year: number;
  format: "Feature" | "TV series" | "TV movie" | "Short";
  /** The studio, network or company, as his CV writes it. */
  network: string;
  /** Only `true` appears on the site. */
  released: boolean;
}>;

export const CREDITS: ReadonlyArray<Credit> = [
  {
    title: "Freaks: Underground",
    year: 2025,
    format: "Feature",
    network: "Chloe Pictures Inc.",
    released: false,
  },
  {
    title: "Protectors of the Land",
    year: 2025,
    format: "Feature",
    network: "Potluck Stories Inc.",
    released: true,
  },
  {
    title: "So Help Me Todd",
    year: 2023,
    format: "TV series",
    network: "CBS",
    released: true,
  },
  {
    title: "Farming for Love",
    year: 2024,
    format: "TV series",
    network: "CTV",
    released: true,
  },
  {
    title: "Festival of the Living Dead",
    year: 2024,
    format: "Feature",
    network: "Living Dead Productions",
    released: true,
  },
  {
    title: "Calamity Jane",
    year: 2024,
    format: "Feature",
    network: "Calamity Productions Ltd.",
    released: true,
  },
  {
    title: "Fire Country",
    year: 2023,
    format: "TV series",
    network: "CBS",
    released: true,
  },
  {
    title: "Real Love",
    year: 2022,
    format: "TV series",
    network: "Lifetime",
    released: false,
  },
  {
    title: "Balestra",
    year: 2024,
    format: "Feature",
    network: "Automatik",
    released: true,
  },
  {
    title: "Love Me",
    year: 2024,
    format: "Feature",
    network: "Love Me Productions",
    released: true,
  },
  {
    title: "The Bad Seed Returns",
    year: 2021,
    format: "TV movie",
    network: "Lifetime",
    released: false,
  },
  {
    title: "Monster High: The Movie",
    year: 2022,
    format: "TV movie",
    network: "Paramount Plus / Nickelodeon",
    released: true,
  },
  {
    title: "Batwoman",
    year: 2021,
    format: "TV series",
    network: "CW",
    released: true,
  },
  {
    title: "The Hardy Boys",
    year: 2020,
    format: "TV series",
    network: "Hulu",
    released: true,
  },
  {
    title: "The Good Doctor",
    year: 2019,
    format: "TV series",
    network: "CTV",
    released: true,
  },
  {
    title: "Zoey's Extraordinary Playlist",
    year: 2020,
    format: "TV series",
    network: "NBC",
    released: true,
  },
  {
    title: "A Babysitter's Guide to Monster Hunting",
    year: 2020,
    format: "Feature",
    network: "Netflix",
    released: true,
  },
  {
    title: "The Baby-Sitters Club",
    year: 2020,
    format: "TV series",
    network: "Netflix",
    released: true,
  },
  {
    title: "The Right One",
    year: 2021,
    format: "Feature",
    network: "10 x 10 Entertainment",
    released: true,
  },
  {
    title: "A Christmas Detour",
    year: 2015,
    format: "TV movie",
    network: "Hallmark",
    released: true,
  },
  {
    title: "The Republic of Sarah",
    year: 2021,
    format: "TV series",
    network: "CBS",
    released: true,
  },
  {
    title: "Child's Play",
    year: 2018,
    format: "Feature",
    network: "Orion Pictures",
    released: false,
  },
  {
    title: "Sonic the Hedgehog",
    year: 2020,
    format: "Feature",
    network: "Paramount Pictures",
    released: true,
  },
  {
    title: "A Million Little Things",
    year: 2018,
    format: "TV series",
    network: "ABC",
    released: true,
  },
  {
    title: "Good Boys",
    year: 2019,
    format: "Feature",
    network: "Good Universe",
    released: true,
  },
  {
    title: "Legends of Tomorrow",
    year: 2018,
    format: "TV series",
    network: "Warner Bros. Television",
    released: true,
  },
  {
    title: "A Dog's Journey",
    year: 2019,
    format: "Feature",
    network: "Universal Studios",
    released: true,
  },
  {
    title: "The Art of Racing in the Rain",
    year: 2019,
    format: "Feature",
    network: "Universal Studios",
    released: true,
  },
  {
    title: "I Am Somebody's Child: The Regina Louise Story",
    year: 2019,
    format: "TV movie",
    network: "Lifetime",
    released: true,
  },
  {
    title: "Skyscraper",
    year: 2018,
    format: "Feature",
    network: "Universal Studios",
    released: true,
  },
  {
    title: "A Dog's Way Home",
    year: 2019,
    format: "Feature",
    network: "Sony Pictures",
    released: true,
  },
  {
    title: "Riverdale",
    year: 2017,
    format: "TV series",
    network: "Warner / The CW Network",
    released: true,
  },
  {
    title: "Supernatural",
    year: 2017,
    format: "TV series",
    network: "Warner / The CW Network",
    released: true,
  },
  {
    title: "A Series of Unfortunate Events",
    year: 2018,
    format: "TV series",
    network: "Netflix",
    released: true,
  },
  {
    title: "Freaks",
    year: 2018,
    format: "Feature",
    network: "Freaks Productions",
    released: true,
  },
  {
    title: "Mech-X4",
    year: 2018,
    format: "TV series",
    network: "Disney",
    released: true,
  },
  {
    title: "The Miracle Season",
    year: 2018,
    format: "Feature",
    network: "LD Entertainment",
    released: true,
  },
  {
    title: "Descendants 2",
    year: 2017,
    format: "TV movie",
    network: "ABC/Disney",
    released: true,
  },
  {
    title: "Dirk Gently's Holistic Detective Agency",
    year: 2016,
    format: "TV series",
    network: "BBC America",
    released: true,
  },
];

/** What the site shows: released credits, newest first, then by title. */
export const RELEASED_CREDITS: ReadonlyArray<Credit> = CREDITS.filter(
  (credit) => credit.released,
).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "en-CA"));
