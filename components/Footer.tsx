import { NAV_LINKS } from "@/lib/data/nav";
import { SOCIALS } from "@/lib/data/socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-red-900/20 bg-[#060606]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-700/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -left-40 h-80 w-80 rounded-full bg-red-950/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-red-900/12 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── Top: Brand CTA ── */}
        <Reveal>
          <div className="border-b border-red-900/15 py-12 sm:py-16">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              {/* Brand text */}
              <div>
                <p className="mb-2 font-mono text-[11px] font-semibold tracking-widest text-red-700/60 uppercase">
                  Available for Work
                </p>
                <h2 className="text-3xl leading-tight font-black tracking-tighter text-white sm:text-4xl lg:text-5xl">
                  Let&apos;s build something
                  <br />
                  <span className="text-red-500">great together.</span>
                </h2>
              </div>
              {/* CTA */}
              <a
                href="mailto:yakubfirmanmustofa@gmail.com"
                className="group flex shrink-0 items-center gap-3 rounded-sm border border-red-800/40 bg-red-950/20 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-red-600/60 hover:bg-red-900/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-4 w-4 text-red-400"
                  aria-hidden="true"
                />
                Kirim Email
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3 w-3 text-red-400 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* ── Middle: Links grid ── */}
        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-10 py-10 sm:grid-cols-3">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-1 text-2xl font-black tracking-tight text-white">
                YFM<span className="text-red-500">.</span>
              </p>
              <p className="mb-4 text-xs text-gray-600">Yakub Firman Mustofa</p>
              <p className="text-xs leading-relaxed text-gray-700">
                Full Stack Web Developer
                <br />& SEO Specialist
                <br />
                Surakarta, Jawa Tengah
              </p>
            </div>

            {/* Nav */}
            <div>
              <p className="mb-4 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                Navigasi
              </p>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-1.5 rounded-xs text-sm text-gray-600 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <span className="h-px w-0 bg-red-500 transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-4 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                Sosial Media
              </p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex items-center gap-2.5 rounded-xs text-sm text-gray-600 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon icon={icon} className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Bottom bar ── */}
        <Reveal delay={150}>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-red-900/10 py-6 sm:flex-row">
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} Yakub Firman Mustofa. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-700">
                Built with <span className="text-gray-600">Next.js · Tailwind CSS</span>
              </span>
              <a
                href="#hero"
                aria-label="Kembali ke atas"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-red-900/25 text-gray-600 transition-all hover:border-red-700/50 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
