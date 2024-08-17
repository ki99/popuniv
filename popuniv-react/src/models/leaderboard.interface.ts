import type { GroupType } from './group.interface'

export interface LeaderboardResponse {
  [groupName: string]: number
}

export interface LeaderboardRequest {
  type: GroupType
}

export interface LeaderboardRow {
  groupName: string
  count: number
}
