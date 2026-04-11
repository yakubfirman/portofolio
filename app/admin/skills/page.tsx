import SkillsManager from "./SkillsManager";

export const dynamic = "force-dynamic";

type SkillItem = { id: number; name: string; pct: number };
type SkillCategory = {
  id: number;
  label: string;
  icon_key: string;
  icon_bg: string;
  skills: SkillItem[];
};

async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/skills`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories ?? [];
  } catch {
    return [];
  }
}

export default async function AdminSkillsPage() {
  const categories = await fetchSkills();

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Skills</h1>
        <p className="mt-0.5 text-xs text-gray-600">{categories.length} kategori</p>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <SkillsManager initialCategories={categories} />
    </div>
  );
}
