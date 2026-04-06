import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLocationDot,
  faCircleCheck,
  faCode,
  faFileCode,
  faWind,
  faServer,
  faDatabase,
  faMagnifyingGlass,
  faGears,
  faToolbox,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faPhp,
  faPython,
  faGitAlt,
  faGithub,
  faWordpress,
  faLinkedinIn,
  faInstagram,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export const SKILLS: { name: string; icon: IconDefinition }[] = [
  { name: "HTML5", icon: faHtml5 },
  { name: "CSS3", icon: faCss3Alt },
  { name: "JavaScript", icon: faJs },
  { name: "TypeScript", icon: faFileCode },
  { name: "React", icon: faReact },
  { name: "Next.js", icon: faCode },
  { name: "Tailwind CSS", icon: faWind },
  { name: "PHP", icon: faPhp },
  { name: "Laravel", icon: faServer },
  { name: "Python", icon: faPython },
  { name: "MySQL", icon: faDatabase },
  { name: "Git", icon: faGitAlt },
];

export const SKILL_CATEGORIES: {
  label: string;
  icon: IconDefinition;
  iconBg: string;
  skills: { name: string; pct: number }[];
}[] = [
  {
    label: "Frontend",
    icon: faCode,
    iconBg: "bg-red-700",
    skills: [
      { name: "HTML5", pct: 92 },
      { name: "CSS3", pct: 88 },
      { name: "JavaScript", pct: 85 },
      { name: "TypeScript", pct: 78 },
      { name: "React", pct: 85 },
      { name: "Next.js", pct: 82 },
      { name: "Tailwind CSS", pct: 90 },
    ],
  },
  {
    label: "Backend",
    icon: faServer,
    iconBg: "bg-red-800",
    skills: [
      { name: "PHP", pct: 82 },
      { name: "Laravel", pct: 85 },
      { name: "Python", pct: 70 },
      { name: "REST API", pct: 80 },
    ],
  },
  {
    label: "Database",
    icon: faDatabase,
    iconBg: "bg-red-900",
    skills: [
      { name: "MySQL", pct: 82 },
      { name: "SQL Query", pct: 85 },
      { name: "phpMyAdmin", pct: 80 },
    ],
  },
  {
    label: "SEO",
    icon: faMagnifyingGlass,
    iconBg: "bg-red-700",
    skills: [
      { name: "On-Page SEO", pct: 90 },
      { name: "Technical SEO", pct: 82 },
      { name: "Google Search Console", pct: 88 },
      { name: "Yoast SEO", pct: 85 },
    ],
  },
  {
    label: "Tools",
    icon: faGears,
    iconBg: "bg-red-800",
    skills: [
      { name: "Git / GitHub", pct: 88 },
      { name: "VS Code", pct: 92 },
      { name: "Figma", pct: 72 },
      { name: "Vercel", pct: 80 },
    ],
  },
  {
    label: "CMS",
    icon: faWordpress,
    iconBg: "bg-red-900",
    skills: [
      { name: "WordPress", pct: 85 },
      { name: "Elementor", pct: 82 },
      { name: "Page Builder", pct: 80 },
    ],
  },
];

export const ABOUT_STATS: { label: string; value: string; icon: IconDefinition }[] = [
  { label: "Lokasi", value: "Surakarta, Solo", icon: faLocationDot },
  { label: "Status", value: "Open to Work", icon: faCircleCheck },
  { label: "Pengalaman", value: "2+ Tahun", icon: faCode },
  { label: "Repository", value: "14 Proyek", icon: faServer },
];

export const SOCIALS: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "GitHub", href: "https://github.com/yakubfirman", icon: faGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/Yakub-Firman-Mustofa", icon: faLinkedinIn },
  { label: "Instagram", href: "https://instagram.com/f.firman5", icon: faInstagram },
  { label: "Twitter / X", href: "https://twitter.com/f_firman5", icon: faXTwitter },
  { label: "TikTok", href: "https://www.tiktok.com/@f.firman5", icon: faTiktok },
];

