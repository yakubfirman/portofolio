"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NAV_LINKS } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-900/30 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#hero" className="text-lg font-bold tracking-tight text-white">
          YFM<span className="text-red-500">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-gray-400 transition-colors hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-red-500 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Button
            href="mailto:yakubfirmanmustofa@gmail.com"
            size="sm"
            className="hidden md:inline-flex"
          >
            Hire Me
          </Button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xs border border-red-900/30 text-gray-400 transition-colors hover:border-red-700/50 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-red-900/30 bg-[#0a0a0a] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xs px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-red-950/30 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Button
              href="mailto:yakubfirmanmustofa@gmail.com"
              size="sm"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Hire Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
