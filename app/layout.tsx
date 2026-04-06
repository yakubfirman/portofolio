import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yakubfirman.id"),
  title: "Yakub Firman Mustofa",
  description:
    "Full Stack Web Developer dan SEO Specialist di Surakarta. Yakub Firman Mustofa — membangun website modern dengan React, Next.js, Laravel, dan mengoptimalkan peringkat di Google Search.",
  keywords: [
    "Full Stack Web Developer",
    "SEO Specialist",
    "Web Developer Surakarta",
    "Next.js Developer",
    "Laravel Developer",
    "React Developer",
    "Jasa Pembuatan Website",
    "Yakub Firman Mustofa",
  ],
  icons: {
    icon: "/iconweb.png",
    apple: "/iconweb.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yakub Firman Mustofa | Full Stack Web Developer & SEO Specialist",
    description:
      "Full Stack Web Developer dan SEO Specialist di Surakarta. Membangun website modern dengan React, Next.js, Laravel, dan mengoptimalkan peringkat di Google Search.",
    url: "https://yakubfirman.id",
    siteName: "yakubfirman.id",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/iconweb.png",
        width: 512,
        height: 512,
        alt: "Yakub Firman Mustofa — Full Stack Dev & SEO Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakub Firman Mustofa | Full Stack Web Developer & SEO Specialist",
    description:
      "Full Stack Web Developer dan SEO Specialist di Surakarta. Membangun website modern dengan React, Next.js, Laravel, dan mengoptimalkan peringkat di Google Search.",
  },
  verification: {
    google: "vZvOJFKUyjkf51wp4QB-PVebBu8QDUxgB7HHfB-g_zs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yakub Firman Mustofa",
    url: "https://yakubfirman.id",
    image: "https://yakubfirman.id/photo.png",
    jobTitle: "Full Stack Web Developer & SEO Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Muhammadiyah Surakarta",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surakarta",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    sameAs: [
      "https://github.com/yakubfirman",
      "https://linkedin.com/in/Yakub-Firman-Mustofa",
      "https://instagram.com/f.firman5",
      "https://twitter.com/f_firman5",
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "SEO",
      "React",
      "Next.js",
      "Laravel",
      "Tailwind CSS",
      "Google Search Console",
      "WordPress",
    ],
  };

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
