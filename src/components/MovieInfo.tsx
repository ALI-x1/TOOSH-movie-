import React, { useId } from 'react';
import { Movie } from '../types/movie';
import { cleanTitle, getImdbRating, getMovieYear, getPlotText } from '../utils/media';

interface MovieInfoProps {
  movie: Movie;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const moreId = useId();

  const extractList = (key: keyof Movie): string => {
    const val = movie?.[key];
    if (!Array.isArray(val)) return '';
    return val
      .map((item) => {
        if (typeof item === 'string') return cleanTitle(item);
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return cleanTitle(obj.name || obj.title || '');
        }
        return '';
      })
      .filter(Boolean)
      .slice(0, 6)
      .join('، ');
  };

  const director = cleanTitle(movie.director || movie.directors || '');
  const cast = extractList('stars') || extractList('actors') || extractList('cast');
  const genres = extractList('genres');
  const countries = extractList('countries' as keyof Movie) || cleanTitle(movie.country || '');
  const year = getMovieYear(movie);
  const imdb = getImdbRating(movie);
  const duration = cleanTitle(movie.duration || movie.runtime || movie.time || '');
  const age = cleanTitle(movie.age_rating || movie.certification || '');
  const plot = getPlotText(movie);

  const facts: Array<{ label: string; value: string; wide?: boolean }> = [];
  if (genres) facts.push({ label: 'ژانر', value: genres });
  if (countries) facts.push({ label: 'کشور', value: countries });
  if (year) facts.push({ label: 'سال انتشار', value: year });
  if (imdb) facts.push({ label: 'امتیاز IMDb', value: imdb });
  if (duration) facts.push({ label: 'مدت زمان', value: duration });
  if (age) facts.push({ label: 'رده سنی', value: age });
  if (director) facts.push({ label: 'کارگردان', value: director, wide: true });
  if (cast) facts.push({ label: 'بازیگران', value: cast, wide: true });

  return (
    <div className="tm-info">
      {facts.length > 0 && (
        <dl className="tm-facts">
          {facts.map((f) => (
            <div key={f.label} className={`tm-fact${f.wide ? ' tm-fact-wide' : ''}`}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="tm-plot">
        <span className="tm-plot-label">خلاصه داستان</span>
        <input id={moreId} type="checkbox" className="tm-more" />
        <p className="tm-plot-text tm-clamp">{plot}</p>
        {plot.length > 160 && <label htmlFor={moreId} className="tm-more-btn" />}
      </div>
    </div>
  );
};
