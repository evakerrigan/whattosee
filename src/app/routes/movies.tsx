import { useSearchParams } from 'react-router-dom';
import {
  MovieFilters,
  MovieGrid,
  useMovies,
  type MovieFiltersValue,
} from '@/features/movies';
import styles from './movies.module.scss';

export const MoviesRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get('genre') ?? undefined;
  const country = searchParams.get('country') ?? undefined;

  const { data: movies, isLoading, isError } = useMovies({ genre, country });

  const handleChange = (next: MovieFiltersValue) => {
    const params: Record<string, string> = {};
    if (next.genre) params.genre = next.genre;
    if (next.country) params.country = next.country;
    setSearchParams(params);
  };

  return (
    <div>
      <header className={styles.head}>
        <h1>Каталог</h1>
        <p>Непопсовая подборка, проверенная лично.</p>
      </header>

      <MovieFilters value={{ genre, country }} onChange={handleChange} />

      {isLoading && <p className={styles.status}>Загрузка…</p>}
      {isError && <p className={styles.status}>Не удалось загрузить фильмы.</p>}
      {movies && movies.length === 0 && (
        <p className={styles.status}>
          Ничего не найдено — попробуй сбросить фильтры.
        </p>
      )}
      {movies && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
};
