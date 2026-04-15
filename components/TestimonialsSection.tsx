import { SectionHeading, Button, Reveal } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faQuoteLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { Testimonial } from "@/lib/data";
import { useState, useEffect } from "react";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsSection({ testimonials }: Props) {
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

  // Hide section if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

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

  // Show 3 cards at a time for larger screens, 1 for mobile
  const visibleCount = 3;
  const displayItems = [];
  for (let i = 0; i < visibleCount; i++) {
    displayItems.push(testimonials[(current + i) % testimonials.length]);
  }

  return (
    <section id="testimonials" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading tag="Reviews" title="Apa Kata Klien" />
        </Reveal>

        {/* Slider Container */}
        <div className="relative group">
          {/* Cards Grid - responsive layout */}
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 mb-8">
            {displayItems.map((testimonial, idx) => (
              <Reveal key={`${current}-${idx}`} delay={idx * 80}>
                <div className="group/card relative flex h-full flex-col overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] transition-all duration-300 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/30 animate-in fade-in duration-500">
                  {/* Glow accent */}
                  <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-red-900/10 blur-[50px]" />

                  {/* Icon & Quote */}
                  <div className="relative px-5 pt-5 pb-2">
                    <FontAwesomeIcon 
                      icon={faQuoteLeft} 
                      className="h-6 w-6 text-red-800/40 opacity-60"
                    />
                  </div>

                  {/* Message */}
                  <p className="relative px-5 pb-4 text-sm text-gray-300 leading-relaxed line-clamp-4">
                    {testimonial.message}
                  </p>

                  {/* Divider */}
                  <div className="relative border-t border-red-900/15" />

                  {/* Author */}
                  <div className="relative flex items-center gap-3 px-5 py-4">
                    {testimonial.image && (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover flex-shrink-0 border border-red-900/30"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {testimonial.role}
                        {testimonial.company && ` · ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-2">
            {/* Prev Button */}
            <button
              onClick={prev}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-red-900/30 bg-[#0a0a0a]/80 backdrop-blur-sm text-red-600 hover:border-red-800/60 hover:bg-red-950/30 transition-all"
              aria-label="Previous testimonial"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current 
                      ? "w-8 bg-red-600" 
                      : "w-2 bg-red-900/40 hover:bg-red-900/60"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={next}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-red-900/30 bg-[#0a0a0a]/80 backdrop-blur-sm text-red-600 hover:border-red-800/60 hover:bg-red-950/30 transition-all"
              aria-label="Next testimonial"
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            </button>
          </div>

          {/* Autoplay indicator */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              {isAutoplay ? "⏸ Auto-playing..." : "▶ Resume autoplay"}
            </button>
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={150}>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/testimonial" variant="outline" className="w-full sm:w-auto">
              Berikan Testimoni
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
