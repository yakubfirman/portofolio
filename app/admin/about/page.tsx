import AboutForm from "./AboutForm";
import AboutFullForm from "./AboutFullForm";

export const dynamic = "force-dynamic";

type AboutData = {
  meta: { icon_key: string; text: string }[];
  education: { icon_key: string; degree: string; school: string; year: string; note: string | null }[];
  highlights: { value: string; label: string }[];
  focus_tags: string[];
};

type FullData = {
  birthdate: string | null;
  experiences: {
    company: string;
    role: string;
    period_start: string;
    period_end: string | null;
    description: string | null;
    employment_type: string;
  }[];
  organizations: {
    name: string;
    role: string;
    period_start: string;
    period_end: string | null;
    description: string | null;
  }[];
  certificates: {
    name: string;
    issuer: string;
    issued_date: string;
    credential_url: string | null;
  }[];
};

async function fetchAbout(): Promise<AboutData> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/about`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return { meta: [], education: [], highlights: [], focus_tags: [] };
  }
}

async function fetchAboutFull(): Promise<FullData> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/about/full`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    const raw = await res.json();
    return {
      birthdate: raw.birthdate ?? null,
      experiences: raw.experiences ?? [],
      organizations: raw.organizations ?? [],
      certificates: raw.certificates ?? [],
    };
  } catch {
    return { birthdate: null, experiences: [], organizations: [], certificates: [] };
  }
}

export default async function AdminAboutPage() {
  const [about, full] = await Promise.all([fetchAbout(), fetchAboutFull()]);

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">About</h1>
        <p className="mt-0.5 text-xs text-gray-600">
          Info, pendidikan, highlight, pengalaman kerja, organisasi, dan sertifikat
        </p>
      </div>
      <div className="mb-6 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />

      {/* Section 1: Bio, meta, education, highlights */}
      <div className="mb-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          — Info Dasar & Pendidikan
        </p>
        <AboutForm initialData={about} />
      </div>

      <div className="mb-6 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />

      {/* Section 2: Experience, organizations, certificates, birthdate */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          — Pengalaman, Organisasi & Sertifikat
        </p>
        <AboutFullForm initialData={full} />
      </div>
    </div>
  );
}
