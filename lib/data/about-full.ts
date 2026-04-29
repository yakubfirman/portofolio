import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ICON_MAP } from "@/lib/icon-map";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AboutMeta = { icon: IconDefinition; icon_key: string; text: string };
export type AboutEducation = {
  icon: IconDefinition;
  degree: string;
  school: string;
  year: string;
  note: string | null;
};
export type AboutHighlight = { value: string; label: string };

export type AboutExperience = {
  company: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
  employment_type: string;
};

export type AboutOrganization = {
  name: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
};

export type AboutCertificate = {
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
};

export type AboutFullData = {
  birthdate: string | null;
  meta: AboutMeta[];
  education: AboutEducation[];
  highlights: AboutHighlight[];
  experiences: AboutExperience[];
  organizations: AboutOrganization[];
  certificates: AboutCertificate[];
};

// ─── Fetcher ──────────────────────────────────────────────────────────────────

const API_URL = process.env.API_URL || "https://yakubfirman.pythonanywhere.com";

const FALLBACK: AboutFullData = {
  birthdate: null,
  meta: [],
  education: [],
  highlights: [],
  experiences: [],
  organizations: [],
  certificates: [],
};

export async function getAboutFull(): Promise<AboutFullData> {
  try {
    const res = await fetch(`${API_URL}/api/about/full`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;
    const raw = await res.json();
    return {
      birthdate: raw.birthdate ?? null,
      meta: (raw.meta ?? []).map((m: { icon_key: string; text: string }) => ({
        icon: ICON_MAP[m.icon_key],
        icon_key: m.icon_key,
        text: m.text,
      })),
      education: (raw.education ?? []).map(
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
      highlights: raw.highlights ?? [],
      experiences: raw.experiences ?? [],
      organizations: raw.organizations ?? [],
      certificates: raw.certificates ?? [],
    };
  } catch {
    return FALLBACK;
  }
}
