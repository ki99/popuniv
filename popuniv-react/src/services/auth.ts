import { QueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api-client'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '@/models/auth.interface'

export const getUser = () => {
  return api.get<User>('/api/auth/info')
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const login = (payload: LoginRequest) => {
  return api.post<LoginResponse>('/api/auth/login', payload)
}

export const register = (payload: RegisterRequest) => {
  return api.post('/api/auth/join', payload)
}

export const logout = (): void => {
  localStorage.removeItem('token')

  const queryClient = new QueryClient()
  queryClient.removeQueries({ queryKey: ['user'] })

  window.location.reload()
}
