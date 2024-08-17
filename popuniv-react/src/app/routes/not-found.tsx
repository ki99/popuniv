import { Link } from 'react-router-dom'

import Layout from './layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-2">
        <h1 className="xs:text-4xl font-dynapuff text-9xl">404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <Link to="/" className="w-fit">
          <span className="font-medium text-black underline">
            홈으로 돌아가기
          </span>
        </Link>
      </div>
    </Layout>
  )
}
