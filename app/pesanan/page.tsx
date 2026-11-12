import Link from "next/link";
import { pesanan } from "@/Data/pesanan";
import { rupiah } from "@/Data/events";

export default function HalamanPesanan() {
  const totalTiket = pesanan.reduce((t, p) => t + p.jumlah, 0);
  const pendapatan = pesanan.reduce((t, p) => t + p.total, 0);

  return (
    <div className="page-wrap inner-page">
      <header className="page-heading">
        <span className="eyebrow">Aktivitas akun</span>
        <h1>Daftar pesanan</h1>
        <p>Ringkasan tiket yang dipesan melalui Eventku.</p>
      </header>
      {pesanan.length === 0 ? (
        <div className="empty-state">
          <h2>Belum ada pesanan</h2>
          <p>
            Pemesanan saat ini masih berupa simulasi dan belum disimpan ke
            database.
          </p>
          <Link href="/event" className="button button-primary">
            Jelajahi event
          </Link>
        </div>
      ) : (
        <>
          <p className="result-count">
            {pesanan.length} pesanan · {totalTiket} tiket · pendapatan{" "}
            {rupiah(pendapatan)}
          </p>
          <div className="order-table-wrap">
            <table className="order-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Event</th>
                  <th scope="col">Pemesan</th>
                  <th scope="col">Tiket</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {pesanan.map((p) => (
                  <tr key={p.nomor}>
                    <td>{p.nomor}</td>
                    <td>{p.judul}</td>
                    <td>{p.nama}</td>
                    <td>{p.jumlah}</td>
                    <td>{rupiah(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
