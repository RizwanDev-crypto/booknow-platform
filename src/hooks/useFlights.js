import { useQuery } from '@tanstack/react-query';

export function useFlights() {
  return useQuery({
    queryKey: ['flights'],
    queryFn: async () => {
      const response = await fetch('/api/flights');
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
