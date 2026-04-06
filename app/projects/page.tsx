import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import {
  Button,
  SectionHeading,
  Reveal,
  PageBackground,
  TechBadge,
  RoleBadge,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Proyek - Yakub Firman Mustofa",
  description:
    "Kumpulan proyek web yang telah dikerjakan oleh Yakub Firman Mustofa — mulai dari aplikasi e-voting, website organisasi, hingga magang di instansi pemerintah.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PageBackground />

      <Navbar />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
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
                    <div className="mb-2">
                      <RoleBadge role={project.details.role} />
                    </div>

                    <h2 className="mb-3 line-clamp-2 leading-snug font-bold text-white">
                      {project.name}
                    </h2>

                    {/* Tech tags */}
                    {/* <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <TechBadge key={t} label={t} />
                      ))}
                    </div> */}

                    {/* ── Action buttons ── */}
                    <div className="mt-auto flex gap-1.5 border-t border-red-900/15 pt-4">
                      <Button
                        href={`/projects/${project.slug}`}
                        variant="outline"
                        size="sm"
                        className="flex-1 justify-center gap-1.5 px-2 py-1.5 text-[11px] sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
                      >
                        <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3 shrink-0" />
                        Lihat Detail
                      </Button>
                      <Button
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="sm"
                        className="flex-1 justify-center gap-1.5 px-2 py-1.5 text-[11px] sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
                      >
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="h-3 w-3 shrink-0"
                        />
                        Lihat Live
                      </Button>
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
                Lihat Repository GitHub
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
