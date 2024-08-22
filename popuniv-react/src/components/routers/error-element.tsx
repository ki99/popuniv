import { useRouteError } from 'react-router-dom'

import { AxiosError } from 'axios'

import Layout from '@/app/routes/layout'
import { Button } from '@/components/ui/button'

export default function ErrorElement() {
  const error = useRouteError()

  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <h1 className="xs:text-4xl font-dynapuff text-9xl">?</h1>
        {error instanceof AxiosError ? (
          <p>{error?.response?.data}</p>
        ) : (
          <p>오류가 발생했습니다.</p>
        )}
        <Button
          className="mt-4"
          onClick={() => window.location.assign(window.location.origin)}
        >
          새로고침
        </Button>
      </div>
    </Layout>
  )
}
