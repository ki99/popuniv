import HomeLayout from './layout'

import AsyncBoundary from '@/app/boundaries/async-boundary'
import Click from '@/components/features/click'
import Leaderboard from '@/components/features/leaderboard'

export default function HomePage() {
  return (
    <HomeLayout>
      <Leaderboard />
      <AsyncBoundary>
        <Click />
      </AsyncBoundary>
    </HomeLayout>
  )
}
