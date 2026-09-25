/**
 * Names the site links wherever they appear in its running text: people he
 * has worked with, clients, festivals, schools and programs. The words
 * themselves stay in their own files; this list only says where a name
 * goes. A name is linked the first time it appears on a page (every time in
 * a list, such as the clients), and matching is exact, capitals included.
 *
 * To link a name: add a line with the name exactly as it's written on the
 * site and the page it should open. To unlink one, delete its line.
 * People go to their IMDb page, a musician or artist to their own site,
 * an organisation to its own site. Leave a name out rather than link a dead
 * or unofficial page. Film titles on About link to their pages here
 * automatically.
 *
 * Every address was opened and checked on 2026-09-25 (SITE-C round 2);
 * IMDb pages were matched by name and known-for credit.
 */
export type NameLink = Readonly<{
  /** Exactly as written on the site. */
  phrase: string;
  /** An https address. It opens in a new tab. */
  href: string;
}>;

export const NAME_LINKS: ReadonlyArray<NameLink> = [
  // People (IMDb)
  { phrase: "Ted Danson", href: "https://www.imdb.com/name/nm0001101/" },
  { phrase: "Mary Steenburgen", href: "https://www.imdb.com/name/nm0005460/" },
  { phrase: "Peter Gallagher", href: "https://www.imdb.com/name/nm0001251/" },
  { phrase: "Kevin Smith", href: "https://www.imdb.com/name/nm0003620/" },
  { phrase: "Tom Green", href: "https://www.imdb.com/name/nm0338381/" },
  {
    phrase: "Justine Warrington",
    href: "https://www.imdb.com/name/nm1787635/",
  },
  { phrase: "Dan O’Bannon", href: "https://www.imdb.com/name/nm0639321/" },
  // Robert Rodriguez, Fantastic Fest and Sundance Channel appear only in
  // held films' pages (The Bully Solution, Glimpse); they link once shown.
  { phrase: "Robert Rodriguez", href: "https://www.imdb.com/name/nm0001675/" },
  { phrase: "Zach Lipovsky", href: "https://www.imdb.com/name/nm0513554/" },
  // People (their own site, or the neutral reference)
  { phrase: "Myk Gordon", href: "https://www.mykgordon.com/" },
  {
    phrase: "Gregor Robertson",
    href: "https://en.wikipedia.org/wiki/Gregor_Robertson",
  },

  // Festivals and awards
  { phrase: "Sitges", href: "https://sitgesfilmfestival.com/en" },
  { phrase: "Fantasia", href: "https://fantasiafestival.com/en/" },
  { phrase: "Fantastic Fest", href: "https://fantasticfest.com/" },
  { phrase: "VIFF", href: "https://viff.org/" },
  { phrase: "National Screen Institute", href: "https://nsi-canada.ca/" },
  {
    phrase: "Vancouver Quarantine Performance Project",
    href: "https://sites.google.com/view/vqpp/home",
  },
  { phrase: "Leo-nominated", href: "https://www.leoawards.com/" },
  { phrase: "Sundance Channel", href: "https://www.sundancetv.com/" },

  // Clients, guilds and organisations
  { phrase: "Disney", href: "https://thewaltdisneycompany.com/" },
  { phrase: "Netflix", href: "https://about.netflix.com/" },
  { phrase: "Paramount Pictures", href: "https://www.paramountpictures.com/" },
  { phrase: "Universal Studios", href: "https://www.universalpictures.com/" },
  { phrase: "Sony Pictures", href: "https://www.sonypictures.com/" },
  { phrase: "The CW", href: "https://www.cwtv.com/" },
  { phrase: "BBC America", href: "https://www.bbcamerica.com/" },
  { phrase: "CBS", href: "https://www.cbs.com/" },
  { phrase: "CTV", href: "https://www.ctv.ca/" },
  { phrase: "Hallmark", href: "https://www.hallmarkchannel.com/" },
  { phrase: "VanCity", href: "https://www.vancity.com/" },
  {
    phrase: "Vancouver Symphony Orchestra",
    href: "https://www.vancouversymphony.ca/",
  },
  { phrase: "Creative BC", href: "https://creativebc.com/" },
  { phrase: "Theatre Under the Stars", href: "https://www.tuts.ca/" },
  { phrase: "Bard on the Beach", href: "https://bardonthebeach.org/" },
  { phrase: "The Rio Theatre", href: "https://riotheatre.ca/" },
  { phrase: "IATSE 669", href: "https://icg669.com/" },
  {
    phrase: "Pulling Together Canoe Journey",
    href: "https://www.pullingtogether.ca/",
  },
  { phrase: "Directors Guild of Canada", href: "https://www.dgc.ca/" },
  { phrase: "DGC BC", href: "https://www.dgc.ca/en/british-columbia/" },
  { phrase: "Shotlister", href: "https://www.shotlister.com/" },
  { phrase: "Richmond City Hall", href: "https://www.richmond.ca/" },
  { phrase: "MPPIA", href: "https://mppia.com/" },
  { phrase: "Crazy8s", href: "https://www.crazy8s.net/" },
  { phrase: "Entertainment Weekly", href: "https://ew.com/" },

  // Schools and programs
  {
    phrase: "LaSalle College",
    href: "https://www.lasallecollegevancouver.com/",
  },
  { phrase: "InFocus Film School", href: "https://www.infocusfilmschool.com/" },
  {
    phrase: "Frog Hollow Neighbourhood House",
    href: "https://www.froghollow.bc.ca/",
  },
  { phrase: "Reel Youth", href: "https://www.reelyouth.ca/" },
  { phrase: "CEDIM", href: "https://www.cedim.edu.mx/" },
  { phrase: "Capilano College", href: "https://www.capilanou.ca/" },
  {
    phrase: "American Academy of Dramatic Arts",
    href: "https://www.aada.edu/",
  },
  { phrase: "ActSafe", href: "https://actsafe.ca/" },
];
