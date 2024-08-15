import Axios, { InternalAxiosRequestConfig } from 'axios'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  config.headers['Authorization'] = localStorage.getItem('token')

  return config
}

export const api = Axios.create({
  baseURL: import.meta.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error(message)

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/auth/login?redirectTo=${redirectTo}`
    }

    return Promise.reject(error)
  },
)
