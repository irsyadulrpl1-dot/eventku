import { createClient } from "@supabase/supabase-js";

// Klien dengan kunci PUBLIK (anon key). Aman dibaca orang lain,
// dan hanya bisa melakukan apa yang diizinkan oleh aturan di database.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
