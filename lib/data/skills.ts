import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICON_MAP } from "@/lib/icon-map";

export type SkillCategory = {
  label: string;
  icon: IconDefinition;
  iconBg: string;
  skills: { name: string; pct: number }[];
};

const API_URL = process.env.API_URL;

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const res = await fetch(`${API_URL}/api/skills`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  const raw = await res.json();
  return raw.categories.map(
    (cat: {
      label: string;
      icon_key: string;
      icon_bg: string;
      skills: { name: string; pct: number }[];
    }) => ({
      label: cat.label,
      icon: ICON_MAP[cat.icon_key],
      iconBg: cat.icon_bg,
      skills: cat.skills,
    })
  );
}
