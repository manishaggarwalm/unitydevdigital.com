/**
 * All copy for the home page lives here so it can be edited without touching
 * layout code. Keep claims factual: anything a prospect could hold us to
 * (timelines, guarantees, numbers) must be something the business commits to.
 */
import type { ComponentType, SVGProps } from "react";
import {
  CpuChipIcon,
  CloudIcon,
  CodeBracketSquareIcon,
  UserGroupIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  EyeIcon,
  LockClosedIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export const hero = {
  eyebrow: "AI · Cloud · Engineering teams",
  titleLead: "We build the software that",
  rotatingWords: ["thinks.", "scales.", "ships.", "lasts."],
  subtitle:
    "UnityDev Digital is your technology partner for AI products, cloud platforms and dedicated development teams. One accountable team from first workshop to production and beyond.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Explore services", href: "#services" },
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: Icon;
};

export const services: Service[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    summary:
      "Turn your data and workflows into intelligent products, from LLM-powered assistants to predictive models in production.",
    points: [
      "Generative AI apps, copilots & agents",
      "RAG over your documents and systems",
      "Custom ML models & forecasting",
      "Evaluation, guardrails & MLOps",
    ],
    icon: CpuChipIcon,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    summary:
      "Design, migrate and run cloud-native platforms on AWS, Azure and Google Cloud that are secure, observable and cost-aware.",
    points: [
      "Cloud migration & modernisation",
      "Kubernetes & serverless architecture",
      "CI/CD pipelines & infrastructure as code",
      "Cost optimisation & FinOps",
    ],
    icon: CloudIcon,
  },
  {
    id: "teams",
    title: "Dedicated Development Teams",
    summary:
      "Senior engineers who plug into your roadmap as a fully managed squad or as an extension of your in-house team.",
    points: [
      "Cross-functional product squads",
      "Staff augmentation",
      "Tech lead & delivery management",
      "Flexible scaling up or down",
    ],
    icon: UserGroupIcon,
  },
  {
    id: "software",
    title: "Custom Software Development",
    summary: "Web platforms, mobile apps and APIs engineered for performance and built to be maintained for years.",
    points: ["Web & SaaS platforms", "iOS, Android & cross-platform", "APIs & integrations"],
    icon: CodeBracketSquareIcon,
  },
  {
    id: "data",
    title: "Data Engineering",
    summary: "Reliable pipelines, warehouses and dashboards that give AI and your teams trustworthy data.",
    points: ["ETL / ELT pipelines", "Modern data warehouses", "BI & analytics dashboards"],
    icon: CircleStackIcon,
  },
  {
    id: "support",
    title: "QA & Managed Support",
    summary: "Automated testing, monitoring and ongoing maintenance so what we ship keeps running.",
    points: ["Test automation", "Monitoring & incident response", "Maintenance & upgrades"],
    icon: ShieldCheckIcon,
  },
];

export type EngagementModel = {
  name: string;
  bestFor: string;
  description: string;
  includes: string[];
  highlighted?: boolean;
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
      "A cross-functional team working only on your product, led by our delivery manager and aligned with your roadmap.",
    includes: [
      "Engineers, QA, design & PM as needed",
      "Monthly rolling engagement",
      "Your backlog, your priorities",
      "Scale the team as you grow",
    ],
    highlighted: true,
  },
  {
    name: "Team extension",
    bestFor: "Filling skill gaps quickly",
    description: "Individual specialists who join your existing team, follow your processes and report to your leads.",
    includes: [
      "AI, cloud, frontend, backend & mobile",
      "Hand-picked to match your stack",
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
      "Workshops to understand your goals, users and constraints. We map risks early and agree on what success looks like.",
    deliverable: "Scope, architecture outline & roadmap",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Solution architecture, UX flows and a delivery plan. For AI work, we validate feasibility with a focused proof of concept.",
    deliverable: "Clickable prototype & technical design",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Two-week sprints with working software demoed at the end of each one. You see progress continuously, not at the end.",
    deliverable: "Tested increments every sprint",
  },
  {
    step: "04",
    title: "Launch & scale",
    description:
      "Production rollout with monitoring, documentation and handover, followed by ongoing support and iteration.",
    deliverable: "Live product, runbooks & support plan",
  },
];

export type Pillar = { title: string; description: string; icon: Icon };

export const pillars: Pillar[] = [
  {
    title: "Senior by default",
    description: "Experienced engineers who have shipped production systems, not juniors learning on your budget.",
    icon: AcademicCapIcon,
  },
  {
    title: "Radical transparency",
    description: "Shared boards, sprint demos and honest status reports. You always know what's done and what's next.",
    icon: EyeIcon,
  },
  {
    title: "Security & IP protection",
    description:
      "NDAs as standard, least-privilege access and secure practices. The code and IP we create belong to you.",
    icon: LockClosedIcon,
  },
  {
    title: "Built to flex",
    description: "Start small, prove value, then scale. Adjust team size and focus as your priorities change.",
    icon: ArrowsPointingOutIcon,
  },
];

/**
 * Commitments shown as animated figures. These are promises, not history, so
 * confirm each one with the business before changing it.
 */
export const commitments = [
  { value: 2, suffix: " wks", label: "Typical time to kick off a dedicated team" },
  { value: 2, suffix: "-week", label: "Sprints with a working demo at the end of each" },
  { value: 100, suffix: "%", label: "Code and IP ownership transferred to you" },
  { value: 24, suffix: "/7", label: "Monitoring available for managed platforms" },
];

export const techStack = {
  ai: ["OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "LlamaIndex", "PyTorch", "Hugging Face", "pgvector"],
  cloud: ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Vercel"],
  build: ["TypeScript", "React", "Next.js", "Node.js", "Python", "Go", ".NET", "Flutter", "PostgreSQL", "React Native"],
};

export const faqs = [
  {
    question: "How quickly can you start?",
    answer:
      "For most engagements we can hold a discovery call within a few days and have a team kicking off within about two weeks, depending on the skills and seniority you need.",
  },
  {
    question: "How do you price your work?",
    answer:
      "Project delivery is usually fixed-price or milestone-based once scope is clear. Dedicated teams and team extension are billed monthly per team member. We'll recommend the model that fits your situation during discovery.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer:
      "You do. All code, designs, documentation and other deliverables we create for you are transferred to you. We're happy to sign your NDA or provide ours before any detailed discussion.",
  },
  {
    question: "Can you work alongside our in-house team?",
    answer:
      "Yes, and it's one of the most common ways we work. Our engineers join your tools, rituals and code review process, and we agree working-hour overlap up front so collaboration stays real-time.",
  },
  {
    question: "We want to use AI but aren't sure where to start. Can you help?",
    answer:
      "That's exactly what discovery is for. We help you identify high-value, low-risk use cases, check your data readiness, and validate the idea with a small proof of concept before committing to a full build.",
  },
  {
    question: "Do you support what you build after launch?",
    answer:
      "Yes. Every project includes a warranty period, and we offer ongoing managed support covering monitoring, maintenance, security updates and continued feature development.",
  },
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
