"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAboutFull } from "@/app/admin/actions";

type Experience = {
  company: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
  employment_type: string;
};

type Organization = {
  name: string;
  role: string;
  period_start: string;
  period_end: string | null;
  description: string | null;
};

type Certificate = {
  name: string;
  issuer: string;
  issued_date: string;
  credential_url: string | null;
};

type FullData = {
  birthdate: string | null;
  experiences: Experience[];
  organizations: Organization[];
  certificates: Certificate[];
};

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";
const labelCls =
  "block text-[11px] font-medium text-gray-500 mb-1 tracking-wide uppercase";
const sectionTitle = "text-sm font-semibold text-gray-300 mb-3";

const EMPLOYMENT_TYPES = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Magang" },
  { value: "contract", label: "Kontrak" },
];

const EMPTY_EXP: Experience = {
  company: "",
  role: "",
  period_start: "",
  period_end: null,
  description: null,
  employment_type: "fulltime",
};
const EMPTY_ORG: Organization = {
  name: "",
  role: "",
  period_start: "",
  period_end: null,
  description: null,
};
const EMPTY_CERT: Certificate = {
  name: "",
  issuer: "",
  issued_date: "",
  credential_url: null,
};

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      {label}
    </button>
  );
}

export default function AboutFullForm({ initialData }: { initialData: FullData }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [birthdate, setBirthdate] = useState(initialData.birthdate ?? "");
  const [experiences, setExperiences] = useState<Experience[]>(initialData.experiences);
  const [organizations, setOrganizations] = useState<Organization[]>(initialData.organizations);
  const [certificates, setCertificates] = useState<Certificate[]>(initialData.certificates);

  // ── Experiences ────────────────────────────────────────────────────────────
  function setExpField<K extends keyof Experience>(i: number, field: K, value: Experience[K]) {
    setExperiences((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: value } : e)));
  }

  // ── Organizations ──────────────────────────────────────────────────────────
  function setOrgField<K extends keyof Organization>(i: number, field: K, value: Organization[K]) {
    setOrganizations((prev) => prev.map((o, idx) => (idx === i ? { ...o, [field]: value } : o)));
  }

  // ── Certificates ───────────────────────────────────────────────────────────
  function setCertField<K extends keyof Certificate>(i: number, field: K, value: Certificate[K]) {
    setCertificates((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        await updateAboutFull({
          birthdate: birthdate || null,
          experiences,
          organizations,
          certificates,
        });
        setSuccess(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">

      {/* ── Tanggal Lahir ── */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Informasi Pribadi</p>
        <div>
          <label className={labelCls}>Tanggal Lahir</label>
          <input
            type="date"
            className={inputCls}
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
          <p className="mt-1 text-[11px] text-gray-700">
            Usia akan dihitung otomatis berdasarkan tanggal lahir ini.
          </p>
        </div>
      </div>

      {/* ── Pengalaman Kerja ── */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Pengalaman Kerja</p>
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div key={i} className="rounded border border-white/5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => setExperiences((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-gray-700 hover:text-red-500 transition-colors"
                >
                  Hapus
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Perusahaan</label>
                  <input className={inputCls} value={exp.company} onChange={(e) => setExpField(i, "company", e.target.value)} placeholder="PT Contoh Indonesia" />
                </div>
                <div>
                  <label className={labelCls}>Jabatan / Role</label>
                  <input className={inputCls} value={exp.role} onChange={(e) => setExpField(i, "role", e.target.value)} placeholder="Full Stack Developer" />
                </div>
                <div>
                  <label className={labelCls}>Mulai</label>
                  <input className={inputCls} value={exp.period_start} onChange={(e) => setExpField(i, "period_start", e.target.value)} placeholder="Jan 2023" />
                </div>
                <div>
                  <label className={labelCls}>Selesai (kosongkan jika masih)</label>
                  <input className={inputCls} value={exp.period_end ?? ""} onChange={(e) => setExpField(i, "period_end", e.target.value || null)} placeholder="Des 2023" />
                </div>
                <div>
                  <label className={labelCls}>Tipe Pekerjaan</label>
                  <select className={inputCls} value={exp.employment_type} onChange={(e) => setExpField(i, "employment_type", e.target.value)}>
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Deskripsi (opsional)</label>
                  <textarea
                    className={`${inputCls} min-h-[70px] resize-y`}
                    value={exp.description ?? ""}
                    onChange={(e) => setExpField(i, "description", e.target.value || null)}
                    placeholder="Deskripsi pekerjaan..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => setExperiences((p) => [...p, { ...EMPTY_EXP }])} label="Tambah pengalaman" />
      </div>

      {/* ── Riwayat Organisasi ── */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Riwayat Organisasi</p>
        <div className="space-y-4">
          {organizations.map((org, i) => (
            <div key={i} className="rounded border border-white/5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => setOrganizations((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-gray-700 hover:text-red-500 transition-colors"
                >
                  Hapus
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nama Organisasi</label>
                  <input className={inputCls} value={org.name} onChange={(e) => setOrgField(i, "name", e.target.value)} placeholder="Himpunan Mahasiswa Informatika" />
                </div>
                <div>
                  <label className={labelCls}>Jabatan / Role</label>
                  <input className={inputCls} value={org.role} onChange={(e) => setOrgField(i, "role", e.target.value)} placeholder="Ketua Divisi IT" />
                </div>
                <div>
                  <label className={labelCls}>Mulai</label>
                  <input className={inputCls} value={org.period_start} onChange={(e) => setOrgField(i, "period_start", e.target.value)} placeholder="2022" />
                </div>
                <div>
                  <label className={labelCls}>Selesai (kosongkan jika masih)</label>
                  <input className={inputCls} value={org.period_end ?? ""} onChange={(e) => setOrgField(i, "period_end", e.target.value || null)} placeholder="2023" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Deskripsi (opsional)</label>
                  <textarea
                    className={`${inputCls} min-h-[70px] resize-y`}
                    value={org.description ?? ""}
                    onChange={(e) => setOrgField(i, "description", e.target.value || null)}
                    placeholder="Deskripsi peran di organisasi..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => setOrganizations((p) => [...p, { ...EMPTY_ORG }])} label="Tambah organisasi" />
      </div>

      {/* ── Sertifikat ── */}
      <div className="rounded border border-white/5 bg-[#0d0d0d] p-4 sm:p-5">
        <p className={sectionTitle}>Sertifikat</p>
        <div className="space-y-4">
          {certificates.map((cert, i) => (
            <div key={i} className="rounded border border-white/5 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">#{i + 1}</span>
                <button
                  type="button"
                  onClick={() => setCertificates((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-xs text-gray-700 hover:text-red-500 transition-colors"
                >
                  Hapus
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Nama Sertifikat</label>
                  <input className={inputCls} value={cert.name} onChange={(e) => setCertField(i, "name", e.target.value)} placeholder="Google Analytics Certification" />
                </div>
                <div>
                  <label className={labelCls}>Penerbit</label>
                  <input className={inputCls} value={cert.issuer} onChange={(e) => setCertField(i, "issuer", e.target.value)} placeholder="Google" />
                </div>
                <div>
                  <label className={labelCls}>Tanggal Dikeluarkan</label>
                  <input className={inputCls} value={cert.issued_date} onChange={(e) => setCertField(i, "issued_date", e.target.value)} placeholder="Jan 2024" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>URL Credential (opsional)</label>
                  <input className={inputCls} value={cert.credential_url ?? ""} onChange={(e) => setCertField(i, "credential_url", e.target.value || null)} placeholder="https://..." />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => setCertificates((p) => [...p, { ...EMPTY_CERT }])} label="Tambah sertifikat" />
      </div>

      {/* ── Submit ── */}
      {error && (
        <p className="rounded border border-red-900/40 bg-red-950/20 px-3 py-2 text-xs text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded border border-green-900/40 bg-green-950/20 px-3 py-2 text-xs text-green-400">
          Data berhasil disimpan.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-red-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
