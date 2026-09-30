/**
 * All copy for the home page lives here so it can be edited without touching
 * layout code. Keep claims factual: anything a prospect could hold us to
 * (timelines, guarantees, numbers) must be something the business commits to.
 * House style: British spelling, plain words, no em dashes.
 */

export const hero = {
  eyebrow: "AI · Cloud · Product engineering",
  title: "Engineering for the hard parts of your roadmap",
  intro:
    "We design, build and run AI products, cloud platforms and custom software, with senior engineers who stay accountable from the first workshop to production.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Explore services", href: "#services" },
};

/**
 * Banner carousel at the top of the page. Photos are free-licence images from
 * Unsplash (https://unsplash.com/license: commercial use allowed, attribution
 * not required), hotlinked from their CDN. Each slide notes its source photo.
 * To use your own photos instead, put them in /public/images/banner/ and set
 * `image` to e.g. "/images/banner/ai.jpg". Avoid photos of people unless they
 * are your own team.
 */
export type BannerSlide = {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const bannerSlides: BannerSlide[] = [
  {
    eyebrow: "AI & Machine Learning",
    title: "AI that answers from your own data",
    text: "Assistants, agents and predictive models that run in production and are measured like any other system.",
    cta: { label: "Explore AI services", href: "#services" },
    // Source: Growtika, https://unsplash.com/photos/nGoCBxiaRO0
    image: unsplash("photo-1674027444485-cec3da58eef4"),
    imageAlt: "Abstract sphere of connected dots and lines on a dark blue background",
  },
  {
    eyebrow: "Cloud & DevOps",
    title: "Platforms that stay up and stay on budget",
    text: "Migrations, Kubernetes and CI/CD pipelines on AWS, Azure and Google Cloud.",
    cta: { label: "See cloud services", href: "#services" },
    // Source: Taylor Vick, https://unsplash.com/photos/M5tzZtFCOfs
    image: unsplash("photo-1558494949-ef010cbdcc31"),
    imageAlt: "Close-up of network cables plugged into a server rack",
  },
  {
    eyebrow: "Custom Software",
    title: "Software written to be maintained",
    text: "Web platforms, mobile apps and APIs that whoever comes after us can read, run and extend.",
    cta: { label: "Discuss a build", href: "#contact" },
    // Source: Arnold Francisca, https://unsplash.com/photos/f77Bh3inUpE
    image: unsplash("photo-1555066931-4365d14bab8c"),
    imageAlt: "Laptop screen showing lines of source code",
  },
  {
    eyebrow: "Dedicated Teams",
    title: "Senior engineers who work from your roadmap",
    text: "A squad we manage or specialists inside your team, typically kicking off in about two weeks.",
    cta: { label: "Compare engagement models", href: "#engagement" },
    // Source: Alesia Kazantceva, https://unsplash.com/photos/XLm6-fPwK5Q
    image: unsplash("photo-1497215842964-222b430dc094"),
    imageAlt: "Bright modern office with a desktop computer on a clean desk by large windows",
  },
];

/** Section headings, rendered centred with a small coloured eyebrow above the title. */
export const sections = {
  tools: { title: "Built on the platforms you already use" },
  services: {
    eyebrow: "Services",
    title: "Everything from AI prototypes to production platforms",
    description: "Pick one practice or combine several. Either way you work with one team, not a chain of vendors.",
  },
  commitments: {
    eyebrow: "Our commitments",
    title: "What you can hold us to",
  },
  engagement: {
    eyebrow: "Engagement models",
    title: "Three ways to work with us",
    description:
      "Hand us a whole project, get a team that works only on your product, or add a specialist to your own.",
  },
  process: {
    eyebrow: "Process",
    title: "How a project runs",
    description: "Working software from the first sprint, and a demo at the end of every one after that.",
  },
  principles: {
    eyebrow: "Why UnityDev",
    title: "A small, senior team that stays accountable",
    description:
      "We take on the work that needs judgement as much as code: products with AI at the centre, platforms that have to stay up, and teams that have to ship.",
  },
  work: { eyebrow: "Selected work", title: "Recent projects" },
  faq: { eyebrow: "FAQ", title: "Questions we get asked" },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what you're building",
    description: "We read every enquiry ourselves and reply with honest advice, even when we're not the right fit.",
  },
};

