export interface Event {
  id: number;
  judul: string;
  tanggal: string;
  lokasi: string;
  kategori: string;
  harga: number;
  kuota: number;
  terisi: number;
  deskripsi: string;
  gambar?: string;
}

export const events: Event[] = [
  {
    id: 1,
    judul: "Konser Musik Indie",
    tanggal: "2027-06-15T19:00:00+07:00",
    lokasi: "Jakarta",
    kategori: "Musik",
    harga: 75000,
    kuota: 240,
    terisi: 126,
    deskripsi:
      "Nikmati penampilan musisi indie pilihan dalam satu malam penuh musik, cerita, dan suasana yang hangat.",
    gambar: "/img/event-1.png",
  },
  {
    id: 2,
    judul: "Workshop Next.js & TypeScript",
    tanggal: "2027-07-20T09:00:00+07:00",
    lokasi: "Online",
    kategori: "Workshop",
    harga: 50000,
    kuota: 80,
    terisi: 24,
    deskripsi:
      "Workshop praktis untuk membangun aplikasi web modern dengan Next.js dan TypeScript.",
    gambar: "/img/event-2.png",
  },
];

export function getEventById(id: number) {
  return events.find((event) => event.id === id);
}

export function sisaTiket(event: Event) {
  return Math.max(0, event.kuota - event.terisi);
}

export function rupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTanggal(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}
