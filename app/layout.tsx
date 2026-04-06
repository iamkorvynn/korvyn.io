import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";

import "./globals.css";

const headingFont = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Korvynn | Product-Minded Frontend Builder",
  description:
    "A cinematic portfolio for a product-minded engineer building privacy-first, motion-led digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
