"use client";

import Link from "next/link";
import { useState } from "react";
import Ikon from "./Ikon";

const links = [
  { href: "/", teks: "Beranda" },
  { href: "/event", teks: "Jelajahi event" },
  { href: "/pesanan", teks: "Pesanan" },
  { href: "/tentang", teks: "Tentang" },
  { href: "/kontak", teks: "Kontak" },
];

export default function Navbar() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Eventku, kembali ke beranda"
          onClick={() => setMenuTerbuka(false)}
        >
          <span className="brand-mark">
            <Ikon nama="ticket" />
          </span>
          <span>eventku</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuTerbuka ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={menuTerbuka}
          aria-controls="primary-navigation"
          onClick={() => setMenuTerbuka((terbuka) => !terbuka)}
        >
          <Ikon nama={menuTerbuka ? "x" : "menu"} />
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav${menuTerbuka ? " is-open" : ""}`}
          aria-label="Navigasi utama"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuTerbuka(false)}
            >
              {link.teks}
            </Link>
          ))}
          <Link
            href="/favorite"
            className="nav-favorite"
            onClick={() => setMenuTerbuka(false)}
          >
            <Ikon nama="heart" />
            Favorit
          </Link>
        </nav>
      </div>
    </header>
  );
}