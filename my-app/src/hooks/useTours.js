import { useQuery } from '@tanstack/react-query';

export function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const response = await fetch('/api/tours');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
