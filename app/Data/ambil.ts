import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/Data/events";
import type { Pesanan } from "@/Data/pesanan";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
}

export async function ambilTerkait(event: Event): Promise<Event[]> {
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
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("jumlah")
    .eq("event_id", eventId);
  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);

  const totalPesanan = data.length;
  const totalTiket = data.reduce((acc, curr) => acc + (curr.jumlah || 0), 0);

  return { totalPesanan, totalTiket };
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });
  if (error) throw new Error("Gagal memuat pesanan: " + error.message);
  return data as Pesanan[];
}
