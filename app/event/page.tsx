import { Suspense } from "react";
import { getSupabase } from "@/lib/supabase";
import KartuEvent from "@/components/KartuEvent";
import type { Event } from "@/Data/events";

// Komponen internal untuk mengambil data dari Supabase dan menampilkannya dalam grid
async function DaftarSemuaEvent() {
  const supabase = getSupabase();
  const { data: eventsFromSupabase, error } = await supabase
    .from("events")
    .select("*");

  const events: Event[] =
    error || !eventsFromSupabase ? [] : eventsFromSupabase;

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
