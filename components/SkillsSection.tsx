"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeading, Reveal } from "@/components/ui";
import type { SkillCategory } from "@/lib/data";

type Props = { categories: SkillCategory[] };

export default function SkillsSection({ categories }: Props) {
  // Duplicate the array 4× so the loop appears seamless at any screen width
  const repeated = [...categories, ...categories, ...categories, ...categories];

  return (
    <section id="skills" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>
      </div>

      {/* Infinite icon marquee — no text, no progress bars */}
      <div className="relative mt-10 overflow-hidden">
        {/* left/right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#0a0a0a] to-transparent" />

        <div className="marquee-track flex gap-6 w-max">
          {repeated.map((cat, i) => (
            <div
              key={`${cat.label}-${i}`}
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xs ${cat.iconBg} opacity-90 hover:opacity-100 transition-opacity`}
            >
              <FontAwesomeIcon
                icon={cat.icon}
                aria-hidden="true"
                className="h-7 w-7 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
