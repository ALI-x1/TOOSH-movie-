import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';
import {
  getImdbRating,
  getMovieTitle,
  getMovieType,
  getMovieYear,
  getPosterUrl,
  POSTER_FALLBACK_SVG,
} from '../utils/media';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie, onClick }) => {
  const title = getMovieTitle(movie);
  const year = getMovieYear(movie);
  const rating = getImdbRating(movie);
  const poster = getPosterUrl(movie);
  const isSeries = getMovieType(movie) === 'series';

  return (
    <button
      type="button"
      onClick={() => onClick(movie)}
      className="group relative flex flex-col w-full text-right rounded-2xl overflow-hidden card-hover focus:outline-none cursor-pointer"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = POSTER_FALLBACK_SVG;
          }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)' }}
        />
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-black/80 text-[10px] font-extrabold text-amber-400 border border-white/10">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        )}
        {isSeries && (
          <div
            className="absolute top-2 left-2 px-1.5 py-0.5 rounded-lg text-[9px] font-black text-white"
            style={{ backgroundColor: 'rgba(238,59,23,0.95)' }}
          >
            سریال
          </div>
        )}
        <div className="absolute bottom-0 inset-x-0 p-2.5">
          <h3 className="text-[12px] sm:text-xs font-extrabold text-white line-clamp-2 leading-tight drop-shadow">
            {title}
          </h3>
          {year && (
            <p className="text-[10px] text-white/75 mt-1 font-medium">{year}</p>
          )}
        </div>
      </div>
    </button>
  );
});

MovieCard.displayName = 'MovieCard';
