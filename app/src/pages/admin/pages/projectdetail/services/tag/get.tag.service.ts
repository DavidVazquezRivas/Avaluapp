import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getTag = async (id: number) => {
  return axios.get(apiEndpoints.tags.get(id))
}
