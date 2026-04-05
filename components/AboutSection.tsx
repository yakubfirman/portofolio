import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { ABOUT_STATS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const FOCUS_TAGS = ["React / Next.js", "Laravel", "Tailwind CSS", "SEO & GSC", "WordPress"];

const META = [
  { icon: faLocationDot, text: "Surakarta, Jawa Tengah" },
  { icon: faGraduationCap, text: "Teknik Informatika UMS '26" },
  { icon: faBriefcase, text: "2+ Tahun Freelance" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-5 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="About Me" title="Tentang Saya" />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">

          {/* ── Left: Content ── */}
          <Reveal delay={120} className="lg:col-span-3">
            <div className="flex flex-col gap-7">

              {/* Bio */}
              <div className="space-y-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                <p>
                  Saya adalah seorang{" "}
                  <span className="font-semibold text-white">Full Stack Web Developer</span>{" "}
                  dan{" "}
                  <span className="font-semibold text-white">SEO Specialist</span>{" "}
                  yang membangun produk digital dari sisi frontend hingga backend — sekaligus
                  memastikan setiap produk mudah ditemukan mesin pencari melalui strategi
                  SEO yang terstruktur.
                </p>
                <p>
                  Selama lebih dari{" "}
                  <span className="font-semibold text-white">2 tahun</span>{" "}
                  berkecimpung di dunia{" "}
                  <span className="font-semibold text-white">freelance</span>, saya telah
                  membangun berbagai proyek web — mulai dari landing page, aplikasi web
                  dinamis, hingga optimasi mesin pencari untuk berbagai klien.
                </p>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                {META.map(({ icon, text }) => (
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

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-red-900/25 via-red-900/10 to-transparent" />

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {ABOUT_STATS.map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-xs border border-red-900/20 bg-[#0f0505] p-4 transition-all duration-200 hover:border-red-800/40 hover:bg-red-950/25"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-700/25 to-transparent" />
                    <FontAwesomeIcon
                      icon={icon}
                      aria-hidden="true"
                      className="mb-2.5 h-4 w-4 text-red-700 transition-colors group-hover:text-red-500"
                    />
                    <p className="text-sm font-bold text-white">{value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-600">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Right: Photo card ── */}
          <Reveal delay={50} className="order-first lg:order-last lg:col-span-2">
            <div className="relative mx-auto max-w-xs lg:max-w-none">
              {/* Corner bracket decorations */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-2.5 -top-2.5 z-10 h-7 w-7 border-l-2 border-t-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2.5 -top-2.5 z-10 h-7 w-7 border-r-2 border-t-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-10 h-7 w-7 border-b-2 border-l-2 border-red-700/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2.5 -right-2.5 z-10 h-7 w-7 border-b-2 border-r-2 border-red-700/60"
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
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-base font-bold text-white">Yakub Firman Mustofa</p>
                  <p className="mt-0.5 text-xs text-red-400">
                    Full Stack Dev &amp; SEO Specialist
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="relative flex h-2.5 w-2.5 shrink-0"
                    >
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                    </span>
                    <span className="text-xs text-gray-300">Open to Work</span>
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

