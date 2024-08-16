import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation } from 'react-router-dom'

import HomeLayout from './layout'

import Spinner from '@/components/ui/spinner'

export default function HomePage() {
  const location = useLocation()

  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary
        key={location.pathname}
        fallback={<div>Something went wrong!</div>}
      >
        <HomeLayout>홈</HomeLayout>
      </ErrorBoundary>
    </Suspense>
  )
}
