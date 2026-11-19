import { ambilEvents } from "@/Data/ambil";
import DaftarFavorite from "@/components/DaftarFavorite";
import { Suspense } from "react";

async function DaftarEventFavorite() {
  const events = await ambilEvents().catch(() => []);
  return <DaftarFavorite events={events} />;
}

export default function HalamanFavorite() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Koleksi personal</span>
        <h1>Event favorit</h1>
        <p>Event yang kamu simpan, tersedia di browser ini.</p>
      </header>
      <Suspense
        fallback={<div className="empty-state compact"><p>Memuat favorit...</p></div>}
      >
        <DaftarEventFavorite />
      </Suspense>
    </div>
  );
}
