export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company?: string;
  message: string;
  image?: string;
  approved?: boolean;
  sort_order?: number;
  created_at?: string;
};

const API_URL = process.env.API_URL;

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  try {
    if (!API_URL) {
      console.warn("⚠️ API_URL not configured - testimonials disabled");
      return [];
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, {
        next: { revalidate: 3600 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        console.warn(`⚠️ Testimonials API returned ${res.status}`);
        return [];
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn("⚠️ Failed to fetch testimonials:", error.message);
    } else {
      console.warn("⚠️ Failed to fetch testimonials: unknown error");
    }
    return [];
  }
}

export async function getAllTestimonials(apiKey: string): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/api/testimonials/admin`, {
      headers: {
        "X-Api-Key": apiKey,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    return res.json();
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    throw error;
  }
}

export async function submitTestimonial(data: Omit<Testimonial, "id" | "approved" | "sort_order" | "created_at">): Promise<void> {
  const res = await fetch(`${API_URL}/api/testimonials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error ?? "Failed to submit testimonial");
  }
}
