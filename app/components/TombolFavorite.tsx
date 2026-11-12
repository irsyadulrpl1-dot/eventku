"use client";

import { useState } from "react";
import { saveFavoriteIds, useFavoriteIds } from "@/lib/favorites";
import Ikon from "./Ikon";

export default function TombolFavorite({ eventId }: { eventId: number }) {
  const { ids, error: storageError } = useFavoriteIds();
  const [error, setError] = useState("");
  const favorit = ids.includes(eventId);

  function toggleFavorit() {
    try {
      if (storageError) throw new Error(storageError);
      const next = favorit
        ? ids.filter((id) => id !== eventId)
        : [...ids, eventId];
      saveFavoriteIds(next);
      setError("");
    } catch {
      setError("Favorit tidak dapat diperbarui. Periksa penyimpanan browser.");
    }
  }

  return (
    <span className="favorite-control">
      <button
        type="button"
        className={`favorite-button${favorit ? " is-favorite" : ""}`}
        aria-label={favorit ? "Hapus dari favorit" : "Tambahkan ke favorit"}
        aria-pressed={favorit}
        onClick={toggleFavorit}
      >
        <Ikon nama="heart" />
      </button>
      {(error || storageError) && (
        <span className="favorite-error" role="alert">
          {error || storageError}
        </span>
      )}
    </span>
  );
}
