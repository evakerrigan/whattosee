// Доменные типы, общие для фич movies и healing (форма ответов API).

export type Genre = {
  slug: string;
  name: string;
};

export type Country = {
  slug: string;
  name: string;
};

export type HealingTag = {
  slug: string;
  title: string;
};

/** Карточка фильма в списках. */
export type MovieCard = {
  id: string;
  title: string;
  originalTitle: string | null;
  year: number | null;
  posterUrl: string | null;
  imdbRating: number | null;
  otherRating: number | null;
  otherRatingSource: string | null;
  country: Country | null;
  genres: Genre[];
};

/** Полная карточка (страница /movies/:id). */
export type MovieDetail = MovieCard & {
  description: string;
  review: string;
  healings: HealingTag[];
};

export type GenreOption = Genre & { _count: { movies: number } };
export type CountryOption = Country & { _count: { movies: number } };

export type HealingSummary = {
  slug: string;
  title: string;
  description: string | null;
  _count: { movies: number };
};

export type HealingDetail = {
  slug: string;
  title: string;
  description: string | null;
  movies: MovieCard[];
};
