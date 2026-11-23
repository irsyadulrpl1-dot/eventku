import { ambilEvents } from "@/Data/ambil";
import { getSupabase } from "@/lib/supabase";
import { connection } from "next/server";

export async function GET() {
  try {
    await connection();
    const events = await ambilEvents();
    return Response.json(events);
  } catch (error: unknown) {
    return Response.json(
      {
        message:
          "Gagal memuat event dari database: " +
          (error instanceof Error
            ? error.message
            : "Kesalahan tidak diketahui."),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await connection();
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return Response.json(
      { message: "Data pemesanan tidak valid." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  const eventId = data.eventId;
  const nama = data.nama;
  const email = data.email;
  const jumlah = data.jumlah;

  if (!Number.isInteger(eventId)) {
    return Response.json(
      { message: "Event tidak ditemukan atau tidak tersedia." },
      { status: 404 },
    );
  }

  const supabase = getSupabase();

  // Ambil data event dari Supabase berdasarkan ID
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (eventError || !event) {
    return Response.json(
      { message: "Event tidak ditemukan atau tidak tersedia." },
      { status: 404 },
    );
  }

  if (typeof nama !== "string" || nama.trim().length < 3) {
    return Response.json(
      { message: "Nama pemesan minimal 3 karakter." },
      { status: 400 },
    );
  }
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return Response.json(
      { message: "Masukkan alamat email dengan format yang valid." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(jumlah) || Number(jumlah) < 1) {
    return Response.json(
      { message: "Jumlah tiket harus berupa bilangan bulat minimal 1." },
      { status: 400 },
    );
  }
  if (Number(jumlah) > 5) {
    return Response.json(
      { message: "Maksimal pemesanan adalah 5 tiket dalam satu transaksi." },
      { status: 400 },
    );
  }

  const jumlahTiket = Number(jumlah);
  const sisa = (event.kuota || 0) - (event.terisi || 0);
  if (sisa < 1 || jumlahTiket > sisa) {
    return Response.json(
      {
        message:
          sisa < 1
            ? "Tiket untuk event ini sudah habis."
            : `Tiket yang tersedia hanya ${sisa}.`,
      },
      { status: 409 },
    );
  }

  // Simpan pesanan ke tabel 'pesanan' di database Supabase
  const totalHarga = event.harga * jumlahTiket;
  const { error: insertError } = await supabase.from("pesanan").insert([
    {
      event_id: event.id,
      nama_pemesan: (nama as string).trim(),
      email: (email as string).trim(),
      jumlah_tiket: jumlahTiket,
      total_harga: totalHarga,
    },
  ]);

  if (insertError) {
    return Response.json(
      {
        message: "Gagal menyimpan pesanan ke database: " + insertError.message,
      },
      { status: 500 },
    );
  }

  // Update jumlah tiket terisi pada tabel 'events' di Supabase
  await supabase
    .from("events")
    .update({ terisi: (event.terisi || 0) + jumlahTiket })
    .eq("id", event.id);

  return Response.json({
    message:
      "Pesanan berhasil diproses dan tersimpan secara permanen ke database Supabase!",
  });
}
