import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";
import { ABOUT_META, ABOUT_EDUCATION } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="About Me" title="Tentang Saya" />
        </Reveal>

        <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
          {/* ── Left: Content ── */}
          <Reveal delay={120} className="md:col-span-3">
            <div className="flex flex-col gap-7">
              {/* Bio */}
              <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                <p>
                  Saya adalah seorang{" "}
                  <span className="font-semibold text-white">Full Stack Web Developer</span> dan{" "}
                  <span className="font-semibold text-white">SEO Specialist</span> yang membangun
                  produk digital dari sisi frontend hingga backend — sekaligus memastikan setiap
                  produk mudah ditemukan mesin pencari melalui strategi SEO yang terstruktur.
                </p>
                <p>
                  Selama lebih dari <span className="font-semibold text-white">2 tahun</span>{" "}
                  berkecimpung di dunia <span className="font-semibold text-white">freelance</span>,
                  saya telah membangun berbagai proyek web — mulai dari landing page, aplikasi web
                  dinamis, hingga optimasi mesin pencari untuk berbagai klien.
                </p>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                {ABOUT_META.map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 rounded-xs border border-red-900/30 bg-[#0f0505] px-3.5 py-2 text-xs text-gray-400"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="h-3.5 w-3.5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    {text}
                  </span>
                ))}
              </div>

              {/* Education */}
              <div>
                <div className="flex flex-col gap-3">
                  {ABOUT_EDUCATION.map((edu) => (
                    <div
                      key={edu.school}
                      className="flex items-start gap-3.5 rounded-xs border border-red-900/20 bg-[#0f0505] px-4 py-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs bg-red-900/20">
                        <FontAwesomeIcon
                          icon={edu.icon}
                          className="h-3.5 w-3.5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">{edu.degree}</p>
                        <p className="text-xs text-gray-500">{edu.school}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs font-semibold text-red-400">{edu.year}</span>
                        {edu.note && (
                          <p className="flex items-center justify-end gap-1 text-[10px] text-gray-500">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="h-2.5 w-2.5 text-yellow-600/70"
                            />
                            {edu.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: Photo card ── */}
          <Reveal delay={50} className="order-first md:order-last md:col-span-2">
            <div className="relative mx-auto max-w-55 sm:max-w-xs lg:max-w-57.5 xl:max-w-62.5">
              {/* Corner bracket decorations */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2.5 -left-2.5 z-10 h-6 w-6 border-t-2 border-l-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-2.5 -right-2.5 z-10 h-6 w-6 border-t-2 border-r-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-10 h-6 w-6 border-b-2 border-l-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2.5 -bottom-2.5 z-10 h-6 w-6 border-r-2 border-b-2 border-red-700/60"
              />

              {/* Outer glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-xs bg-red-900/15 blur-2xl"
              />

              {/* Photo */}
              <div className="relative aspect-3/4 overflow-hidden rounded-xs border border-red-900/30 bg-[#0f0505]">
                <Image
                  src="/photo.png"
                  alt="Yakub Firman Mustofa"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#080303]/90 via-[#080303]/50 to-transparent" />

                {/* Name + status overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-bold text-white">Yakub Firman Mustofa</p>
                  <p className="mt-0.5 text-[11px] text-red-400">
                    Full Stack Dev &amp; SEO Specialist
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-[11px] text-gray-300">Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
