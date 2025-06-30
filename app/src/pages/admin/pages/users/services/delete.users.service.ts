import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const deleteUser = async (id: number) => {
  return axios.delete(apiEndpoints.users.delete(id), {})
}
