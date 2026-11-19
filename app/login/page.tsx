import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, tokenSah } from "@/lib/sesi";
import FormMasuk from "@/components/FormMasuk";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Masuk Admin" };

async function IsiLogin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { dari } = await searchParams;
  // sudah masuk? tidak perlu melihat formulir lagi
  if (await tokenSah((await cookies()).get(NAMA_COOKIE)?.value))
    redirect("/admin");
  return <FormMasuk dari={typeof dari === "string" ? dari : "/admin"} />;
}

export default function Login({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-sm rounded-xl border bg-white p-6">
          Memeriksa sesi...
        </div>
      }
    >
      <IsiLogin searchParams={searchParams} />
    </Suspense>
  );
}
