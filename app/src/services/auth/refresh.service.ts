import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const refresh = async () => {
  return axios.post(apiEndpoints.auth.refresh, {})
}
