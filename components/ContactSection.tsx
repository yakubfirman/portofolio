import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faMapPin,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data/socials";
import SectionHeading from "@/components/ui/SectionHeading";
import AvailabilityPill from "@/components/ui/AvailabilityPill";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Get In Touch" title="Mari Berkolaborasi" />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          {/* ── Left: headline + CTA ── */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="flex flex-col gap-6">
              <div>
                <AvailabilityPill text="Open to Work" />
              </div>

              <p className="text-sm leading-relaxed text-gray-500">
                Saya terbuka untuk proyek freelance, kolaborasi kreatif, maupun peluang kerja penuh
                waktu. Hubungi lewat email atau media sosial — saya akan membalas secepatnya.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="mailto:yakubfirmanmustofa@gmail.com"
                  className="group inline-flex items-center gap-2.5 rounded-xs bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-950/40 transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 shrink-0" />
                  Kirim Email
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <span className="flex items-center gap-1.5 text-xs text-gray-700">
                  <FontAwesomeIcon icon={faMapPin} className="h-3 w-3 text-red-900/50" />
                  Surakarta, Jawa Tengah — Indonesia
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Right: social links ── */}
          <Reveal delay={200} className="lg:col-span-2">
            <p className="mb-4 text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
              Temukan saya di
            </p>
            <div className="flex flex-col gap-1">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (buka di tab baru)`}
                  className="group flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm text-gray-500 transition-all hover:bg-red-950/25 hover:text-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-red-800/50 transition-colors group-hover:text-red-400"
                  />
                  <span className="flex-1 text-xs">{label}</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-50"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
