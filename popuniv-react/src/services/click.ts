import { api } from '@/lib/api-client'
import type { ClickRequest, ClickResponse } from '@/models/click.interface'

export const getClicks = async (groupId: number) => {
  return api.get<ClickResponse>(`api/click/${groupId}`)
}

export const sendClicks = async ({ selectedId, clickCount }: ClickRequest) => {
  return api.put<ClickResponse>(`api/click/${selectedId}`, { clickCount })
}
