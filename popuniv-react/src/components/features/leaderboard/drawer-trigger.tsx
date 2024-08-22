import { ChevronUpIcon } from '@radix-ui/react-icons'

import { DrawerTrigger } from '@/components/ui/drawer'
import { useUser } from '@/hooks/auth'
import { useLeaderboard } from '@/hooks/leaderboard'
import { getUserGroupFromLeaderboard } from '@/services/leaderboard'
import { commaizeNumber, orderToRank } from '@/utils/numbers'

export default function LeaderboardDrawerTrigger() {
  const { data: leaderboard } = useLeaderboard()
  const { data: user } = useUser()

  const userGroupFromLeaderboard = getUserGroupFromLeaderboard(
    leaderboard,
    user,
  )

  return (
    <DrawerTrigger className="fixed bottom-0 left-0 h-12 w-full rounded-t-[10px] border bg-background">
      {userGroupFromLeaderboard ? (
        <div className="flex items-center">
          <div className="flex-1 space-x-2">
            <span className="font-medium">
              {orderToRank(userGroupFromLeaderboard.order, true)}
            </span>
            <span>{userGroupFromLeaderboard.groupName}</span>
            <span>{commaizeNumber(userGroupFromLeaderboard.count)}</span>
          </div>
          <ChevronUpIcon width={24} height={24} className="mr-4" />
        </div>
      ) : (
        <div className="mx-auto h-2 w-[100px] rounded-full bg-muted" />
      )}
    </DrawerTrigger>
  )
}
