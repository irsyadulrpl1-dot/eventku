import { Suspense } from "react";
import { ambilEvents } from "@/Data/ambil";
import KartuEvent from "@/components/KartuEvent";
import type { Event } from "@/Data/events";

// Komponen internal untuk mengambil data dari Supabase dan menampilkannya dalam grid
async function DaftarSemuaEvent() {
  let events: Event[];
  try {
    events = await ambilEvents();
  } catch {
    return (
      <div className="empty-state compact">
        <h2>Gagal memuat event</h2>
        <p>Periksa konfigurasi Supabase dan log server untuk detail error.</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="empty-state compact">
        <h2>Belum ada event tersedia</h2>
        <p>Silakan kembali lagi nanti untuk melihat event terbaru.</p>
      </div>
    );
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <KartuEvent key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function KatalogEventPage() {
  return (
    <div className="page-wrap">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Jelajahi Semua</span>
            <h2>Katalog Event</h2>
          </div>
        </div>

        {/* Membungkus data dengan Suspense agar selaras dengan Home */}
        <Suspense
          fallback={
            <div className="empty-state compact">
              <p>Memuat daftar event...</p>
            </div>
          }
        >
          <DaftarSemuaEvent />
        </Suspense>
      </section>
    </div>
  );
}
