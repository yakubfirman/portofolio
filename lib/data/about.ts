import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICON_MAP } from "@/lib/icon-map";

export type AboutMeta = { icon: IconDefinition; text: string };
export type AboutEducation = {
  icon: IconDefinition;
  degree: string;
  school: string;
  year: string;
  note: string | null;
};
export type AboutHighlight = { value: string; label: string };

export type AboutData = {
  meta: AboutMeta[];
  education: AboutEducation[];
  highlights: AboutHighlight[];
  focus_tags: string[];
};

const API_URL = process.env.API_URL;

export async function getAbout(): Promise<AboutData> {
  const res = await fetch(`${API_URL}/api/about`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch about data");
  const raw = await res.json();
  return {
    meta: raw.meta.map((m: { icon_key: string; text: string }) => ({
      icon: ICON_MAP[m.icon_key],
      text: m.text,
    })),
    education: raw.education.map(
      (e: {
        icon_key: string;
        degree: string;
        school: string;
        year: string;
        note: string | null;
      }) => ({
        icon: ICON_MAP[e.icon_key],
        degree: e.degree,
        school: e.school,
        year: e.year,
        note: e.note,
      })
    ),
    highlights: raw.highlights,
    focus_tags: raw.focus_tags,
  };
}
