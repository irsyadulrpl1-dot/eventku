import { getSupabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/Data/events";
import type { Pesanan } from "@/Data/pesanan";

type PesananQueryRow = Omit<Pesanan, "events"> & {
  events: { judul: string } | { judul: string }[] | null;
};

export async function ambilEvents(): Promise<Event[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  if (!Number.isInteger(id)) return null;
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Menghitung jumlah pesanan dan total tiket yang dipesan
export async function hitungPesanan(
  eventId: number,
): Promise<{ totalPesanan: number; totalTiket: number }> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah_tiket")
    .eq("event_id", eventId)
    .overrideTypes<{ jumlah_tiket: number | null }[], { merge: false }>();
  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);

  const totalPesanan = data.length;
  const totalTiket = data.reduce<number>(
    (acc, curr) => acc + (curr.jumlah_tiket || 0),
    0,
  );

  return { totalPesanan, totalTiket };
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("nomor, event_id, nama_pemesan, email, jumlah_tiket, total_harga, dibuat, events(judul)")
    .order("nomor", { ascending: false })
    .overrideTypes<PesananQueryRow[], { merge: false }>();
  if (error) throw new Error("Gagal memuat pesanan: " + error.message);
  return data.map((item) => ({
    nomor: item.nomor,
    event_id: item.event_id,
    nama_pemesan: item.nama_pemesan,
    email: item.email,
    jumlah_tiket: item.jumlah_tiket,
    total_harga: item.total_harga,
    dibuat: item.dibuat,
    events: Array.isArray(item.events)
      ? item.events[0] ?? null
      : item.events,
  })) as Pesanan[];
}
