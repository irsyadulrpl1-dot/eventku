import Link from "next/link";
import Ikon from "@/components/Ikon";

export default function HalamanKontak() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Bantuan Eventku</span>
        <h1>Hubungi Eventku</h1>
        <p>
          Informasi kontak pengelola belum dikonfigurasikan untuk proyek ini.
          Untuk sementara, kamu tetap bisa menjelajahi informasi event yang
          tersedia di Eventku.
        </p>
      </header>
      <section className="contact-panel">
        <span className="about-icon">
          <Ikon nama="ticket" />
        </span>
        <div>
          <span className="detail-label">Pusat informasi</span>
          <h2>Butuh informasi event?</h2>
          <p>
            Lihat jadwal, lokasi, harga, dan ketersediaan tiket pada halaman
            detail setiap event.
          </p>
          <Link
            className="button button-primary"
            href="/event"
          >
            Jelajahi event
            <Ikon nama="arrow-right" />
          </Link>
        </div>
      </section>
    </div>
  );
}