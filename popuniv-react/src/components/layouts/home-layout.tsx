import { type ReactNode } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, useLocation } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import Spinner from '@/components/ui/spinner'

export const HomeLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen w-dvw flex-col sm:p-6 lg:p-8">
      <Link className="flex items-center text-white" to="/">
        <img className="h-8 w-auto" src={logo} alt="logo" />
      </Link>
      <div className="mt-8 flex flex-1">
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
            {children}
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  )
}
