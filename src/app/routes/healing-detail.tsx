import { Link, useParams } from 'react-router-dom';
import { useHealing } from '@/features/healing';
import { MovieGrid } from '@/features/movies';
import styles from './healing-detail.module.scss';

export const HealingDetailRoute = () => {
  const { slug = '' } = useParams();
  const { data: healing, isLoading, isError } = useHealing(slug);

  if (isLoading) {
    return <p className={styles.status}>Загрузка…</p>;
  }

  if (isError || !healing) {
    return (
      <div className={styles.status}>
        <p>Категория не найдена.</p>
        <Link to="/healing" className={styles.back}>
          ← Все категории
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/healing" className={styles.back}>
        ← Лечебник
      </Link>

      <header className={styles.head}>
        <h1>{healing.title}</h1>
        {healing.description && <p>{healing.description}</p>}
      </header>

      {healing.movies.length > 0 ? (
        <MovieGrid movies={healing.movies} />
      ) : (
        <p className={styles.status}>Пока пусто.</p>
      )}
    </div>
  );
};
