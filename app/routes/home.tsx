import type { Route } from "./+types/home";
import { useFilms } from "../hooks/useFilms";
import { FilmForm } from "../components/FilmForm";
import { FilmList } from "../components/FilmList";
import "../styles/global.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Film Yönetim Sistemi" },
    { name: "description", content: "Film ekleme, listeleme, güncelleme ve silme işlemleri" },
  ];
}

export default function Home() {
  const {
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
  } = useFilms();

  const handleFormSubmit = (formData: any) => {
    if (editingFilm) {
      updateFilm(editingFilm.id, formData);
    } else {
      addFilm(formData);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🎬 Film Yönetim Sistemi</h1>
        <p>Film ekleme, listeleme, güncelleme ve silme işlemleri</p>
      </header>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="number">{films.length}</div>
          <div className="label">Toplam Film</div>
        </div>
        <div className="stat-card">
          <div className="number">{demoCount}</div>
          <div className="label">Demo Filmleri</div>
        </div>
        <div className="stat-card">
          <div className="number">{localCount}</div>
          <div className="label">Eklenen Filmler</div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className="btn btn-secondary"
          onClick={refreshFromDemo}
          disabled={loading}
        >
          🔄 Demo Filmler (Sıfırla)
        </button>
        {editingFilm && (
          <button
            className="btn btn-secondary"
            onClick={() => setEditingFilm(null)}
          >
            ✕ Düzenlemeyi İptal Et
          </button>
        )}
      </div>

      {/* Form */}
      <FilmForm onSubmit={handleFormSubmit} editingFilm={editingFilm} />

      {/* Status Messages */}
      {loading && (
        <div className="status loading">
          ⏳ Yükleniyor...
        </div>
      )}

      {error && (
        <div className="status error">
          ❌ Hata: {error}
        </div>
      )}

      {/* Film List */}
      <h2 style={{ marginBottom: "20px", color: "white", fontSize: "1.5rem" }}>
        🎥 Film Listesi ({films.length})
      </h2>
      <FilmList
        films={films}
        onDelete={deleteFilm}
        onEdit={(film) => setEditingFilm(film)}
      />

      {/* Footer */}
      <footer>
        <p>
          📦 Veriler LocalStorage'da saklanır | 🎬 Film Yönetim Sistemi
        </p>
        <p style={{ marginTop: "10px", fontSize: "0.85rem" }}>
          React + TypeScript + Pure CSS | Netlify'da Deploy Edildi
        </p>
      </footer>
    </div>
  );
}
