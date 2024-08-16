/* eslint-disable @typescript-eslint/no-explicit-any */
type Status = 'SUCCESS' | 'ERROR'

export interface ResponseBody<TResponse> {
  status: Status
  message?: string
  data?: TResponse
}

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<ResponseBody<T>>
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
    head<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<ResponseBody<T>>
  }
}
