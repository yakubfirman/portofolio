import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Portfolio" title="Proyek Saya" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <Reveal key={project.name} delay={index * 80} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] transition-all duration-300 hover:-translate-y-1 hover:border-red-800/40 hover:shadow-xl hover:shadow-red-950/30">
                {/* ── Screenshot (links to detail page) ── */}
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
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-4xl font-black text-red-900/30 select-none">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#0d0404] to-transparent" />
                </Link>

                {/* ── Content ── */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-3 line-clamp-2 leading-snug font-bold text-white">
                    {project.name}
                  </h3>
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
                  <div className="flex gap-2 border-t border-red-900/15 pt-4">
                    <Button
                      href={`/projects/${project.slug}`}
                      variant="outline"
                      size="sm"
                      className="flex-1 justify-center"
                    >
                      <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3" />
                      Lihat Detail
                    </Button>
                    <Button
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                      className="flex-1 justify-center"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                      Lihat Live
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTAs */}
        <Reveal delay={150}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/projects" variant="outline" className="w-full sm:w-auto">
              Lihat Semua Proyek
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
            </Button>
            <Button
              href="https://github.com/yakubfirman"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              GitHub
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
