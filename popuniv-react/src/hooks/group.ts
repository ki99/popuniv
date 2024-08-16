import { useQuery } from '@tanstack/react-query'

import { getGroups } from '@/services/group'

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: getGroups,
    select: (response) =>
      response?.data?.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
  })
}
