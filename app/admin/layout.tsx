import type { Metadata } from "next";
import { keluar } from "@/app/login/actions";
import { pastikanAdmin } from "@/lib/sesi";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin" },
};

async function IsiAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  await pastikanAdmin();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-slate-800 px-4 py-2 text-white">
        <span className="font-semibold">Panel Admin</span>
        <form action={keluar}>
          <button className="text-sm underline">Keluar</button>
        </form>
      </div>
      {children}
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-4">Memeriksa sesi admin...</div>}>
      <IsiAdmin>{children}</IsiAdmin>
    </Suspense>
  );
}
