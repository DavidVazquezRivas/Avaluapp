import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const logout = async () => {
  return axios.post(apiEndpoints.auth.logout, {})
}
