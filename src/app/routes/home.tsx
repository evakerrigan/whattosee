import { Link } from 'react-router-dom';
import { MovieGrid, useMovies } from '@/features/movies';
import { HealingCard, useHealings } from '@/features/healing';
import styles from './home.module.scss';

export const HomeRoute = () => {
  const { data: movies } = useMovies({});
  const { data: healings } = useHealings();

  const featured = movies?.slice(0, 6);
  const healingTeaser = healings?.slice(0, 3);

  return (
    <div>
      <section className={styles.hero}>
        <p className={styles.hero__kicker}>кино не для всех</p>
        <h1 className={styles.hero__title}>
          Особенные фильмы, проверенные лично
        </h1>
        <p className={styles.hero__lead}>
          Непопсовая авторская подборка. Никакого мейнстрима — только то, что
          оставляет след и просит пересмотра.
        </p>
        <div className={styles.hero__actions}>
          <Link to="/movies" className={`${styles.btn} ${styles.btnPrimary}`}>
            Смотреть каталог
          </Link>
          <Link to="/healing" className={`${styles.btn} ${styles.btnGhost}`}>
            Лечебник
          </Link>
        </div>
      </section>

      {featured && featured.length > 0 && (
        <section className={styles.section}>
          <div className={styles.section__head}>
            <h2>Из подборки</h2>
            <Link to="/movies" className={styles.more}>
              весь каталог →
            </Link>
          </div>
          <MovieGrid movies={featured} />
        </section>
      )}

      {healingTeaser && healingTeaser.length > 0 && (
        <section className={styles.section}>
          <div className={styles.section__head}>
            <h2>Кино как терапия</h2>
            <Link to="/healing" className={styles.more}>
              весь лечебник →
            </Link>
          </div>
          <div className={styles.healingGrid}>
            {healingTeaser.map((healing) => (
              <HealingCard key={healing.slug} healing={healing} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
