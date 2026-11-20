"use client";

export default function TombolHapus() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
          e.preventDefault();
        }
      }}
      className="text-red-600 underline cursor-pointer"
    >
      Hapus
    </button>
  );
}
