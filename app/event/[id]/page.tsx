import Link from "next/link";
import { notFound } from "next/navigation";
import FormPesan from "@/components/FormPesan";
import Ikon from "@/components/Ikon";
import { events, formatTanggal, getEventById, rupiah, sisaTiket } from "@/Data/events";

export function generateStaticParams() {
  return events.map((event) => ({ id: String(event.id) }));
}

export default async function HalamanDetailEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  const event = Number.isInteger(eventId) ? getEventById(eventId) : undefined;

  if (!event) notFound();

  const sisa = sisaTiket(event);

  return (
    <div className="page-wrap inner-page">
      <Link href="/event" className="back-link">
        <Ikon nama="arrow-right" />
        Kembali ke daftar event
      </Link>
      <div className="detail-layout">
        <article className="event-detail">
          <span className="category-tag">{event.kategori}</span>
          <h1>{event.judul}</h1>
          <p className="detail-description">{event.deskripsi}</p>
          <div className="detail-facts">
            <div>
              <span className="detail-fact-icon">
                <Ikon nama="calendar" />
              </span>
              <div>
                <span className="detail-label">Tanggal dan waktu</span>
                <strong>{formatTanggal(event.tanggal)} WIB</strong>
              </div>
            </div>
            <div>
              <span className="detail-fact-icon">
                <Ikon nama="map-pin" />
              </span>
              <div>
                <span className="detail-label">Lokasi</span>
                <strong>{event.lokasi}</strong>
              </div>
            </div>
            <div>
              <span className="detail-fact-icon">
                <Ikon nama="ticket" />
              </span>
              <div>
                <span className="detail-label">Ketersediaan</span>
                <strong>
                  {sisa === 0 ? "Tiket habis" : `${sisa} tiket tersedia`}
                </strong>
              </div>
            </div>
          </div>
          <div className="detail-price">
            <span>Harga tiket</span>
            <strong>{rupiah(event.harga)}</strong>
          </div>
          <div className="notice-box">
            <strong>Informasi pemesanan</strong>
            <p>
              Maksimal 5 tiket per transaksi. Pemesanan pada situs ini masih
              berupa simulasi dan belum tersimpan ke database.
            </p>
          </div>
        </article>
        <aside className="booking-panel" aria-label="Formulir pemesanan">
          <FormPesan event={event} />
        </aside>
      </div>
    </div>
  );
}