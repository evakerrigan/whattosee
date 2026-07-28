import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { HealingDetail, HealingSummary } from '@/types/movie';

export const healingKeys = {
  all: ['healings'] as const,
  detail: (slug: string) => [...healingKeys.all, 'detail', slug] as const,
};

export const getHealings = async (): Promise<HealingSummary[]> => {
  const { data } = await apiClient.get<HealingSummary[]>('/healings');
  return data;
};

export const getHealing = async (slug: string): Promise<HealingDetail> => {
  const { data } = await apiClient.get<HealingDetail>(`/healings/${slug}`);
  return data;
};

export const useHealings = () =>
  useQuery({ queryKey: healingKeys.all, queryFn: getHealings });

export const useHealing = (slug: string) =>
  useQuery({
    queryKey: healingKeys.detail(slug),
    queryFn: () => getHealing(slug),
    enabled: Boolean(slug),
  });
