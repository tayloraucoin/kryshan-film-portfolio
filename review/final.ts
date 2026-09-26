import { FEATURED } from "@/content/home";
import { findShowableProject } from "@/content/projects";
import type {
  FeedbackOption,
  FeedbackQuestion,
  FeedbackSection,
} from "@/lib/review/types";
import { siteRoutes } from "@/lib/routes";

/**
 * The final review (`/review/final`): the last round of changes included in
 * the build, asked page by page on the real site. Same renderer and wire as
 * the design round's form (`review/feedback.ts`); the submission is sent as
 * `stage: "final"` so taylor-aucoin files and emails it as such (M-REV-7).
 *
 * Every page gets the same two questions: is it ready, and what should
 * change. The labels carry the page name so the email and the admin page
 * read without this file.
 */
export const FINAL_SCHEMA = "kryshan-final-2026-09";

/**
 * What the page says about what comes after, kept here so the numbers are
 * edited in one place. Prices are the change tiers published on
 * tayloraucoin.com/websites/coded; the admin panel is its add-on row.
 */
export const FINAL_TERMS = {
  pricingUrl: "https://tayloraucoin.com/websites/coded",
  smallRound: "$250",
  standardRound: "$500",
  mistakesWindow: "14 days",
  adminPanel: "$500",
} as const;

/** The longest change list one page takes; seven of them stay inside the 64 KB body. */
const CHANGES_MAX = 2500;

const verdictOptions: FeedbackOption[] = [
  { id: "ready", label: "Ready to go live as it is" },
  { id: "changes", label: "Needs changes (listed below)" },
];

function pageQuestions(id: string, page: string): FeedbackQuestion[] {
  const Page = page.charAt(0).toUpperCase() + page.slice(1);
  return [
    {
      kind: "choice",
      id: `${id}.verdict`,
      label: `${Page}: ready to go live?`,
      note: false,
      options: verdictOptions,
    },
    {
      kind: "text",
      id: `${id}.changes`,
      label: `What should change on ${page}?`,
      hint: "One change per line. Say where it is, what it says now, and what it should be. If it only happens on your phone or only on a computer, say which.",
      maxLength: CHANGES_MAX,
    },
  ];
}

// A film page to open for the "film pages" section: the first featured one.
const sampleFilm = FEATURED.map(findShowableProject).find(Boolean);

export const FINAL_SECTIONS: ReadonlyArray<FeedbackSection> = [
  {
    id: "devices",
    title: "Before you start",
    intro:
      "Go through every page twice: once on your phone, once on a computer. Most people will first see this site on a phone, so that one matters most.",
    questions: [
      {
        kind: "choice",
        id: "devices.checked",
        label: "What did you check it on?",
        note: {
          prompt: "Which phone and which browser, if you know.",
          open: false,
        },
        options: [
          { id: "both", label: "My phone and a computer" },
          { id: "phone", label: "Only my phone" },
          { id: "computer", label: "Only a computer" },
        ],
      },
    ],
  },
  {
    id: "home",
    title: "Home",
    links: [{ label: "Open Home", href: siteRoutes.home }],
    questions: pageQuestions("home", "Home"),
  },
  {
    id: "work",
    title: "Work",
    intro:
      "Try each way of arranging the films, and the credits list at the bottom.",
    links: [{ label: "Open Work", href: siteRoutes.work() }],
    questions: pageQuestions("work", "Work"),
  },
  {
    id: "films",
    title: "Film pages",
    intro:
      "Open a few films, including one you know every detail of. Check the title, year, role, client, the words about it, and that the video plays.",
    links: sampleFilm
      ? [
          {
            label: `Open ${sampleFilm.title}`,
            href: siteRoutes.project(sampleFilm.slug),
          },
        ]
      : [],
    questions: pageQuestions("films", "the film pages"),
  },
  {
    id: "about",
    title: "About",
    links: [{ label: "Open About", href: siteRoutes.about }],
    questions: pageQuestions("about", "About"),
  },
  {
    id: "teaching",
    title: "Teaching",
    links: [{ label: "Open Teaching", href: siteRoutes.teaching }],
    questions: pageQuestions("teaching", "Teaching"),
  },
  {
    id: "contact",
    title: "Contact",
    intro: "Try copying your email address, on your phone too.",
    links: [{ label: "Open Contact", href: siteRoutes.contact }],
    questions: pageQuestions("contact", "Contact"),
  },
  {
    id: "everywhere",
    title: "On every page",
    intro:
      "The menu, the footer and its links, how fast pages open, and anything missing.",
    questions: [
      ...pageQuestions("everywhere", "the menu and footer"),
      {
        kind: "text",
        id: "everywhere.missing",
        label: "Anything missing that should be there?",
        hint: "A film, a credit, a press quote, a photo, a link.",
        maxLength: CHANGES_MAX,
      },
    ],
  },
];
