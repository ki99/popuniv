import { type ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { MainErrorFallback } from '@/components/errors/main'
import Spinner from '@/components/ui/spinner'
import { queryClientConfig } from '@/lib/react-query'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = new QueryClient(queryClientConfig)

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
