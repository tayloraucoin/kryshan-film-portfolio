import type { StaticImageData } from "next/image";
import { PROJECTS } from "@/content/projects";
import type { IsoDate } from "@/lib/iso-date";
import nerve2002Clip from "@/public/media/press/nerve-2002.jpg";
import province2002Clip from "@/public/media/press/province-2002.jpg";

/**
 * Everything the press has said about him, his contests and his films: one
 * library, verbatim, so choosing a different quote later is a one-word edit.
 * It holds every usable line from the 23 clippings he supplied and the
 * online reviews of Jack and The Bully Solution (docs/client/press/).
 *
 * Nothing here shows by itself. A quote appears only where it is picked:
 * - About › Recognition › Press: `pressPicks` in content/about.ts (at most 4).
 * - A film's page: that film's `press` list in content/projects.ts.
 *
 * Rules for an entry (spec §6.3, §11; SITE-C ruling 4):
 * - The quote is exactly as printed: its spelling, capitals and punctuation,
 *   even where the outlet got something wrong. At most 15 words; "…" marks
 *   words cut, and a cut never changes a word or joins two sentences.
 * - `verifiedOn` is the day someone read it in the clipping or on the page.
 *   A quote nobody has read in its source isn't in this file.
 * - The outlet is written the way it writes its own name.
 * - Not in the library: his own quoted words (they aren't press), lines
 *   about other people's films, and anything profane or mocking.
 * - `note` is for whoever chooses: a reason to think twice. Never shown.
 *
 * To add a clipping to a source: a tight crop (the headline and the quoted
 * passage, no one else's photo, no printed emails or phone numbers) as a
 * JPEG in public/media/press/, imported above, with the crop's words typed
 * out as its `alt`. Only a source whose quote is picked needs one; a source
 * with a `url` is linked instead.
 */

export type PressClip = {
  /** A static import from `public/media/press/`, so a missing file fails the build. */
  src: StaticImageData;
  /** The crop's words, transcribed: the image's text for anyone who can't see it. */
  alt: string;
};

/** One article, review or listing. */
export type PressSource = {
  /** As the outlet styles itself: "The Province", "MovieMaker", "Exclaim!". */
  outlet: string;
  author?: string;
  /** As printed (an all-capitals headline in ordinary capitals). Left out when it can't be shown. */
  headline?: string;
  /** The date as printed on the page ("Winter 2004", "May 29, 2002"). */
  published: string;
  /** The year shown beside a quote. */
  year: number;
  /** The live article, or an archive.org capture when the live page is gone. */
  url?: string;
  /** The printed clipping, opened on request ("See the clipping"). */
  clip?: PressClip;
  /** For whoever chooses; never shown. */
  note?: string;
};

/** Who or what a quote is about. A film is its slug in content/projects.ts. */
export type PressSubject =
  | "him"
  | "the-24-hour-film-contest"
  | "the-great-canadian-commercial-contest"
  | { film: string };

export type PressQuote = {
  /** Verbatim, ≤15 words, "…" where cut. */
  quote: string;
  about: PressSubject;
  /** A key of `PRESS_SOURCES`. */
  source: PressSourceId;
  /** A named person quoted in the article, when the words are theirs and not the outlet's. */
  speaker?: string;
  verifiedOn: IsoDate;
  /** For whoever chooses; never shown. */
  note?: string;
};

const CONTEST = "the-24-hour-film-contest";
const GCCC = "the-great-canadian-commercial-contest";
const JACK = { film: "jack" };
const BULLY = { film: "the-bully-solution" };
const GLIMPSE = { film: "glimpse" };

/** The day the clippings and pages below were read against their sources. */
const READ: IsoDate = "2026-09-26";

// ---------------------------------------------------------------------------
// Sources: the online reviews first, then the clippings, oldest first.
// ---------------------------------------------------------------------------

