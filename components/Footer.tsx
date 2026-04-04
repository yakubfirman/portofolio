import { NAV_LINKS, SOCIALS } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="bg-[#080808]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Reveal>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-1 text-xl font-black tracking-tight text-white">
              YFM<span className="text-red-500">.</span>
            </p>
            <p className="mb-3 text-xs text-gray-600">Yakub Firman Mustofa</p>
            <p className="text-xs leading-relaxed text-gray-700">
              Full Stack Web Developer &amp;<br />SEO Specialist · Surakarta
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
              Navigasi
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-red-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
              Temukan Saya
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xs border border-red-900/25 text-gray-600 transition-all hover:border-red-700/50 hover:text-red-400"
                >
                  <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 pt-6 sm:flex-row">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} Yakub Firman Mustofa
          </p>

        </div>
      </div>
    </footer>
  );
}
