import type { GroupType } from './group.interface'

export interface LeaderboardResponse {
  [groupName: string]: number
}

export interface LeaderboardRequest {
  type: GroupType
}
