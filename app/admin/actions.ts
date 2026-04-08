"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_SECRET_KEY!;

const authHeaders = {
  "Content-Type": "application/json",
  "X-Api-Key": API_KEY,
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(data: unknown) {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal membuat project");
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function updateProject(slug: string, data: unknown) {
  const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate project");
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
}

export async function deleteProject(slug: string) {
  const res = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus project");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

// ─── Speaking ─────────────────────────────────────────────────────────────────

export async function createSpeaking(data: unknown) {
  const res = await fetch(`${API_URL}/api/speaking`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal membuat speaking event");
  }
  revalidatePath("/");
  revalidatePath("/admin/speaking");
}

export async function updateSpeaking(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/speaking/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate speaking event");
  }
  revalidatePath("/");
  revalidatePath("/admin/speaking");
}

export async function deleteSpeaking(id: number) {
  const res = await fetch(`${API_URL}/api/speaking/${id}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus speaking event");
  revalidatePath("/");
  revalidatePath("/admin/speaking");
}
