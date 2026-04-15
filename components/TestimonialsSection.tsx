import { SectionHeading, Button, Reveal } from "@/components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import type { Testimonial } from "@/lib/data";
import TestimonialsCarousel from "./TestimonialsCarousel";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsSection({ testimonials }: Props) {
  // Hide section if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading tag="Reviews" title="Apa Kata Klien" />
        </Reveal>

        {/* Carousel - Client Component */}
        <TestimonialsCarousel testimonials={testimonials} />

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
