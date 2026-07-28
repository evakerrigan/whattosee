import { useCountries, useGenres } from '../api/get-filters';
import styles from './movie-filters.module.scss';

export type MovieFiltersValue = {
  genre?: string;
  country?: string;
};

type MovieFiltersProps = {
  value: MovieFiltersValue;
  onChange: (next: MovieFiltersValue) => void;
};

export const MovieFilters = ({ value, onChange }: MovieFiltersProps) => {
  const { data: genres } = useGenres();
  const { data: countries } = useCountries();
  const hasFilters = Boolean(value.genre || value.country);

  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        value={value.genre ?? ''}
        onChange={(e) =>
          onChange({ ...value, genre: e.target.value || undefined })
        }
      >
        <option value="">Все жанры</option>
        {genres?.map((genre) => (
          <option key={genre.slug} value={genre.slug}>
            {genre.name} · {genre._count.movies}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={value.country ?? ''}
        onChange={(e) =>
          onChange({ ...value, country: e.target.value || undefined })
        }
      >
        <option value="">Все страны</option>
        {countries?.map((country) => (
          <option key={country.slug} value={country.slug}>
            {country.name} · {country._count.movies}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          className={styles.reset}
          onClick={() => onChange({})}
        >
          Сбросить
        </button>
      )}
    </div>
  );
};
