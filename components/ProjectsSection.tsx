import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-5 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading tag="Portfolio" title="Proyek Saya" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-xs bg-[#0d0404] transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/30 hover:-translate-y-1"
            >
              {/* Top accent line */}
              <div className="h-px w-full bg-linear-to-r from-red-800/60 via-red-600/30 to-transparent" />

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* Card header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCodeBranch} className="h-4 w-4 text-red-700" />
                    <span className="font-mono text-[10px] font-bold tracking-widest text-red-900/60">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-3.5 w-3.5 text-gray-700 transition-all group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                {/* Title + desc */}
                <h3 className="mb-2 font-bold text-white group-hover:text-red-100 transition-colors">
                  {project.name}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-xs bg-red-950/50 px-2 py-0.5 font-mono text-[10px] text-red-500/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-10 flex justify-center">
          <Button
            href="https://github.com/yakubfirman"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            Lihat Semua Proyek di GitHub
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}

