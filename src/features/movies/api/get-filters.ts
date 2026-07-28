import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { CountryOption, GenreOption } from '@/types/movie';

export const getGenres = async (): Promise<GenreOption[]> => {
  const { data } = await apiClient.get<GenreOption[]>('/genres');
  return data;
};

export const getCountries = async (): Promise<CountryOption[]> => {
  const { data } = await apiClient.get<CountryOption[]>('/countries');
  return data;
};

export const useGenres = () =>
  useQuery({ queryKey: ['genres'], queryFn: getGenres });

export const useCountries = () =>
  useQuery({ queryKey: ['countries'], queryFn: getCountries });
