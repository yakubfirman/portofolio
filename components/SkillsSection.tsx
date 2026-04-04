import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SKILLS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES = [
  {
    label: "Frontend",
    num: "01",
    keys: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    num: "02",
    keys: ["PHP", "Laravel", "Python", "MySQL"],
  },
  {
    label: "Tools & Version Control",
    num: "03",
    keys: ["Git"],
  },
];

export default function SkillsSection() {
  const skillMap = Object.fromEntries(SKILLS.map((s) => [s.name, s]));

  return (
    <section
      id="skills"
      className="py-20 px-5 sm:px-8 md:py-28"
      style={{ background: "linear-gradient(to bottom, #0a0a0a, #0d0508, #0a0a0a)" }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Tech Stack" title="Keahlian Teknologi" />
        </Reveal>

        <div className="space-y-10">
          {CATEGORIES.map((cat, catIndex) => {
            const items = cat.keys.map((k) => skillMap[k]).filter(Boolean);
            return (
              <Reveal key={cat.label} delay={catIndex * 150} className="group/cat">
                {/* Category header */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] font-bold text-red-900/50">{cat.num}</span>
                  <div className="h-px flex-1 bg-red-900/20" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                    {cat.label}
                  </span>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map(({ name, icon }) => (
                    <div
                      key={name}
                      className="group flex items-center gap-2.5 rounded-xs bg-[#0f0505] px-4 py-2.5 transition-all duration-200 hover:bg-red-950/40"
                    >
                      <FontAwesomeIcon
                        icon={icon}
                        className="h-4 w-4 shrink-0 text-red-700/70 transition-colors group-hover:text-red-400"
                      />
                      <span className="text-xs font-medium text-gray-500 transition-colors group-hover:text-gray-200">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

