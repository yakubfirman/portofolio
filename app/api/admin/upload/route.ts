import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import path from "path";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_CV_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4 MB
const MAX_CV_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  // Auth check — cookie stores AUTH_SECRET (set by the login route)
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || token !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const fileType = formData.get("type") || "image"; // "image" atau "cv"

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  let allowedTypes: string[];
  let maxSize: number;
  let folder: string;
  let errorMessage: string;

  if (fileType === "cv") {
    allowedTypes = ALLOWED_CV_TYPES;
    maxSize = MAX_CV_SIZE;
    folder = "cv";
    errorMessage = "Format file tidak didukung. Gunakan PDF.";
  } else {
    allowedTypes = ALLOWED_IMAGE_TYPES;
    maxSize = MAX_IMAGE_SIZE;
    folder = "projects";
    errorMessage = "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.";
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return NextResponse.json({ error: `Ukuran file maksimal ${maxSizeMB} MB.` }, { status: 400 });
  }

  // Sanitize filename
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const ext = path.extname(originalName).toLowerCase() || (fileType === "cv" ? ".pdf" : ".jpg");
  const basename = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .slice(0, 60);
  const filename = `${folder}/${basename}${ext}`;

  try {
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ path: blob.url });
  } catch (err) {
    console.error("[upload] Vercel Blob error:", err);
    return NextResponse.json(
      { error: "Upload gagal. Pastikan BLOB_READ_WRITE_TOKEN sudah diset di Vercel." },
      { status: 500 }
    );
  }
}
