import { SectionHeading, Button, Reveal } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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
              <div className="group relative rounded-lg border border-white/10 bg-[#0a0a0a] p-6 hover:border-white/20 transition-all hover:bg-[#0d0d0d] h-full flex flex-col justify-between">
                {/* Star rating placeholder */}
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 rounded-full bg-yellow-500/20 flex items-center justify-center text-[10px]">
                      ★
                    </div>
                  ))}
                </div>

                {/* Message */}
                <p className="mb-4 line-clamp-4 text-sm text-gray-400 leading-relaxed">
                  "{testimonial.message}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                  {testimonial.image && (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
                    <p className="text-[11px] text-gray-600 truncate">
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
