import ProfileForm from "./ProfileForm";
import type { Profile } from "@/lib/data";

export const dynamic = "force-dynamic";

async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/profile`, { cache: "no-store" });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return { first_name: "", last_name: "", role_badge: "", tagline: "", cv_url: "" };
  }
}

export default async function AdminProfilePage() {
  const profile = await fetchProfile();

  return (
    <div>
      <div className="mb-6">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Profil</h1>
        <p className="mt-0.5 text-xs text-gray-600">Nama, role badge, tagline, dan URL CV</p>
      </div>
      <div className="mb-4 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <ProfileForm initialData={profile} />
    </div>
  );
}
