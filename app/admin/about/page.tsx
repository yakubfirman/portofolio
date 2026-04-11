import AboutForm from "./AboutForm";

export const dynamic = "force-dynamic";

type AboutData = {
  meta: { icon_key: string; text: string }[];
  education: { icon_key: string; degree: string; school: string; year: string; note: string | null }[];
  highlights: { value: string; label: string }[];
  focus_tags: string[];
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

export default async function AdminAboutPage() {
  const about = await fetchAbout();

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">About</h1>
        <p className="mt-0.5 text-xs text-gray-600">Info, pendidikan, highlight, dan teknologi fokus</p>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <AboutForm initialData={about} />
    </div>
  );
}
