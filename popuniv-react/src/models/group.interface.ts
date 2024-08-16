export enum Group {
  UNIVERSITY = 'university',
  COMPANY = 'company',
}

export type GroupType = (typeof Group)[keyof typeof Group]

export interface GroupInfo {
  id: number
  name: string
}
