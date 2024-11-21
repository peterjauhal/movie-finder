'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import {
  Movie,
  Genre,
  getGenres,
  searchMovies,
  searchPeople,
  getMoviesByActor,
  getMoviesByGenre,
  getMoviesByYear,
} from '@/lib/tmdb';

export default function Home() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        console.log('Loaded genres:', genreList);
        setGenres(genreList);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load genres';
        setError(message);
        console.error('Error loading genres:', err);
      }
    };

    loadGenres();
  }, []);

  const handleSearch = async ({
    query,
    genre,
    actor,
    year,
  }: {
    query: string;
    genre: string;
    actor: string;
    year: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setMovies([]);

      console.log('Search params:', { query, genre, actor, year });

      if (!query && !genre && !actor && !year) {
        setError('Please enter at least one search criteria');
        return;
      }

      let results: Movie[] = [];

      if (actor) {
        const people = await searchPeople(actor);
        console.log('Found people:', people);
        if (people.length > 0) {
          results = await getMoviesByActor(people[0].id);
        }
      } else if (genre) {
        results = await getMoviesByGenre(Number(genre), year);
      } else if (year) {
        results = await getMoviesByYear(year);
      } else if (query) {
        results = await searchMovies(query, year);
      }

      console.log('Search results:', results);
      
      if (results.length === 0) {
        setError('No movies found matching your criteria. Try adjusting your search.');
      } else {
        setMovies(results);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search movies';
      setError(message);
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Movie Finder</h1>
        
        <div className="mb-8">
          <SearchBar genres={genres} onSearch={handleSearch} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
