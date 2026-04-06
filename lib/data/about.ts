import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faBriefcase,
  faGraduationCap,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

export const ABOUT_META: { icon: IconDefinition; text: string }[] = [
  { icon: faLocationDot, text: "Surakarta, Jawa Tengah" },
  { icon: faBriefcase, text: "2+ Tahun Freelance" },
];

export const ABOUT_EDUCATION: {
  icon: IconDefinition;
  degree: string;
  school: string;
  year: string;
  note: string | null;
}[] = [
  {
    icon: faGraduationCap,
    degree: "S1 Teknik Informatika",
    school: "Universitas Muhammadiyah Surakarta",
    year: "2026",
    note: "IPK 3.63",
  },
  {
    icon: faSchool,
    degree: "Teknik Komputer dan Jaringan",
    school: "SMK Negeri 1 Tuban",
    year: "2021",
    note: null,
  },
];

export const ABOUT_HIGHLIGHTS: { value: string; label: string }[] = [
  { value: "2+", label: "Tahun\nPengalaman" },
  { value: "14+", label: "Proyek\nSelesai" },
  { value: "100%", label: "Klien\nPuas" },
];

export const ABOUT_FOCUS_TAGS: string[] = [
  "React / Next.js",
  "Laravel",
  "Tailwind CSS",
  "SEO & GSC",
  "WordPress",
];
