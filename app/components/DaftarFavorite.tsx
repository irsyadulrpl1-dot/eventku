"use client";

import Link from "next/link";
import { useState } from "react";
import { events } from "@/Data/events";
import { saveFavoriteIds, useFavoriteIds } from "@/lib/favorites";
import Ikon from "./Ikon";
import KartuEvent from "./KartuEvent";

export default function DaftarFavorite() {
  const { ids: favoriteIds, error: storageError } = useFavoriteIds();
  const [error, setError] = useState("");

  const favoriteEvents = events.filter((event) =>
    favoriteIds.includes(event.id),
  );

  function hapusSemua() {
    try {
      saveFavoriteIds([]);
      setError("");
    } catch {
      setError("Favorit tidak dapat diperbarui. Periksa penyimpanan browser.");
    }
  }

  return (
    <section>
      {(error || storageError) && (
        <p className="form-message error" role="alert">
          {error || storageError}
        </p>
      )}
      {favoriteEvents.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">
            <Ikon nama="heart" />
          </span>
          <h2>Belum ada event favorit</h2>
          <p>Simpan event yang menarik agar mudah ditemukan lagi.</p>
          <Link className="button button-primary" href="/event">
            Jelajahi event
          </Link>
        </div>
      ) : (
        <>
          <div className="favorite-list-heading">
            <p>{favoriteEvents.length} event tersimpan di browser ini</p>
            <button type="button" className="text-button" onClick={hapusSemua}>
              Hapus semua
            </button>
          </div>
          <div className="event-grid">
            {favoriteEvents.map((event) => (
              <KartuEvent key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
