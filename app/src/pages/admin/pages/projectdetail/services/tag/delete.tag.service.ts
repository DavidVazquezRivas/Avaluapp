import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const deleteTag = async (id: number) => {
  return axios.delete(apiEndpoints.tags.delete(id))
}
