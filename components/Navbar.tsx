"use client";

import { useState, useEffect, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NAV_LINKS } from "@/lib/data";
import type { Profile } from "@/lib/data";

export default function Navbar({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollActive, setScrollActive] = useState("");
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    startTransition(() => setOpen(false));
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
    // /projects juga aktif saat di home & scroll ke section #projects
    if (href === "/projects") {
      return (
        pathname === "/projects" ||
        pathname.startsWith("/projects/") ||
        (pathname === "/" && scrollActive === "/#projects")
      );
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`navbar-enter sticky top-0 z-60 w-full transition-all duration-500 ${
          scrolled || open
            ? "bg-[#0a0a0a]/90 shadow-lg shadow-black/40 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Bottom border line that appears on scroll */}
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-red-800/35 to-transparent transition-opacity duration-500 ${
            scrolled || open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ── Main bar ── */}
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500/70"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-red-600/25 blur-lg transition-all duration-500 group-hover:bg-red-500/45 group-hover:blur-xl" />
              <div className="relative h-9 w-9 scale-100 overflow-hidden rounded-full ring-1 ring-red-800/60 transition-all duration-300 group-hover:scale-105 group-hover:ring-red-500/80">
                <Image src="/photo.png" alt={`${profile.first_name} ${profile.last_name}`} fill sizes="36px" className="object-cover" priority />
              </div>
              {/* Online dot */}
              <span className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-[#0a0a0a]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-[13px] font-bold tracking-tight text-white">
                {(() => {
                  const parts = profile.first_name.trim().split(" ");
                  const accent = parts.pop() ?? "";
                  const start = parts.join(" ");
                  return <>{start}{start ? " " : ""}<span className="text-red-500">{accent}</span>{" "}{profile.last_name}</>;
                })()}
              </span>
              <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-gray-600 uppercase sm:block">
                Portofolio
              </span>
            </div>
          </Link>

          {/* ── Desktop nav — floating pill ── */}
          <nav className="hidden items-center md:flex" aria-label="Main navigation">
            <div
              className={`flex items-center gap-0.5 rounded-xs px-1.5 py-1.5 transition-all duration-500 ${
                scrolled ? "bg-white/4 shadow-lg ring-1 shadow-black/30 ring-white/8" : ""
              }`}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-xs px-4 py-1.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${
                      active
                        ? "bg-red-700/20 text-red-300 shadow-sm ring-1 ring-red-700/25"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-red-500/70" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── Right: CTA + hamburger ── */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="btn-pulse group hidden items-center gap-2 rounded-xs bg-red-700 px-4 py-1.5 text-[13px] font-semibold text-white ring-1 ring-red-600/40 transition-all duration-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-950/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 md:inline-flex"
            >
              {/* <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 opacity-80" /> */}
              Contact Me
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className={`relative flex h-9 w-9 items-center justify-center rounded-xs border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 md:hidden ${
                open
                  ? "border-red-600/50 bg-red-950/50 text-red-400"
                  : "border-red-900/30 bg-white/3 text-gray-400 hover:border-red-800/50 hover:bg-white/7 hover:text-white"
              }`}
            >
              <FontAwesomeIcon
                icon={open ? faXmark : faBars}
                className={`h-4 w-4 transition-all duration-300 ${
                  open ? "scale-110 rotate-90" : "scale-100 rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile: backdrop + right-side drawer ── */}
      <div
        id="mobile-drawer"
        aria-hidden={!open}
        className={`fixed inset-0 z-70 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 flex h-full w-70 flex-col bg-[#0c0303]/98 shadow-2xl shadow-black/60 backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-red-900/12 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-10 h-48 w-48 rounded-full bg-red-950/20 blur-3xl" />

          {/* ── Drawer header ── */}
          <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-red-900/20 px-5">
            <div className="flex items-center gap-2">
              <span className="ping-slow inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-80" />
              <span className="font-mono text-[9px] font-semibold tracking-[0.2em] text-gray-600 uppercase">
                Navigation
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="flex h-7 w-7 items-center justify-center rounded-xs border border-red-900/30 text-gray-500 transition-all duration-200 hover:border-red-700/50 hover:bg-red-950/30 hover:text-red-400"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          </div>

          {/* ── Nav links ── */}
          <nav
            className="relative flex flex-1 flex-col overflow-y-auto px-3 py-5"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-xs px-4 py-3 text-[15px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${
                    active
                      ? "bg-red-700/15 text-white ring-1 ring-red-700/20"
                      : "text-gray-400 hover:bg-white/4 hover:text-white"
                  }`}
                  style={{
                    transform: open ? "translateX(0)" : "translateX(20px)",
                    opacity: open ? 1 : 0,
                    transition: `transform 340ms cubic-bezier(0.25,0.46,0.45,0.94) ${i * 45 + 80}ms, opacity 260ms ease ${i * 45 + 80}ms, background-color 200ms, color 200ms`,
                  }}
                >
                  <span
                    className={`w-5 shrink-0 font-mono text-[10px] tabular-nums transition-colors duration-200 ${
                      active ? "text-red-500" : "text-gray-700 group-hover:text-red-800/80"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Divider ── */}
          <div
            className="mx-5 h-px bg-linear-to-r from-red-900/40 via-red-900/20 to-transparent transition-opacity duration-300"
            style={{ opacity: open ? 1 : 0, transitionDelay: `${NAV_LINKS.length * 45 + 100}ms` }}
          />

          {/* ── CTA block ── */}
          <div
            className="relative shrink-0 px-5 py-5"
            style={{
              transform: open ? "translateX(0)" : "translateX(20px)",
              opacity: open ? 1 : 0,
              transition: `transform 340ms cubic-bezier(0.25,0.46,0.45,0.94) ${NAV_LINKS.length * 45 + 150}ms, opacity 260ms ease ${NAV_LINKS.length * 45 + 150}ms`,
            }}
          >
            <a
              href="mailto:yakubfirmanmustofa@gmail.com"
              onClick={() => setOpen(false)}
              className="btn-pulse flex w-full items-center justify-center gap-2.5 rounded-xs bg-red-700 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition-all duration-200 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:scale-[0.97]"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
              Hire Me
            </a>
            <p className="mt-3 text-center font-mono text-[9px] tracking-widest text-gray-700">
              yakubfirmanmustofa@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
