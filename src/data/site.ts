import type { ImageMetadata } from "astro";
import acadia from "@/assets/images/acadia-university-logo.webp";
import chess from "@/assets/images/chess.png";
import dashSocial from "@/assets/images/dashsocial.png";
import portfolio from "@/assets/images/portfolio.png";
import studyLink from "@/assets/images/study-link.png";
import whisperella from "@/assets/images/whisperella.png";

/**
 * Single source of truth for site content. Edit this file to change
 * copy, projects, experience, or links — pages only render it.
 */

export const site = {
  name: "Shahbaz Singh",
  title: "Shahbaz Singh",
  role: "Full Stack Developer",
  url: "https://shbz-me.vercel.app",
  description: "A full stack developer based in Canada.",
  twitter: "@shahcodes",
  repo: "https://github.com/shahbaz-athwal/portfolio",
  /** Discord user id used for Lanyard live activity. */
  discordId: "685471362961244160",
} as const;

export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "About", href: "/" },
  { label: "Details", href: "/details" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "mail" | "github" | "linkedin" | "x";
};

export const socials: Social[] = [
  {
    label: "Email",
    handle: "me@shahcodes.in",
    href: "mailto:me@shahcodes.in",
    icon: "mail",
  },
  {
    label: "GitHub",
    handle: "shahbaz-athwal",
    href: "https://github.com/shahbaz-athwal",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "in/shahbaz-athwal",
    href: "https://www.linkedin.com/in/shahbaz-athwal/",
    icon: "linkedin",
  },
  {
    label: "X",
    handle: "@shahcodes",
    href: "https://x.com/shahcodes",
    icon: "x",
  },
];

export const skillsHighlight = [
  "TypeScript",
  "PostgreSQL",
  "Next.js",
  "React",
  "Docker",
  "Node.js",
];

export type Project = {
  title: string;
  description: string;
  href?: string;
  code: string;
  image: ImageMetadata;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Study Link",
    description: "A study & collaboration platform",
    href: "https://studylink.shahcodes.in",
    code: "https://github.com/shahbaz-athwal/study-link",
    image: studyLink,
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Better Auth",
      "Zero Sync",
      "TanStack Query",
      "Traefik",
    ],
  },
  {
    title: "Socket Chess",
    description: "A multiplayer chess game using Socket.io",
    href: "https://chess.shahcodes.in",
    code: "https://github.com/shahbaz-athwal/chess",
    image: chess,
    tags: ["Socket.io", "TypeScript", "Tailwind", "Zustand", "Node.js"],
  },
  {
    title: "Whisperella",
    description: "An anonymous messaging platform",
    href: "https://whisperella.shahcodes.in",
    code: "https://github.com/shahbaz-athwal/whisperella",
    image: whisperella,
    tags: ["Next.js", "Auth.js", "TypeScript", "PostgreSQL", "Resend", "Zod"],
  },
  {
    title: "Portfolio",
    description: "This site — portfolio and blog",
    href: "https://shbz-me.vercel.app",
    code: "https://github.com/shahbaz-athwal/portfolio",
    image: portfolio,
    tags: ["Astro", "MDX", "Tailwind", "Takumi", "Lanyard"],
  },
];

export type Role = {
  title: string;
  org: string;
  logo: ImageMetadata;
  location: string;
  date: string;
  points?: string[];
};

export const experience: Role[] = [
  {
    title: "Software Developer Intern",
    org: "Dash Social",
    logo: dashSocial,
    location: "Halifax, NS · Hybrid",
    date: "Jan 2025 → Apr 2025",
    points: [
      "Maintained the front-end application using Vue.js, Pinia, and Tailwind, directly enhancing customer experience.",
      "Contributed to RESTful APIs using Python, Flask, SQLAlchemy, and Docker supporting backend functionality and performance.",
      "Monitored application performance with Datadog, enabling faster debugging and reducing downtime.",
      "Optimized ElasticSearch queries to improve data retrieval and search.",
    ],
  },
  {
    title: "Teaching Assistant",
    org: "Acadia University",
    logo: acadia,
    location: "Wolfville, NS · On-site",
    date: "Jan 2023 → Present",
    points: [
      "Tutored 150+ students, achieving positive feedback.",
      "Enforced academic integrity and oversaw fair grading for 1000+ assignments and lab reports.",
      "Ran weekly office hours, assisting 10–15 students each session.",
    ],
  },
];

export const education: Role[] = [
  {
    title: "Bachelor of Computer Science",
    org: "Acadia University",
    logo: acadia,
    location: "Wolfville, NS",
    date: "Sep 2022 → May 2026",
  },
];

export const stack: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Turborepo",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Tailwind",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Bun",
      "Deno",
      "Python",
      "FastAPI",
      "Express",
      "Flask",
      "SQLAlchemy",
      "Drizzle",
      "Prisma",
    ],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "SQLite", "Redis", "OpenSearch"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "GitHub Actions", "AWS", "EC2", "S3", "RDS", "Lambda"],
  },
  { category: "Testing", items: ["Jest", "Vitest", "Pytest", "Cypress"] },
  { category: "Learning", items: ["Kubernetes", "Go"] },
];