export const PRESS_SOURCES = {
  "aicn-2006": {
    outlet: "Ain’t It Cool News",
    author: "Selena",
    headline: "Selena on ABOMINABLE & LIE STILL @ Fantastic Fest!!!",
    published: "September 24, 2006",
    year: 2006,
    url: "https://legacy.aintitcool.com/node/30178",
  },
  "fantasia-2007": {
    outlet: "Fantasia",
    headline: "The Bully Solution",
    published: "July 2007 (the festival's programme)",
    year: 2007,
    url: "https://web.archive.org/web/20080504192318/http://www.fantasiafest.com/2007/en/films/film_detail.php?id=277",
    note: "A programmer's note in Fantasia's 2007 programme, not a review.",
  },
  "exclaim-2010": {
    outlet: "Exclaim!",
    author: "Scott A. Gray",
    headline: "Midnight Mania: Creepy",
    published: "June 1, 2010",
    year: 2010,
    url: "https://exclaim.ca/film/article/midnight_mania_creepy",
  },
  "citynews-2010": {
    outlet: "CityNews",
    author: "Brian McKechnie",
    headline:
      "Worldwide Short Film Fest Offers Big Entertainment in Little Time",
    published: "May 31, 2010",
    year: 2010,
    url: "https://web.archive.org/web/20100603222655/http://www.citytv.com/toronto/citynews/entertainment/movies/article/78048--worldwide-short-film-fest-offers-big-entertainment-in-little-time",
  },
  "tmtm-2010": {
    outlet: "The More the Merrier",
    author: "donna g",
    headline: "Shorter is Better @ Worldwide Short Film Festival (June 1 - 6)",
    published: "May 30, 2010",
    year: 2010,
    url: "https://tmtmshow.blogspot.com/2010/05/shorter-is-better-worldwide-short-film.html",
    note: "His list called it an arts radio show; this is the show's blog, and the page doesn't mention radio.",
  },
  "rue-morgue-2010": {
    outlet: "Rue Morgue",
    author: "Sean Plummer",
    headline:
      "Shorts, Sharp, Shocking: Tonight’s “Creepy” Portion of the Worldwide Short Film Festival",
    published: "June 4, 2010",
    year: 2010,
    url: "https://web.archive.org/web/20100801064638/http://rue-morgue.com/blog/archives/2010/06/04/shorts-sharp-shocking-tonight%E2%80%99s-%E2%80%9Ccreepy%E2%80%9D-portion-of-the-worldwide-short-film-festival/",
    note: "Rue Morgue's blog, not the print magazine.",
  },
  "toronto-film-scene-2010": {
    outlet: "Toronto Film Scene",
    author: "Trista DeVries",
    headline: "Review: Midnight Mania: Creepy – WSFF 2010",
    published: "June 6, 2010",
    year: 2010,
    url: "https://web.archive.org/web/20100616090153/http://thetfs.ca/2010/06/06/review-midnight-mania-creepy-wsff-2010/",
  },

  "richmond-review-1997": {
    outlet: "The Richmond Review",
    author: "Don Fennell",
    headline: "Multi-media course first of its kind",
    published: "October 22, 1997",
    year: 1997,
    note: "He was 17 and a high-school student. The article names another student; never show the clipping.",
  },
  "straight-2002": {
    outlet: "The Georgia Straight",
    author: "Ken Eisner",
    headline: "Faster, Faster, Shoot, Shoot!",
    published: "May 16–23, 2002",
    year: 2002,
    note: "The item calls it the “24-Hour Film Festival”.",
  },
  "sun-2002": {
    outlet: "The Vancouver Sun",
    author: "Malcolm Parry",
    headline: "Group whoops it up, centre comes down",
    published: "May 16, 2002",
    year: 2002,
    note: "A society column; the page is mostly other people's photos.",
  },
  "courier-2002": {
    outlet: "The Vancouver Courier",
    author: "Cheryl Rossi",
    headline: "24-hour contest puts film in the fast lane",
    published: "May 29, 2002",
    year: 2002,
  },
  "province-2002": {
    outlet: "The Province",
    author: "David Spaner",
    headline: "24-hour race to the finish",
    published: "2002 (the clipping is undated)",
    year: 2002,
    clip: {
      src: province2002Clip,
      alt: "24-hour race to the finish. Film contest gives aspiring moviemakers a shot. By David Spaner, Movie Reporter. “Is there a permit for that location?” someone shouts. “What’s a permit?” says Hatton. No, this is guerrilla filmmaking at its best (or at least at its quickest) and after Hatton rallies the film troops they’re off to shoot.",
    },
  },
  "e-scene-2002-07": {
    outlet: "ElectronicScene",
    author: "Process",
    headline: "Report from the 24 Hour Film Contest, 6-21-02",
    published: "July 2002",
    year: 2002,
    note: "An online zine, printed out. Its headline says 6-21-02, but the night it describes was Sunday, July 21, 2002. One page of the printout is missing.",
  },
  "times-colonist-2002": {
    outlet: "Times Colonist",
    published: "August 2, 2002",
    year: 2002,
    note: "A printout of canada.com's archive; the pages with the headline and byline are missing, and the date comes from the file name.",
  },
  "e-scene-2002-09": {
    outlet: "ElectronicScene",
    author: "Process",
    headline: "24 Hr Film Contest & ES - Sept, 2002",
    published: "September 27, 2002",
    year: 2002,
    note: "Written by the people who supplied the contest's music, so partly promotional. A photo caption misspells him “Randal”.",
  },
  "nerve-2002": {
    outlet: "The Nerve",
    author: "Elizabeth Nolan",
    published: "October 2002",
    year: 2002,
    note: "The headline is profane, so it's left out here and out of the clipping.",
    clip: {
      src: nerve2002Clip,
      alt: "Now into its second year, The 24 Hour Film Contest has grown from a film school project at Capilano College to a bi-monthly event, capped at 15 teams and with a growing waiting list for contestants. Creator Kryshan Randel produced the first public version last October. … However, Randel’s main objective is to motivate and inspire filmmakers, whether they are amateurs with day jobs or industry professionals who want to hone their skills on their own creations. Elizabeth Nolan",
    },
  },
  "terminal-city-2002": {
    outlet: "Terminal City",
    author: "Kier-La Janisse",
    headline: "24 Hour Film Contest Best of 2002",
    published: "December 20, 2002 – January 15, 2003",
    year: 2002,
    note: "A clipping would need tight cropping: the same paragraph says “Hollywood crap”, and the piece ends on a jab about entry fees.",
  },
  "province-2003-best-of": {
    outlet: "The Province",
    author: "David Spaner",
    headline: "5 hours of 24 Hours",
    published: "January 28, 2003",
    year: 2003,
  },
  "playback-2003": {
    outlet: "Playback",
    author: "Ian Edwards",
    headline: "Tick tock",
    published: "March 31, 2003",
    year: 2003,
  },
  "province-2003-x2": {
    outlet: "The Province",
    author: "David Spaner",
    headline: "X2 connects with community",
    published: "April 20, 2003",
    year: 2003,
    note: "About Bryan Singer presenting the contest's awards. Think twice before featuring anything from it.",
  },
  "moviemaker-2004": {
    outlet: "MovieMaker",
    author: "Christopher Zara",
    headline: "Make a Great Movie in a Day?",
    published: "Winter 2004",
    year: 2004,
  },
  "westender-2004": {
    outlet: "Westender",
    author: "Mary Frances Hill",
    headline: "Directors for a day",
    published: "April 8–14, 2004",
    year: 2004,
    note: "The cover story. It names Ed Hatton as co-producer.",
  },
  "straight-2004": {
    outlet: "The Georgia Straight",
    author: "Ken Eisner",
    headline: "Contest winners in the “Soup”",
    published: "April 22–29, 2004",
    year: 2004,
  },
  "reel-west-2004": {
    outlet: "Reel West",
    headline: "Rookies Win",
    published: "July–August 2004",
    year: 2004,
    note: "The article calls him a publicist and “she”. Never show the clipping.",
  },
  "westender-2005": {
    outlet: "Westender",
    headline: "Giddyup, Cowboy",
    published: "February 17, 2005",
    year: 2005,
    note: "The next item on the page is offensive; a clipping must stop at this one.",
  },
  "courier-2005-04": {
    outlet: "The Vancouver Courier",
    author: "Fred Lee",
    headline: "Urban Landscape",
    published: "April 6, 2005",
    year: 2005,
    note: "A society column. The date comes from the file name.",
  },
  "courier-2005-05": {
    outlet: "The Vancouver Courier",
    author: "Fred Lee",
    headline: "Urban Landscape",
    published: "May 4, 2005",
    year: 2005,
    note: "A society column. The date comes from the file name.",
  },
  "straight-2005": {
    outlet: "The Georgia Straight",
    author: "Pieta Woolley",
    headline: "We Make Short Shorts",
    published: "August 25 – September 1, 2005",
    year: 2005,
  },
  "infamous-2007": {
    outlet: "Infamous",
    author: "Terri Potratz",
    headline: "The Future of BC Film",
    published: "June 2007",
    year: 2007,
  },
  "skinny-2008": {
    outlet: "The Skinny",
    author: "Dave Bertrand",
    headline: "Terminal Cinema",
    published: "April 2008",
    year: 2008,
    note: "The clipping has no masthead: “The Skinny” is from his own 2008 press page. Confirm it before featuring (NEXT-STEPS, question 1). The paragraph around the quotes is profane.",
  },
} as const satisfies Record<string, PressSource>;

