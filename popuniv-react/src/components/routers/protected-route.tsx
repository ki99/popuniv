import { Navigate } from 'react-router-dom'

import Layout from '@/app/routes/layout'
import Spinner from '@/components/ui/spinner'
import { useUser } from '@/hooks/auth'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <Layout>
        <div className="flex w-full items-center justify-center">
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (user) {
    return <Navigate to={'/'} replace />
  }

  return children
}
