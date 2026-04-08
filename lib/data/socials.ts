import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICON_MAP } from "@/lib/icon-map";

export type Social = {
  label: string;
  href: string;
  icon: IconDefinition;
};

const API_URL = process.env.API_URL;

export async function getSocials(): Promise<Social[]> {
  const res = await fetch(`${API_URL}/api/socials`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch socials");
  const raw = await res.json();
  return raw.map((s: { label: string; href: string; icon_key: string }) => ({
    label: s.label,
    href: s.href,
    icon: ICON_MAP[s.icon_key],
  }));
}
