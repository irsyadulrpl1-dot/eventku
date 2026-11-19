import Link from "next/link";
import { ambilPesanan } from "@/Data/ambil";
import { rupiah } from "@/Data/events";
import { batalkanPesanan } from "@/app/actions";
import { Suspense } from "react";

async function DaftarPesanan() {
  const pesanan = await ambilPesanan().catch(() => []);

  return (
    <>
      {pesanan.length === 0 ? (
        <div className="empty-state">
          <h2>Belum ada pesanan</h2>
          <p>Pesan tiket event untuk melihatnya di halaman ini.</p>
          <Link className="button button-primary" href="/event">
            Lihat event
          </Link>
        </div>
      ) : (
        <section className="event-grid">
          {pesanan.map((item) => (
            <article className="event-card" key={item.nomor}>
              <div className="event-card-body">
                <span className="eyebrow">Pesanan #{item.nomor}</span>
                <h2>{item.events?.judul ?? "Event"}</h2>
                <p>{item.nama_pemesan}</p>
                <p>{item.jumlah_tiket} tiket</p>
                <strong>{rupiah(item.total_harga)}</strong>
                <form action={batalkanPesanan} className="mt-4">
                  <input type="hidden" name="nomor" value={item.nomor} />
                  <button className="button button-secondary" type="submit">
                    Batalkan pesanan
                  </button>
                </form>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default function HalamanPesanan() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Riwayat pemesanan</span>
        <h1>Pesanan tiket</h1>
        <p>Daftar pesanan yang tersimpan di Supabase.</p>
      </header>
      <Suspense
        fallback={<div className="empty-state compact"><p>Memuat pesanan...</p></div>}
      >
        <DaftarPesanan />
      </Suspense>
    </div>
  );
}
