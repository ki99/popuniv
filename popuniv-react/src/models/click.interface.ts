export type ClickRequest = ClickRequestParam & ClickRequestBody

export interface ClickRequestParam {
  selectedId: number
}

export interface ClickRequestBody {
  clickCount: number
}

export interface ClickResponse {
  userClickCount: number
  totalClickCount: number
}

export interface ClicksByName {
  groupName: string
  count: number
}
