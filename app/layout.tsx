import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

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
      <body>
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
