import { finishRequest, startRequest } from '@/redux/states/loading'
import store from '@/redux/store'
import axios from 'axios'

export const LoadingInterceptor = () => {
  axios.interceptors.request.use((request) => {
    store.dispatch(startRequest())
    return request
  })

  axios.interceptors.response.use(
    async (response) => {
      store.dispatch(finishRequest())
      return response
    },
    async (error) => {
      store.dispatch(finishRequest())
      return Promise.reject(error)
    }
  )
}
