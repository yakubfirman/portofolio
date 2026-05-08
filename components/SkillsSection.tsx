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

const MARQUEE_CLASSES = [
  "skills-marquee-left",
  "skills-marquee-right",
  "skills-marquee-left-slow",
] as const;

export default function SkillsSection({ categories }: Props) {
  const rows: TrackItem[][] = [[], [], []];
  let totalSkills = 0;
  let catCount = 0;

  categories.forEach((cat) => {
    const catSkills = cat.skills
      .filter((s) => SKILL_ICONS[s.name])
      .map((s): TrackItem => ({ type: "skill", name: s.name, ...SKILL_ICONS[s.name] }));
    if (catSkills.length === 0) return;
    totalSkills += catSkills.length;
    rows[catCount % 3].push({ type: "cat", label: cat.label }, ...catSkills);
    catCount++;
  });

  if (totalSkills === 0) return null;

  const tracks = rows.map((row) => (row.length > 0 ? [...row, ...row] : []));

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/10 blur-[120px]" />
        <div className="absolute left-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-rose-900/8 blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[200px] w-[200px] rounded-full bg-red-900/8 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
              {totalSkills} teknologi &amp; tools
            </p>
            <span className="hidden h-px w-8 bg-white/10 sm:block" />
            <p className="text-[11px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
              {catCount} kategori
            </p>
          </div>
        </Reveal>
      </div>

      {/* Marquee tracks */}
      <div className="relative mt-12 space-y-3.5">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-48" />

        {tracks.map((track, rowIdx) =>
          track.length > 0 ? (
            <div
              key={rowIdx}
              className={`${MARQUEE_CLASSES[rowIdx]} flex w-max items-center gap-3`}
            >
              {track.map((item, i) =>
                item.type === "cat" ? (
                  <CategoryDivider key={`r${rowIdx}-${item.label}-${i}`} label={item.label} />
                ) : (
                  <SkillChip key={`r${rowIdx}-${item.name}-${i}`} skill={item} size={rowIdx === 0 ? "lg" : "md"} />
                )
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}

function CategoryDivider({ label }: { label: string }) {
  return (
    <div className="mx-5 flex shrink-0 items-center gap-2">
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-red-800/40" />
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-red-800/40" />
      <span className="select-none text-[9px] font-black uppercase tracking-[0.28em] text-red-800/50">
        {label}
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-red-800/40" />
      <span className="h-px w-6 bg-gradient-to-l from-transparent to-red-800/40" />
    </div>
  );
}

function SkillChip({ skill, size = "md" }: { skill: SkillItem; size?: "md" | "lg" }) {
  const Icon = skill.icon;
  const isLg = size === "lg";
  return (
    <div
      className={`group relative flex shrink-0 cursor-default items-center overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:shadow-lg ${
        isLg ? "gap-3 px-5 py-3" : "gap-2.5 px-4 py-2.5"
      }`}
      style={{ "--brand": skill.color } as React.CSSProperties}
    >
      {/* Glow on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${skill.color}18 0%, transparent 65%)`,
        }}
      />
      {/* Bottom border accent */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.color}60, transparent)` }}
      />
      <Icon
        className={`relative z-10 shrink-0 text-white/25 transition-all duration-300 group-hover:scale-110 group-hover:text-(--brand) group-hover:drop-shadow-[0_0_6px_var(--brand)] ${
          isLg ? "h-[20px] w-[20px]" : "h-[17px] w-[17px]"
        }`}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 whitespace-nowrap font-medium tracking-wide text-white/30 transition-colors duration-300 group-hover:text-white/80 ${
          isLg ? "text-[13.5px]" : "text-[12.5px]"
        }`}
      >
        {skill.name}
      </span>
    </div>
  );
}
