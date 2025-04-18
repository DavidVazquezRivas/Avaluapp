import { refreshSession } from '@/utils/session.utils'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}

type FailedQueueItem = {
  config: AxiosRequestConfig
  resolve: (value: AxiosResponse) => void
  reject: (error: AxiosError) => void
}

export const ErrorInterceptor = () => {
  let isRefreshing = false
  let failedQueue: FailedQueueItem[] = []

  const processQueue = (error?: AxiosError | null) => {
    failedQueue.forEach(async (prom) => {
      if (error) prom.reject(error)
      else prom.resolve(await axios(prom.config))
    })

    failedQueue = []
  }

  const handleRefreshToken = async (
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    try {
      await refreshSession()
      const response = await axios(originalRequest)
      processQueue()
      return response
    } catch (error) {
      processQueue(error as AxiosError)
      throw error
    } finally {
      isRefreshing = false
    }
  }

  const addToQueue = (
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      failedQueue.push({ config: originalRequest, resolve, reject })
    })
  }

  const shouldHandleError = (originalRequest: AxiosRequestConfig): boolean => {
    const url = originalRequest.url || ''
    const isAuthEndpoint = url.includes('/auth')
    const isRetryAttempt = originalRequest._retry
    return !isAuthEndpoint && !isRetryAttempt
  }

  const handleUnauthorizedError = async (
    error: AxiosError,
    originalRequest: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    if (!shouldHandleError(originalRequest)) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (!isRefreshing) {
      isRefreshing = true
      return handleRefreshToken(originalRequest)
    }

    return addToQueue(originalRequest)
  }

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && originalRequest)
        handleUnauthorizedError(error, originalRequest)

      // Handle other errors
      // TODO - Add a notification system to show error messages to the user
      console.error('An error occurred:', error.message)
      return Promise.reject(error)
    }
  )
}
