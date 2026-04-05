import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yakubfirman.id"),
  title: "Yakub Firman Mustofa",
  description:
    "Portofolio Yakub Firman Mustofa, Full Stack Web Developer dan SEO Specialist dari Surakarta, Jawa Tengah.",
  icons: {
    icon: "/iconweb.png",
    apple: "/iconweb.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yakub Firman Mustofa",
    description:
      "Portofolio Yakub Firman Mustofa, Full Stack Web Developer dan SEO Specialist dari Surakarta, Jawa Tengah.",
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
    title: "Yakub Firman Mustofa — Full Stack Dev & SEO Specialist",
    description:
      "Portofolio Yakub Firman Mustofa, Full Stack Web Developer dan SEO Specialist dari Surakarta, Jawa Tengah.",
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
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
