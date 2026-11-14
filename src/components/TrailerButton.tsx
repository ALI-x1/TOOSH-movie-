import React from 'react';
import { Movie } from '../types/movie';
import { buildNativeMeta, findTrailerUrl, getMovieTitle } from '../utils/media';

interface TrailerButtonProps {
  movie: Movie;
  linksData?: unknown;
  onPlayTrailer: (url: string, title: string) => void;
}

export const TrailerButton: React.FC<TrailerButtonProps> = ({
  movie,
  linksData,
  onPlayTrailer,
}) => {
  const url = findTrailerUrl(movie, linksData);
  if (!url) return null;

  const title = `پیش‌نمایش · ${getMovieTitle(movie)}`;

  const handleClick = () => {
    if (window.AndroidPlayer?.playNativeEx) {
      window.AndroidPlayer.playNativeEx(
        url,
        title,
        buildNativeMeta(movie, { isTrailer: true })
      );
    } else if (window.AndroidPlayer?.playNative) {
      window.AndroidPlayer.playNative(url, title);
    } else {
      onPlayTrailer(url, title);
    }
  };

  return (
    <button type="button" className="tm-trailer" onClick={handleClick}>
      <span className="tm-ic tm-ic-trailer" aria-hidden="true" />
      <span>تماشای پیش‌نمایش</span>
    </button>
  );
};
