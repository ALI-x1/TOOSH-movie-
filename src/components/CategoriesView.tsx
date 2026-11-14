import React from 'react';
import { Country, Genre, Star } from '../types/movie';
import { cleanTitle, resolveMediaUrl } from '../utils/media';

interface CategoriesViewProps {
  countries: Country[];
  genres: Genre[];
  stars: Star[];
  onSelectGenre: (genre: Genre) => void;
  onSelectCountry: (country: Country) => void;
  onSelectStar: (star: Star) => void;
  onOpenAllCountries: () => void;
  onOpenAllStars: () => void;
}

const GENRE_ACCENTS = ['#ee3b17', '#ffd60a', '#0ea5c6', '#0f9d63', '#8b5cf6', '#e08a00'];

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  countries,
  genres,
  stars,
  onSelectGenre,
  onSelectCountry,
  onSelectStar,
  onOpenAllCountries,
  onOpenAllStars,
}) => {
  return (
    <div className="pb-12">
      {countries.length > 0 && (
        <>
          <div className="tm-cats-top">
            <h2 className="tm-cats-h2">
              <span className="tm-ic tm-ic-globe" />
              <span>کشورهای سازنده</span>
            </h2>
            <button type="button" className="tm-cats-c" onClick={onOpenAllCountries}>
              <span>همه</span>
              <span className="tm-ic tm-ic-chev" />
            </button>
          </div>
          <div className="tm-cc-row no-scrollbar">
            {countries.slice(0, 18).map((c, i) => {
              const name = cleanTitle(c.name || c.title || '');
              const img = resolveMediaUrl(c.image);
              return (
                <button
                  key={`${c.id || i}`}
                  type="button"
                  className="tm-cc"
                  onClick={() => onSelectCountry(c)}
                >
                  <div className="tm-cc-a">
                    {img ? (
                      <img src={img} alt={name} loading="lazy" />
                    ) : (
                      <span className="tm-ic tm-ic-globe" />
                    )}
                  </div>
                  <span className="tm-cc-t">{name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {stars.length > 0 && (
        <>
          <div className="tm-cats-top">
            <h2 className="tm-cats-h2">
              <span className="tm-ic tm-ic-star" />
              <span>ستاره‌ها و هنرمندان</span>
            </h2>
            <button type="button" className="tm-cats-c" onClick={onOpenAllStars}>
              <span>همه</span>
              <span className="tm-ic tm-ic-chev" />
            </button>
          </div>
          <div className="tm-cc-row no-scrollbar">
            {stars.slice(0, 20).map((s, i) => {
              const name = cleanTitle(s.name || s.title || '');
              const img = resolveMediaUrl(s.image);
              return (
                <button
                  key={`${s.id || s.star_id || i}`}
                  type="button"
                  className="tm-cc"
                  onClick={() => onSelectStar(s)}
                >
                  <div className="tm-cc-a">
                    {img ? (
                      <img src={img} alt={name} loading="lazy" />
                    ) : (
                      <span className="tm-ic tm-ic-user" />
                    )}
                  </div>
                  <span className="tm-cc-t">{name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="tm-cats-top">
        <h2 className="tm-cats-h2">
          <span className="tm-ic tm-ic-grid" />
          <span>ژانرها</span>
        </h2>
      </div>

      {genres.length === 0 ? (
        <div className="tm-empty">ژانری یافت نشد</div>
      ) : (
        <div className="tm-cats-grid">
          {genres.map((g, i) => {
            const name = cleanTitle(g.name || g.title || '');
            const color = GENRE_ACCENTS[i % GENRE_ACCENTS.length];
            return (
              <button
                key={`${g.id || i}`}
                type="button"
                className="tm-cat"
                style={{ '--i': i, '--c': color } as React.CSSProperties}
                onClick={() => onSelectGenre(g)}
              >
                <span className="tm-cat-b" />
                <span className="tm-cat-t">{name}</span>
                <span className="tm-ic tm-ic-chev" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
