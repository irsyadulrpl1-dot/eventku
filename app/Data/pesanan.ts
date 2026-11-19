export type Pesanan = {
  nomor: number;
  event_id: number;
  nama_pemesan: string;
  email: string;
  jumlah_tiket: number;
  total_harga: number;
  dibuat: string;
  events: { judul: string } | null;
};
