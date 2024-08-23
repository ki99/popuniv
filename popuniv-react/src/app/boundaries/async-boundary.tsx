import { type ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { QueryErrorResetBoundary } from '@tanstack/react-query'

import AsyncErrorFallback, {
  type AsyncErrorFallbackProps,
} from '@/app/boundaries/async-error-fallback'
import Spinner from '@/components/ui/spinner'

interface AsyncBoundaryProps {
  children: ReactNode
  LoadingFallback?: ReactNode
  ErrorFallback?: (props: AsyncErrorFallbackProps) => ReactNode
  message?: string
}

export default function AsyncBoundary({
  children,
  LoadingFallback = <Spinner />,
  ErrorFallback = AsyncErrorFallback,
  message,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              reset={resetErrorBoundary}
              message={message || error.message}
            />
          )}
        >
          <Suspense fallback={LoadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
