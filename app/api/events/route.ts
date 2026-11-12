import { events } from "@/Data/events";

export async function GET() {
  return Response.json(events);
}

export async function POST(request: Request) {
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
  const event = events.find((item) => item.id === eventId);
  if (!event) {
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
  const sisa = event.kuota - event.terisi;
  if (sisa < 1 || Number(jumlah) > sisa) {
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

  return Response.json({
    message:
      "Data pemesanan berhasil divalidasi. Ini masih simulasi dan belum tersimpan ke database.",
  });
}
