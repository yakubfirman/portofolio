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

const SKILL_ICONS: Record<string, { icon: IconType; color: string }> = {
  "HTML5":        { icon: SiHtml5,       color: "#E34F26" },
  "CSS3":         { icon: SiCss,         color: "#1572B6" },
  "JavaScript":   { icon: SiJavascript,  color: "#F7DF1E" },
  "TypeScript":   { icon: SiTypescript,  color: "#3178C6" },
  "React":        { icon: SiReact,       color: "#61DAFB" },
  "Next.js":      { icon: SiNextdotjs,   color: "#ffffff" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Sass":         { icon: SiSass,        color: "#CC6699" },
  "Bootstrap":    { icon: SiBootstrap,   color: "#7952B3" },
  "Vue.js":       { icon: SiVuedotjs,    color: "#4FC08D" },
  "Angular":      { icon: SiAngular,     color: "#DD0031" },
  "PHP":          { icon: SiPhp,         color: "#777BB4" },
  "Laravel":      { icon: SiLaravel,     color: "#FF2D20" },
  "Python":       { icon: SiPython,      color: "#3776AB" },
  "Flask":        { icon: SiFlask,       color: "#ffffff" },
  "Node.js":      { icon: SiNodedotjs,   color: "#339933" },
  "MySQL":        { icon: SiMysql,       color: "#4479A1" },
  "SQLite":       { icon: SiSqlite,      color: "#44A1C5" },
  "SQL Query":    { icon: SiPostgresql,  color: "#4169E1" },
  "PostgreSQL":   { icon: SiPostgresql,  color: "#4169E1" },
  "phpMyAdmin":   { icon: SiPhpmyadmin,  color: "#6C78AF" },
  "MongoDB":      { icon: SiMongodb,     color: "#47A248" },
  "Redis":        { icon: SiRedis,       color: "#DC382D" },
  "Firebase":     { icon: SiFirebase,    color: "#FFCA28" },
  "Git / GitHub": { icon: SiGit,         color: "#F05032" },
  "Git":          { icon: SiGit,         color: "#F05032" },
  "GitHub":       { icon: SiGithub,      color: "#ffffff" },
  "Docker":       { icon: SiDocker,      color: "#2496ED" },
  "Linux":        { icon: SiLinux,       color: "#FCC624" },
  "Nginx":        { icon: SiNginx,       color: "#009639" },
  "WordPress":    { icon: SiWordpress,   color: "#21759B" },
};

type Props = { categories: SkillCategory[] };

export default function SkillsSection({ categories }: Props) {
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

  // duplicate so -50% translateX loops seamlessly
  const row = [...skills, ...skills];

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
      </div>

      {/* Single-row brand chip scroller */}
      <div className="relative mt-14 overflow-hidden">
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        <div className="skills-marquee-left flex w-max items-center gap-4">
          {row.map((s, i) => (
            <SkillChip key={`${s.name}-${i}`} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChip({ skill }: { skill: SkillDef }) {
  const Icon = skill.icon;
  return (
    <div
      className="group flex shrink-0 cursor-default items-center gap-3 rounded-xs border border-white/[0.08] px-5 py-3 transition-all duration-300 hover:border-white/20"
      style={{ "--brand": skill.color } as React.CSSProperties}
    >
      <Icon
        className="h-6 w-6 shrink-0 text-white/30 transition-colors duration-300 group-hover:text-[var(--brand)]"
        aria-hidden="true"
      />
      <span className="text-[15px] font-medium text-white/40 transition-colors duration-300 group-hover:text-white/85">
        {skill.name}
      </span>
    </div>
  );
}
