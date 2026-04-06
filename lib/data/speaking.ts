export type SpeakingEvent = {
  title: string;
  event: string;
  organizer: string;
  date: string;
  location: string;
  topics: string[];
  url: string;
  audience?: string;
};

export const SPEAKING: SpeakingEvent[] = [
  {
    title: "Pemateri",
    event: "Literasi Media — Darul Arqom Dasar PK IMM Arrazi FK",
    organizer: "PK IMM Arrazi FK UMS",
    date: "2026",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Literasi Media", "Media Digital", "Literasi Informasi"],
    url: "#",
    audience: "Kader IMM FK UMS",
  },
  {
    title: "Pemateri",
    event: 'HIMATIF Portable Club 1 — "Launch Your Web Journey"',
    organizer: "Himpunan Mahasiswa Teknik Informatika UMS (HIMATIF UMS)",
    date: "31 Mei 2025",
    location: "Ruang J Seminar 2, FKI UMS, Surakarta",
    topics: ["HTML & CSS Fundamentals", "Tailwind CSS", "Git & GitHub", "Web Development Workflow"],
    url: "https://www.instagram.com/p/DJ89MGNSymE/",
    audience: "Mahasiswa Teknik Informatika UMS",
  },
  {
    title: "Pemateri",
    event: "Literasi Media — Darul Arqom Dasar PK IMM Moh. Hatta FEB",
    organizer: "PK IMM Moh. Hatta FEB UMS",
    date: "2025",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Literasi Media", "Media Digital", "Literasi Informasi"],
    url: "#",
    audience: "Kader IMM FEB UMS",
  },
  {
    title: "Pemateri",
    event: "Literasi Media — Darul Arqom Dasar PK IMM Moh. Hatta FEB",
    organizer: "PK IMM Moh. Hatta FEB UMS",
    date: "2024",
    location: "Universitas Muhammadiyah Surakarta",
    topics: ["Literasi Media", "Media Digital", "Literasi Informasi"],
    url: "#",
    audience: "Kader IMM FEB UMS",
  },
];
