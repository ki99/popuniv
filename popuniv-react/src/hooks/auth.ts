import { useNavigate } from 'react-router-dom'

import { useMutation, useQuery } from '@tanstack/react-query'

import { toast } from '@/components/ui/use-toast'
import type { LoginRequest, RegisterRequest } from '@/models/auth.interface'
import { getUser, login, register, setToken } from '@/services/auth'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 24 * 60 * 60 * 1000,
    select: (response) => response.data,
    enabled: !!localStorage.getItem('token'),
  })
}

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (response) => {
      const token = response.data?.token
      if (token) {
        setToken(token)
        navigate('/')
      }
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: () => {
      toast({ title: '회원가입에 성공하였습니다 ✧*.◟(ˊᗨˋ)◞.*✧' })
      navigate('/login')
    },
  })
}
