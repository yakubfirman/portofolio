"use client";

import type { IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiTailwindcss, SiPhp, SiLaravel, SiPython, SiFlask, SiMysql,
  SiSqlite, SiPostgresql, SiGit, SiGithub, SiWordpress, SiPhpmyadmin,
  SiNodedotjs, SiDocker, SiLinux, SiFirebase, SiMongodb, SiRedis,
  SiVuedotjs, SiAngular, SiSass, SiBootstrap, SiNginx,
} from "react-icons/si";
import { SectionHeading, Reveal } from "@/components/ui";
import type { SkillCategory } from "@/lib/data";

type SkillDef = { name: string; icon: IconType; color: string };

/** Map any skill name (as stored in the DB) → real brand icon + official color */
const SKILL_ICONS: Record<string, { icon: IconType; color: string }> = {
  // Frontend
  "HTML5":        { icon: SiHtml5,          color: "#E34F26" },
  "CSS3":         { icon: SiCss,            color: "#1572B6" },
  "JavaScript":   { icon: SiJavascript,     color: "#F7DF1E" },
  "TypeScript":   { icon: SiTypescript,     color: "#3178C6" },
  "React":        { icon: SiReact,          color: "#61DAFB" },
  "Next.js":      { icon: SiNextdotjs,      color: "#ffffff" },
  "Tailwind CSS": { icon: SiTailwindcss,    color: "#06B6D4" },
  "Sass":         { icon: SiSass,           color: "#CC6699" },
  "Bootstrap":    { icon: SiBootstrap,      color: "#7952B3" },
  "Vue.js":       { icon: SiVuedotjs,       color: "#4FC08D" },
  "Angular":      { icon: SiAngular,        color: "#DD0031" },
  // Backend
  "PHP":          { icon: SiPhp,            color: "#777BB4" },
  "Laravel":      { icon: SiLaravel,        color: "#FF2D20" },
  "Python":       { icon: SiPython,         color: "#3776AB" },
  "Flask":        { icon: SiFlask,          color: "#ffffff" },
  "Node.js":      { icon: SiNodedotjs,      color: "#339933" },
  // Database
  "MySQL":        { icon: SiMysql,          color: "#4479A1" },
  "SQLite":       { icon: SiSqlite,         color: "#44A1C5" },
  "SQL Query":    { icon: SiPostgresql,     color: "#4169E1" },
  "PostgreSQL":   { icon: SiPostgresql,     color: "#4169E1" },
  "phpMyAdmin":   { icon: SiPhpmyadmin,     color: "#6C78AF" },
  "MongoDB":      { icon: SiMongodb,        color: "#47A248" },
  "Redis":        { icon: SiRedis,          color: "#DC382D" },
  "Firebase":     { icon: SiFirebase,       color: "#FFCA28" },
  // Tools & DevOps
  "Git / GitHub": { icon: SiGit,            color: "#F05032" },
  "Git":          { icon: SiGit,            color: "#F05032" },
  "GitHub":       { icon: SiGithub,         color: "#ffffff" },
  "Docker":       { icon: SiDocker,         color: "#2496ED" },
  "Linux":        { icon: SiLinux,          color: "#FCC624" },
  "Nginx":        { icon: SiNginx,          color: "#009639" },
  // CMS
  "WordPress":    { icon: SiWordpress,      color: "#21759B" },
};

type Props = { categories: SkillCategory[] };

export default function SkillsSection({ categories }: Props) {
  // Flatten, map to brand icons, deduplicate
  const seen = new Set<string>();
  const skills: SkillDef[] = categories
    .flatMap((cat) => cat.skills)
    .filter(({ name }) => {
      if (seen.has(name) || !SKILL_ICONS[name]) return false;
      seen.add(name);
      return true;
    })
    .map(({ name }) => ({ name, ...SKILL_ICONS[name] }));

  if (skills.length === 0) return null;

  // Repeat twice → translateX(-50%) loops seamlessly
  const dbl = <T,>(a: T[]) => [...a, ...a];

  return (
    <section id="skills" className="py-20 md:py-28">
      {/* Heading */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
      </div>

      {/* Single-row infinite marquee */}
      <div className="relative mt-14 overflow-hidden py-2">
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        <div className="skills-marquee-left flex w-max gap-10">
          {dbl(skills).map((s, i) => (
            <SkillIcon key={`${s.name}-${i}`} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillIcon({ skill }: { skill: SkillDef }) {
  const Icon = skill.icon;
  return (
    <div className="group flex shrink-0 cursor-default flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1.5">
      {/* Brand icon with official color */}
      <Icon
        style={{ color: skill.color }}
        className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
      {/* Brand name with official color */}
      <span
        className="text-center text-[11px] font-semibold leading-tight tracking-wide"
        style={{ color: skill.color }}
      >
        {skill.name}
      </span>
    </div>
  );
}
