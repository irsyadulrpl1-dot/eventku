import Link from "next/link";
import { ambilEvents } from "@/Data/ambil";
import { rupiah } from "@/Data/events";
import { hapusEvent } from "@/app/admin/actions";
import TombolHapus from "@/app/components/TombolHapus";

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ info?: string; galat?: string; cari?: string }>;
}) {
  const { info, galat, cari } = await searchParams;
  let events = await ambilEvents();

  // Filter event berdasarkan kata kunci pencarian jika ada
  if (cari) {
    events = events.filter((e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()),
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Event</h1>
        <Link
          href="/admin/baru"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Tambah event
        </Link>
      </div>

      {/* Form Pencarian */}
      <form method="GET" className="mb-4 flex gap-2">
        <input
          type="text"
          name="cari"
          defaultValue={cari || ""}
          placeholder="Cari judul event..."
          className="rounded border px-3 py-1.5 text-sm w-72 bg-white"
        />
        <button
          type="submit"
          className="rounded bg-slate-800 px-4 py-1.5 text-sm text-white"
        >
          Cari
        </button>
        {cari && (
          <Link
            href="/admin"
            className="rounded border px-3 py-1.5 text-sm text-slate-600 flex items-center"
          >
            Reset
          </Link>
        )}
      </form>

      {typeof info === "string" && (
        <p className="mb-3 rounded bg-green-100 px-3 py-2 text-green-800">
          {info}
        </p>
      )}
      {typeof galat === "string" && (
        <p className="mb-3 rounded bg-red-100 px-3 py-2 text-red-800">
          {galat}
        </p>
      )}

      <table className="w-full rounded-xl border bg-white text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">Event</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Terisi</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-slate-500">
                Tidak ada event ditemukan.
              </td>
            </tr>
          ) : (
            events.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-2">{e.judul}</td>
                <td className="p-2">{e.tanggal}</td>
                <td className="p-2">{rupiah(e.harga)}</td>
                <td className="p-2">
                  {e.terisi}/{e.kuota}
                </td>
                <td className="flex gap-3 p-2">
                  <Link
                    href={`/admin/${e.id}/ubah`}
                    className="text-blue-600 underline"
                  >
                    Ubah
                  </Link>
                  <form action={hapusEvent}>
                    <input type="hidden" name="id" value={e.id} />
                    <TombolHapus />
                  </form>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
