import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { SOCIALS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AvailabilityPill from "@/components/ui/AvailabilityPill";
import { BUTTON_VARIANTS, BUTTON_SIZES } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-5 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading tag="Get In Touch" title="Mari Berkolaborasi" centered />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* ── Left: CTA card ── */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-xs bg-[#0d0404] p-5 sm:p-8">
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-700/60 to-transparent" />
              {/* Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-900/10 blur-[60px]" />

              <div className="relative">
                <h3 className="mb-2 text-lg font-bold text-white">Punya proyek? Let&apos;s talk.</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">
                  Saya terbuka untuk diskusi proyek freelance, kolaborasi, maupun peluang kerja penuh waktu.
                  Kirim pesan dan saya akan membalas secepatnya.
                </p>

                <a
                  href="mailto:yakubfirmanmustofa@gmail.com"
                  className={`group flex w-full items-center justify-between gap-3 ${BUTTON_VARIANTS.primary} ${BUTTON_SIZES.md}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 shrink-0" />
                    <span className="truncate">Email Me</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </a>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-700">
                  <FontAwesomeIcon icon={faMapPin} className="h-3 w-3 text-red-900/60" />
                  Surakarta, Jawa Tengah — Indonesia
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: Social links ── */}
          <Reveal delay={220} className="lg:col-span-2">
            <div className="rounded-xs bg-[#0d0404] p-6">
              {/* Top accent */}
              <div className="absolute h-0" />
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-600">
                Temukan Saya
              </p>
              <div className="flex flex-col gap-1.5">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (buka di tab baru)`}
                    className="group flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm text-gray-500 transition-all hover:bg-red-950/30 hover:text-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-red-800/60 transition-colors group-hover:text-red-400"
                    />
                    <span className="flex-1">{label}</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 -rotate-45 opacity-0 transition-all group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
