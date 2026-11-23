"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function batalkanPesanan(formData: FormData) {
  const nomor = Number(formData.get("nomor"));
  if (!Number.isInteger(nomor)) return;
  const supabaseAdmin = getSupabaseAdmin();

  // Ambil data pesanan dulu untuk mengembalikan kuota event
  const { data: pesanan } = await supabaseAdmin
    .from("pesanan")
    .select("event_id, jumlah_tiket")
    .eq("nomor", nomor)
    .single();

  if (pesanan) {
    // Ambil data event saat ini untuk menghitung ulang nilai 'terisi'
    const { data: event } = await supabaseAdmin
      .from("events")
      .select("terisi")
      .eq("id", pesanan.event_id)
      .single();

    if (event) {
      const terisiBaru = Math.max(
        0,
        event.terisi - pesanan.jumlah_tiket,
      );
      await supabaseAdmin
        .from("events")
        .update({ terisi: terisiBaru })
        .eq("id", pesanan.event_id);
    }
  }

  // Hapus data pesanan dari database
  await supabaseAdmin.from("pesanan").delete().eq("nomor", nomor);

  // Segarkan halaman pesanan agar data ter-update otomatis
  revalidatePath("/pesanan");
}
