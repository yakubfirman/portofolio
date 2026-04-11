"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSocial, updateSocial, deleteSocial } from "@/app/admin/actions";

type Social = { id: number; label: string; href: string; icon_key: string };

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";

const ICON_OPTIONS = [
  "faGithub",
  "faLinkedinIn",
  "faInstagram",
  "faXTwitter",
  "faTiktok",
  "faFacebook",
  "faYoutube",
];

function SocialRow({
  social,
  onSaved,
  onDeleted,
}: {
  social: Social;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [label, setLabel] = useState(social.label);
  const [href, setHref] = useState(social.href);
  const [iconKey, setIconKey] = useState(social.icon_key);
  const [error, setError] = useState("");

  function handleSave() {
    setError("");
    startTransition(async () => {
      try {
        await updateSocial(social.id, { label, href, icon_key: iconKey });
        setEditing(false);
        onSaved();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Hapus "${social.label}"?`)) return;
    startTransition(async () => {
      try {
        await deleteSocial(social.id);
        onDeleted();
      } catch {
        /* ignore */
      }
    });
  }

  if (editing) {
    return (
      <div className="rounded border border-white/8 bg-[#0d0d0d] p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[10px] text-gray-600 uppercase">Label</p>
            <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div>
            <p className="mb-1 text-[10px] text-gray-600 uppercase">URL</p>
            <input className={inputCls} value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <p className="mb-1 text-[10px] text-gray-600 uppercase">Icon Key</p>
            <select
              className={inputCls}
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
            >
              {ICON_OPTIONS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
              <option value={iconKey}>{iconKey}</option>
            </select>
          </div>
        </div>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            disabled={pending}
            className="rounded bg-red-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-500 hover:text-white"
          >
            Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded border border-white/5 bg-[#0d0d0d] px-4 py-3">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-white">{social.label}</p>
        <p className="max-w-xs truncate text-xs text-gray-600">{social.href}</p>
        <p className="text-[10px] text-gray-700">{social.icon_key}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:border-red-900/40 hover:text-red-400"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-red-900/40 hover:text-red-500 disabled:opacity-50"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

function AddSocialForm({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const [iconKey, setIconKey] = useState("faGithub");
  const [error, setError] = useState("");

  function handleAdd() {
    setError("");
    startTransition(async () => {
      try {
        await createSocial({ label, href, icon_key: iconKey });
        setLabel("");
        setHref("");
        setIconKey("faGithub");
        setOpen(false);
        onAdded();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menambah");
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded bg-red-900 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Tambah Sosial
      </button>
    );
  }

  return (
    <div className="rounded border border-red-900/30 bg-[#0d0d0d] p-4">
      <p className="mb-3 text-xs font-semibold text-gray-400">Tambah Sosial Media Baru</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <p className="mb-1 text-[10px] text-gray-600 uppercase">Label *</p>
          <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="GitHub" />
        </div>
        <div>
          <p className="mb-1 text-[10px] text-gray-600 uppercase">URL *</p>
          <input className={inputCls} value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <p className="mb-1 text-[10px] text-gray-600 uppercase">Icon Key *</p>
          <select className={inputCls} value={iconKey} onChange={(e) => setIconKey(e.target.value)}>
            {ICON_OPTIONS.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleAdd}
          disabled={pending || !label || !href}
          className="rounded bg-red-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Menambah..." : "Tambah"}
        </button>
        <button onClick={() => setOpen(false)} className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-500 hover:text-white">
          Batal
        </button>
      </div>
    </div>
  );
}

export default function SocialsManager({ initialSocials }: { initialSocials: Social[] }) {
  const [socials, setSocials] = useState(initialSocials);
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  function handleDeleted(id: number) {
    setSocials((prev) => prev.filter((s) => s.id !== id));
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-3">
      <AddSocialForm onAdded={refresh} />
      {socials.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-600">Belum ada sosial media.</p>
      ) : (
        <div className="space-y-2">
          {socials.map((s) => (
            <SocialRow
              key={s.id}
              social={s}
              onSaved={refresh}
              onDeleted={() => handleDeleted(s.id)}
            />
          ))}
        </div>
      )}
      <p className="text-[10px] text-gray-700">
        Icon key tersedia: faGithub, faLinkedinIn, faInstagram, faXTwitter, faTiktok. Tambah icon baru di{" "}
        <code className="text-gray-600">lib/icon-map.ts</code>
      </p>
    </div>
  );
}
