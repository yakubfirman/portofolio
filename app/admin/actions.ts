"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_SECRET_KEY!;

const authHeaders = {
  "Content-Type": "application/json",
  "X-Api-Key": API_KEY,
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function updateProfile(data: unknown) {
  const res = await fetch(`${API_URL}/api/profile`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate profil");
  }
  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ─── Socials ──────────────────────────────────────────────────────────────────

export async function createSocial(data: unknown) {
  const res = await fetch(`${API_URL}/api/socials`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal membuat sosial media");
  }
  revalidatePath("/");
  revalidatePath("/admin/socials");
}

export async function updateSocial(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/socials/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate sosial media");
  }
  revalidatePath("/");
  revalidatePath("/admin/socials");
}

export async function deleteSocial(id: number) {
  const res = await fetch(`${API_URL}/api/socials/${id}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus sosial media");
  revalidatePath("/");
  revalidatePath("/admin/socials");
}

export async function reorderSocials(order: number[]) {
  const res = await fetch(`${API_URL}/api/socials/reorder`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ order }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menyimpan urutan sosial media");
  revalidatePath("/");
  revalidatePath("/admin/socials");
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export async function createSkillCategory(data: unknown) {
  const res = await fetch(`${API_URL}/api/skills/categories`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal membuat kategori skill");
  }
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkillCategory(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/skills/categories/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate kategori skill");
  }
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillCategory(id: number) {
  const res = await fetch(`${API_URL}/api/skills/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus kategori skill");
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function createSkillItem(categoryId: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/skills/categories/${categoryId}/items`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal menambah skill");
  }
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkillItem(itemId: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/skills/items/${itemId}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate skill");
  }
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillItem(itemId: number) {
  const res = await fetch(`${API_URL}/api/skills/items/${itemId}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus skill");
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// ─── About ────────────────────────────────────────────────────────────────────

export async function updateAbout(data: unknown): Promise<{ error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/about`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      return { error: err.error ?? `Gagal mengupdate about (${res.status})` };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Koneksi ke server gagal" };
  }
  revalidatePath("/");
  revalidatePath("/admin/about");
  return {};
}

export async function updateAboutFull(data: unknown): Promise<{ error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/about/full`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(data),
      cache: "no-store",
    });
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string };
      return { error: err.error ?? `Gagal mengupdate data about (${res.status})` };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Koneksi ke server gagal" };
  }
  revalidatePath("/about");
  revalidatePath("/admin/about");
  return {};
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(data: unknown) {
  const res = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = `HTTP ${res.status}`;
    try {
      msg += ": " + (JSON.parse(text).error ?? text);
    } catch {
      msg += ": " + text;
    }
    throw new Error(msg || "Gagal membuat project");
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

// ─── Reorder ──────────────────────────────────────────────────────────────────

export async function reorderProjects(order: string[]) {
  const res = await fetch(`${API_URL}/api/projects/reorder`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ order }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menyimpan urutan project");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function reorderSpeaking(order: number[]) {
  const res = await fetch(`${API_URL}/api/speaking/reorder`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ order }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menyimpan urutan speaking");
  revalidatePath("/");
  revalidatePath("/admin/speaking");
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function updateTestimonial(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
    method: "PUT",
    headers: authHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? "Gagal mengupdate testimoni");
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: number) {
  const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
    method: "DELETE",
    headers: authHeaders,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menghapus testimoni");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function reorderTestimonials(order: number[]) {
  const res = await fetch(`${API_URL}/api/testimonials/reorder`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ order }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal menyimpan urutan testimoni");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
