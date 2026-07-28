import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { MovieDetail } from '@/types/movie';
import { movieKeys } from './get-movies';

export const getMovie = async (id: string): Promise<MovieDetail> => {
  const { data } = await apiClient.get<MovieDetail>(`/movies/${id}`);
  return data;
};

export const useMovie = (id: string) =>
  useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => getMovie(id),
    enabled: Boolean(id),
  });
