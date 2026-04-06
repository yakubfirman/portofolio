"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollActive, setScrollActive] = useState("");
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (pathname !== "/") return;
      const anchorLinks = NAV_LINKS.filter((l) => l.href.startsWith("/#"));
      const ids = anchorLinks.map((l) => l.href.slice(2));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 96) {
          setScrollActive(`/#${id}`);
          return;
        }
      }
      setScrollActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && scrollActive === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`navbar-enter sticky top-0 z-[60] w-full transition-all duration-500 ${
          scrolled || open
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
              <span className="hidden text-[10px] font-medium tracking-widest text-gray-500 uppercase sm:block">
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
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              className={`relative flex h-9 w-9 items-center justify-center rounded-sm border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 md:hidden ${
                open
                  ? "border-red-600/60 bg-red-950/40 text-red-400"
                  : "border-red-900/30 bg-transparent text-gray-400 hover:border-red-800/50 hover:text-gray-200"
              }`}
            >
              <FontAwesomeIcon
                icon={open ? faXmark : faBars}
                className={`h-4 w-4 transition-all duration-300 ${open ? "scale-110 rotate-90" : "scale-100 rotate-0"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0a0a0a]/96 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />

        {/* Glow decorations */}
        <div className="pointer-events-none absolute top-0 -right-16 h-64 w-64 rounded-full bg-red-900/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 -left-8 h-56 w-56 rounded-full bg-red-950/15 blur-3xl" />

        {/* Menu content */}
        <div className="relative flex h-full flex-col overflow-y-auto px-6 pt-24 pb-12">
          {/* Nav links */}
          <nav className="flex flex-col" role="navigation">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              const delay = open ? i * 55 : 0;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-4 border-l-2 py-4 pr-2 pl-5 text-xl font-semibold tracking-tight focus-visible:outline-none ${
                    active
                      ? "border-red-500 text-white"
                      : "border-red-900/25 text-gray-500 hover:border-red-700/50 hover:text-white"
                  }`}
                  style={{
                    transform: open ? "translateX(0)" : "translateX(-20px)",
                    opacity: open ? 1 : 0,
                    transition: `transform 350ms cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, opacity 300ms ease ${delay}ms, color 200ms, border-color 200ms`,
                  }}
                >
                  <span
                    className={`w-5 shrink-0 font-mono text-[11px] tabular-nums transition-colors duration-200 ${
                      active ? "text-red-500" : "text-gray-700 group-hover:text-red-700/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div
            className="my-6 h-px bg-gradient-to-r from-red-900/40 to-transparent"
            style={{
              opacity: open ? 1 : 0,
              transition: `opacity 300ms ease ${open ? NAV_LINKS.length * 55 : 0}ms`,
            }}
          />

          {/* Hire Me CTA */}
          <a
            href="mailto:yakubfirmanmustofa@gmail.com"
            onClick={() => setOpen(false)}
            className="btn-pulse flex items-center justify-center gap-2.5 rounded bg-red-700 py-3.5 text-sm font-bold text-white hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:bg-red-800"
            style={{
              transform: open ? "translateX(0)" : "translateX(-20px)",
              opacity: open ? 1 : 0,
              transition: `transform 350ms cubic-bezier(0.25,0.46,0.45,0.94) ${open ? NAV_LINKS.length * 55 + 60 : 0}ms, opacity 300ms ease ${open ? NAV_LINKS.length * 55 + 60 : 0}ms`,
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
