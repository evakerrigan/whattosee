import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/errors/error-boundary';
import { ThemeProvider } from '@/components/theme';

type AppProviderProps = {
  children: ReactNode;
};

/**
 * Wraps the app with all global providers: error handling, theme, and the
 * TanStack Query data-fetching client.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
