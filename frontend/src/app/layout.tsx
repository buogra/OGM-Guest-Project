import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "OGM Misafirhane — Anasayfa",
  description: "Orman Genel Müdürlüğü Misafirhane Rezervasyon Sistemi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
