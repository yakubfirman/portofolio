"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/ui";
import type { Testimonial } from "@/lib/data";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoplay || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const prev = () => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };

  const next = () => {
    setCurrent((p) => (p + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoplay(false);
  };

  // Show 1 card at a time with auto-rotation - more elegant presentation
  const displayItems = [testimonials[current]];
  
  return (
    <div className="relative group">
      {/* Single Card Display with smooth transitions */}
      <div className="relative mb-8 mx-auto">
        {displayItems.map((testimonial) => (
          <Reveal key={`${current}`} delay={0}>
            <div className="group/card max-w-3xl flex flex-col overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] transition-all duration-300 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/30 animate-in fade-in p-6 sm:p-8">
              {/* Glow accent */}
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-red-900/10 blur-[50px]" />

              {/* Icon & Quote */}
              <div className="mb-3">
                <FontAwesomeIcon 
                  icon={faQuoteLeft} 
                  className="h-6 w-6 text-red-800/35 opacity-50"
                />
              </div>

              {/* Message - limited height */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-center mb-4 line-clamp-5">
                &quot;{testimonial.message}&quot;
              </p>

              {/* Divider */}
              <div className="border-t border-red-900/15 my-3" />

              {/* Author - at bottom */}
              <div className="flex items-center justify-center gap-3 mt-3">
                {testimonial.image && (
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover shrink-0 border border-red-900/30"
                  />
                )}
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {testimonial.role}
                    {testimonial.company && ` · ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Navigation Controls - centered */}
      <div className="flex flex-col items-center gap-6">
        {/* Dots Indicator - main navigation */}
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current 
                  ? "w-3 h-3 bg-red-600 shadow-lg shadow-red-600/50" 
                  : "w-2 h-2 bg-red-900/30 hover:bg-red-800/50"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              title={`${idx + 1} dari ${testimonials.length}`}
            />
          ))}
        </div>

        {/* Prev/Next Buttons - subtle */}
        <div className="flex gap-4 items-center">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/30 bg-[#0a0a0a]/50 backdrop-blur-sm text-red-600/70 hover:border-red-800/60 hover:bg-red-950/40 hover:text-red-500 transition-all"
            aria-label="Previous testimonial"
            title="Testimoni sebelumnya"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
          </button>

          <span className="text-xs text-gray-600">
            {current + 1} / {testimonials.length}
          </span>

          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-red-900/30 bg-[#0a0a0a]/50 backdrop-blur-sm text-red-600/70 hover:border-red-800/60 hover:bg-red-950/40 hover:text-red-500 transition-all"
            aria-label="Next testimonial"
            title="Testimoni berikutnya"
          >
            <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
          </button>
        </div>

        
      </div>
    </div>
  );
}
