import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import type { PROJECTS } from "@/lib/data/projects";
import Button from "./Button";
import RoleBadge from "./RoleBadge";

type Project = (typeof PROJECTS)[number];

export default function ProjectCard({ project }: { project: Project }) {
  return (
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
      <div className="relative flex flex-1 flex-col px-5 pt-4 pb-5">
        <div className="mb-2">
          <RoleBadge role={project.details.role} />
        </div>

        <h3 className="mb-2 line-clamp-2 leading-snug font-bold text-white">{project.name}</h3>

        <p className="mb-auto line-clamp-2 text-xs leading-relaxed text-gray-500">
          {project.description}
        </p>

        {/* ── Action buttons ── */}
        <div className="mt-4 flex gap-1.5 border-t border-red-900/15 pt-4">
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
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 shrink-0" />
            Lihat Live
          </Button>
        </div>
      </div>
    </div>
  );
}
