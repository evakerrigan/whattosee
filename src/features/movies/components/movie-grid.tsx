import type { MovieCard as MovieCardType } from '@/types/movie';
import { MovieCard } from './movie-card';
import styles from './movie-grid.module.scss';

type MovieGridProps = {
  movies: MovieCardType[];
};

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
