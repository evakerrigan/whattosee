import { HealingCard, useHealings } from '@/features/healing';
import styles from './healing.module.scss';

export const HealingRoute = () => {
  const { data: healings, isLoading, isError } = useHealings();

  return (
    <div>
      <header className={styles.head}>
        <h1>Лечебник</h1>
        <p>Кино как терапия: выбери, что нужно вылечить.</p>
      </header>

      {isLoading && <p className={styles.status}>Загрузка…</p>}
      {isError && <p className={styles.status}>Не удалось загрузить.</p>}
      {healings && (
        <div className={styles.grid}>
          {healings.map((healing) => (
            <HealingCard key={healing.slug} healing={healing} />
          ))}
        </div>
      )}
    </div>
  );
};
