import Link from "next/link";
import SpeakingForm from "../SpeakingForm";

export default function NewSpeakingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/speaking"
          className="mb-3 inline-flex items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-gray-400"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Kembali ke Speaking
        </Link>
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-red-500/70 uppercase">
          Admin · Speaking
        </p>
        <h1 className="text-xl font-bold text-white sm:text-2xl">Tambah Speaking Event</h1>
      </div>
      <div className="mb-6 h-px bg-linear-to-r from-red-900/20 via-white/5 to-transparent" />
      <SpeakingForm />
    </div>
  );
}
