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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
