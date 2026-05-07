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

type IconDef = { icon: IconType; color: string };
type Item =
  | { type: "cat"; label: string }
  | { type: "skill"; name: string; icon: IconType; color: string };

const SKILL_ICONS: Record<string, IconDef> = {
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
  const cycle: Item[] = [];
  for (const cat of categories) {
    const catSkills = cat.skills
      .filter((s) => SKILL_ICONS[s.name])
      .map((s) => ({ type: "skill" as const, name: s.name, ...SKILL_ICONS[s.name] }));
    if (catSkills.length === 0) continue;
    cycle.push({ type: "cat", label: cat.label });
    cycle.push(...catSkills);
  }

  if (cycle.length === 0) return null;

  const track = [...cycle, ...cycle];

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
      </div>

      <div className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-linear-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-linear-to-l from-[#0a0a0a] to-transparent" />

        <div className="skills-marquee-left flex w-max items-center gap-3 py-2">
          {track.map((item, i) =>
            item.type === "cat" ? (
              <CategoryDivider key={`cat-${item.label}-${i}`} label={item.label} />
            ) : (
              <SkillChip key={`skill-${item.name}-${i}`} skill={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryDivider({ label }: { label: string }) {
  return (
    <div className="mx-4 flex shrink-0 items-center gap-3">
      <span className="h-px w-6 bg-red-900/60" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-700/80">
        {label}
      </span>
      <span className="h-px w-6 bg-red-900/60" />
    </div>
  );
}

function SkillChip({ skill }: { skill: { name: string; icon: IconType; color: string } }) {
  const Icon = skill.icon;
  return (
    <div
      className="group flex shrink-0 cursor-default items-center gap-3 rounded-xs border border-white/8 px-5 py-3 transition-all duration-300 hover:border-white/20"
      style={{ "--brand": skill.color } as React.CSSProperties}
    >
      <Icon
        className="h-5 w-5 shrink-0 text-white/30 transition-colors duration-300 group-hover:text-(--brand)"
        aria-hidden="true"
      />
      <span className="text-[14px] font-medium text-white/40 transition-colors duration-300 group-hover:text-white/85">
        {skill.name}
      </span>
    </div>
  );
}
