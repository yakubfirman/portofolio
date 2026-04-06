import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const FOCUS_TAGS = ["React / Next.js", "Laravel", "Tailwind CSS", "SEO & GSC", "WordPress"];

const META = [
  { icon: faLocationDot, text: "Surakarta, Jawa Tengah" },
  { icon: faGraduationCap, text: "Teknik Informatika UMS '26" },
  { icon: faBriefcase, text: "2+ Tahun Freelance" },
];

const HIGHLIGHTS = [
  { value: "2+", label: "Tahun\nPengalaman" },
  { value: "14+", label: "Proyek\nSelesai" },
  { value: "100%", label: "Klien\nPuas" },
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

              {/* Highlight numbers */}
              <div className="flex items-center divide-x divide-red-900/25">
                {HIGHLIGHTS.map(({ value, label }) => (
                  <div key={value} className="flex-1 px-4 first:pl-0 last:pr-0 sm:px-6">
                    <p className="text-2xl font-black text-white sm:text-3xl">{value}</p>
                    <p className="mt-1 whitespace-pre-line text-[11px] leading-tight text-gray-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-red-900/25 via-red-900/10 to-transparent" />

              {/* Tech focus tags */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                  Tech Focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-xs border border-red-800/30 bg-red-950/20 px-3 py-1 text-xs font-medium text-red-300/70 transition-colors hover:border-red-700/50 hover:text-red-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>

          {/* ── Right: Photo card ── */}
          <Reveal delay={50} className="order-first lg:order-last lg:col-span-2">
            <div className="relative mx-auto max-w-55 sm:max-w-xs lg:max-w-57.5 xl:max-w-62.5">
              {/* Corner bracket decorations */}
              <div aria-hidden="true" className="pointer-events-none absolute -left-2.5 -top-2.5 z-10 h-6 w-6 border-l-2 border-t-2 border-red-700/60" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-2.5 -top-2.5 z-10 h-6 w-6 border-r-2 border-t-2 border-red-700/60" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-10 h-6 w-6 border-b-2 border-l-2 border-red-700/60" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-2.5 -right-2.5 z-10 h-6 w-6 border-b-2 border-r-2 border-red-700/60" />

              {/* Outer glow */}
              <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-xs bg-red-900/15 blur-2xl" />

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
                  <p className="mt-0.5 text-[11px] text-red-400">Full Stack Dev &amp; SEO Specialist</p>
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

