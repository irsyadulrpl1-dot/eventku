import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="page-wrap inner-page">
      <div className="empty-state not-found-state">
        <span className="eyebrow">404 · Event tidak ditemukan</span>
        <h1>Sepertinya event ini tidak tersedia.</h1>
        <p>Periksa kembali tautan atau jelajahi event lainnya.</p>
        <Link className="button button-primary" href="/event">
          Lihat daftar event
        </Link>
      </div>
    </div>
  );
}