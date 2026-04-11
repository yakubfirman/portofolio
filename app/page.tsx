import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  SpeakingSection,
  ProjectsSection,
  WorkflowSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "@/components";
import { getAbout, getSkillCategories, getProjects, getSpeaking, getSocials, getProfile } from "@/lib/data";

export default async function Home() {
  const [profile, about, skillCategories, projects, speaking, socials] = await Promise.all([
    getProfile(),
    getAbout(),
    getSkillCategories(),
    getProjects(),
    getSpeaking(),
    getSocials(),
  ]);

  return (
    <div className="relative bg-[#0a0a0a]">
      {/* ── Global decorative background (fixed — always behind content) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Subtle red-tinted grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Ambient glow orbs */}
        <div className="absolute -top-48 -left-48 h-175 w-175 rounded-full bg-red-900/12 blur-[220px]" />
        <div className="absolute top-[20%] -right-36 h-137.5 w-137.5 rounded-full bg-red-800/8 blur-[180px]" />
        <div className="absolute bottom-[20%] -left-24 h-125 w-125 rounded-full bg-red-950/14 blur-[180px]" />
        <div className="absolute right-[15%] -bottom-32 h-112.5 w-112.5 rounded-full bg-red-900/10 blur-[160px]" />
        {/* Top-center soft bloom */}
        <div className="absolute top-0 left-1/2 h-62.5 w-200 -translate-x-1/2 rounded-full bg-red-800/7 blur-[120px]" />

        {/* Edge vignette — softens corners */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(10,10,10,0.75) 100%)",
          }}
        />
      </div>

      {/* ── Site content ── */}
      <div className="relative z-10">
        <Navbar />
        <main className="text-white">
          <HeroSection profile={profile} />
          <AboutSection
            meta={about.meta}
            education={about.education}
            highlights={about.highlights}
          />
          <SkillsSection categories={skillCategories} />
          <ProjectsSection projects={projects} />
          <SpeakingSection events={speaking} />
          <WorkflowSection />
          <GitHubSection />
          <ContactSection socials={socials} />
        </main>
        <Footer socials={socials} />
      </div>
    </div>
  );
}
