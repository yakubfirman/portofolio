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
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
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
    description:
      "Mengembangkan aplikasi e-voting berbasis web menggunakan Laravel dan React dengan konsep modern monolith untuk menciptakan sistem pemungutan suara yang aman dan efisien.",
    tech: ["Laravel", "React", "Tailwind CSS", "SQL", "Google Search Console", "SEO"],
    url: "https://maroonvote.immsolo.or.id",
  },
  {
    name: "Website PC IMM Kota Surakarta",
    description:
      "Membangun website resmi untuk PC IMM Kota Surakarta menggunakan Next.js dan Tailwind CSS, menampilkan informasi organisasi, kegiatan, dan berita terkini dengan desain responsif dan modern.",
    tech: ["WordPress", "Elementor", "Google Search Console", "Yoast SEO"],
    url: "https://immsolo.or.id",
  },
  {
    name: "Website Perkaderan PC IMM Kota Surakarta",
    description:
      "Sistem absensi berbasis web menggunakan Laravel/Blade, dibangun untuk memudahkan pencatatan kehadiran.",
    tech: ["Google Search Console", "Yoast SEO", "SEO"],
    url: "https://github.com/yakubfirman/presensi",
  },
  {
    name: "Web Developer Intern DISKOMINFO SP Kota Surakarta (SiData)",
    description:
      "Halaman link-in-bio personal, menampilkan semua tautan penting dalam satu halaman yang bersih.",
    tech: ["Laravel", "Tailwind CSS", "Github"],
    url: "https://github.com/yakubfirman/links",
  },
  {
    name: "Pemateri Workshop HIMATIF PORTABLE CLUB HIMATIF UMS",
    description:
      "Berbagi wawasan teknis mengenai arsitektur web modern serta mendemonstrasikan praktik pengembangan web yang efisien kepada mahasiswa untuk meningkatkan kompetensi teknis.",
    tech: ["HTML","CSS3", "Tailwind CSS", "Github"],
    url: "https://www.instagram.com/p/DJ89MGNSymE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];
