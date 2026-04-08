"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/app/admin/actions";

export default function DeleteProjectButton({ slug, name }: { slug: string; name: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`Hapus project "${name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    startTransition(async () => {
      await deleteProject(slug);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded border border-red-900/30 px-3 py-1.5 text-sm text-red-700 transition-colors hover:text-red-400 disabled:opacity-50"
    >
      {pending ? "..." : "Hapus"}
    </button>
  );
}
