import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPenRuler,
  faCode,
  faMagnifyingGlassChart,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

const STEPS = [
  {
    icon: faComments,
    number: "01",
    title: "Discovery",
    description:
      "Memahami kebutuhan, tujuan bisnis, dan target pengguna melalui diskusi mendalam sebelum satu baris kode pun ditulis.",
  },
  {
    icon: faPenRuler,
    number: "02",
    title: "Planning & Design",
    description:
      "Merancang struktur halaman, alur navigasi, dan tampilan visual agar selaras dengan identitas brand dan pengalaman pengguna.",
  },
  {
    icon: faCode,
    number: "03",
    title: "Development",
    description:
      "Membangun website dengan kode yang bersih, performa tinggi, dan arsitektur yang mudah dipelihara menggunakan stack modern.",
  },
  {
    icon: faMagnifyingGlassChart,
    number: "04",
    title: "SEO Optimization",
    description:
      "Mengoptimalkan struktur teknis, metadata, kecepatan halaman, dan konten agar mudah ditemukan dan diindeks oleh Google.",
  },
  {
    icon: faRocket,
    number: "05",
    title: "Deployment",
    description:
      "Meluncurkan website ke server produksi, memastikan semua berjalan sempurna, lalu mendaftarkan ke Google Search Console.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="How I Work" title="Cara Saya Bekerja" />
        </Reveal>

        <Reveal delay={60}>
          <p className="-mt-6 mb-14 max-w-xl text-sm leading-relaxed text-gray-500">
            Setiap proyek dijalani dengan alur kerja yang terstruktur — dari pemahaman kebutuhan
            hingga peluncuran — sehingga hasilnya dapat diprediksi dan tepat sasaran.
          </p>
        </Reveal>

        {/* Steps — horizontal grid */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="pointer-events-none absolute top-9 left-0 hidden h-px w-full bg-linear-to-r from-transparent via-red-800/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="group relative flex h-full flex-col items-center rounded-xs border border-red-900/15 bg-[#0d0404]/60 p-5 text-center transition-all duration-300 hover:border-red-800/35 hover:bg-[#0f0505]/80 hover:shadow-lg hover:shadow-red-950/20">
                  {/* Step icon */}
                  <div className="relative mb-4 shrink-0">
                    <div className="absolute inset-0 rounded-xs bg-red-700/20 blur-md transition-all duration-300 group-hover:bg-red-600/30 group-hover:blur-lg" />
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-xs border border-red-800/40 bg-red-950/60 transition-all duration-300 group-hover:border-red-700/60">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="h-5 w-5 text-red-400 transition-colors duration-300 group-hover:text-red-300"
                      />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="mb-1.5 font-mono text-[10px] font-semibold tracking-widest text-red-700/60">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 text-[13px] leading-snug font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed text-gray-600">{step.description}</p>

                  {/* Bottom accent */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-xs bg-linear-to-r from-transparent via-red-600/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
