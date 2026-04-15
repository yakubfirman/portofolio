const API_URL = process.env.API_URL || "https://yakubfirman.pythonanywhere.com";

export type SpeakingEvent = {
  id?: number;
  title: string;
  event: string;
  organizer: string;
  date: string;
  location: string;
  topics: string[];
  url: string;
  audience?: string;
};

export async function getSpeaking(): Promise<SpeakingEvent[]> {
  const res = await fetch(`${API_URL}/api/speaking`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch speaking events");
  return res.json();
}
