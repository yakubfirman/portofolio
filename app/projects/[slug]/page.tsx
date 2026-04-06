import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faBriefcase,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { PROJECTS } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Reveal, PageBackground, TechBadge } from "@/components/ui";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Yakub Firman Mustofa`,
    description: project.details.overview,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {/* ── Back button ── */}
          <div className="hero-animate hero-delay-1 mb-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              />
              Kembali ke Semua Proyek
            </Link>
          </div>

          {/* ── Hero image ── */}
          <div className="hero-animate hero-delay-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404] shadow-2xl shadow-black/50">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot ${project.name}`}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-8xl font-black text-red-900/20 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0a0a0a] to-transparent" />
              {/* Top-left badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-xs border border-red-800/30 bg-[#0a0a0a]/70 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-red-400/80 uppercase backdrop-blur-sm">
                  <FontAwesomeIcon icon={faBriefcase} className="h-2.5 w-2.5" />
                  {project.details.role}
                </span>
              </div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
            {/* ── LEFT: main content ── */}
            <div>
              {/* Title */}
              <div className="hero-animate hero-delay-3">
                <h1 className="font-display mb-4 text-2xl leading-tight font-bold text-white sm:text-3xl lg:text-4xl">
                  {project.name}
                </h1>
                <p className="text-sm leading-relaxed text-gray-500">{project.description}</p>
              </div>

              {/* Divider */}
              <Reveal delay={200}>
                <div className="my-8 h-px bg-linear-to-r from-red-900/30 via-red-900/10 to-transparent" />
              </Reveal>

              {/* Overview */}
              <Reveal delay={240}>
                <section>
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="h-px w-4 bg-red-600/60" />
                    <h2 className="text-[11px] font-semibold tracking-widest text-red-500 uppercase">
                      Overview
                    </h2>
                  </div>
                  <p className="text-sm leading-[1.85] text-gray-400">{project.details.overview}</p>
                </section>
              </Reveal>

              {/* Divider */}
              <Reveal delay={300}>
                <div className="my-8 h-px bg-linear-to-r from-red-900/30 via-red-900/10 to-transparent" />
              </Reveal>

              {/* Contributions */}
              <Reveal delay={340}>
                <section>
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="h-px w-4 bg-red-600/60" />
                    <h2 className="text-[11px] font-semibold tracking-widest text-red-500 uppercase">
                      Yang Saya Lakukan
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {project.details.contributions.map((item, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-3 rounded-xs border border-transparent p-3 transition-colors duration-200 hover:border-red-900/20 hover:bg-red-950/10"
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-0.5 h-4 w-4 shrink-0 text-red-700 transition-colors duration-200 group-hover:text-red-500"
                        />
                        <span className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* CTA */}
              <Reveal delay={420}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.url !== "/" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-xs bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-950/40 transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                      Lihat Proyek Live
                    </a>
                  )}
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2.5 rounded-xs border border-red-800/50 bg-red-950/30 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:border-red-600/60 hover:bg-red-950/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                    />
                    Proyek Lainnya
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: sticky sidebar ── */}
            <Reveal delay={180}>
              <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Role card */}
                <div className="rounded-xs border border-red-900/20 bg-[#0d0404]/70 p-5">
                  <p className="mb-1.5 font-mono text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                    Role
                  </p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-sm font-semibold text-white">{project.details.role}</span>
                  </div>
                </div>

                {/* Tech stack card */}
                <div className="rounded-xs border border-red-900/20 bg-[#0d0404]/70 p-5">
                  <p className="mb-3 font-mono text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Live link card */}
                {project.url !== "/" && (
                  <div className="rounded-xs border border-red-900/20 bg-[#0d0404]/70 p-5">
                    <p className="mb-3 font-mono text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                      Live URL
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 shrink-0 text-red-700/60 transition-colors group-hover:text-red-400"
                      />
                      <span className="truncate">{project.url.replace("https://", "")}</span>
                    </a>
                  </div>
                )}

                {/* Stats */}
                <div className="rounded-xs border border-red-900/20 bg-[#0d0404]/70 p-5">
                  <p className="mb-3 font-mono text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
                    Kontribusi
                  </p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-sm text-gray-400">
                      <span className="font-bold text-white">
                        {project.details.contributions.length}
                      </span>{" "}
                      poin kontribusi
                    </span>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
