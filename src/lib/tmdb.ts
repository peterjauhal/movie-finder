const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

async function fetchTMDB(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`
    }
  };
  
  try {
    console.log('Fetching:', url);
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      console.error('TMDB API Error:', error);
      throw new Error(error.status_message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function searchMovies(query: string, year?: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  const yearParam = year ? `&primary_release_year=${year}` : '';
  const data = await fetchTMDB(`/search/movie?query=${encodeURIComponent(query)}${yearParam}&include_adult=false&language=en-US&page=1`);
  return data.results || [];
}

export async function getGenres(): Promise<Genre[]> {
  const data = await fetchTMDB('/genre/movie/list?language=en');
  return data.genres || [];
}

export async function searchPeople(query: string): Promise<Actor[]> {
  if (!query.trim()) return [];
  const data = await fetchTMDB(`/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  return data.results || [];
}

export async function getMoviesByActor(actorId: number): Promise<Movie[]> {
  const data = await fetchTMDB(`/discover/movie?with_cast=${actorId}&sort_by=popularity.desc&include_adult=false&language=en-US&page=1`);
  return data.results || [];
}

export async function getMoviesByGenre(genreId: number, year?: string): Promise<Movie[]> {
  const yearParam = year ? `&primary_release_year=${year}` : '';
  const data = await fetchTMDB(`/discover/movie?with_genres=${genreId}${yearParam}&sort_by=popularity.desc&include_adult=false&language=en-US&page=1`);
  return data.results || [];
}

export async function getMoviesByYear(year: string): Promise<Movie[]> {
  const data = await fetchTMDB(`/discover/movie?primary_release_year=${year}&sort_by=popularity.desc&include_adult=false&language=en-US&page=1`);
  return data.results || [];
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
