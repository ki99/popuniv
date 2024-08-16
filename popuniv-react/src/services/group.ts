import { api } from '@/lib/api-client'
import { GroupInfo } from '@/models/group.interface'

export const getGroups = async () => {
  return api.get<GroupInfo[]>('/api/university')
}
