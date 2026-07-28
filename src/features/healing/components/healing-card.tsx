import { Link } from 'react-router-dom';
import type { HealingSummary } from '@/types/movie';
import { plural } from '@/utils/plural';
import styles from './healing-card.module.scss';

type HealingCardProps = {
  healing: HealingSummary;
};

export const HealingCard = ({ healing }: HealingCardProps) => {
  const count = healing._count.movies;

  return (
    <Link to={`/healing/${healing.slug}`} className={styles.card}>
      <h3 className={styles.title}>{healing.title}</h3>
      {healing.description && (
        <p className={styles.description}>{healing.description}</p>
      )}
      <span className={styles.count}>
        {count} {plural(count, ['фильм', 'фильма', 'фильмов'])}
      </span>
    </Link>
  );
};
