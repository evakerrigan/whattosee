import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { MovieCard } from '@/types/movie';

export type MovieFilters = {
  genre?: string;
  country?: string;
  healing?: string;
};

export const movieKeys = {
  all: ['movies'] as const,
  list: (filters: MovieFilters) => [...movieKeys.all, 'list', filters] as const,
  detail: (id: string) => [...movieKeys.all, 'detail', id] as const,
};

export const getMovies = async (
  filters: MovieFilters = {}
): Promise<MovieCard[]> => {
  const params = new URLSearchParams();
  if (filters.genre) params.set('genre', filters.genre);
  if (filters.country) params.set('country', filters.country);
  if (filters.healing) params.set('healing', filters.healing);

  const qs = params.toString();
  const { data } = await apiClient.get<MovieCard[]>(
    `/movies${qs ? `?${qs}` : ''}`
  );
  return data;
};

export const useMovies = (filters: MovieFilters = {}) =>
  useQuery({
    queryKey: movieKeys.list(filters),
    queryFn: () => getMovies(filters),
  });
