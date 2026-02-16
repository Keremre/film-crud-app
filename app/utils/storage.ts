import type { Film } from "../types/film";

const STORAGE_KEY = "remix-films-data";

// LocalStorage'dan filmleri al
export function getStoredFilms(): Film[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("LocalStorage okuma hatası:", error);
    return [];
  }
}

// LocalStorage'a filmleri kaydet
export function saveFilmsToStorage(films: Film[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films));
  } catch (error) {
    console.error("LocalStorage yazma hatası:", error);
  }
}

// Yeni film ID'si oluştur
export function generateFilmId(films: Film[]): number {
  if (films.length === 0) return 1;
  return Math.max(...films.map((f) => f.id)) + 1;
}

// LocalStorage'dan tek film sil
export function removeFilmFromStorage(filmId: number): Film[] {
  const films = getStoredFilms();
  const filteredFilms = films.filter((f) => f.id !== filmId);
  saveFilmsToStorage(filteredFilms);
  return filteredFilms;
}

// Film güncelle
export function updateFilmInStorage(
  filmId: number,
  updatedData: Partial<Film>
): Film[] {
  const films = getStoredFilms();
  const updatedFilms = films.map((f) =>
    f.id === filmId ? { ...f, ...updatedData } : f
  );
  saveFilmsToStorage(updatedFilms);
  return updatedFilms;
}

// LocalStorage'ı temizle
export function clearStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
