export type SocialIcon = "github" | "linkedin";

export type Social = {
  label: string;
  short: string;
  href: string;
  icon: SocialIcon;
};

export const PROFILE = {
  name: "Saheed Oladele",
  positioning: "Senior software engineer, writer, and lecturer.",
  location: "",
  role: "Senior Software Engineer · Scalable Capital",
  email: "hello@saheedoladele.com",
  socials: [
    { label: "LinkedIn", short: "in/saheed-oladele", href: "https://www.linkedin.com/in/saheed-oladele", icon: "linkedin" },
    { label: "GitHub", short: "github.com/suretrust", href: "https://github.com/suretrust", icon: "github" },
  ] satisfies Social[],
};

export const STACK = {
  primary: ["React", "TypeScript", "JavaScript", "Next.js"],
  secondary: ["GraphQL", "PostgreSQL", "Node.js"],
  backend: ["Kotlin", "Spring Boot", "Ruby", "Ruby on Rails"],
  infra: ["AWS", "Terraform", "Docker"],
  data: [] as string[],
};

export const CURRENTLY = [
  { label: "Building", text: "Payments investigations tooling at Scalable Capital: designing & shipping frontend, data layer, and backend services behind transactional workflows." },
  { label: "Teaching", text: "Frontend programming at the University of Europe for Applied Sciences." },
  { label: "Writing", text: "On Agent Experience (AX), and how interfaces change when the primary user is a model." },
  { label: "Exploring", text: "What it takes to design and build for agents, and what that asks of the systems behind them." },
];

export const TOPICS = ["All", "AX", "Frontend", "Backend", "Career", "Open Source"];

export type Article = {
  slug: string;
  title: string;
  dek: string;
  topics: string[];
  date: string;
  dateLabel: string;
  read: number;
  publisher: string;
  url: string;
  external: boolean;
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    slug: "ai-emergence-viteconf-2025-ax",
    title: "AI Emergence at ViteConf 2025: UX, DX, now AX",
    dek: "Notes from ViteConf 2025 in Amsterdam. The experience layer is shifting from UX to DX to AX, Agent Experience. LLM-based agents are becoming first-class consumers of our software, and we can choose to design for them on purpose.",
    topics: ["AX", "Frontend"],
    date: "2025-11-19",
    dateLabel: "Nov 2025",
    read: 7,
    publisher: "Babbel",
    url: "https://www.babbel.com/en/magazine/ai-emergence-at-viteconf-2025-ux-dx-now-ax",
    external: true,
    featured: true,
  },
  {
    slug: "onboarding-software-engineer",
    title: "7 Steps to Navigate Onboarding as a Software Engineer",
    dek: "A practical, seven-step guide to joining a new engineering team. How to build trust from the interview onward, learn the product, and offer feedback without bulldozing the people who came before you.",
    topics: ["Career"],
    date: "2024-11-12",
    dateLabel: "Nov 2024",
    read: 9,
    publisher: "LeadDev",
    url: "https://leaddev.com/hiring/7-steps-to-navigate-onboarding-as-a-software-engineer",
    external: true,
    featured: true,
  },
  {
    slug: "create-react-app-to-vite",
    title: "How to Migrate from create-react-app to Vite using Jest and Browserslist",
    dek: "The React team no longer recommends create-react-app. A step-by-step migration of a production app to Vite, keeping Jest for tests and fixing browserslist along the way.",
    topics: ["Frontend"],
    date: "2023-10-06",
    dateLabel: "Oct 2023",
    read: 13,
    publisher: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/how-to-migrate-from-create-react-app-to-vite/",
    external: true,
    featured: true,
  },
  {
    slug: "frontend-or-backend",
    title: "Frontend or Backend: How to Know the Right Track for You",
    dek: "Choosing a side of the stack early in a web-development career. How to read your own temperament, the pull toward interfaces versus systems, and commit to the track that actually fits you.",
    topics: ["Career", "Frontend", "Backend"],
    date: "2020-10-07",
    dateLabel: "Oct 2020",
    read: 6,
    publisher: "Microverse",
    url: "https://www.microverse.org/blog/frontend-or-backend-how-to-know-the-right-track",
    external: true,
  },
  {
    slug: "frontend-concepts-professional",
    title: "3 Important Frontend Concepts that Make You a Professional",
    dek: "Three ideas that separate a hobbyist from a professional frontend developer. The fundamentals don't appear in a framework tutorial, but they quietly decide how far you go.",
    topics: ["Frontend"],
    date: "2020-09-16",
    dateLabel: "Sep 2020",
    read: 6,
    publisher: "Microverse",
    url: "https://www.microverse.org/blog/3-important-frontend-concepts-that-make-you-a-professional",
    external: true,
  },
  {
    slug: "rails-unique-index",
    title: "Rails: How to Set a Unique Interchangeable Index Constraint",
    dek: "Model-level uniqueness validation gives you a nice error message, but it doesn't guarantee integrity. How to enforce an interchangeable unique constraint at the database level in Rails.",
    topics: ["Backend"],
    date: "2019-07-15",
    dateLabel: "Jul 2019",
    read: 7,
    publisher: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/how-to-set-unique-interchangeable-index-constraint-in-rails/",
    external: true,
  },
  {
    slug: "git-guide-open-source",
    title: "A Simple Git Guide and Cheat Sheet for Open Source Contributors",
    dek: "The hardest part of open source is the jump from fork to pull request. A clean, professional Git workflow that takes you from first fork to merged PR, with a cheat sheet to keep handy.",
    topics: ["Open Source", "Backend"],
    date: "2019-07-12",
    dateLabel: "Jul 2019",
    read: 9,
    publisher: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/a-simple-git-guide-and-cheat-sheet-for-open-source-contributors/",
    external: true,
  },
  {
    slug: "harsh-truths-starting-a-business",
    title: "Harsh Truths No One Will Tell You About Starting a Business",
    dek: "The unglamorous realities of starting a business, the ones that rarely survive into the success stories. Written from the founder's side of the table, for anyone about to begin.",
    topics: ["Career"],
    date: "2019-06-26",
    dateLabel: "Jun 2019",
    read: 6,
    publisher: "Startup Grind",
    url: "https://medium.com/startup-grind/harsh-truths-no-one-will-tell-you-about-starting-a-business-3acdc700adc",
    external: true,
  },
  {
    slug: "stop-writing-css-in-css",
    title: "Why You Should Stop Writing CSS in “CSS”",
    dek: "Variables, nesting, arithmetic, minification. What preprocessors give you over vanilla CSS, and why a small syntax shift pays off across a real codebase.",
    topics: ["Frontend"],
    date: "2019-04-08",
    dateLabel: "Apr 2019",
    read: 8,
    publisher: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/why-you-should-stop-writing-css-in-css-6fb724f6e3fc",
    external: true,
  },
];