export const PROJECTS = [
  {
    name: "Maroon Vote",
    slug: "maroon-vote",
    description:
      "Mengembangkan aplikasi e-voting berbasis web menggunakan Laravel dan React dengan konsep modern monolith untuk menciptakan sistem pemungutan suara yang aman dan efisien.",
    tech: ["Laravel", "React", "Tailwind CSS", "SQL", "Google Search Console", "SEO"],
    url: "https://maroonvote.immsolo.or.id",
    image: "/projects/maroon-vote.png",
    details: {
      role: "Full Stack Developer",
      overview:
        "Maroon Vote adalah aplikasi e-voting berbasis web yang dikembangkan untuk mendukung proses pemungutan suara organisasi secara digital. Dibangun dengan konsep modern monolith menggunakan Laravel sebagai backend dan React sebagai frontend, aplikasi ini dirancang untuk menjamin keamanan, transparansi, dan kemudahan penggunaan dalam proses demokrasi organisasi.",
      contributions: [
        "Merancang dan mengimplementasikan arsitektur modern monolith menggunakan Laravel sebagai backend REST API dan React sebagai frontend SPA.",
        "Membangun sistem autentikasi berbasis token untuk memastikan hanya pemilih yang berhak dapat mengakses dan memberikan suara.",
        "Mengintegrasikan database MySQL untuk penyimpanan data kandidat, daftar pemilih, dan rekap hasil suara secara real-time.",
        "Membangun antarmuka pengguna yang responsif dan intuitif menggunakan Tailwind CSS agar mudah digunakan di berbagai perangkat.",
        "Melakukan optimasi SEO teknis pada halaman publik dan mendaftarkan ke Google Search Console untuk monitoring performa.",
      ],
    },
  },
  {
    name: "Website PC IMM Kota Surakarta",
    slug: "imm-solo",
    description:
      "Membangun website resmi untuk PC IMM Kota Surakarta menggunakan WordPress dan Elementor, menampilkan informasi organisasi, kegiatan, dan berita terkini dengan desain responsif dan modern.",
    tech: ["WordPress", "Elementor", "Google Search Console", "Yoast SEO"],
    url: "https://immsolo.or.id",
    image: "/projects/imm-solo.png",
    details: {
      role: "WordPress Developer & SEO Specialist",
      overview:
        "Website resmi PC IMM (Pimpinan Cabang Ikatan Mahasiswa Muhammadiyah) Kota Surakarta dibangun untuk menjadi pusat informasi organisasi secara digital. Platform ini menampilkan profil organisasi, agenda kegiatan, berita terkini, dan informasi penting lainnya dengan tampilan yang profesional dan mudah dikelola oleh pengurus.",
      contributions: [
        "Membangun dan mengkonfigurasi website organisasi menggunakan CMS WordPress dengan tema yang sesuai identitas organisasi.",
        "Menyesuaikan tampilan halaman menggunakan Elementor Page Builder untuk menciptakan layout yang profesional dan informatif.",
        "Menerapkan strategi SEO on-page komprehensif menggunakan plugin Yoast SEO termasuk optimasi meta tag, struktur heading, dan sitemap XML.",
        "Mendaftarkan dan mengelola properti website di Google Search Console untuk monitoring performa pencarian organik dan indeksasi konten.",
        "Memastikan website responsif, cepat diakses, dan ramah pengguna di berbagai perangkat termasuk mobile.",
      ],
    },
  },
  {
    name: "Website Perkaderan PC IMM Kota Surakarta",
    slug: "perkaderan-imm",
    description:
      "Mengelola dan mengoptimalkan website perkaderan PC IMM Kota Surakarta dengan fokus pada peningkatan visibilitas di mesin pencari melalui strategi SEO teknis dan on-page.",
    tech: ["Google Search Console", "Yoast SEO", "SEO"],
    url: "https://perkaderan.immsolo.or.id",
    image: "/projects/perkaderan-imm.png",
    details: {
      role: "SEO Specialist",
      overview:
        "Website Perkaderan PC IMM Kota Surakarta adalah platform digital yang menampilkan informasi dan program kaderisasi organisasi. Fokus utama pekerjaan di proyek ini adalah meningkatkan visibilitas website di hasil pencarian Google sehingga informasi perkaderan dapat lebih mudah ditemukan oleh mahasiswa yang membutuhkan.",
      contributions: [
        "Melakukan audit SEO menyeluruh untuk mengidentifikasi kelemahan teknis dan peluang optimasi pada website.",
        "Menerapkan optimasi on-page menggunakan Yoast SEO mencakup meta title, meta description, canonical tag, dan struktur konten yang teroptimasi.",
        "Mendaftarkan dan mengelola website di Google Search Console untuk memantau performa pencarian, crawl errors, dan coverage indeksasi.",
        "Membangun strategi internal linking yang kuat antar halaman untuk meningkatkan distribusi otoritas halaman.",
        "Memonitor dan melaporkan perkembangan peringkat kata kunci target secara berkala menggunakan data dari Google Search Console.",
      ],
    },
  },
  {
    name: "Web Developer Intern — SiData DISKOMINFO SP Kota Surakarta",
    slug: "sidata",
    description:
      "Menjalankan program magang sebagai Web Developer di Dinas Komunikasi, Informatika, Statistik dan Persandian (DISKOMINFO SP) Kota Surakarta, berkontribusi pada pengembangan aplikasi SiData menggunakan Laravel dan Tailwind CSS.",
    tech: ["Laravel", "Tailwind CSS", "Github"],
    url: "https://github.com/yakubfirman",
    image: "/projects/sidata.png",
    details: {
      role: "Web Developer Intern",
      overview:
        "Program magang di Dinas Komunikasi, Informatika, Statistik dan Persandian (DISKOMINFO SP) Kota Surakarta memberikan pengalaman nyata dalam pengembangan perangkat lunak instansi pemerintah. Selama magang, berkontribusi pada pengembangan aplikasi SiData — sistem informasi data yang digunakan untuk pengelolaan data statistik kota Surakarta.",
      contributions: [
        "Mengembangkan fitur-fitur baru pada aplikasi SiData menggunakan framework Laravel dengan pendekatan arsitektur MVC.",
        "Membangun komponen antarmuka yang responsif dan modern menggunakan Tailwind CSS sesuai standar desain instansi.",
        "Mengelola versi kode menggunakan Git dan berkolaborasi dengan tim pengembang melalui platform GitHub.",
        "Melakukan debugging dan perbaikan bug pada modul-modul yang telah ada untuk meningkatkan stabilitas aplikasi.",
        "Berkoordinasi dengan tim teknis dan stakeholder untuk memahami kebutuhan pengguna dan menerjemahkannya ke dalam fitur aplikasi.",
      ],
    },
  },
  {
    name: "Pemateri Workshop HIMATIF PORTABLE CLUB HIMATIF UMS",
    slug: "workshop-himatif",
    description:
      "Berbagi wawasan teknis mengenai arsitektur web modern serta mendemonstrasikan praktik pengembangan web yang efisien kepada mahasiswa untuk meningkatkan kompetensi teknis.",
    tech: ["HTML", "CSS3", "Tailwind CSS", "Github"],
    url: "https://www.instagram.com/p/DJ89MGNSymE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    image: "/projects/workshop-himatif.png",
    details: {
      role: "Speaker & Instructor",
      overview:
        "Workshop Portable Club HIMATIF UMS adalah kegiatan pengembangan kompetensi yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Muhammadiyah Surakarta. Saya diundang sebagai pemateri untuk berbagi pengalaman dan pengetahuan tentang pengembangan web modern kepada mahasiswa teknik informatika.",
      contributions: [
        "Menyiapkan materi workshop yang komprehensif mencakup dasar-dasar HTML, CSS3, dan pengenalan Tailwind CSS sebagai framework styling modern.",
        "Mendemonstrasikan cara membangun halaman web responsif secara live coding di hadapan peserta workshop.",
        "Menjelaskan konsep version control menggunakan Git dan workflow kolaborasi tim menggunakan GitHub.",
        "Membimbing peserta dalam sesi hands-on praktik langsung untuk membangun proyek web sederhana dari nol.",
        "Menjawab pertanyaan dan memberikan insight mengenai dunia industri web development kepada mahasiswa.",
      ],
    },
  },
];
