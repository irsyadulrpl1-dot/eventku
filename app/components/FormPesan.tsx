"use client";

import { useRef, useState } from "react";
import { rupiah, sisaTiket, type Event } from "@/Data/events";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function FormPesan({ event }: { event: Event }) {
  const router = useRouter();
  const sisa = sisaTiket(event);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState("1");
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState<"error" | "success">("error");
  const [memproses, setMemproses] = useState(false);
  const pengirimanAktif = useRef(false);

  async function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pengirimanAktif.current) return;
    setPesan("");

    const jumlahTiket = Number(jumlah);
    if (nama.trim().length < 3) {
      setPesan("Nama pemesan minimal 3 karakter.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setPesan("Masukkan alamat email dengan format yang valid.");
      return;
    }
    if (!Number.isInteger(jumlahTiket) || jumlahTiket < 1) {
      setPesan("Jumlah tiket harus berupa bilangan bulat minimal 1.");
      return;
    }
    if (jumlahTiket > 5) {
      setPesan("Maksimal pemesanan adalah 5 tiket dalam satu transaksi.");
      return;
    }
    if (jumlahTiket > sisa) {
      setPesan(`Tiket yang tersedia hanya ${sisa}.`);
      return;
    }

    pengirimanAktif.current = true;
    setMemproses(true);

    try {
      const totalHarga = event.harga * jumlahTiket;

      // 1. Simpan pesanan ke tabel 'pesanan' di Supabase
      const { error: insertError } = await supabase.from("pesanan").insert([
        {
          event_id: event.id,
          nama_pemesan: nama.trim(),
          email: email.trim(),
          jumlah_tiket: jumlahTiket,
          total_harga: totalHarga,
        },
      ]);

      if (insertError) throw insertError;

      // 2. Update jumlah tiket terisi pada tabel 'events'
      const { error: updateError } = await supabase
        .from("events")
        .update({ terisi: (event.terisi || 0) + jumlahTiket })
        .eq("id", event.id);

      if (updateError) {
        console.error("Gagal memperbarui kuota event:", updateError.message);
      }

      setJenisPesan("success");
      setPesan("Pesanan berhasil disimpan ke database!");

      // 3. Arahkan otomatis ke halaman pesanan setelah 1.5 detik
      setTimeout(() => {
        router.push("/pesanan");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setJenisPesan("error");
      const pesanKesalahan =
        err instanceof Error
          ? err.message
          : typeof err === "object" &&
              err !== null &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "Terjadi gangguan koneksi. Silakan coba kembali.";
      setPesan(
        pesanKesalahan,
      );
    } finally {
      pengirimanAktif.current = false;
      setMemproses(false);
    }
  }

  return (
    <form onSubmit={kirim} className="booking-form">
      <div>
        <p className="eyebrow">Amankan tempatmu</p>
        <h2>Pesan tiket</h2>
      </div>

      <label className="form-field">
        <span>Nama pemesan</span>
        <input
          autoComplete="name"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          minLength={3}
          maxLength={100}
          placeholder="Nama lengkap"
          required
        />
      </label>
      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com"
          required
        />
      </label>
      <label className="form-field">
        <span>Jumlah tiket</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={Math.min(5, sisa)}
          step={1}
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          required
          disabled={sisa === 0}
        />
        <small>Maksimal 5 tiket per transaksi.</small>
      </label>

      <div className="booking-total">
        <span>Total pembayaran</span>
        <strong>{rupiah(event.harga * (Number(jumlah) || 0))}</strong>
      </div>

      {pesan && (
        <p
          className={`form-message ${jenisPesan}`}
          role="status"
          aria-live="polite"
        >
          {pesan}
        </p>
      )}

      <button
        className="button button-primary booking-submit"
        type="submit"
        disabled={memproses || sisa === 0}
      >
        {memproses
          ? "Memproses..."
          : sisa === 0
            ? "Tiket habis"
            : "Lanjut pesan"}
      </button>
      <p className="booking-note">
        Pemesanan akan langsung tersimpan secara permanen ke database Supabase.
      </p>
    </form>
  );
}
