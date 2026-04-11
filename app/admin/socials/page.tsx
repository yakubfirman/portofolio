import SocialsManager from "./SocialsManager";

export const dynamic = "force-dynamic";

type SocialRaw = { id: number; label: string; href: string; icon_key: string };

async function fetchSocials(): Promise<SocialRaw[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/socials`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function AdminSocialsPage() {
  const socials = await fetchSocials();

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Sosial Media</h1>
        <p className="mt-0.5 text-xs text-gray-600">{socials.length} link terdaftar</p>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <SocialsManager initialSocials={socials} />
    </div>
  );
}
