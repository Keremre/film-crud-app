import { useState, useEffect } from "react";
import type { FilmFormData, Film } from "../types/film";

interface FilmFormProps {
  onSubmit: (data: FilmFormData) => void;
  editingFilm?: Film | null;
}

const initialFormData: FilmFormData = {
  title: "",
  director: "",
  year: new Date().getFullYear(),
  genre: "",
  rating: 7,
  description: "",
};

export function FilmForm({ onSubmit, editingFilm }: FilmFormProps) {
  const [formData, setFormData] = useState<FilmFormData>(
    editingFilm
      ? {
          title: editingFilm.title,
          director: editingFilm.director,
          year: editingFilm.year,
          genre: editingFilm.genre,
          rating: editingFilm.rating,
          description: editingFilm.description,
        }
      : initialFormData,
  );

  // Düzenlenecek film değiştiğinde form alanlarını güncelle
  useEffect(() => {
    if (editingFilm) {
      setFormData({
        title: editingFilm.title,
        director: editingFilm.director,
        year: editingFilm.year,
        genre: editingFilm.genre,
        rating: editingFilm.rating,
        description: editingFilm.description,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingFilm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "rating" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.director.trim()) {
      alert("Film Adı ve Yönetmen alanları zorunludur!");
      return;
    }

    if (formData.year < 1800 || formData.year > new Date().getFullYear()) {
      alert("Geçerli bir yıl giriniz!");
      return;
    }

    if (formData.rating < 1 || formData.rating > 10) {
      alert("Puan 1-10 arasında olmalıdır!");
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <div className="form-container">
      <h2>{editingFilm ? "✏️ Filmi Güncelle" : "➕ Yeni Film Ekle"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Film Adı *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Örn: Şeytanın Avukatı"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="director">Yönetmen *</label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              placeholder="Örn: Taylor Hackford"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Yıl</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Tür</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Örn: Dram, Korku"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Puan (1-10)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="10"
              step="0.1"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Açıklama</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Film hakkında bilgi..."
            rows={3}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingFilm ? "Güncelle" : "Film Ekle"}
        </button>
      </form>
    </div>
  );
}
