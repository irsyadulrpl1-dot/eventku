import Link from "next/link";
import Image from "next/image";
import { formatTanggal, rupiah, sisaTiket, type Event } from "@/Data/events";
import Ikon from "./Ikon";
import TombolFavorite from "./TombolFavorite";

export default function KartuEvent({ event }: { event: Event }) {
  const sisa = sisaTiket(event);
  const laris = sisa > 0 && event.terisi / event.kuota >= 0.5;

  return (
    <article className="event-card">
      <Image
        src={event.gambar ?? "/img/default.png"}
        alt={event.judul}
        width={400}
        height={210}
        className="mb-3 rounded-lg"
      />
      <div className="event-card-top">
        <span className="category-tag">{event.kategori}</span>
        {laris && <span className="popular-tag">Banyak diminati</span>}
        <TombolFavorite eventId={event.id} />
      </div>
      <h3 className="event-card-title">{event.judul}</h3>
      <div className="event-meta">
        <span>
          <Ikon nama="calendar" />
          {formatTanggal(event.tanggal)}
        </span>
        <span>
          <Ikon nama="map-pin" />
          {event.lokasi}
        </span>
      </div>
      <div className="event-card-bottom">
        <div>
          <p className="event-price">{rupiah(event.harga)}</p>
          <p className={sisa === 0 ? "ticket-count sold-out" : "ticket-count"}>
            {sisa === 0 ? "Tiket habis" : `${sisa} tiket tersedia`}
          </p>
        </div>
        <Link className="text-link" href={`/event/${event.id}`}>
          Detail
          <Ikon nama="arrow-right" />
        </Link>
      </div>
    </article>
  );
}
