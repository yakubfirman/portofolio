"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  createSkillItem,
  updateSkillItem,
  deleteSkillItem,
} from "@/app/admin/actions";

type SkillItem = { id: number; name: string; pct: number };
type SkillCategory = {
  id: number;
  label: string;
  icon_key: string;
  icon_bg: string;
  skills: SkillItem[];
};

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/8 rounded px-3 py-2 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-red-800/60 transition-all";

const ICON_OPTIONS = [
  "faCode", "faFileCode", "faWind", "faServer", "faDatabase",
  "faMagnifyingGlass", "faGears", "faWordpress",
];

const BG_OPTIONS = [
  "bg-red-700", "bg-red-800", "bg-red-900",
  "bg-rose-700", "bg-orange-700", "bg-amber-700",
];

// ─── Skill item row ───────────────────────────────────────────────────────────

function SkillItemRow({
  item,
  onSaved,
  onDeleted,
}: {
  item: SkillItem;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(item.name);
  const [pct, setPct] = useState(item.pct);
  const [error, setError] = useState("");

  function handleSave() {
    setError("");
    startTransition(async () => {
      try {
        await updateSkillItem(item.id, { name, pct });
        setEditing(false);
        onSaved();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Hapus skill "${item.name}"?`)) return;
    startTransition(async () => {
      try {
        await deleteSkillItem(item.id);
        onDeleted();
      } catch { /* ignore */ }
    });
  }

  if (editing) {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded bg-black/30 px-3 py-2">
        <input
          className="w-32 rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none focus:border-red-800/60"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama skill"
        />
        <input
          type="number"
          min={0}
          max={100}
          className="w-16 rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none focus:border-red-800/60"
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
        />
        <span className="text-xs text-gray-600">%</span>
        {error && <span className="text-xs text-red-400">{error}</span>}
        <button onClick={handleSave} disabled={pending} className="rounded bg-red-900 px-2 py-1 text-xs text-white hover:bg-red-800 disabled:opacity-50">
          {pending ? "..." : "OK"}
        </button>
        <button onClick={() => setEditing(false)} className="rounded border border-white/8 px-2 py-1 text-xs text-gray-500 hover:text-white">
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded bg-black/20 px-3 py-1.5">
      <div className="flex items-center gap-3">
        <span className="min-w-25 text-sm text-white">{item.name}</span>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-24 rounded-full bg-white/5">
            <div className="h-full rounded-full bg-red-700/70" style={{ width: `${item.pct}%` }} />
          </div>
          <span className="text-xs text-gray-600">{item.pct}%</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => setEditing(true)} className="rounded border border-white/8 px-2 py-0.5 text-xs text-gray-600 hover:text-red-400">
          Edit
        </button>
        <button onClick={handleDelete} disabled={pending} className="rounded border border-white/8 px-2 py-0.5 text-xs text-gray-600 hover:text-red-500 disabled:opacity-50">
          Hapus
        </button>
      </div>
    </div>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  onSaved,
  onDeleted,
}: {
  category: SkillCategory;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editingMeta, setEditingMeta] = useState(false);
  const [pending, startTransition] = useTransition();
  const [label, setLabel] = useState(category.label);
  const [iconKey, setIconKey] = useState(category.icon_key);
  const [iconBg, setIconBg] = useState(category.icon_bg);
  const [error, setError] = useState("");

  // Add skill form
  const [addingItem, setAddingItem] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPct, setNewPct] = useState(80);
  const [itemError, setItemError] = useState("");
  const [itemPending, startItemTransition] = useTransition();

  function handleSaveMeta() {
    setError("");
    startTransition(async () => {
      try {
        await updateSkillCategory(category.id, { label, icon_key: iconKey, icon_bg: iconBg });
        setEditingMeta(false);
        onSaved();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan");
      }
    });
  }

  function handleDeleteCategory() {
    if (!confirm(`Hapus kategori "${category.label}" beserta semua skill-nya?`)) return;
    startTransition(async () => {
      try {
        await deleteSkillCategory(category.id);
        onDeleted();
      } catch { /* ignore */ }
    });
  }

  function handleAddItem() {
    setItemError("");
    startItemTransition(async () => {
      try {
        await createSkillItem(category.id, { name: newName.trim(), pct: newPct });
        setNewName("");
        setNewPct(80);
        setAddingItem(false);
        onSaved();
      } catch (err) {
        setItemError(err instanceof Error ? err.message : "Gagal menambah skill");
      }
    });
  }

  return (
    <div className="rounded border border-white/5 bg-[#0d0d0d]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {editingMeta ? (
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <input
              className="w-28 rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-sm text-white focus:outline-none focus:border-red-800/60"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label"
            />
            <select
              className="rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none"
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
            >
              {ICON_OPTIONS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <select
              className="rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none"
              value={iconBg}
              onChange={(e) => setIconBg(e.target.value)}
            >
              {BG_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            {error && <span className="text-xs text-red-400">{error}</span>}
            <button onClick={handleSaveMeta} disabled={pending} className="rounded bg-red-900 px-2 py-1 text-xs text-white hover:bg-red-800 disabled:opacity-50">
              {pending ? "..." : "Simpan"}
            </button>
            <button onClick={() => setEditingMeta(false)} className="rounded border border-white/8 px-2 py-1 text-xs text-gray-500 hover:text-white">
              Batal
            </button>
          </div>
        ) : (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex flex-1 items-center gap-3 text-left"
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white ${category.icon_bg}`}>
              {category.label.charAt(0)}
            </span>
            <span className="font-medium text-white">{category.label}</span>
            <span className="text-xs text-gray-600">{category.skills.length} skill</span>
            <svg
              className={`ml-auto h-4 w-4 text-gray-600 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}

        {!editingMeta && (
          <div className="ml-2 flex gap-1.5">
            <button
              onClick={() => setEditingMeta(true)}
              className="rounded border border-white/8 px-2.5 py-1 text-xs text-gray-500 hover:text-red-400"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteCategory}
              disabled={pending}
              className="rounded border border-white/8 px-2.5 py-1 text-xs text-gray-600 hover:text-red-500 disabled:opacity-50"
            >
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* Skills list */}
      {expanded && (
        <div className="border-t border-white/5 px-4 py-3">
          <div className="space-y-1.5">
            {category.skills.map((item) => (
              <SkillItemRow
                key={item.id}
                item={item}
                onSaved={onSaved}
                onDeleted={onSaved}
              />
            ))}
          </div>

          {/* Add item form */}
          {addingItem ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded border border-white/8 p-3">
              <input
                className="w-36 rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none focus:border-red-800/60"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nama skill"
              />
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="w-16 rounded border border-white/8 bg-[#0a0a0a] px-2 py-1 text-xs text-white focus:outline-none focus:border-red-800/60"
                  value={newPct}
                  onChange={(e) => setNewPct(Number(e.target.value))}
                />
                <span className="text-xs text-gray-600">%</span>
              </div>
              {itemError && <span className="text-xs text-red-400">{itemError}</span>}
              <button
                onClick={handleAddItem}
                disabled={itemPending || !newName.trim()}
                className="rounded bg-red-900 px-2 py-1 text-xs text-white hover:bg-red-800 disabled:opacity-50"
              >
                {itemPending ? "..." : "Tambah"}
              </button>
              <button onClick={() => setAddingItem(false)} className="rounded border border-white/8 px-2 py-1 text-xs text-gray-500 hover:text-white">
                Batal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingItem(true)}
              className="mt-2 flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tambah Skill
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main manager ─────────────────────────────────────────────────────────────

export default function SkillsManager({ initialCategories }: { initialCategories: SkillCategory[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [addingCat, setAddingCat] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newIconKey, setNewIconKey] = useState("faCode");
  const [newIconBg, setNewIconBg] = useState("bg-red-700");
  const [catError, setCatError] = useState("");
  const [catPending, startCatTransition] = useTransition();
  const router = useRouter();

  function refresh() {
    router.refresh();
  }

  function handleDeletedCat(id: number) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  }

  function handleAddCategory() {
    setCatError("");
    startCatTransition(async () => {
      try {
        await createSkillCategory({ label: newLabel.trim(), icon_key: newIconKey, icon_bg: newIconBg });
        setNewLabel("");
        setNewIconKey("faCode");
        setNewIconBg("bg-red-700");
        setAddingCat(false);
        refresh();
      } catch (err) {
        setCatError(err instanceof Error ? err.message : "Gagal menambah kategori");
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-3">
      {/* Add category */}
      {addingCat ? (
        <div className="rounded border border-red-900/30 bg-[#0d0d0d] p-4">
          <p className="mb-3 text-xs font-semibold text-gray-400">Tambah Kategori Baru</p>
          <div className="flex flex-wrap gap-3">
            <div>
              <p className="mb-1 text-[10px] text-gray-600 uppercase">Label *</p>
              <input className={inputCls} value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Frontend" />
            </div>
            <div>
              <p className="mb-1 text-[10px] text-gray-600 uppercase">Icon</p>
              <select className={inputCls} value={newIconKey} onChange={(e) => setNewIconKey(e.target.value)}>
                {ICON_OPTIONS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <p className="mb-1 text-[10px] text-gray-600 uppercase">Warna Bg</p>
              <select className={inputCls} value={newIconBg} onChange={(e) => setNewIconBg(e.target.value)}>
                {BG_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          {catError && <p className="mt-2 text-xs text-red-400">{catError}</p>}
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAddCategory}
              disabled={catPending || !newLabel.trim()}
              className="rounded bg-red-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {catPending ? "Menambah..." : "Tambah Kategori"}
            </button>
            <button onClick={() => setAddingCat(false)} className="rounded border border-white/8 px-3 py-1.5 text-xs text-gray-500 hover:text-white">
              Batal
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAddingCat(true)}
          className="flex items-center gap-2 rounded bg-red-900 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-red-950/30 transition-all hover:bg-red-800"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Kategori
        </button>
      )}

      {categories.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-600">Belum ada kategori skill.</p>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSaved={refresh}
              onDeleted={() => handleDeletedCat(cat.id)}
            />
          ))}
        </div>
      )}
      <p className="text-[10px] text-gray-700">
        Klik nama kategori untuk expand dan kelola skill di dalamnya.
      </p>
    </div>
  );
}
