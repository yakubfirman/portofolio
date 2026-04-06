import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { AvailabilityPill, Button } from "@/components/ui";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-center px-5 sm:px-8 sm:pt-10"
    >
      {/* Main layout */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Left: text ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Role badge */}
            <div className="hero-animate hero-delay-2 mb-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="hidden h-px w-8 bg-linear-to-r from-transparent to-red-700/50 sm:block" />
              <span className="flex items-center gap-2 rounded-xs bg-red-950/50 px-3 py-1 text-[10px] font-semibold tracking-widest text-red-400/90 uppercase">
                <FontAwesomeIcon icon={faTerminal} className="h-2.5 w-2.5" />
                Full Stack Dev · SEO Specialist
              </span>
              <span className="hidden h-px w-8 bg-linear-to-l from-transparent to-red-700/50 sm:block" />
            </div>

            {/* Name */}
            <h1 className="hero-animate hero-delay-3 mb-6 text-[clamp(2.4rem,8vw,5.5rem)] leading-none font-black tracking-tighter">
              <span className="block text-white">
                Yakub <span className="text-red-700">Firman</span>
              </span>
              <span className="block text-white">Mustofa</span>
            </h1>

            {/* Tagline */}
            <p className="hero-animate hero-delay-4 mx-auto mb-7 max-w-sm text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0 lg:max-w-md">
              Saya seorang Fullstack Web Developer dan SEO Specialist. Berfokus pada pengembangan
              website yang fungsional sekaligus mudah ditemukan oleh mesin pencari.
            </p>

            {/* CTAs */}
            <div className="hero-animate hero-delay-5 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <Button href="#projects" className="w-full sm:w-auto">
                Lihat Proyek
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="/resumefirman.pdf"
                download
                variant="outline"
                className="w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-red-500" />
                Download CV
              </Button>
            </div>
          </div>

          {/* ── Right: terminal card (desktop only) ── */}
          <div className="hero-animate hero-delay-3 hidden w-85 shrink-0 lg:block">
            {/* Outer glow */}
            <div className="relative">
              <div className="absolute -inset-px rounded-xs bg-linear-to-br from-red-800/40 via-transparent to-transparent" />
              <div className="overflow-hidden rounded-xs bg-[#0d0404] shadow-2xl shadow-red-950/40">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 bg-[#130808] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-900/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-red-900/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-red-900/30" />
                  <span className="ml-auto font-mono text-[10px] text-gray-700">
                    yakub.config.ts
                  </span>
                </div>

                {/* Code content */}
                <div className="p-5 font-mono text-[11px] leading-[1.9]">
                  <p className="text-gray-600">{"// developer profile"}</p>
                  <p className="mt-1">
                    <span className="text-red-400">const </span>
                    <span className="text-white">developer</span>
                    <span className="text-gray-400"> = {"{"}</span>
                  </p>
                  <div className="pl-4">
                    <p>
                      <span className="text-red-300/70">name</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-green-400/80">&quot;Yakub Firman M.&quot;</span>
                      <span className="text-gray-600">,</span>
                    </p>
                    <p>
                      <span className="text-red-300/70">role</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-green-400/80">&quot;Full Stack Dev&quot;</span>
                      <span className="text-gray-600">,</span>
                    </p>
                    <p>
                      <span className="text-red-300/70">location</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-green-400/80">&quot;Surakarta, ID&quot;</span>
                      <span className="text-gray-600">,</span>
                    </p>
                    <p>
                      <span className="text-red-300/70">available</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-blue-400/80">true</span>
                      <span className="text-gray-600">,</span>
                    </p>
                    <p>
                      <span className="text-red-300/70">stack</span>
                      <span className="text-gray-400">: [</span>
                    </p>
                    <div className="pl-4">
                      <p>
                        <span className="text-green-400/80">&quot;Next.js&quot;</span>
                        <span className="text-gray-600">,</span>
                      </p>
                      <p>
                        <span className="text-green-400/80">&quot;Laravel&quot;</span>
                        <span className="text-gray-600">,</span>
                      </p>
                      <p>
                        <span className="text-green-400/80">&quot;TypeScript&quot;</span>
                        <span className="text-gray-600">,</span>
                      </p>
                    </div>
                    <p>
                      <span className="text-gray-400">],</span>
                    </p>
                  </div>
                  <p>
                    <span className="text-gray-400">{"}"}</span>
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-gray-600">
                    <span className="text-red-700/80">$</span>
                    <span className="cursor-blink inline-block h-3.5 w-0.5 bg-red-600/80" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-animate hero-delay-5 mt-12 lg:mt-16">
          <div className="flex overflow-hidden rounded-xs">
            {[
              { num: "14+", label: "Proyek Selesai" },
              { num: "2+", label: "Tahun Pengalaman" },
              { num: "∞", label: "Semangat Belajar" },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                className={`flex-1 py-5 text-center transition-all duration-200 hover:bg-red-950/20${i > 0 ? "border-l border-red-900/20" : ""}`}
              >
                <p className="text-xl font-black text-white sm:text-2xl">{num}</p>
                <p className="mt-0.5 text-[10px] tracking-widest text-gray-600 uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
