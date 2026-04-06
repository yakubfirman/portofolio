import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faMagnifyingGlass,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";

export const SKILLS: { name: string; icon: IconDefinition }[] = [
  { name: "HTML5", icon: faHtml5 },
  { name: "CSS3", icon: faCss3Alt },
  { name: "JavaScript", icon: faJs },
  { name: "TypeScript", icon: faFileCode },
  { name: "React", icon: faReact },
  { name: "Next.js", icon: faCode },
  { name: "Tailwind CSS", icon: faWind },
  { name: "PHP", icon: faPhp },
  { name: "Laravel", icon: faServer },
  { name: "Python", icon: faPython },
  { name: "MySQL", icon: faDatabase },
  { name: "Git", icon: faGitAlt },
];

export const SKILL_CATEGORIES: {
  label: string;
  icon: IconDefinition;
  iconBg: string;
  skills: { name: string; pct: number }[];
}[] = [
  {
    label: "Frontend",
    icon: faCode,
    iconBg: "bg-red-700",
    skills: [
      { name: "HTML5", pct: 92 },
      { name: "CSS3", pct: 88 },
      { name: "JavaScript", pct: 85 },
      { name: "TypeScript", pct: 78 },
      { name: "React", pct: 85 },
      { name: "Next.js", pct: 82 },
      { name: "Tailwind CSS", pct: 90 },
    ],
  },
  {
    label: "Backend",
    icon: faServer,
    iconBg: "bg-red-800",
    skills: [
      { name: "PHP", pct: 82 },
      { name: "Laravel", pct: 85 },
      { name: "Python", pct: 70 },
      { name: "REST API", pct: 80 },
    ],
  },
  {
    label: "Database",
    icon: faDatabase,
    iconBg: "bg-red-900",
    skills: [
      { name: "MySQL", pct: 82 },
      { name: "SQL Query", pct: 85 },
      { name: "phpMyAdmin", pct: 80 },
    ],
  },
  {
    label: "SEO",
    icon: faMagnifyingGlass,
    iconBg: "bg-red-700",
    skills: [
      { name: "On-Page SEO", pct: 90 },
      { name: "Technical SEO", pct: 82 },
      { name: "Google Search Console", pct: 88 },
      { name: "Yoast SEO", pct: 85 },
    ],
  },
  {
    label: "Tools",
    icon: faGears,
    iconBg: "bg-red-800",
    skills: [
      { name: "Git / GitHub", pct: 88 },
      { name: "VS Code", pct: 92 },
      { name: "Figma", pct: 72 },
      { name: "Vercel", pct: 80 },
    ],
  },
  {
    label: "CMS",
    icon: faWordpress,
    iconBg: "bg-red-900",
    skills: [
      { name: "WordPress", pct: 85 },
      { name: "Elementor", pct: 82 },
      { name: "Page Builder", pct: 80 },
    ],
  },
];
