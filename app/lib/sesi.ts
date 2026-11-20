import { cookies } from "next/headers";
import { connection } from "next/server";

export const NAMA_COOKIE = "sesi_admin";
export const UMUR_SESI = 60 * 60 * 24; // 1 hari dalam detik

const RAHASIA =
  process.env.SESSION_SECRET || "kunci-rahasia-default-yang-panjang";

export async function tandatangani(pesan: string): Promise<string> {
  const enc = new TextEncoder();
  const kunciBahan = await crypto.subtle.importKey(
    "raw",
    enc.encode(RAHASIA),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const tandaBahan = await crypto.subtle.sign(
    "HMAC",
    kunciBahan,
    enc.encode(pesan),
  );
  return Array.from(new Uint8Array(tandaBahan))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function buatToken(): Promise<string> {
  const habis = Date.now() + UMUR_SESI * 1000;
  const tanda = await tandatangani(String(habis));
  return `${habis}.${tanda}`;
}

export async function tokenSah(token?: string): Promise<boolean> {
  await connection(); // Wajib agar Next.js tahu fungsi ini dinamis pada saat request

  if (!token) return false;
  const [habis, tanda] = token.split(".");
  if (!habis || !tanda) return false;
  if (!(Number(habis) > Date.now())) return false; // sudah kedaluwarsa atau bukan angka
  return tanda === (await tandatangani(habis));
}

export async function pastikanAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(NAMA_COOKIE)?.value;
  if (!(await tokenSah(token))) {
    throw new Error("Tidak sah");
  }
}
