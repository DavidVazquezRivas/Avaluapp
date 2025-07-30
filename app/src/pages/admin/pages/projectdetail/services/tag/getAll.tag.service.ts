import { apiEndpoints } from '@/constants/endpoints'
import axios from 'axios'

export const getAllTags = async (projectId: number) => {
  return axios.get(apiEndpoints.tags.getAll(projectId))
}
