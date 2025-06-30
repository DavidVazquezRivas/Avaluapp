import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getUsers = async () => {
  return axios.get(apiEndpoints.users.get, {})
}
