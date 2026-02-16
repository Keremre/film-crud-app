import { useState, useEffect, useCallback } from "react";
import type { Film, FilmFormData } from "../types/film";
import { getDemoFilms } from "../utils/api";
import {
  getStoredFilms,
  saveFilmsToStorage,
  generateFilmId,
  updateFilmInStorage,
} from "../utils/storage";

interface UseFilmsReturn {
  films: Film[];
  loading: boolean;
  error: string | null;
  addFilm: (formData: FilmFormData) => void;
  deleteFilm: (filmId: number) => void;
  updateFilm: (filmId: number, formData: FilmFormData) => void;
  refreshFromDemo: () => void;
  localCount: number;
  demoCount: number;
  editingFilm: Film | null;
  setEditingFilm: (film: Film | null) => void;
}

export function useFilms(): UseFilmsReturn {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  // Sayfa yüklendiğinde LocalStorage'dan veya Demo filmlerinden veri al
  useEffect(() => {
    const loadFilms = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedFilms = getStoredFilms();

        if (storedFilms.length > 0) {
          setFilms(storedFilms);
          console.log("📦 LocalStorage'dan yüklendi:", storedFilms.length, "film");
        } else {
          const demoFilms = getDemoFilms();
          setFilms(demoFilms);
          saveFilmsToStorage(demoFilms);
          console.log("🎬 Demo filmler yüklendi:", demoFilms.length, "film");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Veri yüklenirken hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
  }, []);

  // Yeni film ekle
  const addFilm = useCallback(
    (formData: FilmFormData) => {
      const newFilm: Film = {
        id: generateFilmId(films),
        ...formData,
        isLocal: true,
      };

      const updatedFilms = [...films, newFilm];
      setFilms(updatedFilms);
      saveFilmsToStorage(updatedFilms);
      console.log("➕ Yeni film eklendi:", newFilm.title);
    },
    [films]
  );

  // Film sil
  const deleteFilm = useCallback((filmId: number) => {
    const updatedFilms = films.filter((f) => f.id !== filmId);
    setFilms(updatedFilms);
    saveFilmsToStorage(updatedFilms);
    console.log("🗑️ Film silindi, ID:", filmId);
  }, [films]);

  // Film güncelle
  const updateFilm = useCallback(
    (filmId: number, formData: FilmFormData) => {
      const updatedFilms = updateFilmInStorage(filmId, formData);
      setFilms(updatedFilms);
      setEditingFilm(null);
      console.log("✏️ Film güncellendi, ID:", filmId);
    },
    []
  );

  // Demo filmlerden yenile
  const refreshFromDemo = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      const demoFilms = getDemoFilms();
      setFilms(demoFilms);
      saveFilmsToStorage(demoFilms);
      console.log("🔄 Demo filmler yenilendi:", demoFilms.length, "film");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo hatası");
    } finally {
      setLoading(false);
    }
  }, []);

  // İstatistikler
  const localCount = films.filter((f) => f.isLocal).length;
  const demoCount = films.filter((f) => !f.isLocal).length;

  return {
    films,
    loading,
    error,
    addFilm,
    deleteFilm,
    updateFilm,
    refreshFromDemo,
    localCount,
    demoCount,
    editingFilm,
    setEditingFilm,
  };
}
