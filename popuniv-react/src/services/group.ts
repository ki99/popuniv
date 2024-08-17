import { api } from '@/lib/api-client'
import type { GroupInfo } from '@/models/group.interface'

export const getGroups = async () => {
  return api.get<GroupInfo[]>('/api/university')
}
