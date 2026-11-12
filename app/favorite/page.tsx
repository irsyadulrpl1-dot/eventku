import DaftarFavorite from "@/components/DaftarFavorite";

export default function HalamanFavorite() {
  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Koleksi personal</span>
        <h1>Event favorit</h1>
        <p>Event yang kamu simpan, tersedia di browser ini.</p>
      </header>
      <DaftarFavorite />
    </div>
  );
}
