import axios from "axios";
import type { Film } from "../types/film";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "7b3b0f2e"; // Demo API Key

// OMDB API'den filmler ara
export async function searchFilmsFromAPI(query: string): Promise<Film[]> {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: "movie",
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }

    // API verisini bizim Film tipimize dönüştür
    const films: Film[] = (response.data.Search || []).map((apiFilm: any) => ({
      id: Math.random() * 10000,
      title: apiFilm.Title,
      director: "Bilinmiyor",
      year: parseInt(apiFilm.Year) || new Date().getFullYear(),
      genre: "Bilinmiyor",
      rating: 0,
      description: `Yıl: ${apiFilm.Year}`,
      isLocal: false,
    }));

    return films;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Hatası: ${error.message}`);
    }
    throw new Error("Beklenmeyen bir hata oluştu");
  }
}

// Örnek filmler (demo amaçlı)
export function getDemoFilms(): Film[] {
  return [
    {
      id: 1,
      title: "Şeytanın Avukatı",
      director: "Taylor Hackford",
      year: 1997,
      genre: "Dram",
      rating: 8.6,
      description: "Başarılı bir avukatın karanlık bir cinayetle ilgili soruşturması",
      isLocal: false,
    },
    {
      id: 2,
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      year: 1994,
      genre: "Dram/Komedi",
      rating: 8.8,
      description: "Bir adamın olağanüstü yaşam yolculuğu",
      isLocal: false,
    },
    {
      id: 3,
      title: "Kurtlar Vadisi: Irak",
      director: "Serdar Akar",
      year: 2006,
      genre: "Aksiyon/Dram",
      rating: 8.3,
      description: "Türk askerlerinin iç savaş bölgesindeki görevi",
      isLocal: false,
    },
    {
      id: 4,
      title: "İçerideki Hayat",
      director: "Frank Darabont",
      year: 1994,
      genre: "Dram",
      rating: 9.3,
      description: "Hapisteki iki mahkûmun dostluğu ve umut hikâyesi",
      isLocal: false,
    },
    {
      id: 5,
      title: "Esaretin Bedeli",
      director: "Frank Darabont",
      year: 1994,
      genre: "Dram",
      rating: 9.3,
      description: "Uzun cezaevinde beş on yıl hapis yatan mahkûmlar",
      isLocal: false,
    },
    {
      id: 6,
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      genre: "Bilim Kurgu/Dram",
      rating: 8.6,
      description: "Gelecekteki insanlığı kurtarmak için uzay yolculuğu",
      isLocal: false,
    },
    {
      id: 7,
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      genre: "Bilim Kurgu/Aksiyon",
      rating: 8.8,
      description: "Rüyaların içinde rüya görme maceraları",
      isLocal: false,
    },
    {
      id: 8,
      title: "Yüzüklerin Efendisi: Yüzüğün Birliği",
      director: "Peter Jackson",
      year: 2001,
      genre: "Fantezi/Macera",
      rating: 8.9,
      description: "Mittir'in büyülü yüzüğü kötülüğün kaynağına götürme maceraları",
      isLocal: false,
    },
    {
      id: 9,
      title: "Ölüm Saati",
      director: "Quentin Tarantino",
      year: 1994,
      genre: "Suç/Dram",
      rating: 8.9,
      description: "Los Angeles'ta çeşitli karakterlerin kaderlerinin kesişmesi",
      isLocal: false,
    },
    {
      id: 10,
      title: "Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      year: 1999,
      genre: "Bilim Kurgu/Aksiyon",
      rating: 8.7,
      description: "Sanal dünyada gerçekliğin doğruluğunu sorgulayan kahraman",
      isLocal: false,
    },
  ];
}
