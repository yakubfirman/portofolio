import { NAV_LINKS } from "@/lib/data";
import type { Social } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/ui";

type Props = { socials: Social[] };

export default function Footer({ socials }: Props) {
  return (
    <footer className="relative overflow-hidden border-t border-red-900/20 bg-[#060606]">
      {/* ── Decorative ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-700/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -left-40 h-80 w-80 rounded-full bg-red-950/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-red-900/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── Middle: Links grid ── */}
        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-0.5 text-2xl font-black tracking-tight text-white">
                Yakub <span className="text-red-500">Firman </span> Mustofa
              </p>
              <p className="mb-5 text-[11px] font-medium text-gray-700">yakubfirman.id</p>
              <p className="text-xs leading-relaxed text-gray-600">
                Full Stack Web Developer
                <br />& SEO Specialist
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-700">
                <FontAwesomeIcon
                  icon={faMapPin}
                  className="h-2.5 w-2.5 text-red-900/50"
                  aria-hidden="true"
                />
                Surakarta, Jawa Tengah
              </p>
            </div>

            {/* Nav */}
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-widest text-gray-700 uppercase">
                Navigasi
              </p>
              <nav className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <span className="h-px w-0 bg-red-500/70 transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-widest text-gray-700 uppercase">
                Sosial Media
              </p>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (buka di tab baru)`}
                    className="group flex items-center gap-2.5 text-sm text-gray-600 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="h-3 w-3 shrink-0 text-gray-700 transition-colors group-hover:text-red-400"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Bottom bar ── */}
        <Reveal delay={130}>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-red-900/10 py-6 sm:flex-row">
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} Yakub Firman Mustofa. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#hero"
                aria-label="Kembali ke atas"
                className="flex h-7 w-7 items-center justify-center rounded-xs border border-red-900/20 text-gray-700 transition-all hover:border-red-700/50 hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faArrowUp} className="h-2.5 w-2.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
