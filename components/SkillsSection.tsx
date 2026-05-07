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

type SkillItem = { name: string; icon: IconType; color: string };
type TrackItem = { type: "cat"; label: string } | ({ type: "skill" } & SkillItem);
type Props = { categories: SkillCategory[] };

export default function SkillsSection({ categories }: Props) {
  const rows: TrackItem[][] = [[], []];
  let totalSkills = 0;

  categories.forEach((cat, i) => {
    const catSkills = cat.skills
      .filter((s) => SKILL_ICONS[s.name])
      .map((s): TrackItem => ({ type: "skill", name: s.name, ...SKILL_ICONS[s.name] }));
    if (catSkills.length === 0) return;
    totalSkills += catSkills.length;
    rows[i % 2].push({ type: "cat", label: cat.label }, ...catSkills);
  });

  if (totalSkills === 0) return null;

  const tracks = rows.map((row) => (row.length > 0 ? [...row, ...row] : []));

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-3 text-[12px] font-medium tracking-widest text-gray-600 uppercase">
            {totalSkills} teknologi &amp; tools
          </p>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-[600px] rounded-full bg-red-900/5 blur-[80px]" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-36 bg-linear-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-36 bg-linear-to-l from-[#0a0a0a] to-transparent" />

        <div className="space-y-3">
          {tracks[0].length > 0 && (
            <div className="skills-marquee-left flex w-max items-center gap-2.5">
              {tracks[0].map((item, i) =>
                item.type === "cat"
                  ? <CategoryDivider key={`r0-${item.label}-${i}`} label={item.label} />
                  : <SkillChip key={`r0-${item.name}-${i}`} skill={item} />
              )}
            </div>
          )}
          {tracks[1].length > 0 && (
            <div className="skills-marquee-right flex w-max items-center gap-2.5">
              {tracks[1].map((item, i) =>
                item.type === "cat"
                  ? <CategoryDivider key={`r1-${item.label}-${i}`} label={item.label} />
                  : <SkillChip key={`r1-${item.name}-${i}`} skill={item} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryDivider({ label }: { label: string }) {
  return (
    <div className="mx-6 flex shrink-0 items-center gap-2">
      <span className="h-px w-5 bg-linear-to-r from-transparent to-red-900/50" />
      <span className="h-1 w-1 shrink-0 rounded-full bg-red-800/50" />
      <span className="select-none text-[9px] font-black uppercase tracking-[0.24em] text-red-900/60">
        {label}
      </span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-red-800/50" />
      <span className="h-px w-5 bg-linear-to-l from-transparent to-red-900/50" />
    </div>
  );
}

function SkillChip({ skill }: { skill: SkillItem }) {
  const Icon = skill.icon;
  return (
    <div
      className="group relative flex shrink-0 cursor-default items-center gap-2.5 overflow-hidden rounded border border-white/[0.07] px-4 py-2.5 transition-all duration-300 hover:border-white/[0.18]"
      style={{ "--brand": skill.color } as React.CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${skill.color}20 0%, transparent 70%)` }}
      />
      <Icon
        className="relative z-10 h-[18px] w-[18px] shrink-0 text-white/20 transition-colors duration-300 group-hover:text-(--brand)"
        aria-hidden="true"
      />
      <span className="relative z-10 whitespace-nowrap text-[13px] font-medium tracking-wide text-white/35 transition-colors duration-300 group-hover:text-white/85">
        {skill.name}
      </span>
    </div>
  );
}