/* ---------------------------------------------------------------------------
 * Real-world proof. These arrays stay EMPTY until the business supplies the
 * material, and each section hides itself while its array is empty. Never add
 * placeholder or invented entries.
 * ------------------------------------------------------------------------ */

export type Project = {
  title: string;
  /** Client name, or a neutral description such as "Fintech scale-up" if anonymised. */
  client: string;
  summary: string;
  services: string[];
  /** Path under /public, e.g. "/images/work/project.jpg". 16:10 works best. */
  image: string;
  imageAlt: string;
  year?: string;
};

export const work: Project[] = [];

/** Client names shown as a typographic list. Only names we have permission to show. */
export const clients: string[] = [];

export type Testimonial = { quote: string; name: string; role: string; company: string };

export const testimonials: Testimonial[] = [];

export type TeamMember = { name: string; role: string; image: string };

export const team: TeamMember[] = [];

/* ------------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    summary:
      "LLM assistants, agents and predictive models that run in production, answer from your own data and are measured like any other system.",
    points: [
      "Generative AI apps, copilots & agents",
      "RAG over your documents and systems",
      "Custom ML models & forecasting",
      "Evaluation, guardrails & MLOps",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    summary:
      "Platforms on AWS, Azure and Google Cloud that are secure, observable and priced so the monthly bill doesn't surprise anyone.",
    points: [
      "Cloud migration & modernisation",
      "Kubernetes & serverless architecture",
      "CI/CD pipelines & infrastructure as code",
      "Cost control & FinOps",
    ],
  },
  {
    id: "teams",
    title: "Dedicated Teams",
    summary:
      "Senior engineers who work from your roadmap, either as a squad we manage or as part of your in-house team.",
    points: ["Cross-functional product squads", "Staff augmentation", "Tech lead & delivery management"],
  },
  {
    id: "software",
    title: "Custom Software",
    summary: "Web platforms, mobile apps and APIs, written to be read and maintained by whoever comes after us.",
    points: ["Web & SaaS platforms", "iOS, Android & cross-platform", "APIs & integrations"],
  },
  {
    id: "data",
    title: "Data Engineering",
    summary: "Pipelines, warehouses and dashboards your teams and your AI models can both trust.",
    points: ["ETL / ELT pipelines", "Modern data warehouses", "BI & analytics dashboards"],
  },
  {
    id: "support",
    title: "QA & Managed Support",
    summary: "Automated tests, monitoring and maintenance, so what we ship keeps working after launch day.",
    points: ["Test automation", "Monitoring & incident response", "Maintenance & upgrades"],
  },
];

export const techStack = [
  "OpenAI",
  "Anthropic Claude",
  "Google Gemini",
  "LangChain",
  "PyTorch",
  "AWS",
  "Azure",
  "Google Cloud",
  "Kubernetes",
  "Terraform",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  ".NET",
  "Flutter",
  "PostgreSQL",
];

export type EngagementModel = {
  name: string;
  bestFor: string;
  description: string;
  includes: string[];
};

export const engagementModels: EngagementModel[] = [
  {
    name: "Project delivery",
    bestFor: "A defined product or milestone",
    description:
      "We own delivery end to end against an agreed scope, timeline and budget, with a single point of accountability.",
    includes: [
      "Discovery & technical scoping",
      "Fixed or milestone-based pricing",
      "Design, build, test & launch",
      "Post-launch warranty period",
    ],
  },
  {
    name: "Dedicated team",
    bestFor: "Long-term product development",
    description:
      "A cross-functional team working only on your product, led by our delivery manager and planned against your roadmap.",
    includes: [
      "Engineers, QA, design & PM as needed",
      "Monthly rolling engagement",
      "Your backlog, your priorities",
      "Grow or shrink the team as you go",
    ],
  },
  {
    name: "Team extension",
    bestFor: "Filling a skill gap quickly",
    description: "Individual specialists who join your team, follow your processes and report to your leads.",
    includes: [
      "AI, cloud, frontend, backend & mobile",
      "Matched to your stack",
      "Works in your tools and rituals",
      "Replace or add people with notice",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "Workshops on your goals, users and constraints. We name the risks early and agree what success looks like before anyone writes code.",
    deliverable: "Scope, architecture outline & roadmap",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Architecture, UX flows and a delivery plan. For AI work we prove feasibility with a small proof of concept first.",
    deliverable: "Clickable prototype & technical design",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Two-week sprints, each ending with working software demoed to you. Progress is something you see, not something you're told about.",
    deliverable: "Tested increments every sprint",
  },
  {
    step: "04",
    title: "Launch & run",
    description:
      "Production rollout with monitoring, documentation and handover, then ongoing support and iteration if you want it.",
    deliverable: "Live product, runbooks & support plan",
  },
];

export type Principle = { title: string; description: string };

export const principles: Principle[] = [
  {
    title: "Senior engineers, not trainees",
    description:
      "The people on your project have shipped production systems before. Nobody learns the basics on your budget.",
  },
  {
    title: "Nothing hidden",
    description: "Shared boards, a demo every sprint and status reports that say what's late as well as what's done.",
  },
  {
    title: "Your code, your IP",
    description: "NDAs as standard and least-privilege access throughout. Everything we create for you belongs to you.",
  },
  {
    title: "Start small, then grow",
    description: "Prove the value on something modest first, then change team size and focus as your priorities move.",
  },
];

/**
 * Commitments. These are promises, not history, so confirm each one with the
 * business before changing it.
 */
