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
    name: "Maroon Vote ",
    description:
      "Mengembangkan aplikasi e-voting berbasis web menggunakan Laravel dan React dengan konsep modern monolith untuk menciptakan sistem pemungutan suara yang aman dan efisien.",
    tech: ["PHP", "JavaScript", "Laravel", "React", "Tailwind CSS", "SQL", "Google Search Console", "SEO"],
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
    name: "Web Developer Intern DISKOMINFO SP Kota Surakarta (SiData) ",
    description:
      "Halaman link-in-bio personal, menampilkan semua tautan penting dalam satu halaman yang bersih.",
    tech: ["HTML", "CSS"],
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
