import { Link } from 'react-router-dom';
import type { MovieCard as MovieCardType } from '@/types/movie';
import styles from './movie-card.module.scss';

type MovieCardProps = {
  movie: MovieCardType;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movies/${movie.id}`} className={styles.card}>
      <div className={styles.poster}>
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
        ) : (
          <div className={styles.posterFallback}>
            <span>{movie.title}</span>
          </div>
        )}
        {movie.imdbRating != null && (
          <span className={styles.imdb}>
            IMDb {movie.imdbRating.toFixed(1)}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          {movie.year != null && <span>{movie.year}</span>}
          {movie.country && <span>{movie.country.name}</span>}
        </div>
        {movie.genres.length > 0 && (
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.slug} className={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
