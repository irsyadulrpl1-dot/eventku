import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) {
    const message = "NEXT_PUBLIC_SUPABASE_URL belum diset di environment";
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  if (!key) {
    const message =
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diset di environment";
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  if (key.startsWith("sb_secret_")) {
    const message =
      "Gunakan publishable/anon key pada NEXT_PUBLIC_SUPABASE_*; secret key hanya boleh digunakan di server.";
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  try {
    client = createClient(url, key);
  } catch (error) {
    console.error("[Supabase] Gagal menginisialisasi client", error);
    throw error;
  }
  return client;
}
