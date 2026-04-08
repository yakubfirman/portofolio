"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faCalendarDays,
  faLocationPin,
  faUsers,
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import type { SpeakingEvent } from "@/lib/data";
import { SectionHeading, Reveal } from "@/components/ui";

type Props = { events: SpeakingEvent[] };

const INITIAL_SHOW = 2;

export default function SpeakingSection({ events }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? events : events.slice(0, INITIAL_SHOW);
  const hasMore = events.length > INITIAL_SHOW;

  return (
    <section id="speaking" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Public Speaking" title="Rekam Jejak Pembicara" />
        </Reveal>

        <div className="flex flex-col gap-6">
          {visible.map((item, index) => (
            <Reveal key={index} delay={index * 80}>
              <div className="relative overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] p-6 transition-all duration-300 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/20 sm:p-7">
                {/* Glow accent */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-red-900/10 blur-[60px]" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  {/* ── Icon ── */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xs bg-red-700/20 ring-1 ring-red-700/30">
                    <FontAwesomeIcon icon={faMicrophone} className="h-5 w-5 text-red-500" />
                  </div>

                  {/* ── Content ── */}
                  <div className="min-w-0 flex-1">
                    {/* Badge + title */}
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-xs bg-red-700 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                        {item.title}
                      </span>
                    </div>
                    <h3 className="text-base leading-snug font-bold text-white sm:text-lg">
                      {item.event}
                    </h3>
                    <p className="mt-0.5 text-sm text-red-400/80">{item.organizer}</p>

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="h-3 w-3 text-red-700/60"
                        />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faLocationPin} className="h-3 w-3 text-red-700/60" />
                        {item.location}
                      </span>
                      {item.audience && (
                        <span className="flex items-center gap-1.5">
                          <FontAwesomeIcon icon={faUsers} className="h-3 w-3 text-red-700/60" />
                          {item.audience}
                        </span>
                      )}
                    </div>

                    {/* Topics */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-xs bg-red-950/60 px-2.5 py-0.5 font-mono text-[10px] text-red-400/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Link ── */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat dokumentasi ${item.event}`}
                    className="flex shrink-0 items-center gap-1.5 self-start rounded-xs border border-red-900/30 bg-red-950/20 px-3 py-1.5 text-xs font-medium text-gray-400 transition-all hover:border-red-700/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    Dokumentasi
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
                className="flex items-center gap-2 rounded-xs border border-red-900/30 bg-red-950/20 px-5 py-2.5 text-sm font-medium text-gray-400 transition-all hover:border-red-700/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                {showAll ? (
                  <>
                    Sembunyikan
                    <FontAwesomeIcon icon={faChevronUp} className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Lihat Semua ({events.length - INITIAL_SHOW} lainnya)
                    <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
