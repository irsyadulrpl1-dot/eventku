import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Eventku — Temukan event seru",
    template: "%s | Eventku",
  },
  description:
    "Jelajahi event pilihan, lihat informasi tiket, dan rencanakan pengalaman serumu bersama Eventku.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`${poppins.className} flex min-h-screen flex-col bg-slate-50 text-slate-800`}>
        <Navbar />
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <Link href="/" className="footer-brand">
              eventku
            </Link>
            <p>Temukan event seru, ciptakan cerita baru.</p>
            <span>© Eventku</span>
          </div>
        </footer>
      </body>
    </html>
  );
}