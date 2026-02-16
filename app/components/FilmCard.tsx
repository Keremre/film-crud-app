import type { Film } from "../types/film";

interface FilmCardProps {
  film: Film;
  onDelete: (filmId: number) => void;
  onEdit: (film: Film) => void;
}

export function FilmCard({ film, onDelete, onEdit }: FilmCardProps) {
  const handleDelete = () => {
    if (confirm(`"${film.title}" filmini silmek istediğinize emin misiniz?`)) {
      onDelete(film.id);
    }
  };

  const getStarRating = (rating: number) => {
    const stars = Math.round(rating / 2); // 10'dan 5'e çevir
    return "⭐".repeat(stars);
  };

  return (
    <div className="film-card">
      <div className="film-info">
        <h3>
          {film.title}
          {film.isLocal && <span className="badge badge-local">LOKAL</span>}
        </h3>
        <div className="film-meta">
          <p>
            <strong>Yönetmen:</strong> {film.director}
          </p>
          <p>
            <strong>Yıl:</strong> {film.year}
          </p>
          <p>
            <strong>Tür:</strong> {film.genre || "Bilinmiyor"}
          </p>
        </div>
        <div className="film-rating">
          <span className="stars">{getStarRating(film.rating)}</span>
          <span className="score">{film.rating.toFixed(1)}/10</span>
        </div>
        {film.description && (
          <p className="film-description">{film.description}</p>
        )}
      </div>
      <div className="film-actions">
        <button className="btn btn-warning" onClick={() => onEdit(film)}>
          ✏️ Düzenle
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}
