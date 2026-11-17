import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Pastikan Navbar diimpor

export const metadata: Metadata = {
  title: "EventKu",
  description: "Aplikasi penemuan event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar /> {/* Panggil Navbar di sini agar muncul di semua halaman */}
        <main>{children}</main>
      </body>
    </html>
  );
}
