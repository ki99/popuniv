import Axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_SERVER_ORIGIN

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}

export const api = Axios.create({
  baseURL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')

      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/login?redirectTo=${redirectTo}`
    }

    if (error.response.data) {
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error)
    }
  },
)