export type ProjectImage = {
  src: string;
  alt: string;
  /** Aspect ratio used for the placeholder area before the image loads. */
  aspect?: string;
};

export type Project = {
  slug: string;
  name: string;
  role: string;
  year: string;
  blurb: string;
  stack: string[];
  link: string;
  href?: string;
  /** Live URL surfaced on the detail page CTA. */
  liveUrl?: string;
  accentNote: string;
  /** Card thumbnail + detail hero. */
  cover?: ProjectImage;
  /** Supporting screenshots shown on the detail page. */
  gallery?: ProjectImage[];
  /** Long-form overview shown after the Overview heading on the detail page. */
  overview?: string;
  /** Per-project My role narrative. */
  roleNote?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "chowpool",
    name: "Chowpool",
    role: "Founder · Engineer",
    year: "2026",
    blurb: "A group-buying platform for Nigerian groceries. Neighbours pool orders to unlock wholesale pricing and split delivery on staples.",
    stack: ["Next.js", "PostgreSQL", "Paystack", "Prisma"],
    link: "Visit chowpool.com",
    liveUrl: "https://chowpool.com/",
    accentNote: "marketplace · logistics",
    overview:
      "Chowpool sits between informal Nigerian sourcing networks and the people they feed. Buyers post what they need or join an open pool; verified sellers fulfil at farm-gate prices once a pool fills. Money is held in Paystack escrow and only released when the buyer confirms collection with a PIN, so trust isn't a leap of faith on either side.",
    roleNote:
      "I'm the founder and the only engineer. I write the product, design the interface, run the infrastructure on Hetzner behind Caddy, and handle the operational side: seller verification, ID checks, and the unglamorous customer-support work that decides whether early users come back.",
    cover: {
      src: "/projects/chowpool/home.png",
      alt: "Chowpool home page: buy fresh, buy in bulk, buy in trust.",
      aspect: "16 / 9",
    },
    gallery: [
      {
        src: "/projects/chowpool/browse.png",
        alt: "Browse listings: filterable marketplace of ID-verified Nigerian sellers.",
        aspect: "16 / 10",
      },
      {
        src: "/projects/chowpool/pools.png",
        alt: "Active group buys: pool orders to reach the bulk price.",
        aspect: "16 / 10",
      },
      {
        src: "/projects/chowpool/home-mobile.png",
        alt: "Chowpool home on mobile.",
        aspect: "9 / 19",
      },
      {
        src: "/projects/chowpool/browse-mobile.png",
        alt: "Browse listings on mobile.",
        aspect: "9 / 19",
      },
    ],
  },
  {
    slug: "ue-frontend-2026",
    name: "UE Frontend Course Portal",
    role: "Lecturer · Designer · Engineer",
    year: "2026",
    blurb: "The course portal for Frontend Programming at the University of Europe for Applied Sciences. Sixteen Saturday sessions across four units, with slides, starter code, and locked-by-default instructor notes.",
    stack: ["Next.js", "TypeScript", "MDX", "Netlify"],
    link: "Open the portal",
    liveUrl: "https://ue-frontend-2026.netlify.app/",
    accentNote: "teaching · course portal",
    overview:
      "A single-page portal that holds the whole semester in one view. Students see every Saturday's slides and starter code, track which units they've completed, and skim ahead without losing their place. Instructor notes stay locked behind a separate access flow so I can post teaching notes alongside the public material without overwhelming students.",
    roleNote:
      "I designed and built the portal alongside teaching the course. The interesting work was less the code and more the editorial call: deciding what each session needed to show before the Saturday it ran, and what could safely wait until afterwards.",
    cover: {
      src: "/projects/ue-frontend/home.png",
      alt: "Frontend Programming course portal: 16 sessions across four units, taught on Saturdays.",
      aspect: "16 / 9",
    },
    gallery: [
      {
        src: "/projects/ue-frontend/slides.png",
        alt: "Session view: slides, starter code, and instructor notes for a single Saturday.",
        aspect: "16 / 10",
      },
      {
        src: "/projects/ue-frontend/home-mobile.png",
        alt: "Course portal on mobile.",
        aspect: "9 / 19",
      },
    ],
  },
];

export const NAV = [
  { label: "About", path: "/about" },
  { label: "Writing", path: "/writing" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];
