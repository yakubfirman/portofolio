import { SectionHeading, Button, Reveal } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import type { Testimonial } from "@/lib/data";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsSection({ testimonials }: Props) {
  // Hide section if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Reviews" title="Apa Kata Klien" />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 80}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] transition-all duration-300 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/30">
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

        {/* CTA */}
        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
