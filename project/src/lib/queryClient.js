import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      gcTime: 5 * 60000,
      retry: (failCount, err) => (err?.status === 401 ? false : failCount < 2),
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
})
