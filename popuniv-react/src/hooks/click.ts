import { ClickRequest } from '../models/click.interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'

import type { User } from '@/models/auth.interface'
import { getClicks, sendClicks } from '@/services/click'

export const useClicks = (groupId: number, user: User | undefined) => {
  return useQuery({
    queryKey: ['clicks', groupId],
    queryFn: () => getClicks(groupId),
    select: (response) => {
      const data = response.data
      if (!user) {
        return {
          userClickCount: Number(localStorage.getItem('click_count')) || 0,
          totalClickCount: data?.totalClickCount || 0,
        }
      } else {
        return data
      }
    },
  })
}

export const useClicksMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (payload: ClickRequest) => sendClicks(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ['clicks', payload.selectedId],
      })
      queryClient.invalidateQueries({
        queryKey: ['leaderboard'],
      })
    },
  })
}
