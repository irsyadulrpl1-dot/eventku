"use client";

import { useSyncExternalStore } from "react";

const storageKey = "eventku-favorites";
const changeEvent = "eventku:favorites-change";

function getSnapshot() {
  try {
    return localStorage.getItem(storageKey) ?? "[]";
  } catch {
    return "STORAGE_UNAVAILABLE";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

export function useFavoriteIds() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");

  try {
    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved) || !saved.every(Number.isInteger)) {
      throw new Error("Format daftar favorit tidak valid.");
    }
    return { ids: saved as number[], error: "" };
  } catch {
    return {
      ids: [] as number[],
      error: "Daftar favorit tidak dapat dibaca dari penyimpanan browser.",
    };
  }
}

export function saveFavoriteIds(ids: number[]) {
  localStorage.setItem(storageKey, JSON.stringify(ids));
  window.dispatchEvent(new Event(changeEvent));
}
