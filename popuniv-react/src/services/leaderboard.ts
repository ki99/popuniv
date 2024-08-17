import { DEFAULT_GROUP } from '@/constants/group'
import { api } from '@/lib/api-client'
import type { User } from '@/models/auth.interface'
import type {
  LeaderboardResponse,
  LeaderboardRow,
} from '@/models/leaderboard.interface'

export const getLeaderboard = async () => {
  return api.get<LeaderboardResponse>('/api/dashboard')
}

export const getUserGroupFromLeaderboard = (
  leaderboard: LeaderboardRow[] | undefined,
  user: User | undefined,
) => {
  if (!leaderboard) return undefined

  const universityName = user?.university.name || DEFAULT_GROUP.name

  const userGroupIndex = leaderboard.findIndex(
    (row) => row.groupName === universityName,
  )
  const userGroup = leaderboard[userGroupIndex]
  return { order: userGroupIndex + 1, ...userGroup }
}
