"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";
import crypto from "crypto";

export type HasilMasuk = { pesan: string };

export async function masuk(
  _sebelum: HasilMasuk,
  formData: FormData,
): Promise<HasilMasuk> {
  const cookieStore = await cookies();

  // --- TANTANGAN 1: Batasi Percobaan Login (Maksimal 5 Kali Salah / Blokir 1 Menit) ---
  const jumlahGagalStr = cookieStore.get("percobaan_gagal")?.value;
  const waktuBlokirStr = cookieStore.get("waktu_blokir")?.value;
  const sekarang = Date.now();

  if (waktuBlokirStr && sekarang < Number(waktuBlokirStr)) {
    const sisaDetik = Math.ceil((Number(waktuBlokirStr) - sekarang) / 1000);
    return {
      pesan: `Terlalu banyak percobaan salah. Coba lagi dalam ${sisaDetik} detik.`,
    };
  }
  // ---------------------------------------------------------------------------------

  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");

  const sandiAdmin = process.env.ADMIN_PASSWORD ?? "";

  // --- TANTANGAN 2: Mencegah Timing Attack menggunakan crypto.timingSafeEqual ---
  // Pastikan panjang buffer sama agar tidak error saat dibandingkan
  const bufSandiInput = Buffer.from(sandi);
  const bufSandiAdmin = Buffer.from(sandiAdmin);

  let sandiCocok = false;
  if (bufSandiInput.length === bufSandiAdmin.length) {
    sandiCocok = crypto.timingSafeEqual(bufSandiInput, bufSandiAdmin);
  }
  // ---------------------------------------------------------------------------------

  if (!sandiCocok) {
    // Logika Hitung Percobaan Gagal (Tantangan 1)
    const percobaanBaru = (jumlahGagalStr ? Number(jumlahGagalStr) : 0) + 1;

    if (percobaanBaru >= 5) {
      // Blokir selama 1 menit (60000 ms)
      cookieStore.set("waktu_blokir", String(sekarang + 60000), {
        httpOnly: true,
        path: "/",
      });
      cookieStore.set("percobaan_gagal", "0", { httpOnly: true, path: "/" });
      return {
        pesan: "Terlalu banyak percobaan salah. Akun dikunci selama 1 menit.",
      };
    } else {
      cookieStore.set("percobaan_gagal", String(percobaanBaru), {
        httpOnly: true,
        path: "/",
      });
      return {
        pesan: `Kata sandi salah. Percobaan ke-${percobaanBaru} dari 5.`,
      };
    }
  }

  // Jika Berhasil Login, bersihkan penalti percobaan gagal
  cookieStore.delete("percobaan_gagal");
  cookieStore.delete("waktu_blokir");

  cookieStore.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}
