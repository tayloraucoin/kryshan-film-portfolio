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
 * year of his episode), and paste its IMDb page as `imdb` so the title
 * links there. Keep `released: false` until the title is out:
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
  /**
   * The title's IMDb page ("https://www.imdb.com/title/tt…/"); the title
   * links there on Work. Leave it out and the title shows unlinked.
   */
  imdb?: string;
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
    imdb: "https://www.imdb.com/title/tt25581766/",
  },
  {
    title: "So Help Me Todd",
    year: 2023,
    format: "TV series",
    network: "CBS",
    released: true,
    imdb: "https://www.imdb.com/title/tt18573724/",
  },
  {
    title: "Farming for Love",
    year: 2024,
    format: "TV series",
    network: "CTV",
    released: true,
    imdb: "https://www.imdb.com/title/tt21072046/",
  },
  {
    title: "Festival of the Living Dead",
    year: 2024,
    format: "Feature",
    network: "Living Dead Productions",
    released: true,
    imdb: "https://www.imdb.com/title/tt27739396/",
  },
  {
    title: "Calamity Jane",
    year: 2024,
    format: "Feature",
    network: "Calamity Productions Ltd.",
    released: true,
    imdb: "https://www.imdb.com/title/tt28015371/",
  },
  {
    title: "Fire Country",
    year: 2023,
    format: "TV series",
    network: "CBS",
    released: true,
    imdb: "https://www.imdb.com/title/tt16098700/",
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
    imdb: "https://www.imdb.com/title/tt12497296/",
  },
  {
    title: "Love Me",
    year: 2024,
    format: "Feature",
    network: "Love Me Productions",
    released: true,
    imdb: "https://www.imdb.com/title/tt21375602/",
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
    imdb: "https://www.imdb.com/title/tt1447981/",
  },
  {
    title: "Batwoman",
    year: 2021,
    format: "TV series",
    network: "CW",
    released: true,
    imdb: "https://www.imdb.com/title/tt8712204/",
  },
  {
    title: "The Hardy Boys",
    year: 2020,
    format: "TV series",
    network: "Hulu",
    released: true,
    imdb: "https://www.imdb.com/title/tt11252090/",
  },
  {
    title: "The Good Doctor",
    year: 2019,
    format: "TV series",
    network: "CTV",
    released: true,
    imdb: "https://www.imdb.com/title/tt6470478/",
  },
  {
    title: "Zoey's Extraordinary Playlist",
    year: 2020,
    format: "TV series",
    network: "NBC",
    released: true,
    imdb: "https://www.imdb.com/title/tt10314462/",
  },
  {
    title: "A Babysitter's Guide to Monster Hunting",
    year: 2020,
    format: "Feature",
    network: "Netflix",
    released: true,
    imdb: "https://www.imdb.com/title/tt4844150/",
  },
  {
    title: "The Baby-Sitters Club",
    year: 2020,
    format: "TV series",
    network: "Netflix",
    released: true,
    imdb: "https://www.imdb.com/title/tt8690518/",
  },
  {
    title: "The Right One",
    year: 2021,
    format: "Feature",
    network: "10 x 10 Entertainment",
    released: true,
    imdb: "https://www.imdb.com/title/tt6820128/",
  },
  {
    title: "A Christmas Detour",
    year: 2015,
    format: "TV movie",
    network: "Hallmark",
    released: true,
    imdb: "https://www.imdb.com/title/tt4767950/",
  },
  {
    title: "The Republic of Sarah",
    year: 2021,
    format: "TV series",
    network: "CBS",
    released: true,
    imdb: "https://www.imdb.com/title/tt11815244/",
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
    imdb: "https://www.imdb.com/title/tt3794354/",
  },
  {
    title: "A Million Little Things",
    year: 2018,
    format: "TV series",
    network: "ABC",
    released: true,
    imdb: "https://www.imdb.com/title/tt7608248/",
  },
  {
    title: "Good Boys",
    year: 2019,
    format: "Feature",
    network: "Good Universe",
    released: true,
    imdb: "https://www.imdb.com/title/tt6977338/",
  },
  {
    title: "Legends of Tomorrow",
    year: 2018,
    format: "TV series",
    network: "Warner Bros. Television",
    released: true,
    imdb: "https://www.imdb.com/title/tt4532368/",
  },
  {
    title: "A Dog's Journey",
    year: 2019,
    format: "Feature",
    network: "Universal Studios",
    released: true,
    imdb: "https://www.imdb.com/title/tt8385474/",
  },
  {
    title: "The Art of Racing in the Rain",
    year: 2019,
    format: "Feature",
    network: "Universal Studios",
    released: true,
    imdb: "https://www.imdb.com/title/tt1478839/",
  },
  {
    title: "I Am Somebody's Child: The Regina Louise Story",
    year: 2019,
    format: "TV movie",
    network: "Lifetime",
    released: true,
    imdb: "https://www.imdb.com/title/tt9053916/",
  },
  {
    title: "Skyscraper",
    year: 2018,
    format: "Feature",
    network: "Universal Studios",
    released: true,
    imdb: "https://www.imdb.com/title/tt5758778/",
  },
  {
    title: "A Dog's Way Home",
    year: 2019,
    format: "Feature",
    network: "Sony Pictures",
    released: true,
    imdb: "https://www.imdb.com/title/tt7616798/",
  },
  {
    title: "Riverdale",
    year: 2017,
    format: "TV series",
    network: "Warner / The CW Network",
    released: true,
    imdb: "https://www.imdb.com/title/tt5420376/",
  },
  {
    title: "Supernatural",
    year: 2017,
    format: "TV series",
    network: "Warner / The CW Network",
    released: true,
    imdb: "https://www.imdb.com/title/tt0460681/",
  },
  {
    title: "A Series of Unfortunate Events",
    year: 2018,
    format: "TV series",
    network: "Netflix",
    released: true,
    imdb: "https://www.imdb.com/title/tt4834206/",
  },
  {
    title: "Freaks",
    year: 2018,
    format: "Feature",
    network: "Freaks Productions",
    released: true,
    imdb: "https://www.imdb.com/title/tt8781414/",
  },
  {
    title: "Mech-X4",
    year: 2018,
    format: "TV series",
    network: "Disney",
    released: true,
    imdb: "https://www.imdb.com/title/tt5568740/",
  },
  {
    title: "The Miracle Season",
    year: 2018,
    format: "Feature",
    network: "LD Entertainment",
    released: true,
    imdb: "https://www.imdb.com/title/tt5427194/",
  },
  {
    title: "Descendants 2",
    year: 2017,
    format: "TV movie",
    network: "ABC/Disney",
    released: true,
    imdb: "https://www.imdb.com/title/tt5117876/",
  },
  {
    title: "Dirk Gently's Holistic Detective Agency",
    year: 2016,
    format: "TV series",
    network: "BBC America",
    released: true,
    imdb: "https://www.imdb.com/title/tt4047038/",
  },
];

/** What the site shows: released credits, newest first, then by title. */
export const RELEASED_CREDITS: ReadonlyArray<Credit> = CREDITS.filter(
  (credit) => credit.released,
).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, "en-CA"));
