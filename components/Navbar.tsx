"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollActive, setScrollActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (pathname !== "/") return;
      // Scroll-based active detection only on home page
      const anchorLinks = NAV_LINKS.filter((l) => l.href.startsWith("/#"));
      const ids = anchorLinks.map((l) => l.href.slice(2)); // "/#about" → "about"
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 96) {
          setScrollActive(`/#${id}`);
          return;
        }
      }
      setScrollActive("");
    };
    // Run once on mount too
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      // Anchor section — active only on home page via scroll position
      return pathname === "/" && scrollActive === href;
    }
    // Real page — active when pathname matches or is a sub-path
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`navbar-enter sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-red-900/35 bg-[#0a0a0a]/95 shadow-md shadow-black/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* ── Main bar ── */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500/70"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-md transition-all duration-500 group-hover:bg-red-500/35 group-hover:blur-lg" />
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-red-800/50 transition-all duration-300 group-hover:ring-red-500/60">
              <Image src="/photo.png" alt="Yakub Firman Mustofa" fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight text-white">
              Yakub <span className="text-red-500">Firman</span> Mustofa
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-500 sm:block">
              Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${
                  active ? "text-white" : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300 ${
                    active ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:yakubfirmanmustofa@gmail.com"
            className="btn-pulse hidden items-center gap-2 rounded-sm bg-red-700 px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 md:inline-flex"
          >
            Hire Me
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`flex h-9 w-9 items-center justify-center rounded-sm border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 md:hidden ${
              open
                ? "border-red-700/50 bg-red-950/30 text-red-400"
                : "border-red-900/30 bg-transparent text-gray-400"
            }`}
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                open ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-red-900/20 bg-[#0a0a0a]/98 px-5 pb-4 pt-2 backdrop-blur-xl">
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${
                    active
                      ? "bg-red-950/30 text-white"
                      : "text-gray-400 hover:bg-red-950/15 hover:text-white"
                  }`}
                  style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                >
                  {active && (
                    <span className="h-1 w-1 shrink-0 rounded-full bg-red-500" />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <div className="my-1.5 h-px bg-red-900/20" />
            <a
              href="mailto:yakubfirmanmustofa@gmail.com"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-950/25 hover:text-red-300"
            >
              Hire Me →
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

