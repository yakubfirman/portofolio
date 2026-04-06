import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faBriefcase,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PROJECTS } from "@/lib/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";

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
        <div className="mx-auto max-w-3xl">
          {/* ── Back button ── */}
          <div className="hero-animate hero-delay-1">
            <Link
              href="/projects"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
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
            <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-red-900/20 bg-[#0d0404]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot ${project.name}`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-6xl font-black text-red-900/20 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#0a0a0a] to-transparent" />
            </div>
          </div>

          {/* ── Header ── */}
          <div className="hero-animate hero-delay-3">
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faBriefcase} className="h-3.5 w-3.5 text-red-500" />
                <span className="text-xs font-semibold tracking-widest text-red-500 uppercase">
                  {project.details.role}
                </span>
              </div>
              <h1 className="text-2xl leading-snug font-bold text-white sm:text-3xl">
                {project.name}
              </h1>
            </div>
          </div>

          {/* ── Tech stack ── */}
          <div className="hero-animate hero-delay-4">
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-xs bg-red-950/50 px-2.5 py-1 font-mono text-xs text-red-400/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={240}>
            <hr className="mt-8 border-red-900/20" />
          </Reveal>

          {/* ── Overview ── */}
          <Reveal delay={280}>
            <section className="mt-8">
              <h2 className="mb-3 text-xs font-semibold tracking-widest text-red-500 uppercase">
                Overview
              </h2>
              <p className="leading-relaxed text-gray-400">{project.details.overview}</p>
            </section>
          </Reveal>

          {/* ── Contributions ── */}
          <Reveal delay={340}>
            <section className="mt-8">
              <h2 className="mb-4 text-xs font-semibold tracking-widest text-red-500 uppercase">
                Yang Saya Lakukan
              </h2>
              <ul className="space-y-3.5">
                {project.details.contributions.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                    />
                    <span className="text-sm leading-relaxed text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={400}>
            <hr className="mt-10 border-red-900/20" />
          </Reveal>

          {/* ── CTA ── */}
          <Reveal delay={440}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xs bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-950/40 transition-all hover:bg-red-600 hover:shadow-red-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                Lihat Proyek Live
              </a>
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
      </main>

      <Footer />
    </div>
  );
}
