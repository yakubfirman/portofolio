import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ABOUT_STATS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-5 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="About Me" title="Tentang Saya" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Bio — 3 cols */}
          <Reveal delay={100} className="lg:col-span-3">
          <div>
            {/* Profile row */}
            <div className="mb-8 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-xs bg-linear-to-br from-red-950 to-[#0d0d0d]">
                  <span className="text-lg font-black tracking-widest text-red-400">YFM</span>
                </div>
                <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full border-2 border-[#0a0a0a] bg-green-500" />
              </div>
              <div>
                <p className="font-semibold text-white">Yakub Firman Mustofa</p>
                <p className="text-sm text-gray-500">Full Stack Web Dev &amp; SEO Specialist</p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-green-400/80">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Open to Work
                </span>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
              <p>
                Saya adalah{" "}
                <span className="text-white font-medium">Full Stack Web Developer</span>{" "}
                yang fokus membangun produk digital dari sisi frontend hingga backend —
                dengan sentuhan{" "}
                <span className="text-white font-medium">SEO</span>{" "}
                agar mudah ditemukan mesin pencari.
              </p>
              <p>
                Berbasis di{" "}
                <span className="text-white font-medium">Surakarta, Jawa Tengah</span>,
                saya terus mengasah skill di ekosistem React, Next.js, Laravel, dan berbagai
                teknologi modern lainnya.
              </p>
            </div>
          </div></Reveal>

          {/* Stats — 2 cols */}
          <Reveal delay={220} className="lg:col-span-2">
          <div>
            <div className="grid grid-cols-2 gap-3">
              {ABOUT_STATS.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="group rounded-xs bg-red-950/20 p-3 sm:p-4 transition-all duration-200 hover:bg-red-950/35"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="mb-3 h-5 w-5 text-red-600 transition-colors group-hover:text-red-400"
                  />
                  <p className="mb-0.5 text-[11px] uppercase tracking-wider text-gray-600">{label}</p>
                  <p className="text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

