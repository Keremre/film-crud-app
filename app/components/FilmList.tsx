import type { Film } from "../types/film";
import { FilmCard } from "./FilmCard";

interface FilmListProps {
  films: Film[];
  onDelete: (filmId: number) => void;
  onEdit: (film: Film) => void;
}

export function FilmList({ films, onDelete, onEdit }: FilmListProps) {
  if (films.length === 0) {
    return (
      <div className="empty-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 4v16m10-16v16M3 8h18M3 16h18"
          />
        </svg>
        <h3>Henüz film yok</h3>
        <p>Yukarıdaki formu kullanarak yeni film ekleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="film-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
