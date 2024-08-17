import { useQuery } from '@tanstack/react-query'

import { REFETCH_INTERVAL_MS } from '@/constants/react-query'
import { getLeaderboard } from '@/services/leaderboard'

const alphabetize = (strA: string, strB: string) =>
  strA.toLowerCase().charCodeAt(0) - strB.toLowerCase().charCodeAt(0)

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    select: (response) =>
      Object.entries(response?.data || {})
        ?.map((item) => ({ groupName: item[0], count: item[1] as number }))
        .sort(
          (a, b) => b.count - a.count || alphabetize(a.groupName, b.groupName),
        ),
    refetchInterval: REFETCH_INTERVAL_MS,
  })
}
