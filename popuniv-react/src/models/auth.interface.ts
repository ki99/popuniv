export interface RegisterRequest {
  selectedId: number
  email: string
  password: string
  passwordCheck: string
  nickname: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface User {
  id: number
  email: string
  nickname: string
  // role: 'ADMIN' | 'USER'
  role: string
  university: { name: string; id: number }
}
