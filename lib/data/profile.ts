const API_URL = process.env.API_URL;

export type Profile = {
  first_name: string;
  last_name: string;
  role_badge: string;
  tagline: string;
  cv_url: string;
};

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API_URL}/api/profile`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