export type PressSourceId = keyof typeof PRESS_SOURCES;

// ---------------------------------------------------------------------------
// Quotes, grouped by source in the order above. The id is the source's key
// plus a word or two from the quote.
// ---------------------------------------------------------------------------

export const PRESS_QUOTES: Readonly<Record<string, PressQuote>> = {
  // Ain't It Cool News, on The Bully Solution at Fantastic Fest
  "aicn-2006-wonderfully-wrong": {
    quote: "…wonderfully wrong.",
    about: BULLY,
    source: "aicn-2006",
    verifiedOn: READ,
  },
  "aicn-2006-wittily": {
    quote:
      "…it wittily focuses on a boy who learns the secrets of dealing with his bullies.",
    about: BULLY,
    source: "aicn-2006",
    verifiedOn: READ,
  },

  // Fantasia 2007
  "fantasia-2007-hysterically-mean": {
    quote: "…this hysterically mean “educational film” suggests several.",
    about: BULLY,
    source: "fantasia-2007",
    speaker: "Mitch Davis",
    verifiedOn: READ,
  },
  "fantasia-2007-meek-kid": {
    quote: "Okay, so you’re a meek kid who lets himself get pushed around.",
    about: BULLY,
    source: "fantasia-2007",
    speaker: "Mitch Davis",
    verifiedOn: READ,
  },

  // Jack at the Worldwide Short Film Festival, 2010
  "exclaim-2010-campy": {
    quote: "Jack flips back to the campy chuckles.",
    about: JACK,
    source: "exclaim-2010",
    verifiedOn: READ,
  },
  "exclaim-2010-cheesy": {
    quote:
      "It's shot like a cheesy commercial, complete with garish lighting and intentionally bad acting.",
    about: JACK,
    source: "exclaim-2010",
    verifiedOn: READ,
    note: "Praise for the camp it intends, but out of context it reads as a knock.",
  },
  "citynews-2010-must-sees": {
    quote:
      "…Jack, Everybody, and Mrdrchain are must-sees and should send their filmmakers to the big leagues",
    about: JACK,
    source: "citynews-2010",
    verifiedOn: READ,
    note: "Shared with two other films. His list had “Must-see…”, singular; this is the published wording.",
  },
  "tmtm-2010-just-wrong": {
    quote: "The short film Jack about pumpkin revenge is just wrong!",
    about: JACK,
    source: "tmtm-2010",
    verifiedOn: READ,
  },
  "rue-morgue-2010-evil-dead": {
    quote: "The Evil Dead is an obvious influence on this slickly-made tale…",
    about: JACK,
    source: "rue-morgue-2010",
    verifiedOn: READ,
  },
  "rue-morgue-2010-gore-gags": {
    quote: "The gore gags are pretty awesome…",
    about: JACK,
    source: "rue-morgue-2010",
    verifiedOn: READ,
    note: "The sentence goes on to say the ending shocks rather than scares. His list's “I can't believe they did it” is the reviewer's shrug, not praise, so it isn't here.",
  },
  "toronto-film-scene-2010-hilarious": {
    quote:
      "A hilarious pumpkin revenge fantasy. Brilliant. Fantastic ending. See it. That is all.",
    about: JACK,
    source: "toronto-film-scene-2010",
    verifiedOn: READ,
  },

  // The Richmond Review, 1997
  "richmond-review-1997-direct": {
    quote: "His ultimate dream, he says, is to direct.",
    about: "him",
    source: "richmond-review-1997",
    verifiedOn: READ,
  },
  "richmond-review-1997-behind-the-scenes": {
    quote:
      "…he’s becoming more interested in working behind the scenes - possibly camera work or directing.",
    about: "him",
    source: "richmond-review-1997",
    verifiedOn: READ,
  },

  // The Georgia Straight, May 2002
  "straight-2002-less-time": {
    quote: "So many movies, less time than ever!",
    about: CONTEST,
    source: "straight-2002",
    verifiedOn: READ,
  },
  "straight-2002-furious": {
    quote:
      "…culminating—after some furious editing and sound mixing—in a Wise Hall screening…",
    about: CONTEST,
    source: "straight-2002",
    verifiedOn: READ,
  },

  // The Vancouver Sun, May 2002
  "sun-2002-staging": {
    quote:
      "…the most recent staging of Kryshan Randel and Michelle Candido’s 24-Hour Film Contest…",
    about: "him",
    source: "sun-2002",
    verifiedOn: READ,
    note: "Credits the contest to him and Michelle Candido (NEXT-STEPS, question 4).",
  },

  // The Vancouver Courier, May 2002
  "courier-2002-wacky": {
    quote:
      "…a bunch of wacky criteria, and you’ve got the 24 Hour Film Contest.",
    about: CONTEST,
    source: "courier-2002",
    verifiedOn: READ,
  },
  "courier-2002-creative-challenge": {
    quote:
      "Contestants in the past have included… people just looking for a creative challenge.",
    about: CONTEST,
    source: "courier-2002",
    verifiedOn: READ,
  },
  "courier-2002-no-experience": {
    quote:
      "In February, a team with no prior filmmaking experience won third prize.",
    about: CONTEST,
    source: "courier-2002",
    verifiedOn: READ,
  },
  "courier-2002-started": {
    quote:
      "Participating in the contest gets people who haven’t previously made a film started…",
    about: CONTEST,
    source: "courier-2002",
    verifiedOn: READ,
  },
  "courier-2002-grown": {
    quote:
      "…the number of teams, audience size and interest… has grown significantly.",
    about: CONTEST,
    source: "courier-2002",
    verifiedOn: READ,
  },
  "courier-2002-demystify": {
    quote: "He hopes the contest will help demystify the filmmaking process.",
    about: "him",
    source: "courier-2002",
    verifiedOn: READ,
  },

  // The Province, 2002
  "province-2002-guerrilla": {
    quote:
      "…this is guerrilla filmmaking at its best (or at least at its quickest)…",
    about: CONTEST,
    source: "province-2002",
    verifiedOn: READ,
  },
  "province-2002-popular": {
    quote:
      "The event… has become increasingly popular since it began last October.",
    about: CONTEST,
    source: "province-2002",
    verifiedOn: READ,
  },
  "province-2002-cram": {
    quote:
      "…more than 100 film students, actors… and assorted other filmmakers cram into Joe’s venerable café…",
    about: CONTEST,
    source: "province-2002",
    verifiedOn: READ,
  },
  "province-2002-creative-control": {
    quote: "Here you get creative control, which is what I like.",
    about: CONTEST,
    source: "province-2002",
    speaker: "Audra Ricketts",
    verifiedOn: READ,
    note: "An actor in the contest, on why she entered.",
  },
  "province-2002-forces-us": {
    quote: "This forces us to do it.",
    about: CONTEST,
    source: "province-2002",
    speaker: "Gary Hawes",
    verifiedOn: READ,
    note: "A trainee assistant director on X-Men 2, on making your own film.",
  },

  // ElectronicScene, July 2002
  "e-scene-2002-07-creator": {
    quote: "This is Kryshan Randel, the contest's creator and producer.",
    about: "him",
    source: "e-scene-2002-07",
    verifiedOn: READ,
  },
  "e-scene-2002-07-energy": {
    quote:
      "As always, I was impressed with the amount of energy this contest creates…",
    about: CONTEST,
    source: "e-scene-2002-07",
    verifiedOn: READ,
  },
  "e-scene-2002-07-creativity": {
    quote: "All entries, though, showed great creativity and imagination.",
    about: CONTEST,
    source: "e-scene-2002-07",
    verifiedOn: READ,
  },
  "e-scene-2002-07-defense": {
    quote:
      "Creativity becomes a defense mechanism against the rapidly approaching deadline…",
    about: CONTEST,
    source: "e-scene-2002-07",
    verifiedOn: READ,
  },

  // Times Colonist, August 2002
  "times-colonist-2002-conceive": {
    quote:
      "…challenging filmmakers to conceive, shoot, edit and screen a short film within 24 hours.",
    about: CONTEST,
    source: "times-colonist-2002",
    verifiedOn: READ,
  },
  "times-colonist-2002-fascination": {
    quote:
      "Just to experience the pure fascination of finishing a film in 24 hours was appealing.",
    about: CONTEST,
    source: "times-colonist-2002",
    speaker: "Bart Simpson",
    verifiedOn: READ,
    note: "The winner that month, a Victoria documentary maker. His real name will read as a joke without context.",
  },

  // ElectronicScene, September 2002
  "e-scene-2002-09-rabid": {
    quote:
      "Every two months, the city of Vancouver is over-run with rabid film-makers…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },
  "e-scene-2002-09-trail": {
    quote:
      "…leaving a swirling trail of hastily scribbled pages of dialogue in their wake…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },
  "e-scene-2002-09-sidewalk": {
    quote: "My advice is to clear the sidewalk when you see them coming…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },
  "e-scene-2002-09-long-way": {
    quote: "They've come a long way since then.",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
    note: "“Then” is the first contest: three teams and about 30 people.",
  },
  "e-scene-2002-09-jammed": {
    quote: "…over 300 people jammed into the Wise Hall for the screening…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },
  "e-scene-2002-09-enthusiasm": {
    quote:
      "…all entries displayed an enthusiasm and energy that was easy to be impressed by.",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },
  "e-scene-2002-09-pilot": {
    quote: "The pilot was very slick and engaging, well edited, exciting…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
    note: "The TV pilot made from two teams' contest films.",
  },
  "e-scene-2002-09-momentum": {
    quote:
      "…a coup for the contest, and a strong indication that they are only gathering momentum.",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
    note: "The coup is Bryan Singer presenting the awards.",
  },
  "e-scene-2002-09-successful": {
    quote: "So, once again, a very successful event…",
    about: CONTEST,
    source: "e-scene-2002-09",
    verifiedOn: READ,
  },

  // The Nerve, October 2002
  "nerve-2002-creator": {
    quote:
      "Creator Kryshan Randel produced the first public version last October.",
    about: "him",
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-inspire": {
    quote: "…Randel’s main objective is to motivate and inspire filmmakers…",
    about: "him",
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-community": {
    quote:
      "His main goal, though, is to continue building the local independent film community…",
    about: "him",
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-sponsorship": {
    quote:
      "Randel and his production team have managed to obtain industry sponsorship…",
    about: "him",
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-film-school-project": {
    quote:
      "…The 24 Hour Film Contest has grown from a film school project at Capilano College…",
    about: CONTEST,
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-support": {
    quote:
      "…amateurs and professionals alike have quickly given their support to this relatively new endeavour.",
    about: CONTEST,
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-their-best": {
    quote: "…filmmakers are pushed to create their best in a short period…",
    about: CONTEST,
    source: "nerve-2002",
    verifiedOn: READ,
  },
  "nerve-2002-networking": {
    quote:
      "Networking opportunities are definitely a huge advantage of this contest…",
    about: CONTEST,
    source: "nerve-2002",
    verifiedOn: READ,
  },

  // Terminal City, December 2002
  "terminal-city-2002-welcome": {
    quote:
      "…this lesson in cooperation, efficiency and initiative is definitely a welcome one…",
    about: CONTEST,
    source: "terminal-city-2002",
    verifiedOn: READ,
  },
  "terminal-city-2002-rewarding": {
    quote:
      "…the 24 Hour Film Contest… has proven rewarding for its participants on many levels…",
    about: CONTEST,
    source: "terminal-city-2002",
    verifiedOn: READ,
  },
  "terminal-city-2002-range": {
    quote:
      "…past winners… range in subject matter from synchronized swimmers to blind acupuncturists…",
    about: CONTEST,
    source: "terminal-city-2002",
    verifiedOn: READ,
  },

  // The Province, January 2003
  "province-2003-community": {
    quote:
      "Besides being important outlets for aspiring filmmakers, such events help build a local film community.",
    about: CONTEST,
    source: "province-2003-best-of",
    verifiedOn: READ,
  },
  "province-2003-enthusiastically": {
    quote: "…a long, enthusiastically received event…",
    about: CONTEST,
    source: "province-2003-best-of",
    verifiedOn: READ,
  },

  // Playback, March 2003
  "playback-2003-eighth": {
    quote:
      "…weary filmmakers wrapped production March 15 on the eighth 24 Hour Film Contest.",
    about: CONTEST,
    source: "playback-2003",
    verifiedOn: READ,
  },
  "playback-2003-spin": {
    quote: "…19 completed their six-minute films in one spin of the clock.",
    about: CONTEST,
    source: "playback-2003",
    verifiedOn: READ,
  },

  // The Province, April 2003
  "province-2003-x2-surprised": {
    quote:
      "…the 300 in attendance happily surprised by the unexpected visitor…",
    about: CONTEST,
    source: "province-2003-x2",
    verifiedOn: READ,
    note: "The visitor is Bryan Singer.",
  },

  // MovieMaker, Winter 2004
  "moviemaker-2004-film-school": {
    quote:
      "…Randel started the Vancouver-based competition while still in film school.",
    about: "him",
    source: "moviemaker-2004",
    verifiedOn: READ,
  },
  "moviemaker-2004-popular-draw": {
    quote:
      "…a popular draw for the city’s sizable number of up-and-coming moviemakers.",
    about: CONTEST,
    source: "moviemaker-2004",
    verifiedOn: READ,
  },
  "moviemaker-2004-impulsive": {
    quote:
      "…the deadline is meant to push moviemakers to imagine something completely impulsive and unpredictable.",
    about: CONTEST,
    source: "moviemaker-2004",
    verifiedOn: READ,
  },
  "moviemaker-2004-inventiveness": {
    quote:
      "Organizers of these sped-up festivals believe the frantic pace sparks contestants’ inventiveness.",
    about: CONTEST,
    source: "moviemaker-2004",
    verifiedOn: READ,
    note: "About marathon festivals in general, his among them.",
  },

  // Westender, April 2004
  "westender-2004-digital-revolution": {
    quote: "24-hour contest captures a (mostly) digital revolution",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
    note: "The cover line.",
  },
  "westender-2004-educates": {
    quote: "24-hour film contest educates, entertains",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
    note: "A headline.",
  },
  "westender-2004-hype": {
    quote:
      "It sounds like hype—until the next Saturday, when Joe’s Cafe opens its doors.",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-biggest-year": {
    quote: "…the 225 aspiring filmmakers in this, the contest’s biggest year…",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-spills-out": {
    quote:
      "…the 225-strong crowd that spills out the door of Joe’s Cafe and onto Commercial Drive.",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-mingle": {
    quote:
      "Students, film grads, working grips, production assistants and veteran filmmakers mingle for the simple contest.",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-stars": {
    quote: "Stars have shone.",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-education": {
    quote: "No one said a 24-hour film education would be easy.",
    about: CONTEST,
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-better-than": {
    quote:
      "This was even better than Hatton and co-producer Kryshan Randel could have visualized…",
    about: "him",
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-organized": {
    quote: "The pair is nothing if not organized.",
    about: "him",
    source: "westender-2004",
    verifiedOn: READ,
    note: "The pair is him and Ed Hatton.",
  },
  "westender-2004-newly-minted": {
    quote: "…Randel placed an ad for his newly-minted 24-hour film contest…",
    about: "him",
    source: "westender-2004",
    verifiedOn: READ,
  },
  "westender-2004-birthplace": {
    quote:
      "Randel had expanded his small venture from its Capilano College film-school birthplace…",
    about: "him",
    source: "westender-2004",
    verifiedOn: READ,
  },

  // The Georgia Straight, April 2004
  "straight-2004-founder": {
    quote: "fest founder Kryshan Randel",
    about: "him",
    source: "straight-2004",
    verifiedOn: READ,
    note: "A descriptor, not a sentence.",
  },
  "straight-2004-30-teams": {
    quote:
      "…30 teams of Vancouver filmmakers competing for awards at the latest 24Hour Film Contest.",
    about: CONTEST,
    source: "straight-2004",
    verifiedOn: READ,
  },

  // Reel West, July–August 2004
  "reel-west-2004-800": {
    quote: "24 Hour Film Contest attracted over 800 people in April",
    about: CONTEST,
    source: "reel-west-2004",
    verifiedOn: READ,
    note: "The deck under the headline.",
  },

  // Westender, February 2005
  "westender-2005-cowboy": {
    quote:
      "Cowboy… came away with first prize during February’s 48 hour film contest Quick Flick Challenge.",
    about: "him",
    source: "westender-2005",
    verifiedOn: READ,
    note: "Cowboy is his film, but not on the site (NEXT-STEPS, question 2).",
  },
  "westender-2005-producer": {
    quote:
      "Cowboy, a romantic sex comedy directed by 24 Hour Film Contest producer Kryshan Randel…",
    about: "him",
    source: "westender-2005",
    verifiedOn: READ,
    note: "Cowboy is his film, but not on the site (NEXT-STEPS, question 2).",
  },

  // The Vancouver Courier, April and May 2005
  "courier-2005-04-cell-phone": {
    quote: "…the $25 budget, short film, Cell Phone by Kryshan Randel.",
    about: "him",
    source: "courier-2005-04",
    verifiedOn: READ,
    note: "Cell Phone is his film, but not on the site (NEXT-STEPS, question 2).",
  },
  "courier-2005-04-executive-producer": {
    quote:
      "Randel is executive producer of the upcoming Great Canadian Commercial Contest…",
    about: "him",
    source: "courier-2005-04",
    verifiedOn: READ,
  },
  "courier-2005-05-innovative": {
    quote:
      "Vancouver’s most innovative fast film event, The Great Canadian Commercial Contest, attracted 400 filmmakers…",
    about: GCCC,
    source: "courier-2005-05",
    verifiedOn: READ,
  },
  "courier-2005-05-must-attend": {
    quote:
      "At the must-attend affair for ad agencies and film and television industry types…",
    about: GCCC,
    source: "courier-2005-05",
    verifiedOn: READ,
  },
  "courier-2005-05-cannes": {
    quote:
      "The winning PSAs qualified for the World’s Best Commercials screening in Cannes.",
    about: GCCC,
    source: "courier-2005-05",
    verifiedOn: READ,
    note: "Did they screen? (NEXT-STEPS, question 5.)",
  },

  // The Georgia Straight, August 2005
  "straight-2005-executive-director": {
    quote:
      "Kryshan Randel, the executive director of the 24-Hour and Great Canadian Commercial contests…",
    about: "him",
    source: "straight-2005",
    verifiedOn: READ,
  },
  "straight-2005-charity": {
    quote: "the Great Canadian Commercial Contest, a 48-hour charity PSA event",
    about: GCCC,
    source: "straight-2005",
    verifiedOn: READ,
  },

  // Infamous, June 2007
  "infamous-2007-leading-the-way": {
    quote: "5 YOUNG DIRECTORS THAT ARE LEADING THE WAY",
    about: "him",
    source: "infamous-2007",
    verifiedOn: READ,
    note: "The deck, in capitals as printed. He is one of the five.",
  },
  "infamous-2007-motivated": {
    quote:
      "He has always felt motivated to tell stories and film is his favourite medium.",
    about: "him",
    source: "infamous-2007",
    verifiedOn: READ,
  },
  "infamous-2007-by-doing": {
    quote: "…found inspiration by doing: he produced The 24 Hour Film Contest…",
    about: "him",
    source: "infamous-2007",
    verifiedOn: READ,
  },
  "infamous-2007-forty-shorts": {
    quote:
      "…the Great Canadian Commercial Contest, in addition to directing more than 40 shorts.",
    about: "him",
    source: "infamous-2007",
    verifiedOn: READ,
    note: "Confirm the number before using it (NEXT-STEPS, question 3).",
  },
  "infamous-2007-learn-by-doing": {
    quote:
      "…Randel will continue to learn by doing and make as many movies as he can.",
    about: "him",
    source: "infamous-2007",
    verifiedOn: READ,
  },
  "infamous-2007-glimpse": {
    quote:
      "…Glimpse, about a heartbroken woman who foresees the outcome of future relationships.",
    about: GLIMPSE,
    source: "infamous-2007",
    verifiedOn: READ,
  },
  "infamous-2007-laughs-and-insight": {
    quote:
      "Delivering both laughs and insight, Randel worked with mentor Scott Smith…",
    about: GLIMPSE,
    source: "infamous-2007",
    verifiedOn: READ,
  },
  "infamous-2007-kick-start": {
    quote: "…the 2006 Kick Start films added only more credence to that fact.",
    about: GLIMPSE,
    source: "infamous-2007",
    verifiedOn: READ,
    note: "About the whole 2006 Kick Start group, Glimpse among them. The site dates Glimpse 2007.",
  },

  // The Skinny, April 2008 (outlet to confirm)
  "skinny-2008-sick-sick": {
    quote:
      "A sick, sick after-school special with an ominous onscreen countdown and child-to-child violence.",
    about: BULLY,
    source: "skinny-2008",
    verifiedOn: READ,
  },
  "skinny-2008-revered": {
    quote:
      "…The Bully Solution is the most revered & successful of Bloodshots films.",
    about: BULLY,
    source: "skinny-2008",
    verifiedOn: READ,
    note: "The sentence begins with his name misspelled, “Randal”, which is why it's cut.",
  },
  "skinny-2008-laughed": {
    quote: "Throughout, an audience member laughed loudly, horribly…",
    about: BULLY,
    source: "skinny-2008",
    verifiedOn: READ,
  },
};

/** A quote with its source (and its film, when it's about one) filled in, ready to render. */
export type ResolvedPressQuote = Omit<PressQuote, "source"> & {
  id: string;
  source: PressSource;
  /** The film's title, when the quote is about a film. */
  film?: string;
};

/**
 * The quote with this id, with its source, or undefined when there's no such
 * quote or it's about an NDA'd film (never shown or named, spec §11). A held
 * film's quote may show on About: it's about him as much as the film.
 * content/validate.ts turns a missing id into a build error.
 */
export function resolvePressQuote(id: string): ResolvedPressQuote | undefined {
  const entry = PRESS_QUOTES[id];
  if (!entry) return undefined;
  const { about } = entry;
  let film: string | undefined;
  if (typeof about === "object") {
    const project = PROJECTS.find((item) => item.slug === about.film);
    if (!project || project.rights === "nda") return undefined;
    film = project.title;
  }
  const source: PressSource = PRESS_SOURCES[entry.source];
  return { ...entry, id, source, ...(film ? { film } : {}) };
}

/** The quotes with these ids, in order, skipping any that don't resolve. */
export function resolvePressQuotes(
  ids: ReadonlyArray<string>,
): ResolvedPressQuote[] {
  return ids.flatMap((id) => {
    const quote = resolvePressQuote(id);
    return quote ? [quote] : [];
  });
}

/**
 * Who said it and when, as every quote shows it: "Mitch Davis, Fantasia,
 * 2007". The year keeps an old quote from passing for a new one.
 */
export function pressCitation(item: ResolvedPressQuote): string {
  return [item.speaker, item.source.outlet, String(item.source.year)]
    .filter(Boolean)
    .join(", ");
}

/**
 * The quote as the site sets it: inside curly quotation marks, with any
 * quotation marks it already contains turned to single ones, as they would
 * be printed inside a quote (“…this hysterically mean ‘educational film’…”).
 * The words stay exactly as printed; only the marks around them change.
 */
export function inQuotes(quote: string): string {
  return `“${quote.replace(/“/g, "‘").replace(/”/g, "’")}”`;
}

/** Words in a quote, not counting the "…" that marks a cut or a lone dash. */
export function countQuoteWords(quote: string): number {
  return quote
    .replace(/…/g, " ")
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}
