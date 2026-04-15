import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  SpeakingSection,
  ProjectsSection,
  TestimonialsSection,
  WorkflowSection,
  GitHubSection,
  ContactSection,
  Footer,
} from "@/components";
import { getAbout, getSkillCategories, getProjects, getSpeaking, getSocials, getProfile, getApprovedTestimonials } from "@/lib/data";

export default async function Home() {
  // Use Promise.allSettled to prevent one failure from crashing entire page
  const results = await Promise.allSettled([
    getProfile(),
    getAbout(),
    getSkillCategories(),
    getProjects(),
    getSpeaking(),
    getSocials(),
    getApprovedTestimonials(),
  ]);

  // Extract values with fallbacks
  const profile = results[0].status === "fulfilled" ? results[0].value : { first_name: "Yakub", last_name: "Firman" };
  const about = results[1].status === "fulfilled" ? results[1].value : { meta: [], education: [], highlights: [] };
  const skillCategories = results[2].status === "fulfilled" ? results[2].value : [];
  const projects = results[3].status === "fulfilled" ? results[3].value : [];
  const speaking = results[4].status === "fulfilled" ? results[4].value : [];
  const socials = results[5].status === "fulfilled" ? results[5].value : [];
  const testimonials = results[6].status === "fulfilled" ? results[6].value : [];

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
        <Navbar profile={profile} />
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
          <TestimonialsSection testimonials={testimonials} />
          <WorkflowSection />
          <GitHubSection />
          <ContactSection socials={socials} />
        </main>
        <Footer
          socials={socials}
          profile={profile}
          location={about.meta.find((m) => m.icon_key === "faLocationDot")?.text}
        />
      </div>
    </div>
  );
}
