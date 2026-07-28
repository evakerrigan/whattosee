import { Link, useParams } from 'react-router-dom';
import { useMovie } from '@/features/movies';
import styles from './movie.module.scss';

export const MovieRoute = () => {
  const { id = '' } = useParams();
  const { data: movie, isLoading, isError } = useMovie(id);

  if (isLoading) {
    return <p className={styles.status}>Загрузка…</p>;
  }

  if (isError || !movie) {
    return (
      <div className={styles.status}>
        <p>Фильм не найден.</p>
        <Link to="/movies" className={styles.back}>
          ← В каталог
        </Link>
      </div>
    );
  }

  return (
    <article className={styles.movie}>
      <Link to="/movies" className={styles.back}>
        ← В каталог
      </Link>

      <div className={styles.layout}>
        <div className={styles.posterCol}>
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className={styles.poster}
            />
          ) : (
            <div className={styles.posterFallback}>
              <span>{movie.title}</span>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.originalTitle && (
            <p className={styles.original}>
              {movie.originalTitle}
              {movie.year != null ? `, ${movie.year}` : ''}
            </p>
          )}

          <div className={styles.ratings}>
            {movie.imdbRating != null && (
              <span className={styles.imdb}>
                IMDb {movie.imdbRating.toFixed(1)}
              </span>
            )}
            {movie.otherRating != null && (
              <span className={styles.other}>
                {movie.otherRatingSource ?? 'Рейтинг'}{' '}
                {movie.otherRating.toFixed(1)}
              </span>
            )}
          </div>

          <div className={styles.tags}>
            {movie.country && (
              <span className={styles.tag}>{movie.country.name}</span>
            )}
            {movie.genres.map((genre) => (
              <span key={genre.slug} className={styles.tag}>
                {genre.name}
              </span>
            ))}
          </div>

          {movie.healings.length > 0 && (
            <div className={styles.healings}>
              {movie.healings.map((healing) => (
                <Link
                  key={healing.slug}
                  to={`/healing/${healing.slug}`}
                  className={styles.healing}
                >
                  {healing.title}
                </Link>
              ))}
            </div>
          )}

          <section className={styles.block}>
            <h2>О фильме</h2>
            <p>{movie.description}</p>
          </section>

          <section className={styles.block}>
            <h2>Моя рецензия</h2>
            <p>{movie.review}</p>
          </section>
        </div>
      </div>
    </article>
  );
};
