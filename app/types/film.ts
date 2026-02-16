// Film tipi - API'den gelen ve LocalStorage'da saklanan film yapısı
export interface Film {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number; // 1-10 arası
  description: string;
  isLocal?: boolean; // Film'in manuel mi eklendiğini belirtir
}

// Form verisi tipi
export interface FilmFormData {
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
}
