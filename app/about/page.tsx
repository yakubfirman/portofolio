import type { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { getAboutFull, getSocials, getProfile } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Reveal, SectionHeading, PageBackground } from "@/components/ui";
import { AgeDisplay, TimelineItem, CertificateCard } from "@/components/about";

export const metadata: Metadata = {
  title: "Tentang Saya",
  description:
    "Kenali lebih dekat Yakub Firman Mustofa — riwayat pendidikan, pengalaman kerja, organisasi, sertifikat, dan perjalanan kariernya sebagai Full Stack Web Developer.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang Saya — Yakub Firman Mustofa",
    description:
      "Kenali lebih dekat Yakub Firman Mustofa — riwayat pendidikan, pengalaman kerja, organisasi, sertifikat, dan perjalanan kariernya.",
    url: "https://yakubfirman.id/about",
  },
};

const EMPLOYMENT_LABEL: Record<string, string> = {
  fulltime: "Full-time",
  parttime: "Part-time",
  freelance: "Freelance",
  internship: "Magang",
  contract: "Kontrak",
};

export default async function AboutPage() {
  const [about, socials, profile] = await Promise.all([
    getAboutFull(),
    getSocials(),
    getProfile(),
  ]);

  const hasExperience = about.experiences.length > 0;
  const hasOrganizations = about.organizations.length > 0;
  const hasCertificates = about.certificates.length > 0;
  const hasEducation = about.education.length > 0;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <PageBackground />
      <Navbar profile={profile} />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">

          {/* ── Hero / Header ──────────────────────────────────────────────── */}
          <div className="hero-animate hero-delay-2 mb-14 sm:mb-18">
            <SectionHeading tag="About Me" title="Tentang Saya" />

            <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
              {/* Left: Bio */}
              <Reveal delay={80} className="md:col-span-3">
                <div className="space-y-5">
                  {/* Age + meta pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {about.birthdate && (
                      <span className="inline-flex items-center gap-1.5 rounded-xs border border-red-900/30 bg-[#0f0505] px-3 py-1.5 text-xs text-gray-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        <AgeDisplay birthdate={about.birthdate} className="font-semibold text-white" />
                      </span>
                    )}
                    {about.meta.map(({ icon, text }) => (
                      <span
                        key={text}
                        className="flex items-center gap-2 rounded-xs border border-red-900/30 bg-[#0f0505] px-3 py-1.5 text-xs text-gray-400"
                      >
                        <FontAwesomeIcon
                          icon={icon}
                          className="h-3 w-3 shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                        {text}
                      </span>
                    ))}
                  </div>

                  {/* Bio text */}
                  <div className="space-y-3 text-sm leading-relaxed text-gray-400">
                    <p>
                      Saya adalah seorang{" "}
                      <span className="font-semibold text-white">Full Stack Web Developer</span> dan{" "}
                      <span className="font-semibold text-white">SEO Specialist</span> yang membangun
                      produk digital dari sisi frontend hingga backend — sekaligus memastikan setiap
                      produk mudah ditemukan mesin pencari melalui strategi SEO yang terstruktur.
                    </p>
                    <p>
                      Selama lebih dari{" "}
                      <span className="font-semibold text-white">2 tahun</span> berkecimpung di dunia{" "}
                      <span className="font-semibold text-white">freelance</span>, saya telah
                      membangun berbagai proyek web mulai dari landing page, aplikasi web dinamis,
                      hingga optimasi mesin pencari untuk berbagai klien.
                    </p>
                  </div>

                  {/* Highlights */}
                  {about.highlights.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {about.highlights.map((h) => (
                        <div
                          key={h.label}
                          className="rounded-xs border border-red-900/20 bg-[#0f0505] px-4 py-3 text-center"
                        >
                          <p className="text-xl font-bold text-red-400">{h.value}</p>
                          <p className="mt-0.5 text-[11px] text-gray-500">{h.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Right: Photo */}
              <Reveal delay={30} className="order-first md:order-last md:col-span-2">
                <div className="relative mx-auto max-w-55 sm:max-w-xs lg:max-w-57.5">
                  {/* Corner brackets */}
                  <div aria-hidden className="pointer-events-none absolute -top-2.5 -left-2.5 z-10 h-6 w-6 border-t-2 border-l-2 border-red-700/60" />
                  <div aria-hidden className="pointer-events-none absolute -top-2.5 -right-2.5 z-10 h-6 w-6 border-t-2 border-r-2 border-red-700/60" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-10 h-6 w-6 border-b-2 border-l-2 border-red-700/60" />
                  <div aria-hidden className="pointer-events-none absolute -right-2.5 -bottom-2.5 z-10 h-6 w-6 border-r-2 border-b-2 border-red-700/60" />
                  <div aria-hidden className="absolute -inset-4 -z-10 rounded-xs bg-red-900/15 blur-2xl" />
                  <div className="relative aspect-3/4 overflow-hidden rounded-xs border border-red-900/30 bg-[#0f0505]">
                    <Image
                      src="/photo.png"
                      alt="Yakub Firman Mustofa"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#080303]/90 via-[#080303]/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-sm font-bold text-white">Yakub Firman Mustofa</p>
                      <p className="mt-0.5 text-[11px] text-red-400">Full Stack Dev &amp; SEO Specialist</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        <span className="text-[11px] text-gray-300">Open to Work</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Riwayat Pendidikan ─────────────────────────────────────────── */}
          {hasEducation && (
            <section className="mb-16">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xs border border-red-900/30 bg-red-950/20">
                    <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-red-500">
                      Education
                    </p>
                    <h2 className="text-lg font-bold text-white sm:text-xl">Riwayat Pendidikan</h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="rounded-xs border border-red-900/15 bg-[#0c0404] p-5 sm:p-6">
                  {about.education.map((edu, i) => (
                    <div key={edu.school} className="relative flex gap-4 sm:gap-5">
                      {/* Connector line */}
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-700/40 bg-red-950/30">
                          <FontAwesomeIcon icon={edu.icon} className="h-3.5 w-3.5 text-red-500" />
                        </div>
                        {i < about.education.length - 1 && (
                          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-red-900/40 to-transparent" />
                        )}
                      </div>
                      {/* Content */}
                      <div className={`min-w-0 flex-1 ${i < about.education.length - 1 ? "pb-7" : ""}`}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-white">{edu.degree}</p>
                            <p className="mt-0.5 text-xs text-gray-400">{edu.school}</p>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-1.5">
                            <span className="rounded-xs bg-red-950/40 px-2.5 py-0.5 text-[11px] font-medium text-red-400 border border-red-900/30">
                              {edu.year}
                            </span>
                            {edu.note && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 text-yellow-600/70" />
                                {edu.note}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* ── Pengalaman Kerja ───────────────────────────────────────────── */}
          {hasExperience && (
            <section className="mb-16">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xs border border-red-900/30 bg-red-950/20">
                    <FontAwesomeIcon icon={faBriefcase} className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-red-500">
                      Experience
                    </p>
                    <h2 className="text-lg font-bold text-white sm:text-xl">Pengalaman Kerja</h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="rounded-xs border border-red-900/15 bg-[#0c0404] p-5 sm:p-6">
                  {about.experiences.map((exp, i) => (
                    <TimelineItem
                      key={`${exp.company}-${i}`}
                      title={exp.role}
                      subtitle={exp.company}
                      period={
                        exp.period_end
                          ? `${exp.period_start} – ${exp.period_end}`
                          : `${exp.period_start} – Sekarang`
                      }
                      description={exp.description}
                      badge={EMPLOYMENT_LABEL[exp.employment_type] ?? exp.employment_type}
                      isLast={i === about.experiences.length - 1}
                    />
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* ── Riwayat Organisasi ─────────────────────────────────────────── */}
          {hasOrganizations && (
            <section className="mb-16">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xs border border-red-900/30 bg-red-950/20">
                    <FontAwesomeIcon icon={faBuilding} className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-red-500">
                      Organizations
                    </p>
                    <h2 className="text-lg font-bold text-white sm:text-xl">Riwayat Organisasi</h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="rounded-xs border border-red-900/15 bg-[#0c0404] p-5 sm:p-6">
                  {about.organizations.map((org, i) => (
                    <TimelineItem
                      key={`${org.name}-${i}`}
                      title={org.role}
                      subtitle={org.name}
                      period={
                        org.period_end
                          ? `${org.period_start} – ${org.period_end}`
                          : `${org.period_start} – Sekarang`
                      }
                      description={org.description}
                      isLast={i === about.organizations.length - 1}
                    />
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* ── Sertifikat ─────────────────────────────────────────────────── */}
          {hasCertificates && (
            <section className="mb-16">
              <Reveal>
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xs border border-red-900/30 bg-red-950/20">
                    <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-red-500">
                      Certificates
                    </p>
                    <h2 className="text-lg font-bold text-white sm:text-xl">Sertifikat</h2>
                  </div>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {about.certificates.map((cert, i) => (
                  <Reveal key={`${cert.name}-${i}`} delay={i * 60}>
                    <CertificateCard
                      name={cert.name}
                      issuer={cert.issuer}
                      issued_date={cert.issued_date}
                      credential_url={cert.credential_url}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── Empty state ────────────────────────────────────────────────── */}
          {!hasEducation && !hasExperience && !hasOrganizations && !hasCertificates && (
            <Reveal>
              <div className="rounded-xs border border-white/5 bg-[#0c0404] px-6 py-16 text-center">
                <p className="text-sm text-gray-600">
                  Belum ada data yang ditampilkan. Tambahkan melalui panel admin.
                </p>
              </div>
            </Reveal>
          )}

        </div>
      </main>

      <Footer socials={socials} profile={profile} />
    </div>
  );
}
