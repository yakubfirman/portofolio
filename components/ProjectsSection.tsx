import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS } from "@/lib/data";
import { SectionHeading, Button, Reveal, ProjectCard } from "@/components/ui";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Portfolio" title="Proyek Saya" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <Reveal key={project.slug} delay={index * 80} className="h-full">
              <ProjectCard project={project} />
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
