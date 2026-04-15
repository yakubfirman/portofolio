import TestimonialsManager from "./TestimonialsManager";

export const dynamic = "force-dynamic";

type TestimonialRaw = {
  id: number;
  name: string;
  role: string;
  company?: string;
  message: string;
  image?: string;
  approved: number;
  sort_order: number;
  created_at: string;
};

async function fetchTestimonials(): Promise<TestimonialRaw[]> {
  try {
    const apiKey = process.env.API_SECRET_KEY;
    const res = await fetch(`${process.env.API_URL}/api/testimonials/admin`, {
      headers: {
        "X-Api-Key": apiKey || "",
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await fetchTestimonials();
  const approved = testimonials.filter((t) => t.approved).length;
  const pending = testimonials.filter((t) => !t.approved).length;

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Testimoni Klien</h1>
        <p className="mt-0.5 text-xs text-gray-600">
          {approved} disetujui, {pending} pending approval
        </p>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
