const API_URL = process.env.API_URL || "https://yakubfirman.pythonanywhere.com";

export type Profile = {
  first_name: string;
  last_name: string;
  role_badge: string;
  tagline: string;
  cv_url: string;
};

const DEFAULT_PROFILE: Profile = {
  first_name: "Yakub Firman",
  last_name: "Mustofa",
  role_badge: "Full Stack Web Dev · SEO Specialist",
  tagline:
    "Saya seorang Fullstack Web Developer dan SEO Specialist yang berfokus pada performa, desain, dan hasil nyata.",
  cv_url: "/resumefirman.pdf",
};

export async function getProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_URL}/api/profile`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return DEFAULT_PROFILE;
    return res.json();
  } catch {
    return DEFAULT_PROFILE;
  }
}
