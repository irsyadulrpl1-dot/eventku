import Link from "next/link";
import { Suspense } from "react";
import { ambilEvents } from "@/Data/ambil"; // Menggunakan fungsi ambilEvents yang sudah terpusat
import Ikon from "@/components/Ikon";
import KartuEvent from "@/components/KartuEvent";

// Komponen terpisah untuk mengambil dan merender daftar event
async function DaftarEventTerdekat() {
  let events;
  try {
    events = await ambilEvents();
  } catch {
    events = null;
  }

  if (!events) {
    return (
      <div className="empty-state compact">
        <h2>Gagal memuat event</h2>
        <p>
          Periksa konfigurasi Supabase dan log server untuk detail error.
        </p>
      </div>
    );
  }
  const terdekat = [...events]
    .sort(
      (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime(),
    )
    .slice(0, 3);

  if (terdekat.length === 0) {
    return (
      <div className="empty-state compact">
        <h2>Belum ada event tersedia</h2>
        <p>Silakan kembali lagi nanti untuk melihat event terbaru.</p>
      </div>
    );
  }

  return (
    <div className="event-grid">
      {terdekat.map((event) => (
        <KartuEvent key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function Beranda() {
  return (
    <div className="page-wrap">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Temukan momen berikutnya</span>
          <h1>
            Rencana seru
            <br />
            <span>dimulai di sini.</span>
          </h1>
          <p>
            Temukan pengalaman pilihan, ajak temanmu, dan amankan tiketnya
            dengan mudah.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/event">
              Jelajahi event
              <Ikon nama="arrow-right" />
            </Link>
            <span className="hero-note">
              Event pilihan, pengalaman berkesan
            </span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-ticket">
            <div className="ticket-top">
              <span className="ticket-mark">
                <Ikon nama="ticket" />
              </span>
              <span>EVENTKU PASS</span>
            </div>
            <div className="ticket-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="ticket-bottom">
              <span>MAKE IT A MOMENT</span>
              <span>EK–2027</span>
            </div>
          </div>
          <div className="hero-sticker">
            Your next story
            <br />
            starts here
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Jangan sampai terlewat</span>
            <h2>Event pilihan</h2>
          </div>
          <Link className="text-link" href="/event">
            Lihat semua
            <Ikon nama="arrow-right" />
          </Link>
        </div>

        {/* Membungkus komponen data asinkron dengan Suspense */}
        <Suspense
          fallback={
            <div className="empty-state compact">
              <p>Memuat event dari Supabase...</p>
            </div>
          }
        >
          <DaftarEventTerdekat />
        </Suspense>
      </section>
    </div>
  );
}
