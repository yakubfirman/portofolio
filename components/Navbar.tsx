"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 96) {
          setActive(`#${id}`);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`navbar-enter sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-red-900/40 bg-[#0a0a0a]/98 shadow-xl shadow-black/40 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* ── Logo ── */}
        <a href="#hero" className="group flex items-center gap-2.5">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-md transition-all duration-500 group-hover:bg-red-500/40 group-hover:blur-lg" />
            <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-red-800/50 transition-all duration-300 group-hover:ring-red-500/70">
              <Image src="/photo.png" alt="Yakub Firman Mustofa" fill className="object-cover" />
            </div>
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight text-white">
              Yakub <span className="text-red-500">Firman</span>
            </span>
            <span className="text-[10px] font-medium tracking-widest text-gray-600 uppercase">
              Portfolio
            </span>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm transition-all duration-200 ${
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {link.label}
                {/* Active indicator dot */}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-red-500 transition-all duration-300 ${
                    isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="mailto:yakubfirmanmustofa@gmail.com"
              className="btn-pulse group inline-flex items-center gap-2 rounded-xs bg-red-700 px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600"
            >
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="relative flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span
              className={`absolute inset-0 rounded-xs border transition-all duration-300 ${
                open ? "border-red-700/50 bg-red-950/30" : "border-red-900/30 bg-transparent"
              }`}
            />
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              className={`relative h-3.5 w-3.5 transition-all duration-300 ${
                open ? "rotate-90 text-red-400" : "rotate-0 text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`overflow-hidden bg-[#090909] transition-all duration-400 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t border-red-900/20 px-4 py-3">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-all duration-200 hover:bg-red-950/25 hover:text-white ${
                  active === link.href ? "text-white" : "text-gray-500"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                {active === link.href && (
                  <span className="h-1 w-1 rounded-full bg-red-500" />
                )}
                {link.label}
              </a>
            ))}
            <div className="my-2 h-px bg-red-900/15" />
            <a
              href="mailto:yakubfirmanmustofa@gmail.com"
              onClick={() => setOpen(false)}
              className="rounded-xs px-3 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-950/25 hover:text-red-300"
            >
              Hire Me →
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
