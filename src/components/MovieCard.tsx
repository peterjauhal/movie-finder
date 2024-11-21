import { Movie } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { format } from 'date-fns';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-w-2 aspect-h-3 relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded text-sm font-medium">
          ★ {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'Release date unknown'}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}
