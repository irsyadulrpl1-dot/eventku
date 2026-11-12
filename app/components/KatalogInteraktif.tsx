"use client";

import { useMemo, useState } from "react";
import type { Event } from "@/Data/events";
import Ikon from "./Ikon";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({
  events,
}: {
  events: Event[];
}) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const daftarKategori = useMemo(
    () => ["Semua", ...new Set(events.map((event) => event.kategori))],
    [events],
  );
  const tersusun = useMemo(() => {
    const hasil = events.filter((event) => {
      const cocokJudul = event.judul
        .toLocaleLowerCase("id-ID")
        .includes(cari.trim().toLocaleLowerCase("id-ID"));
      return cocokJudul && (kategori === "Semua" || event.kategori === kategori);
    });

    return hasil.sort((a, b) => {
      if (urut === "murah") return a.harga - b.harga;
      if (urut === "mahal") return b.harga - a.harga;
      if (urut === "nama") return a.judul.localeCompare(b.judul, "id-ID");
      return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
    });
  }, [cari, events, kategori, urut]);

  return (
    <section aria-label="Daftar event">
      <div className="catalog-controls">
        <label className="search-field">
          <Ikon nama="search" />
          <span className="visually-hidden">Cari event</span>
          <input
            value={cari}
            onChange={(event) => setCari(event.target.value)}
            placeholder="Cari nama event..."
          />
        </label>
        <label className="select-field">
          <span className="visually-hidden">Filter kategori</span>
          <select
            value={kategori}
            onChange={(event) => setKategori(event.target.value)}
          >
            {daftarKategori.map((item) => (
              <option key={item} value={item}>
                {item === "Semua" ? "Semua kategori" : item}
              </option>
            ))}
          </select>
        </label>
        <label className="select-field">
          <span className="visually-hidden">Urutkan event</span>
          <select value={urut} onChange={(event) => setUrut(event.target.value)}>
            <option value="tanggal">Tanggal terdekat</option>
            <option value="murah">Harga terendah</option>
            <option value="mahal">Harga tertinggi</option>
            <option value="nama">Nama A–Z</option>
          </select>
        </label>
      </div>

      <p className="result-count">{tersusun.length} event ditemukan</p>
      {tersusun.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">
            <Ikon nama="search" />
          </span>
          <h2>Event tidak ditemukan</h2>
          <p>Coba ubah kata kunci atau pilih kategori lain.</p>
        </div>
      ) : (
        <div className="event-grid">
          {tersusun.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
