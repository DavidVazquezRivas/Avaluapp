import { apiBaseUrl } from '@/constants/endpoints'
import { getSession, refreshSession } from '@/utils/session.utils'
import axios, { InternalAxiosRequestConfig } from 'axios'

export const PublicPrivateInterceptor = () => {
  const updateHeaders = async (request: InternalAxiosRequestConfig) => {
    let token = getSession()
    if (!token) {
      try {
        console.log('Token not found. Refreshing session...')
        await refreshSession()
        token = getSession()
      } catch (error) {
        return Promise.reject(new Error('Refresh failed'))
      }
    }

    if (!token) {
      return Promise.reject(new Error('No token found. Aborting request'))
    }

    request.headers.set('Authorization', `Bearer ${token}`)
    request.headers.set('Content-Type', 'application/json')

    return request
  }

  const updateHeadersAuth = async (request: InternalAxiosRequestConfig) => {
    request.headers.set('Content-Type', 'application/json')
    if (typeof request.withCredentials === 'undefined') {
      request.withCredentials = true
    }

    return request
  }

  axios.interceptors.request.use(
    (request) => {
      if (!request.url?.includes(apiBaseUrl)) return request // External API call
      const isAuth = request.url?.includes('/auth')

      return isAuth ? updateHeadersAuth(request) : updateHeaders(request)
    },
    (error) => Promise.reject(error)
  )
}
