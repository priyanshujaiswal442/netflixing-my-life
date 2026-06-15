import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Netflixify My Life",
    template: "%s | Netflixify My Life",
  },
  description:
    "Turn your experiences, dreams, struggles, and achievements into a cinematic Netflix-style series.",
  keywords: [
    "Netflix",
    "life story",
    "AI series",
    "cinematic",
    "personalized",
    "entertainment",
  ],
  authors: [{ name: "Netflixify My Life" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Netflixify My Life",
    title: "Your Life. Reimagined as a Netflix Original.",
    description:
      "Turn your experiences, dreams, struggles, and achievements into a cinematic Netflix-style series.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Life. Reimagined as a Netflix Original.",
    description:
      "Turn your experiences, dreams, struggles, and achievements into a cinematic Netflix-style series.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
