import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SKILL_CATEGORIES } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-5 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 80}>
              <div className="flex h-full flex-col rounded-xs border border-red-900/20 bg-[#0f0505] p-5 transition-all duration-200 hover:border-red-800/40 hover:bg-red-950/20">
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xs ${cat.iconBg}`}
                  >
                    <FontAwesomeIcon
                      icon={cat.icon}
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                    />
                  </div>
                  <h3 className="text-base font-bold text-white">{cat.label}</h3>
                </div>

                {/* Skills list */}
                <div className="space-y-3.5">
                  {cat.skills.map(({ name, pct }) => (
                    <div key={name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs text-gray-400">{name}</span>
                        <span className="text-xs font-semibold text-red-400">{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-red-950/60">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-red-900 to-red-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