export const commitments = [
  { value: "~2 weeks", label: "Typical time to kick off a dedicated team" },
  { value: "2-week", label: "Sprints, with a working demo at the end of each" },
  { value: "100%", label: "Of the code and IP transferred to you" },
  { value: "24/7", label: "Monitoring available for managed platforms" },
];

export const faqs = [
  {
    question: "How quickly can you start?",
    answer:
      "Usually a discovery call within a few days, and a team kicking off within about two weeks, depending on the skills and seniority you need.",
  },
  {
    question: "How do you price your work?",
    answer:
      "Project delivery is usually fixed-price or milestone-based once scope is clear. Dedicated teams and team extension are billed monthly per person. We'll recommend a model during discovery.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer:
      "You do. All code, designs, documentation and other deliverables we create for you are transferred to you. We're happy to sign your NDA, or send ours, before any detailed discussion.",
  },
  {
    question: "Can you work alongside our in-house team?",
    answer:
      "Yes, it's one of the most common ways we work. Our engineers join your tools, rituals and code review, and we agree working-hour overlap up front so collaboration happens in real time.",
  },
  {
    question: "We want to use AI but don't know where to start. Can you help?",
    answer:
      "That's what discovery is for. We look for use cases with high value and low risk, check whether your data is ready, and test the idea with a small proof of concept before you commit to a full build.",
  },
  {
    question: "Do you support what you build after launch?",
    answer:
      "Yes. Every project includes a warranty period, and we offer managed support covering monitoring, maintenance, security updates and new features.",
  },
];

export const contactNextSteps = [
  { title: "A reply within one business day", body: "From a person who has read your message." },
  { title: "A discovery call", body: "30 to 45 minutes on goals, constraints and timeline." },
  { title: "A proposal", body: "Scope, team shape and estimate, usually within a week." },
];

export const contactServiceOptions = [
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Dedicated Development Team",
  "Custom Software Development",
  "Data Engineering",
  "QA & Managed Support",
  "Not sure yet",
] as const;

export const contactBudgetOptions = [
  "Under $25k",
  "$25k – $75k",
  "$75k – $200k",
  "$200k+",
  "Monthly team engagement",
  "Not sure yet",
] as const;
