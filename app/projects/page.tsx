import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Proyek — Yakub Firman Mustofa",
  description:
    "Kumpulan proyek web yang telah dikerjakan oleh Yakub Firman Mustofa — mulai dari aplikasi e-voting, website organisasi, hingga magang di instansi pemerintah.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* ── Global decorative background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute -top-48 -left-48 h-175 w-175 rounded-full bg-red-900/12 blur-[220px]" />
        <div className="absolute top-[20%] -right-36 h-137.5 w-137.5 rounded-full bg-red-800/8 blur-[180px]" />
        <div className="absolute bottom-[20%] -left-24 h-125 w-125 rounded-full bg-red-950/14 blur-[180px]" />
        <div className="absolute right-[15%] -bottom-32 h-112.5 w-112.5 rounded-full bg-red-900/10 blur-[160px]" />
        <div className="absolute top-0 left-1/2 h-62.5 w-200 -translate-x-1/2 rounded-full bg-red-800/7 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(10,10,10,0.75) 100%)",
          }}
        />
      </div>

      <Navbar />

      <main className="relative z-10 px-5 pt-28 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {/* ── Page header ── */}
          <div className="hero-animate hero-delay-2">
            <SectionHeading tag="Portfolio" title="Semua Proyek" />
            <p className="-mt-8 mb-12 max-w-xl text-sm leading-relaxed text-gray-500 sm:mb-16">
              Kumpulan proyek yang telah saya kerjakan — dari pengembangan aplikasi web, pembuatan
              website organisasi, hingga pengalaman magang di instansi pemerintah.
            </p>
          </div>

          {/* ── Projects grid ── */}
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] transition-all duration-300 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/30">
                  {/* Glow accent */}
                  <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-red-900/10 blur-[50px]" />

                  {/* ── Screenshot ── */}
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`Lihat detail proyek ${project.name}`}
                    className="relative block aspect-video w-full overflow-hidden bg-[#0a0202]"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`Screenshot ${project.name}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-5xl font-black text-red-900/20 select-none">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#0d0404] to-transparent" />
                  </Link>

                  {/* ── Content ── */}
                  <div className="relative flex flex-1 flex-col p-5">
                    {/* Role badge */}
                    <div className="mb-2 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faBriefcase} className="h-2.5 w-2.5 text-red-700" />
                      <span className="text-[10px] font-semibold tracking-wider text-red-700/80 uppercase">
                        {project.details.role}
                      </span>
                    </div>

                    <h2 className="mb-3 line-clamp-2 leading-snug font-bold text-white">
                      {project.name}
                    </h2>

                    {/* Tech tags */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-xs bg-red-950/50 px-2 py-0.5 font-mono text-[10px] text-red-500/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* ── Action buttons ── */}
                    <div className="mt-auto flex gap-2 border-t border-red-900/15 pt-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xs border border-red-800/50 bg-red-950/30 px-3 py-2 text-xs font-semibold text-gray-300 transition-all hover:border-red-600/60 hover:bg-red-950/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                      >
                        <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3" />
                        Lihat Detail
                      </Link>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xs border border-red-900/30 bg-red-950/20 px-3 py-2 text-xs font-medium text-gray-400 transition-all hover:border-red-700/50 hover:bg-red-950/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                        Lihat Live
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── GitHub CTA ── */}
          <Reveal delay={PROJECTS.length * 80}>
            <div className="mt-14 flex justify-center">
              <a
                href="https://github.com/yakubfirman"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xs border border-red-900/30 bg-red-950/20 px-6 py-3 text-sm font-medium text-gray-400 transition-all hover:border-red-700/50 hover:bg-red-950/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                Lihat Semua Repository di GitHub
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
